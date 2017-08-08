/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	require("$UI/system/components/justep/common/res");

	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	var url = require.normalizeName("./textarea");
	var ComponentConfig = require("./textarea.config");

	var Textarea = justep.BindComponent.extend({
		getConfig : function() {
			return ComponentConfig;
		},
		// 构造函数
		constructor : function(options) {
			this.callParent(options);
			this.disabled = false;
			this.placeHolder = '';
		},

		dispose : function() {
			this.removeHandlers();
			this.callParent();
		},

		// 动态创建组件
		buildTemplate : function(config) {
			if (!config)
				config = {};
			this.set(config);
			if (!config['class'])
				config['class'] = 'form-control';
			return "<textarea class='" + config['class'] + "' " + (config.style ? (" style='" + config.style + "'") : "")
					+ (config.xid ? (" xid='" + config.xid + "'") : "") + " component='" + url + "'" + " ></textarea>";
		},

		// 初始化
		doInit : function(value, bindingContext) {
			this.addHandlers();
		},
		set : function(value){
			this.callParent(value);
			if(value && value.hasOwnProperty("value")) this.val(value['value']);
		},
		get : function(name){
			if('value'==name) return this.val();
			else return this.callParent(name);	
		},
		val : function(val) {
			var originalValue = this.$domNode.val();
			if (arguments.length === 0)
				return originalValue;
			if (val != originalValue) {
				var o = this.$domNode;
				if (this._inited)
					this.fireEvent('onChange', {
						'source' : this,
						'value' : val
					});
				if (val === undefined || val === null)
					val = '';
				o.val(val);
			}
		},
		addHandlers : function() {
			this.$domNode.on('change', $.proxy(this.doChange, this));
		},

		removeHandlers : function() {
			this.$domNode.off('change', $.proxy(this.doChange, this));
		},

		doChange : function(e) {
			this.fireEvent('onChange', {
				'source' : this,
				'value' : this.$domNode.val()
			});
			this.val2ref();
		},

		clear : function() {
			this.val(null);
		}
	});

	justep.Component.register(url, Textarea);
	return Textarea;
});