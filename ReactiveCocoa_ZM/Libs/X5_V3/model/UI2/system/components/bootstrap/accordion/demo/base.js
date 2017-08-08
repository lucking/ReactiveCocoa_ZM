/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	
	var bind = require("bind");
	
	var ctor = function(){
		this.callParent();
		this.init();
	};
	
	ctor.prototype.init = function(){
	};

	ctor.prototype.accordion1Show = function(event){
		console.log(event.index)
	};
	
	ctor.prototype.accordion1Hide = function(event){
		console.log(event.index)
	};
	
	return ctor;

});

