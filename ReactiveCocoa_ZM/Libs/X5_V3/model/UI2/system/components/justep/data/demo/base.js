/*! 
 * X5 v3 (htttp://www.justep.com) 
 * Copyright 2014 Justep, Inc.
 * Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
 */
define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var Message = require("$UI/system/components/justep/common/common");
	var Model = function() {
		this.callParent();
		this.isVisible = Message.flag;
	};

	Model.prototype.modelLoad = function(event) {
		var masterData = this.comp('masterData');
		$.getJSON(require.toUrl('./base.json'), function(data) {
			masterData.newData({
				defaultValues : data
			})
		});
	};

	Model.prototype.showBizDataSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/justep/data/demo/base.w&xid=masterData"
		});
	};

	Model.prototype.showJsSource = function(event) {
		this.comp("windowDialog").open({
			data : "system/components/justep/data/demo/base.js"
		});
	};

	return Model;
});