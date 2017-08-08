/* ------------------------------------------------------------ 
数据模版处理

参数：
datas[{
data_xid
data_concept
data_orderBy
data_reader
data_writer
data_creator
data_relations
datas}]
模版:
{{#each datas}}<div component="$UI/system/components/justep/data/bizData" xid="{{data_xid}}"
	directDelete="true" autoLoad="true" concept="{{data_concept}}" orderBy="{{data_orderBy}}" relations="{{data_relations}}"
	onSaveCommit="saveCommit">
	<reader action="{{data_reader}}" />
	<writer action="{{data_writer}}" />
	<creator action="{{data_creator}}" />
	<calculateRelation relation="calcCheckBox" />
</div>{{/each}}
------------------------------------------------------------ */

define(function(require) {
	var $ = require("jquery");
	var templateService = require("$UI/system/templates/common/js/templateService");
	var Data = require("$UI/system/components/justep/data/data");
	var Model = function() {
		this.callParent();
	};

	Model.prototype._recalcHeight = function() {
		var height = $("body").height() - $('.nav-row').height();
		$('.data-nav').height(height);
		$('.data-form').height(height);
	};

	Model.prototype.modelLoad = function(event) {
		this.templateEngine = this.getParent().templateEngine;
		this.templateFile = this.getContext().getRequestParameter("templateFile");
		this.templateFilePath = this.templateEngine.templatePath + "/" + this.templateFile;
		this.bizDataCount = 1;
		var data = this.comp('mainData');
		data.newData({
			defaultValues : [ {
				dataId : "mainData",
				canDelete : "false",
				id : "id1"
			} ]
		});
		data.first();

		this._recalcHeight();
		var self = this;
		$(window).resize(function() {
			self._recalcHeight();
		});
	};

	Model.prototype.openXuiPropertyEditorDlg = function(propertyName, setPropertyNames) {
		var data = this.comp('mainData');
		var isMainData = data.val("dataId") == "mainData";
		var config = this.templateEngine.getConfig();
		templateService.openXuiPropertyEditorDlg({
			templateFilePath : this.templateFilePath,
			targetPath : this.templateEngine.getTargetPath(),
			propName : propertyName,
			dataId : data.val("dataId")||"",
			concept : data.val("concept")||"",
			reader : data.val("reader")||"",
			writer : data.val("writer")||"",
			creator : data.val("creator")||"",
			relations : data.val("columns")||""
		}, function(result) {
			config.current = config.current || {};
			config.current.mainData = config.current.mainData || {};
			config.current.datas = config.current.datas || {};
			if (setPropertyNames) {
				for ( var i = 0; i < setPropertyNames.length; i += 1) {
					var value = result[setPropertyNames[i]] || "";
					data.setValue(setPropertyNames[i], value);
					if (isMainData) {
						config.current.mainData[setPropertyNames[i]] = value;
					} else {
						// this.currentDataId = data.val("dataId");
						this.currentDataId = data.val("id");
						var id = this.currentDataId;
						config.current.datas[id] = config.current.datas[id] || {};
						config.current.datas[id][setPropertyNames[i]] = value;
						config.current.datas[id]["dataId"] = data.val("dataId");
					}

				}
			} else {
				var value = result[propertyName] || "";
				data.setValue(propertyName, value);
				if (isMainData) {
					config.current.mainData[propertyName] = value;
				} else {
					config.current.datas[this.currentDataId][propertyName] = value;
				}
			}
		});
	};

	Model.prototype.selectConceptBtnClick = function(event) {
		this.openXuiPropertyEditorDlg("concept", [ "concept", "creator", "reader", "writer" ]);
	};

	Model.prototype.selectReaderBtnClick = function(event) {
		this.openXuiPropertyEditorDlg("reader");
	};

	Model.prototype.selectWriterBtnClick = function(event) {
		this.openXuiPropertyEditorDlg("writer");
	};

	Model.prototype.selectCreatorBtnClick = function(event) {
		this.openXuiPropertyEditorDlg("creator");
	};

	Model.prototype.selectRelationsBtnClick = function(event) {
		this.openXuiPropertyEditorDlg("columns");
	};

	var idIdx = 0;
	Model.prototype.addDataBtnClick = function(event) {
		var data = this.comp('mainData');
		data.newData({
			defaultValues : [ {
				autoLoad : "true",
				dataId : "bizData" + this.bizDataCount++,
				id : "id_" + (idIdx++)
			} ]
		});
	};

	Model.prototype.deleteDataBtnClick = function(event) {
		var data = this.comp('mainData');
		var dataId = data.val("dataId");
		var id = data.getValue("id");
		if (data.val("dataId") == 'mainData') {
			alert("主数据不能删除!");
			return;
		}
		data.deleteData();
//		templateService.getXuiDoc().deleteComponent([ dataId ], this.templateFilePath);
		delete this.templateEngine.getConfig().current.datas[id];
	};

	Model.prototype.input11Change = function(event) {

	};

	Model.prototype.pageClick = function(event) {
		var data = this.comp("mainData");
		data.to(data.getRowID(event.bindingContext.$object));
		if (data.val("dataId") != "mainData")
			this.currentDataId = data.val("dataId");
	};

	/** 校验方法，如果校验不通过返回错误提示--框架调用 */
	Model.prototype.validate = function(wizard) {
		var data = this.comp('mainData');
		var msg = "";
		data.each(function(param) {
			var row = param.row;
			var parentRelation = data.getValue("parentRelation", row), isTree = data.getValue("isTree", row);
			var isDetail = data.getValue("isDetail", row);
			var masterData = data.getValue("masterData", row);
			var masterColumn = data.getValue("masterColumn", row);
			if (isDetail && isDetail == true) {
				if (!masterData || "" == masterData.trim()) {
					msg += "数据为从表数据时，master-data不能为空";
				}
				if (!masterColumn || "" == masterColumn.trim()) {
					msg += "数据为从表时，master-column不能为空";
				}
			}
			if (isTree && isTree == true) {
				if (!parentRelation || "" == parentRelation.trim())
					msg += "树形显示时主数据parent-relation不能为空，";
			}
		});
		if (!data.isValid()) {
			return data.getInvalidInfo();
		}
		return msg;
	};

	/** 完成时操作--框架调用 */
	Model.prototype.finish = function(wizard) {
		var data = this.comp('mainData');
		var datas = [];
		var self = this;
		data.each(function(param) {
			var row = param.row;
			// var id = data.getValue("id",row)
			var xid = data.getValue("dataId", row);
			var concept = data.getValue("concept", row);
			var orderBy = ""; // TODO: data.getValue("orderBy", row);
			var reader = data.getValue("reader", row);
			var writer = data.getValue("writer", row);
			var creator = data.getValue("creator", row);
			var relations = data.getValue("columns", row);
			var isTree = data.getValue("isTree", row);
			var parentRelation = data.getValue("parentRelation", row);
			var nodeKindRelation = data.getValue("nodeKindRelation", row);
			var nodeLevelRelation = data.getValue("nodeLevelRelation", row);
			var rootFilter = data.getValue("rootFilter", row);
			var masterData = data.getValue("masterData", row);
			var masterColumn = data.getValue("masterColumn", row);
			datas.push({
				"data_xid" : xid,
				"data_concept" : concept,
				"data_orderBy" : "",
				"data_reader" : reader,
				"data_writer" : writer,
				"data_creator" : creator,
				"data_relations" : relations,
				"data_isTree" : isTree,
				"data_parentRelation" : parentRelation,
				"data_nodeKindRelation" : nodeKindRelation,
				"data_nodeLevelRelation" : nodeLevelRelation,
				"data_rootFilter" : rootFilter,
				"masterData" : masterData,
				"masterColumn" : masterColumn
			});
		});
		this.templateEngine.addContext(this.templateFile, "datas", datas);
	};

	Model.prototype.isTreeChange = function(event) {
		var data = this.comp('mainData');
		data.setValue('isTree', event.checked);
		if (event.checked) {
			$(".tree").show();
		} else {
			$(".tree").hide();
		}
	};

	Model.prototype._addSelectData = function() {
		var id = this.comp('mainData').getValue("id");
		var dataId = this.comp('mainData').getValue("dataId");
		var mainDataRelations = (dataId == "mainData") ? this.templateEngine.getConfig().current.mainData.columns : this.templateEngine.getConfig().current.datas[id].columns;
		// var mainDataRelations =
		// this.templateEngine.getConfig().current.mainData.relations;
		var data = this.comp("treeConfigData");
		if (mainDataRelations != null) {
			var list = mainDataRelations.split(',');
			list.unshift('');
			if (list.length != data.datas.get().length) {
				var result = [];
				for ( var i = 0; i < list.length; i++) {
					result.push({
						"xid" : Data.UUID(),
						"name" : list[i]
					});
				}
				data.clear();
				if (result.length > 0) {
					data.newData({
						defaultValues : result
					});
				}
			}

		} else {
			data.clear();
		}
	};

	Model.prototype.select1Click = function(event) {
		this._addSelectData();
	};

	Model.prototype.select4Click = function(event) {
		this._addSelectData();
	};

	Model.prototype.select5Click = function(event) {
		this._addSelectData();
	};

	Model.prototype.select6Click = function(event) {
		this._addSelectData();
	};

	Model.prototype.isDetailChange = function(event) {
		var data = this.comp('mainData');
		data.setValue('isDetail', event.checked);
		if (event.checked) {
			$(".detail").show();
		} else {
			$(".detail").hide();
		}
	};

	Model.prototype.select2Click = function(event) {
		this._addSelectData()
	};

	Model.prototype.mainDataValueChange = function(event) {
		var id = this.comp("mainData").getValue("id");
		try {
			if (id != "mainData" && this.templateEngine.getConfig().current.datas[id] != undefined) {
				this.templateEngine.getConfig().current.datas[id]['dataId'] = this.comp("dataId").val();
			}
		} catch (e) {
			// alert("请先选择数据概念！")
		}
	};

	Model.prototype.show = function() {
		var temp = this.comp("mainData").getValue("master-column");
		var temp1 = this.comp("mainData").getValue("dataId");
		alert(temp1 + "--" + temp);
	}

	return Model;
});
