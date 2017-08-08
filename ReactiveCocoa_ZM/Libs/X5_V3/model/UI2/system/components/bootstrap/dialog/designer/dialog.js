/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
	require("$UI/system/components/justep/common/res");
	require('css!./css/dialog').load();
	var Dialog = require("../dialog");

	var create = function (comp, clz) {
		var $domNode = $(comp.domNode);
		comp.domNode.style.position = "absolute";
		if (!comp.domNode.style.top) {
			comp.domNode.style.top = "10px";
			comp.domNode.style.left = "10px";
		}
		$domNode.addClass(clz);
	};

	var cls = Dialog.extend({
		init : function(value, bindingContext) {
			//create(this, 'x-dialog-designer');
			this.callParent(value, bindingContext);
		}
	});

	return {'$UI/system/components/bootstrap/dialog/dialog': cls};
});