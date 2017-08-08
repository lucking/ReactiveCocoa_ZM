define(function(require) {
	var templateService = require("$UI/system/templates/common/js/templateService");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.modelLoad = function(event) {
		this.appEngine = this.getParent().appEngine;

		var config = this.appEngine.getConfig();
		this.comp("androidCheckbox").val(config.platform && (config.platform.indexOf('android') >= 0));
		this.comp("iosCheckbox").val(config.platform && (config.platform.indexOf('ios') >= 0));
		this.comp("compileUI").val(config.compileUI);
		this.comp("useAppBuilderServer").val(config.useAppBuilderServer);
		this.comp("releaseMode").val(config.releaseMode === "release");
		this.comp("appBuilderServer").val(config.appBuilderServer ? config.appBuilderServer : config.appBuilderServer_Global);
		this._refreshAppBuilderServerDiv();
	};

	Model.prototype._refreshAppBuilderServerDiv = function() {
		if (this.comp("useAppBuilderServer").get("checked") === true) {
			$(this.getElementByXid("appBuilderServerDiv")).show();
		} else {
			$(this.getElementByXid("appBuilderServerDiv")).hide();
		}
	};

	Model.prototype.getTitle = function(wizard) {
		return '选择打包的平台';
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

	Model.prototype.finish = function() {
		var result = this.comp('androidCheckbox').get('checked') || this.comp('iosCheckbox').get('checked');
		if (!result) {
			alert("平台类型不能为空，请至少选择一种平台类型");
		} else {
			var config = this.appEngine.getConfig();
			config.platform = '';
			if (this.comp('androidCheckbox').get('checked')) {
				config.platform = 'android';
			}
			if (this.comp('iosCheckbox').get('checked')) {
				config.platform += config.platform ? ',ios' : 'ios';
			}

			config.compileUI = this.comp("compileUI").get("checked") === true;
			config.useAppBuilderServer = this.comp("useAppBuilderServer").get("checked") === true;
			config.releaseMode = (this.comp('releaseMode').get('checked') === true) ? "release" : "debug"
			config.appBuilderServer = this.comp("appBuilderServer").get("value");
			if (!config.appBuilderServer_Global) {
				templateService.setAppBuilderServerUrl(config.appBuilderServer);
			}

			this.getParent().openPage({
				id : "waittingDialog",
				url : "waittingDialog.w",
				fromId : "appInfo"
			});
		}

		return result;
	};

	Model.prototype.androidImageClick = function(event) {
		var checkObj = this.comp('androidCheckbox');
		checkObj.val(!(checkObj.get("checked") === true));
	};

	Model.prototype.iosImageClick = function(event) {
		var checkObj = this.comp('iosCheckbox');
		checkObj.val(!(checkObj.get("checked") === true));
	};

	Model.prototype.useAppBuilderServerChange = function(event) {
		this._refreshAppBuilderServerDiv();
	};

	Model.prototype.testServerButtonClick = function(event) {
		var self = this;
		$.ajax({
			async : false,
			contentType : 'text/plain',
			processData : false,
			type : 'GET',
			url : require.toUrl("$UI/system/deploy/package/test.j?appBuilderServer=" + this.comp("appBuilderServer").get("value")),
			success : function(result) {
				alert('连接成功');
			},
			error : function(xhr, status, err) {
				alert('连接失败，请检查服务地址是否正确');
			}
		});
	};

	return Model;
});
