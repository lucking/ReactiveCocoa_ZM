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
	
	Model.prototype.modelLoad = function(event){
		var masterData = this.comp('masterData');
		var slaveData = this.comp('slaveData');
		if(masterData.getCount()<=0)
			masterData.newData({onSuccess:function(){
				window.setTimeout(function(){
					slaveData.newData();
				},10);
			}});
	};
	
	Model.prototype.masterDataNewCreateParam = function(event){
		var i = 50 + Math.round(Math.random()*500);
		event.table.push({fString:'M'+(new Date()).getTime(),fInteger:i});
	};
	
	Model.prototype.slaveDataNewCreateParam = function(event){
		var i = Math.round(Math.random()*500);
		var f = Math.random();
		event.table.push({fString:'S'+(new Date()).getTime(),fInteger:i,fFloat:f});
	};
	
	Model.prototype.showBizDataSource = function(event){
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/data/demo/data.w&xid=masterData"
		});	
	};
	
	Model.prototype.showDataSource = function(event){
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/data/demo/data.w&xid=fruitData"
		});	
	};
	
	Model.prototype.showJsSource = function(event){
		this.comp("windowDialog").open({
			data : "system/components/justep/data/demo/data.js"
		});	
	};
	
	return Model;
});