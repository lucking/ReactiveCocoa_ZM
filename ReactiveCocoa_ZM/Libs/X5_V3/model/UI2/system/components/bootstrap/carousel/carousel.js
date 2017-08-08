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
		url = require.normalizeName("./carousel"),
		ComponentConfig = require("./carousel.config");
	
	require("$UI/system/components/justep/common/res");
	require("css!./css/carousel").load();

/* html

<div component="$UI/system/components/bootstrap/carousel/carousel" class="x-carousel">
	<ol class="carousel-indicators">
		<li class="active"></li>
	</ol>
	<div class="x-contents carousel-inner" role="listbox" component="$UI/system/components/justep/contents/contents"
		active="0" slidable="true" wrap="true" swipe="true"> 
        <div class="x-contents-content"></div>  
	</div>
	<!-- Controls -->
	<a class="left carousel-control" href="#" role="button">
	    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
	    <span class="sr-only">Previous</span>
	</a>
	<a class="right carousel-control" href="#" role="button">
	    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
	    <span class="sr-only">Next</span>
	</a>				
</div>	 

*/
	
	var baseCls = 'x-carousel';

	var carousel = ViewComponent.extend({
		getConfig : function(){
			return ComponentConfig;
		},
		
		constructor: function(options){
			this.callParent(options);
		},
		buildTemplate: function(config){
			return "";
		},
		init: function(value, bindingContext){
			this.callParent(value, bindingContext);
			var me = this;
			this.$el = $(this.domNode);
			this.$indicators = $(".carousel-indicators", this.$el);
			this.$left = $(">.left", this.$el).click(function(){
				me.prev();
			});
			this.$right = $(">.right", this.$el).click(function(){
				me.next();
			});
			this.activeIndex = 0;

			var m = this.getModel();
			var xid = $('>[role="listbox"]', this.$el).attr("xid");
			var p = m.componentPromise(xid);
			$.when(p).done(function(contents){
				me.contents = contents;
				me.contents.on('onActiveChange', function(event){
					me.setActive(event.to);
				});
				me.length = contents.getLength();
				var html = '';
				for(var i=0; i < me.length; i++){
					html += '<li index="' + i + '"></li>';
				}
				me.$indicators.html(html);
				$('>li', me.$indicators).click(function(){
					var index = parseInt($(this).attr("index"));
					me.to(index);
				}).eq(0).addClass('active');
			});
		},
		setActive: function(index){
			this.activeIndex = index;
			$('>li', this.$indicators).removeClass('active').eq(index).addClass('active');
		},
		to: function(index){
			this.contents.to(index);
		},
		prev: function(){
			this.contents.prev();
		},
		next: function(){
			this.contents.next();
		},
		propertyChangedHandler: function(key, oldVal, value){
			/*
			switch(key){
			case 'slidable':
				if(typeof value == 'string')
					value = value == 'true';
				this.slidable = !!value; 
				break;
			}
			*/
		}
	});

	justep.Component.addOperations(carousel, {
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
	
	Component.register(url, carousel);

	return carousel;

});