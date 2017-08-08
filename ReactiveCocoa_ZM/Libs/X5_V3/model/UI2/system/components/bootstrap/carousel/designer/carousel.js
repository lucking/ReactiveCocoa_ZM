/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
	require('css!./carousel').load();
	
	var $ = require("jquery");
	var Carousel = require("../carousel");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var Component = require("$UI/system/lib/base/component");
	var bind = require("bind");
	
	var cls = Carousel.extend({
		init:function(value, bindingContext){
			this.callParent(value, bindingContext);
		}
	});

	return {'$UI/system/components/bootstrap/carousel/carousel':cls};
});