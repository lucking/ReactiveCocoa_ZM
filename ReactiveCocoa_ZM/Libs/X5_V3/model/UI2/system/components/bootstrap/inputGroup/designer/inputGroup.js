/*! 
 * E5 v3 (htttp://www.justep.com) 
 * Copyright 2014 Justep, Inc.
 */
define(function(require) {
	require("$UI/system/components/justep/common/res");
	var InputGroup = require("../inputGroup");
	// var Component = require("$UI/system/lib/base/component");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var xuiDoc = xuiService.getXuiDoc();
	var $ = require("jquery");
	var addonSpan = '<span class="input-group-addon"></span>';
	var btnGroup =  '<div class="input-group-btn"><a component="$UI/system/components/justep/button/button" class="btn btn-default" label="button"><i/><span/></a></div>';

	InputGroup = InputGroup.extend({
		init : function() {
			var $domNode = $(this.domNode);
			var $input = $(">input", $domNode);
			$input.attr("d_resizable", false).attr("d_canRemove", "false");
			$(">.input-group-btn", $domNode).attr("d_addChild", "true");
			$(">div,>span", $domNode).attr("d_resizable","false").attr("d_canMove","false");
		},
		add : function(componentName,template,isBefore){
			xuiDoc.createComponent(componentName, this, {
				before : isBefore?$(">input",this.domNode).attr("d_id"):"",
				templateContent : template,
				paintComponent : true
			});
		},
		
		onBuildMenu : function(event){ 
			var $input = $(">input",this.domNode);
			event.enableStatus = event.enableStatus ||{};
			if($input.next().length>0){
				event.enableStatus = {addSuffixBtn:false,addSuffix:false};
			}
			if($input.prev().length>0){
				event.enableStatus.addPrefix=false;
				event.enableStatus.addPrefixBtn=false;
			}
		},

		addPrefix : function() {
			this.add("span", addonSpan, true);
		},

		addSuffix : function() {
			this.add("span", addonSpan);
		},
		
		addPrefixBtn : function(){
			this.add("div", btnGroup, true);
		},
		
		addSuffixBtn : function(){ 
			this.add("div", btnGroup);
		}
	});
	return {
		'$UI/system/components/bootstrap/inputGroup/inputGroup' : InputGroup
	};
});