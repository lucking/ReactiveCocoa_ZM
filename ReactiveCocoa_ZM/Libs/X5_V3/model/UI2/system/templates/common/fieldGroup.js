define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	var Model = function() {
		this.callParent();
	};

	// 下拉
	Model.prototype.gridColEditor = function(event) {
		var list = [ 'input', 'password', 'range', 'output', 'textarea' ];
		event.editor.jqxDropDownList({
			autoDropDownHeight : true,
			source : list
		});
	};

	Model.prototype.add = function(event) {
		var data = this.comp("data");
		var groupData = this.comp("groupData");
		if (data.getCount() == 0) {
			return;
		}
		groupData.newData({
			defaultValues : [ {
				groupField : data.getValue("rep_field")
			} ]
		});
		groupData.last();
		data.deleteData();
	};

	Model.prototype.del = function(event) {
		var data = this.comp("data");
		var groupData = this.comp("groupData");
		if (groupData == 0) {
			return;
		}
		data.newData({
			defaultValues : [ {
				rep_field : groupData.getValue("groupField")
			} ]
		});
		data.last();
		groupData.deleteData();
	};

	Model.prototype.addAll = function(event) {
		var data = this.comp("data");
		var groupData = this.comp("groupData");
		var defaultValues = [];
		data.each(function(param) {
			var row = param.row;
			defaultValues.push({
				groupField : data.getValue("rep_field", row)
			});
		});
		groupData.newData({
			defaultValues : defaultValues
		})
		data.clear();
	};

	Model.prototype.delAll = function(event) {
		var data = this.comp("data");
		var groupData = this.comp("groupData");
		var defaultValues = [];
		groupData.each(function(param) {
			var row = param.row;
			defaultValues.push({
				rep_field : groupData.getValue("groupField", row)
			});
		});
		data.newData({
			defaultValues : defaultValues
		})
		groupData.clear();
	};

	Model.prototype.finish = function(wizard) {
		var groupData = this.comp("groupData");
		var group_data = [];
		groupData.each(function(param) {
			var row = param.row;
			group_data.push(groupData.getValue("groupField", row));
		});
		return {
			groupcolumns : group_data.join(",")
		}
	}

	Model.prototype.modelLoad = function(event) {
		this.templateEngine = this.getParent().templateEngine;
		this.config = this.templateEngine.getConfig();
		this.getField();
	};

	Model.prototype.validate = function(wizard) {
		var msg = "";
		var data = this.comp("groupData");
		if (data.datas.get().length <= 0) {
			msg += "分组字段没有选择,"
		}
		return msg;
	}

	Model.prototype.getField = function() {
		var useField = this.config.current.mainData.reportField;
		var data = this.comp("data");
		var groupData = this.comp("groupData");
		var count = data.datas.get().length + groupData.datas.get().length;
		if (count != useField.length) {
			if (data.datas.get().length != 0) {
				data.clear();
			}
			if (groupData.datas.get().length != 0) {
				groupData.clear();

			}
		}else {
			return "";
		}
		data.newData({
			defaultValues : useField
		});
	}

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

	Model.prototype.groupDataIndexChanged = function(event) {
		var data = event.source;
		var config = this.templateEngine.getConfig();
		var groupdata = [];
		data.each(function(param) {
			var row = param.row;
			var gp_field = data.getValue("groupField", row);
			groupdata.push({
				gpfield : gp_field
			});
		});
		config.current.mainData.groupField = groupdata;
	};

	return Model;
});