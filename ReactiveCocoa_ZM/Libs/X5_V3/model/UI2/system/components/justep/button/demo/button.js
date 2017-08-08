/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var Button = require("../button");
	var justep = require("$UI/system/lib/justep");
	var Message = require("$UI/system/components/justep/common/common");
	var Model = function() {
		this.i = 0;
		this.callParent();
		this.isVisible = Message.flag;
	};

	Model.prototype.buttonChange = function(evt) {
		Message.message("aler", "button size 属性操作");
		this.comp("defaultButton").setCSS({
			width : Math.round(Math.random() * 200)
		});
	};

	Model.prototype.dynamicAddButton = function(event) {
		Message.message("aler", "button 动态添加按钮");
		var parentNode = this.getElementByXid("parent");
		if (parentNode) {
			var xid = "--" + (++this.i) + "--";
			var flag = {
				xid : xid,
				label : xid,
				parentNode : parentNode,
				'class' : "btn btn btn-default"
			};
			var button = new Button(flag);
			button.on("onClick", function(event) {
				Message.message("aler",event.source.get('label'));
			});
		}
	};

	Model.prototype.setlg = function() {
		Message.message("aler", "buttonGroup btn-group-lg 属性操作");
		this.comp("buttonGroupSizeShow").removeClass('btn-group-sm');
		this.comp("buttonGroupSizeShow").removeClass('btn-group-xs');
		this.comp("buttonGroupSizeShow").toggleClass('btn-group-lg');
	};

	Model.prototype.setsm = function() {
		Message.message("aler", "buttonGroup btn-group-sm 属性操作");
		this.comp("buttonGroupSizeShow").removeClass('btn-group-lg');
		this.comp("buttonGroupSizeShow").removeClass('btn-group-xs');
		this.comp("buttonGroupSizeShow").toggleClass('btn-group-sm');
	};

	Model.prototype.setxs = function() {
		Message.message("aler", "buttonGroup btn-group-xs 属性操作");
		this.comp("buttonGroupSizeShow").removeClass('btn-group-lg');
		this.comp("buttonGroupSizeShow").removeClass('btn-group-sm');
		this.comp("buttonGroupSizeShow").toggleClass('btn-group-xs');
	};

	Model.prototype.setVertical = function() {
		Message.message("aler", "buttonGroup btn-group-vertical 属性操作");
		this.comp("buttonGroupVerShow").removeClass("btn-group-justified");
		this.comp("buttonGroupVerShow").toggleClass("btn-group-vertical");
	};

	Model.prototype.setJustified = function() {
		Message.message("aler", "buttonGroup btn-group-justified 属性操作");
		this.comp("buttonGroupVerShow").removeClass("btn-group-vertical");
		this.comp("buttonGroupVerShow").toggleClass("btn-group-justified");
	};

	Model.prototype.basicEvent = function(event) {
		
		Message.message("aler", "button 基本事件");
	};

	Model.prototype.returnMainPage = function(event) {
		justep.Portal.closeWindow();
	};

	Model.prototype.showiconSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/button/demo/button.w&xid=buttonicon"
		});
	};

	Model.prototype.showStyleSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/button/demo/button.w&xid=buttonColor"
		});
	};

	Model.prototype.showSizeSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/button/demo/button.w&xid=buttonSize"
		});
	};

	Model.prototype.showEventSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/button/demo/button.w&xid=buttonEvent"
		});
	};

	Model.prototype.showButtonGroupSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/button/demo/button.w&xid=showButtonGroup"
		});
	};

	Model.prototype.showJsSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/components/justep/button/demo/button.js"
		});
	};
	
	Model.prototype.showBtgVal = function(event){
		Message.message('aler','当前选中按钮的值为'+event.item.label)
	};
	return Model;
});