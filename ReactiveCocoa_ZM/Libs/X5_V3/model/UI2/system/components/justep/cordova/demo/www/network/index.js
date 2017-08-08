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
			function eventOutput(s) {
			    var el = document.getElementById("results");
			    el.innerHTML = el.innerHTML + s + "<br/>";
			}

			function printNetwork() {
			    eventOutput("navigator.connection.type=" + navigator.connection.type);
			    eventOutput("navigator.network.connection.type=" + navigator.network.connection.type);
			}

			/**
			 * Function called when page has finished loading.
			 */
			function init() {
			    var deviceReady = false;
			    function onEvent(e) {
			        eventOutput('Event of type: ' + e.type);
			        printNetwork();
			    }
			    document.addEventListener('online', onEvent, false);
			    document.addEventListener('offline', onEvent, false);
			    document.addEventListener("deviceready", function() {
			        deviceReady = true;
			        eventOutput("Device="+device.platform+" "+device.version);
			        printNetwork();
			    }, false);
			    window.setTimeout(function() {
			        if (!deviceReady) {
			            alert("Error: Cordova did not initialize.  Demo will not run correctly.");
			        }
			    }, 5000);
			}

			  addListenerToClass('printNetwork', printNetwork);
			  addListenerToClass('backBtn', backHome);
			  init();

		});
	};
	return Model;
});
