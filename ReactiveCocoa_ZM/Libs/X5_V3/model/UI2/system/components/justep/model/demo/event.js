/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	var $ = require("jquery");
	var bind = require("bind");
	
	var Model = function(){
		this.callParent();
		
		this.items = bind.observableArray([{name: 'name1'}, {name: 'name2'}]);
	};
	
	Model.prototype.modelConstruct = function(event){
		alert("model construct");
	};
	Model.prototype.modelConstructDone = function(event){
		alert("model construct done");
	};
	Model.prototype.load = function(event){
		alert("load");
	};
	Model.prototype.unload = function(event){
		
	};

	Model.prototype.btn1Click = function(event){
		
		alert("btn1 click: " + this.getIDByXID("btn1") + ", " + this.getIDByXID("container"));
	};
	$(document).bind("load",function(){
		alert(222);
	});
	return Model;
});

