/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {

	var Component = require("$UI/system/lib/base/component"), 
		Str = require("$UI/system/lib/base/string"),
		justep = require('$UI/system/lib/justep'),
		ViewComponent = require("$UI/system/lib/base/viewComponent"),
		url = require.normalizeName("./dialog");
	var ComponentConfig = require("./dialog.config");

	require("../lib/js/bootstrap");
	require('css!./css/dialog').load();
	
	var Dialog = ViewComponent.extend({
		getUrl : function() {
			return url;
		},
		// 构造函数
		constructor : function(options) {
			this.callParent(options);
		},
		// 动态创建组件
		buildTemplate : function(config) {
			//default value
			return Str.format("<div class='modal' xid='{0}' componet='{1}'></div>", config.xid);
		},
		
		getConfig: function(){
			return ComponentConfig; 
		},
		open: function(){
			this.$el.modal('show');
		},
		close: function(){
			this.$el.modal('hide');
		},
		toggle: function(){
			this.$el.modal('toggle');
		},
		init: function(value, bindingContext){
			this.callParent(value, bindingContext);
			this.$el = $(this.domNode);
			var me = this;
			this.$el.on("show.bs.modal", function(e){
				me.fireEvent("onShow", {source: me, bsEvent: e});
			});
			this.$el.on("hide.bs.modal", function(e){
				me.fireEvent("onHide", {source: me, bsEvent: e});
			});
		}
	});
	
	justep.Component.addOperations(Dialog, {
		open : {
			label : "",
			argsDef: [],
			method : function() {
				return this.owner.open();
			}
		},
		close : {
			label : "",
			argsDef: [],
			method : function() {
				return this.owner.close();
			}
		},
		toggle : {
			label : "",
			argsDef: [],
			method : function() {
				return this.owner.toggle();
			}
		}
	});
	
	Component.register(url, Dialog);
	return Dialog;
});
