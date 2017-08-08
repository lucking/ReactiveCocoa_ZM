/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	var Uploader = require('$UI/system/components/justep/uploader/uploader');
				require('$UI/system/lib/cordova/test/console');
	
	var Model = function(){
		this.callParent();
		this.on('onLoad',function(){
			var uploader = new Uploader('#rootElement',{
				data:{
					"adsfa":"sdfsdfd"
				},
                actionUrl:'http://mindsaur.com/demo/fileupload/src/php/getfile.php'
            });	
			
			uploader.on('onFileSelect',function(event){
				if(confirm("取消上传")){
					event.cancel = true;
				}
			});
			uploader.on('onStart',function(){
				console.log('onstart:' + JSON.stringify(arguments[0]));	
			});
			
			uploader.on('onProgress',function(){
				console.log('onProgress:' + JSON.stringify(arguments[0]));	
			});
			
			uploader.on('onFileSelected',function(){
				console.log('onFileSelected:' + JSON.stringify(arguments[0]));
			});
			uploader.on('onSuccess',function(){
				console.log('onSuccess:' + JSON.stringify(arguments[0]));
			});
			uploader.on('onError',function(){
				console.log('onError:' + JSON.stringify(arguments[0]));
			});
		});
	};
	return Model;
});
