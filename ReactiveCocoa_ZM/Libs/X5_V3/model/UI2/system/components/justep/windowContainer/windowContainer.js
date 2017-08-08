/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
/**
 * 1. 声明形使用 <div component="$UI/system/components/justep/windowContainer/windowContainer" src=""
 * process="" activity=""/> 2. js动态创建 var WindowContainerClass =
 * require("$UI/system/components/justep/windowContainer/windowContainer"); var windowContainer = new
 * WindowContainerClass({parentNode: e, src:"",process:"",activity:""});
 */
define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var composition = require("$UI/system/lib/base/composition");
	var url = require.normalizeName("./windowContainer");
	var ComponentConfig = require("./windowContainer.config");

	var INNER_MODEL = "__inner-model__";

	var WindowContainer = justep.ViewComponent.extend({
		// 构造函数
		constructor : function(config) {
			this.__windowContainerInited = false;
			this.callParent(config);
			this.src = "";
			this.process = "";
			this.activity = "";
		},

		dispose : function() {
			this.callParent();
		},

		getConfig : function() {
			return ComponentConfig;
		},

		// 动态创建组件
		buildTemplate : function(config) {
			var e = $("<div component='" + url + "' __component-context__='block' />");
			if (config) {
				this.src = config.src;
				this.process = config.process;
				this.activity = config.activity;

				if (config.xid) {
					e.attr("xid", config.xid);
				}
			}
			return e;
		},

		// 组件初始化
		init : function(value, bindingContext) {
			this.__windowContainerInited = true;
			this.callParent(value, bindingContext);
			this.refresh();
		},

		setSrc : function(v) {
			this.set({
				src : v
			});
		},

		setProcess : function(v) {
			this.set({
				process : v
			});
		},

		setActivity : function(v) {
			this.set({
				activity : v
			});
		},

		refresh : function() {
			if(this.__windowContainerInited){
				var src = this.get("src");
				for ( var i = this.domNode.childNodes.length-1; i >= 0 ; i--) {
					justep.Bind.removeNode(this.domNode.childNodes[i]);
				}
				if (src) {
					var settings = {
						activate : true
					};
					settings.model = this._prepareSrc(src);
					settings.preserveContext = true;
					var self = this;
					settings.loadError = function(err){
						var evt = {source: self, err: err, cancel: false};
						self.fireEvent(WindowContainer.LOAD_ERROR_EVENT, evt);
						return evt.cancel; 
					};
					composition.compose(this.domNode, settings);
				}
			}
		},

		_prepareSrc : function(src) {
			if (src) {
				if ((src.indexOf("process=") == -1) && (src.indexOf("activity=") == -1)) {
					var process = this.get("process");
					var activity = this.get("activity");
					var ctx = this.getModel().getContext();
					if ((!process || !activity)
							&& ctx.getProcess && ctx.getActivity) {
						process = ctx.getProcess();
						activity = ctx.getActivity();
					}
					if (process && activity) {
						src += (src.indexOf("?") == -1) ? "?" : "&";
						src += "process=" + process + "&activity=" + activity;
					}
				}
			}

			return src;
		},

		getInnerModel : function() {
			return justep.Bind.utils.domData.get(this.domNode, INNER_MODEL);
		},

		loaded : function() {
			this.fireEvent(WindowContainer.LOAD_EVENT, {
				source : this
			});
		}
	});

	WindowContainer.LOAD_EVENT = "onLoad";
	WindowContainer.LOAD_ERROR_EVENT = "onLoadError";

	justep.Component.register(url, WindowContainer);
	return WindowContainer;
});