/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var XML = require("$UI/system/lib/base/xml");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");

	var Model = function() {
		this.callParent();
	};
	
	Model.prototype.beforeOkAction = function(){
		var data = this.comp('data'), idColumn='';
		data.each(function(param){
			var name = data.getValue('name', param.row);
			if(data.getValue('isIDColumn', param.row)) idColumn = name;
		});
		if(!idColumn) return '必须设置ID列!';
	};
	
	/**
	 * 获取返回值，点击确定后调用的方法,必须是一个json格式的数据 .
	 */
	Model.prototype.getReturnValue = function(){
		var def = [], data = this.comp('data'), idColumn='';
		data.each(function(param){
			var name = data.getValue('name', param.row),
				type = data.getValue('type', param.row),
				label = data.getValue('displayName', param.row);
				def.push('<column name="'+name+'" type="'+type+'" label="'+label+'"/>');
				if(data.getValue('isIDColumn', param.row)) idColumn = name;
		});
		return {def:def,idColumn:idColumn}; 
	};
	
	Model.prototype.xml2data = function(xmlStr){
		if(xmlStr){
			var $data = $(XML.fromString(xmlStr).documentElement), data = this.comp('data'), idColumn=$data.attr('idColumn');
			$data.children('column').each(function(){
				var $col = $(this);
				data.newData({
					defaultValues : [ {
						name : $col.attr('name'),
						type : $col.attr('type'),
						displayName : $col.attr('label'),
						isIDColumn: $col.attr('name')!==idColumn?false:true
					} ]
				});
			});
			data.first();
		}
	};
	
	//创建下拉选择type
	Model.prototype.gridColCreateEditor = function(event){
		var list = ['String','Integer','Float','Boolean','Date','Time','DateTime'];
		event.editor.jqxDropDownList({autoDropDownHeight: true, source: list});
    };
                        
	Model.prototype.modelLoad = function(event) {
		var self = this;
		//window.setTimeout(function(){
			//创建grid的下拉选择
			var initData = xuiService.getPageParams();// 获取传入的参数
			self.xml2data(initData.xml);// 初始化属性值
		//}, 1000);
	};

	Model.prototype.addClick = function(event) {
		var data = this.comp('data'), col = 'col' + data.getCount();
		data.newData({
			defaultValues : [ {
				name : col,
				type : 'String',
				displayName : col
			} ]
		});
	};

	Model.prototype.deleteClick = function(event){
		var data = this.comp('data');
		data.deleteData();
	};

	Model.prototype.dataValueChange = function(event){
		if(event.col=='isIDColumn' && event.newValue){
			var data = event.source;
			data.each(function(param){
				data.setValue('isIDColumn', false, param.row);
			});
		}
	};

	return Model;
});