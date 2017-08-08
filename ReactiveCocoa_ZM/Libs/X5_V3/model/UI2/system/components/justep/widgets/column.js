/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	
	var Component = require("$UI/system/lib/base/component"),
		Str = require("$UI/system/lib/base/string"),
		ViewComponent = require("$UI/system/lib/base/viewComponent"),
		url = require.normalizeName("./column");
	var ComponentConfig = require("./column.config");
	
    var Column = ViewComponent.extend({
		constructor: function(config){
			this.callParent(config);
		},
		init: function(value, bindingContext){
			//TODO:
			this.owner = Component.getComponent(this.$domNode.parent().get(0));
			//注册到owner
			
			this.callParent(value, bindingContext);
		},
		getConfig: function(){
			return ComponentConfig;
		},
		dispose: function(){
			//TODO
			//this.owner.remove(this);
			this.owner = null;
		}
	});
    
    Component.register(url, Column);

    return Column;
});