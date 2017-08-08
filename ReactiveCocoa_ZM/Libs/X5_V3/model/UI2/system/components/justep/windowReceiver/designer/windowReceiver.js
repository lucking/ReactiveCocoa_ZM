/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var RTWindowReceiver = require("../windowReceiver");
	require('css!./css/windowReceiver').load();

	function create(comp, clz) {
		var $domNode = $(comp.domNode);
		comp.domNode.style.position = "absolute";
		if (!comp.domNode.style.top) {
			comp.domNode.style.top = "10px";
			comp.domNode.style.left = "10px";
		}
		$domNode.addClass(clz);
	}

	var WindowReceiver = RTWindowReceiver.extend({
		init : function(value, bindingContext) {
			create(this, 'x-window-receiver');
			this.callParent(value, bindingContext);
		}
	});

	return {
		'$UI/system/components/justep/windowReceiver/windowReceiver' : WindowReceiver
	};
});