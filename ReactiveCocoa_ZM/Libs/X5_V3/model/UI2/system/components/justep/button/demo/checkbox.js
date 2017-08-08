/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var Message = require("$UI/system/components/justep/common/common");
	
	var Model = function() {
		this.i = 0;
		this.callParent();
		this.isVisible = Message.flag;
	};

	Model.prototype.returnMain = function(event) {
		justep.Portal.closeWindow();
	};

	Model.prototype.checkboxChange = function(event) {
		Message.message("aler", "checkbox change事件,获取value值");
		this.comp("showValue").set({"value":"选择的值:"+this.comp("checkboxVal").value});
	};

	Model.prototype.dataValueChange = function(event) {
		Message.message("aler", " checkboxGroup需结合data组件使用,获取value值");
		this.comp("showValue").set({"value":"选择的值:"+event.newValue});
	};
	
	Model.prototype.controlCheckbox = function(event){
		var checkObj = this.comp('checkboxVal');
		checkObj.get('checked')?checkObj.set({'checked':null}):checkObj.set({'checked':'true'});
	};

	Model.prototype.showJsSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/components/justep/button/demo/checkbox.js"
		});
	};

	Model.prototype.showStyleSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/button/demo/checkbox.w&xid=checkboxStyle"
		});
	};

	Model.prototype.showEventSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/button/demo/checkbox.w&xid=checkboxEvent"
		});
	};

	Model.prototype.showCheckboxGroupSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/button/demo/checkbox.w&xid=showCheckboxGroup"
		});
	};

	return Model;
});