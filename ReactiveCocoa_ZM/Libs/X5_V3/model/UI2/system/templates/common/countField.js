define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	var Model = function() {
		this.callParent();
	};

	// 下拉
	Model.prototype.listFunctionType = function(event) {
		var list = [ 'SUM(求和)', 'AVG(求平均)', 'MAX(求最大值)', 'MIN(求最小值)', 'COUNT(求个数)' ];
		event.editor.jqxDropDownList({
			autoDropDownHeight : true,
			source : list
		});
	};

	Model.prototype.add = function(event) {
		var data = this.comp("data");
		var selectData = this.comp("selectData");
		if (data.getCount() == 0) {
			return;
		}
		selectData.newData({
			defaultValues : [ {
				selectField : data.getValue("rep_field"),
				countFunction : 'SUM(求和)',
				countFunctionValue : 'SUM'
			} ]
		});
		selectData.last();
		data.deleteData();
	};

	Model.prototype.del = function(event) {
		var data = this.comp("data");
		var groupData = this.comp("selectData");
		if (groupData == 0) {
			return;
		}
		data.newData({
			defaultValues : [ {
				rep_field : groupData.getValue("selectField")
			} ]
		});
		data.last();
		groupData.deleteData();
	};

	Model.prototype.addAll = function(event) {
		var data = this.comp("data");
		var groupData = this.comp("selectData");
		var defaultValues = [];
		data.each(function(param) {
			var row = param.row;
			defaultValues.push({
				selectField : data.getValue("rep_field", row),
				countFunction : 'SUM(求和)',
				countFunctionValue : 'SUM'
			});
		});
		groupData.newData({
			defaultValues : defaultValues
		})
		data.clear();
	};

	Model.prototype.delAll = function(event) {
		var data = this.comp("data");
		var groupData = this.comp("selectData");
		var defaultValues = [];
		groupData.each(function(param) {
			var row = param.row;
			defaultValues.push({
				rep_field : groupData.getValue("selectField", row)
			});
		});
		data.newData({
			defaultValues : defaultValues
		})
		groupData.clear();
	};

	Model.prototype.finish = function(wizard) {
		var selectData = this.comp("selectData");
		var select_data = [];
		selectData.each(function(param) {
			var row = param.row;
			select_data.push(selectData.getValue("selectField", row) + '-' + selectData.getValue("countFunctionValue", row));
		});
		return {
			selectcolumns : select_data.join(","),
			groupField : this.comp("groupField").val()
		}
	}

	Model.prototype.modelLoad = function(event) {
		this.templateEngine = this.getParent().templateEngine;
		this.config = this.templateEngine.getConfig();
		this.getField();
		this.comp("groupField").val("总计组(针对所有记录进行统计)");
	};

	Model.prototype.validate = function(wizard) {
		var msg = "";
		var data = this.comp("selectData");
		if (data.datas.get().length <= 0) {
			msg += "统计字段没有选择,"
		}
		return msg;
	}

	Model.prototype.getField = function() {
	
		var useField = this.config.current.mainData.repField;
		var gpfield = this.config.current.mainData.groupField;
		var data = this.comp("data");
		var groupData = this.comp("groupData");
		var selectData = this.comp("selectData");
		var count = data.datas.get().length + selectData.datas.get().length;
		if (useField.length != count) {
			if (data.datas.get().length != 0) {
				data.clear();
			}
			if (selectData.datas.get().length != 0) {
				selectData.clear();
			}
			data.newData({
				defaultValues : useField
			});
		}
		if (gpfield.length != groupData.datas.get().length) {
			if (groupData.datas.get().length != 0) {
				groupData.clear();
			}
			groupData.newData({
				defaultValues : [{
					gpfield : "总计组(针对所有记录进行统计)"
				}]
			})
			groupData.first();
			groupData.newData({
				defaultValues : gpfield
			});
		}
	};

	Model.prototype.dataIndexChanged = function(event) {
		var data = event.source;
		var config = this.templateEngine.getConfig();
		var report_data = [];
		data.each(function(param) {
			var row = param.row;
			var rep_field = data.getValue("rep_field", row);
			report_data.push({
				rep_field : rep_field
			});
		});
		config.current.mainData.repField = report_data;
	};

	Model.prototype.selectDataIndexChanged = function(event) {
		var data = event.source;
		var countFunctionValue = data.getValue("countFunction");
		switch (countFunctionValue) {
		case 'SUM(求和)':
			countFunctionValue = "SUM"
			break;
		case 'AVG(求平均)':
			countFunctionValue = "AVG"
			break;
		case 'MAX(求最大值)':
			countFunctionValue = "MAX"
			break;
		case 'MIN(求最小值)':
			countFunctionValue = "MIN"
			break;
		case 'COUNT(求个数)':
			countFunctionValue = "COUNT"
			break;
		}
		data.setValue("countFunctionValue", countFunctionValue);
	};

	return Model;
});