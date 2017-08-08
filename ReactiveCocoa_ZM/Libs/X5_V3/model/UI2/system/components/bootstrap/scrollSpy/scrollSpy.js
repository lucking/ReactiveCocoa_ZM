/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {

	var Component = require("$UI/system/lib/base/component"), 
		Str = require("$UI/system/lib/base/string"),
		ViewComponent = require("$UI/system/lib/base/viewComponent"),
		url = require.normalizeName("./scrollSpy");
	var ComponentConfig = require("./scrollSpy.config");
	
	require("$UI/system/components/justep/common/res");
	require("../lib/js/bootstrap");
	require("css!./css/scrollSpy").load();

	var ScrollSpy = ViewComponent.extend({
		getUrl : function() {
			return url;
		},
		// 构造函数
		constructor : function(options) {
			this.selector = "";
			this.callParent(options);
		},
		// 动态创建组件
		buildTemplate : function(config) {
			//default value
			return Str.format("<div xid='{0}' componet='{1}'></div>", config.xid);
		},
		
		getConfig: function(){
			return ComponentConfig; 
		},
		
		init: function(){
			this.callParent();
			this.$el = $(this.domNode);
			if(this.selector)
				this.$el.scrollspy({ target: this.selector});
		}
	});
	
	Component.register(url, ScrollSpy);
	return ScrollSpy;
});
