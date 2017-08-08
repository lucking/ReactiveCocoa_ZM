/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var justep = require("$UI/system/lib/justep");
	require("css!$UI/system/components/bootstrap/lib/css/bootstrap").load();
	require("$UI/system/lib/cordova/cordova");require("css!$UI/system/components/justep/cordova/demo/cordova.css").load();
	require("$UI/system/components/justep/cordova/demo/www/cordova-incl");
	

	var Model = function() {
		this.callParent();
		this.on('onLoad', function() {
			var deviceReady = false;

			//-------------------------------------------------------------------------
			// Vibrations
			//-------------------------------------------------------------------------

			var vibrate = function(){
			  navigator.notification.vibrate(2500);
			};


			/**
			 * Function called when page has finished loading.
			 */
			function init() {
			    document.addEventListener("deviceready", function() {
			            deviceReady = true;
			            console.log("Device="+device.platform+" "+device.version);
			        }, false);
			    window.setTimeout(function() {
			        if (!deviceReady) {
			            alert("Error: Apache Cordova did not initialize.  Demo will not run correctly.");
			        }
			    },5000);
			}

			  addListenerToClass('vibrate', vibrate);
			  addListenerToClass('backBtn', backHome);
			  init();

		});
	};
	return Model;
});
