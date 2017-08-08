/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var Message = require("$UI/system/components/justep/common/common");
	var Select = require("../select");
	var Model = function() {
		this.callParent();
		this.isVisible = Message.flag;
	};

	Model.prototype.closeWin = function(event) {
		justep.Portal.closeWindow();
	};

	Model.prototype.showSelectStyleSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/select/demo/select.w&xid=selectStyle"
		});
	};

	Model.prototype.showSelectEventSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/select/demo/select.w&xid=selectEvent"
		});
	};

	Model.prototype.showRadioGroupSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/select/demo/select.w&xid=radioGroup"
		});
	};

	Model.prototype.showCheckboxGroupSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/select/demo/select.w&xid=checkboxGroup"
		});
	};

	Model.prototype.showJsSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/components/justep/select/demo/select.js"
		});
	};

	Model.prototype.selectChange = function(event) {
		this.comp("output").set({
			'value' : "选择的值:" + this.getElementByXid("demoSelect").value
		});
	};

	return Model;
});