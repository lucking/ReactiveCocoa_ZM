define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	
	var Model = function(){
		this.callParent();
	};

	Model.prototype.saveCommit = function(event){
		alert("保存数据成功！");
	};

	
	Model.prototype.backBtnClick = function(){
		justep.Portal.closeWindow();
	};

	Model.prototype.addBtnClick = function(){
		var data = this.comp("mainData");
		data.newData();
		var contents = this.comp('contents');
		contents.to('detail');
	};

	Model.prototype.editBtnClick = function(){
		if (this.isEditable()){
			this.resetData();
		}
		this.updateEditStatus();
	};
	
	Model.prototype.isEditable = function(){
		return this.comp("controlData").getValue("edit") == 1;
	};
	
	Model.prototype.updateEditStatus = function(){
		var data = this.comp("controlData");
		var oldValue = data.getValue("edit");
		var newValue = (oldValue==0) ? 1 : 0;
		data.setValue("edit", newValue);
	};
	
	Model.prototype.cancelEditClick = function(){
		this.resetData();
		this.updateEditStatus();
	};
	
	Model.prototype.resetData = function(){
		var data = this.comp("mainData");
		data.each(function(options){
			data.setValue("calcCheckBox", 0, options.row);
		});
	};
	
	Model.prototype.okEditClick = function(){
		var data = this.comp("mainData");
		var rows = [];
		data.each(function(options){
			if (data.getValue("calcCheckBox", options.row)){
				rows.push(options.row);
			}
		});
		if (rows.length > 0){
			data.deleteData(rows);
		}
		this.updateEditStatus();
	};
	
	Model.prototype.listBtnClick = function(){
		var contents = this.comp('contents');
		contents.to('list');
	};
	
	
	Model.prototype.showDetailClick = function(event){
		var data = this.comp("mainData");
		var id = data.getRowID(event.bindingContext.$object);
		data.to(id);
		if (this.isEditable()){
			var oldValue = data.getValue("calcCheckBox");
			var newValue = oldValue ? 0 : 1;
			data.setValue("calcCheckBox", newValue);
		}else{
			var contents = this.comp('contents');
			contents.to('detail');
		}
	};
	
	return Model;
});
