define(function(require) {
	var justep = require("$UI/system/lib/justep");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.backBtnClick = function() {
		justep.Portal.closeWindow();
	};

	Model.prototype.test1Click = function(event) {
		function alertDismissed() {
			// do something
		}

		navigator.notification.alert('You are the winner!', // message
		alertDismissed, // callback
		'Game Over', // title
		'Done' // buttonName
		);

	};

	return Model;
});