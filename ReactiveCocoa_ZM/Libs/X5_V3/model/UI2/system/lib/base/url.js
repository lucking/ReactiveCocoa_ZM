/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var String = require("./string");
	var Util = require("./util");
	var BSESSIONID = "bsessionid";
	var SKIN = "$skin";
	var LANGUAGE = "language";
	var VERSION = "$version";
	var DEVICE = "$device";
	var ACTIVITY2WURL = require.toUrl("$UI/system/service/common/activity2WURL.j");
	var Message = require("./message");
	var _Error = require("./error");
	require("$UI/system/resources/system.res");
	
	

	//contextname是指$v之前的内容, 与标准的contextname有区别
	var URL = function(url, mode) {
		this.source = url;
		this.protocol = "";
		this.hostname = "";
		this.port = "";
		this.contextname = "";
		this.version = "";
		this.language = "";
		this.skin = "";
		this.device = "";
		this.pathname = "";
		this.hash = "";
		this.params = {};

		this.mode = mode || "vls";
		
		this._parse(decodeURI(url));
	};

	URL.VLS_MODE = "vls";
	URL.CLASSIC_MODE = "classic";

	URL.prototype.getLanguage = function() {
		return this.language || this.params[LANGUAGE] || "";
	};

	URL.prototype.getSkin = function() {
		return this.skin || this.params[SKIN] || "";
	};
	
	URL.prototype.getDevice = function(){
		return this.device || this.params[DEVICE] || "";
	};

	URL.prototype.getVersion = function() {
		return this.version || this.params[VERSION] || "";
	};

	URL.prototype.setLanguage = function(val) {
		this.language = val;
	};
	
	URL.prototype.setDevice = function(val){
		this.device = val;
	};

	URL.prototype.setSkin = function(val) {
		this.skin = val;
	};

	URL.prototype.setVersion = function(val) {
		this.version = val;
	};

	URL.prototype.getBSessionID = function() {
		return this.params[BSESSIONID] || Util.getCookie(BSESSIONID) || "";
	};

	URL.prototype.toString = function(encode) {
		var result = this.protocol;
		if (this.hostname)
			result += "//" + this.hostname;
		if (this.port)
			result += ":" + this.port;
		var path = this.getPathname();
		if (path) {
			result += path;

			var items = [];
			if (URL.VLS_MODE !== this.mode) {
				if (this.language)
					items.push(LANGUAGE, this.language);
				if (this.skin)
					items.push(SKIN, this.skin);
				if (this.device)
					items.push(DEVICE, this.device);
			}
			
			for ( var p in this.params) {
				if ((URL.VLS_MODE === this.mode) && ((p === LANGUAGE) || (p === SKIN) || p === DEVICE)) {
					continue;
				}
				if (encode === false){
					items.push(p + "=" + this.params[p]);	
				}else{
					items.push(p + "=" + encodeURIComponent(this.params[p]));
				}
				
			}

			if (items.length > 0) {
				result += "?" + items.join("&");
			}

			if (this.hash) {
				result += this.hash;
			}
		}
		
		
		return result;
	};

	URL.prototype.getPathname = function() {
		var result = "";
		if (this.contextname)
			result += "/" + this.contextname;
		var vls = this.getVLS();
		if (vls)
			result += "/" + vls;
		if (this.pathname)
			result += this.pathname;
		return result;
	};

	URL.prototype.getVLS = function() {
		var result = "";
		//如果当前浏览器中没有版本号时, 不使用vls
		if (!this.enabledVls()){
			return result;
		}
		
		result += "$v" + (this.version || "");
		if (URL.VLS_MODE === this.mode) {
			result += "$l" + (this.language || "");
			result += "$s" + (this.skin || "");
			result += "$d" + (this.device || "");
		}
		return result;
	};

	URL.prototype._parse = function(url) {
		var _ls = String.trim(url);
		if (!_ls)
			return;

		var path = null;
		if (_ls.charAt(0) === '/') {
			this.protocol = "";
			this.hostname = "";
			this.port = "";
			path = _ls;
		} else {
			if (_ls.substring(0, 2) === '//') {
				_ls = 'http:' + _ls;
			} else if (_ls.split('://').length === 1) {
				_ls = 'http://' + _ls;
			}

			var items = _ls.split('/');
			this.protocol = items[0];
			var host = items[2].split(':');
			this.hostname = host[0];
			this.port = (host[1] || ((this.protocol.split(':')[0].toLowerCase() === 'https') ? '443' : '80'));
			path = ((items.length > 3 ? '/' : '') + items.slice(3, items.length).join('/'));
		}

		if (path) {
			var pathItems = path.split("#");
			if (pathItems[1])
				this.hash = "#" + pathItems[1];

			pathItems = pathItems[0].split("?");
			path = pathItems[0];
			if (pathItems[1])
				this._parseParams(pathItems[1]);
		}

		if (path) {
			if (path.indexOf("$v") !== -1){
				var names = path.split("/");
				var i = 1;
				var afterVls = false;
				for (;i<names.length; i++){
					if (afterVls){
						this.pathname += "/" + names[i];
					}else{
						if (names[i] && (names[i].indexOf("$v")===0)){
							this._parseVLS(names[i]);
							afterVls = true;
						}else{
							if (i === 1){
								this.contextname = names[i];
							}else{
								this.contextname += "/" + names[i];	
							}
						}
					}
				}
				
				if (!afterVls){
					this.contextname = names[1];
					this.pathname = ((names.length > 2 ? '/' : '') + names.slice(2, names.length).join('/'));
				}
			}else{
				if (window.__ResourceEngine && window.__ResourceEngine.contextPath && (path.indexOf(window.__ResourceEngine.contextPath)===0)){
					this.contextname = window.__ResourceEngine.contextPath;
					if (this.contextname.indexOf("/") === 0){
						this.contextname = this.contextname.substring(1);
					}
					this.pathname = path.substring(window.__ResourceEngine.contextPath.length);
				}else{
					var names = path.split("/");
					this.contextname = names[1];
					this.pathname = ((names.length > 2 ? '/' : '') + names.slice(2, names.length).join('/'));	
				}
			}
		}
	};

	URL.prototype.enabledVls = function(){
		return window.location.href.indexOf("$v") !== -1;
	};
	
	// $vxx$lxxx$sxxx
	URL.prototype._parseVLS = function(vls) {
		var items = vls.split("$v");
		items = items[1].split("$l");
		this.version = items[0];
		if (items[1]) {
			items = items[1].split("$s");
			this.language = items[0];
			if (items[1]){
				items = items[1].split("$d");
				this.skin = items[0] || "";
				this.device = items[1] || "";
			}
		}
	};

	URL.prototype._parseParams = function(str) {
		if (!str)
			return;
		var paramItems = str.split("&");
		for ( var i = 0; i < paramItems.length; i++) {
			var values = paramItems[i].split("=");
			if (values.length === 2) {
				this._setParam(values[0], values[1]);
			}
		}
	};

	URL.prototype.setParam = function() {
		if (arguments.length === 2) {
			this._setParam(arguments[0], arguments[1]);
		} else if (arguments.length === 1) {
			if (typeof arguments[0] === 'string') {
				this._parseParams(arguments[0]);
			} else {
				for ( var i in arguments[0]) {
					this._setParam(i, arguments[0][i]);
				}
			}
		}
	};

	URL.prototype._setParam = function(name, value) {
		this.params[name] = value;
		if (name === SKIN) {
			this.skin = value;
		} else if (name === LANGUAGE) {
			this.language = value;
		} else if (name === VERSION) {
			this.version = value;
		} else if (name === DEVICE){
			this.device = value;
		}
	};

	URL.prototype.getParam = function(name) {
		return this.params[name];
	};

	URL.prototype.setHash = function(val) {
		this.hash = val;
	};

	URL.prototype.getHash = function() {
		return this.hash;
	};

	URL._instance = function() {
		if (!URL.__instance) {
			URL.__instance = new URL(window.location.href);
		}

		return URL.__instance;
	};

	URL.getBSessionID = function() {
		return URL._instance().getBSessionID();
	};

	URL.getSkin = function() {
		return URL._instance().getSkin();
	};

	URL.getDevice = function() {
		return URL._instance().getDevice();
	};

	URL.getLanguage = function() {
		return URL._instance().getLanguage();
	};

	URL.getSearch = function(args, prefix) {
		var search = [];
		for ( var i in args) {
			if (args.hasOwnProperty(i)) {
				var value = args[i];
				var p = prefix ? prefix + '.' + i : i;
				if (typeof value == 'object') {
					search.push(URL.getSearch(value, p));
				} else
					search.push(p + '=' + value);
			}
		}
		return search.join('&');
	};
	
	URL.activity2WURL = function(aURL){
		var result = null;
		if (aURL && (aURL.indexOf(".a") !== -1)){
			var index = aURL.indexOf(".a") + 2;
			var path = aURL.substring(0, index);
			var query = aURL.substring(index);
			path = new URL(path).pathname;
			if (window.__isPackage && window.__ActivityEngine && window.__ActivityEngine.getWindowURL && window.__ActivityEngine.getWindowURL(path)){
				result = window.__ActivityEngine.getWindowURL(path);
				result = require.toUrl("$model" + result + (query || ""));
			}else{
				var url = new URL(ACTIVITY2WURL);
				url.setParam("aurl", path);
				var response = $.ajax({
	                type: "GET",
	                url: url.toString(),
	                async: false,
	                cache: false
	            });
				if (response.responseText === "no"){
					var msg = new Message(Message.JUSTEP230102, aURL);
					throw _Error.create(msg);
				}else{
					result = require.toUrl("$model" + response.responseText + (query || ""));
				}
				
				/*
				result = Cache.getItem(url.toString(), function(){
					var response = $.ajax({
		                type: "GET",
		                url: url.toString(),
		                async: false,
		                cache: false
		            });
					if (response.responseText === "no"){
						var msg = new Message(Message.JUSTEP230102, aURL);
						throw _Error.create(msg);
					}else{
						return require.toUrl("$model" + response.responseText + (query || ""));
					}
				});
				*/
			}

			
		}else{
			result = aURL;
		}
		
		return result;
	};	
	
	URL._removeVLS = function(url){
		if (url){
			var items = url.split("/");
			var newItems = [];
			for (var i=0; i<items.length; i++){
				if (items[i].indexOf("$v") === 0){
					
				}else{
					newItems[newItems.length] = items[i];
				}
			}
			return newItems.join("/");
		}else{
			return url;
		}
		
		
		
	};
	
	return URL;
});