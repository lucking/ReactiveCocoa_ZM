/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var Message = require("$UI/system/components/justep/common/common");
	var justep = require("$UI/system/lib/justep");
	var Input = require("../input");

	var Model = function() {
		this.callParent();
		this.flag = Message.flag;
	};

	Model.prototype.backBtn = function(event) {
		justep.Portal.closeWindow();
	};

	Model.prototype.inputChange = function(event) {
		Message.message("aler", "onChange事件:"+event.originalValue + '-->' + event.value);
	};

	Model.prototype.inputRender = function(event) {
		
		event.text = event.value==="1"?"蓝色":(event.value === "2"?"红色":"黄色");
	};

	Model.prototype.dynamicCreateInput = function(event) {
		Message.message("aler", "input 动态添加input组件");
		var parent = this.getElementByXid("parent");
		if (parent) {
			var cfg = {
				'bind-ref' : "data.label('fDateTime')",
				format : "yyyy-MM-dd hh:mm",
				parentNode : parent,
				placeHolder : "" + this.i++
			};
			var input = new Input(cfg);
		} else
			Message.message("aler","创建input出错!");
	};

	Model.prototype.attrExplain = function(event) {
		Message.message("aler", "placeHolder属性的使用");
	};

	Model.prototype.getInputVal = function(event) {
		Message.message("aler", this.comp("getInputValue").value);
	};

	Model.prototype.getInpRenVal = function(event) {
		Message.message("aler", this.getElementByXid("inpRender").value);
	};

	Model.prototype.showInpStyleSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/input/demo/input.w&xid=controlGroupStyle"
		});
	};

	Model.prototype.showInpUseSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/input/demo/input.w&xid=controlGroupUse"
		});
	};

	Model.prototype.showInpEvent = function(event) {
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/input/demo/input.w&xid=controlGroupEvent"
		});
	};

	Model.prototype.showJsSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/components/justep/input/demo/input.js"
		});
	};

	Model.prototype.inpRenderChange = function(event){
		Message.message("aler", "input render事件");
	};

	return Model;
});