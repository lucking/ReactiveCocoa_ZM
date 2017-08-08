/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var _String = {};

	_String.trim = function(str) {
		return (str || "").replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "");
	};

	_String.splitAndTrim = function(str, spliter) {
		var result = str.split(spliter);
		for ( var i in result) {
			result[i] = String.trim(result[i]);
		}
		return result;
	};

	_String.format = function() {
		if (arguments.length === 0)
			return null;
		var str = arguments[0];
		for ( var i = 1; i < arguments.length; i++) {
			var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
			str = str.replace(re, arguments[i]);
		}
		return str;
	};

	_String.toInt = function(str, defaultValue) {
		var result = parseInt(str, 10);
		return (isNaN(result)) ? defaultValue : result;
	};

	_String.toFloat = function(str, defaultValue) {
		var result = parseFloat(str);
		return (isNaN(result)) ? defaultValue : result;
	};

	_String.HTMLEncode = function(text) {
		var converter = document.createElement("DIV");
		converter.innerText = text;
		converter.textContent = text;
		var output = converter.innerHTML;
		converter = null;
		output = output.replace(/"/g, "&quot;");
		output = output.replace(/'/g, "&apos;");
		return output;
	};

	_String.HTMLDecode = function(html) {
		var converter = document.createElement("DIV");
		converter.innerHTML = html;
		var output = converter.innerText || converter.textContent;
		converter = null;
		return output;
	};

	_String.zeros = function(value, length, right) {
		var res = "" + value;
		for (; res.length < length; res = right ? res + '0' : '0' + res) {
		}
		return res;
	};

	_String.camelize = function(str, lowFirstLetter) {
		str = str.toLowerCase();
		return str.charAt(0).toUpperCase() + str.substring(1);
	};

	return _String;
});