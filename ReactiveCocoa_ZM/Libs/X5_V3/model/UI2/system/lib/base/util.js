/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var toString = Object.prototype.toString;
	var __Date = require("./date");

	var disableTouchMove = function(e) {
		// e.stopPropagation(); //阻止了事件冒泡，但不会阻击默认行为
		e.preventDefault(); // 不阻击事件冒泡，但阻击默认行为
		// return false; //阻止了事件冒泡，也阻止了默认行为
	};

	var util = {
		isBoolean : function(value) {
			return typeof value === 'boolean';
		},
		isString: function(value){
			return toString.call(value) === '[object String]';
		},
		isFunction: function(value){
			return toString.call(value) === '[object Function]';
		},
		isArray : function(value) {
			return toString.call(value) === '[object Array]';
		},
		toArray : function(iterable, start, end) {
			if (!iterable || !iterable.length) {
				return [];
			}

			if (typeof iterable === 'string') {
				iterable = iterable.split('');
			}

			return Array.prototype.slice.call(iterable, start || 0, end || iterable.length);
		},
		clone : function(item) {
			if (item === null || item === undefined) {
				return item;
			}

			var type = toString.call(item);

			// Date
			if (type === '[object Date]') {
				return new Date(item.getTime());
			}

			var i, clone, key;

			// Array
			if (type === '[object Array]') {
				i = item.length;

				clone = [];

				while (i--) {
					clone[i] = util.clone(item[i]);
				}
			}
			// Object
			else if (type === '[object Object]' && item.constructor === Object) {
				clone = {};

				for (key in item) {
					clone[key] = util.clone(item[key]);
				}
			}

			return clone || item;
		},

		isObject : (toString.call(null) === '[object Object]') ? function(value) {
			// check ownerDocument here as well to exclude DOM nodes
			return value !== null && value !== undefined && toString.call(value) === '[object Object]' && value.ownerDocument === undefined;
		} : function(value) {
			return toString.call(value) === '[object Object]';
		},

		apply : function(object, config, defaults) {
			if (defaults) {
				this.apply(object, defaults);
			}

			if (object && config && typeof config === 'object') {
				for ( var i in config) {
					object[i] = config[i];
				}
			}

			return object;
		},
		addCookie : function(name, value, path, expiresHours) {
			var cookieString = name + "=" + escape(value);
			// 判断是否设置过期时间
			if (expiresHours && expiresHours > 0) {
				var date = new Date();
				date.setTime(date.getTime + expiresHours * 3600 * 1000);
				cookieString = cookieString + "; expires=" + date.toGMTString();
			}
			if (path) {
				cookieString = cookieString + "; path=" + path;
			}
			document.cookie = cookieString;
		},
		getCookie : function(name) {
			var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
			if (arr = document.cookie.match(reg))
				return unescape(arr[2]);
			else
				return null;
		},
		deleteCookie : function(name, path) {
			var date = new Date();
			date.setTime(date.getTime() - 10000);
			var cookieString = name + "=v; expires=" + date.toGMTString();
			if (path) {
				cookieString = cookieString + "; path=" + path;
			}
			document.cookie = cookieString;
		},
		toExprString : function(dataType, value, isKSQL) {
			dataType = dataType ? dataType.toUpperCase() : "STRING";
			if (null === value || typeof value === 'undefined')
				return "null";
			if (("DATE" == dataType || "TIME" == dataType || "DATETIME" == dataType) && typeof value == 'string') {
				value = __Date.fromString(value, 'yyyy-MM-ddThh:mm:ss');
			}
			if (value instanceof Date)
				value = __Date.toString(value, 'yyyy-MM-dd hh:mm:ss');
			if ("STRING" == dataType) {
				return "'" + value + "'";
			} else if ("DATE" == dataType)
				return "stringToDate('" + value + "')";
			else if ("TIME" == dataType)
				return "stringToTime('" + value + "')";
			else if ("DATETIME" == dataType)
				return "stringToDateTime('" + value + "')";
			else
				return value + '';
		},
		disableTouchMove : function(e) {
			$(e).on('touchmove', disableTouchMove);
		},
		enableTouchMove : function(e) {
			$(e).off('touchmove', disableTouchMove);
		}
	};
	
	return util;
});