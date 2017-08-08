define(function(require){
	var $ = require("jquery");
	require("$UI/system/components/justep/common/res");
	require('css!./row').load();
	var rtRow = require("../row");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	
	var Row = rtRow.extend({
		constructor: function(config){
			this.callParent();
			this.domNode = config.templateNode;
			this.domNode.componentObj = this;
		},
		addRowAtBefore:function(){
			var parent_d_id = $(this.domNode).parent().attr('d_id'),
				d_id = $(this.domNode).attr('d_id');
			xuiService.getXuiDoc().createComponent("$UI/system/components/bootstrap/row/row", parent_d_id,{paintComponent:true, before: d_id});
		},
		addRowAtAfter:function(){
			var parent_d_id = $(this.domNode).parent().attr('d_id');
			xuiService.getXuiDoc().createComponent("$UI/system/components/bootstrap/row/row", parent_d_id,{paintComponent:true});
		},
		addCol:function(){
			xuiService.getXuiDoc().createComponent("$UI/system/components/bootstrap/row/row#col",this,{paintComponent:true});
		},
		dispose:function(){
			this.domNode.componentObj = null;
		}
	});
	
	var Col = function(config){
		this.domNode = config.templateNode;
		this.domNode.componentObj = this;
		this.domNode.setAttribute("d_canAddChild","true");
	};
	
	Col.prototype = {
		dispose:function(){
			this.domNode.componentObj = null;
		},
		addRow:function(){
			var parent_d_id = $(this.domNode).attr('d_id');
			xuiService.getXuiDoc().createComponent("$UI/system/components/bootstrap/row/row", parent_d_id,{paintComponent:true});
		}
    };
	return {
		"$UI/system/components/bootstrap/row/row":Row,
		"$UI/system/components/bootstrap/row/row#col":Col
	};
});

