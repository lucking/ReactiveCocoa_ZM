/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var justep = require("$UI/system/lib/justep");
	var Input = require("./input");

	var url = require.normalizeName("./range");
	var ComponentConfig = require("./range.config");

	var Range = Input.extend({
		constructor : function(options) {
			this.callParent(options);
			this.min = 0;
			this.max = 100;
		},
		getConfig : function() {
			return ComponentConfig;
		},
		buildTemplate : function(config) {
			if (!config)
				config = {};
			this.set(config);
			if (!config['class'])
				config['class'] = '';
			return "<input class='" + config['class'] + "' " + (config.style ? (" style='" + config.style + "' ") : "")
					+ (config.xid ? (" xid='" + config.xid + "' ") : "") + " component='" + url + "' type='range'" + " ></input>";
		}
	});
	justep.Component.register(url, Range);
	return Range;
});