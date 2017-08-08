define(function(require) {
	var $ = require("jquery");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.hasDownloadBtn = function(wizard) {
		return true;
	};

	Model.prototype.hasBackBtn = function(wizard) {
		return false;
	};

	Model.prototype.hasNextBtn = function(wizard) {
		return true;
	};

	Model.prototype.hasFinishBtn = function(wizard) {
		return false;
	};

	Model.prototype.downloadPage = function(wizard) {
		this.getParent().openPage({
			id : "downloadApp",
			url : "downloadApp.w",
			fromId : "appInfo"
		});
	};

	Model.prototype.nextPage = function(wizard) {
		this.getParent().openPage({
			id : "selectPlatform",
			url : "selectPlatform.w",
			fromId : "appInfo"
		});

	};

	return Model;
});
