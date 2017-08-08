/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	require('css!./popOver').load();
	var popOver = require("../popOver");
	var Util = require("$UI/system/components/justep/common/designer/common");
    
	var DPopOver = popOver.extend({
		dismissible: false,
		constructor: function(){
			this.callParent();
			this.dismissible = false;
		},
		init:function(value, bindingContext){
			this.callParent(value, bindingContext);
			
			this.$el.attr("d_canAddChild", "false");
			this.$overlay.attr("d_canAddChild", "false").attr("d_canRemove",false);
			this.$content.attr("d_canAddChild", "true").attr("d_canRemove",false);
			var cfg = Util.attr2js(this.$domNode,['anchor', 'opacity', 'position', 'direction']);
			if(cfg) this.set(cfg);
			this.callParent(value, bindingContext);
		},
		propertyChangedHandler: function(key, oldVal, value){
			switch(key){
			case 'dismissible':
				//设计时不起作用
				this.dismissible = false;
				return;
			default:
			}
			this.callParent(key, oldVal, value);
		}
		
	});
	
	return {'$UI/system/components/justep/popOver/popOver': DPopOver};
});