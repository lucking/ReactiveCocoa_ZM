define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	var Model = function() {
		this.callParent();
		this.STORE_ID = "todoData";
	};

	Model.prototype.titleInputKeydown = function(event) {
		if (event.keyCode == 13) {
			this.addTodo();
		}
		return true;
	};

	// 新增
	Model.prototype.addTodo = function() {
		var titleInput = this.comp("titleInput");
		if ($.trim(titleInput.domNode.value) != "") {
			this.comp("todoData").newData({
				"defaultValues" : [ {
					"id" : justep.UUID.createUUID(),
					"title" : titleInput.domNode.value,
					"completed" : false
				} ]
			});
			titleInput.domNode.value = "";
		}
	};

	// 清除完成
	Model.prototype.clearCompletedBtnClick = function(event) {
		var todoData = this.comp("todoData");
		var rows = [];
		todoData.eachAll(function(param) {
			if (param.row.val("completed")) {
				rows.push(param.row);
			}
		});
		todoData.deleteData(rows);
	};

	// 删除
	Model.prototype.deleteBtnClick = function(event) {
		var row = event.bindingContext.$object;
		this.comp("todoData").deleteData(row);
	};

	// 利用HTML5 LocalStorage暂存
	Model.prototype.saveData = function() {
		localStorage.setItem(this.STORE_ID, JSON.stringify(this.comp("todoData").toJson(false)));
	};

	Model.prototype.loadData = function() {
		this.comp("todoData").loadData(JSON.parse(localStorage.getItem(this.STORE_ID)));
	};

	// 全完成/全取消
	Model.prototype.allCompletedCheckboxChange = function(event){
		var completed = !this.comp("tempData").getValue("allCompleted");
		this.comp("todoData").eachAll(function(param) {
			param.row.val("completed", completed);
		});
	};

	return Model;
});
