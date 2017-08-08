define(function(require) {
	var justep = require("$UI/system/lib/justep");
	require("css!$UI/system/components/bootstrap/lib/css/bootstrap").load();
	require("$UI/system/lib/cordova/cordova");require("css!$UI/system/components/justep/cordova/demo/cordova.css").load();
	require("$UI/system/components/justep/cordova/demo/www/cordova-incl");
	

	var Model = function() {
		this.callParent();
		this.on('onLoad', function() {
			var deviceReady = false;

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

			/* Battery */
			function updateInfo(info) {
			    document.getElementById('level').innerText = info.level;
			    document.getElementById('isPlugged').innerText = info.isPlugged;
			    if (info.level > 5) {
			        document.getElementById('crit').innerText = "false";
			    }
			    if (info.level > 20) {
			        document.getElementById('low').innerText = "false";
			    }
			}

			function batteryLow(info) {
			    document.getElementById('low').innerText = "true";
			}

			function batteryCritical(info) {
			    document.getElementById('crit').innerText = "true";
			}

			function addBattery() {
			    window.addEventListener("batterystatus", updateInfo, false);
			}

			function removeBattery() {
			    window.removeEventListener("batterystatus", updateInfo, false);
			}

			function addLow() {
			    window.addEventListener("batterylow", batteryLow, false);
			}

			function removeLow() {
			    window.removeEventListener("batterylow", batteryLow, false);
			}

			function addCritical() {
			    window.addEventListener("batterycritical", batteryCritical, false);
			}

			function removeCritical() {
			    window.removeEventListener("batterycritical", batteryCritical, false);
			}
			addListenerToClass('addBattery', addBattery);
			  addListenerToClass('removeBattery', removeBattery);
			  addListenerToClass('addLow', addLow);
			  addListenerToClass('removeLow', removeLow);
			  addListenerToClass('addCritical', addCritical);
			  addListenerToClass('removeCritical', removeCritical);
			  
			  addListenerToClass('backBtn', backHome);
			  init();	
			

		});
	};
	return Model;
});

