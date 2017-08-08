/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var justep = require('$UI/system/lib/justep');
	var Checkbox = require("../button/checkbox");
	var RadioGroup = require("./radioGroup");

	var url = require.normalizeName("./checkboxGroup");
	var ComponentConfig = require("./checkboxGroup.config");

	var CheckboxGroup = RadioGroup.extend({
		getConfig : function() {
			return ComponentConfig;
		},

		val : function(val) {
			if (arguments.length === 0) {
				var ret = [];
				this.$domNode.find("input:checked").each(function() {
					ret.push($(this).val());
				});
				return ret.join(' ');
			}
			if (null === val || undefined === val)
				val = '';
			var vs = ('' + val).split(' ');
			this.$domNode.find('input').each(function() {
				var o = $(this);
				o.prop('checked', -1 < $.inArray(o.val(), vs));
			});
		},
		_buildForeachTemplate : function(cfg) {
			var cb = new Checkbox();
			return cb.buildTemplate({
				name : cfg.name,
				'bind-value' : cfg['bind-itemsetValue'],
				'bind-label' : cfg['bind-itemsetLabel']
			});
		},
		buildTemplate : function(config) {
			if (!config)
				config = {};
			this.set(config);
			if (!config['class'])
				config['class'] = 'x-checkbox-group';
			var ret = "<div class='" + config['class'] + "' " + (config.style ? (" style='" + config.style + "' ") : "")
					+ (config.xid ? (" xid='" + config.xid + "' ") : "") + " data-bind='foreach:" + config.itemset + "' " + " component='" + url
					+ "' >" + this._buildForeach(config) + "</div>";
			delete config['bind-itemset'];
			delete config['bind-itemsetValue'];
			delete config['bind-itemsetLabel'];
			return ret;
		}
	});

	justep.Component.register(url, CheckboxGroup);
	return CheckboxGroup;
});