/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function (require) {
	var $ = require("jquery");
	var Widget = require("$UI/system/components/justep/widgets/widget");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var xuiDoc = xuiService.getXuiDoc();
 
	var cls = Widget.extend({
		init:function(value, bindingContext){
			this.callParent(value, bindingContext);
			this._d_inited_ = true;
		},
		propertyChangedHandler: function(key, oldValue, value){
			//在这里可以加对属性的特殊处理
			switch(key){
			case "title":
				this.callParent(key, oldValue, value);
				if (this._d_inited_)
					xuiDoc.updateText(this.$title);
				break;
			default:
				this.callParent(key, oldValue, value);
			}
		}
	});

	return cls;
});