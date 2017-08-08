/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
    var $ = require("jquery");
    var RTWindow = require("../window");
    
    var Window = RTWindow.extend({
		init : function(value, bindingContext) {
			this.$domNode.css("width","100%").css("height","100%").attr("d_canAddChild","true").attr("d_canRemove","false");
			this.callParent(value, bindingContext);
		}
    });
	
    return {'$UI/system/components/justep/window/window':Window};
});