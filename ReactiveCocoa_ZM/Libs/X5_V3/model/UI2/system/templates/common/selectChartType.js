define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var loadTreeJs = require("$UI/system/templates/index/loadTreeJs");
	var bind = require("bind");
	var templateService = require("$UI/system/templates/common/js/templateService");

	loadTreeJs($);
	var Model = function() {
		this.callParent();
		this.templateSelected = bind.observable(true);
		this.chartName = "";
		this.chartType = "";
	};

	Model.prototype._intTemplateTree = function(source) {
		$("#typeTree").jqxTree({
			source : source
		});
		$('#typeTree').jqxTree('collapseAll');
		var firstChild = $("#typeTree").find('li:first')[0];
		if (firstChild != null) {
			$('#typeTree').jqxTree('selectItem', firstChild);
			$('#typeTree').jqxTree('expandItem', firstChild);
		}
		var onSelect = function(event) {
			var args = event.args;
			var item = $('#typeTree').jqxTree('getItem', args.element);
			if (!item.hasItems) {
				this.chartName = item.value.split(",")[0];
				this.chartType = item.value.split(",")[1];
				this.comp("mainData").clear();
				this.comp("mainData").newData({
					defaultValues : [ {
						autoLoad : "true",
						chartName : this.chartName

					} ]
				});
				this.templateEngine.getConfig().current.mainData.chartName = this.chartName;
			}
		}
		$("#typeTree").on("select", onSelect.bind(this));
	}

	Model.prototype.modelLoad = function(event) {
		this.templateEngine = this.getParent().templateEngine;
		this.templateFile = this.getContext().getRequestParameter("templateFile");
		this.templateFilePath = this.templateEngine.templatePath + "/" + this.templateFile;
		var catalog = templateService.getChartTypeCatalog();
		this._intTemplateTree(catalog);
		this._recalcTreeHeight();
		var self = this;
		$(window).resize(function() {
			self._recalcTreeHeight();
		});
		this._imgScrollBtn();
	};

	Model.prototype.setData = function() {
		var config = this.templateEngine.getConfig();
		if(this.comp("dataid").value != config.current.mainData.dataId)
		this.comp("dataid").set({
			value : config.current.mainData.dataId
		});
		if (this.comp("columnData").getCount() != 0) {
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
				columns : v[i]
			});
		}
		this.comp("columnData").clear();
		this.comp("columnData").newData({
			defaultValues : defaultValues
		});
	}

	Model.prototype.validate = function(wizard) {
		var msg = "";
		return msg;
	};

	Model.prototype._imgScrollBtn = function() {
		var self = this;
		this.mouseoverImgCount = 0;
		$("#descriptionDiv").mouseover(function() {
			$(".lr-btn").show();
			if (self.mouseoverImgCount == 0) {
				self.mouseoverImgCount = 1;
			}
		});
		$("#descriptionDiv").mouseout(function() {
			$(".lr-btn").hide();
		});
	};

	Model.prototype.finish = function(wizard) {
		var data = this.comp("data");
		var chartData = [];
		var self = this;
		data.each(function(param) {
			var row = param.row;
			var groupTitle = data.getValue("groupTitle", row);
			var groupID = data.getValue("groupID", row);
			var typeID = data.getValue("typeID", row);
			var numID = data.getValue("numID", row);
			var metervalue = data.getValue("metervalue", row);
			var startTime = data.getValue("startTime", row);
			var endTime = data.getValue("endTime", row);
			var hrefAdr = data.getValue("hrefAdr", row);
			var hrefModel = data.getValue("hrefModel", row);
			var hrefTitle = data.getValue("hrefTitle", row);
			var chartName = self._isVisiable(self.chartName);
			var selectPieChart, selectMeterChart, selectGanttChart, selectDefaultChart
			switch (chartName) {
			case "piechart":
				selectPieChart = "piechart";
				break;
			case "meter":
				selectMeterChart = "meter";
				break;
			case "gantt":
				selectGanttChart = "gantt";
				break;
			default:
				selectDefaultChart = "other";
				break;
			}
			chartData.push({
				"groupTitle" : groupTitle,
				"groupID" : groupID,
				"typeID" : typeID,
				"numID" : numID,
				"dataID" : self.comp("dataid").value,
				"chart_type" : self.chartType,
				"chart_name" : self.chartName,
				"metervalue" : metervalue,
				"startTime" : startTime,
				"endTime" : endTime,
				"selectPieChart" : selectPieChart,
				"selectMeterChart" : selectMeterChart,
				"selectGanttChart" : selectGanttChart,
				"selectDefaultChart" : selectDefaultChart,
				"hrefAdr" : hrefAdr,
				"hrefModel" : hrefModel,
				"hrefTitle" : hrefTitle,
			});
		});

		this.templateEngine.addContext(this.templateFile, "chartData", chartData);
		this.templateEngine.addContext(this.templateFile, "data_Id", this.templateEngine.getConfig().current.mainData.dataId);
	};

	Model.prototype._recalcTreeHeight = function() {
		$('#typeTree').height($("body").height());
	};

	Model.prototype._isVisiable = function(option) {
		if (option != null || option != undefined) {
			if (option == "piechart") {
				return "piechart";
			} else if (option.indexOf("meter") > -1) {
				return "meter";
			} else if (option == "horizontalganttchart") {
				return "gantt";
			}
		}
		return "";
	}

	Model.prototype.showTitleChange = function(event) {
		if (event.checked) {
			$(".isShow").show();
		} else {
			$(".isShow").hide();
		}
	};

	return Model;
});