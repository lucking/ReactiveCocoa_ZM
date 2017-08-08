/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var Message = require("$UI/system/components/justep/common/common");
	
	var Model = function(){
		this.callParent();
		this.isVisible = Message.flag;
	};

	Model.prototype.closeWin = function(event){
		justep.Portal.closeWindow();
	};

	Model.prototype.modelModelConstruct = function(event){
	this.comp("modelConstruct").set({"value":"1..触发onModelModelConstruct事件"});
	};

	Model.prototype.modelModelConstructDone = function(event){
	this.comp("modelConstructDone").set({"value":"2..触发onModelConstructDone事件"});
	};

	Model.prototype.modelLoad = function(event){
		this.comp("modelLoad").set({"value":"3..触发onLoad事件"});
	};

	Model.prototype.modelUnLoad = function(event){
		
	};

	Model.prototype.showModelSource = function(event){
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/model/demo/model.w&xid=model"
		});
	};

	Model.prototype.showJsSource = function(event){
		this.comp("windowDialog").open({
			data : "system/components/justep/model/demo/model.js"
		});
	};

	return Model;
});