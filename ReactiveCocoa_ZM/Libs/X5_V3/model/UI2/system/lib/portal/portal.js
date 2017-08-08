/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){

	var portal = {};
	portal.getPortal = function(){
		try{
			var win = window;
			while (win) {
				if (win.isPortalWindow) {
					return win;
				}
				if(win == win.parent){
					break;
				}
				win = win.parent;
			}
		}catch(e){
			return null;
		}
	};
	
	portal.postMessage = function(name){
		var args = Array.prototype.slice.call(arguments);
		var win = this.getPortal();
		if(win){
			args.shift();
			win.postMessage({type: 'portal', event: {name: name, args: args}}, '*');
		}
	};
	
	
	portal.logout = function(){
		portal.postMessage('logout');
		/*
		//支持消息推送
		if (navigator && navigator.push && navigator.push.token && navigator.push.disConnect){
			navigator.push.disConnect();
		}
		*/
	};

	portal.sessionTimeout = function(){
		window.onerror = function(){return false;};
		window.pageErrorHandler = function(){return false;};
		if (confirm("服务器连接超时, 是否关闭页面!")){
			portal.logout();
		}
	};
	
	portal.openWindow = function(url, options){
		portal.postMessage('openPage', url, options);
	};
	
	portal.closeWindow = function(){
		portal.postMessage('closePage');
	};
	
	portal.gotoWindow = function(url){
		portal.postMessage('openPage', url);
	};
	
	portal.toggleMenu = function(){
		portal.postMessage('toggleMenu');
	};
	
	portal.setSkin = function(value){
		portal.postMessage('setSkin', value);
	};
	
	portal.setLang = function(value){
		portal.postMessage('setSLang', value);
	};
	
	portal.setDebug = function(value){
		portal.postMessage('setDebug', value);
	};
	
	return portal;
});	
