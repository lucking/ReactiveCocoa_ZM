/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {

	var Component = require("$UI/system/lib/base/component"), 
		Str = require("$UI/system/lib/base/string"),
		ViewComponent = require("$UI/system/lib/base/viewComponent"),
		url = require.normalizeName("./alert");
	var ComponentConfig = require("./alert.config");

	require("$UI/system/components/justep/common/res");
	require('css!./css/alert').load();
	
	var Alert = ViewComponent.extend({
		getUrl : function() {
			return url;
		},
		// 构造函数
		constructor : function(options) {
			this.callParent(options);
		},
		// 动态创建组件
		buildTemplate : function(config) {
			//default value
			return Str.format("<div class='x-alert' xid='{0}' componet='{1}'></div>", config.xid);
		},
		
		getConfig: function(){
			return ComponentConfig; 
		},
		
		show: function(){
			this.$el.show();
			if(this.autoHide){
				var me = this;
				this.autoHideId = setTimeout(function(){
					me.hide();
				}, this.autoHide);
			}
		},
		
		hide: function(){
			this.$el.hide();
			clearTimeout(this.autoHideId);
		},
		
		init: function(){
			this.autoHide = null;
			this.callParent();
			this.$el = $(this.domNode);
			var me = this;
			$('>.close', this.$el).click(function(){
				me.hide();
			})
			if(this.autoHide){
				this.autoHide = parseInt(this.autoHide);
			}
		}
	});
	
	Component.register(url, Alert);
	return Alert;
});
