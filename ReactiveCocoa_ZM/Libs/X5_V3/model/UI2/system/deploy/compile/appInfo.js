define(function(require) {
	var $ = require("jquery");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.modelLoad = function(event) {
		this.callParent();
		
		this.getParent().comp("finishBtn").set({
			label : "编译"
		});
	};
	
	Model.prototype.hasBackBtn = function(wizard) {
		return false;
	};

	Model.prototype.hasNextBtn = function(wizard) {
		return false;
	};

	Model.prototype.hasFinishBtn = function(wizard) {
		return true;
	};

	Model.prototype.finish = function() {
		this.getParent().openPage({
			id : "waittingDialog",
			url : "waittingDialog.w",
			fromId : "appInfo"
		});

		return true;
	};

	return Model;
});
