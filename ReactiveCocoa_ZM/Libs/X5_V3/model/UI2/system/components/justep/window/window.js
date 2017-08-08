/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var url = require.normalizeName("./window");
	require("$UI/system/resources/system.res");
	var titleLabel = (new justep.Message(justep.Message.JUSTEP230101)).getMessage();
	var msgLabel = (new justep.Message(justep.Message.JUSTEP230091)).getMessage();
	var codeLabel = (new justep.Message(justep.Message.JUSTEP230092)).getMessage();
	var reasonLabel = (new justep.Message(justep.Message.JUSTEP230093)).getMessage();
	var showDetailLabel = (new justep.Message(justep.Message.JUSTEP230094)).getMessage();
	var hideDetailLabel = (new justep.Message(justep.Message.JUSTEP230095)).getMessage();
	var closeLabel = (new justep.Message(justep.Message.JUSTEP230096)).getMessage();
	
	function getErrorContent(err, startStr, endStr){
		var message = err.message || "";
		var start = message.indexOf(startStr);
		var end = message.indexOf(endStr);
		if ((start!=-1) && (end!=-1) && (end>start)){
			return message.substr(start+startStr.length, end-(start+startStr.length)); 
		}else{
			return null;
		}
	}
	
	function getClientError(err){
		return getErrorContent(err, justep.Error.CLIENT_ERROR_START, justep.Error.CLIENT_ERROR_END);
	}
	
	function getServerError(err){
		return getErrorContent(err, justep.Error.SERVER_ERROR_START, justep.Error.SERVER_ERROR_END);
	}
	
	function ErrorDialog(){
		var id = "__justepErrorDialog__";
		var node = $("#" + id)[0];
		if (!node){
			var content = "	<div class='modal' style='z-index:30000' id='"+ id +"'>" +
						"		<div class='modal-dialog'>" +
						"			<div class='modal-content'>" +
						"				<div class='modal-header'>" +
						"					<h4>" + titleLabel + "</h4>" +
						"				</div>" +
						"				<div class='modal-body'>" +
						"					<div class='x-error-message'><span style='font-weight:bold'>"+msgLabel+"</span><span style='word-wrap: break-word;word-break: break-all;' class='x-error-message-body'/></div>" +
						"					<div class='x-error-code'><span style='font-weight:bold'>"+codeLabel+"</span><span class='x-error-code-body'/></div>" +
						"					<div class='x-error-reason'><span style='font-weight:bold'>"+reasonLabel+"</span><span class='x-error-reason-body'/></div>" +
						"					<div><a href='javascript:void(0)' class='x-error-show-detail'>"+showDetailLabel+"</a></div>" +
						"					<div class='x-error-stack' style='word-wrap: break-word;'/>" +
						"				</div>" +
						"				<div class='modal-footer'>" +
						"					<button type='button' class='btn btn-default x-error-close'>"+closeLabel+"</button>" +
						"				</div>" +
						"			<div>" +
						"		</div>" +
						"	</div>";
			
			
			var $node = $(content);
			$("#applicationHost").append($node);
			$node.find(".x-error-close").on("click", function(){
				$node.hide();
			});
			$node.find(".x-error-show-detail").on("click", function(){
				var btn = $node.find(".x-error-show-detail");
				if (btn.hasClass("x-error-show")){
					btn.removeClass("x-error-show");
					btn.text(showDetailLabel);
					$node.find(".x-error-stack").hide();
				}else{
					btn.text(hideDetailLabel);
					btn.addClass("x-error-show");
					$node.find(".x-error-stack").show();
				}
			});
			this.domNode = $node[0];
			this.$domNode = $node;
		}
	}
	
	ErrorDialog.prototype.open = function(data){
		var info = data.server || data.client;
		this.$domNode.find(".x-error-message-body").text((info.message || ""));
		if (info.code){
			this.$domNode.find(".x-error-code").show();
			this.$domNode.find(".x-error-code-body").text(info.code);
		}else{
			this.$domNode.find(".x-error-code").hide();
		}
		if (info.reason){
			this.$domNode.find(".x-error-reason").show();
			this.$domNode.find(".x-error-reason-body").text(info.code);
		}else{
			this.$domNode.find(".x-error-reason").hide();
		}

		this.$domNode.find(".x-error-show-detail").text(showDetailLabel).removeClass("x-error-show");
		this.$domNode.find(".x-error-stack").text(info.stack || "").hide();
		
		this.$domNode.show();
	};
	
	

	window.onerror = function(){
		var err = null;
		for (var i=0; i<arguments.length; i++){
			if (arguments[i] instanceof Error){
				err = arguments[i];
				break;
			}
		}
		var data = {};
		if (err){
			var content = getServerError(err);
			if (content){
				//server error
				data.server = JSON.parse(content);
				data.client = {};
				data.client.message = (err.message||"").replace(justep.Error.SERVER_ERROR_START, "").replace(justep.Error.SERVER_ERROR_END, "");
				data.client.stack = (err.stack||"").replace(justep.Error.SERVER_ERROR_START, "").replace(justep.Error.SERVER_ERROR_END, "");
				
			}else{
				content = getClientError(err);
				if (content){
					//client error
					data.client = JSON.parse(content);
					if (!data.client.stack){
						data.client.stack = (err.stack||"");
					}
					data.client.stack = data.client.stack.replace(justep.Error.CLIENT_ERROR_START, "").replace(justep.Error.CLIENT_ERROR_END, "");
				}else{
					//other error
					data.client = {};
					data.client.message = err.message;
					data.client.stack = err.stack;
				}
			}
		}else{
			data.client = {};
			data.client.message = arguments[0];
		}

		
		if (!window.errorDialog)
			window.errorDialog = new ErrorDialog();
		
		window.errorDialog.open(data);
		return false;
	};
		

	var Window = justep.ViewComponent.extend({
		getConfig: function(){
			return {};
		},
		constructor : function(options) {
			this.callParent(options);
		}
	});

	justep.Component.addOperations(Window, {
		'close' : {
			label : justep.Message.getMessage(justep.Message.JUSTEP230096),
			icon : 'icon-chevron-left',
			method : function(args) {
				justep.Portal.closeWindow();
			}
		}});
	
	justep.Component.register(url, Window);
	return Window;
});