define(function(require){
	require("css!./css/panel").load();
	var $ = require("jquery");
	var RTPanel = require("../panel");
	var Util = require("$UI/system/components/justep/common/designer/common");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var xuiDoc = xuiService.getXuiDoc();
	var Panel = RTPanel.extend({
		init: function(value, bindingContext){
			this.callParent(value, bindingContext);
			this.$domNode = $(this.domNode);
			this.template = {
				heading: '<div class="panel-heading"><h4 class="panel-title"><a href="javascript:void(0)">Title</a></h4></div>',
				body: '<div class="panel-body"/>',
				footer: '<div class="panel-footer"/>'
			};
			this.selector = {
				heading: '>.panel-heading',	
				body: '>.panel-body',
				footer: '>.panel-footer'
			};
			this.initStatus();
		},
		
		initStatus: function(){
			$(this.selector.heading, this.$domNode).attr("d_canMove", false).attr("d_canAddChild", true);
			$(this.selector.body, this.$domNode).attr("d_canMove", false).attr("d_canAddChild", true);
			$(this.selector.footer, this.$domNode).attr("d_canMove", false).attr("d_canAddChild", true);
		},
		
		onBuildMenu:function(event){ 
			event.enableStatus = event.enableStatus || {};
			event.enableStatus.addHeading = ($('>.panel-heading', this.$domNode).length==0); 
			event.enableStatus.addBody = ($('>.panel-body', this.$domNode).length==0); 
			event.enableStatus.addFooter = ($('>.panel-footer', this.$domNode).length==0); 
		},		
		
	
	    addHeading: function(){
	    	this._addItem("$UI/system/components/bootstrap/panel/panel#heading", "heading");
	    }, 
	    
	    addBody: function(){
	    	this._addItem("$UI/system/components/bootstrap/panel/panel#body", "body");
	    },	
	    
		addFooter: function(){
	    	this._addItem("$UI/system/components/bootstrap/panel/panel#footer", "footer");
		},
	    
	    _addItem: function(component, name){
	    	var item = $(this.selector[name], this.$domNode);
	    	if (item.length == 0){
		    	var targetDID = this._getTargetDID(name);
		    	var self = this;
		    	xuiDoc.createComponent(component,this,
						{before: targetDID, templateContent:this.template[name], paintComponent:true},
						function(result){self.initStatus();});
	    	}else{
	    		alert(name + "已经存在，不允许添加多个！");
	    	}
	    },
		
		_getTargetDID: function(name){
			if (name === "heading"){
				return $(":first-child", this.$domNode).attr("d_id");
			}else if (name === "body"){
				return $(this.selector.footer, this.$domNode).attr("d_id");
			}else{
				return null;
			}
		}
	});
	
	return {'$UI/system/components/bootstrap/panel/panel':Panel};
});