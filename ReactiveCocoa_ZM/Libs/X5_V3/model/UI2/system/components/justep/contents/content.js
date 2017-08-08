/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	
	var Component = require("$UI/system/lib/base/component");
	var Observable = require("$UI/system/lib/base/observable");
	var Object = require("$UI/system/lib/base/object");
	var justep = require('$UI/system/lib/justep');
	var Str = require("$UI/system/lib/base/string");
	var ViewComponent = require("$UI/system/lib/base/viewComponent");
	var $ = require("jquery");
	var url = require.normalizeName("./content");
	var ComponentConfig = require("./content.config");
	var WindowContainer = require("$UI/system/components/justep/windowContainer/windowContainer");
	
	
    var Content = ViewComponent.extend({
		/**
		 * 当激活进入
		 * @event onActive
		 * @param {slidePanel} source
		 * @param {Integer} index
		 */
		/**
		 * 当离开
		 * @event onInactive
		 * @param {slidePanel} source
		 * @param {Integer} index
		 */
		constructor: function(config){
			this.xid = '';
    		this.callParent(config);
		},
		
		getConfig : function(){
			return ComponentConfig;
		},
    	buildTemplate: function(config){
    		config.xid = config.xid || '';
    		config.body = config.body || '';

    		var html = Str.format("<div component='$model/UI2/system/components/justep/contents/content' " +
    			"class='x-contents-content' xid='{0}'>{1}</div>", config.xid, config.body);
    		html = $(html);
    		
    		this.owner = config.owner;
    		this.owner.$el.append(html);
    		this.xid = config.xid;
    		this.index = html.index();
    		return html;
    	},
		init: function(value, bindingContext){
			this.owner = Component.getComponent(this.$domNode.parent().get(0));
			this.owner.contents.push(this);
			this.xid = this.$domNode.attr('xid');
			this.index = this.$domNode.index();
			this.callParent(value, bindingContext);
		},
		/**
		 * 获取属性值
		 * @method get
		 * @param {String} name 
		 * @returns
		 */
		get: function(name){
			if(this[name] != undefined)
				return this[name];
			name = 'get' + Str.camelize(name);
			if(this.owner[name])
				return this.owner[name](this.index);
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
	    			this.owner[name](this.index, value);
			}
		},
		onAfterSelect: function(){
			this.owner.to(this.index);
		},
		active: function(){
			this.owner.to(this.xid);
		},
		destroy: function(){
			this.$domNode.remove();
			this.owner = null;
		},
		dispose: function(){
			this.owner.remove(this.index);
		},
		load: function(url, fn){
			var me = this;
			var compose = this.compose = new WindowContainer({parentNode: this.$domNode.get(0), src: url,
				onLoad: function(){
					fn && fn();
					me.on("onActive", function(){
						if(compose.getInnerModel())
							compose.getInnerModel().fireEvent('onActive');
					})
				},
				onLoadError: function(err){
					fn && fn(err);
				}
			});
		}
	});
    
    Component.register(url, Content);

    return Content;
});