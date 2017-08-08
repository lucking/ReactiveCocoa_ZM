/*! 
* E5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
*/ 
define(function(require) {
	require("./context.biz");
	require("$UI/system/lib/cordova/cordova");
	require("cordova!com.justep.cordova.plugin.push");
	var Request = require("./request");
	var Browser = require("./browser");
	var Portal = require("$UI/system/lib/portal/portal");
	var url = require.toUrl("$UI/system/service/common/getMqttServer.j");
	var Object = require("./object");
	var Observable = require("./observable");
	var Operational = require("./operational");
	var Utils = require("./util");
	

	/**
	 * message格式: 
	  	{
	  		title: "hello",
      		detailTitle: "hello detail",
      		icon: "",
      		url: "",
      		exts: {}     
	  	}
	 */	
	var Notify = Object.extend({
		mixins : [ Observable, Operational ],
		constructor : function() {
			this.callParent();
			Observable.prototype.constructor.call(this);
			Operational.prototype.constructor.call(this);
		},

		/*
		getMqttServer: function(){
			var options = {};
			options.url = url;
			options.dataType = "json";
			options.contentType = "json";
			var response = Request.sendHttpRequest(options);
			return response.responseText;
		},	
		
		getTerminalAccountNumber: function(personID){
			if (this.TERMINAL_TYPE_PC === this.getTerminalType()){
				return personID + ".pcid";
			}else{
				return "[will from apk]";
			}
		},
		*/
		init: function(context, personID){
			if (Browser.isPC){
				//this._registerTerminal(context, personID + ".pcid");
				
			}else{
				var me = this;
				document.addEventListener('deviceReady',function(){
					var connectSuccess = function(){
						var terminalID = navigator.push.token;
						me._registerTerminal(context, terminalID);
					};
					var connectFail = function(){
						if (console)
							console.error('push connect error');
					};
					var token = Utils.getCookie("access_token") || "";
					var params = { 
						userName: personID,
						password: token,
						topicName: me._getTopicName(personID)
					};
					document.addEventListener('pushMessage', function(evt){
						try{
							var message = JSON.parse(evt.data);
							var event = {message: message, cancel: false};
							me.fireEvent(me.MESSAGE_EVENT, event);
							if (!event.cancel){
								if (message.url){
									//默认打开相应的功能页面
									Portal.openWindow(message.url, {title: message.title||""});
								}else if (message.surl){
									var response = $.ajax({
						                type: "GET",
						                url: message.surl,
						                async: false,
						                cache: false
						            });
									Portal.openWindow(response.responseText, {title: message.title||""});
								}
							}
						}catch(err){
							if (console)
								console.error(err);
						}
					}, false);
					if (navigator && navigator.push && navigator.push.connect)
						navigator.push.connect(connectSuccess, connectFail, params);
				},false);
			}
		},
		
		_getTopicName: function(personID){
			return "/" + personID + "/" + this.getTerminalType() + "/%1$s" + this.BUSINESS_TOPIC;
		},
			
		_registerTerminal: function(context, terminalID){
			this._do(context, terminalID, "registerTerminalAction");
		}, 
		
		_unRegisterTerminal: function(context, terminalID){
			this._do(context, terminalID, "unRegisterTerminalAction");
		},
		
		_do: function(context, terminalID, action){
			var options = {};
			options.context = context;
			options.process = "/SA/OPM/system/systemProcess";
			options.activity = "mainActivity";
			options.action = action;
			var param = new Request.ActionParam();
			param.setString("type", this.getTerminalType());
			param.setString("terminalID", terminalID);
			param.setString("protocol", this.getTerminalProtocol());
			options.parameters = param;
			options.directExecute = true;
			options.contentType = Request.JSON_TYPE;
			options.dataType = Request.JSON_TYPE;
			Request.sendBizRequest(options);
		},
		
		getTerminalProtocol: function(){
			if (Browser.isIOS()){
				return this.TERMINAL_PROTOCOL_APNS;
			}else{
				return this.TERMINAL_PROTOCOL_MQTT;
			}
		},
		
		getTerminalType: function(){
			if (Browser.isPC){
				return this.TERMINAL_TYPE_PC;
			}else if (Browser.isMobile){
				return this.TERMINAL_TYPE_MOBILE;
			}else{
				return this.TERMINAL_TYPE_PC;
			}
		},
		
		TERMINAL_TYPE_PC: "pc",
		TERMINAL_TYPE_MOBILE: "mobile",
		TERMINAL_TYPE_PAD: "pad",
		TERMINAL_PROTOCOL_MQTT: "mqtt",
		TERMINAL_PROTOCOL_APNS: "apns",
		
		BUSINESS_TOPIC: "/business",
		ROUTER_SERVER: "/RouterServer",
		
		MESSAGE_EVENT: "onMessage"
	});
	
	var cur = new Notify();
	return cur;
});