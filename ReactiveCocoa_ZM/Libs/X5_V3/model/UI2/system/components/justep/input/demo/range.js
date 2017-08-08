/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var Message = require("$UI/system/components/justep/common/common");
	var Select = require("$UI/system/components/justep/select/select");
	var Model = function() {
		this.callParent();
		this.isVisible = Message.flag;
	};

	Model.prototype.closeWin = function(event) {
		justep.Portal.closeWindow();
	};

	Model.prototype.rangeChange = function(event) {
		this.comp('output').set({
			'value' : 'range value change:' + event.originalValue + '-->' + event.value
		});
	};

	Model.prototype.selectChange = function(event){
		this.comp("output").set({
			'value' : "选择的值:" + this.getElementByXid("demoSelect").value
		});
	};

	Model.prototype.passwdChange = function(event){
		this.comp("output").set({'value':"password change:"+event.value});
	};

	Model.prototype.textAreaChange = function(event){
		this.comp("output").set({'value':"textArea change:"+event.value});
	};
	
	Model.prototype.showOutpSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/input/demo/range.w&xid=formsStyle"
		});
	};
	
	Model.prototype.showJsSource = function(event){
		this.comp("windowDialog").open({
			data : "system/components/justep/input/demo/range.js"
		});
	};
	
	return Model;
});