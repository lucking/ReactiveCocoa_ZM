/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){

	var Model = function(){
		this.callParent();
	};
	Model.prototype.button1Click = function(event){
		this.comp('wing1').showLeft();
	};

	Model.prototype.button4Click = function(event){
		this.comp('wing1').hideLeft();
	};

	Model.prototype.button3Click = function(event){
		this.comp('wing1').showRight();
	};

	Model.prototype.button2Click = function(event){
		this.comp('wing1').hideRight();
	};

	Model.prototype.displayDataDataChange = function(event){
	};

	Model.prototype.displayDataValueChange = function(event){
		this.comp('wing1').setDisplay(event.newValue);
	};

	return Model;
});
