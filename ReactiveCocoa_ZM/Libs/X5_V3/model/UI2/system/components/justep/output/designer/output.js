/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var RTOutput = require("../output");

	var Output = RTOutput.extend({
		init : function(value, bindingContext) {
			this['bind-ref'] = null;
			this.callParent(value, bindingContext);
			this.set({
				'bind-ref' : this.$domNode.attr('bind-ref')
			});
		},
		propertyChangedHandler : function(key, oldVal, value) {
			switch (key) {
			case "bind-ref":
				if (oldVal != value)
					this.$domNode.text(value);
				break;
			default:
				this.callParent(key, oldVal, value);
			}
		}

	});

	return {
		'$UI/system/components/justep/output/output' : Output
	};
});