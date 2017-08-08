/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	
	var Component = require("$UI/system/lib/base/component"),
		Observable = require("$UI/system/lib/base/observable"),
		Object = require("$UI/system/lib/base/object"),
		justep = require('$UI/system/lib/justep'),
		Str = require("$UI/system/lib/base/string"),
		ViewComponent = require("$UI/system/lib/base/viewComponent"),
		$ = require("jquery"),
		url = require.normalizeName("./child");
	var ComponentConfig = require("./child.config");
	
    var Child = ViewComponent.extend({
		constructor: function(config){
			this.height = '48';
			this.visible = true;
    		this.callParent(config);
		},
		init: function(value, bindingContext){
			this.owner = Component.getComponent(this.$domNode.parent().get(0));
			this.name = this._getName();
			this.owner[this.name] = this;
			this.callParent(value, bindingContext);
		},
		getConfig: function(){
			return ComponentConfig;
		},
		
		_getName: function(){
			var cls = this.$domNode.attr('class');
			if(cls.indexOf('x-panel-top') != -1)
				return 'top';
			if(cls.indexOf('x-panel-bottom') != -1)
				return 'bottom';
			if(cls.indexOf('x-panel-left') != -1)
				return 'left';
			if(cls.indexOf('x-panel-right') != -1)
				return 'right';
			if(cls.indexOf('x-panel-content') != -1)
				return 'content';
		},
		/**
		 * 获取属性值
		 * @method get
		 * @param {String} name 
		 * @returns
		 */
		get: function(name){
			name = 'get' + Str.camelize(name);
			if(this.owner[name])
				return this.owner[name](this.name);
		},
		/**
		 * 设置属性值
		 * @method set
		 * @param {String} name 
		 * @param value 
		 */
		set: function(name, value){
			this[name] = value;
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
		},
		dispose: function(){
			this.owner.remove(this.name);
			this.owner = null;
		},
		propertyChangedHandler: function(key, oldVal, value){
			switch(key){
			case 'height':
				this.set(key, value);
				break;
			}
		}
	});
    
    Component.register(url, Child);

    return Child;
});