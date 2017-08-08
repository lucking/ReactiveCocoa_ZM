/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var justep = require("$UI/system/lib/justep");
	var Input = require("./input");

	var url = require.normalizeName("./password");
	var ComponentConfig = require("./password.config");

	var Password = Input.extend({
		getConfig : function() {
			return ComponentConfig;
		},

		buildTemplate : function(config) {
			if (!config)
				config = {};
			this.set(config);
			if (!config['class'])
				config['class'] = 'form-control';
			return "<input class='" + config['class'] + "' " + (config.style ? (" style='" + config.style + "' ") : "")
					+ (config.xid ? (" xid='" + config.xid + "' ") : "") + " component='" + url + "' type='password'" + " ></input>";
		}
	});
	justep.Component.register(url, Password);
	return Password;
});