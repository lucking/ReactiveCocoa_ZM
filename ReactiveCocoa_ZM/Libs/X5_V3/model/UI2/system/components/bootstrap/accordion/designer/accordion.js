/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
	require('css!./accordion').load();
	
	var $ = require("jquery");
	var Accordion = require("../accordion");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var Component = require("$UI/system/lib/base/component");
	var bind = require("bind");
	
	var panelTemplate = '<div class="panel panel-default" component="$UI/system/components/bootstrap/panel/panel"><div class="panel-heading"><h4 class="panel-title"><a href="javascript:void(0)">Title</a></h4></div><div class="panel-collapse"><div class="panel-body"></div></div></div>';
	
	var cls = Accordion.extend({
		init:function(value, bindingContext){
			this.callParent(value, bindingContext);

			var me = this,
				m = this.getModel(),
				xids = [],
				promises = []; 
			$('>.panel', this.$el).each(function(){
				xids.push($(this).attr('xid'));
			});
			justep.Array.each(xids, function(xid){
				promises.push(m.componentPromise(xid));
			});
			$.when.apply($, promises).done(function(){
				$('>.panel', me.$el).each(function(){
					var comp = m.comp(this);
					comp.onAfterSelect = function(){
						me.onPanelSelect(comp);
					};
				});
			});
		},
		addPanel: function(){
			var xuiDoc = xuiService.getXuiDoc(), me = this;
	    	xuiDoc.createComponent("$UI/system/components/bootstrap/panel/panel",this,
				{templateContent: panelTemplate, paintComponent:true},
				function(result){
					var d_id = $(result).attr('d_id');
					var comp = justep.Component.getComponent($("[d_id='" + d_id + "']").get(0));
					comp.onAfterSelect = function(){
						me.onPanelSelect(comp);
					}
				}
			);
		},
		onPanelSelect: function(sub){
			var index = $(sub.domNode).index();
			this.show(index);
		},
		propertyChangedHandler: function(key, oldVal, value){
			switch(key){
			case "tabbed": 
				if(value === true || value === "true"){
		        	$('>.panel>.panel-collapse', this.$el).removeClass('in').eq(0).addClass('in');
				}else{
		        	$('>.panel>.panel-collapse', this.$el).addClass('in');
				}
				break;
			}
		}
	});

	return {'$UI/system/components/bootstrap/accordion/accordion': cls};
});