/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var justep = require("$UI/system/lib/justep");
	var Radio = require("./radio");

	var url = require.normalizeName("./checkbox");
	var ComponentConfig = require("./checkbox.config");

	var Checkbox = Radio.extend({
		_defaultClass : "x-checkbox",
		_type : 'checkbox',

		getConfig : function() {
			return ComponentConfig;
		}

	});

	justep.Component.register(url, Checkbox);
	return Checkbox;
});