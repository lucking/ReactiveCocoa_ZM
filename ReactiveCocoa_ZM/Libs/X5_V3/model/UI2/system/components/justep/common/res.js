/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var justep = require('$UI/system/lib/justep');
	require("css!../../bootstrap/lib/css/bootstrap").load();
	require('css!../../bootstrap/lib/css/bootstrap-theme').load();
	require('css!./css/forms').load();
	if(justep.Browser.IE) require('css!./css/IE/input.ie').load();
	if(justep.Browser.IE8) require('css!./css/IE/radio.ie8').load();
	if(justep.Browser.IE8 || justep.Browser.IE9){
		require('css!./css/IE/button.ie9').load();
		require('css!./css/IE/labelEdit.ie9').load();
	}
	if(justep.Browser.isIphone || justep.Browser.isIpad) require('css!./css/ios').load();
});