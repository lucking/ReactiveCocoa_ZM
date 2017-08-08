/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	require("$UI/system/components/justep/common/res");
	require("../lib/js/bootstrap");
	var Component = require("$UI/system/lib/base/component"), 
		Str = require("$UI/system/lib/base/string"),
		ViewComponent = require("$UI/system/lib/base/viewComponent"),
		url = require.normalizeName("./pagination");
	var ComponentConfig = require("./pagination.config");
	var Data = require("$UI/system/components/justep/data/data");

	require('css!./css/pagination').load();
	
	var Pagination = ViewComponent.extend({
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
			return Str.format("<div class='pagination' xid='{0}' componet='{1}'></div>", config.xid);
		},
		
		getConfig: function(){
			return ComponentConfig; 
		},
		
		init: function(){
			this.data = null;
			this.callParent();
			this.$el = $(this.domNode);
			this.currentIndex = 0;
			this._init();
			
			this.dataComp = this.getModel().comp(this.data);
			var me = this;
			this.dataComp.on(Data.EVENT_DATA_CHANGE,function(event){
				var rows,i;
				if(event.selfChanged
						&& (event.type === 'clear'
							|| event.type === 'refresh'
								|| event.type === 'delete'
									|| event.type === 'new')){
					var limit = me.dataComp.limit;
					var length = Math.ceil(me.dataComp.getTotal()/limit);
					var index = me.dataComp.getOffset()/limit - 1; 
					me._init(length, index);
				}
			});
		},
		_init: function(length, index){
			this.currentIndex = index; 
			var html = '<li class="prev"><a href="#"><span aria-hidden="true">«</span><span class="sr-only">Previous</span></a></li>';  
			if(length){
				(index === undefined || index >= length) && (index = 0);
				for(var i = 0; i < length; i++)
					if(index == i)
						html +=	'<li class="active"><a href="#">' + (i+1) + '</a></li>';
					else
						html +=	'<li><a href="#">' + (i+1) + '</a></li>';
			}	
			html += '<li class="next"><a href="#"><span aria-hidden="true">»</span><span class="sr-only">Next</span></a></li>';  
			this.$el.html(html);
			var me = this,
				$items = $('>li', this.$el),
				hasPrev = $items.first().hasClass('prev'),
				hasNext = $items.last().hasClass('next');
			if(!length)
				$items.addClass('disabled');
			else {
				if(hasPrev && me.currentIndex == 0){
					$('.prev', me.$el).addClass('disabled');
				}
				if(hasNext && me.currentIndex+1 == length){
					$('.next', me.$el).addClass('disabled');
				}
				$items.click(function(e){
					var $item = $(this);
					if($item.hasClass('disabled') || $item.hasClass('active')) 
						return false;
					$items.removeClass('active');
					$items.removeClass('disabled');
					if($item.hasClass('prev')){
						me.currentIndex--;
					}else if($item.hasClass('next')){
						me.currentIndex++;
					}else {
						me.currentIndex = hasPrev? $item.index()-1 : $item.index();
					}
					$items.eq(hasPrev?me.currentIndex+1:me.currentIndex).addClass('active');
					if(hasPrev && me.currentIndex == 0){
						$('.prev', me.$el).addClass('disabled');
					}
					var length = $items.length;
					hasPrev && length--; 
					hasNext && length--;
					if(hasNext && me.currentIndex+1 == length){
						$('.next', me.$el).addClass('disabled');
					}
					me.dataComp.loadPageData(me.currentIndex+1);
					me.fireEvent('onClick', {source: me, index: me.currentIndex});
				});
			}
		}
	});
	
	Component.register(url, Pagination);
	return Pagination;
});
