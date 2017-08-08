/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var justep = require("$UI/system/lib/justep");
	var Message = require("$UI/system/components/justep/common/common");
	var Model = function() {
		this.callParent();
		this.isVisible = Message.flag;
	};
	
	Model.prototype.openLeft = function(event) {
		this.comp('wing').showLeft();
	};

	Model.prototype.hideLeft = function(event) {
		this.comp('wing').hideLeft();
	};

	Model.prototype.showRight = function(event) {
		this.comp('wing').showRight();
	};

	Model.prototype.hideRight = function(event) {
		this.comp('wing').hideRight();
	};

	Model.prototype.closeWin = function(event) {
		justep.Portal.closeWindow();
	};

	Model.prototype.showWingSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/wing/demo/wing.w&xid=wing"
		});
	};

	Model.prototype.showJsSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/components/justep/wing/demo/base.js"
		});
	};
	Model.prototype.showMenu = function(event){
		this.comp('popMenu').show();
	};
	return Model;
});
