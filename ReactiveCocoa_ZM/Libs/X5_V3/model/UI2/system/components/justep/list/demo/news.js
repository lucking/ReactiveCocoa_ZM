/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	require("res!./img");
	var Model = function(){
		this.callParent();
	};

	Model.prototype.getImageUrl = function(row){
		return require.toUrl(row.val('fImage'));
	};
	
	return Model;
});