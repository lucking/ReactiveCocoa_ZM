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
//		this.bizDataCount = 1;
		var data = this.comp('mainData');
		data.newData({
			defaultValues : [ {
				dataId : "reportData",
				canDelete : "false",
				id : "id1"
			} ]
		});
		data.first();
		this.templateEngine.getConfig().current = this.templateEngine.getConfig().current || {};
		this.templateEngine.getConfig().current.mainData = this.templateEngine.getConfig().current.mainData || {};
		this.templateEngine.getConfig().current.mainData.dataId = 'reportData'
		this._recalcHeight();
		var self = this;
		$(window).resize(function() {
			self._recalcHeight();
		});
	};

	Model.prototype.openXuiPropertyEditorDlg = function(propertyName, setPropertyNames) {
		var data = this.comp('mainData');
		var config = this.templateEngine.getConfig();
		templateService.openXuiPropertyEditorDlg({
			templateFilePath : this.templateFilePath,
			targetPath : this.templateEngine.getTargetPath(),
			propName : propertyName,
			dataId : data.val("dataId") || "",
			concept : data.val("concept") || "",
			reader : data.val("reader") || "",
			writer : data.val("writer") || "",
			creator : data.val("creator") || "",
			relations : data.val("columns") || ""
		}, function(result) {
			config.current = config.current || {};
			config.current.mainData = config.current.mainData || {};
			if (setPropertyNames) {
				for ( var i = 0; i < setPropertyNames.length; i += 1) {
					var value = result[setPropertyNames[i]] || "";
					data.setValue(setPropertyNames[i], value);
					config.current.mainData[setPropertyNames[i]] = value;
				}
			} else {
				var value = result[propertyName] || "";
				data.setValue(propertyName, value);
				config.current.mainData[propertyName] = value;
			}
		});
	};

	Model.prototype.selectReaderBtnClick = function(event) {
		this.openXuiPropertyEditorDlg("reader");
	};

	Model.prototype.selectRelationsBtnClick = function(event) {
		this.openXuiPropertyEditorDlg("columns");
	};

	/** 校验方法，如果校验不通过返回错误提示--框架调用 */
	Model.prototype.validate = function(wizard) {
		var data = this.comp('mainData');
		var msg = "";
		data.each(function(param) {
			var row = param.row;
			var dataId = data.getValue("dataId", row);
			var dataType = data.getValue("dataType", row);
			var reader = data.getValue("reader", row);
			var columns = data.getValue("columns", row);
			
				if (!dataId || "" == dataId.trim()) {
					msg += "数据集名称不能为空";
				}
				if (!dataType || "" == dataType.trim()) {
					msg += "数据源类型不能为空";
				}
				if (!reader || "" == reader.trim()){
					msg += "action不能为空";
					}
					if (!columns || "" == columns.trim()){
					msg += "业务字段不能为空";
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
			var dataType = data.getValue("dataType", row);
			var reader = data.getValue("reader", row);
			var relations = data.getValue("columns", row);
			datas.push({
				"data_xid" : xid,
				"dataType" : dataType,
				"data_action" : self.comp("action").val(),
				"reader" : reader,
				"data_relations" : relations,
			});
		});
		this.templateEngine.addContext(this.templateFile, "datas", datas);
	};

	Model.prototype.mainDataValueChange = function(event) {
		var dataValue = this.comp("mainData").getValue("reader");
		var config = this.templateEngine.getConfig(); 
		config.current = config.current || {};
		config.current.mainData = config.current.mainData || {};
		config.current.mainData.dataId = this.comp("mainData").getValue("dataId");
		if (dataValue) {
			var v = dataValue.split("/");
			this.comp("action").val(v[v.length - 1]);
		}
	};

	Model.prototype.columnsChange = function(event){
		var config = this.templateEngine.getConfig(); 
		config.current = config.current || {};
		config.current.mainData = config.current.mainData || {};
		config.current.mainData.columns = event.source.value;
	};


	return Model;
});
