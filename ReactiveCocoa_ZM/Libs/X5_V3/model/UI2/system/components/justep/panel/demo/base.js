/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	
	var ctor = function(){
		this.callParent();
		this.init();
	};
	
	ctor.prototype.init = function(){
	};
	
	ctor.prototype.button1Click = function(event){
		this.comp('panel1').toggleTop();
	};
	
	ctor.prototype.button2Click = function(event){
		this.comp('panel1').toggleBottom();
	};
	
	return ctor;

});

