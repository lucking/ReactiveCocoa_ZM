define(function(require) {
	var justep = require('$UI/system/lib/justep');
	var webSocket = require("$UI/system/components/designerCommon/js/webSocketMng");
	var templateService = require("$UI/system/templates/common/js/templateService");

	var appEngine = function(reqURL) {
		this.constructor(reqURL);
	};

	appEngine.prototype = {

		constructor : function(reqURL) {
			this.reqURL = reqURL;
			this.config = {};
		},

		loadConfig : function(appName) {
			var self = this;
			$.ajax({
				async : false,
				contentType : 'application/json',
				processData : false,
				type : 'GET',
				url : require.toUrl('$UI/system/deploy/app/getAppConfig.j?appName=' + appName),
				success : function(result) {
					self.config = result;
				},
				error : function(xhr, status, err) {
					alert('加载应用配置失败，请检查目录“Native\\' + appName + '”是否正常');
				}
			});
		},

		getPlugins : function(appName) {
			var self = this;
			var plugins = $.ajax({
				async : false,
				contentType : 'application/json',
				processData : false,
				type : 'GET',
				url : require.toUrl('$UI/system/deploy/app/getRegPlugins.j?appName=' + appName),
				success : function(result) {
				},
				error : function(xhr, status, err) {
					alert('加载应用配置失败，请检查目录“Native\\' + appName + '”是否正常');
				}
			});

			return plugins.responseJSON;
		},

		getConfig : function() {
			return this.config;
		},

		build : function(async) {
			var self = this;
			var result = $.ajax({
				async : async === true,
				data : JSON.stringify(this.getConfig()),
				dataType : 'json',
				contentType : 'application/json',
				processData : false,
				type : 'POST',
				url : require.toUrl(this.reqURL),
				success : function(result) {
					if (self.buildFinishedNotify) {
						self.buildFinishedNotify(result);
					}
				},
				error : function(xhr, status, err) {
					if (self.buildFinishedNotify) {
						self.buildFinishedNotify({
							flag : false,
							message : err
						});
					}
				}
			});
		},

		closeDialog : function() {
			var pageId = webSocket.getRequestParameter("pageId");
			if (!pageId) {
				return;
			}
			webSocket.callJava({
				action : "closeDialog",
				async : false,
				pageId : pageId
			});
		}

	};

	return appEngine;
});
