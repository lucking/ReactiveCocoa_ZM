/*! 
* E5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
*/

/*
*	关键点： 	
* 		1. 上下文缓存
* 		上下文内容：url请求参数; 业务上下文; 流程上下文;
* 		实现原理：根据页面url缓存上下文;
* 		限制：在线打开过的页面(要求url必须一致, 包括参数部分), 离线时还可以再次打开;
* 		目标：
* 
* 		2. 登录缓存
* 
* 
* 		3. 功能树缓存
* 
* 
* 		4. bizData缓存
* 
* 	问题：
* 		1. 缓存是否需要按用户隔离, 比如同一个终端, 允许多个用户登录, 每个用户有自己的缓存;
* 		
* 
*/ 
define(function(require) {
	var Util = require("./util");
	var Cache = {
		_prefix: "j.c",
		setUsername: function(username){
			localStorage.setItem(Cache._prefix + ".username", (username || "").toUpperCase());
		},
		getUsername: function(){
			return localStorage.getItem(Cache._prefix + ".username") || "";
		},
		unsupport: function(msg){
			throw new Error("离线模式, 不支持" + (msg || ""));
		},
		isOnline: function(){
			return navigator.onLine && (window.justepOffline!==true);
		},
		_getKeyPrefix: function(){
			return Cache.getUsername() + "." + Cache._prefix + ".";
		},
		_generateKey: function(key){
			var result = Cache._getKeyPrefix() + (key || "");
			
			//TODO 为了测试方便, 正式版本中需要版本号
			var items = result.split("/");
			for (var i=0; i<items.length; i++){
				if (items[i].indexOf("$v") !== -1){
					items[i] = "";
				}
			}
			result = items.join("/");
			return result;
		},
		
		
		removeGlobalItem: function(key){
			localStorage.removeItem(key);
		},
		getGlobalItem: function(key){
			return localStorage.getItem(key);
		},
		
		setGlobalItem: function(key, value){
			localStorage.setItem(key, value);
		},
		
		//fn是可选参数, 表示在线时从服务端获取数据, 必须返回string格式数据
		getItem: function(key, fn){
			var result = null;
			if (Cache.isOnline() && fn){
				result = fn();
				Cache.setItem(key, result);
			}else{
				result = localStorage.getItem(Cache._generateKey(key));
			}
			
			return result; 	
		},
		
		setItem: function(key, value){
			localStorage.setItem(Cache._generateKey(key), value);
		},
		removeItem: function(key){
			localStorage.removeItem(Cache._generateKey(key));
		},
		clear: function(){
			for (var i=localStorage.length; i>=0; i--){
				var key = localStorage.key(i);
				if (key){
					if (key.indexOf(Cache._getKeyPrefix()) === 0){
						localStorage.removeItem(key);
					}
				}
			}
		},
		keys: function(){
			var result = [];
			for (var i=localStorage.length; i>=0; i--){
				var key = localStorage.key(i);
				if (key){
					var prefix = Cache._getKeyPrefix();
					if (key.indexOf(prefix) === 0){
						result[result.length] = key.substring(prefix.length);
					}
				}
			}
			return result;
		}
	};
	return Cache;
});