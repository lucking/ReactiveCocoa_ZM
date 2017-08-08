/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var Object = require('$UI/system/lib/base/object'), 
		Observable = require('$UI/system/lib/base/observable'), 
		$ = require('jquery');

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
				signRequestEnabled : false,
				signHeader : '',
				defaultSuccessCodes : [ 200, 201 ]
			};
			var self = this;
			$.extend(this, $.extend(defaultConfig, config));
			self.callParent();
			Observable.prototype.constructor.call(self);
			this.$rootElement = $(selector);
			self.buildTarget();
			this.$loadingElement = self.buildLoadingElement();
			this.target.addEventListener('change', function() {
				self.onChanged.apply(self, arguments);
			});
			this.$rootElement.on('click', function() {
				self.onButtonClick.apply(self, arguments);
			});
			self.enable = true;
			self.changeState('browse');
		}
	});
	
	Uploader.prototype.setEnable = function(enable) {
		if(enable == false){
			this.enable = false;
			$(this.formElement()).css('visibility','hidden');
		}else if(enable == true){
			this.enable = true;
			$(this.formElement()).css('visibility','visible');
		}
	};
	
	Uploader.prototype.addData = function(data) {
		$.extend(this.data,data);
	};
	

	Uploader.prototype.buildTarget = function() {
		if (this.$rootElement.css('position') != 'absolute') {
			this.$rootElement.css({
				position : 'relative'
			});
		}
		var targetTpl = '<form style="position:absolute;top:-3px;right:-3px;bottom:-3px;left:-3px;"><input type="file" name="userfile" tabindex="-1" style="cursor: pointer;opacity:0;position: relative;z-index:999;width:100%;height:100%;overflow:hidden;"></form>';
		var $target = $(targetTpl).appendTo(this.$rootElement);
		var self = this;
		$target.on('click',function(e){
			var _data ={
				cancel:false,
				source:self
			};
			self.fireEvent('onFileSelect',_data);
			if(_data.cancel){
				e.preventDefault();
			}
		});
		this.target = $target.find('input').get(0);
		this.formElement = $target.get(0);

	};

	Uploader.prototype.buildLoadingElement = function() {
		var loadingEleTpl = '<span style="display:none"></span>';
		return $(loadingEleTpl).appendTo(this.$rootElement);
	};

	Uploader.prototype.onButtonClick = function() {
		console.log('button click');
		var self = this;
		if (self.currentState == 'ready') {
			var file = this.target.files[0];
			var data = {
				source : self,
				file : file,
				cancel:false
			}
			self.fireEvent('onStart', data);
			if(data.cancel === true){
				return;
			}
			file = data.file;
			self.doUpload(file);
		}
	};

	Uploader.prototype.onChanged = function(e) {
		var self = this;
		if (e.target.files.length > 0) {
			var _event = {
					file : e.target.files[0],
					cancel:false
				};
			self.fireEvent('onFileSelected', _event);
			if(_event.cancel == true){
				self.changeState("browse");
			}else{
				self.changeState('ready');
			}
		} else {
			alert('File selected but not accessible');
			self.changeState('browse');
		}
	};

	Uploader.prototype.changeState = function(state) {
		var self = this;
		self.currentState = state;
		switch (state) {
		case 'browse':
			self.$loadingElement.hide();
			self.reset();
			break;
		case 'ready':
			self.$loadingElement.hide();
			$(self.target).hide();
			if (self.autoUpload == true) {
				self.onButtonClick();
			}
			break;
		case 'loading':
			self.$loadingElement.show();
		}
	};

	Uploader.prototype.parseResponse = function(_xmlHttpRequest) {
		if(_xmlHttpRequest.responseXML){
			return _xmlHttpRequest.responseXML;
		}else{
			try{
				return JSON.parse(_xmlHttpRequest.response);
			}catch(e){
				return _xmlHttpRequest.response;
			}
		}
	};

	Uploader.prototype.doUpload = function(file) {
		var self = this;
		self.changeState('uploading');
		var http = new XMLHttpRequest();
		if (http.upload && http.upload.addEventListener) {
			http.upload.onprogress = function(e) {
				if (e.lengthComputable) {
					var percentComplete = (e.loaded / e.total) * 100;
					self.fireEvent('onProgress',{percentComplete:percentComplete.toFixed(0) + '%'});
				}
			};
			http.onreadystatechange = function(e) {
				if (this.readyState === 4) {
					if (Array.prototype.indexOf.call(self.defaultSuccessCodes, parseInt(this.status)) != -1) {
						var response = self.parseResponse(this);
						self.fireEvent('onSuccess', {
							response : response,
							originalevent : e
						},self.fileName);
					} else {
						self.fireEvent('onError', {
							status : this.status,
							originalevent : e
						});
					}
					self.changeState('browse');
				}
			};
			http.upload.onerror = function(e) {
				self.fireEvent('onError', {
					status : this.status,
					statusText : this.statusText,
					originalevent : e
				});
			};
		}
		http.open('POST', self.actionUrl);
		$.each(self.requestHeader,function(key,value){
			http.setRequestHeader(key,value);
		});
		if (self.signRequestEnabled == true) {
			self.signRequest(http, function(http) {
				http.send(self.getForm(file));
			});
		} else {
			http.send(self.getForm(file));
		}
	};

	Uploader.prototype.getForm = function(file) {
		var form = new FormData();
		//TODO 文档服务器上传后 不返回文件名，所以这里需要js中记录下
		this.fileName = file.name;
		form.append(this.name, file);
		$.each(this.data,function(key,value){
			form.append(key, value);
		});
		return form;
	};

	Uploader.prototype.reset = function() {
		var self = this;
		self.formElement.reset();
		$(self.target).show();
	};

	Uploader.prototype.signRequest = function(http, callback) {
		var self = this;
		var header = self.getSignHeader();
		self.signProvider(function(token) {
			http.setRequestHeader(header, token);
			callback(http);
		}, function(failureText) {
			self.fireEvent('onSignProviderError', {
				msg : 'Request signing is failed! ' + failureText
			});
		});
	};

	Uploader.prototype.signProvider = function(success, failure) {
		success('default-token');
	};
	
	return Uploader;
});