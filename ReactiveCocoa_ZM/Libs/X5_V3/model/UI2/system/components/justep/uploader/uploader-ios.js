/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var Object = require('$UI/system/lib/base/object'), 
		Observable = require('$UI/system/lib/base/observable'),
		$ = require('jquery');
		require("$UI/system/lib/cordova/cordova");
	
	var Uploader = Object.extend({
		mixins : Observable,
		constructor : function(selector, config) {
			var defaultConfig = {
				name : 'userfile',
				data : {},
				autoUpload : true,
				states : true,
				actionUrl : '',
				requestHeader : {},
				uploadComplete: this.uploadComplete
			};

			var self = this;
			self.config = $.extend(defaultConfig, config);
			self.callParent();
			Observable.prototype.constructor.call(self);
			this.$rootElement = $(selector);
			this.$rootElement.on('click', function() {
				self.onButtonClick.apply(self, arguments);
			});
			this.enable = true;
			self.changeState('browse');
		}
	});
	
	Uploader.prototype.addData = function(data) {
	};
	
	Uploader.prototype.setEnable = function(enable) {
		this.enable = enable;
	};
	

	Uploader.prototype.onButtonClick = function() {
		if(this.enable){
			navigator.uploader.upload(this.config,this);
		}
	};
	
	Uploader.prototype.changeState = function(state) {
	};
	
	Uploader.prototype.uploadComplete = function(response,fileName) {
		var self = this;
		self.fireEvent('onSuccess', {
			response : response,
			fileName : fileName
		});
	};
	
	Uploader.prototype.uploadError = function(response,fileName) {
		var self = this;
		self.fireEvent('onError', {
			response:response,
			fileName:fileName
		});
	};

	Uploader.prototype.parseResponse = function(response) {
	};

	

	

	Uploader.prototype.reset = function() {
	};
	
	return Uploader;
});