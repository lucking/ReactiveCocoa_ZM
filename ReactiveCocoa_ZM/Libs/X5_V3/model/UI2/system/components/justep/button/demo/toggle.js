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

	Model.prototype.toggleChange = function(event) {
		Message.message("aler", "toggle change事件,获取value值,选择的值:" + this.comp("toggleVal").value);
	};

	Model.prototype.controlToggle = function(event) {
		var toggleObj = this.comp("toggleVal");
		toggleObj.get('checked') ? toggleObj.set({
			'checked' : null
		}) : toggleObj.set({
			'checked' : 'true'
		});
	}

	Model.prototype.showJsSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/components/justep/button/demo/toggle.js"
		});
	};

	Model.prototype.showStyleSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/button/demo/toggle.w&xid=showToggleStyle"
		});
	};

	Model.prototype.showEventSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/button/demo/toggle.w&xid=toggleEvent"
		});
	};

	Model.prototype.showToggleGroupSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/button/demo/toggle.w&xid=showToggleGroup"
		});
	};

	return Model;
});