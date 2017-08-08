/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	require("$UI/system/components/justep/common/res");

	var justep = require("$UI/system/lib/justep");
	var Bind = justep.Bind;

	var url = require.normalizeName("./output");
	var ComponentConfig = require("./output.config");

	var Output = justep.BindComponent.extend({
		getConfig : function() {
			return ComponentConfig;
		},
		// 构造函数
		constructor : function(options) {
			this.callParent(options);
			this.value = "";
			this.format = "";
			this.dataType = "String";
		},

		dispose : function() {
			this.callParent();
		},

		// 动态创建组件
		buildTemplate : function(config) {
			if (!config)
				config = {};
			this.set(config);
			if (!config['class'])
				config['class'] = 'x-output';
			return "<div class='" + config['class'] + "' " + (config.style ? (" style='" + config.style + "'") : "")
					+ (config.xid ? (" xid='" + config.xid + "'") : "") + " component='" + url + "'" + " ></div>";
		},

		// 初始化
		doInit : function(value, bindingContext) {
			if (Bind.isObservable(this.ref) && this.ref['define']) {
				var t = this.ref['define'].defCol.type;
				if (t !== this.dataType)
					this.dataType = t;
			}

			if (this.dataType == 'DateTime' || this.dataType == 'Date' || this.dataType == 'Time') {
				if (!this.format) {
					if ('DateTime' == this.dataType)
						this.format = "yyyy-MM-dd hh:mm:ss";
					else if ('Date' == this.dataType)
						this.format = "yyyy-MM-dd";
					else if ('Time' == this.dataType)
						this.format = "hh:mm:ss";
				}
			}
		},
		render : function() {
			this.callParent();
			if (Bind.isObservable(this.ref) && this.ref['define']) {
				var t = this.ref['define'].defCol.type;
				if (t !== this.dataType)
					this.dataType = t;
			}
			var val = this.value;
			var d;
			if (val) {
				if ('DateTime' == this.dataType) {
					d = val instanceof Date ? val : justep.Date.fromString(val, justep.Date.STANDART_FORMAT);
					val = justep.Date.toString(d, this.format);
				} else if ('Date' == this.dataType) {
					d = val instanceof Date ? val : justep.Date.fromString(val, justep.Date.STANDART_FORMAT_SHOT);
					val = justep.Date.toString(d, this.format);
				} else if ('Time' == this.dataType) {
					d = val instanceof Date ? val : justep.Date.fromString(val, "hh:mm:ss");
					val = justep.Date.toString(d, this.format);
				}
			}
			if (val === undefined || val === null)
				val = '';
			var eData = {
				source : this,
				value : this.value,
				html : val
			};
			this.fireEvent('onRender', eData);
			this.$domNode.html(eData.html);
		},
		propertyChangedHandler : function(key, oldVal, value) {
			switch (key) {
			case "format":
				if (!this.format) {
					if ('DateTime' == this.dataType)
						this.format = "yyyy-MM-dd hh:mm:ss";
					else if ('Date' == this.dataType)
						this.format = "yyyy-MM-dd";
					else if ('Time' == this.dataType)
						this.format = "hh:mm:ss";
				}
				if (oldVal != value)
					this.needRender = true;
				break;
			case "value":
				if (oldVal != value) {
					if (this._inited) {
						this.fireEvent('onChange', {
							source : this,
							originalValue : oldVal,
							value : value
						});
					}
					this.needRender = true;
				}
				break;
			default:
				this.callParent(key, oldVal, value);
			}
		}
	});

	justep.Component.register(url, Output);
	return Output;
});