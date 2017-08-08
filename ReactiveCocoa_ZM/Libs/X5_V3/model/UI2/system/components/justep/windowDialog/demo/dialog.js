/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	//var $ = require("jquery");
	var Message = require("$UI/system/components/justep/common/common");
	var Model = function() {
		this.callParent();
		this.isVisible = Message.flag;
	};

	Model.prototype.ok = function(event) {
		this.comp('windowReceiver').windowEnsure('返回当前时间：'+(new Date()));
	};

	Model.prototype.cancel = function(event) {
		this.comp('windowReceiver').windowCancel();
	};

	Model.prototype.windowReceiverReceive = function(event){
		this.comp('output').set({value:'Receive:'+event.data});
	};
	Model.prototype.showWindowRevSource = function(event){
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/windowDialog/demo/dialog.w&xid=windowReceiver"
		});	
	};
	return Model;
});