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

	ctor.prototype.button1Click = function(event){
		this.comp('pages').to(0);
	};
	
	ctor.prototype.button2Click = function(event){
		this.comp('pages').to('content-2');
	};
	
	ctor.prototype.checkbox1Changed = function(event){
		this.comp('pages').slidable = !this.comp('pages').slidable; 
	};
	
	ctor.prototype.model1Load = function(event){
		this.comp('slideControl').val(true);
		this.comp('wrapControl').val(true);
	};
	
	ctor.prototype.wrapControlChanged = function(event){
		this.comp('pages').wrap = !this.comp('pages').wrap; 
	};
	
	ctor.prototype.prevBtnClick = function(event){
		this.comp('pages').prev();
	};
	
	ctor.prototype.nextBtnClick = function(event){
		this.comp('pages').next();
	};
	
	ctor.prototype.pagesSlide = function(event){
		$("#console").prepend('<p>slide from ' + event.from + ' to page ' + event.to + ', direction is ' + event.type + '</p>');
	};
	
	ctor.prototype.button3Click = function(event){
		this.comp('pages').to('content-1');
	};
	
	ctor.prototype.button4Click = function(event){
		this.comp('pages').to(2);
	};
	
	ctor.prototype.panel1Active = function(event){
		$("#console").prepend('<p>进入 page1</p>');
	};
	
	ctor.prototype.panel2UnActive = function(event){
		$("#console").prepend('<p>离开 page1</p>');
	};
	
	return ctor;

});

