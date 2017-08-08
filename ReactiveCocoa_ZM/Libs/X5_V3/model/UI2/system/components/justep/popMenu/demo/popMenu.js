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
		this.callParent();
		this.isVisible = Message.flag;
	};

	Model.prototype.closeWin = function(event) {
		justep.Portal.closeWindow();
	};

	Model.prototype.show = function(event) {
		this.comp("popMenu").show();
	};

	Model.prototype.click = function(event) {
		Message.message("aler","点击菜单");
	};

	Model.prototype.showPopMenuSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/popMenu/demo/popMenu.w&xid=popMenu"
		});
	};
	
	Model.prototype.showJsSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/components/justep/popMenu/demo/popMenu.js"
		});
	};

	return Model;
});