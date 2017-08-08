/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	require('$UI/system/lib/jquery/transition');
	
	var History = require("$UI/system/lib/history/history"),
		Component = require("$UI/system/lib/base/component"),
		justep = require('$UI/system/lib/justep'),
		Str = require("$UI/system/lib/base/string"),
		ViewComponent = require("$UI/system/lib/base/viewComponent"),
		$ = require("jquery"),
		url = require.normalizeName("./contents"),
		Content = require("./content");
	var ComponentConfig = require("./contents.config");
	
	require("$UI/system/components/justep/common/res");
	require("css!./css/contents").load();

/* html

<div component="$model/UI2/system/components/justep/contents/contents" class="slide-panel" 
	xid="pages" active="0" slidable="true"> 
	<div class="panel active" xid="pages-content1">
		//内容
	</div>	
	<div class="panel" xid="pages-content2"> 
		//内容
	</div>	
	<div class="panel" xid="pages-content3"> 
		//内容
	</div> 
</div>

*/
	
/*
 * 主要class名称
 * slide-panel panel active left right next prev
 */	
	
	var baseCls = 'x-contents';

	var Contents = ViewComponent.extend({
		mixins:[History],
		
		getConfig : function(){
			return ComponentConfig;
		},
		
		/**
		 * @event onActiveChange
		 * @source {SlidePanel}
		 * @param {Integer} from
		 * @param {integer} to
		 * @type {String} 'prev' 'next'
		 */
		constructor: function(options){
			/**
			 * 当前panel的索引
			 * @property active
			 * @type {Integer}
			 */
			this.active = 0;
			this.contents = [];
			/**
			 * 是否可循环切换
			 * @property wrap
			 * @type {Boolean}
			 */
			this.wrap = true;
			/**
			 * 是否支持手势
			 * @property swipe
			 * @type {Boolean}
			 */
			this.swipe = true;
			/**
			 * 是否采用滑动动画
			 * @property slidable
			 * @type {Boolean}
			 */
			this.slidable = true;
			
			this.callParent(options);
			
		},
		buildTemplate: function(config){
			//default value
			config.slidable = config.slidable !== undefined? config.slidable : true;
			config.wrap = config.wrap !== undefined? config.wrap : true;
			config.swipe = config.swipe !== undefined? config.swipe : true;
			
			var panels = '';	

			return Str.format(
					"<div xid='{0}' class='{1}' component='{2}'>{3}</div>", 
					config.xid, baseCls, url, panels);
		},
		init: function(value, bindingContext){
			this.callParent(value, bindingContext);
			History.prototype.constructor.apply(this, arguments);
			var me = this;
			this.$el = $(this.domNode);

			var m = this.getModel(),
				xids = [],
				promises = []; 
			$('>.x-contents-content', this.$el).each(function(){
				xids.push($(this).attr('xid'));
			});
			justep.Array.each(xids, function(xid){
				promises.push(m.componentPromise(xid));
			});
			$.when.apply($, promises).done(function(){
				me.to(me.active);
				me._inited = true;
			});
			
			this.on('historyForward',function(event){
				var index = this.getActiveIndex();
				if(index == -1){
					return true;
				}else{
					if(this.to(index+1)){
						return false;
					}else{
						return true;
					}
				}
			});
			this.on('historyBack',function(event){
				var index = this.getActiveIndex();
				if(index == -1){
					return true;
				}else{
					if(location.hash === ""){
						this.to(0);
						return false;
					}
					if(this.to(index-1)){
						return false;
					}else{
						return true;
					}
				}
			});
			if(this.swipe){
				this.supportContentsTouchMove();
			}
		},
		/**
		 * 是否支持手势滑动
		 * @method canSwipe
		 * @param {String} 滑动的方向, prev, next
		 * @return {Boolean} 
		 */
		canSwipe: function(type){
			var swipe = this.swipe;
			if(swipe && (typeof this.swipe == 'string'))
				swipe = this.swipe == type;
			return swipe; 
		},
		/**
		 * 支持content的跟手滚动
		 */
		supportContentsTouchMove :function(){
				var isMoved = false,touchesStart = {},isScrolling,deltaX,deltaY,touchesDiff,touchStartTime,
					contentsWidth,$active,$left,$right,self=this,isFirstMove=true,
					swipeActiveArea = 30,isFromBorder = false,
					activeIndex,leftIndex,rightIndex;
				this.$el.on('touchstart',function(e){
					contentsWidth = self.$el.width();
				if(e instanceof $.Event){
					e = e.originalEvent;
				}
				isMoved = false;
				isScrolling = false;
				isFirstMove = true;
				touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
				touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
				touchStartTime = (new Date()).getTime();
				$active = self.$el.find('>.x-contents-content.active');
				activeIndex = self.getActiveIndex();
				leftIndex = activeIndex - 1;
				rightIndex = activeIndex + 1;
				var $contents = self.$el.find('>.x-contents-content');
					$left = $($contents[activeIndex-1]);
					$right = $($contents[activeIndex+1]);
					if(self.wrap && $contents.length > 1){
						if($left.length === 0){
							$left = $contents.last();
							leftIndex = $contents.length-1;
						}
						if($right.length === 0){
							$right = $contents.first();
							rightIndex = 0;
						}
					}
					isFromBorder = false;
					isFromBorder = ((touchesStart.x - self.$domNode.offset().left) < swipeActiveArea);
					if(!isFromBorder){
						isFromBorder = self.$domNode.width()	- touchesStart.x < swipeActiveArea;
					}
				});
				
				this.$el.on('touchmove',function(e){
				if(e instanceof $.Event){
					e = e.originalEvent;
				}
				if(e.target && "INPUT" == e.target.tagName && e.target.getAttribute('type') == "range"){
					isScrolling = true;
				}
				if(isScrolling === true || isFromBorder === true ){
					if(isScrolling === true){
						e.hasStopedPropagation = true;
					}
					return;
				}
				
				if(e.hasStopedPropagation === true){
					return;
				}
				var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
				var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
				
				deltaX = Math.abs(pageX - touchesStart.x);
				deltaY = Math.abs(pageY - touchesStart.y);
				touchesDiff = pageX - touchesStart.x;
				if (isFirstMove && (deltaX > deltaY)){
					var $scrollH = $active.find('.x-scroll-h');
					if($active.hasClass('x-scroll-h')){
						$scrollH = $active;
					}
					if($scrollH.length === 0){
						e.preventDefault();
						e.hasStopedPropagation = true;
						isMoved = true;
						isScrolling = false;
					}else{
						var offsetWidth = $scrollH.get(0).offsetWidth;
						var scrollWidth = $scrollH.get(0).scrollWidth;
						var scrollLeft = $scrollH.get(0).scrollLeft;
						if(touchesDiff > 0){
							if(scrollLeft === 0 && offsetWidth < scrollWidth){
								e.preventDefault();
								e.hasStopedPropagation = true;
								isMoved = true;
								isScrolling = false;
							}else{
								isMoved = false;
								isScrolling = true;
								return;
							}
						}else{
							if(scrollLeft + offsetWidth == scrollWidth){
								e.preventDefault();
								e.hasStopedPropagation = true;
								isMoved = true;
								isScrolling = false;
							}else{
								e.hasStopedPropagation = true;
								isMoved = false;
								isScrolling = true;
								return;
							}
						}
					}
				}else if(isFirstMove){
					isMoved = false;
					isScrolling = true;
					return;
				}else{
					if(!isFirstMove && !isScrolling){
						e.preventDefault();
						e.hasStopedPropagation = true;
					}else if(!isFirstMove && isScrolling && (deltaX > deltaY)){
						e.hasStopedPropagation = true;
					}
				}
				
				var percentageNum = touchesDiff / contentsWidth;
				var percentage = (percentageNum * 100) + "%";
				
				var leftPercentage = ((-1+percentageNum) * 100) + "%";
				var rightPercentage = ((1+percentageNum) * 100) + "%";
				if(touchesDiff > 0 && $left.length > 0){
					$active.transform('translate3d(' + percentage + ',0,0)');
					$active.css('opacity',1 - 0.5 * Math.abs(percentageNum));
					$left.addClass('x-content-on-left').removeClass('x-content-on-right');
					$left.transform('translate3d(' + leftPercentage + ',0,0)');
					$left.css('opacity',0.5 + 0.5 * Math.abs(percentageNum));
				}else if(touchesDiff < 0 && $right.length > 0){
					$active.transform('translate3d(' + percentage + ',0,0)');
					$active.css('opacity',1 - 0.5 * Math.abs(percentageNum));
					$right.addClass('x-content-on-right').removeClass('x-content-on-left');
					$right.transform('translate3d(' + rightPercentage + ',0,0)');
					$right.css('opacity',0.5 + 0.5 * Math.abs(percentageNum));
				}else{
					//最后一屏 或者第一屏
					percentage = (percentageNum * 50) + "%";
					$active.transform('translate3d(' + percentage + ',0,0)');
				}
			});

			
			this.$el.on('touchend',function(e){
				if (isScrolling || !isMoved) {
					isMoved = false;
					isScrolling = false; 
					
					$active.transform('').css({opacity: '1'});
					$left.transform('').css({opacity: ''});
					$right.transform('').css({opacity: ''});
					return;
				}
				isMoved = false;
				isScrolling = false;
				if(e instanceof $.Event){
					e = e.originalEvent;
				}
				var timeDiff = (new Date()).getTime() - touchStartTime;
				if ((timeDiff < 300 && Math.abs(touchesDiff) > 10) || (timeDiff >= 300 && Math.abs(touchesDiff) > contentsWidth / 2)) {
					var duration = Math.abs(touchesDiff / contentsWidth *100);
					//var duration = 400;
					if(touchesDiff > 0 && $left.length > 0){
						$active.transitionEnd(function () {
							$active.transition(0);
							$left.transition(0);
							$active.addClass('x-content-on-right').removeClass('active');
							$left.addClass('active').removeClass('x-content-on-left');
							$active.transform('');
							$left.transform('');
							self.contents[leftIndex].fireEvent('onActive', {source : self, index: leftIndex});
							self.getModel().fireEvent('reflow', $left.get(0));
						});
						self.fireEvent('onActiveChange', {source : self, to: leftIndex, from: activeIndex, type: "next"});
						self.contents[activeIndex].fireEvent('onInactive', {source : self, index: activeIndex});
						$active.transition(duration);
						$left.transition(duration);
						
						$left.transform('translate3d(0,0,0)');
						$left.css('opacity','1');
						$active.transform('translate3d(100%,0,0)');
						return ;
					}else if(touchesDiff < 0 && $right.length > 0){
						$active.transitionEnd(function () {
							$active.transition(0);
							$right.transition(0);
							$active.addClass('x-content-on-left').removeClass('active');
							$right.addClass('active').removeClass('x-content-on-right');
							$active.transform('');
							$right.transform('');
							self.contents[rightIndex].fireEvent('onActive', {source : self, index: rightIndex});
							self.getModel().fireEvent('reflow', $right.get(0));
						});
						self.fireEvent('onActiveChange', {source : self, to: rightIndex, from: activeIndex, type: "next"});
						self.contents[activeIndex].fireEvent('onInactive', {source : self, index: activeIndex});
						$active.transition(duration);
						$right.transition(duration);
						$right.transform('translate3d(0,0,0)');
						$right.css('opacity','1');
						$active.transform('translate3d(-100%,0,0)');
						return ;
					}
				}
				$active.transform('').css({opacity: '1'});
				$left.transform('').css({opacity: ''});
				$right.transform('').css({opacity: ''});
				
			});
		},
		/**
		 * 获取当前活动panel的索引
		 * @method getActiveIndex 
		 * @returns {Integer}
		 */
		getActiveIndex: function(){
			this.$active = this.$el.find('>.x-contents-content.active');
			if(this.$active.length === 0) return -1;
			return $(">.x-contents-content", this.$el).index(this.$active);
		},
		/**
		 * 通过名字获取panel的索引
		 * @method getIndexByXid
		 * @param {String} xid
		 * @return {String}
		 */
		getIndexByXid: function(xid){
			for(var i = 0; i< this.contents.length; i++){
				var content = this.contents[i];
				if(content.xid == xid)
					return i;
			}
			return -1;
		},
		has: function(xid){
			return this.getIndexByXid(xid) != -1;
		},
		/**
		 * 获取当前激活panel的xid
		 * @method getActiveXid
		 * @returns {String}
		 */
		getActiveXid: function(){
			this.$active = this.$el.find('>.x-contents-content.active');
			return this.$active.attr('xid');
		},
		/**
		 * panel切换到指定的位置
		 * @method to
		 * @param {Integer|String} content的xid或者索引
		 */
		to: function (pos, fn) {
			if(typeof pos == 'string')
				pos = this.getIndexByXid(pos);
			
			var that = this;
			var activeIndex = this.getActiveIndex();

			if (pos > ($(">.x-contents-content", this.$el).length - 1) || pos < 0) return;

			if (this.sliding)
				return;
				//return this.$el.one('slide.container', function () { that.to(pos); });//TODO:event
			
			if (activeIndex == pos){
				if(!this._inited)
					this.contents[pos] && this.contents[pos].fireEvent('onActive', {source : this, index: pos});
				fn && fn();
				return;	
			} 

			return this.slide(pos > activeIndex ? 'next' : 'prev', $($(">.x-contents-content", this.$el)[pos]), fn);
		},
		/**
		 * 切换到下一个panel
		 * @method next
		 */
		next: function (fn) {
			if (this.sliding) return;
			return this.slide('next', null, fn);
		},
		/**
		 * 切换到前一个panel
		 * @method prev
		 */
		prev: function (fn) {
			if (this.sliding) return;
			return this.slide('prev', null, fn);
		},
		/**
		 * 切换到指定panel, 同时可以指定切换的方向
		 * @method slide 
		 * @param {String} 切换的方向, 'prev'或'next'
		 * @param {Integer} 目标的索引
		 */
		slide: function (type, next, fn) {
			var $active = this.$el.find('>.x-contents-content.active');
			var $next = next || $active[type]();
			var direction = type == 'next' ? 'left' : 'right';
			var fallback = type == 'next' ? 'first' : 'last';
			var that = this;

			if (!$next.length) {
				if (!this.wrap) return;
				$next = this.$el.find('>.x-contents-content')[fallback]();
			}
			
			var pos = $next.parent().children().index($next); 
			var currentPos = $active.parent().children().index($active); 
			this.sliding = true;

			var e = $.Event('slide.container', { relatedTarget: $next[0], direction: direction });
			this.fireEvent('onActiveChange', {source : this, to: pos, from: currentPos, type: type});

			if(this.contents[pos] && this.contents[pos].fireEvent)
				this.contents[pos].fireEvent('onActive', {source : this, index: pos});
			
			if(currentPos >= 0 && this.contents[currentPos] && this.contents[currentPos].fireEvent)
				this.contents[currentPos].fireEvent('onInactive', {source : this, index: currentPos});

			if ($next.hasClass('active')) return;
			
			if (currentPos != -1 && this._inited && this.slidable && $.support.transition) {
				this.$el.trigger(e);
				if (e.isDefaultPrevented()) return;
				if(direction == "right"){
					$active.animationEnd(function(){
						$next.addClass('active').removeClass('x-left-to-center');
						$active.addClass('x-content-on-right').removeClass('active x-center-to-right');
						that.sliding = false;
						that.getModel().fireEvent('reflow', $next.get(0));
						setTimeout(function () { 
							that.$el.trigger('slide.container');
							fn && fn();
						}, 0);
					});
					$next.addClass("x-left-to-center").removeClass('x-content-on-right x-content-on-left');
					$active.addClass("x-center-to-right");
				}else{
					$active.animationEnd(function(){
						$next.addClass('active').removeClass('x-right-to-center');
						$active.addClass('x-content-on-left').removeClass('active x-center-to-left');
						that.sliding = false;
						that.getModel().fireEvent('reflow', $next.get(0));
						setTimeout(function () { 
							that.$el.trigger('slide.container');
							fn && fn();
						}, 0);
					});
					$next.addClass("x-right-to-center").removeClass('x-content-on-right x-content-on-left');
					$active.addClass("x-center-to-left");
				}
			} else {
				this.$el.trigger(e);
				if (e.isDefaultPrevented()) return;
				$active.removeClass('active');
				$next.addClass('active');
				this.sliding = false;
				this.$el.trigger('slide.container');
				fn && fn();
				this.getModel().fireEvent('reflow', $next.get(0));
			}
			this._pushHistory(pos);
			return this;
		},

		_pushHistory: function(pos){
			if(!justep.Browser.IE6 && !justep.Browser.IE7 && !justep.Browser.IE8)
				if($('.x-contents').find(this.$domNode).length === 0){
					if(this._inited){
						this.pushState({
							from : this.getActiveIndex(),
							to : pos
						},null,'#page' + pos);
					}
				} 
		},
		/**
		 * 添加panel
		 * @method add
		 * @param {Object}config
		 */
		add: function(config){
			//var index = this.getLength() - 1;
			if(!config) config = {};
			config.owner = this;
			config.parentNode = this.$el.get(0);
			return new Content(config);
		},
		/**
		 * 删除panel 
		 * @method remove
		 * @param {Integer} index
		 */
		remove: function(index, to){
			if(index === undefined)
				index = this.active;
			if(typeof index == 'string')
				index = this.getIndexByXid(index);
			if(typeof to == 'string')
				to = this.getIndexByXid(to);
			var length = this.getLength();
			if(length>0){
				var me = this;
				this.to(to || 0, function(){
					var centent = me.contents[index];
					justep.Array.remove(me.contents, centent);
					centent.destroy();
				});
			}
			else{
				var centent = this.contents[index];
				justep.Array.remove(this.contents, centent);
				centent.destroy();
				delete this.active;
			}
		},
		removeOther: function(){
			var current = this.contents[this.active];
			for(var i in this.contents){
				if(i == this.active) continue;
				var content = this.contents[i];
				content.destroy();
			}
			this.contents = [current];
			this.active = 0;
		},
		/**
		 * 获取panel的个数
		 * @method getLength
		 * @returns
		 */
		getLength: function(){
			return $('>.x-contents-content', this.$el).length;
		},
		propertyChangedHandler: function(key, oldVal, value){
			switch(key){
			case 'slidable':
				if(typeof value == 'string')
					value = value == 'true';
				this.slidable = !!value; 
				break;
			}
		},
		/**
		 * 获取panel对象
		 * @method getContent
		 * @param {String} xid
		 * @return {Content}
		 */
		getContent: function(xid){
			for(var i in this.contents){
				if(this.contents[i].xid == xid)
					return this.contents[i]; 
			}
		},
		loadContent: function(xid, url, fn){
			var content = this.getContent(xid);
			if(!content){
				content = this.add({xid: xid});
			}
			//this.to(xid,function);
			content.load(url, fn);
		}
	});
	
	justep.Component.addOperations(Contents, {
		to : {
			label : "",
			argsDef: [{name:'xid',displayName:'切换的content xid'}],
			method : function(args) {
				return this.owner.to(args.xid);
			}
		},
		next : {
			label : "",
			argsDef: [],
			method : function() {
				return this.owner.next();
			}
		},
		prev : {
			label : "",
			argsDef: [],
			method : function() {
				return this.owner.prev();
			}
		}
	});
	
	Component.register(url, Contents);

	return Contents;

});