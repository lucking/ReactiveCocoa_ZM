define([ (function() {
	var deviceTypes = new Array("Android", "iPhone", "iPad", "iPod", "Windows Phone", "Generic");
	var userAgentInfo = navigator.userAgent;
	var isSimulator = window.parent && window.parent.getOSName;
	
	function currentDevice() {
		for ( var v = 0; v < deviceTypes.length; v++) {
			var i = userAgentInfo.indexOf(deviceTypes[v]);
			if (i > 0) {
				return v;
			}
		}
		return deviceTypes.length - 1;
	}

	var isX5App = (userAgentInfo.indexOf("x5app") >= 0) || (userAgentInfo.indexOf("Crosswalk") >= 0);
	
	var deviceTypeID = currentDevice();
	
	//ie8 no support
	//console.log("当前浏览器环境：" + deviceTypes[deviceTypeID] + (isX5App ? " x5app" : (isSimulator ? " 模拟器" : "")));
 
	if (!window.isInDesigner && (isX5App || isSimulator)) {
		if (isSimulator){
			return "./simulator/cordova"; //zmh 模拟器环境下不需要加.js后缀 
		}else if ((deviceTypes[deviceTypeID] == "iPhone") || (deviceTypes[deviceTypeID] == "iPad") || (deviceTypes[deviceTypeID] == "iPod")) {
			return "/cordova.js";
		} else if (deviceTypes[deviceTypeID] == "Android") {
			return "/cordova.js";
		} 
	}
})() ], function(cordova) {
	return cordova;
});
