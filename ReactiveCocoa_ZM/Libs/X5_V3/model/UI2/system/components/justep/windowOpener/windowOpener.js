/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var biz = require('$UI/system/lib/biz');
	var Model = justep.ModelBase;
	var url = require.normalizeName("./windowOpener");
	var ComponentConfig = require("./windowOpener.config");
	justep.windowOpener_openers = {};
	
	var WindowOpener = justep.BindComponent.extend({
		getConfig : function() {
			return ComponentConfig;
		},
		constructor : function(option) {
			this.id = option.id ? option.id : (new justep.UUID()).valueOf();
			this.url = option.url;
			this.windowId = this.id + "_window";
			this.process = option.process;
			this.activity = option.activity;
			this.executor = null;
			this.executorContext = null;
			this.window = null;
			this.modal = !!option.modal;
			this.status = option.status;
			this.width = option.width;
			this.height = option.height;
			this.left = option.left;
			this.top = option.top;
			this.resizable = !!option.resizable;
			this.parameters = option.parameters?option.parameters:'';
			this.isOverlaid = false;

			if(typeof this.width=="string"){
				try{
					this.width = parseInt(this.width);
				}catch(e){
					var msg = new justep.Message(justep.Message.JUSTEP231047,"width",this.width);
					throw justep.Error.create(msg);
				}
			}
			if(typeof this.height=="string"){
				try{
					this.height = parseInt(this.height);
				}catch(e){
					var msg = new justep.Message(justep.Message.JUSTEP231047,"height",this.height);
					throw justep.Error.create(msg);
				}
			}

			if (option.onSend && option.onSend != "") {
				var f = null;
				try {
					f = eval(option.onSend);
				} catch (e) {
				}
				if (f && typeof f == "function") {
					this.on("onSend", f, this);
				}
			}

			if (option.onReceive && option.onReceive != "") {
				var f = null;
				try {
					f = eval(option.onReceive);
				} catch (e) {
				}
				if (f && typeof f == "function") {
					this.on("onReceive", f, this);
				}
			}

			if (option.onClose && option.onClose != "") {
				var f = null;
				try {
					f = eval(option.onClose);
				} catch (e) {
				}
				if (f && typeof f == "function") {
					this.on("onClose", f, this);
				}
			}

			if (option.onOpen && option.onOpen != "") {
				var f = null;
				try {
					f = eval(option.onOpen);
				} catch (e) {
				}
				if (f && typeof f == "function") {
					this.on("onOpen", f, this);
				}
			}
			
			
			this.callParent(option);
		},
		dispose : function() {
			this.callParent();
		},
		doInit : function(value, bindingContext) {
			this.callParent(value, bindingContext);
		}
		
	});
	
	/**
	 * 向弹出的窗口发送数据
	 */
	WindowOpener.prototype.sendToWindow = function() {
		var b = false;
		try{//沉默跨域的url
			b = !!this.window;
		}catch(e){};
		if (b && this.window) {
			this.fireEvent("onSend",{
				source : this,
				data : this.sendData
			});
			this.window.postMessage({type: 'WindowOpener', data: this.sendData}, '*');
		}
	};
	
	WindowOpener.prototype.setURL = function(url) {
		this.url = url;
		this.window = null;
	};

	WindowOpener.prototype.getWindow = function() {
		return this.window;
	};

	WindowOpener.prototype._getPrames = function(){
		var left = this.left, top = this.top, height = this.height, width = this.width;
		if(left==null || left==undefined || left=='') left = (window.screen.availWidth - width)/2;  
		if(top==null || top==undefined || top=='') top = (window.screen.availHeight - height)/2; 
		if(justep.Browser.IE){
			var s = (this.modal?'modal=1,':'')
			+ (width?'width='+width+',':'')
			+ (height?'height='+height+',':'')
			+ (left!=null?'left='+left+',':'')
			+ (top!=null?'top='+top+',':'')
			+ (this.status=='fullscreen'?'channelmode=1,fullscreen=1,':'')
			+ (this.resizable?'resizable=1,':'')
			+ 'depended=1,z-look=1,location=0,'
			+ this.parameters;
			return s;
		}else{
			if(this.status=='fullscreen'){//计算全屏
				height = window.screen.availHeight - 60;
				width = window.screen.availWidth - 10;
				top = 0;
				left = 0;
			}
			var s = (this.modal?'modal=1,':'')
			+ (width?'width='+width+',':'')
			+ (height?'height='+height+',':'')
			+ (left!=null?'left='+left+',':'')
			+ (top!=null?'top='+top+',':'')
			+ (this.status=='fullscreen'?'channelmode=1,fullscreen=1,':'')
			+ (this.resizable?'resizable=1,':'')
			+ 'depended=1,z-look=1,location=0,'
			+ this.parameters;
			return s;
		}
	};

	WindowOpener.prototype._getUrl = function(){
		var url = this.url + ((this.url.indexOf("?")>0)? "&" : "?") + "$opener="+this.id;
		return biz.Request.setBizParams(require.toUrl(url),this.process,this.activity,this.executor,this.executorContext);
	};

	WindowOpener.prototype.createOverlay = function(){
	    var isIE6 = typeof document.body.style.maxHeight === "undefined";
		var sizeOverlay = function(){
			var $ModalOverlay = $('#ModalOverlay');
			if(isIE6){
				var overlayViewportHeight = document.documentElement.offsetHeight + document.documentElement.scrollTop - 4;
				var overlayViewportWidth = document.documentElement.offsetWidth - 21;
				$ModalOverlay.css({'height':overlayViewportHeight +'px','width':overlayViewportWidth+'px'});
			}else{
				$ModalOverlay.css({'height':'100%','width':'100%','position':'fixed'});
			}	
		};
		
		var sizeIE6Iframe = function(){
			var overlayViewportHeight = document.documentElement.offsetHeight + document.documentElement.scrollTop - 4;
			var overlayViewportWidth = document.documentElement.offsetWidth - 21;
			$('#ModalOverlayIE6FixIframe').css({'height':overlayViewportHeight +'px','width':overlayViewportWidth+'px'});
		};
		
	    var overlayColor = '#C1C1C1', overlayOpacity = 30;
	    $('body').append('<div id="ModalOverlay" style="z-index:10000;display:none;position:absolute;top:0;left:0;background-color:'+overlayColor+';filter:alpha(opacity='+overlayOpacity+');-moz-opacity: 0.'+overlayOpacity+';opacity: 0.'+overlayOpacity+';"></div>');
	    
	    if(isIE6){// if IE 6
	    	$('body').append('<iframe id="ModalOverlayIE6FixIframe"  src="about:blank"  style="width:100%;height:100%;z-index:9999;position:absolute;top:0;left:0;filter:alpha(opacity=0);"></iframe>');
	    	sizeIE6Iframe();
	    }
	    this.isOverlaid = true;
	    sizeOverlay();
	    var $ModalOverlay = $('#ModalOverlay');
	    $ModalOverlay.fadeIn('fast');
	};

	WindowOpener.prototype.removeOverlay = function(){
		$('#ModalOverlayIE6FixIframe').remove();
		$('#ModalOverlay').remove();
		this.isOverlaid = false;
	};

	WindowOpener.prototype.open = function(options) {
		this.sendData = undefined;
		if(options){
			this.sendData = options.data;
			if(options.title)	this.setTitle(options.title);
			if(options.process) this.setProcess(options.process);
			if(options.activity) this.setActivity(options.activity);
			if(options.executor) this.setExecutor(options.executor);
			if(options.executorContext) this.setExecutorContext(options.executorContext);
			if(options.url) this.setURL(options.url);
		}

		//打开窗口
		this.window = window.open("about:blank", this.windowId, this._getPrames());
		justep.windowOpener_openers[this.id] = this;
		this.window.location.href = this._getUrl();
		if(this.modal && !this.isOverlaid) this.createOverlay();
		this.fireEvent("onOpen",{
			'window' : this.window
		});
	};

	WindowOpener.prototype.dispatchCloseEvent = function(){
		var self = this;
		window.setTimeout(function(){
			if(!self.window || (self.window && self.window.closed)){
				if (self.isOverlaid) self.removeOverlay();
				self.fireEvent("onClose", {
					source : self
				});
			}
		}, 200);
	};

	WindowOpener.prototype.close = function() {
		if(this.window){
			this.window.close();
			this.window = null;
		}
	};

	/**
	 * 确定 接收从window获得的数据
	 */
	WindowOpener.prototype.ensure = function(store, noclose) {
		debugger;
		this.fireEvent("onReceive", {
			source : this,
			data : store
		});
		if(typeof(noclose) == "undefined" || noclose == false){
			this.close();		
		}
	};

	WindowOpener.prototype.refresh = function() {
		this.open();	
	};

	/**
	 * 取消
	 */
	WindowOpener.prototype.cancel = function() {
		this.close();
	};
	
	/**
	 * 是否允许拖拽改变大小
	 */
	WindowOpener.prototype.setResizable = function(flag) {
		this.resizable = flag;
	};

	WindowOpener.prototype.setExecutor = function(executor) {
		this.executor = executor;
	};

	WindowOpener.prototype.setExecutorContext = function(executorContext) {
		this.executorContext = executorContext;
	};

	WindowOpener.prototype.setProcess = function(process) {
		this.process = process;
	};

	WindowOpener.prototype.setActivity = function(activity) {
		this.activity = activity;
	};

	WindowOpener.prototype.getExecutor = function() {
		return this.executor;
	};

	WindowOpener.prototype.getExecutorContext = function() {
		return this.executorContext;
	};

	WindowOpener.prototype.getProcess = function() {
		return this.process;
	};

	WindowOpener.prototype.getActivity = function() {
		return this.activity;
	};
	
	justep.Component.register(url,WindowOpener);
	return WindowOpener;
});




