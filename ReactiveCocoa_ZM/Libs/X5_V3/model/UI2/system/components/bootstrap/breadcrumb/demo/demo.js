define(function(require) {
	var justep = require("$UI/system/lib/justep");

	var Model = function() {
		this.callParent();
		this.label = justep.Bind.observable("水果");
		this.value = justep.Bind.observable("1");
		this.isNavigator = justep.Bind.observable(false);
	};

	Model.prototype.button1Click = function(event) {
		this.comp('breadcrumb').push({
			label : this.label.get(),
			value : this.value.get()
		});
	};

	Model.prototype.button2Click = function(event) {
		var data = this.comp('breadcrumb').pop();
		alert('label:' + data.label + ',value:' + data.value);
	};

	Model.prototype.breadcrumbClick = function(event) {
		if (!this.isNavigator.get())
			event.source.popTo(event.data);
	};

	Model.prototype.closeWin = function(event) {
		justep.Portal.closeWindow();
	};

	return Model;
});
