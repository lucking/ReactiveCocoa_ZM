define(function(require) {
	var justep = require("$UI/system/lib/justep");
	var ViewComponent = require("$UI/system/lib/base/viewComponent");
	var url = require.normalizeName("./cordova");

	require('$UI/system/lib/cordova/cordova');

	var Cordova = ViewComponent.extend({
	});

	justep.Component.register(url, Cordova);
	return Cordova;
});
