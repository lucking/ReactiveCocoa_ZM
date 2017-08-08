/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
	
	var $ = require("jquery");
	var Child = require("$UI/system/components/justep/panel/child");
	var Component = require("$UI/system/lib/base/component");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var bind = require("bind");
	var Child = require('../child');
	var Util = require("$UI/system/components/justep/common/designer/common");
 
	var cls = Child.extend({
		init:function(value, bindingContext){
			this.callParent(value, bindingContext);
			var cfg = Util.attr2js(this.$domNode,['height', 'visible']);
			if(cfg) this.set(cfg);
		},
		onRemove: function(){
        	if(this.name == 'top')
        		$('>.x-panel-content', this.owner.$domNode).css('top', 0);
        	else
        		$('>.x-panel-content', this.owner.$domNode).css('bottom', 0);
		}
	});

	return cls;
});