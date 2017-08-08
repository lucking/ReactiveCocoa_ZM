define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.addCell = function(event) {
		var data = this.comp("data");
		var cellData = this.comp("cellData");
		if (data.datas.get().length == 0) {
			return "";
		}
		cellData.newData({
			defaultValues : [ {
				cellField : data.getValue("useField")
			} ]
		})
	};

	Model.prototype.cellFieldDel = function(event) {
		var cellData = this.comp("cellData");
		if (cellData.datas.get().length != 0)
			cellData.deleteData();
	};

	Model.prototype.addRow = function(event) {
		var data = this.comp("data");
		var rowData = this.comp("rowData");
		if (data.datas.get().length == 0) {
			return "";
		}
		rowData.newData({
			defaultValues : [ {
				rowField : data.getValue("useField")
			} ]
		})
	};

	Model.prototype.addCount = function(event) {
		var data = this.comp("data");
		var countData = this.comp("countData");
		if (data.datas.get().length == 0) {
			return "";
		}
		countData.newData({
			defaultValues : [ {
				countField : data.getValue("useField"),
			} ]
		})
	};

	Model.prototype.rowFieldDel = function(event) {
		var rowData = this.comp("rowData");
		if (rowData.datas.get().length > 0) {
			rowData.deleteData();
		}
	};

	Model.prototype.countFieldDel = function(event) {
		var countData = this.comp("countData");
		if (countData.datas.get().length) {
			countData.deleteData();
		}
	};

	Model.prototype.validate = function(wizard) {
		var msg = "";
		var countData = this.comp("countData");
		if (countData.datas.get().length <= 0) {
			msg += "统计字段不能为空。\n";
		}
		return msg;
	};

	Model.prototype.finish = function(wizard) {
		var cellData = this.comp("cellData");
		var rowData = this.comp("rowData");
		var countData = this.comp("countData");
		var cell_data = [];
		var row_data = [];
		var count_data = [];
		var options = {};
		cellData.each(function(param) {
			var row = param.row;
			cell_data.push(cellData.getValue("cellField", row))
		});
		rowData.each(function(param) {
			var row = param.row;
			row_data.push(rowData.getValue("rowField", row));
		});
		countData.each(function(param) {
			var row = param.row;
			if (countData.getValue("countType", row) == undefined) {
				count_data.push(countData.getValue("countField", row));
			} else {
				count_data.push(countData.getValue("countField", row) + "-" + countData.getValue("countTypeValue", row));
			}
		});
		if (this.comp("rowCount").val() == "true") {
			options.rowCount = "true"
		}
		if (this.comp("cellCount").val() == "true") {
			options.cellCount = "true"
		}
		options.dataId = this.templateEngine.getConfig().current.mainData.dataId;
		options.crossCellField = cell_data.join(",");
		options.crossRowField = row_data.join(",");
		options.crossCountField = count_data.join(",");
		options.title = "交叉报表";
		options.excelName = "/"+this.templateEngine.targetFileName+"Report.xlsx";
		options.excelType = "crossReport";
		 this.createExcel(options);
		 this.templateEngine.addContext(this.templateFile, "fileName", this.templateEngine.targetFileName+"Report");
	};

	Model.prototype.createExcel = function(options) {
		var targetPath = this.templateEngine.targetPath;
		var realPath = targetPath.substring(0, targetPath.indexOf('UI2')) + "UI2/system/templates/report/grid/template";
		var url = require.toUrl("$UI/system/templates/report/server/createGridExcel.j");
		var data = {
			dataId : options.dataId,
			title : options.title,
			pathname : targetPath + options.excelName,
			excelType : options.excelType,
			crossCellField : options.crossCellField,
			crossRowField : options.crossRowField,
			crossCountField : options.crossCountField,
			isRowCount : options.rowCount,
			isCellCount : options.cellCount
		};

		$.post(url, data, function(data) {
			alert(data)
		});
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
				useField : v[i],
			});
		}
		this.comp("data").clear();
		this.comp("data").newData({
			autoLoad : 'true',
			defaultValues : defaultValues
		});
	};

	Model.prototype.listFunctionType = function(event) {
		var list = [ 'SUM(求和)', 'AVG(求平均)', 'MAX(求最大值)', 'MIN(求最小值)', 'COUNT(求个数)' ];
		event.editor.jqxDropDownList({
			autoDropDownHeight : true,
			source : list
		});
	};

	Model.prototype.countDataValueChanged = function(event) {
		var data = event.source;
		var countFunctionValue = data.getValue("countType");
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
		data.setValue("countTypeValue", countFunctionValue);
	};

	Model.prototype.modelLoad = function(event) {
		this.templateEngine = this.getParent().templateEngine;
		this.templateFile = this.getContext().getRequestParameter("templateFile");
		var config = this.templateEngine.getConfig();
		this.dataId = config.current.mainData.dataId;
		this.setData();
	};

	return Model;
});