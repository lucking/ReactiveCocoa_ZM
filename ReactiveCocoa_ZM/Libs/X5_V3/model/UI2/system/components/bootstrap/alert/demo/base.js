/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {

	var Button = require("$UI/system/components/justep/button/button");
	var justep = require("$UI/system/lib/justep");
	var Message = require("$UI/system/components/justep/common/common");
	var Model = function() {
		this.i = 0;
		this.callParent();
		this.isVisible = Message.flag;
		this.click1 = function(event) {
			alert('点击成功:' + event.source.get("label"));
		};

		this.click2 = function(event) {

			var parent = document.getElementById("window1");
			if (parent) {
				var xid = "bar" + this.i++;
				var title = "Welcome";
				var cfg = {

					title : title,
					xid : xid
				};

				var options = {
					config : cfg,
					parent : parent
				};

				var parent1 = this.getElementByXid(xid);
				var btnid = "btn" + this.i++;

				cfg = {

					label : btnid,
					xid : btnid
				};

				options = {
					config : cfg,
					parent : parent1

				};
				var button = new Button(options);
				var btnxid = "btn" + this.i++;

				cfg = {

					label : btnxid,
					xid : btnxid,
					style : 'float:right'
				};

				options = {

					config : cfg,
					parent : parent1
				};
				button = new Button(options);

			} else
				alert('error');
		};

		this.click3 = function(event) {
			var newlable = event.source.get("label");
			var bar = this.comp("bar");
			bar.set({title:newlable});
			

		};
	};
	Model.prototype.closeWin = function(event){
		justep.Portal.closeWindow();
	};
	Model.prototype.showBarSource = function(event){
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/bar/demo/base.w&xid=demoBar"
		});	
	};
	Model.prototype.button3Click = function(event){
		this.comp('alert2').show();
	};
	return Model;

});
