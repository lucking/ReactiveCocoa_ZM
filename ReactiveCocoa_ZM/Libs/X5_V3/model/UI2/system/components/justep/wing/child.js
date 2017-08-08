/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	
	var Component = require("$UI/system/lib/base/component"),
		Str = require("$UI/system/lib/base/string"),
		ViewComponent = require("$UI/system/lib/base/viewComponent"),
		url = require.normalizeName("./child");
	var ComponentConfig = require("./child.config");
	
    var Child = ViewComponent.extend({
		constructor: function(config){
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
			if(cls.indexOf('x-wing-left') != -1)
				return 'left';
			if(cls.indexOf('x-wing-right') != -1)
				return 'right';
			if(cls.indexOf('x-wing-content') != -1)
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
		onAfterSelect: function(){
			this.owner.show(this.name);
		},
		dispose: function(){
			this.owner.remove(this.name);
			this.owner = null;
		}
	});
    
    Component.register(url, Child);

    return Child;
});