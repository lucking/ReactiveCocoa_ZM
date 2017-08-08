/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var bind = require("bind");
	var Component = require("$UI/system/lib/base/component");
	var RTData = require("../data");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var xuiDoc = xuiService.getXuiDoc();
	require('css!./css/data').load();

	var createData = function(data, clz) {
		var $domNode = $(data.domNode), xid = $domNode.attr("xid"), model = data.getModel();
		RTData.registerData(model, xid, data);
		$domNode.empty().css("height", "22px").css("display", "block").addClass(clz).append(
				"<img align='absmiddle' style='width:16px;height:18px;'/><span>" + (xid?xid:'') + "</span>");
		model.resolvedComponent(xid);
	};

	var set = function set(data, value) {
		if ('xid' in value) {
			var $domNode = $(data.domNode), oldxid = $domNode.attr("xid");
			RTData.unRegisterData(data.getModel(), oldxid);
			RTData.registerData(data.getModel(), value['xid'], data);
			$domNode.children('span').text(value['xid'] ? value['xid'] : '');
		}
	};

	var editRule = function(data, config) {
		var cols = xuiDoc.getEditorDataSource("RuleRelationDatasource.getDatasource");// 获取列信息
		xuiService.openPage("$UI/system/components/justep/data/designer/editRule.w", {
			title : "data规则编辑",
			xml : config.nodeXml,
			cols : cols
		}, function(result) {
			xuiDoc.replaceChild(data, result.def, {
				xpathCondition : "*[local-name()='rule']",
				paintComponent : false
			});
		});
	};

	var editColumn = function(data, config) {
		xuiService.openPage("$UI/system/components/justep/data/designer/editColumn.w", {
			xml : config.nodeXml
		}, function(result) {
			xuiDoc.replaceChild(data, result.def.join(""), {
				paintComponent : false,
				xpathCondition : "*[local-name()='column']"
			});
			xuiDoc.set(data, {
				idColumn : result.idColumn
			});
		});
	};

	var editData = function(data, config) {
		xuiService.openPage("$UI/system/components/justep/data/designer/editData.w", {
			xml : config.nodeXml
		}, function(result) {
			xuiDoc.replaceChild(data, '<data><![CDATA[' + JSON.stringify(result.data) + ']]></data>', {
				paintComponent : false,
				xpathCondition : "*[local-name()='data']"
			});
		});
	};

	var Data = RTData.extend({
		constructor : function(config) {
			if (config && config.templateNode) {
				this._bind(config.templateNode);
			}
			this.callParent(config);
		},
		init : function(value, bindingContext) {
			createData(this, 'x-data');
		},
		_bind : function(element) {
			bind.utils.domData.set(element, Component.BIND_NAME, this);
			this.domNode = element;
			this.$domNode = $(this.domNode);
			bind.utils.domNodeDisposal.addDisposeCallback(element, this.dispose.bind(this));
		},
		set : function(v) {
			set(this, v);
		},
		editRule : function(config) {
			editRule(this, config);
		},
		editColumn : function(config) {
			editColumn(this, config);
		},
		editData : function(config) {
			editData(this, config);
		}
	});

	return {
		'$UI/system/components/justep/data/data' : Data
	};
});