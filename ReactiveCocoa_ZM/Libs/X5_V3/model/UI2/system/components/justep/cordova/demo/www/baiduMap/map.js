define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	require("$UI/system/lib/cordova/cordova");require("css!$UI/system/components/justep/cordova/demo/cordova.css").load();
	require("$UI/system/components/justep/cordova/demo/www/cordova-incl");
	
	var Model = function(){
		this.callParent();
		var self = this;
		this.on('onLoad',function(){
			var deviceReady = false;
			document.addEventListener("deviceready", function() {
				deviceReady = true;
				navigator.geolocation.getCurrentPosition(function(event){
			    	var url =  "./map.html?latitude="+event.coords.latitude+"&longitude=" + event.coords.longitude;
			    	$(self.getElementByXid('mapContent')).html('<iframe src="'+url+'" width="100%" height="100%"></iframe>');
			    }, function(){
			    	$(self.getElementByXid('mapContent')).html('<iframe src="./map.html" width="100%" height="100%"></iframe>');
			    }, {enableHighAccuracy: true});
		    }, false);
		    window.setTimeout(function() {
		    	if (!deviceReady) {
		    		alert("Error: Apache Cordova did not initialize.  Demo will not run correctly.");
		    		$(self.getElementByXid('mapContent')).html('<iframe src="./map.html" width="100%" height="100%"></iframe>');
		    	}
		    },5000);
			
			
			
			    
		});
	};
	Model.prototype.closeWin = function(event){
		window.backHome();
	};
	return Model;
});
