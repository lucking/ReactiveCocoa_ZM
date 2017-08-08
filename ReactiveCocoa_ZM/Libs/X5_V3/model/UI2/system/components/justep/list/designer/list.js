/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var List = require("../list");
	require('css!./css/list').load();

	var ListDesigner = List.extend({
		init : function(value, bindingContext) {
			this.callParent(value, bindingContext);

			this.$domNode.attr("d_canAddChild", "true").children('div.x-list-head').addClass('x-min-height').attr("d_canAddChild", "true");
			this.$domNode.children('.x-list-content').attr('d_selectable', false);
			this.$domNode.find('.x-list-template').addClass('x-min-height').attr("d_canAddChild", "true").attr(
					'd_selectable', false).children().addClass('x-min-height');
		}
	});

	return {
		'$UI/system/components/justep/list/list' : ListDesigner
	};
});