/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	//var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var Input = require("../input");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.input6Render = function(event) {
		event.text = event.value == '1' ? '男' : '女';
	};

	Model.prototype.input2Change = function(event) {
		this.comp('output2-1').set({
			'value' : 'input2 value change:' + event.originalValue + '-->' + event.value
		});
	};

	Model.prototype.createInput = function() {
		var parent = this.getElementByXid("create-input");
		if (parent) {
			var cfg = {
				'bind-ref' : "bizData1.ref('fDateTime')",
				format : "yyyy-MM-dd hh:mm",
				parentNode : parent
			};
			new Input(cfg);
		} else
			alert('error');
	};

	Model.prototype.closeWin = function(event){
		justep.Portal.closeWindow();
	};

	return Model;
});
