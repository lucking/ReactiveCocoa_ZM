/*! 
* E5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
*/ 
define(function(require) {
	require("$UI/system/components/justep/common/res");
	var Table = require("../table");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var xuiDoc = xuiService.getXuiDoc();
	var $ = require("jquery");
	
	Table = Table.extend({
		init: function(value, bindingContext){
			this.callParent(value, bindingContext);
			this.$domNode.attr("d_canAddChild",false);
			$(">thead>tr th,>thead>tr td", this.$domNode).attr('d_selectable',true).attr("d_canAddChild", false).attr("d_canMove", false);
			$(">thead,>thead>tr,>tbody,>tbody tr,>tbody td", this.$domNode).attr("d_canRemove",false).attr('d_selectable',false).attr("d_canAddChild", false);
			//this.buildRows();
			$(">thead>tr",this.domNode).attr("d_canAddChild","true");
			$(">tbody>tr",this.domNode).attr("d_canAddChild","true");
			$(">tbody>tr>td",this.domNode).attr('d_selectable',true).attr('d_resizable',false);
		},
		
		buildRows : function(rowCount){ 
			rowCount = rowCount || this.$domNode.attr("row-count") || 10;
			rowCount = Math.min(15,parseInt(rowCount,10)); 
			var rows = [];
			for(var i = 0;i<rowCount;i+=1){
				rows.push([]);
			}
			this.loadData(rows);
		},
		
		appendCol : function(){
			var configs = [];
			configs.push({componentName:"$UI/system/components/bootstrap/table/table#col",paintComponent:true,parentElementId:$(">thead>tr",this.domNode).attr("d_id")});
			configs.push({componentName:"td",paintComponent:true,parentElementId:$(">tbody>tr",this.domNode).attr("d_id")});
			xuiDoc.batchCreateComponent(configs);
		},
		
		set : function(config){
			for(var p in config){
				if(p == 'row-count'){
					this.buildRows(config[p]);
					this.$domNode.attr("row-count",config[p]);
				}
			}
		}
	});

	var Column = function(config) {
		this.domNode = this.templateNode = config.templateNode;
		this.domNode.setAttribute("tabindex",'0');
	};
	
	Column.prototype = {
		insertCol : function(before){
			var $table =  $(this.domNode).closest("table");
			var configs = [];
			configs.push({
				componentName:"$UI/system/components/bootstrap/table/table#col",
				before:before,
				paintComponent:true,
				parentElementId:$(this.domNode).parent().attr("d_id")});
			
			configs.push({
				componentName:"td",
				paintComponent:true,
				parentElementId:$(">tbody>tr",$table).attr("d_id"),
				before:$(">tbody>tr>td:eq("+$("*[d_id='"+before+"']").index()+")",$table).attr("d_id")});
			xuiDoc.batchCreateComponent(configs);
			
//			xuiDoc.createComponent("$UI/system/components/bootstrap/table/table#col",this.domNode.parentNode.getAttribute("d_id"),config,function(){
//				var com = self.ownerDesigner.getOwnerComponent(self.domNode.parentNode); 
//				$(self.domNode.parentNode).attr("d_canAddChild","false");
//			});
		},
		
		insertBeforeCol : function(){
			this.insertCol(this.domNode.getAttribute("d_id"));
		},
		
		insertAfterCol : function(){
			this.insertCol($(this.domNode).next().attr("d_id"));
		},
		
		onRemove : function(event){
			if($("th",this.domNode.parentNode).length == 1){
				event.cancel=true;
			}else{
				event.cancel=true;
				$domNode = $(this.domNode); 
				xuiDoc.deleteComponent([this,$(">tbody>tr>td:eq("+$domNode.index()+")",$domNode.closest("table")).attr("d_id")]);
			}
		},
		
//		dispose : function(){
//			var self = this;
//			var com = self.ownerDesigner.getOwnerComponent(self.domNode.parentNode); 
//			$(this.domNode).remove();
//			
//		},
		
		set : function(config){
			for(var p in config){
				if(p == 'label'){
					this.domNode.innerHTML = config[p];
				}else if(p == 'name'){
					this.domNode.setAttribute("name",config[p]);
				}
			}
		}
	};

	
	return {'$UI/system/components/bootstrap/table/table': Table,'$UI/system/components/bootstrap/table/table#col':Column};

});