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
		this.on('onPullToRefresh',function(){
			console.log('ptr');
		});
		this.on('onScrollRefresh',function(){
			console.log('sr');
		});
		this.on('onInfiniteLoad',function(){
			console.log('ifl');
		});
	};
	
	Model.prototype.button1Click = function(event){
		alert(this.val('fString'));
	};
	
	Model.prototype.loadMore = function(event){
		this.comp('list2').loadNextPage();
	};
	
	Model.prototype.refresh1ScrollMove = function(event){
		console.log('onScrollMove');
	};
	
	Model.prototype.refresh1ScrollEnd = function(event){
		console.log('onScrollEnd');
	};
	
	Model.prototype.refresh1InfiniteLoad = function(event){
		console.log('onInfiniteload');
		event.noMoreLoad = true;
	};
	
	Model.prototype.backBtn = function(event){
		justep.Portal.closeWindow();
	};
	
	Model.prototype.showScrollSource = function(event){
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/scrollView/demo/list/demo.w&xid=demoScrollView"
		});
	};
	
	Model.prototype.showJsSource = function(event){
		this.comp("windowDialog").open({
			data : "system/components/justep/scrollView/demo/list/demo.js"
		});
	};
	
	return Model;
});