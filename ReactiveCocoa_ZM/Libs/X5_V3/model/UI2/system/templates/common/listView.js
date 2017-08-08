/* ------------------------------------------------------------ 
列表模版处理

参数：
list[{
list_data
list_field1
list_field1Format
list_field2
list_field2Format}]
模版:
{{#each list}}<div class="x-row">
	<div class="x-col">
		<span class="font-bold x-output" component="$UI/system/components/justep/output/output"
			data="{{list_data}}" format="{{list_field1Format}}" bind-ref="ref('{{list_field1}}')" />
	</div>
	<div class="x-col" style="text-align:right;color:gray">
		<span class="x-output" component="$UI/system/components/justep/output/output"
			data="{{list_data}}" format="{{list_field2Format}}" bind-ref="ref('{{list_field2}}')" />
	</div>
</div>{{/each}} 
------------------------------------------------------------ */
	
define(function(require) {
	var $ = require("jquery");
	var Data = require("$UI/system/components/justep/data/data");
	var templateService = require("$UI/system/templates/common/js/templateService");

	var Model = function() {
		this.callParent();
		window.pageModel = this;
	};
	
	Model.prototype.modelLoad = function(event){
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
		var height = $("body").height() - $('.list-navbar1').height() - $('.list-navbar2').height() - 30;
		var width = $("body").width() * 10 / 12 - 20;
		$(grid).jqxGrid({
			width : width,
			height : height
		});
	};
	       
	Model.prototype.addClick = function(event) {
		var data = this.comp('listData');
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
					result[i].xid = Data.UUID();
					result[i].colEditor = 'ed';
					result[i].isVisible = '是';
					result[i].index = i;
					result[i].labelName = result[i].label;
				}
				data.clear();
				if (result.length > 0) {
					data.newData({
						defaultValues : result
					});
				}
			});
		var grid = this.getElementByXid('grid');
		$(grid).jqxGrid('sortby', 'index', 'asc');
		$(grid).jqxGrid('setcolumnproperty', 'name', 'editable', false);
		$(grid).jqxGrid('setcolumnproperty', 'data-type', 'editable', false);
		$(grid).jqxGrid('setcolumnproperty', 'labelName', 'editable', false);
	};
	Model.prototype.deleteClick = function(event) {
		var data = this.comp('listData');
		var xid = data.val("xid");
		data.deleteData();
	};

	Model.prototype.upClick = function(event) {
		this._upOrDownMove('up');
	};

	Model.prototype.downClick = function(event) {
		this._upOrDownMove('down');
	};
	
	Model.prototype._upOrDownMove = function (direction) {
		var data = this.comp('listData');
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
		var cid = $grid.jqxGrid('getcellvalue', cindex, "xid"), oid = $grid
				.jqxGrid('getcellvaluebyid', orowid, "xid");
		var cIndex = data.getValueByID('index', cid);
		var oIndex = data.getValueByID('index', oid); 
		data.setValueByID('index', oIndex, cid);
		data.setValueByID('index', cIndex, oid);
		$grid.jqxGrid('selectrow', cindex);
	}

	Model.prototype.modelUnLoad = function(event) {

	};
	// 下拉
	Model.prototype.gridColEditor = function(event) {
		var list = [ '','ed', 'ro', 'date', 'datetime', 'ch', 'html', 'inputbtn' ];
		event.editor.jqxDropDownList({
			autoDropDownHeight : true,
			source : list
		});
	};

	// 下拉
	Model.prototype.gridColIsVisible = function(event) {
		var list = [ '','是', '否' ];
		event.editor.jqxDropDownList({
			autoDropDownHeight : true,
			source : list
		});
	};
	

	/** 页面显示之前调用的方法--框架调用 */
	Model.prototype.beforeOpen = function() {
		
	};
	
	Model.prototype.validate = function(wizard) {
		var msg = "";
		var data = this.comp('listData');
		var input = this.comp('titleInput');
		var title = input.val();
		if (data.datas.get().length <= 0) {
			msg += "列表页没有数据，";
		}if (!title || "" == title.trim()) {
			msg += "列表页没有输入标题，";
		}
		return msg;
	};
	Model.prototype.finish = function(wizard) {
		var data = this.comp('listData');
		var list = [];
		var i = 0;
		var dataId = this.dataId;
		data.each(function(param) {
			var row = param.row;
			var field = data.getValue("name", row);
			even = i % 2;
			var fieldName = "list_field" + (even + 1);
			var fieldFormat = fieldName + "Format";
			if (even == 0) {
				list.push({});;
			}
			list[list.length -1][fieldName] = field;
			list[list.length -1][fieldFormat] = "";
			list[list.length -1]["list_data"] = dataId;
			i++;
		});
		
		this.templateEngine.addContext(this.templateFile, "list", list);
		this.templateEngine.addContext(this.templateFile, "list_title", this.comp("titleInput").value);
		this.templateEngine.addContext(this.templateFile, "list_data", dataId);
		
	};

	return Model;
});
