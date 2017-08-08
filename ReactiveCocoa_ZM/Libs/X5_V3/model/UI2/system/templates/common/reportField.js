define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	var Model = function() {
		this.callParent();
		this.rows = [];
	};

	Model.prototype.modelLoad = function(event) {
		this.templateEngine = this.getParent().templateEngine;
		var config = this.templateEngine.getConfig();
		this.dataId = config.current.mainData.dataId;
		this.setData();
	};

	Model.prototype.setData = function() {
		var config = this.templateEngine.getConfig();
		if (this.comp("data").getCount() != 0) {
			return;
		}
		var s = config.current.mainData.columns;
		var dataId = config.current.mainData.dataId;
		var defaultValues = [];
		var v = [];
		if (s == undefined) {
			return;
		}
		v = s.split(",");
		for ( var i = 0; i < v.length; i++) {
			defaultValues.push({
				field : v[i],
				isTrue : "true",
			});
		}
		this.comp("data").clear();
		this.comp("data").newData({
			autoLoad : 'true',
			defaultValues : defaultValues
		});
	};
	
	Model.prototype.validate = function(wizard) {
		var msg = "";
		var data = this.comp("reportData");
		if (data.datas.get().length <= 0) {
			msg += "报表字段没有选择,"
		}
		return msg;
	}
	
	Model.prototype.aa = function() {
		alert("reportField")
	}
	
	Model.prototype.add = function(event) {
		var data = this.comp("data");
		var reportData = this.comp("reportData");
		if (data.getCount() == 0) {
			return;
		}
		reportData.newData({
			defaultValues : [ {
				rep_field : data.getValue("field")
			} ]
		});
		reportData.last();
		data.deleteData();

	};
	
	Model.prototype.finish = function(wizard) {
		
	}
	
	Model.prototype.del = function(event) {
		var data = this.comp("data");
		var reportData = this.comp("reportData");
		if (reportData.getCount() == 0) {
			return;
		}
		data.newData({
			defaultValues : [ {
				field : reportData.getValue("rep_field")
			} ]
		});
		data.last();
		reportData.deleteData();
	};

	Model.prototype.addAll = function(event) {
		var data = this.comp("data");
		var reportData = this.comp("reportData");
		var defaultValues = [];
		data.each(function(param) {
			var row = param.row;
			defaultValues.push({
				rep_field : data.getValue("field", row)
			});
		});
		reportData.newData({
			defaultValues : defaultValues
		})
		data.clear();
	};

	Model.prototype.delAll = function(event) {
		var data = this.comp("data");
		var reportData = this.comp("reportData");
		var defaultValues = [];
		reportData.each(function(param) {
			var row = param.row;
			defaultValues.push({
				field : reportData.getValue("rep_field", row)
			});
		});
		data.newData({
			defaultValues : defaultValues
		})
		reportData.clear();
	};

	Model.prototype.reportDataIndexChanged = function(event){
		var reportData = event.source;
		var config = this.templateEngine.getConfig();
		var report_data = [];
		reportData.each(function(param) {
			var row = param.row;
			var rep_field = reportData.getValue("rep_field",row);
			report_data.push({rep_field : rep_field});
		});
		config.current.mainData.reportField = report_data;
	};

	return Model;
});