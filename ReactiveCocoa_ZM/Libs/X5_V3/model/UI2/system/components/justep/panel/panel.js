/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	
	require("$UI/system/components/justep/common/res");
	require('css!./css/panel').load();
	
	var Component = require("$UI/system/lib/base/component");
	var Object = require("$UI/system/lib/base/object");
	var justep = require('$UI/system/lib/justep');
	var Str = require("$UI/system/lib/base/string");
	var ViewComponent = require("$UI/system/lib/base/viewComponent");
	var $ = require("jquery");
	var url = require.normalizeName("./panel");

	var ComponentConfig = require("./panel.config");
	
	
/* html

<div component="$model/UI2/system/components/justep/panel/panel" class="x-panel x-full" 
	xid="panel">
  <div class="x-panel-top"> 
		//内容
  </div>  
  <div class="x-panel-content" style="overflow: hidden;"> 
		//内容
  </div>  
  <div class="x-panel-bottom"> 
		//内容
  </div> 
</div>

*/	

    var Panel = ViewComponent.extend({
    	constructor: function(options){
    		this.baseCls = 'x-panel';
			this.callParent(options);
    	},
    	getConfig: function(){
    		return ComponentConfig;
    	},
    	buildTemplate: function(config){
    		//default value
    		config.content = config.content || {};
    		config.content.refresh = config.content.refresh != undefined? config.content.refresh : false;  
    		config.content.load = config.content.load != undefined? config.content.load : false;

    		config.top = config.top || {};
    		config.top.visible = config.top.visible != undefined? config.top.visible : true;  
    		config.top.height = config.top.height != undefined? config.top.height : "48";  

    		config.bottom = config.bottom || {};
    		config.bottom.visible = config.bottom.visible != undefined? config.bottom.visible : true;  
    		config.bottom.height = config.bottom.height != undefined? config.bottom.height : "48";  
    		
        	return Str.format("<div xid='{0}' class='{1}' component='{2}'>" +
	        			"<div class='x-panel-top {3}' style='{4}'>{5}</div>" +
	        			"<div class='x-panel-content'>{6}</div>" +
	        			"<div class='x-panel-bottom {7}' style='{8}'>{9}</div>" +
        			"</div>", config.xid, this.baseCls, url, 
        				config.top.visible? '' : 'hide',
        				styleHeight(config.top.height),
        				config.top.body || '',
             			config.content.body || '',
        				config.bottom.visible? '' : 'hide',
        				styleHeight(config.bottom.height),
        				config.bottom.body || '');
        },
        init: function(value, bindingContext){
        	this.callParent(value, bindingContext);
        	this.$el = $(this.domNode);
        	this.$top = $('>.x-panel-top', this.domNode);
        	this.$content = $('>.x-panel-content', this.domNode);
        	this.$bottom = $('>.x-panel-bottom', this.domNode);
        	if(this.$top.length == 0)
        		this.$content.css('top', 0);
        	if(this.$bottom.length == 0)
        		this.$content.css('bottom', 0);
        	var me = this,
        		pTop = this.getModel().componentPromise(this.$top[0]),
        		pContent = this.getModel().componentPromise(this.$content[0]),
        		pBottom = this.getModel().componentPromise(this.$bottom[0]);
        	$.when(pTop, pContent, pBottom).then(
        		function(top, content, bottom){
        			me.inited();
        		},
        		function(err){
        			alert(err);
        		}
        	);
        	return {dependence: true};
        },
        /**
         * 设置上下区域的高度
         * @method setHeight 
         * @param {String} name 'top' or 'bottom'
         * @param {Integer} value
         */
        setHeight: function(name, value){
        	//
        },
        /**
         * 获取上下区域的高度
         * @method getHeight
         * @param {String} name
         * @returns {Integer}
         */
        getHeight: function(name){
        	return $('>.x-panel-' + name, this.$domNode).css('height');
        },
        /**
         * 设置上下区域的可见性
         * @method setVisible 
         * @param {String} name 'top' or 'bottom'
         * @param {Boolean} value
         */
        setVisible: function(name, value){
        	if(value)
        		$('>.x-panel-' + name, this.$domNode).removeClass('hide');
        	else
        		$('>.x-panel-' + name, this.$domNode).addClass('hide');
        	if(name == 'top'){
        		if(value)
        			$('>.x-panel-content', this.$domNode).css('top', $('>.x-panel-top', this.$domNode).height());
        		else
        			$('>.x-panel-content', this.$domNode).css('top', 0);
        	}else{
        		if(value)
        			$('>.x-panel-content', this.$domNode).css('bottom', $('>.x-panel-bottom', this.$domNode).height());
        		else
        			$('>.x-panel-content', this.$domNode).css('bottom', 0);
        	}
        },
        /**
         * 获取上下区域是否可见
         * @method getVisible
         * @param {String} name 
         * @returns {Boolean}
         */
        getVisible: function(name){
        	return !$('>.x-panel-' + name, this.$domNode).hasClass('hide');
        },
        /**
         * 显示上边区域
         * @method showTop
         */
        showTop: function(){
        	this.setVisible('top', true);
        },
        /**
         * 隐藏上边区域
         * @method showTop
         */
        hideTop: function(){
        	this.setVisible('top', false);
        },
        /**
         * 切换上边区域显示或隐藏
         * @method showTop
         */
        toggleTop: function(){
        	var value = $('>.x-panel-top', this.$domNode).hasClass('hide');
        	this.setVisible('top', value);
        },
        /**
         * 显示下边边区域
         * @method showBottom
         */
        showBottom: function(){
        	this.setVisible('bottom', true);
        },
        /**
         * 隐藏下边边区域
         * @method hideBottom
         */
        hideBottom: function(){
        	this.setVisible('bottom', false);
        },
        /**
         * 切换下边区域显示或隐藏
         * @method showBottom
         */
        toggleBottom: function(){
        	var value = $('>.x-panel-bottom', this.$domNode).hasClass('hide');
        	this.setVisible('bottom', value);
        },
        /**
         * 获取区域对象
         * @method getPanl
         * @param {String} name 'top', 'left', 'right' or 'bottom'
         * @return {Panel} 
         */
        get: function(name){
        	return this[name];
        },
        /**
         * 删除特定区域
         */
        remove: function(name){
        	$('.x-panel-' + name, this.$el).remove();
        }
    });
    
	function height(value){
		value = value + '';
		if(!value) return '';
		return (value.indexOf("%") == -1 && value.indexOf("px") == -1)? parseInt(value) : value;
	}
	
	function heightStr(value){
		if(!value) return '';
		value = (value.indexOf("%") == -1 && value.indexOf("px") == -1)? value+'px' : value;
		return value;
	}
	
	function styleHeight(value){
		return 'height:' + heightStr(value) + ';';
	}
    
    
    Component.register(url, Panel);

    return Panel;
});