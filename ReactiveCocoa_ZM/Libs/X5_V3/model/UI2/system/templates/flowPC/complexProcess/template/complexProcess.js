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
	
	
	
	Model.prototype.detailAdd = function(event){
		this.comp("contents").to("detailView");
	};
	
	
	
	Model.prototype.returnMainView = function(event){
		this.comp("contents").to("mainView");
	};

	Model.prototype.deleteBtn = function(event){
		this.comp(this.comp("list").get("data")).deleteData(event.bindingContext.$object);
	};

	Model.prototype.addBtnClick = function(event){
		this.comp("windowDialog").open();
	};

	return Model;
});
