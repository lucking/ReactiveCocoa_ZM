/*! 
* E5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
*/ 
define(function(require) {
	require("$UI/system/components/justep/common/res");
	var justep = require("$UI/system/lib/justep");
	var url = require.normalizeName("./tabs");
	var $ = require("jquery");
	require('css!./css/tabs').load();
	
	var Tabs = justep.BindComponent.extend({
		init: function(value, bindingContext){
			var self = this;
			self.callParent(value, bindingContext);
			var $domNode = $(this.domNode);
			$domNode.on("click", ">.nav>li", function() {
				self.setActiveTab($(this));
			});
		},
		
		setActiveTab : function(tab){
			if(typeof tab == 'string'){
				tab = $(">.nav>li[xid='"+tab+"']",this.domNode);
			}
			$(">li", tab.parent()).removeClass("active");
			tab.addClass("active");
			
			var content = $(">a",tab).attr("content"); 
			
			$(">.tab-content>*",this.domNode).each(function(idx){  
				$(this)[this.getAttribute("xid") == content?"addClass":"removeClass"]("active");
			});
		}
	});
	
	justep.Component.register(url, Tabs);
	return Tabs;
});