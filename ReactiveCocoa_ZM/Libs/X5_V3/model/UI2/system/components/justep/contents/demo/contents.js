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

	Model.prototype.showContentsSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/contents/demo/contents.w&xid=pages"
		});
	};

	Model.prototype.showJsSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/components/justep/contents/demo/contents.js"
		});
	};

	Model.prototype.checkboxChanged = function(event) {
		this.comp('pages').slidable = !this.comp('pages').slidable;
	};

	Model.prototype.wrapControlChanged = function(event) {
		this.comp('pages').wrap = !this.comp('pages').wrap;
	};
	
	Model.prototype.prevBtnClick = function(event) {
		Message.message("aler", "进入上个contents");
		this.comp('pages').prev();
	};

	Model.prototype.nextBtnClick = function(event) {
		Message.message("aler", "进入下个contents");
		this.comp('pages').next();
	};

	Model.prototype.goNextPage = function(event) {
		Message.message("aler", "进入page2");
		this.comp('pages').to('content-2');
	};

	Model.prototype.backPrePage = function(event) {
		Message.message("aler", "返回page1");
		this.comp('pages').to('content-1');
	};

	Model.prototype.nextPage = function(event) {
		Message.message("aler", "进入page3");
		this.comp('pages').to('content-3');
	};

	Model.prototype.backPage = function(event) {
		Message.message("aler", "返回page2");
		this.comp('pages').to('content-2');
	};

	Model.prototype.pagesSlide = function(event) {
		$("#console").prepend('<p>slide from ' + event.from + ' to page ' + event.to + ', direction is ' + event.type + '</p>');
	};

	Model.prototype.contentsActive = function(event) {
		$("#console").prepend('<p>进入 page1</p>');
	};

	Model.prototype.contentsUnActive = function(event) {
		$("#console").prepend('<p>离开 page2</p>');
	};

	return Model;
});