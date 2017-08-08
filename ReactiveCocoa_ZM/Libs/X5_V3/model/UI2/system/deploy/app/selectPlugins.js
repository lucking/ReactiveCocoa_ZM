define(function(require) {
	var Model = function() {
		this.callParent();
	};

	Model.prototype.modelLoad = function(event) {
		this.appEngine = this.getParent().appEngine;

		this.allPlugins = '';
		var pluginsInfo = this.appEngine.getPlugins(this.appEngine.getConfig().appName);
		for (i in pluginsInfo) {
			this.allPlugins = this.allPlugins + ' ' + pluginsInfo[i].id;
		}

		var pluginsData = this.comp("pluginsData");
		pluginsData.newData({
			defaultValues : pluginsInfo
		});

		if (this.getParent().edit) {
			var config = this.appEngine.getConfig();
			this.comp("autoSelectPlugins").val(config.autoSelectPlugins);
			this.comp("plugins").val(config.plugins ? config.plugins.replace(new RegExp(/(,)/g), ' ') : '');
			this._refreshPluginsDiv();
		}
	};

	Model.prototype._refreshPluginsDiv = function() {
		this.getElementByXid("pluginsDiv").style.display = (this.comp("autoSelectPlugins").get("checked") === true) ? "none" : "block";
	};

	Model.prototype._checkDependency = function(plugins) {
		plugins = plugins.split(',')
		var selectedPlugins = this.comp("plugins").val().split(' ');
		var mustSelectedPlugins = new Array();
		for ( var i = 0; i < plugins.length; i++) {
			if (!this._pluginAdded(selectedPlugins, plugins[i])) {
				mustSelectedPlugins.push(plugins[i]);
			}
		}
		
		return ((mustSelectedPlugins.length === 0) || confirm("有依赖的插件“" + mustSelectedPlugins.join(',') + "”未选择，是否选择？"))
	};

	Model.prototype._getNeededPlugins = function() {
		var plugins = this.comp("plugins").val();
		if (plugins) {
			plugins = plugins.split(' ');
			var neededPlugins = new Array();
			for ( var i = 0; i < plugins.length; i++) {
				this._addPlugin(neededPlugins, plugins[i]);
			}
			return neededPlugins.join(',');
		}
		else {
			return "";
		}
	};

	Model.prototype._pluginAdded = function(neededPlugins, pluginID) {
		var added = false;
		for ( var i = 0; i <= neededPlugins.length; i++) {
			if (neededPlugins[i] === pluginID) {
				added = true;
				break;
			}
		}
		return added;
	};

	Model.prototype._addPlugin = function(neededPlugins, pluginID) {
		if (this._pluginAdded(neededPlugins, pluginID)) {
			return;
		}

		var pluginsData = this.comp("pluginsData");
		var row = pluginsData.getRowByID(pluginID);
		var dependency = row.val("dependency");
		if (dependency != "") {
			dependency = dependency.split(',');
			for ( var i = 0; i < dependency.length; i++) {
				this._addPlugin(neededPlugins, dependency[i]);
			}
		}
		neededPlugins.push(pluginID);
	};

	Model.prototype.getTitle = function(wizard) {
		return '选择打包的本地插件';
	};

	Model.prototype.hasCancelBtn = function(wizard) {
		return true;
	};

	Model.prototype.hasBackBtn = function(wizard) {
		return true;
	};

	Model.prototype.hasNextBtn = function(wizard) {
		return true;
	};

	Model.prototype.hasFinishBtn = function(wizard) {
		return false;
	};

	Model.prototype.nextPage = function(wizard) {
		var plugins = this._getNeededPlugins();
		if (this._checkDependency(plugins)) {
			var config = this.appEngine.getConfig();
			config.autoSelectPlugins = this.comp("autoSelectPlugins").get("checked") === true;
			config.plugins = config.autoSelectPlugins ? '自动选择' : plugins;
			this.comp("plugins").val(config.plugins ? config.plugins.replace(new RegExp(/(,)/g), ' ') : '');

			this.getParent().openPage({
				id : "appInfo",
				url : "appInfo.w",
				fromId : "selectPlugins",
				refresh : true
			});
		}
	};

	Model.prototype.btnSelectAllClick = function(event) {
		this.comp("plugins").val(this.allPlugins);
	};

	Model.prototype.btnCancelAllClick = function(event) {
		this.comp("plugins").val("");
	};

	Model.prototype.checkbox2Change = function(event) {
		this._refreshPluginsDiv();
	};

	return Model;
});
