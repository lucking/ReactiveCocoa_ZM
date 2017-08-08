/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var justep = require('$UI/system/lib/justep');
	var Radio = require("./radio");

	var url = require.normalizeName("./toggle");
	var ComponentConfig = require("./toggle.config");

	var Toggle = Radio.extend({
		constructor : function(options) {
			this.callParent(options);
			this.type = 'checkbox';
			this._defaultClass = 'x-toggle';
		},
		getConfig : function() {
			return ComponentConfig;
		},

		_buildInput : function(config) {
			return "<input " + " name='" + config['name'] + "'" + " value='" + config['value'] + "'"
					+ (config['checked'] ? " checked='checked'" : "") + " type='" + config['type'] + "' class='" + this._defaultClass + "'/>";
		},
		_buildLabel : function(config) {
			return "<label " + "data-on='" + (config['label'] && config['label'].on ? config['label'].on : 'ON') + "'" + "data-off='"
					+ (config['label'] && config['label'].off ? config['label'].off : 'OFF') + "'" + "'><span/></label>";
		},
		propertyChangedHandler : function(key, oldVal, value) {
			switch (key) {
			case "type":
				if (oldVal != value && this._inited)
					this._getInput().attr('type', value);
				break;
			case "label":
				if (this._inited) {
					if (!value)
						value = {};
					if (!value.on)
						value.on = 'ON';
					if (!value.off)
						value.off = 'OFF';
					this._getLabel().attr('data-on', value.on).attr('data-off', value.off);
				}
				break;
			default:
				this.callParent(key, oldVal, value);
			}
		}

	});

	justep.Component.register(url, Toggle);
	return Toggle;
});