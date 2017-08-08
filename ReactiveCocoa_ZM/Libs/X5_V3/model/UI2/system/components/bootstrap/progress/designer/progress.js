/*! 
 * E5 v3 (htttp://www.justep.com) 
 * Copyright 2014 Justep, Inc.
 */
define(function(require) {
	require("$UI/system/components/justep/common/res");
	var Progress = require("../progress");
	// var Component = require("$UI/system/lib/base/component");
	var $ = require("jquery");

	Progress = Progress.extend({
		init : function(value, bindingContext) {
			var $domNode = $(this.domNode);
			$(">.progress-bar",$domNode).css("width","50%");
			$domNode.attr("d_canAddChild", "false");
			$("*", $domNode).attr("d_canAddChild", "false").attr("d_canRemove", "false").attr("d_resizable", false).attr("d_canMove","false");
			this.callParent(value, bindingContext); 
			var valuenow = parseFloat($domNode.attr("valuenow")||0);
			if(valuenow === 0){
				valuenow = 50;
			}
			var  valuemax = parseInt($domNode.attr("valuemax")||100,10);
 
			this.set({textVisible:$domNode.attr("textVisible")!='false',
				valuenow:valuenow,
				valuemax:valuemax});
		}
	});
	return {
		'$UI/system/components/bootstrap/progress/progress' : Progress
	};
});