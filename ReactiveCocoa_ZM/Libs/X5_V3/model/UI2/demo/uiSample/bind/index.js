define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var myMath = require("./myMath");
	require("res!./img");
	
	var Model = function(){
		this.callParent();
		this.myMath = myMath;
	};
	
	Model.prototype.toUrl = function(url) {
		return require.toUrl(url);
	};
	
	Model.prototype.test = function() {
		debugger;
	};

	Model.prototype.panelTopClick = function(event){
		var panelContent = $(".panel-body", event.currentTarget.parentElement);
		panelContent.is(":visible") ? panelContent.hide() : panelContent.show();
	};

	Model.prototype.deleteBtnClick = function(event){
		var row = event.bindingContext.$object;
		row.data.deleteData([row]);
	};

	Model.prototype.editBtnClick = function(event){
		var row = this.comp("tempData").getCurrentRow();
		row.val("foodDataReadonly", !row.val("foodDataReadonly"));
	};

	return Model;
});