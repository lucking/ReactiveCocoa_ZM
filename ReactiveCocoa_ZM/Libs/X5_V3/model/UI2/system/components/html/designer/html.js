define(function(require){
	var $ = require("jquery"),
	ViewComponent = require("$UI/system/lib/base/viewComponent");
	
	var Label = ViewComponent.extend({
		init: function(value, bindingContext){
			this.callParent(value, bindingContext);
			this.$domNode = $(this.domNode);
			this.$domNode.text(this.$domNode.attr('bind-text'));
		},
        set: function(values){
        	if('bind-text' in values){
        		this.$domNode.text(values['bind-text']);
        	}else if('text' in values){
        		this.$domNode.text(values['text']);
        	}
        }
		
	});
	
	return {'label':Label};
});