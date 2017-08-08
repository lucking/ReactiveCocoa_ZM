/*! 
* E5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
*/ 
define(function(require) {
	require("$UI/system/components/justep/common/res");
	var justep = require("$UI/system/lib/justep");
	var url = require.normalizeName("./dropdown");
	var $ = require("jquery");
	require('css!./css/dropdown').load();

	var Dropdown = justep.BindComponent.extend({
		init: function(value, bindingContext){
			var self = this;
			self.callParent(value, bindingContext);
			self._installListener();
		},
		
		clearMenus : function(){
			$(this.domNode).removeClass("open");
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
				$domNode.toggleClass("open");
				event.stopPropagation();
			});
			$(document).on('click.bs.dropdown', function(){ 
				self.clearMenus();
			});
		},
		
		dispose : function(){
			$(this.domNode).off("click");
			$(document).on('click.bs.dropdown');
			this.callParent();
		}
	});
	
	justep.Component.register(url, Dropdown);
	return Dropdown;
});