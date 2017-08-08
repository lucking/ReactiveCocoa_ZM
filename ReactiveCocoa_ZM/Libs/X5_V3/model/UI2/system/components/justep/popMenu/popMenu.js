/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	require("$UI/system/components/justep/common/res");
	require('css!./css/popMenu').load();
	var Component = require("$UI/system/lib/base/component");
	var PopOver = require("../popOver/popOver");
	var url = require.normalizeName("./popMenu");
	var ComponentConfig = require("./popMenu.config");

	var PopMenu = PopOver.extend({
		baseCls: 'x-popMenu',
		overlayCls: 'x-popMenu-overlay',
		contentCls: 'x-popMenu-content',
		autoHidable: true,
		constructor: function(){
			this.callParent();
		},
		getConfig: function(){
			return ComponentConfig;
		},
		buildTemplate: function(config){
			return null;
        },
        init: function(value, bindingContext){
			this.callParent(value, bindingContext);
			var me = this;
			this.$content.click(function(){
				if(me.autoHidable)
					me.hide();
			});
		},
		propertyChangedHandler: function(key, oldVal, value){
			switch(key){
			default:
			}
			this.callParent(key, oldVal, value);
		}
    });
	
	Component.register(url, PopMenu);
	return PopMenu;
});