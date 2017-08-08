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

	Model.prototype._showBuildStatus = function(result) {
		if (result.flag && (result.code != "ERROR")) {
			this.getParent().openPage({
				id : "downloadApp",
				url : "downloadApp.w",
				fromId : "appInfo"
			});
		} else {
			this.callParent(result);
		}
	};

	return Model;
});
