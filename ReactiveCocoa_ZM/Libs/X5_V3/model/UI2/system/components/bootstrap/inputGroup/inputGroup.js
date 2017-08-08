define(function(require){
	var Component = require("$UI/system/lib/base/component");
	var ViewComponent = require("$UI/system/lib/base/viewComponent");
	var url = require.normalizeName("./inputGroup");
     
	Component.register(url, ViewComponent);
	return ViewComponent;
});