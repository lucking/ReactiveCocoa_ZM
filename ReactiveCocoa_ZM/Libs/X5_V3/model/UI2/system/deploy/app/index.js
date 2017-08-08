/* ------------------------------------------------------------ 
向导主调度

主页面（wizard）接口：
	openPage = function(params)
	back = function(currentModel)
	refreshWizardPageStatus = function()

子页面接口:
	getTitle = function(wizard)
	hasCancelBtn = function(wizard)
	hasBackBtn = function(wizard)		
	hasNextBtn = function(wizard)
	hasFinishBtn = function(wizard)
	nextPage = function(wizard)
	finish = function(wizard)
------------------------------------------------------------ */

define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var bind = require("bind");
	var Component = require("$UI/system/lib/base/component");
	var WindowContainer = require("$UI/system/components/justep/windowContainer/windowContainer");
	var AppEngine = require("$UI/system/deploy/common/js/appEngine");
	var webSocket = require("$UI/system/components/designerCommon/js/webSocketMng");
	var templateService = require("$UI/system/templates/common/js/templateService");

	var Model = function() {
		this.callParent();
		this.title = bind.observable("");
		this.hasCancelBtn = bind.observable(true);
		this.hasBackBtn = bind.observable(false);
		this.hasNextBtn = bind.observable(true);
		this.hasFinishBtn = bind.observable(false);
		this.currentContainer = null;
		this.pageIdx = 0;
	};

	Model.prototype.modelLoad = function(event) {
		this.edit = webSocket.getRequestParameter("edit") == 'true';
		this.appEngine = new AppEngine('$UI/system/deploy/app/createApp.j' + (this.edit ? '?edit=true' : ''));
		this.targetPath = webSocket.getRequestParameter("targetPath");
		this.nativePath = templateService.getNativePath();
		if (this.edit) {
			var appPath = this.targetPath.substr(this.nativePath.length + 1);
			appPath = appPath.replace(/\\/g, '/');
			var appName = appPath.split('/')[0];
			this.appEngine.loadConfig(appName);
			this.appEngine.getConfig().oldAppName = this.appEngine.getConfig().appName;
		} else {
			var config = this.appEngine.getConfig();
			config.userID = justep.UUID.createUUID();
			config.compileUI = true;
			config.releaseMode = "release";
		}
		this.comp("appName").val(this.appEngine.getConfig().appName);
		var self = this;
		this.appEngine.buildFinishedNotify = function(result) {
			if (result.flag) {
				templateService.refreshFile(self.nativePath);
				templateService.selectFile(self.nativePath + '/' + self.appEngine.getConfig().appName);
			} else {
				alert("执行失败！，错误信息：" + result.reason);
			}
		};
		this.openPage({
			id : "selectAppResources",
			url : "selectAppResources.w",
			fromId : "index"
		});
	};

	/*
	 * @param {Object} 形如：{url: url, id: id, fromId: formId, refresh: false)
	 * @returns {void}
	 */
	Model.prototype.openPage = function(params) {
		var containers = $(".container");
		for ( var i = 0; i < containers.length; i += 1) {
			containers[i].style.display = "none";
		}
		var id = params.id || "page_" + (this.pageIdx++);
		var refresh = params.refresh;
		var fromId = params.fromId;
		var containerNode = document.getElementById(id);
		if (!containerNode) {
			this.currentContainer = this._createContainer(id, params.url, fromId);
			containerNode = this.currentContainer.domNode;
		} else {
			this.currentContainer = Component.getComponent(containerNode);
			if (refresh) {
				this.currentContainer.refresh();
			} else {
				this._initWizardPage(this.currentContainer);
			}
		}
		containerNode.style.display = "block";
	};

	Model.prototype.back = function(currentModel) {
		var fromId = currentModel.getContext().getRequestParameter("fromId");
		this.openPage({
			id : fromId
		});
	},

	Model.prototype.refreshWizardPageStatus = function() {
		this._initWizardPage(this.currentContainer);
	};

	Model.prototype.finish = function() {
		var config = this.appEngine.getConfig();
		if (!config.appName) {
			alert("“应用名”不能为空");
			return;
		}
		
		var appDir = this.nativePath + "/" + config.appName;
		if ((!this._confirmFileExistsNeeded(appDir, config.oldAppName != config.appName) || confirm("新建的应用名“" + config.appName + "”已经存在，是否覆盖？如果覆盖原始目录将清空。")) && this.currentContainer.getInnerModel().finish(this)) {
			this.appEngine.build();
			this.appEngine.closeDialog()
		}
	};

	Model.prototype._containerLoaded = function(event) {
		this._initWizardPage(event.source);

	};

	Model.prototype._initWizardPage = function(container) {
		this.title.set(container.getInnerModel().getTitle());
		this.hasBackBtn.set(container && container.getInnerModel().hasBackBtn());
		this.hasNextBtn.set(container && container.getInnerModel().hasNextBtn());
		this.hasFinishBtn.set(container && container.getInnerModel().hasFinishBtn());
	};

	Model.prototype._createContainer = function(id, src, fromId) {
		src = require.toUrl(src + (src.indexOf("?") != -1 ? "&" : "?") + "id=" + id + (fromId ? ("&fromId=" + fromId) : ""));
		var container = new WindowContainer({
			parentNode : this.getElementByXid("containerParent"),
			src : src,
			onLoad : this._containerLoaded.bind(this)
		});
		$(container.domNode).attr('id', id);
		$(container.domNode).addClass('container');
		return container;
	};

	Model.prototype._confirmFileExistsNeeded = function(appDir, appNameChanged) {
		var fileExists = templateService.fileExists(appDir);
		return ((!this.edit && fileExists) || (this.edit && appNameChanged && fileExists))
	}
	
	Model.prototype.cancelBtnClick = function(event) {
		this.appEngine.closeDialog();
	};

	Model.prototype.backBtnClick = function(event) {
		if (this.currentContainer.getInnerModel().backPage) {
			this.currentContainer.getInnerModel().backPage(this);
		}
		this.back(this.currentContainer.getInnerModel());
	};

	Model.prototype.nextBtnClick = function(event) {
		this.currentContainer.getInnerModel().nextPage(this);
	};

	Model.prototype.finishBtnClick = function(event) {
		this.appEngine.getConfig().appName = this.comp("appName").get("value");
		this.finish();
	};

	return Model;
});
