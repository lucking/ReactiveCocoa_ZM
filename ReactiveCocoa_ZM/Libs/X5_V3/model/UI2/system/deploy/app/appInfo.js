define(function(require) {
	var $ = require("jquery");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");

	var Model = function() {
		this.callParent();
		
	};

	Model.prototype.modelLoad = function(event) {
		this.callParent();
		
		this.comp("startAppWiz").val(this.getParent().edit);
	};
	
	Model.prototype._openAppWiz = function(wizard) {
		var href = window.location.href;
		var url = href.substring(href.indexOf("?") + 1);
		var params = url.split("&");
		for ( var i = 0; i < params.length; i++) {
			if (params[i].indexOf('targetPath=') === 0) {
				params[i] = 'targetPath=' + this.getParent().nativePath + '/' + this.appEngine.getConfig().appName;
				break;
			}
		}
		window.location.href = "../package/index.w?" + params.join('&');
	}

	Model.prototype.finish = function(wizard) {
		if (this.comp("startAppWiz").get("checked") === true) {
			this.appEngine.build();
			this._openAppWiz();
			return false;
		} else {
			return true;
		}
	};

	return Model;
});
