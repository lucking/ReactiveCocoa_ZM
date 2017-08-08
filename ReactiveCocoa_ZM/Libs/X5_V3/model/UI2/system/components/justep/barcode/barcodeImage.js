/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var justep = require('$UI/system/lib/justep');
	var url = require.normalizeName("$UI/system/components/justep/barcode/barcodeImage");
	var URL = require("$UI/system/lib/base/url");
	
	require('css!./css/barcodeImage').load();
	var BarcodeImage = justep.BindComponent.extend({
		// 构造函数
		constructor : function(options) {
			this.callParent(options);
			this.value = "";
			this.type = "code93";
			this.barcodeConfig = '{mw:0.6}';
			this.stretch = true;
		},
		// 动态创建组件
		buildTemplate : function(config) {
			if (!config)
				config = {};
			this.set(config);
			if ('string' == typeof (config['bind-ref']))
				config['bind-ref'] = config['bind-ref'].replace(/'/g, "&apos;");
			if (!config['class'])
				config['class'] = 'barcodeImage';
			return "<div class='"
					+ config['class'] + "' " + (config.style ? (" style='" + config.style + "' ") : "")
					+ (config.xid ? (" xid='" + config.xid + "' ") : "") + (config.type ? (" type='" + config.type + "' ") : "")
					+ (config.stretch ? (" stretch='" + config.stretch + "' ") : "")
					+ (config.barcodeConfig ? (" barcodeConfig='" + config.barcodeConfig + "' ") : "")
					+ (config['bind-ref'] ? (" __componentAttrs='ref:" + config['bind-ref'] + "'") : "") + " component='" + url + "' " + " >"
					+ "<img id='img" + config.xid + "' src='about:blank' style='vertical-align:middle;'/> " + "</div>";
		},
		onRefresh : function() {
			if (!this.value || this.value === "") {
				this.clear();
				return;
			}
			var type = this.$domNode.attr("type") ? this.$domNode.attr("type") : "{}";
			var config = this.$domNode.attr("barcodeConfig") ? this.$domNode.attr("barcodeConfig") : "{}";
			var src = new URL(require.toUrl("$UI/system/components/justep/barcode/server/genBarcode.j"));
			src.setParam("type", type);
			src.setParam("code", this.value);
			src.setParam("config", config);
			this.setImgSrc(src.toString());
			this.fireEvent('onRefresh', {
				'source' : this,
				'url' : src.toString()
			});
		},
		getContext : function() {
			return this.getModel().getContext();
		},
		setImgSrc : function(src) {
			var img = this._getImgNode();
			this.stretch = (this.$domNode.attr('stretch') == "false") ? false : this.stretch;
			if (!this.stretch) {
				img.attr('src', src);
			} else {
				img.css({
					height : '100%',
					width : '100%'
				});
				img.attr('src', src);
			}
			img.show();
		},
		_getImgNode : function() {
			return this.$domNode.children('img');
		},
		clear : function() {
			this._getImgNode().attr('src', 'about:blank').hide();
		},
		propertyChangedHandler : function(key, oldVal, value) {
			this.callParent(key, oldVal, value);
			this.needRender = true;
		},
		render : function() {
			this.callParent();
			this.onRefresh();
		}
	});
	justep.Component.register(url, BarcodeImage);
	return BarcodeImage;
});