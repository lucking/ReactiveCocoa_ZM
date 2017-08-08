define(function(require) {
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var WindowContainer = require("$UI/system/components/justep/windowContainer/windowContainer");
	var $ = require("jquery");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.okBtnClick = function(event) {
		var result = {};
		if (this.currentCompose) {
			var innerModel = this.currentCompose.getInnerModel();
			if (innerModel && innerModel.beforeOkAction) {
				var msg = innerModel.beforeOkAction();
				if (msg) {
					alert(msg);
					return;
				}
			}
			if (innerModel && innerModel.getReturnValue) {
				result.returnValue = innerModel.getReturnValue();
			}
		}
		xuiService.pageOkAction(result);
	};

	Model.prototype.cancelBtnClick = function(event) {
		xuiService.pageCloseAction();
	};

	Model.prototype.refreshBtnClick = function(event) {
		window.location.reload();
	};

	Model.prototype.modelLoad = function(event) {
		var parentNode = $(this.getElementByXid("composeParent"));
		parentNode.css({overflow:"auto",height:document.body.clientHeight-64});
		$(window).bind("resize",function(){
			parentNode.css({overflow:"auto",height:document.body.clientHeight-64});
		});
		var targetUrl = this.getContext().getRequestParameter("targetUrl");
		this.currentCompose = this.createCompose(targetUrl);
	};

	Model.prototype.createCompose = function(src) {
		var src = require.toUrl(src);
		var compose = new WindowContainer({
			parentNode : this.getElementByXid("composeParent"),
			src : src
		});
		$(compose.domNode).addClass('compose');
		return compose;
	};
	return Model;
});
