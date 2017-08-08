/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
	require('css!./contents').load();
	
	var $ = require("jquery");
	var Contents = require("../contents");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var Component = require("$UI/system/lib/base/component");
	var Content = require("../content");
	var bind = require("bind");
	
	xuiService.regComponents({"$UI/system/components/justep/contents/content":Content});//动态注册组件

	var cls = Contents.extend({
		init:function(value, bindingContext){
			this.callParent(value, bindingContext);

			$('>.x-contents-content', this.$domNode).each(function(i, b){
				$(this).attr("d_canAddChild", "true").attr('d_resizable', false).selectable(true);
			});
		},
		add: function(){
			xuiService.getXuiDoc().createComponent("$UI/system/components/justep/contents/content", this, {paintComponent:true}, function(el){
				var id = $(el).attr('d_id');
				$('[d_id=' + id + ']').attr("d_canAddChild", "true").attr('d_resizable', false).selectable(true);
			});
		}
	});

	return {'$UI/system/components/justep/contents/contents':cls};
});