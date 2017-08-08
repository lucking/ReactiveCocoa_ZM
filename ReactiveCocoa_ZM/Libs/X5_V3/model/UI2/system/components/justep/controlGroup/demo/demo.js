/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	// var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var Message = require("$UI/system/components/justep/common/common");
	var Model = function() {
		this.isVisible = Message.flag;
		this.callParent();
	};
	Model.prototype.showControlGroupStyle = function(event) {
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/controlGroup/demo/demo.w&xid=controlGroupStyle"
		});
	};

	Model.prototype.closeWin = function(event) {
		justep.Portal.closeWindow();
	};

	return Model;
});
