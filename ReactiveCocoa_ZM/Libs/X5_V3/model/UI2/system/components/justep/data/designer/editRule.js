/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	//var justep = require('$UI/system/lib/justep');
	var XML = require("$UI/system/lib/base/xml");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.def2xml = function() {
		var data = this.comp('data'), rule = '<rule>';
		var dataReadonly = this.comp('dataReadonly').val();
		if (dataReadonly) {// data的只读规则
			rule += ('<readonly><expr><![CDATA[' + dataReadonly + ']]></expr></readonly>');
		}
		data
				.each(function(param) {
					var colXml = '', hasDef = false;
					colXml += '<col name="' + data.getValue('name', param.row) + '">';
					if (data.getValue('readonly', param.row)) {
						colXml += ('<readonly><expr><![CDATA[' + data.getValue('readonly', param.row) + ']]></expr></readonly>');
						hasDef = true;
					}
					if (data.getValue('calculate', param.row)) {
						colXml += ('<calculate><expr><![CDATA[' + data.getValue('calculate', param.row) + ']]></expr></calculate>');
						hasDef = true;
					}
					if (data.getValue('required', param.row)) {
						colXml += ('<required><expr><![CDATA['
								+ data.getValue('required') + ']]></expr><message><![CDATA['
								+ (data.getValue('requiredMessage') ? data.getValue('requiredMessage', param.row) : '') + ']]></message></required>');
						hasDef = true;
					}
					if (data.getValue('constraint', param.row)) {
						colXml += ('<constraint><expr><![CDATA['
								+ data.getValue('constraint', param.row) + ']]></expr><message><![CDATA['
								+ (data.getValue('constraintMessage', param.row) ? data.getValue('constraintMessage', param.row) : '') + ']]></message></constraint>');
						hasDef = true;
					}
					colXml += '</col>';
					if (hasDef)
						rule += colXml;
				});
		return rule + '</rule>';
	};

	/**
	 * 获取返回值，点击确定后调用的方法,必须是一个json格式的数据 .
	 */
	Model.prototype.getReturnValue = function() {
		return {
			def : this.def2xml()
		};
	};

	Model.prototype.init = function() {
		var self = this;
		var initData = xuiService.getPageParams();// 获取传入的参数
		var ruleDef = self.xml2def(initData.xml);// 初始化属性值
		var cols = initData.cols;
		self.cols2data(cols, ruleDef);
	};

	Model.prototype.cols2data = function(cols, ruleDef) {
		this.comp('dataReadonly').val(ruleDef['readonly'].expr);
		if ($.isArray(cols)) {
			var defaultValues = [];
			for ( var i = 0; i < cols.length; i++) {
				var o = {
					name : cols[i]['alias'],
					type : cols[i]['data-type'],
					displayName : cols[i]['label']
				};
				var colRuleDef = ruleDef.col[o.name];
				if (colRuleDef) {
					o.readonly = colRuleDef.readonly.expr;
					o.calculate = colRuleDef.calculate.expr;
					o.required = colRuleDef.required.expr;
					o.requiredMessage = colRuleDef.required.message;
					o.constraint = colRuleDef.constraint.expr;
					o.constraintMessage = colRuleDef.constraint.message;
				}
				defaultValues.push(o);
			}

			var data = this.comp('data');
			data.newData({
				defaultValues : defaultValues
			});
			data.first();
		}
	};

	Model.prototype.xml2def = function(xmlStr) {
		if (xmlStr) {
			var ruleDef = {
				readonly : {},
				col : {}
			};
			var $data = $(XML.fromString(xmlStr).documentElement), $rule = $data.children('rule');
			ruleDef['readonly'].expr = $.trim($rule.children('readonly').children('expr').text());
			$rule.children('col').each(function() {
				var $col = $(this), def = {};
				if ($col.attr('name')) {
					def['readonly'] = {
						expr : $.trim($col.children('readonly').children('expr').text())
					};
					def['calculate'] = {
						expr : $.trim($col.children('calculate').children('expr').text())
					};
					def['required'] = {
						expr : $.trim($col.children('required').children('expr').text()),
						message : $.trim($col.children('required').children('message').text())
					};
					def['constraint'] = {
						expr : $.trim($col.children('constraint').children('expr').text()),
						message : $.trim($col.children('constraint').children('message').text())
					};
					ruleDef.col[$col.attr('name')] = def;
				}
			});
			return ruleDef;
		}
	};

	Model.prototype.modelLoad = function(event) {
		this.init();
	};
	
	/**
	 * 打开表达式编辑器.
     */
	Model.prototype.openExpressionEditor = function(currentProp){
		var comp = this.comp("data");
		xuiService.openEditor("jSExpressionEditor", {value : comp.getValue(currentProp)}, function(result) {
			comp.setValue(currentProp, result.value);
		});
	};
	
	Model.prototype.readonlyExprClick = function(event) {
		this.openExpressionEditor("readonly");
	};

	Model.prototype.calculateExprClick = function(event){
		this.openExpressionEditor("calculate");
	};

	Model.prototype.requiredExprClick = function(event){
		this.openExpressionEditor("required");
	};

	Model.prototype.constraintExprClick = function(event){
		this.openExpressionEditor("constraint");
	};

	return Model;
});