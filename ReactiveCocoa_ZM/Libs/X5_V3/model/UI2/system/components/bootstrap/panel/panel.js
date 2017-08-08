define(function(require) {
	require("$UI/system/components/justep/common/res");
	var justep = require("$UI/system/lib/justep");
	var url = require.normalizeName("./panel");
	
	
	var Panel = justep.ViewComponent.extend({
    	constructor: function(config){
			this.callParent(config);
    	},
    	dispose: function(){
    		this.callParent();
    	},
    	buildTemplate: function(config){},
        init: function(value, bindingContext){
	        this.callParent(value, bindingContext);
        },
        update: function(value, bindingContext){
	        this.callParent(value, bindingContext);
        }
   	});
	
	justep.Component.register(url, Panel);
	return Panel;
});
