/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var Cordova = require("../cordova");

	var CordovaDesigner = Cordova.extend({
		init : function(value, bindingContext) {
			this.ele = $(this.domNode);
			this.ele.css({
				'position' : 'absolute',
				'right' : '50px'
			});
			$('<i></i>').addClass('icon-cordova').attr('isViewPartContent', 'false').css({
				'font-size' : '10em',
				'opacity' : '0.4'
			}).appendTo(this.ele);
			this.callParent(value, bindingContext);
		}
	});
	return {
		'cordova' : CordovaDesigner
	};
});