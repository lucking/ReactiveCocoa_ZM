/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	//var $ = require("jquery");
	var WindowDialog = require("../windowDialog");
	var justep = require("$UI/system/lib/justep");
	var Message = require("$UI/system/components/justep/common/common");
	var Model = function() {
		this.value = 'this is windowDialog test';
		this.isVisible = Message.flag;
		this.callParent();
	};

	Model.prototype.closeWin = function(event){
		justep.Portal.closeWindow();
	};

	Model.prototype.dynamicCreateWindowDialog = function(event){
		var url = require.toUrl("./dialog.w");
		if (!this.dialog){
			this.dialog = new WindowDialog({
					title : '这是一个功能',
					showTitle : true,
					status: '',
					src : url,
					parentNode : this.getElementByXid("dialog")
			});
			this.dialog.on('onReceive', function(event) {
				this.comp('output').set({value:'打开'});
			}, this);
			this.dialog.on('onClose', function(event) {
				this.comp('output').set({value:'关闭:'});
			}, this);
		}
		this.dialog.open({data:this.value});
	};

	Model.prototype.standardOpenWindowDailog = function(event){
		this.comp("windowDialog").open();
	};

	Model.prototype.showWindowDialogSource = function(event){
		this.comp("sourceDialog").open({data:"system/service/common/getWindowContent.j?window=/UI2/system/components/justep/windowDialog/demo/demo.w&xid=windowDialog"});
	};

	Model.prototype.showJsSource = function(event){
		this.comp("sourceDialog").open({data:"system/components/justep/windowDialog/demo/demo.js"});
	};

	Model.prototype.windowDialogReceive = function(event){
		this.comp("output").set({"value":event.data});
	};

	return Model;
});
