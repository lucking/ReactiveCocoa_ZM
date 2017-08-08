/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	require("$UI/system/components/justep/common/res");
	require('css!./css/popOver').load();
	var Component = require("$UI/system/lib/base/component");
	var ViewComponent = require("$UI/system/lib/base/viewComponent");
	var url = require.normalizeName("./popOver");
	var ComponentConfig = require("./popOver.config");

	var PopOver = ViewComponent.extend({
		baseCls: 'x-popOver',
		overlayCls: 'x-popOver-overlay',
		contentCls: 'x-popOver-content',
		constructor: function(){
			this.position = 'center';
			this.anchor = null;
			this.direction = 'right-bottom';
			this.opacity = 0.5;
			this.dismissible = true;
			this.callParent();
		},
		getConfig: function(){
			return ComponentConfig;
		},
		buildTemplate: function(config){
			return null;
        },
        init: function(value, bindingContext){
			this.$el = $(this.domNode);
			this.$overlay = $('>.'+this.overlayCls, this.$el);
			this.$content = $('>.'+this.contentCls, this.$el);
			this.callParent(value, bindingContext);
			var me = this;
			this.$overlay.click(function(){
				if(me.dismissible){
					me.hide();
					return false;
				}
			});
			$(window).resize(function(){
				if(me.$el.is(':visible'))
					me.pos();
			});
		},
		show: function(){
			this.$el.show();
			this.pos();
		},
		hide: function(){
			this.$el.hide();
		},
		pos: function(){
			//清理样式
			this.$content.css({
				margin: 'auto',
				left: 'auto', 
				right: 'auto', 
				top: 'auto', 
				bottom: 'auto'
			});
			
			var anchor;
			try{
				anchor = this.getModel().comp(this.anchor).domNode;
			}catch(e){
				anchor = this.anchor;
			}	
			anchor = $(anchor);
			
			if(anchor.length > 0){
				var contentPos = this.direction || 'right-bottom';
				var pos = anchor.offset(),
					h = anchor.outerHeight(),
					w = anchor.outerWidth(),
					wh = $(window).height(),
					ww = $(window).width();
				switch(contentPos){
				case 'left-top':
					this.$content.css({
						bottom: wh - pos.top - h,
						left: pos.left
					});
					break;
				case 'left-bottom':
					this.$content.css({
						top: pos.top + h,
						left: pos.left
					});
					break;
				case 'right-top':
					this.$content.css({
						bottom: wh - pos.top - h,
						right: ww - pos.left - w
					});
					break;
				case 'right-bottom':
					this.$content.css({
						top: pos.top + h,
						right: ww - pos.left - w
					});
					break;
				}
				
				return;
			}
			
			var borderSize = 30;
			switch(this.position){
			case 'center':
				this.$content.css({
					'margin-left': -this.$content.width()/2,
					'margin-top': -this.$content.height()/2,
					top: '50%',
					left: '50%',
					right: 'auto',
					bottom: 'auto'
				});
				break;
			case 'bottom':
				this.$content.css({
					'margin-left': -this.$content.width()/2,
					top: 'auto',
					left: '50%',
					right: 'auto',
					bottom: borderSize
				});
				break;
			case 'left':
				this.$content.css({
					'margin-top': -this.$content.height() / 2,
					'margin-left': 0,
					top: '50%',
					left: borderSize,
					right: 'auto',
					bottom: 'auto'
				});
				break;
			case 'right':
				this.$content.css({
					'margin-top': -this.$content.height() / 2,
					'margin-left': 0,
					top: '50%',
					left: 'auto',
					right: borderSize,
					bottom: 'auto'
				});
				break;
			default:
				this.$content.css({
					'margin-left': -this.$content.width() / 2,
					top: borderSize,
					left: '50%',
					right: 'auto',
					bottom: 'auto'
				});
				break;
			}
		},
		propertyChangedHandler: function(key, oldVal, value){
			switch(key){
			case 'opacity':
				value = parseFloat(value);
				if(!isNaN(value)){
					if(value>=0 && value<=1){
						this.opacity = value;
						this.$overlay.css("opacity", value);
					}
				}
				break;
			case 'dismissible':
				if(typeof value == 'string')
					value = value == 'true';
				this.dismissible = value;
				break;
			default:
				this.callParent(key, oldVal, value);
			}
		}
    });
	
	justep.Component.addOperations(PopOver, {
		'show' : {
			label : '显示',
			icon : null,
			method : function(args) {
				return this.owner.show();
			}
		},
	'hide' : {
		label : '隐藏',
		icon : null,
		method : function(args) {
			return this.owner.hide();
		}
	}
	});
	Component.register(url, PopOver);
	return PopOver;
});