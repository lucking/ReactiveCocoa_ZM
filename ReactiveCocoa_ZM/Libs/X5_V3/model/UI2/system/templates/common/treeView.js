define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var Data = require("$UI/system/components/justep/data/data"); 
	
	var Model = function(){
		this.callParent();
	};

	Model.prototype.modelLoad = function(event){
		this.templateEngine = this.getParent().templateEngine;
		this.templateFile = this.getContext().getRequestParameter("templateFile");
		this.dataId = "mainData";
	};

	Model.prototype._addSelectData = function(){
		var mainDataRelations = this.templateEngine.getConfig().current.mainData.columns;
		var data = this.comp("canSelectData");
		if(mainDataRelations != null) {
			var list = mainDataRelations.split(',');
			list.unshift('');
			if(list.length != data.datas.get().length){
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
			
		}else{
			data.clear();
		}
	};

	Model.prototype.select6Click = function(event){
		this._addSelectData();
	};
	
	Model.prototype.validate = function(wizard) {
		var data = this.comp('treeData');
		var msg = "";
		var treeNodeName=data.getValue("treeNodeName");
		if(!treeNodeName || "" == treeNodeName){
			msg += "树节点名称(*):不能为空，";
		}
		return msg;
	};
	
	Model.prototype.finish = function(wizard) {
		var dataId = this.dataId;
		var data = this.comp('treeData');
		this.templateEngine.addContext(this.templateFile, "rootNodeLable", data.val("rootNodeLable"));
		this.templateEngine.addContext(this.templateFile, "treeNodeName", data.val("treeNodeName"));
		this.templateEngine.addContext(this.templateFile, "tree_data", dataId);
	};

	return Model;
});