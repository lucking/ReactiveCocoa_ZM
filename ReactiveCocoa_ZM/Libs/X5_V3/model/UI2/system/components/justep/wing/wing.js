/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	require('$UI/system/lib/jquery/transition');
	
	var Component = require("$UI/system/lib/base/component"),
		Object = require("$UI/system/lib/base/object"),
		justep = require('$UI/system/lib/justep'),
		Str = require("$UI/system/lib/base/string"),
		ViewComponent = require("$UI/system/lib/base/viewComponent"),
		$ = require("jquery"),
		url = require.normalizeName("./wing"),
		ComponentConfig = require("./wing.config"),
		WindowContainer = require("$UI/system/components/justep/windowContainer/windowContainer");
	
	require('$UI/system/lib/jquery/transition');
	require('css!./css/wing').load();
	
	
/* html
<div component="$model/UI2/system/components/justep/wing/wing" class="x-wing" xid="wing1">
  <div class="x-wing-left"> 
		//内容
  </div>  
  <div class="x-wing-content"> 
		//内容
  </div>  
  <div class="x-wing-right"> 
		//内容
  </div> 
</div>
*/
	
	var DEFAULT_SIZE = "300";

	var Wing = ViewComponent.extend({
		constructor: function(options){
			this.baseCls = 'x-wing';

			this.animate = true;
			this.display = 'overlay';
			this.onlyOne = this.display != 'overlay';
			this.dismissible = false;
			this.swipeClose = true;
			
			//内部状态
			this.leftOpened = false;
			this.rightOpened = false;
			
			this.leftWidth = DEFAULT_SIZE;
			this.rightWidth = DEFAULT_SIZE;			
			this.callParent(options);
		},
		getConfig: function(){
			return ComponentConfig;
		},
		buildTemplate: function(config){
			//default value
			config.content = config.content || {};

			config.left = config.left || {};
			config.left.size = config.left.size != undefined? config.left.size : DEFAULT_SIZE;  

			config.right = config.right || {};
			config.right.size = config.right.size != undefined? config.right.size : DEFAULT_SIZE;  
			
			return Str.format(
				"<div xid='{0}' class='{1}' component='{2}'>" +
					"<div class='x-wing-left' width='{3}'></div>" +
					"<div class='x-wing-content'></div>" +
					"<div class='x-wing-right' width='{4}'></div>" +
				"</div>", 
				config.xid, 
				this.baseCls, 
				url,
				config.left.size,
				config.right.size
			);
		},
		init: function(value, bindingContext){
			this.callParent(value, bindingContext);
			this.$el = $(this.domNode);
			if($(this.domNode).hasClass('x-wing-xs')){
				DEFAULT_SIZE = "200";
				this.leftWidth = DEFAULT_SIZE;
				this.rightWidth = DEFAULT_SIZE;
			}
			this.$left = $('>.x-wing-left', this.domNode);
			this.$content = $('>.x-wing-content', this.domNode);
			this.$right = $('>.x-wing-right', this.domNode);
			var me = this;
			this.getModel().componentPromise(this.$content[0]).done(function(component){
				me.inited();
			}).fail(function(err){
				alert(err);
			});
			if(this.animate){
				this.supportTouchSwip();
				this.supportTouchSwipHide();
			}
			this.$backdrop = this.display !== 'compress' && !justep.Browser.IE ? 
				$('>.x-wing-content>.x-wing-backdrop', this.domNode) : 
				$('>.x-wing-content>.x-wing-backdrop-none');
			this.$backdrop.on('click',function(){
			if(me.leftOpened || me.rightOpened){
				me.hideRight();
					me.hideLeft();
				}
			});
			return {dependence: true};
		},
		
		supportTouchSwip: function(){
			   // Touch events
			var isTouched = false,isMoved = false,isFirstMove = false,touchesStart = {},isScrolling,
					touchesDiff,touchStartTime,deltaX,deltaY,swipeActiveArea = 30,self = this,
					touchMoveDirection,isFromBorder = false;
			this.$content.on("touchstart",function (e) {
				if (isTouched || self.rightOpened || self.leftOpened) return;
				if(e instanceof $.Event){
					e = e.originalEvent;
				}
				isFirstMove = true;
				isMoved = false;
				isTouched = true;
				isFromBorder = false;
				isScrolling = undefined;
				touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
				touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
				touchStartTime = (new Date()).getTime();
				if(/Android /.test(window.navigator.appVersion) && !(/Chrome\/\d/.test(window.navigator.appVersion))){
					self.$left.hide();
					self.$right.hide();
					self.$content.hide();
					self.$left.show();
					self.$content.show();
					self.$right.show();
				}
			});

			this.$content.on("touchmove",function (e) {
				if(e instanceof $.Event){
					e = e.originalEvent;
				}
				if(e.hasStopedPropagation === true){
					return;
				}
				if (!isTouched || self.rightOpened || self.leftOpened || isScrolling) return;
				var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
				var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
				deltaX = Math.abs(pageX - touchesStart.x);
				deltaY = Math.abs(pageY - touchesStart.y);
				if (isFirstMove && (deltaX > deltaY)){
					isFirstMove = false;
					isMoved = true;
					if((pageX - touchesStart.x) > 0){
						touchMoveDirection = "right";
					}else{
						touchMoveDirection = "left";
					}
					isScrolling = false;
					if(touchMoveDirection === "right"){
						isFromBorder = touchesStart.x - self.$content.offset().left < swipeActiveArea;
					}else if(touchMoveDirection === "left"){
						isFromBorder = self.$content.width()  - touchesStart.x < swipeActiveArea;
					}
					if(isFromBorder){
						e.preventDefault();
						e.hasStopedPropagation = true;
					}else{
						isMoved = false;
						isScrolling = true;
						return;
					}
				}else if(isFirstMove){
					isFirstMove = false;
					isMoved = false;
					isScrolling = true;
					return;
				}
				
				if(isFromBorder && !isScrolling){
					e.preventDefault();
					e.hasStopedPropagation = true;
				}else{
					return;
				}
				
				
				var percentage = 0;
				if(touchMoveDirection === "right"){
					percentage = deltaX/self.leftWidth;
				}else if(touchMoveDirection === "left"){
					percentage = deltaX/self.rightWidth;
				}
				
				switch(self.display){
				case 'overlay':
					if(touchMoveDirection == "right" && self.$left.length > 0){
						self.$left.addClass('active');
						if(deltaX > self.leftWidth){
							self.$left.transform('translate3d(' + 0 + ',0,0)');
						}else{
							self.$left.transform('translate3d(' + (self.leftWidth*-1 + deltaX) + 'px,0,0)');
						}
					}else if(touchMoveDirection == "left" && self.$right.length > 0){
						self.$right.addClass('active');
						if(deltaX > self.rightWidth){
							self.$right.transform('translate3d(' + 0 + ',0,0)');
						}else{
							self.$right.transform('translate3d(' + (self.rightWidth - deltaX) + 'px,0,0)');
						}
					}
					break;
				case 'reveal':
					if(touchMoveDirection == "right" && self.$left.length > 0){
						self.$left.addClass('active');
						if(deltaX > self.leftWidth){
							self.$content.transform('translate3d(' + self.leftWidth + 'px,0,0)');
						}else{
							self.$content.transform('translate3d(' + deltaX + 'px,0,0)');
						}
					}else if(touchMoveDirection == "left" && self.$right.length > 0){
						self.$right.addClass('active');
						if(deltaX > self.rightWidth){
							self.$content.transform('translate3d(' + self.rightWidth*-1 + 'px,0,0)');
						}else{
							self.$content.transform('translate3d(' + deltaX*-1 + 'px,0,0)');
						}
					}
					break;
				case 'push':
					if(touchMoveDirection == "right" && self.$left.length > 0){
						if(deltaX > self.leftWidth){
							self.$content.transform('translate3d(' + self.leftWidth + 'px,0,0)');
							self.$left.transform('translate3d(' + 0 + ',0,0)');
						}else{
							self.$content.transform('translate3d(' + deltaX + 'px,0,0)');
							self.$left.transform('translate3d(' + (self.leftWidth*-1 + deltaX) + 'px,0,0)');
						}
					}else if(touchMoveDirection == "left" && self.$right.length > 0){
						if(deltaX > self.rightWidth){
							self.$content.transform('translate3d(' + self.rightWidth*-1 + 'px,0,0)');
							self.$right.transform('translate3d(' + 0 + ',0,0)');
						}else{
							self.$content.transform('translate3d(' + deltaX*-1 + 'px,0,0)');
							self.$right.transform('translate3d(' + (self.rightWidth - deltaX) + 'px,0,0)');
						}
					}
					break;
				}
				if((touchMoveDirection == "right" && self.$left.length > 0) || (touchMoveDirection == "left" && self.$right.length > 0)){
					self.$backdrop.show();
					self.$backdrop.css('opacity',0.2 * percentage);
				}
			});

			this.$content.on("touchcancel touchend",function (e) {
				if (!isTouched || !isMoved) {
					isFromBorder = false;
					isTouched = false;
					isMoved = false;
					return;
				}
				isTouched = false;
				isMoved = false;
				if (deltaX === 0) {
					self.$left.removeClass('active');
					self.$right.removeClass('active');
					self.$content.transform('').css({opacity: '', boxShadow: ''});
					return;
				}
				var timeDiff = (new Date()).getTime() - touchStartTime;
				if ((timeDiff < 300 && deltaX > 30 ||timeDiff >= 300 && deltaX > DEFAULT_SIZE / 2) && isFromBorder) {
					switch(self.display){
					case 'overlay':
						if(touchMoveDirection == "right" && self.$left.length > 0){
							self.leftOpened = true;
						}else if(touchMoveDirection == "left" && self.$right.length > 0){
							self.rightOpened = true;
						}
						break;
					case 'reveal':
						if(touchMoveDirection == "right" && self.$left.length > 0){
							self.$left.addClass('active');
							self.$content.addClass('on-right');
							self.leftOpened = true;
						}else if(touchMoveDirection == "left" && self.$right.length > 0){
							self.$right.addClass('active');
							self.$content.addClass('on-left');
							self.rightOpened = true;
						}
						break;
					case 'push':
						if(touchMoveDirection == "right" && self.$left.length > 0){
							self.$left.addClass('active');
							self.$content.addClass('on-right');
							self.leftOpened = true;
						}else if(touchMoveDirection == "left" && self.$right.length > 0){
							self.$right.addClass('active');
							self.$content.addClass('on-left');
							self.rightOpened = true;
						}
						break;
					}
					self.$content.transform('').css({opacity: '', boxShadow: ''});
					self.$left.transform('').css({opacity: '', boxShadow: ''});
					self.$right.transform('').css({opacity: '', boxShadow: ''});
				}else{
					self.$backdrop.hide();
					self.$left.removeClass('active');
					self.$right.removeClass('active');
					self.$content.transform('').css({opacity: '', boxShadow: ''});
					self.$left.transform('').css({opacity: '', boxShadow: ''});
					self.$right.transform('').css({opacity: '', boxShadow: ''});
				}
			});
		},
		supportTouchSwipHide: function(){
			   // Touch events
			var isTouched = false,isMoved = false,isFirstMove = false,touchesStart = {},isScrolling,
					touchesDiff,touchStartTime,deltaX,deltaY,swipeActiveArea = 30,self = this,
					touchMoveDirection;
			this.$el.on("touchstart",function (e) {
				if (isTouched || !(self.rightOpened || self.leftOpened)) return;
				if(e instanceof $.Event){
					e = e.originalEvent;
				}
				isFirstMove = true;
				isMoved = false;
				isTouched = true;
				isScrolling = undefined;
				touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
				touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
				touchStartTime = (new Date()).getTime();
			});

			this.$el.on("touchmove",function (e) {
				if(e instanceof $.Event){
					e = e.originalEvent;
				}
				if(e.hasStopedPropagation === true){
					return;
				}
				if (!isTouched || isScrolling || !(self.rightOpened || self.leftOpened)) return;
				var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
				var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
				deltaX = Math.abs(pageX - touchesStart.x);
				deltaY = Math.abs(pageY - touchesStart.y);
				if (isFirstMove && (deltaX > deltaY)){
					isFirstMove = false;
					isMoved = true;
					if((pageX - touchesStart.x) > 0){
						touchMoveDirection = "right";
					}else{
						touchMoveDirection = "left";
					}
					isScrolling = false;
					e.preventDefault();
					e.hasStopedPropagation = true;
				}else if(isFirstMove){
					isFirstMove = false;
					isMoved = false;
					isScrolling = true;
					return;
				}
				
				if(!isScrolling){
					e.preventDefault();
					e.hasStopedPropagation = true;
				}else{
					return;
				}
				
				
				var percentage = 0;
				if(touchMoveDirection === "right"){
					percentage = deltaX/self.leftWidth;
				}else if(touchMoveDirection === "left"){
					percentage = deltaX/self.rightWidth;
				}
				
				switch(self.display){
				case 'overlay':
					if(touchMoveDirection == "right" && self.rightOpened){
						if(deltaX > self.rightWidth){
							self.$right.transform('translate3d(' + self.rightWidth + 'px,0,0)');
						}else{
							self.$right.transform('translate3d(' + deltaX + 'px,0,0)');
						}
					}else if(touchMoveDirection == "left" && self.leftOpened){
						if(deltaX > self.leftWidth){
							self.$left.transform('translate3d(' + self.leftWidth*-1 + 'px,0,0)');
						}else{
							self.$left.transform('translate3d(' + deltaX*-1 + 'px,0,0)');
						}
					}
					break;
				case 'reveal':
					if(touchMoveDirection == "right" && self.rightOpened){
						if(deltaX > self.rightWidth){
							self.$content.transform('translate3d(0,0,0)');
						}else{
							self.$content.transform('translate3d(' + (self.rightWidth*-1+deltaX) + 'px,0,0)');
						}
					}else if(touchMoveDirection == "left" && self.$right.length > 0){
						if(deltaX > self.leftWidth){
							self.$content.transform('translate3d(0,0,0)');
						}else{
							self.$content.transform('translate3d(' + (self.rightWidth-deltaX) + 'px,0,0)');
						}
					}
					break;
				case 'push':
					if(touchMoveDirection == "right" && self.rightOpened){
						if(deltaX > self.rightWidth){
							self.$content.transform('translate3d(' + 0 + ',0,0)');
							self.$right.transform('translate3d(' + self.rightWidth + 'px,0,0)');
						}else{
							self.$content.transform('translate3d(' + (self.rightWidth*-1+deltaX) + 'px,0,0)');
							self.$right.transform('translate3d(' + deltaX + 'px,0,0)');
						}
					}else if(touchMoveDirection == "left" && self.leftOpened){
						if(deltaX > self.leftWidth){
							self.$content.transform('translate3d(0,0,0)');
							self.$left.transform('translate3d(' + self.leftWidth*-1 + 'px,0,0)');
						}else{
							self.$content.transform('translate3d(' + (self.leftWidth-deltaX) + 'px,0,0)');
							self.$left.transform('translate3d(' + deltaX*-1 + 'px,0,0)');
						}
					}
					break;
				}
				if((touchMoveDirection == "right" && self.rightOpened) || (touchMoveDirection == "left" && self.leftOpened)){
					self.$backdrop.css('opacity',0.2 - 0.2 * percentage);
				}
			});

			this.$el.on("touchcancel touchend",function (e) {
				if (!isTouched || !isMoved) {
					isTouched = false;
					isMoved = false;
					return;
				}
				isTouched = false;
				isMoved = false;
				if (deltaX === 0) {
					return;
				}
				var timeDiff = (new Date()).getTime() - touchStartTime;
				if (timeDiff < 300 && deltaX > 30 ||timeDiff >= 300 && deltaX > DEFAULT_SIZE / 2) {
					if(touchMoveDirection == "right" && self.rightOpened){
						self.$right.removeClass('active');
						self.$content.removeClass('on-left');
						self.rightOpened = false;
					}else if(touchMoveDirection == "left" && self.leftOpened){
						self.$left.removeClass('active');
						self.$content.removeClass('on-right');
						self.leftOpened = false;
					}
					self.$backdrop.fadeOut();
					self.$content.transform('').css({opacity: '', boxShadow: ''});
					self.$left.transform('').css({opacity: '', boxShadow: ''});
					self.$right.transform('').css({opacity: '', boxShadow: ''});
				}else{
					self.$backdrop.css('opacity','');
					self.$content.transform('').css({opacity: '', boxShadow: ''});
					self.$left.transform('').css({opacity: '', boxShadow: ''});
					self.$right.transform('').css({opacity: '', boxShadow: ''});
				}
			});
		},
		/**
		 * 设置上下区域的高度
		 * @method setHeight 
		 * @param {String} name 'left' or 'right'
		 * @param {Integer} value
		 */
		setSize: function(name, value){
			$('>.x-wing-' + name, this.$domNode).css('size', size(value));
		},
		/**
		 * 获取上下区域的高度
		 * @method getHeight
		 * @param {String} name
		 * @returns {Integer}
		 */
		getSize: function(name){
			return $('>.x-wing-' + name, this.$domNode).css('size');
		},
		/**
		 * 显示左边区域
		 * @method showLeft
		 */
		showLeft: function(fn){
			if(this.leftOpened) return;
			var animate = $.support.transition && !justep.Browser.IE; //TODO
			if(this.onlyOne && this.rightOpened)
				this.hideRight(this.showLeft);
			else{
				switch(this.display){
				case 'overlay':
					var me = this;
					this.$left.addClass('opening');
					this.$backdrop.fadeIn();
					var after = function(){
						me.$left.addClass('active');
						me.$left.removeClass('opening');
						me.leftOpened = true;
						fn && fn.call(me);
					}
					if(false)
						this.$left.animationEnd(after);
					else
						after();
					break;
				case 'reveal':
					var me = this;
					this.$content.addClass('to-right');
					this.$left.addClass('active');
					this.$backdrop.fadeIn();
					this.$content.animationEnd(function(){
						me.$content.addClass('on-right');
						me.$content.removeClass('to-right');
						me.leftOpened = true;
						fn && fn.call(me);
					});
					break;
				case 'push':
					var me = this;
					this.$left.addClass('opening');
					this.$left.addClass('active');
					this.$content.addClass('to-right');
					this.$backdrop.fadeIn();
					this.$left.animationEnd(function(){
						me.$content.addClass('on-right');
						me.$content.removeClass('to-right');
						me.$left.removeClass('opening');
						me.leftOpened = true;
						fn && fn.call(me);
					});
					break;
				case 'compress':
					var me = this;
					this.$left.addClass('opening');
					this.$left.addClass('active');
					this.$content.addClass('compress-to-right');
					this.$backdrop.fadeIn();
					this.$left.animationEnd(function(){
						me.$content.addClass('compress-on-right');
						me.$content.removeClass('compress-to-right');
						me.$left.removeClass('opening');
						me.leftOpened = true;
						fn && fn.call(me);
					});
					break;
				}
			}	
		},
		/**
		 * 隐藏左边区域
		 * @method showLeft
		 */
		hideLeft: function(fn){
			if(!this.leftOpened){
				fn && fn.call(this);
				return;
			}
			var animate = $.support.transition && !justep.Browser.IE; //TODO
			switch(this.display){
			case 'overlay':
				var me = this;
				this.$left.addClass('closing');
				this.$backdrop.fadeOut();
				var after = function(){
					me.$left.removeClass('closing');
					me.$left.removeClass('active');
					me._androidBugFix();
					me.leftOpened = false;
					fn && fn.call(me);
				};
				if(animate)
					this.$left.animationEnd(after);
				else
					after();
				break;
			case 'reveal':
				var me = this;
				this.$content.addClass('from-right-to-center');
				this.$content.removeClass('on-right');
				this.$backdrop.fadeOut();
				this.$content.animationEnd(function(){
					me.$left.removeClass('active');
					me.$content.removeClass('from-right-to-center');
					me._androidBugFix();
					me.leftOpened = false;
					fn && fn.call(me);
				});
				break;
			case 'push':
				var me = this;
				this.$content.addClass('from-right-to-center');
				this.$content.removeClass('on-right');
				this.$left.addClass('closing');
				this.$backdrop.fadeOut();
				this.$content.animationEnd(function(){
					me.$left.removeClass('closing');
					me.$left.removeClass('active');
					me.$content.removeClass('from-right-to-center');
					me._androidBugFix();
					me.leftOpened = false;
					fn && fn.call(me);
				});
				break;
			case 'compress':
				var me = this;
				this.$content.addClass('uncompress-from-left');
				this.$content.removeClass('compress-on-right');
				this.$left.addClass('closing');
				this.$backdrop.fadeOut();
				this.$content.animationEnd(function(){
					me.$left.removeClass('closing');
					me.$left.removeClass('active');
					me.$content.removeClass('uncompress-from-left');
					me._androidBugFix();
					me.leftOpened = false;
					fn && fn.call(me);
				});
				break;
			}
			
			
		},
		_androidBugFix: function(){
			/**
			 *  https://code.google.com/p/android/issues/detail?id=19827 
			 */
			if(/Android /.test(window.navigator.appVersion)){
				this.$el.get(0).style.overflow = "auto";
				this.$el.offset();
				this.$el.get(0).style.overflow = "hidden";
			}
		},
		/**
		 * 切换左边区域显示或隐藏
		 * @method showLeft
		 */
		toggleLeft: function(){
			if(this.leftOpened)
				this.hideLeft();
			else
				this.showLeft();
		},
		/**
		 * 显示右边区域
		 * @method showRight
		 */
		showRight: function(fn){
			if(this.rightOpened) return;
			var animate = $.support.transition && !justep.Browser.IE; //TODO
			if(this.onlyOne && this.leftOpened)
				this.hideLeft(this.showRight);
			else{
				var me = this;
				switch(this.display){
				case 'overlay':
					var me = this;
					this.$right.addClass('opening');
					this.$backdrop.fadeIn();
					var after = function(){
						me.$right.addClass('active');
						me.$right.removeClass('opening');
						me.rightOpened = true;
						fn && fn.call(me);
					};
					if(animate)
						this.$right.animationEnd(after);
					else
						after();
					break;
				case 'reveal':
					var me = this;
					this.$content.addClass('to-left');
					this.$right.addClass('active');
					this.$backdrop.fadeIn();
					this.$content.animationEnd(function(){
						me.$content.removeClass('to-left');
						me.$content.addClass('on-left');
						me.rightOpened = true;
						fn && fn.call(me);
					});
					break;
				case 'push':
					var me = this;
					this.$right.addClass('opening');
					this.$right.addClass('active');
					this.$content.addClass('to-left');
					this.$backdrop.fadeIn();
					this.$right.animationEnd(function(){
						me.$content.removeClass('to-left');
						me.$content.addClass('on-left');
						me.$right.removeClass('opening');
						me.rightOpened = true;
						fn && fn.call(me);
					});
					break;
				}
			}
		},
		/**
		 * 隐藏右边区域
		 * @method hideRight
		 */
		hideRight: function(fn){
			if(!this.rightOpened){
				fn && fn.call(this);
				return;
			}
			var animate = $.support.transition && !justep.Browser.IE; //TODO
			var me = this;
			this.rightOpened = false;

			switch(this.display){
			case 'overlay':
				var me = this;
				this.$right.addClass('closing');
				this.$backdrop.fadeOut();
				var after = function(){
					me.$right.removeClass('closing');
					me.$right.removeClass('active');
					me._androidBugFix();
					fn && fn.call(me);
				};
				if(animate)
					this.$right.animationEnd(after);
				else
					after();
				break;
			case 'reveal':
				var me = this;
				this.$content.addClass('from-left-to-center');
				this.$content.removeClass('on-left');
				this.$backdrop.fadeOut();
				this.$content.animationEnd(function(){
					me.$right.removeClass('active');
					me.$content.removeClass('from-left-to-center');
					me._androidBugFix();
					fn && fn.call(me);
				});
				break;
			case 'push':
				var me = this;
				this.$right.addClass('closing');
				this.$content.addClass('from-left-to-center');
				this.$content.removeClass('on-left');
				this.$backdrop.fadeOut();
				this.$content.animationEnd(function(){
					me.$content.removeClass('from-left-to-center');
					me.$right.removeClass('closing');
					me.$right.removeClass('active');
					me._androidBugFix();
					fn && fn.call(me);
				});
				break;
			}
		},
		/**
		 * 切换下边区域显示或隐藏
		 * @method showRight
		 */
		toggleRight: function(){
			$('>.x-wing-right', this.$domNode).toggleClass('hide');
		},
		/**
		 * 获取区域对象
		 * @method getPanl
		 * @param {String} name 'left' or 'right'
		 * @return {Wing} 
		 */
		get: function(name){
			return this[name];
		},
		/**
		 * 删除特定区域
		 */
		remove: function(name){
			$('.x-wing-' + name, this.$el).remove();
		},
		show: function(name){
			switch(name){
			case 'content':
				if(this.leftOpened){
					this.hideLeft();
				}
				if(this.rightOpened){
					this.hideRight();
				}
				break;
			case 'left':
				if(!this.leftOpened){
					this.showLeft();
				}
				break;
			case 'right':
				if(!this.rightOpened){
					this.showRight();
				}
			}
		},
		hide: function(name){
			switch(name){
			case 'left':
				if(this.leftOpened){
					this.hideLeft();
				}
				break;
			case 'right':
				if(this.rightOpened){
					this.hideRight();
				}
			}
		},
		setDisplay: function(value){
			this.display = value;
			$(this.domNode).attr('display', value);
			this.onlyOne = this.display != 'overlay';
			if(this.display == 'reveal'){
				
			}
		},
		setDismissible: function(value){
			//TODO: 直接接管click会导致打开和这里冲突
			return;
			var me = this;
			if(value){
				$('>.x-wing-content', this.domNode).click(function(){
					me.show('content');
				});
			}
		},
		propertyChangedHandler : function(key, oldVal, value) {
			switch(key){
			case 'display':
				this.setDisplay(value);
				break;
			case 'dismissible':
				this.setDismissible(value);
				break;
			default:
				this.callParent(key, oldVal, value);
			}
		},
		loadLeftContent: function(url){
			this.leftCompose = new WindowContainer({parentNode: this.$left.get(0), src: url}); 
		}
	});
	
	justep.Component.addOperations(Wing, {
		toggleLeft : {
			label : "",
			method : function(args) {
				return this.owner.toggleLeft();
			}
		},
		toggleRight : {
			label : "",
			method : function(args) {
				return this.owner.toggleRight();
			}
		}
	});
	
	Component.register(url, Wing);

	return Wing;
});