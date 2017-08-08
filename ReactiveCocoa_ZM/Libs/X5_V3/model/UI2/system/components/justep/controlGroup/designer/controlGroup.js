/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var xuiDoc = xuiService.getXuiDoc();
	var RTControlGroup = require("../controlGroup");
	var justep = require('$UI/system/lib/justep');

	var ControlGroup = RTControlGroup.extend({
		init : function(value, bindingContext) {
			this.callParent(value, bindingContext);
			this.$domNode.attr("d_canAddChild", "true");
			this.set({
				title : this.$domNode.attr('title')
			});
			this._getTitleNode().attr("d_canRemove", false);
			this._d_inited_ = true;
		},
		propertyChangedHandler : function(key, oldVal, value) {
			this.callParent(key, oldVal, value);
			if ('title' == key) {
				if (this._d_inited_)
					xuiDoc.updateText(this._getTitleNode());
			}
		}
	});

	var ControlGroupTitle = justep.ViewComponent.extend({
		init : function(value, bindingContext) {
			this.callParent(value, bindingContext);
			this._d_inited_ = true;
		},
		set : function(value) {
			if ('text' in value) {
				if (this._d_inited_)
					xuiDoc.set(this.getModel().getComponent(this.$domNode.parent()[0]), {
						title : value['text']
					});
			}
		}
	});

	return {
		'$UI/system/components/justep/controlGroup/controlGroup' : ControlGroup,
		'$UI/system/components/justep/controlGroup/controlGroup#controlGroupTitle' : ControlGroupTitle
	};
});