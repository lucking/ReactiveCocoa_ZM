define(function(require) {
	var $ = require("jquery");
	var Model = function() {
		this.callParent();
	};

	Model.prototype.hasBackBtn = function(wizard) {
		return false;
	};

	Model.prototype.hasNextBtn = function(wizard) {
		return false;
	};

	Model.prototype.hasFinishBtn = function(wizard) {
		return false;
	};

	Model.prototype.getSucessInfo = function(result) {
		return "编译UI资源成功！生成结果在“www”目录";
	}
	
	return Model;
});
