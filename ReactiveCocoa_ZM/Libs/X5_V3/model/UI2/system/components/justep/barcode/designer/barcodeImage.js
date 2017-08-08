/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var Util = require("$UI/system/components/justep/common/designer/common");
	var Barcode = require("../barcodeImage");
	var _Barcode = Barcode.extend({
		init : function(value, bindingContext) {
			var $domNode = $(this.domNode);
			$domNode.append("<table id='"
					+ this.xid + "' class='xui-barcodeImage'> <tr>" + "<td align='center'>"
					+ "<font color='#000000' size='6'>条形码图片</font></td></tr></table>");
			this.callParent(value, bindingContext);
			var cfg = Util.attr2js(this.$domNode, [ 'type' ]);
			if (cfg)
				this.set(cfg);
		}
	});
	return {
		'barcodeImage' : _Barcode
	};
});