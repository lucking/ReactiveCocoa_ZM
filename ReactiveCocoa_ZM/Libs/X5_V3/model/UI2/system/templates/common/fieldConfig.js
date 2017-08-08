define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var WindowContainer = require("$UI/system/components/justep/windowContainer/windowContainer");
	var templateService = require("$UI/system/templates/common/js/templateService");
	var Component = require("$UI/system/lib/base/component");
	// var loadTreeJs = require("$UI/system/templates/index/loadTreeJs");
	// loadTreeJs($);
	var Model = function() {
		this.callParent();
		this.composeObj = {};
		this.preId;
	};

	Model.prototype.modelLoad = function(event) {
		this.templateEngine = this.getParent().templateEngine;
		this.templateFile = this.getContext().getRequestParameter("templateFile");
	};

	Model.prototype.pageClick = function(event) {
		var data = this.comp("data");
		data.to(data.getRowID(event.bindingContext.$object));
	};

	Model.prototype.dataIndexChanged = function(event) {
		var data = event.source;
		var currentId = data.val("id");
		if (this.preId != undefined && currentId != 1) {
			var compose = this.composeObj[currentId];
			if (compose != undefined) {
				compose.getInnerModel().getField();
			}
		}
		this._openPage(data.val("id"), require.toUrl(data.val("configPage")));
	};

	Model.prototype.validate = function(wizard) {
		var msg = "";
		var composes = $(".rep-compose");
		if (composes.length < 3) {
			msg += "还没完成配置,";
		}
		for ( var i = 0; i < composes.length; i++) {
			msg += Component.getComponent(composes[i]).getInnerModel().validate(wizard);
		}
		return msg;
	}

	Model.prototype.finish = function(wizard) {
		var data = []
		var options = [];
		options.dataId = this.templateEngine.getConfig().current.mainData.dataId;
		var composes = $(".rep-compose");
		for ( var i = 0; i < composes.length; i++) {
			data.push(Component.getComponent(composes[i]).getInnerModel().finish(wizard));
		}
		for ( var i = 0; i < data.length; i++) {
			var jsonObj = data[i];
			for ( var key in jsonObj) {
				if (key == "groupcolumns") {
					options.groupcolumns = jsonObj[key];
				} else if (key == "selectcolumns") {
					options.selectcolumns = jsonObj[key];
				} else {
					options.groupField = jsonObj[key];
				}
			}
		}
		options.title = "分组报表";
		options.excelName = "/"+this.templateEngine.targetFileName+"Report.xlsx";
		options.excelType = "groupReport";
		this.createExcel(options);
		this.templateEngine.addContext(this.templateFile, "fileName", this.templateEngine.targetFileName+"Report");
	};

	Model.prototype.createExcel = function(options) {
		var targetPath = this.templateEngine.targetPath;
		var realPath = targetPath.substring(0, targetPath.indexOf('UI2')) + "UI2/system/templates/report/grid/template";
		var url = require.toUrl("$UI/system/templates/report/server/createGridExcel.j");
		var data = {
			dataId : options.dataId,
			selectcolumns : options.selectcolumns,
			groupcolumns : options.groupcolumns,
			title : options.title,
			groupField : options.groupField,
			pathname : targetPath + options.excelName,
			excelType : options.excelType
		};

		$.post(url, data, function(data) {
			alert(data)
		});
	};

	Model.prototype._createCompose = function(id, src, templateFile) {
		var src = require.toUrl(src + (src.indexOf("?") != -1 ? "&" : "?") + "id=" + id + (templateFile ? ("&templateFile=" + templateFile) : ""));
		var compose = new WindowContainer({
			parentNode : this.getElementByXid("composeParent"),
			src : src,
			onLoad : this._composeLoaded.bind(this)
		});
		$(compose.domNode).attr('id', id);
		$(compose.domNode).addClass('rep-compose');
		return compose;
	};

	Model.prototype._composeLoaded = function(event) {
	};

	Model.prototype._openPage = function(id, url, templateFile, refresh) {
		var composes = $(".rep-compose");
		for ( var i = 0; i < composes.length; i += 1) {
			composes[i].style.display = "none";
		}
		var composeNode = document.getElementById(id);
		if (!composeNode) {
			this.currentCompose = this._createCompose(id, url, templateFile);
			composeNode = this.currentCompose.domNode;
			this.composeObj[id] = this.currentCompose;
		} else {
			this.currentCompose = Component.getComponent(composeNode);
			if (refresh) {
				this.currentCompose.refresh();
			}
		}
		composeNode.style.display = "block";
	};

	Model.prototype.dataIndexChanging = function(event) {
		var data = event.source;
		this.preId = data.val("id");
	};

	return Model;
});