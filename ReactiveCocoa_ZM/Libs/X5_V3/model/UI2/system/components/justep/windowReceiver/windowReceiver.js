/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var Model = justep.ModelBase;
	var UrlObj = require('$UI/system/lib/base/url');
	
	var url = require.normalizeName("./windowReceiver");

	var ComponentConfig = require("./windowReceiver.config");

	var WindowReceiver = justep.BindComponent.extend({
		getConfig : function() {
			return ComponentConfig;
		},
		constructor : function(options) {
			this.callParent(options);
		},
		dispose : function() {
			this.getModel().off(Model.MESSAGE_EVENT, this.doReceiver, this);
			this.callParent();
		},
		buildTemplate : function(cfg) {
			if (!cfg)
				cfg = {};
			return '<span component="' + url + '" ' + (cfg.xid ? (' xid="' + cfg.xid + '" ') : '') + '>' + '</span>';
		},
		doInit : function(value, bindingContext) {
			this.getModel().on(Model.MESSAGE_EVENT, this.doReceive, this);
			var openerId = new UrlObj(location.href).getParam("$opener");
			if(openerId && opener){
				this.winOpener = opener.justep.windowOpener_openers[openerId];
				var self = this;
				$(window).on('message',function(message){
					var data = message.originalEvent.data;
					if(data.type == "WindowOpener"){
						self.doReceive({message:data});
					}
				});
				var self = this;
				$(window).unload(function(event){
					if(self.winOpener && self.winOpener.dispatchCloseEvent) self.winOpener.dispatchCloseEvent();
				});
				if(this.winOpener && this.winOpener.sendToWindow) this.winOpener.sendToWindow();
			}
		},
		doReceive : function(event) {
			var data = event.message;
			if (data && $.inArray(data.type, [ 'WindowDialog' ]) > -1) {
				// 只处理type是WindowDialog的消息
				this.target = data.source;
				data.source = this;
				data.sender = this.target;
				this.fireEvent('onReceive', data);
			}else if(data && $.inArray(data.type, [ 'WindowOpener' ]) > -1){
				// 只处理type是WindowOpener的消息
				if(opener && this.winOpener){
					data.source = this;
					data.sender = opener;
					this.fireEvent('onReceive', data);
				}
			}
		},
		sendData : function(data) {
			if (this.target){
				this.target.getModel().postMessage({
					source : this,
					target : this.target,
					data : data
				});
			}else if(opener && this.winOpener){
				this.winOpener.ensure(data,true);
			}	
		},
		windowEnsure : function(data) {
			if (this.target) {
				this.target.getModel().postMessage({
					source : this,
					target : this.target,
					data : data
				});
				this.target.close();
			}else if(opener && this.winOpener){
				this.winOpener.ensure(data);
			}
		},
		windowCancel : function() {
			if (this.target){
				this.target.close();
			}else if(opener && this.winOpener){
				this.winOpener.cancel();
			}
		}
	});

	justep.Component.addOperations(WindowReceiver, {
		windowCancel : {
			label : "",
			icon : 'icon-chevron-left',
			method : function(args) {
				return this.owner.windowCancel();
			}
		},
		windowEnsure : {
			label : "",
			argsDef: [{name:'data',displayName:'返回的数据'}],
			method : function(args) {
				return this.owner.windowEnsure(args.data);
			}
		},
		sendData : {
			label : "",
			argsDef: [{name:'data',displayName:'返回的数据'}],
			method : function(args) {
				return this.owner.sendData(args.data);
			}
		}
	});
	
	justep.Component.register(url, WindowReceiver);
	return WindowReceiver;
});