/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var RTTextarea = require("../textarea");
	var Util = require("$UI/system/components/justep/common/designer/common");

	var _Textarea = RTTextarea.extend({
		init : function(value, bindingContext) {
			this.$domNode = $(this.domNode);
			var cfg = Util.attr2js(this.$domNode, [ 'placeHolder', 'disabled' ]);
			this.callParent(value, bindingContext);
			if (cfg)
				this.set(cfg);
		}
	});

	return {
		'$UI/system/components/justep/textarea/textarea' : _Textarea
	};
});