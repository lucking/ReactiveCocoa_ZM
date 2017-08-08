/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var Message = function(config) {
		if (!config) {
			config = "{}";
		}
		var configValue = JSON.parse(config);
		this.code = configValue.code;
		this.reason = configValue.reason;
		this.statck = configValue.stack;
		this.messages = configValue.messages;

		this.message = configValue.message;
		if (this.message) {
			for ( var i = 1; i < arguments.length; i++) {
				var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
				this.message = this.message.replace(re, arguments[i]);
			}
		}
	};

	Message.prototype.getCode = function() {
		return this.code;
	};

	Message.prototype.getMessage = function() {
		return this.message;
	};

	Message.prototype.getReason = function() {
		return this.reason;
	};

	Message.prototype.getStack = function() {
		return this.stack;
	};

	Message.prototype.getMessages = function() {
		return this.messages;
	};

	Message.getMessage = function(cfg, p1, p2, p3, p4, p5) {
		return (new Message(cfg, p1, p2, p3, p4, p5)).getMessage();
	};
	return Message;
});