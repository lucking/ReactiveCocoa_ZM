/* ------------------------------------------------------------ 
表单模版处理

参数：
form[{
form_data
form_label
form_field}]
模版:
{{#each form}}<div component="$UI/system/components/justep/labelEdit/labelEdit"
	class="x-label-edit">
	<label class="x-label left" bind-text="$model.{{form_data}}.label('{{form_field}}')" />
	<div class="x-edit">
		<input class="form-control" component="$UI/system/components/justep/input/input"
			data="{{form_data}}" bind-ref="{{form_data}}.ref('{{form_field}}')" />
	</div>
</div>{{/each}}  
------------------------------------------------------------ */
	
define(function(require) {
	var $ = require("jquery");
	var Data = require("$UI/system/components/justep/data/data");
	var templateService = require("$UI/system/templates/common/js/templateService");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.modelLoad = function(event) {
		this.templateEngine = this.getParent().templateEngine;
		this.templateFile = this.getContext().getRequestParameter("templateFile");
		this.templateFilePath = this.templateEngine.templatePath + "/" + this.templateFile;
		this.dataId = "mainData";
		var self=this;
		var grid = this.getElementByXid('grid');
		var setVisible = function(){
			$(grid).css("visibility","visible");
		};
		var changeGridSize = function() {
			self._changeGridSize(grid);
			window.setTimeout(setVisible,5);
		};
		window.setTimeout(changeGridSize,5);
		$(window).resize(function(){changeGridSize();});
	}; 
	
	Model.prototype._changeGridSize = function(grid) {
		var height = $("body").height() - $('.form-navbar1').height() - $('.form-navbar2').height() - 30;
		var width = $("body").width() * 10 / 12 - 20;
		$(grid).jqxGrid({
			width : width,
			height : height
		});
	};

	Model.prototype.addClick = function(event) {
		var data = this.comp('formData');
		var mainDataConfig = this.templateEngine.getConfig().current.mainData;
		templateService.openSwtCommonSelectorDialog({
			title : "选择列", 
			templateFilePath : this.templateFilePath, 
			targetPath : this.templateEngine.getTargetPath(), 
			concept : mainDataConfig.concept,
			reader : mainDataConfig.reader,
			writer : mainDataConfig.writer,
			creator : mainDataConfig.creator,
			relations : mainDataConfig.relations,
			datasource : {mutiSelect : true, method : "RuleRelationDatasource.getDatasource"}}, 
			function(result) {
				for ( var i = 0; i < result.length; i++) {
					result[i].colEditor = 'input';
					result[i].index = i;
					result[i].labelName = result[i].label;
				}
				data.clear();
				if(result.length>0){
					data.newData({
						defaultValues : result
					});
				}
			});

		var grid = this.getElementByXid('grid');
		//设置隐藏
		$(grid).jqxGrid('sortby', 'index', 'asc');
		$(grid).jqxGrid('setcolumnproperty', 'name', 'editable', false);
		$(grid).jqxGrid('setcolumnproperty', 'data-type', 'editable', false);
		$(grid).jqxGrid('setcolumnproperty', 'labelName', 'editable', false);
	};
	
	Model.prototype.deleteClick = function(event) {
		var data = this.comp('formData');
		var xid = data.val("name");
		data.deleteData();
	};

	Model.prototype.upClick = function(event) {
		this._upOrDownMove('up');
	};

	Model.prototype.downClick = function(event) {
		this._upOrDownMove('down');
	};

	Model.prototype._upOrDownMove = function(direction) {
		var data = this.comp('formData');
		var grid = this.getElementByXid('grid'), $grid = $(grid), cindex = $grid.jqxGrid('selectedrowindex'),
		// rows = $grid.jqxGrid('getrows');
		// 排序后实际看的的顺序行
		rows = $grid.jqxGrid('getdisplayrows'), orowid = null;
		// 排序后实际看到的排序索引
		var cShowIndex = $grid.jqxGrid('getrowdatabyid', cindex).index;
		$grid.jqxGrid('selectrow', cindex);
		if (direction == 'up') {
			if (cShowIndex == 0) {
				return;
			}
			for ( var i = rows.length - 1; i >= 0; i--) {
				if (rows[i].index < cShowIndex) {
					orowid = rows[i].uid;
					break;
				}
			}
			// orowid = rows[cShowIndex-1].uid;
		} else if (direction == 'down') {
			if (cShowIndex == rows[rows.length - 1].index) {
				return;
			}
			for ( var i = 0; i < rows.length; i++) {
				if (rows[i].index > cShowIndex) {
					orowid = rows[i].uid;
					break;
				}
			}
			// orowid = rows[cShowIndex+1].uid;
		}
		var cid = $grid.jqxGrid('getcellvalue', cindex, "name"), oid = $grid.jqxGrid('getcellvaluebyid', orowid, "name");
		var cIndex = data.getValueByID('index', cid);
		var oIndex = data.getValueByID('index', oid);
		data.setValueByID('index', oIndex, cid);
		data.setValueByID('index', cIndex, oid);
		$grid.jqxGrid('selectrow', cindex);
	};
	
	Model.prototype.modelUnLoad = function(event) {

	};
	// 下拉
	Model.prototype.gridColEditor = function(event) {
		var list = [ 'input','password','range','output','textarea' ];
		event.editor.jqxDropDownList({
			autoDropDownHeight : true,
			source : list
		});
	};
	
		//外部引用概念
	Model.prototype.gridColIsSelectDataID = function(event) {
		var currentDatas = this.templateEngine.getConfig().current.datas;
		var list = [''];
		for(var d in currentDatas){
			list.push(d);
		}
		event.editor.jqxDropDownList({
			autoDropDownHeight : true,
			source : list
		});
	};
	
	//外键ID
	Model.prototype.gridColIsRefID = function(event) {
		var mainDataRelations = this.templateEngine.getConfig().current.mainData.relations;
		if(mainDataRelations != null) {
			var list = mainDataRelations.split(',');
			list.unshift('');
			event.editor.jqxDropDownList({
				autoDropDownHeight : true,
				source : list
			});
		}
	};
	//外部引用列
	Model.prototype.gridColIsSelectLabelName = function(event) {
		var self = this;
		event.editor.on('open', function (openEvent) {
			var currentDatas = self.templateEngine.getConfig().current.datas;
			var data = self.comp('formData');
			var list = [];
			for(var cds in currentDatas){
				if(cds == data.val("selectDataID") && currentDatas[cds].relations != null){
					list = currentDatas[cds].relations.split(',');
					list.unshift('');
					break;
				}
			};
			event.editor.jqxDropDownList({
				autoDropDownHeight : true,
				source : list
			});
		});
	};
	
	Model.prototype.getConceptByData = function(data,row) {
		var currentDatas = this.templateEngine.getConfig().current.datas;
		for(var cds in currentDatas){
			if(cds == data.val("selectDataID",row)){
				return currentDatas[cds].concept;
			}
		};
	};
	
	
	/** 页面显示之前调用的方法--框架调用 */
	Model.prototype.beforeOpen = function() {

	};

	Model.prototype.validate = function(wizard) {
		var msg = "";
		var data = this.comp('formData');
		var input = this.comp('titleInput');
		var title = input.val();
		var self = this;
		if (data.datas.get().length <= 0) {
			msg += "详细页没有数据，\n";
		}if (!title || "" == title.trim()) {
			msg += "详细页没有输入标题，\n";
		}
		data.each(function(param) {
			var row = param.row;
			var currentName = data.val("name",row);
			var refID = data.val("refID",row);
			var selectDataID = data.val("selectDataID",row);
			var selectLabelName = data.val("selectLabelName",row);
			if(selectDataID != ""){
				if(refID == ""){
					msg += "‘关系名称’ 为   '" + currentName +"' 的列     '对应ID'  不能为空\n"; 
				}
				if(selectLabelName == ""){
					msg += "‘关系名称’ 为   '" + currentName +"' 的列     '关联列名'  不能为空\n";
				}
			}
		});
		return msg;
	};

	Model.prototype.finish = function(wizard) {
		var data = this.comp('formData');
		var form = [];
		var dataId = this.dataId;
		var self = this;
		data.each(function(param) {
			var row = param.row;
			var field = data.getValue("name", row);
			var refID = data.val("refID",row);
			var selectDataID = data.val("selectDataID",row);
			var selectLabelName = data.val("selectLabelName",row);
			var selectConcept = self.getConceptByData(data,row);
			var form_password,form_range,form_output,form_textarea,form_input;
			var colEditor = data.val("colEditor",row);
			switch(colEditor){
				case "password":
					form_password =  "form_password";
					break;
				case "range":
					form_range = "form_range";
					break;
				case "output":
					form_output = "form_output";
					break;
				case "textarea":
					form_textarea = "form_textarea";
					break;
				case "input":
					form_input =  "form_input";
			}
			form.push({
				"form_field": field,
				"form_data": dataId,
				"form_refID": refID,
				"form_selectDataID": selectDataID,
				"form_selectLabelName": selectLabelName,
				"form_selectConcept": selectConcept,
				"form_input":form_input,
				"form_password":form_password,
				"form_range":form_range,
				"form_output":form_output,
				"form_textarea":form_textarea
			});
		});
		
		this.templateEngine.addContext(this.templateFile, "form", form);
		this.templateEngine.addContext(this.templateFile, "form_title", this.comp("titleInput").value);
		this.templateEngine.addContext(this.templateFile, "form_data", dataId);
	};

	Model.prototype.input1Change = function(event) {
		/* TODO:
		templateService.set("listHeader", {
			title : event.source.val()
		});
		*/
	};
	return Model;
});
