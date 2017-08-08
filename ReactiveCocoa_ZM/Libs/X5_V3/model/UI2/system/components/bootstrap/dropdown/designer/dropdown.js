/*! 
* E5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
*/ 
define(function(require) {
	require("$UI/system/components/justep/common/res");
	var Dropdown = require("../dropdown");
	var $ = require("jquery");
	
	Dropdown = Dropdown.extend({
		init: function(value, bindingContext){
			this.callParent(value, bindingContext); 
			var $domNode = $(this.domNode);
			$domNode.attr("d_resizable",false).attr("d_canAddChild",false);
			$(">*",$domNode).attr("d_canRemove",false).attr("d_canMove","false");
			$(">.dropdown-menu",$domNode).attr("d_resizable",false);
			$domNode.on("click",function(){
				event.stopPropagation();
			});
		},
		_installListener : function(){
			var self = this;
			var $domNode = $(this.domNode);
			$domNode.on("click",">.dropdown-toggle",function(event){
				$(".dropdown").each(function() {
					if (this != self.domNode) {
						$(this).removeClass("open");
					}
				}); 
				if($domNode.is('.disabled, :disabled')){
					return;
				}
//				$domNode.toggleClass("open");
				event.stopPropagation();
			});
			$(document).on('click.bs.dropdown', function(){ 
				self.clearMenus();
			});
		},
		showMenu : function(){
			$(this.domNode).addClass("open");
		},
		hideMenu : function(){
			$(this.domNode).removeClass("open");
		}
	});

	return {'$UI/system/components/bootstrap/dropdown/dropdown': Dropdown};
});