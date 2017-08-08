define(function(require) {
	var ViewComponent = require("$UI/system/lib/base/viewComponent");
	var Expr = require('$UI/system/lib/base/express');
	var Object = require("$UI/system/lib/base/object");
	var String = require("$UI/system/lib/base/string");

	require('$UI/system/lib/cordova/cordova');

	var NativeComponent = ViewComponent.extend({

		/**
		 * 调用cordoava提供的接口
		 */
		exec : function(fn, operationName) {
			var operationCName = String.camelize(operationName);
			var dtd = $.Deferred();
			var self = this;
			var eventData = {
				"source" : this,
				"data" : this.getOptions(operationName),
				"cancel" : false
			};
			this.fireEvent("onBefore" + operationCName, eventData);
			var success = function(eventData) {
				self.fireEvent("onSuccess" + operationCName, eventData);
				dtd.resolve(eventData);
			};

			var error = function(eventData) {
				self.fireEvent("onError" + operationCName, eventData);
				dtd.reject(eventData);
			};
			if (!eventData.cancel) {
				this.watchID = fn(success, error, eventData.data);
			}
			return dtd.promise();
		},

		/**
		 * 获取所有属性(计算后的属性)
		 */
		getOptions : function(operationName) {
			var self = this;
			var config = $(this.domNode).data('config');
			return Object.map(config, function(value, key) {
				if (/\wExpr$/g.test(key)) {
					// ignore expr suffix
					key = key.replace('Expr', '');
					return Expr.eval(new Expr(value), self.getModel());
				} else {
					return value;
				}
			});
		}
	});

	return NativeComponent;
});
