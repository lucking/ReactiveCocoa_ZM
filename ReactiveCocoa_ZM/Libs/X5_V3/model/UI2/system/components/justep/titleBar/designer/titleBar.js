/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
	var $ = require("jquery"),
		Bar = require("../titleBar"),
		xuiService = require("$UI/system/components/designerCommon/js/xuiService"),
		xuiDoc = xuiService.getXuiDoc();
	
	var cls = Bar.extend({
		init:function(value, bindingContext){
			this.callParent(value, bindingContext);
			this.$title.attr('d_selectable',false);
		},
		setTitle: function(value){
			this.callParent(value);
			xuiDoc.updateText($('>.x-titlebar-title', this.domNode));
		}
	});

	return {'$UI/system/components/justep/titleBar/titleBar':cls};
});