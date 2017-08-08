define(function(require) {

	var Model = function() {
		this.callParent();
	};

	Model.prototype.modelLoad = function(event) {
		this.getParent().comp("cancelBtn").set({
			label : "关闭"
		});
		this.appEngine = this.getParent().appEngine;
		this._showBuildInfo(this.getParent().buildResponse);
	};

	Model.prototype._showBuildInfo = function(result) {
		var config = this.appEngine.getConfig();
		for ( var prop in config) {
			var comp = this.comp(prop);
			if (comp) {
				comp.set({
					value : config[prop]
				});
			}
		}
	};

	Model.prototype.getTitle = function(wizard) {
		return '本地应用信息';
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

	Model.prototype.finish = function(wizard) {
		return true;
	};

	return Model;
});
