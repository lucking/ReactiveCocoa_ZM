/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	require("$UI/system/components/justep/common/res");
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var Button = require("./button");

	var url = require.normalizeName("./buttonGroup");
	var ComponentConfig = require("./buttonGroup.config");

	var ButtonGroup = justep.BindComponent.extend({
		// 构造函数
		constructor : function(options) {
			this.callParent(options);
			this.disabled = false;
			this.tabbed = false;
			this.selected = null;
		},

		dispose : function() {
			this.$domNode.off('click', $.proxy(this._doClick, this));
			this.callParent();
		},

		getConfig : function() {
			return ComponentConfig;
		},

		buildTemplate : function(config) {
			if (!config)
				config = {};
			this.set(config);
			if (!config['class'])
				config['class'] = 'btn-group';
			return "<div class='" + config['class'] + "' " + (config['style'] ? (" style='" + config['style'] + "' ") : "")
					+ (config.xid ? (" xid='" + config.xid + "' ") : "") + " component='" + url + "' " + " ></div>";
		},

		doInit : function(value, bindingContext) {
			this.$domNode.on('click', $.proxy(this._doClick, this));
		},

		propertyChangedHandler : function(key, oldVal, value) {
			switch (key) {
			case "tabbed":
				if (oldVal != value && this._inited) {
					if (typeof (value) == 'string')
						value = value == 'true';
					var func = value ? "addClass" : "removeClass";
					this.$domNode[func](key);
				}
				break;
			case "selected":
				if (oldVal != value)
					this.select(value);
				break;
			default:
				this.callParent(key, oldVal, value);
			}
		},
		_doClick : function(evt) {
			if (this.tabbed) {
				var btn = this._getBtn(evt.target);
				this.select(btn);
			}
		},
		_getBtn : function(domNode) {
			if (domNode == this.domNode)
				return null;
			var btn = justep.Component.getComponent(domNode);
			if (btn instanceof Button)
				return btn;
			else
				return this._getBtn(domNode.parentNode);
		},
		select : function(btn) {
			if ('string' == typeof (btn)) {
				var m = this.getModel(), xid = btn;
				btn = m.comp(xid);
				if (!btn)// 组件还没有创建
					m.componentPromise(xid).done(function(component) {
						component.addClass('active');
					});
			}
			if (btn instanceof Button) {
				if (this.hasListener("onSelect")) {
					var eData = {
						source : this,
						item : btn,
						cancel : false
					};
					this.fireEvent("onSelect", eData);
					if (eData.cancel)
						return;
				}
				this.each(function(button) {
					var func = button !== btn ? 'removeClass' : 'addClass';
					button[func]('active');
				}, this);
			}
		},
		each : function(callback, caller) {
			if (typeof (callback) == 'function') {
				this.$domNode.children('a.btn').each(function() {
					var btn = justep.Component.getComponent(this);
					if (btn instanceof Button)
						callback.call(caller || window, btn);
				});
			}
		},
		render : function() {
			this.callParent();
			var attrs = [ "tabbed" ];
			for ( var i = 0; i < attrs.length; i++) {
				var func = this[attrs[i]] ? "addClass" : "removeClass";
				this.$domNode[func](attrs[i]);
			}
		}
	});

	justep.Component.register(url, ButtonGroup);
	return ButtonGroup;
});