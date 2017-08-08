/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var RTLabelEdit = require("../labelEdit");

	var LabelEdit = RTLabelEdit.extend({
		init : function(value, bindingContext) {
			this.callParent(value, bindingContext);
			this.$domNode.find('div.x-edit').attr("d_canAddChild", "true").addClass('x-min-height');
			this.$domNode.children('.x-label').attr("d_canRemove", false).attr("d_canMove", false);
			this.$domNode.children('.x-edit').attr("d_canRemove", false).attr("d_canMove", false);
		}
	});

	return {
		'$UI/system/components/justep/labelEdit/labelEdit' : LabelEdit,
		'$UI/system/components/justep/labelEdit/labelInput' : LabelEdit,
		'$UI/system/components/justep/labelEdit/labelOutput' : LabelEdit,
		'$UI/system/components/justep/labelEdit/labelSelect' : LabelEdit,
		'$UI/system/components/justep/labelEdit/labelTextarea' : LabelEdit,
		'$UI/system/components/justep/labelEdit/labelRadioGroup' : LabelEdit,
		'$UI/system/components/justep/labelEdit/labelCheckboxGroup' : LabelEdit,
		'$UI/system/components/justep/labelEdit/labelToggle' : LabelEdit
	};
});