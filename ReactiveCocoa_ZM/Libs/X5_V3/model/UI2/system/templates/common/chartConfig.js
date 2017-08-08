define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var WindowContainer = require("$UI/system/components/justep/windowContainer/windowContainer");
	var templateService = require("$UI/system/templates/common/js/templateService");
	var Component = require("$UI/system/lib/base/component");
	var loadTreeJs = require("$UI/system/templates/index/loadTreeJs");
	loadTreeJs($);
	var Model = function() {
		this.callParent();
		this.composeObj = {};
	};

	Model.prototype.modelLoad = function(event) {
		this.templateEngine = this.getParent().templateEngine;
		this.templateFile = this.getContext().getRequestParameter("templateFile");
		var chartName = this.templateEngine.getConfig().current.mainData.chartName;
		var catalog = templateService.getChartListCatalog();
		var source = '[{"expanded":true,"items":[{"label":"标题","value":"title_$UI/system/templates/report/chart/config/public/title.w"},{"label":"子标题","value":"detailTitle_$UI/system/templates/report/chart/config/public/detailTitle.w"},{"label":"图例","value":"legend_$UI/system/templates/report/chart/config/public/legend.w"},{"label":"注释","value":"notes_$UI/system/templates/report/chart/config/public/notes.w"}],"label":"公共"}]';
		this._intpublicTemplateTree(JSON.parse(source));
		for ( var key in catalog) {//用于显示选中图表信息
			var type = catalog[key].type;
			if (type == chartName) {
				this._intTemplateTree(JSON.parse('[' + JSON.stringify(catalog[key]) + ']'));
			}
		}

	};

	Model.prototype._intpublicTemplateTree = function(source) {
		$("#jqxTre").jqxTree({
			source : source
		});
		$('#jqxTre').jqxTree('collapseAll');
		var firstChild = $("#jqxTre").find('li:first')[0];
		if (firstChild != null) {
			$('#jqxTre').jqxTree('selectItem', firstChild);
			$('#jqxTre').jqxTree('expandItem', firstChild);
		}
		var onSelect = function(event) {
			var args = event.args;
			var item = $('#jqxTre').jqxTree('getItem', args.element);
			if (!item.hasItems) {
				var value = item.value.split("_");
				var id = value[0];
				var url = value[1];
				this._openPage(id, url);
			}
		}
		$("#jqxTre").on("select", onSelect.bind(this));
	}

	Model.prototype._intTemplateTree = function(source) {
		$("#showEle").jqxTree({
			source : source
		});
		$('#showEle').jqxTree('collapseAll');
		var firstChild = $("#showEle").find('li:first')[0];
		if (firstChild != null) {
			$('#showEle').jqxTree('selectItem', firstChild);
			$('#showEle').jqxTree('expandItem', firstChild);
		}
		var onSelect = function(event) {
			var args = event.args;
			var item = $('#showEle').jqxTree('getItem', args.element);
				if (!item.hasItems) {
				var value = item.value.split("_");
				var id = value[0];
				var url = value[1];
				this._openPage(id, url);
			}
		}
		$("#showEle").on("select", onSelect.bind(this));
	}

	Model.prototype.finish = function(wizard) {
		var composes = this.composeObj;
		for ( var key in composes) {
			var key_data = composes[key].getInnerModel().finish(this);
			this.templateEngine.addContext(this.templateFile, key + "_data", key_data);
		}
	}

	Model.prototype._createCompose = function(id, src, templateFile) {
		var src = require.toUrl(src + (src.indexOf("?") != -1 ? "&" : "?") + "id=" + id + (templateFile ? ("&templateFile=" + templateFile) : ""));
		var compose = new WindowContainer({
			parentNode : this.getElementByXid("componseParent"),
			src : src,
			onLoad : this._composeLoaded.bind(this)
		});
		$(compose.domNode).attr('id', id);
		$(compose.domNode).addClass('con-compose');
		return compose;
	};

	Model.prototype._composeLoaded = function(event) {
	};

	Model.prototype._openPage = function(id, url, templateFile, refresh) {
		var composes = $(".con-compose");
		for ( var i = 0; i < composes.length; i += 1) {
			composes[i].style.display = "none";
		}
		var composeNode = document.getElementById(id);
		if (!composeNode) {
			this.currentCompose = this._createCompose(id, url, templateFile);
			this.composeObj[id] = this.currentCompose;
			composeNode = this.currentCompose.domNode;
		} else {
			this.currentCompose = Component.getComponent(composeNode);
			if (refresh) {
				this.currentCompose.refresh();
			}
		}
		composeNode.style.display = "block";
	};

	return Model;
});