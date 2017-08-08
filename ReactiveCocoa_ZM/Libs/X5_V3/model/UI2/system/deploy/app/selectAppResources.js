define(function(require) {
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.modelLoad = function(event) {
		this.appEngine = this.getParent().appEngine;
		var appNames = xuiService.getAllAppNames();
		var appData = this.comp("appData");
		appNames.forEach(function(key, value) {
			if ((key != "system") && (key != "bin")) {
				appData.newData({
					defaultValues : [ {
						// order by ID, 目前前端排序未支持
						ID : key == "system" ? 0 : (key == "SA" ? value + 10 : (key == "portal" ? value + 20 : value + 30)),
						AppName : key,
						Checked : false
					} ]
				});
			}
		});

		if (this.getParent().edit) {
			var config = this.appEngine.getConfig();
			this.comp("serverURL").val(config.serverURL);
			this.comp("indexURL").val(config.indexURL);
			this.comp("appNamesGroup").val(config.uiResDirs ? config.uiResDirs.replace(new RegExp(/(,)/g), ' ') : '');
		} else {
			this.comp("appNamesGroup").val('');
		}

		this._recalcHeight();
		var self = this;
		$(window).resize(function() {
			self._recalcHeight();
		});
	};

	Model.prototype._recalcHeight = function() {
		var height = $("body").height() - $(this.getElementByXid("serverDiv")).height() - 120;
		$(this.getElementByXid("appNamesDiv")).height(height);
	};

	Model.prototype.getTitle = function(wizard) {
		return '选择需要打包的资源';
	};

	Model.prototype.hasCancelBtn = function(wizard) {
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

	Model.prototype.validate = function() {
		if (!this.comp("indexURL").get("value")) {
			alert("“首页”不能为空");
			return false;
		}
		return true;
	};

	Model.prototype.nextPage = function(wizard) {
		if (this.validate()) {
			var config = this.appEngine.getConfig();
			config.serverURL = this.comp("serverURL").get("value");
			config.indexURL = this.comp("indexURL").get("value");
			if (!config.serverURL) {
				config.serverURL = "http://localhost";
			}
			var uiResDirs = this.comp("appNamesGroup").val().split(' ');
			config.uiResDirs = uiResDirs.join(",");

			this.getParent().openPage({
				id : "configApp",
				url : "configApp.w",
				fromId : "selectAppResources"
			});
		}
	};

	return Model;
});
