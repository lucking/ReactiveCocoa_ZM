/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define([(function(){
	//TODO 增加本地能力
	if(navigator.userAgent.indexOf('JustepApp') != -1 && false){
		return "./uploader-ios";
	}else{
		return "./uploader-html5";
	}
})(), "require", "res!./uploader-ios.js", "res!./uploader-html5.js"],function(Uploader, require){
	require("res!./uploader-ios.js");
	require("res!./uploader-html5.js");
	return Uploader;
});