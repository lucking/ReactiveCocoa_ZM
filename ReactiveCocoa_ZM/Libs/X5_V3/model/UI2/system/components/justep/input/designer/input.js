/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var RTInput = require("../input");
	var RTPassword = require("../password");
	var RTRange = require("../range");
	var Util = require("$UI/system/components/justep/common/designer/common");

	function createInput(input) {
		input.$domNode = $(input.domNode);
		var cfg = Util.attr2js(input.$domNode, [ 'placeHolder', 'disabled' ]);
		if (cfg)
			input.set(cfg);
	}

	var _Input = RTInput.extend({
		init : function(value, bindingContext) {
			this.callParent(value, bindingContext);
			createInput(this);
		}
	});

	var _Password = RTPassword.extend({
		init : function(value, bindingContext) {
			$(this.domNode).attr('type', 'password');
			this.callParent(value, bindingContext);
			createInput(this);
		}
	});

	var _Range = RTRange.extend({
		init : function(value, bindingContext) {
			$(this.domNode).attr('type', 'range');
			this.callParent(value, bindingContext);
			createInput(this);
		}
	});

	return {
		'$UI/system/components/justep/input/input' : _Input,
		"$UI/system/components/justep/input/password" : _Password,
		'$UI/system/components/justep/input/range' : _Range
	};
});