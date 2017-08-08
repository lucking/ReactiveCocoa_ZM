define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	var Model = function(){
		this.callParent();
	};

	Model.prototype.backBtn1Click = function(event){
		justep.Portal.closeWindow();
	};

	Model.prototype.backBtn2Click = function(event){
		var contents = this.comp('contents');
		contents.to('content1');
	};

	return Model;
});
