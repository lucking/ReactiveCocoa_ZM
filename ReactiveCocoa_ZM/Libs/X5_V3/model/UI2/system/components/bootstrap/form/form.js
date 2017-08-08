/*! 
 * E5 v3 (htttp://www.justep.com) 
 * Copyright 2014 Justep, Inc.
 */
define(function(require) { 
	require("$UI/system/components/justep/common/res");
	var Component = require("$UI/system/lib/base/component");
	var ViewComponent = require("$UI/system/lib/base/viewComponent");
	require('css!./css/form').load();
	var url = require.normalizeName("./form");
	Component.register(url, ViewComponent);
	return ViewComponent;
});