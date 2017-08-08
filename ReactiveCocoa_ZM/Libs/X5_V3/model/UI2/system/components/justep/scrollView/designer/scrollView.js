/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
	var $ = require("jquery");
	var ScrollView = require("$UI/system/components/justep/scrollView/scrollView");
	var Component = require("$UI/system/lib/base/component");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	
	require('css!./scrollView').load();
	
	
	var ScrollViewDesigner = ScrollView.extend({
		init: function(value, bindingContext){
			this.callParent(value,bindingContext);
			this.$rootEle.addClass('x-scroll-view');
			xuiService.getXuiDoc().updateProperties(this.$rootEle);
		},
		dispose : function() {
			this.$rootEle.removeClass('x-scroll-view');
			xuiService.getXuiDoc().updateProperties(this.$rootEle);
        	this.callParent();
    	},
		enablePullDown: function(){
			this.$rootEle.attr('supportPullDown',true);
			this.$pdEle = $('<div class="x-content-center x-pull-down container"><i class="x-pull-down-img glyphicon x-icon-pull-down"></i><span class="x-pull-down-label">'+ this.pullDownLabel + '</span></div>');
			this.$scrollEle.prepend(this.$pdEle);
			
			xuiService.getXuiDoc().updateProperties(this.$rootEle);
			xuiService.getXuiDoc().updateNodes(this.$pdEle);
		},
		enablePullUp: function(){
			this.$puEle = $('<div class="x-pull-up x-content-center"><span class="x-pull-up-label">' + this.pullUpLabel +  '</span></div>');
			this.$scrollEle.append(this.$puEle);
			
			xuiService.getXuiDoc().updateProperties(this.$rootEle);
			xuiService.getXuiDoc().updateNodes(this.$puEle);
		},
		
		disablePullDown: function(){
			var $pdEle = $('.x-pull-down',this.$scrollEle);
			var did = $pdEle.attr('d_id');
			$pdEle.remove();
			xuiService.getXuiDoc().deleteComponent([did]);
			
		},
		disablePullUp: function(){
			var $puEle = $('.x-pull-up',this.$scrollEle);
			var did = $puEle.attr('d_id');
			$puEle.remove();
			xuiService.getXuiDoc().deleteComponent([did]);
		},
		
		onBuildMenu:function(event){
			  event.enableStatus = event.enableStatus || {}; 
			  if($('.x-pull-down', this.$rootEle).length>0){
				  event.enableStatus.enablePullDown = false;
				  event.enableStatus.disablePullDown = true;
			  }else{
				  event.enableStatus.enablePullDown = true;
				  event.enableStatus.disablePullDown = false;
			  }  
			  if($('.x-pull-up', this.$rootEle).length>0){
				  event.enableStatus.enablePullUp = false;
				  event.enableStatus.disablePullUp = true;
			  }else{
				  event.enableStatus.enablePullUp = true;
				  event.enableStatus.disablePullUp = false;
			  }  
		},
		propertyChangedHandler : function(name,oldValue,value){
			this.callParent(name,oldValue,value);
			if(name == "pullDownLabel"){
				var $pdlEle =  this.$scrollEle.find('.x-pull-down-label');
				$pdlEle.text(value);
				xuiService.getXuiDoc().updateText($pdlEle);
			}else if(name == "pullUpLabel"){
				var $pulEle =  this.$scrollEle.find('.x-pull-up-label');
				$pulEle.text(value);
				xuiService.getXuiDoc().updateText($pulEle);
			}
		}
	});
	
	return {'scrollView':ScrollViewDesigner};
});