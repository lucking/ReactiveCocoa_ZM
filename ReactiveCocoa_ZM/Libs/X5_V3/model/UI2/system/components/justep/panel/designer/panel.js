/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
	require('css!./panel').load();
	
	var $ = require("jquery");
	var Panel = require("$UI/system/components/justep/panel/panel");
	var Component = require("$UI/system/lib/base/component");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var bind = require("bind");
	var Child = require('./child');
	var Util = require("$UI/system/components/justep/common/designer/common");
 
	xuiService.regComponents({"$UI/system/components/justep/panel/panel#top":Child,"$UI/system/components/justep/panel/panel#content":Child,"$UI/system/components/justep/panel/panel#bottom":Child});//动态注册组件
	
	var cls = Panel.extend({
		init:function(value, bindingContext){
			this.callParent(value, bindingContext);
			var me = this;
			
			this.$top.attr("d_canAddChild", "true").attr('d_resizable', false);
			this.$content.attr("d_canAddChild", "true").attr("d_canRemove",false).attr('d_resizable', false);
			this.$bottom.attr("d_canAddChild", "true").attr('d_resizable', false);
			
			$('.ctn').mouseover(function(){
				$(this).addClass('outline');
			}).mouseout(function(){
				$(this).removeClass('outline');
			});
		},
		setVisible: function(){
			//忽略了设置
		},
		addTop: function(){
			var id = this.$content.attr('d_id'), me = this;
			xuiService.getXuiDoc().createComponent("$UI/system/components/justep/panel/panel#top", this, {before:id, paintComponent:true}, function(){
        		$('>.x-panel-content', me.$domNode).css('top', $('>.x-panel-top', me.$domNode).height());
			});
		},
		addBottom: function(){
			var id = this.$content.attr('d_id'), me = this;
			xuiService.getXuiDoc().createComponent("$UI/system/components/justep/panel/panel#bottom", this, {paintComponent:true}, function(){
        		$('>.x-panel-content', me.$domNode).css('bottom', $('>.x-panel-bottom', me.$domNode).height());
			});
		},
		onBuildMenu:function(event){
		  event.enableStatus = event.enableStatus || {}; 
		  if($('>.x-panel-top', this.$el).length>0)
			  event.enableStatus.addTop = false;
		  if($('>.x-panel-bottom', this.$el).length>0)
			  event.enableStatus.addBottom = false;
		}		
	});

	return {'$UI/system/components/justep/panel/panel':cls};
});