/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var Message = require("$UI/system/components/justep/common/common");
	var justep = require("$UI/system/lib/justep");

	var Model = function() {
		this.callParent();
		this.isVisible = Message.flag;
	};

	Model.prototype.closeWin = function(event) {
		justep.Portal.closeWindow();
	};

	Model.prototype.toggleTop = function(event) {
		Message.message("aler", "对panel组件的top部分进行操作");
		this.comp('panel').toggleTop();
	};

	Model.prototype.toggleBottom = function(event) {
		Message.message("aler", "对panel组件的bottom部分进行操作");
		this.comp('panel').toggleBottom();
	};

	Model.prototype.showPanelSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/panel/demo/panel.w&xid=panel"
		});
	};

	Model.prototype.showJsSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/components/justep/panel/demo/panel.js"
		});
	};

	return Model;
});