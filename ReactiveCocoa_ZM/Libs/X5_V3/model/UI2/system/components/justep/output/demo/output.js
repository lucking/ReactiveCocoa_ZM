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

	Model.prototype.showOutpSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/output/demo/output.w&xid=outputStyle"
		});
	};

	Model.prototype.showJsSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/components/justep/output/demo/output.js"
		});
	};

	Model.prototype.inputWriteOutputValue = function(event) {
		this.comp('outputInput').set({
			'value' : event.value
		});
	};

	Model.prototype.outputRender = function(event) {
		var ranVal = this.comp("range").value;
		var outVal = ranVal > 8 ? "金鸡百花电影节" : (ranVal > 5 ? "戛纳电影节" : (ranVal > 2 ? "柏林电影节" : "北京国际电影节"));
		event.html = outVal;
	};

	Model.prototype.rangeWriteOutputValue = function(event) {
		this.comp('output').set({
			'value' : event.value
		})
	};

	return Model;
});