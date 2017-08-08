/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var RTMessageDialog = require("../messageDialog");
	require('css!./css/messageDialog').load();

	function create(comp, clz) {
		var $domNode = $(comp.domNode);
		comp.domNode.style.position = "absolute";
		if (!comp.domNode.style.top) {
			comp.domNode.style.top = "10px";
			comp.domNode.style.left = "10px";
		}
		$domNode.addClass(clz);
	}

	var MessageDialog = RTMessageDialog.extend({
		init : function(value, bindingContext) {
			create(this, 'x-message-dialog');
			this.callParent(value, bindingContext);
		}
	});

	return {
		'$UI/system/components/justep/messageDialog/messageDialog' : MessageDialog
	};
});