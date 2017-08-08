/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {

	var Component = require("$UI/system/lib/base/component"), 
		Str = require("$UI/system/lib/base/string"),
		ViewComponent = require("$UI/system/lib/base/viewComponent"),
		Object = require("$UI/system/lib/base/object"),
		justep = require('$UI/system/lib/justep'),
		url = require.normalizeName("./titleBar");
	var ComponentConfig = require("./titleBar.config");

	require('css!./css/titleBar').load();
	
	var Bar = ViewComponent.extend({
		getUrl : function() {
			return url;
		},
		// 构造函数
		constructor : function(options) {
			this.title = "";
			this.callParent(options);
		},
		// 动态创建组件
		buildTemplate : function(config) {
			//default value
			config.right.reverse = (config.right.reverse===true || config.right.reverse===undefined)? true : false;
				
			return Str.format("<div class='x-titlebar' xid='{0}' componet='{1}'>" +
					"<div class='x-titlebar-left {2}'>{3}</div>" +
					"<div class='x-titlebar-title' style='display:{4}'>{5}</div>" +
					"<div class='x-titlebar-right {6}'>{7}</div>" +
					"</div>", 
					config.xid, url, 
					config.left.reverse? 'reverse':'', 
					config.left.body, 
					config.title? 'block' : 'none',
					config.title||'',
					config.right.reverse? 'reverse':'',
					config.right.body);
		},
		
		getConfig: function(){
			return ComponentConfig; 
		},
		
		init: function(){
			this.callParent();
			this.$left = $('>.x-titlebar-left', this.domNode);
			this.$right = $('>.x-titlebar-right', this.domNode);
			this.$title = $('>.x-titlebar-title', this.domNode);
			this.left = new Block({owner: this, name: 'left'});
			this.right = new Block({owner: this, name: 'right'});
		},
		setTitle: function(value){
			if(!value){
				value = '';
				$('>.x-titlebar-title', this.domNode).hide();
			}else{
				$('>.x-titlebar-title', this.domNode).show();
			}
			$('>.x-titlebar-title', this.domNode).html(value);
		},
		setReverse: function(name, value){
			if(typeof value == 'string')
				value = value == 'true';
			if(value)
				$('>.x-titlebar-' + name, this.domNode).addClass("reverse");
			else
				$('>.x-titlebar-' + name, this.domNode).removeClass("reverse");
		},
		propertyChangedHandler : function(key, oldVal, value) {
			switch (key) {
			case "title":
				this.setTitle(value);
				break;
			default:
				this.callParent(key, oldVal, value);
			}
		}

	});
	
    var Block = Object.extend({
		constructor: function(config){
			justep.Util.apply(this,config);
		},
		get: function(name){
			name = 'get' + Str.camelize(name);
			if(this.owner[name])
				return this.owner[name](this.name);
		},
		set: function(name, value){
			if(typeof name == 'object'){
				var config = name;
				for(var i in config){
					if(config.hasOwnProperty(i))
						this.set(i, config[i]);
				}
			}else{
				name = 'set' + Str.camelize(name);
				if(this.owner[name])
					this.owner[name](this.name, value);
			}
		}
    });

	Component.register(url, Bar);
	return Bar;
});
