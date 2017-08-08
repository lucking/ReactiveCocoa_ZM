/* ------------------------------------------------------------ 
配置页面主调度
配置页面本身作为向导主页面（wizard）的子页面，提供通用的多页配置

配置页面接口：
	getTitle = function(wizard)
	hasCancelBtn = function(wizard)
	hasBackBtn = function(wizard)		
	hasNextBtn = function(wizard)
	hasFinishBtn = function(wizard)
	nextPage = function(wizard)
	validate = function(wizard)
	finish = function(wizard)

配置页面子页面接口:
	validate = function(wizard)
	finish = function(wizard)
------------------------------------------------------------ */

define(function(require) {
	var $ = require("jquery");
	var justep = require('$UI/system/lib/justep');
	var XML = require("$UI/system/lib/base/xml");
	var Component = require("$UI/system/lib/base/component");
	var WindowContainer = require("$UI/system/components/justep/windowContainer/windowContainer");
	var templateService = require("$UI/system/templates/common/js/templateService");

	var Model = function() {
		this.callParent();

		this.pageIdx = 0;
		this.itemElementMap = {};
		this.idNode = [];
	};

	Model.prototype._createCompose = function(id, src, templateFile) {
		var src = require.toUrl(src + (src.indexOf("?") != -1 ? "&" : "?") + "id=" + id + (templateFile ? ("&templateFile=" + templateFile) : ""));
		var compose = new WindowContainer({
			parentNode : this.getElementByXid("composeParent"),
			src : src,
			onLoad : this._composeLoaded.bind(this)
		});
		$(compose.domNode).attr('id', id);
		$(compose.domNode).addClass('cfg-compose');
		return compose;
	};

	Model.prototype._openPage = function(id, url, templateFile, refresh) {
		var composes = $(".cfg-compose");
		for ( var i = 0; i < composes.length; i += 1) {
			composes[i].style.display = "none";
		}
		var composeNode = document.getElementById(id);
			if (!composeNode) {
				this.currentCompose = this._createCompose(id, url, templateFile);
				composeNode = this.currentCompose.domNode;
				this.idNode.push(composeNode);
			} else {
				this.currentCompose = Component.getComponent(composeNode);
				if (refresh) {
					this.currentCompose.refresh();
				}
			}

		composeNode.style.display = "block";
	};

	Model.prototype._composeLoaded = function(event) {
	};

	Model.prototype._recalcNavHeight = function() {
		$('.cfg-nav').height($("body").height());
	};

	Model.prototype.modelLoad = function(event) {
		this.templateEngine = this.getParent().templateEngine;
		var items = this.templateEngine.getConfig().items;
		var defaultValues = [];
		for ( var i = 0; i < items.length; i++) {
			var templateFile = items[i].file;
			if (items[i].configPage) {
				defaultValues.push({
					require : items[i].require,
					setting : items[i].text,
					configPage : items[i].configPage,
					file : items[i].file,
					id : "id" + i
				});
			}
		}
		var data = this.comp('data');
		data.newData({
			defaultValues : defaultValues
		});
		data.first();

		this._recalcNavHeight();
		var self = this;
		$(window).resize(function() {
			self._recalcNavHeight();
		});
	};

	Model.prototype.pageClick = function(event) {
		var data = this.comp("data");
		data.to(data.getRowID(event.bindingContext.$object));
	};

	Model.prototype.dataIndexChanged = function(event) {
		var data = event.source;
		this._openPage(data.val("id"), require.toUrl(data.val("configPage")), data.val("file"));
	};

	Model.prototype.getTitle = function(wizard) {
		return '模版配置，请按照左侧配置项的顺序依次设置配置项';
	};

	Model.prototype.hasCancelBtn = function(wizard) {
		return true;
	};

	Model.prototype.hasBackBtn = function(wizard) {
		return true;
	};

	Model.prototype.hasNextBtn = function(wizard) {
		return false;
	};

	Model.prototype.hasFinishBtn = function(wizard) {
		return true;
	};

	Model.prototype.backPage = function(wizard) {
		var len = this.idNode.length;
		if ( len> 0) {
			for(var key in this.idNode){
				if (this.idNode[key]) {
					this.idNode[key].remove();
				}
			}
		}
		wizard.back(this);
	};

	Model.prototype.validate = function(wizard) {
		var data = this.comp("data");
		var validated = true;
		data.each(function(options) {
			var row = options.row;
			var id = data.val('id', row);
			var pageName = data.getValue('setting', row);
			var composeNode = document.getElementById(id);
			if (!composeNode) {
				alert(pageName + ':没有配置');
				validated = false;
				return;
			} else if (composeNode) {
				var currentCompose = Component.getComponent(composeNode);
				var pageModel = currentCompose.getInnerModel();
				if (pageModel && pageModel.validate) {
					var msg = pageModel.validate(wizard);
					if (msg) {
						alert(pageName + ':' + msg);
						validated = false;
						return;
					}
				}
			}
		});
		return validated;
	};

	/**
	 * 向导完成.
	 * 
	 * @param event
	 */
	Model.prototype.finish = function(wizard) {
		/* 调用每个配置项的完成操作 */
		var composes = $(".cfg-compose");
		for ( var i = 0; i < composes.length; i++) {
			Component.getComponent(composes[i]).getInnerModel().finish(wizard);
		}
	};

	Model.prototype.getItemAttr = function(attr) {
		var data = this.comp('data');
		return data.val(attr);
	};

	Model.prototype.getItemPramValue = function(paramId) {
		var item = this.itemElementMap[this.getItemAttr("id")];
		var param = $("param[id='" + paramId + "']", item).eq(0);
		if (param && param.length > 0)
			return param.attr("value");
		else
			return "";
	};

	return Model;
});
