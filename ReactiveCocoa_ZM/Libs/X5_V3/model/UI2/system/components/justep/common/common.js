/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var WindowDialog = require("$UI/system/components/justep/windowDialog/windowDialog");
	require('css!./css/common').load();
	var Message = {};
	Message.message = function(containerID, message) {
		$("#" + containerID).addClass("aler-message");
		$("#" + containerID).html(message.toString());
		$("#" + containerID).slideDown('fast', "linear", function() {
			setTimeout(function() {
				$("#" + containerID + ":visible").fadeOut();
			}, 2000);
		});
	};
	Message.openPage = function(params) {
		var dialog;
		if (!dialog) {
			dialog = new WindowDialog({
				title : 'testPage',
				showTitle : false,
				status : 'maximize',
				src : params.url,
				parentNode : params.parent
			});
		}
		dialog.open({data : params.value});
	};
	Message.flag = false;
	return Message;
});