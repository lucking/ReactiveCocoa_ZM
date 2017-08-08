define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var templateService = require("$UI/system/templates/common/js/templateService");
	
	var Model = function(){
		this.callParent();
	};
	
	Model.prototype.modelLoad = function(event) {
		this.templateEngine = this.getParent().templateEngine;
		this.templateFile = this.templateEngine.config.items[0].file;
		var currentDir = this.templateEngine.getTargetPath();
		this.rootDir = currentDir.indexOf('UI2')==-1?currentDir.substring(0,currentDir.indexOf('UI')+2):currentDir.substring(0,currentDir.indexOf('UI2')+3);
		this.callParent();
	};
	
	Model.prototype.getTitle = function(wizard){
		return '选择继承的父窗体';
	};
	
	Model.prototype.hasCancelBtn = function(wizard) {
		return true;
	};
	
	Model.prototype.hasBackBtn = function(wizard) {	
		return true;
	};
	
	Model.prototype.hasNextBtn = function(wizard) {
		return false;
	};
	
	Model.prototype.hasFinishBtn = function(wizard) {
		return true;
	};
	
	Model.prototype.backPage = function(wizard){
		wizard.back(this);
	};

	Model.prototype.validate = function(wizard) {
		if(this.selectedFile == null || this.selectedFile == undefined){
			alert("没有选中w文件");
			return false;
		}
		return true;
	};
	Model.prototype.finish = function(wizard) {
		this.templateEngine.addContext(this.templateFile, "parent", this.selectedFile);
	};

	return Model;
});