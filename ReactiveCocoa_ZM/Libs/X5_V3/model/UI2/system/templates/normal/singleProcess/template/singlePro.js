define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	
	var Model = function(){
		this.callParent();
	};

	Model.prototype.saveCommit = function(event){
		alert("保存数据成功！");
	};

	
	Model.prototype.backBtnClick = function(){
		justep.Portal.closeWindow();
	};
	
	Model.prototype.moreBtnClick = function(event){
		this.comp("processMenu").show();
	};
	
	
	
	return Model;
});
