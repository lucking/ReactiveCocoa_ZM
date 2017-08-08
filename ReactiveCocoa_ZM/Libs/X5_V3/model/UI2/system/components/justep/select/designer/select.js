/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var Util = require("$UI/system/components/justep/common/designer/common");
	var RTSelect = require("../select");
	var RTRadioGroup = require("../radioGroup");
	var RTCheckboxGroup = require("../checkboxGroup");
	var RTRadio = require("$UI/system/components/justep/button/radio");
	var RTCheckbox = require("$UI/system/components/justep/button/checkbox");
	var _Select = RTSelect.extend({
		doInit : function(value, bindingContext, allBindings) {
		},
		doUpdate : function(value, bindingContext, allBindings) {
		}
	});

	function createGroup(group, clz) {
		// window.setTimeout(function() {debugger;
		group.$domNode = $(group.domNode);
		new clz({
			parentNode : group.domNode,
			label : 'item1'
		});
		new clz({
			parentNode : group.domNode,
			label : 'item2'
		});
		var cfg = Util.attr2js(group.$domNode, [ 'itemStyle', 'itemClass']);
		if (cfg)
			group.set(cfg);
		// },1000);
	}

	var _RadioGroup = RTRadioGroup.extend({
		init : function(value, bindingContext) {
			createGroup(this, RTRadio);
			this.callParent(value, bindingContext);
		}
	});

	var _CheckboxGroup = RTCheckboxGroup.extend({
		init : function(value, bindingContext) {
			createGroup(this, RTCheckbox);
			this.callParent(value, bindingContext);
		}
	});

	return {
		'$UI/system/components/justep/select/select' : _Select,
		"$UI/system/components/justep/select/radioGroup" : _RadioGroup,
		"$UI/system/components/justep/select/checkboxGroup" : _CheckboxGroup
	};
});