/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
	var $ = require("jquery");
	var Panel = require("$UI/system/components/justep/wing/wing");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var Child = require('../child');
 
	require('css!./wing').load();
	
	xuiService.regComponents({"$UI/system/components/justep/wing/wing#left":Child,"$UI/system/components/justep/wing/wing#content":Child,"$UI/system/components/justep/wing/wing#right":Child});//动态注册组件
	
	var cls = Panel.extend({
		init:function(value, bindingContext){
			this.callParent(value, bindingContext);
			this.animate = false;
			this.display = 'overlay';
			this.onlyOne = 'true';
			
			this.$left.attr("d_canAddChild", "true").attr("d_resizable",false);
			this.$content.attr("d_canAddChild", "true").attr("d_canRemove",false);
			this.$right.attr("d_canAddChild", "true").attr("d_resizable",false);
			
		},
		addLeft: function(){
			var id = this.$content.attr('d_id');
			xuiService.getXuiDoc().createComponent("wing#left", this, {before:id, paintComponent:true});
		},
		addRight: function(){
			var id = this.$content.attr('d_id');
			xuiService.getXuiDoc().createComponent("wing#right", this, {before:id, paintComponent:true});
		},
		propertyChangedHandler: function(key, oldValue, value){
			switch(key){
			case 'animate':
			case 'display':	
				break;
			default:
				this.callParent(key, oldValue, value);
			}
		},
		onBuildMenu: function(event){
			event.enableStatus = event.enableStatus || {}; 
			if($('>.x-wing-left', this.$el).length>0)
				event.enableStatus.addLeft = false;
			if($('>.x-wing-right', this.$el).length>0)
				event.enableStatus.addRight = false;
		}		
	});

	return {'$UI/system/components/justep/wing/wing':cls};
});