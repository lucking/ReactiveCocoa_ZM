/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	var Message = require("./message");
	
	var _Error = {
		SERVER_ERROR_START: "__justepServerErrorStart__",
		SERVER_ERROR_END: "__justepServerErrorEnd__",
		CLIENT_ERROR_START: "__justepClientErrorStart__",
		CLIENT_ERROR_END: "__justepClientErrorEnd__",
		create : function(message){
			if (message instanceof Message){
				var data = {'code': message.getCode(), 'reason': message.getReason(), 'message': message.getMessage(),
						'stack': message.getStack(), 'messages':message.getMessages()};
				
				return new Error(this.CLIENT_ERROR_START + JSON.stringify(data) + this.CLIENT_ERROR_END);
			}else{
				return new Error(message);
			}
		}
	};
	
	return _Error;
});