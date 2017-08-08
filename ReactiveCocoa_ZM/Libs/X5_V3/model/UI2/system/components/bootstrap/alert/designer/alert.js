/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
	require('css!./alert').load();
	var Alert = require("../alert");
	
	var cls = Alert.extend({
		init:function(value, bindingContext){
			this.callParent(value, bindingContext);
		}
	});

	return {'$UI/system/components/bootstrap/alert/alert':cls};
});