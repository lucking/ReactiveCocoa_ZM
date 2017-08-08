/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var ViewComponent = require("$UI/system/lib/base/viewComponent");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
    var xuiDoc = xuiService.getXuiDoc();
	var form = require("../form");
	require('css!./css/form').load();
	
	var form = form.extend({
		init : function() {
			this.domNode.removeAttribute("tabIndex");
			$(">div>*",this.domNode).attr("d_resizable",false);
			$(".form-group",this.domNode).attr("d_resizable",false);
			$(".form-group>*",this.domNode).attr("d_canMove",false).attr("d_resizable",false);
		},
		
		addFormGroup : function(param){
			xuiDoc.createComponent("$UI/system/components/bootstrap/form/form#formGroup",  param["d_id"], {
				autoSelect:false,
				paintComponent : true
			});
		}
	});

	var formGroup = ViewComponent.extend({
		init : function() {
			this.domNode.removeAttribute("tabIndex");
			$(this.domNode).attr("d_resizable",false);
			//$(".form-group",this.domNode).attr("d_resizable",false);
			$(">*",this.domNode).attr("d_canMove",false).attr("d_resizable",false);
		},
		
		addFormGroup : function(param){
			xuiDoc.createComponent("$UI/system/components/bootstrap/form/form#formGroup",  param["d_id"], {
				autoSelect:false,
				paintComponent : true
			});
		},
		
		addCol : function(param){
			xuiDoc.createComponent("$UI/system/components/bootstrap/form/form#col",  param["d_id"], {
				autoSelect:false,
				paintComponent : true
			});
		},
		
		addControlLabel : function(param){
			xuiDoc.createComponent("$UI/system/components/bootstrap/controlLabel/controlLabel",  param["d_id"], {
				autoSelect:false,
				paintComponent : true
			});
		
		}
	});
	
	return {
		'$UI/system/components/bootstrap/form/form' : form,
		'$UI/system/components/bootstrap/form/form#formGroup' : formGroup
	};
});