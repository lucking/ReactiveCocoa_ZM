/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var Data = require("$UI/system/components/justep/data/data");
	var Grid = require("$UI/system/components/designerCommon/grid/grid");
	var XML = require("$UI/system/lib/base/xml");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");

	var Model = function() {
		this.callParent();

		// 创建data组件
		this.createData();
	};

	/**
	 * 获取返回值，点击确定后调用的方法,必须是一个json格式的数据 .
	 */
	Model.prototype.getReturnValue = function() {
		var ret = [], data = this.comp('data');
		data.each(function(param) {
			var row = {};
			for ( var col in data.defCols)
				row[col] = data.getValue(col, param.row);
			ret.push(row);
		});
		return {
			data : ret
		};
	};

	Model.prototype.createGrid = function() {
		var parent = this.getElementByXid("editGroup"), data = this.comp('data');
		if (parent) {
			var cols = [];
			for ( var col in data.defCols) {
				cols.push({
					text : data.defCols[col].label,
					dataField : col
				});
			}
			var cfg = {
				dataXID : 'data',
				parentNode : parent,
				editable : true,
				width : 750,
				height : 424,
				columns : cols
			// {text: 'fString', dataField: 'fString', width: 200},
			};
			new Grid(cfg);
		} else {
			throw new Error("创建Grid失败");
		}
	};

	Model.prototype.createData = function() {
		// 创建grid的下拉选择
		var initData = xuiService.getPageParams();// 获取初始化数据
		this.xml2data(initData.xml);// 初始化属性值
	};

	Model.prototype.xml2data = function(xmlStr) {
		if (xmlStr) {
			var $data = $(XML.fromString(xmlStr).documentElement);
			// 创建data
			var defCols = {};
			$data.children('column').each(function() {
				var $col = $(this);
				defCols[$col.attr('name')] = {
					type : $col.attr('type'),
					label : $col.attr('label')
				};
			});
			// 初始化data的数据
			var defaultValue = $data.children('data').text();
			new Data(this, {
				xid : 'data',
				defCols : defCols,
				idColumn : $data.attr('idColumn'),
				autoLoad : true,
				initData : defaultValue
			});
		}
	};

	Model.prototype.addClick = function(event) {
		var data = this.comp('data');
		try {
			data.newData();
		} catch (e) {
		}
	};

	Model.prototype.deleteClick = function(event) {
		var data = this.comp('data');
		data.deleteData();
	};

	Model.prototype.modelLoad = function(event) {
		// 创建grid组件
		this.createGrid();
	};

	return Model;
});