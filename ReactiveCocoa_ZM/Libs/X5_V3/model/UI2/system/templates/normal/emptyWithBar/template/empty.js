define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	var Model = function(){
		this.callParent();
	};

	Model.prototype.backBtnClick = function(){
		justep.Portal.closeWindow();
	};

	return Model;
});
