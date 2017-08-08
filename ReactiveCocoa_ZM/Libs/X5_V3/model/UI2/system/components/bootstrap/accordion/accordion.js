/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {

	var Component = require("$UI/system/lib/base/component"), 
		Str = require("$UI/system/lib/base/string"),
		ViewComponent = require("$UI/system/lib/base/viewComponent"),
		url = require.normalizeName("./accordion");
	var ComponentConfig = require("./accordion.config");

	require("$UI/system/components/justep/common/res");
	require("../lib/js/bootstrap");
	require('css!./css/accordion').load();
	
	var Accordion = ViewComponent.extend({
		getUrl : function() {
			return url;
		},
		// 构造函数
		constructor : function(options) {
			this.tabbed = true;
			this.callParent(options);
		},
		// 动态创建组件
		buildTemplate : function(config) {
		},
		
		getConfig: function(){
			return ComponentConfig; 
		},
		
        init: function(value, bindingContext){
        	this.callParent(value, bindingContext);
        	this.$el = $(this.domNode);
        	var $targets = $('>.panel>.panel-heading>.panel-title>a', this.$el);
        	var me = this;
        	$targets.click(function(a, b, c){
        		var index = $targets.index(this);
        		me.toggle(index);
        	});
		},
		show: function(index){

			this.fireEvent("onShow", {source: this, index: index});
			
			var $element = $('>.panel>.panel-collapse', this.$el).eq(index);
			
		    if (this.transitioning || $element.hasClass('in')) return
		    
		    if(this.tabbed)
		    	this.$el.find('> .panel > .in').removeClass('in');

		    $element
		      .removeClass('collapse')
		      .addClass('collapsing')
		      .height(0);

		    this.transitioning = 1;

		    var complete = function () {
		      $element
		        .removeClass('collapsing')
		        .addClass('collapse in')
		        .height('auto');
		      this.transitioning = 0;
		    }

		    if (!$.support.transition) return complete.call(this)

		    var scrollSize = $.camelCase(['scroll', 'height'].join('-'))

		    $element
		      .one($.support.transition.end, $.proxy(complete, this))
		      .emulateTransitionEnd(350)
		      .height($element[0][scrollSize]);			
		},
		hide: function(index){
			var $element = $('>.panel>.panel-collapse', this.$el).eq(index);
			
		    if (this.transitioning || !$element.hasClass('in')) return;

			this.fireEvent("onHide", {source: this, index: index});
		    
		    $element
		      ['height']($element['height']())
		      [0].offsetHeight;

		    $element
		      .addClass('collapsing')
		      .removeClass('collapse')
		      .removeClass('in');

		    this.transitioning = 1

		    var complete = function () {
		      this.transitioning = 0
		      $element
		        .removeClass('collapsing')
		        .addClass('collapse');
		    }

		    if (!$.support.transition) return complete.call(this)

		    $element
		      ['height'](0)
		      .one($.support.transition.end, $.proxy(complete, this))
		      .emulateTransitionEnd(350);
		},
		toggle: function(index){
			var $element = $('>.panel>.panel-collapse', this.$el).eq(index);
		    this[$element.hasClass('in') ? 'hide' : 'show'](index);
		}
	});

	justep.Component.addOperations(Accordion, {
		show : {
			label : "",
			argsDef: [{name:'index',displayName:'索引'}],
			method : function(args) {
				return this.owner.show(args.index);
			}
		},
		hide : {
			label : "",
			argsDef: [{name:'index',displayName:'索引'}],
			method : function(args) {
				return this.owner.hide(args.index);
			}
		}
	});
	
	Component.register(url, Accordion);
	return Accordion;
});
