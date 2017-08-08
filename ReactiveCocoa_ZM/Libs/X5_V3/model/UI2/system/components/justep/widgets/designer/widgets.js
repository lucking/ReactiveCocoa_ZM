/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
	var $ = require("jquery");
	var Widgets = require("$UI/system/components/justep/widgets/widgets");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var Column = require('./column');
 
	require('css!./css/widgets').load();
	
	//动态注册组件
	xuiService.regComponents({"$UI/system/components/justep/widgets/column":Column});
	
	var cls = Widgets.extend({
		init:function(value, bindingContext){
			this.callParent(value, bindingContext);
			this.$column.attr('d_resizable', false);
			this.$widget.attr('d_resizable', false);
		},
		addColumn: function(){
			xuiService.getXuiDoc().createComponent("$UI/system/components/justep/widgets/column",
				this, {paintComponent:true}, 
				function(el){
					var id = $(el).attr('d_id');
					$('[d_id=' + id + ']')
						//.attr("d_canAddChild", "true")
						.attr('d_resizable', false)
						.selectable(true);
				}
			);
		},
		propertyChangedHandler: function(key, oldValue, value){
			//在这里可以加对属性的特殊处理
			switch(key){
			default:
				this.callParent(key, oldValue, value);
			}
		}
	});

	return {'$UI/system/components/justep/widgets/widgets': cls};
});