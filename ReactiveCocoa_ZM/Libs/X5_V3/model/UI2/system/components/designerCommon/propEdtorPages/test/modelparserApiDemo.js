define(function(require){
	var bizModeService = require("$UI/system/components/designerCommon/js/bizModelService");
	var Model = function(){
		this.callParent();
	};
	Model.prototype.button1Click = function(event){
		var model = bizModeService.parseModel("/system/ontology");
		var value = model.getConceptList();//获取模块下的所有概念列表
		this.comp("textarea1").val(JSON.stringify(value));
	};

	Model.prototype.button2Click = function(event){
		var model = bizModeService.parseModel("/demo/misc/process/order");
		var value = model.getProcessList();//获取模块下的所有流程列表
		this.comp("textarea1").val(JSON.stringify(value));
	};

	Model.prototype.findConceptBtnClick = function(event){
		var model = bizModeService.parseModel("/system/ontology");
		var value = model.findConcept("SA_Task");//查找概念
		 
		this.comp("textarea1").val(JSON.stringify(value));
	};

	Model.prototype.findProcessBtnClick = function(event){
		var model = bizModeService.parseModel("/demo/misc/process/order");
		var process = model.findProcess("orderProcess");//查找process
		this.comp("textarea1").val(JSON.stringify(process));
	};

	Model.prototype.button3Click = function(event){
		var model = bizModeService.parseModel("/demo/misc/process/order");
		var value = model.getActionList();//获取模块下的所有action列表
		this.comp("textarea1").val(JSON.stringify(value));
	};

	Model.prototype.button4Click = function(event){
		var model = bizModeService.parseModel("/demo/misc/process/order");
		var value = model.findAction("queryTaskAction");//查找action
		this.comp("textarea1").val(JSON.stringify(value));
	};

	Model.prototype.button6Click = function(event){
		var model = bizModeService.parseModel("/system/ontology");
		var value = model.getConceptList();//获取模块下的所有概念列表
		value = model.get(value[0],"hasRelationList",true);//获取概念的hasRelation列表
		this.comp("textarea1").val(JSON.stringify(value));
	};

	Model.prototype.button7Click = function(event){
		var value = bizModeService.getAllAppNames();//获取应用名称列表
		this.comp("textarea1").val(JSON.stringify(value));
	};

	return Model;
});
