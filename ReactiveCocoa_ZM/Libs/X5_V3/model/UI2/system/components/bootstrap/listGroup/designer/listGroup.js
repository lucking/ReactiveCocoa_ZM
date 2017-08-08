/*! 
 * E5 v3 (htttp://www.justep.com) 
 * Copyright 2014 Justep, Inc.
 */
define(function(require) {
	require("$UI/system/components/justep/common/res");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var xuiDoc = xuiService.getXuiDoc();
	var ViewComponent = require("$UI/system/lib/base/viewComponent");
	require.normalizeName("./listGroup");
	
	var ListGroup = ViewComponent.extend({
		init : function() {  
			var $domNode = $(this.domNode);  
			$(">*", $domNode).attr("d_resizable", "false");
		},
		
		addItem : function(){
			xuiDoc.createComponent("$UI/system/components/bootstrap/listGroup/listGroup#gruopItem", this, {
				paintComponent : true
			});
		}
	});
	return {
		'$UI/system/components/bootstrap/listGroup/listGroup' : ListGroup
	};
});