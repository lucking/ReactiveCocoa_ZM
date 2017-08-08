/*! 
* E5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
*/ 
define(function(require) {
	require("$UI/system/components/justep/common/res");
	var justep = require("$UI/system/lib/justep");
	var url = require.normalizeName("./progress");
	var ComponentConfig = require("./progress.config");
	var Progress = justep.BindComponent.extend({
		getConfig : function() {
			return ComponentConfig;
		},
		
		constructor : function(options) {
			this.valuenow = '';
			this.valuemax = 100;
			this.textVisible = true;
			this.callParent(options);
		},

		init: function(value, bindingContext){
			this.callParent(value, bindingContext);
		},
		
		propertyChangedHandler : function(key, oldVal, value) {
			this.callParent(key, oldVal, value);
			if(key == "valuenow"){
				var progress = Math.round((parseFloat(value||0)*100.0)/this.valuemax);
				$(">.progress-bar",this.$domNode).css("width",progress+"%");
				var eData = { source : this, valuenow : this.value, progress : progress+"%" };
				this.fireEvent('onRender', eData);
				$(">.progress-bar>span",this.$domNode).html(eData.progress);
			}else if(key == 'textVisible'){
				$(">.progress-bar>span",this.$domNode)["false" == (""+value)?"addClass":"removeClass"]("sr-only");				
			}
		}
	});


	justep.Component.register(url, Progress);
	return Progress;
});