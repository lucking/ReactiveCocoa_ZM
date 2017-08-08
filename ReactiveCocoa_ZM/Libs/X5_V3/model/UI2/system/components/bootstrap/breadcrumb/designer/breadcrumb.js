define(function(require){
	require('css!./css/breadcrumb').load();

	var $ = require("jquery");
	var RTBreadcrumb = require("../breadcrumb");
	var Util = require("$UI/system/components/justep/common/designer/common");
		
	var Breadcrumb = RTBreadcrumb.extend({
	    addItem: function(){
	    	this.push({label:'item'+this.$domNode.children('li').size()});
	    }
	});
	
	return {'$UI/system/components/bootstrap/breadcrumb/breadcrumb':Breadcrumb};
});