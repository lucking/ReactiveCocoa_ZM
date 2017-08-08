/* ------------------------------------------------------------ 
向导主调度

主页面（wizard）接口：
	openPage = function(params)
	back = function(currentModel)
	refreshWizardPageStatus = function()

子页面接口:
	getTitle = function(wizard)
	hasDownloadBtn = function(wizard)
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
		this.hasDownloadBtn = bind.observable(false);
		this.hasCancelBtn = bind.observable(true);
		this.hasBackBtn = bind.observable(false);
		this.hasNextBtn = bind.observable(true);
		this.hasFinishBtn = bind.observable(false);
		this.currentCompose = null;
		this.pageIdx = 0;
	};

	Model.prototype.modelLoad = function(event) {
		this.appEngine = new AppEngine('$UI/system/deploy/package/pack.j');
		this.targetPath = webSocket.getRequestParameter("targetPath");
		this.nativePath = templateService.getNativePath();
		var appPath = this.targetPath.substr(this.nativePath.length + 1);
		appPath = appPath.replace(/\\/g, '/');
		var appName = appPath.split('/')[0];
		this.appEngine.loadConfig(appName);
		this.appEngine.getConfig().appBuilderServer_Global = templateService.getAppBuilderServerUrl();

		var self = this;
		this.appEngine.buildFinishedNotify = function(result) {
			self.buildFinished = true;
			self.buildResult = result;
			if (self.buildFinishedNotify) {
				self.buildFinishedNotify(result);
			}
			if (result.flag && result.code != "ERROR") {
				templateService.refreshFile(self.nativePath + '/' + self.appEngine.getConfig().appName);
				templateService.selectFile(self.nativePath + '/' + self.appEngine.getConfig().appName + '/dist');
			}
		};
		this.openPage({
			id : "appInfo",
			url : "appInfo.w",
			fromId : "index"
		});
	};

	/*
	 * @param {Object} 形如：{url: url, id: id, fromId: formId, refresh: false)
	 * @returns {void}
	 */
	Model.prototype.openPage = function(params) {
		var composes = $(".compose");
		for ( var i = 0; i < composes.length; i += 1) {
			composes[i].style.display = "none";
		}
		var id = params.id || "page_" + (this.pageIdx++);
		var refresh = params.refresh;
		var fromId = params.fromId;
		var composeNode = document.getElementById(id);
		if (!composeNode) {
			this.currentCompose = this._createCompose(id, params.url, fromId);
			composeNode = this.currentCompose.domNode;
		} else {
			this.currentCompose = Component.getComponent(composeNode);
			if (refresh) {
				this.currentContainer.refresh();
			}
			this._initWizardPage(this.currentCompose);
		}
		composeNode.style.display = "block";
	};

	Model.prototype.back = function(currentModel) {
		var fromId = currentModel.getContext().getRequestParameter("fromId");
		this.openPage({
			id : fromId
		});
	},

	Model.prototype.refreshWizardPageStatus = function() {
		this._initWizardPage(this.currentCompose);
	};

	/* 完成 */
	Model.prototype.finish = function() {
		if (this.currentCompose.getInnerModel().finish(this)) {
			this.appEngine.build(true);
		}
	};

	Model.prototype._composeLoaded = function(event) {
		this._initWizardPage(event.source);

	};

	Model.prototype._initWizardPage = function(compose) {
		this.title.set(compose.getInnerModel().getTitle());
		this.hasDownloadBtn.set(compose && compose.getInnerModel().hasDownloadBtn && compose.getInnerModel().hasDownloadBtn());
		this.hasBackBtn.set(compose && compose.getInnerModel().hasBackBtn());
		this.hasNextBtn.set(compose && compose.getInnerModel().hasNextBtn());
		this.hasFinishBtn.set(compose && compose.getInnerModel().hasFinishBtn());
	};

	Model.prototype._createCompose = function(id, src, fromId) {
		src = require.toUrl(src + (src.indexOf("?") != -1 ? "&" : "?") + "id=" + id + (fromId ? ("&fromId=" + fromId) : ""));
		var compose = new WindowContainer({
			parentNode : this.getElementByXid("composeParent"),
			src : src,
			onLoad : this._composeLoaded.bind(this)
		});
		$(compose.domNode).attr('id', id);
		$(compose.domNode).addClass('compose');
		return compose;
	};

	Model.prototype.cancelBtnClick = function(event) {
		this.appEngine.closeDialog();
	};

	Model.prototype.backBtnClick = function(event) {
		if (this.currentCompose.getInnerModel().backPage) {
			this.currentCompose.getInnerModel().backPage(this);
		}

		this.back(this.currentCompose.getInnerModel());
	};

	Model.prototype.nextBtnClick = function(event) {
		this.currentCompose.getInnerModel().nextPage(this);
	};

	Model.prototype.finishBtnClick = function(event) {
		this.finish();
	};

	Model.prototype.downloadBtnClick = function(event) {
		this.currentCompose.getInnerModel().downloadPage(this);
	};

	return Model;
});
