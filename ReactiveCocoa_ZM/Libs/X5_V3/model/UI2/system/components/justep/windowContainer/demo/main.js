/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var WindowContainer = require("$UI/system/components/justep/windowContainer/windowContainer");
	var justep = require("$UI/system/lib/justep");
	var Message = require("$UI/system/components/justep/common/common");
	var Model = function() {
		this.callParent();
		this.isVisible = Message.flag;
	};

	Model.prototype.updateSrc = function() {
		var windowContainer = this.comp("windowContainer");
		var src = require.toUrl("$UI/system/components/justep/windowContainer/demo/inner3.w");
		windowContainer.setSrc(src);
		windowContainer.refresh();
	};

	Model.prototype.createWindowContainer = function() {
		var container = this.getElementByXid("container");
		for (var i=container.childNodes.length-1; i>=0; i--){
			justep.Bind.removeNode(container.childNodes[i]);
		}
		var src = require.toUrl("$UI/system/components/justep/windowContainer/demo/inner3.w");
		new WindowContainer({
			parentNode : container,
			src : src,
			onLoadError: function(err){
				for (var i=container.childNodes.length-1; i>=0; i--){
					justep.Bind.removeNode(container.childNodes[i]);
				}
				err.cancel = false;
			}
		});
	};


	Model.prototype.closeWin = function(event) {
		justep.Portal.closeWindow();
	};

	Model.prototype.showWinConSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/windowContainer/demo/main.w&xid=windowContainer"
		});
	};

	Model.prototype.showJsSource = function(event){
		this.comp("windowDialog").open({
			data : "system/components/justep/windowContainer/demo/main.js"
		});
	};

	return Model;
});
