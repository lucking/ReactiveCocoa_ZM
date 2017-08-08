/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {

	var Component = require("$UI/system/lib/base/component"), 
		Str = require("$UI/system/lib/base/string"),
		ViewComponent = require("$UI/system/lib/base/viewComponent"),
		url = require.normalizeName("./navs");
	var ComponentConfig = require("./navs.config");

	require("$UI/system/components/justep/common/res");
	require('css!./css/navs').load();
	
	var Navs = ViewComponent.extend({
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
			return Str.format("<div class='x-bar' xid='{0}' componet='{1}'></div>", config.xid);
		},
		
		getConfig: function(){
			return ComponentConfig; 
		},
		
		init: function(){
			this.callParent();
			this.$el = $(this.domNode);
			var items = $('>li', this.$el),
				me = this;
			items.click(function(e){
				var $item = $(this);
				if(!$item.hasClass('active')){
					items.removeClass('active');
					$item.addClass('active');
					var index = $item.index();
					me.fireEvent('onClick', {source: me, index: index});
				}
			});
		}
	});
	
	Component.register(url, Navs);
	return Navs;
});
