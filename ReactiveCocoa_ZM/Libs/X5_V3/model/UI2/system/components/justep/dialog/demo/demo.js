/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	// var $ = require("jquery");
	var Dialog = require("$UI/system/components/justep/dialog/dialog");
	var justep = require("$UI/system/lib/justep");
	var Model = function() {
		this.callParent();
	};

	Model.prototype.open = function(event) {
		if (!this.dialog) {
			this.dialog = new Dialog({
				title : '这是一个功能',
				showTitle : true,
				parentNode : this.getElementByXid("dialog")
			});
			this.dialog.on('onClose', function(event) {
				this.comp('output').set({
					'value' : '关闭'
				});
			}, this);
			this.dialog.on('onOpen', function(event) {
				alert('打开');
			}, this);
		}
		this.dialog.open();
	};

	Model.prototype.dialogOpen = function(event) {
		alert('打开dialog');
	};

	Model.prototype.closeWin = function(event) {
		justep.Portal.closeWindow();
	};

	Model.prototype.showMessageDialogSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/dialog/demo/demo.w&xid=dialog"
		});
	};

	Model.prototype.showJsDialogSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/components/justep/dialog/demo/demo.js"
		});
	};

	return Model;
});
