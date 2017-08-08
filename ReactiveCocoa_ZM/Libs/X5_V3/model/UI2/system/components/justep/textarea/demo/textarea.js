/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var TextArea = require("../textarea");
	var Message = require("$UI/system/components/justep/common/common");
	
	var Model = function() {
		this.i = 0;
		this.callParent();
		this.isVisible = Message.flag;
	};

	Model.prototype.closeWin = function(event) {
		justep.Portal.closeWindow();
	};

	Model.prototype.showTextareaSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/textarea/demo/textarea.w&xid=textareaStyle"
		});
	};

	Model.prototype.textarea1Change = function(event) {
		Message.message("aler","textarea中的内容发生改变");
	};

	Model.prototype.showJsSource = function(event){
		this.comp("windowDialog").open({
			data : "system/components/justep/textarea/demo/textarea.js"
		});
	};

	Model.prototype.getTextAreaValue = function(event){
		Message.message("aler",this.getElementByXid("textarea").value);
	};

	Model.prototype.dynamicCreateTA = function(event){
		var parentNode = this.getElementByXid("parent");
		if (parentNode) {
			var xid = "text"+this.i++;
			var conf = {
					xid:xid,
					parentNode:parentNode,
			};
			var textarea = new TextArea(conf);
		}
	};

	return Model;
});