/*! 
* E5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
*/ 
define(function(require) {
	//var $ = require("jquery");
	//var Barcode = require("$UI/system/components/justep/barcode/barcodeImage");
	var justep = require("$UI/system/lib/justep");
	var Model = function() {
		this.callParent();
	};
	Model.prototype.backBtn = function(event){
		justep.Portal.closeWindow();
	};
	return Model;
});
