/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	
	require("$UI/system/components/justep/common/res");
	require('css!./css/menu').load();
	
	var Component = require("$UI/system/lib/base/component");
	var ViewComponent = require("$UI/system/lib/base/viewComponent");
	var $ = require("jquery");
	var url = require.normalizeName("./menu");

	var ComponentConfig = require("./menu.config");
	
	
    var Menu = ViewComponent.extend({
		baseCls: 'x-menu',
		constructor: function(options){
			this.callParent(options);
		},
		getConfig: function(){
			return ComponentConfig;
		},
		buildTemplate: function(config){
		},
		init: function(value, bindingContext){
			this.callParent(value, bindingContext);
			this.$el = $(this.domNode);
		}
    });
    
    Component.register(url, Menu);

    return Menu;
});