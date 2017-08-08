/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	var $ = require("jquery");
	require('css!./css/common').load();
	
	return {attr2js:function($dom,attrs){
		if($.isArray(attrs)){
			var ret = {},has=false;
			for(var i=0; i<attrs.length; i++){
				var v = $dom[0].getAttribute(attrs[i]);
				if(v){
					ret[attrs[i]] = v;
					has=true;
				}
			}
			return has?ret:null;
		}
	}};
});