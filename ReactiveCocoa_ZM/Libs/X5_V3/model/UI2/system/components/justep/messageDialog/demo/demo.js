/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	// var $ = require("jquery");
	var MsgDialog = require("../messageDialog");
	var justep = require("$UI/system/lib/justep");
	var Message = require("$UI/system/components/justep/common/common");
	var Model = function() {
		this.callParent();
		this.isVisible = Message.flag;
		this.type = 'OK';
		this.title = '测试';
		this.text = '这是一条信息.............................................................................';
		this.width = '';
	};

	Model.prototype.show = function(event) {
		Message.message("aler", "通过代码动态创建MessageDialog");
		if (!this.msg)
			this.msg = new MsgDialog({
				parentNode : this.getElementByXid("buttons")
			});
		this.msg.on('onClose', function(event) {
			this.comp('output').set({
				'value' : '点击：' + event.button + '，input：' + event.input
			});
		}, this);
		this.msg.show({
			type : this.type,
			title : this.title,
			message : this.text,
			width : this.width
		});
	};

	Model.prototype.closeWin = function(event) {
		justep.Portal.closeWindow();
	};

	Model.prototype.showMessageDialogSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/messageDialog/demo/demo.w&xid=messageDialg"
		});
	};

	Model.prototype.showJsSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/components/justep/messageDialog/demo/demo.js"
		});
	};

	Model.prototype.standardCreate = function(event) {
		Message.message("aler", "通过组件的方式创建MessageDialog");
		this.comp("messageDialg").show();
	};

	Model.prototype.widthIdChange = function(event){
		var d = $("#"+this.getIDByXID("widthId")).val();
		isNaN(d)||d<200?($("#"+this.getIDByXID("widthId")).css("background","red"),Message.message("aler","输入的内容错误,输入的不是数字或小于100")):$("#"+this.getIDByXID("widthId")).css("background",'');
	};

	return Model;
});
