/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	var $ = require("jquery");
	var Model = require("../model");
	require('css!./css/model').load();
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var xuiDoc = xuiService.getXuiDoc();
	
	var ModelDesigner = Model.extend({
		init: function(value, bindingContext){
			this.$domNode = $(this.domNode);
			var xid = this.$domNode.attr("xid");
			
			this.$domNode.addClass('xui-model').prepend("<div class='xui-model-title'>"+(xid?xid:'&nbsp;')+"</div>"); 
			this.domNode.style.position = "absolute";
			if(!this.domNode.style.top){
				this.domNode.style.top = "10px";
				this.domNode.style.left = "10px";
			}
			this.domNode.style.height = "auto";
			this.callParent(value, bindingContext);
			 
		},
		set: function(v){
			if('xid' in v){
				this.$domNode.children('.xui-model-title').text(v['xid']);
			}
		},
		hide : function(){
			this.ownerDesigner.unSelection(this.$domNode[0]);
			this.$domNode.hide();
		},
		show : function(){
			this.$domNode.show();
			this.ownerDesigner.setSelection(this.$domNode[0]);
		},
		addBizData:function(config){
			var self = this;
			xuiDoc.createComponent("$UI/system/components/justep/data/bizData"/*组件注册名*/,this/*父组件*/,{paintComponent:true/*立即绘制组件*/},function(){
				self.ownerDesigner.reSelect(self.domNode,true);
			});
		},
		addData:function(confit){
			xuiDoc.createComponent("$UI/system/components/justep/data/data",this,{paintComponent:true},function(){
				self.ownerDesigner.reSelect(self.domNode,true);
			});
		}
	});
	
	return {'$UI/system/components/justep/model/model':ModelDesigner};
});

