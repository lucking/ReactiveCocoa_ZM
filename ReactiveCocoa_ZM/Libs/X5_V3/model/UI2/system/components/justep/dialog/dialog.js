/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	require("$UI/system/components/justep/common/res");
	require('css!./css/dialog').load();

	var $ = require("jquery");
	var History = require("$UI/system/lib/history/history");
	var justep = require("$UI/system/lib/justep");

	var url = require.normalizeName("./dialog");
	var ComponentConfig = require("./dialog.config");

	var Dialog = justep.BindComponent.extend({
		mixins : [ History ],
		getConfig : function() {
			return ComponentConfig;
		},
		constructor : function(options) {
			this.callParent(options);
			this.showTitle = false;
			this.title = '';
			this.status = 'maximize';
			this.opened = false;
			this.width = '80%';
			this.height = '80%';
			this.top = null;
			this.left = null;
		},
		dispose : function() {
			$(window).off('resize', this.__resizeHandle);
			this.callParent();
		},
		doInit : function(value, bindingContext) {
			History.prototype.constructor.apply(this, arguments);
			this.on('historyForward', function(event) {
				if (this.opened) {
					return true;
				} else {
					this.open();
					return false;
				}
			});
			this.on('historyBack', function(event) {
				if (this.opened) {
					this.close();
					return false;
				} else {
					return true;
				}
			});
			this.$domNode.find('.x-dialog-title:first > button.close').on('click',$.proxy(this.close, this));
			this.__resizeHandle = $.proxy(this.doResize, this);
			$(window).on('resize', this.__resizeHandle);
		},
		doResize : function() {
			if (this.opened) {
				this.render();
			}
		},
		buildTemplate : function(cfg) {
			if (!cfg)
				cfg = {};
			this.set(cfg);
			return $('<span component="' + url + '">' + '<div class="x-dialog-overlay">' + '</div>'
					+ '<div class="x-dialog" showTitle="' + !!cfg.showTitle + '">' + '<div class="x-dialog-title">' 
					+ '<button type="button" class="close"><span>×</span></button>' 
					+ '<h4 class="x-dialog-title-text">' + (cfg.title ? cfg.title : '')	+ '</h4>' 
					+ '</div>' + '<div class="x-dialog-body">' + (cfg.content ? cfg.content : '')
					+ '</div>' + '</div>' + '</span>');
		},
		propertyChangedHandler : function(key, oldVal, value) {
			switch (key) {
			case "showTitle":
				if(this._inited)
					this._getDialogNode()[value?'attr':'removeAttr']('showTitle','true');
				break;
			case "title":
				if (oldVal != value && this._inited) {
					this._getTitleTextNode().text(value);
				}
				break;
			case "status":
			case "width":
			case "height":
				if (oldVal != value) {
					this.needRender = this._inited;
				}
				break;
			default:
				this.callParent(key, oldVal, value);
			}
		},
		_getDialogNode : function() {
			return this.$domNode.find('div.x-dialog:first');
		},
		_getOverlayNode : function() {
			return this.$domNode.find('div.x-dialog-overlay:first');
		},
		_getTitleTextNode : function() {
			return this.$domNode.find('.x-dialog-title-text:first');
		},
		_getBodyNode : function() {
			return this.$domNode.find('.x-dialog-body:first');
		},
		close : function() {
			this._getDialogNode().removeClass('x-dialog-in').hide();
			this._getOverlayNode().removeClass('x-dialog-overlay-visible');
			// justep.Util.enableTouchMove(document.body);
			this.opened = false;
			this.fireEvent('onClose', {
				source : this
			});
		},
		setContent: function(content){
			this._getBodyNode().html(content);
		},
		render : function() {
			this.callParent();
			var $w = $(window);
			var fillCss = {
				height : $w.height(),
				width : $w.width()
			};
			var normalCss = {
				height : this.height,
				width : this.width
			};
			this._getOverlayNode().css(fillCss);
			var $dlg = this._getDialogNode();
			if(this.status === 'maximize')
				$dlg.css(fillCss).removeClass('x-dialog-normal');
			else
				$dlg.css(normalCss).addClass('x-dialog-normal');
			if(this.opened) this._setDialogTopLeft();
		},
		_setDialogTopLeft: function(){
			var $w = $(window);
			var $dlg = this._getDialogNode();
			var dlgH = $dlg.outerHeight(), winH = $w.height(), dlgW = $dlg.outerWidth(), winW = $w.width();
			var mTop = (this.top === null)?(dlgH>=winH?10:(winH-dlgH)/2):this.top;
			var mLeft = (this.left === null)?(dlgW>=winW?0:(winW-dlgW)/2):this.left;
			if(this.status === 'maximize'){
				mTop = 0;
				mLeft = 0;
			}
			$dlg.css({'top':mTop,'left':mLeft});
		},
		open : function() {
			// lzg 暂时屏蔽,影响较大
			// justep.Util.disableTouchMove(document.body);
			var $dlg = this._getDialogNode();
			this._getOverlayNode().addClass('x-dialog-overlay-visible');
			this.render();
			$dlg.show().addClass('x-dialog-in');
			this._setDialogTopLeft();//需要显示后才能计算出高度
			this.pushState({}, null, '#dialog');
			this.opened = true;
			this.fireEvent('onOpen', {
				source : this
			});
		}
	});

	justep.Component.register(url, Dialog);
	return Dialog;
});