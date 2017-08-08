//	*******************BAAS数据交换格式*******************
//		查询返回数据
//		maps = [
//			{
//				"userID" : "001",
//				"userName" : "董卓",
//				"userAge" : "56"
//			}, 
//			{
//				"userID" : "002",
//				"userName" : "马超",
//				"userAge" : "36"
//			}
//		];
//		保存提交数据
//		delta = {
//			"new" : maps,
//			"edit" : maps,
//			"delete" : maps,
//			"none" : maps 
//		}
//	*******************X5 DATA数据格式*******************
//		table = {
//			"@type" : "table",
//			"rows" : [
//				{
//					"userName" : {
//						"value" : "董卓"
//					},
//					"userAge" : {
//						"value" : "56"
//					},
//					"userdata" : {
//						"id" : {
//							"value" : "001"
//						}
//						"recordState" : new|edit|delete|none
//					}
//				},
//				{
//					"userName" : {
//						"value" : "马超"
//					},
//					"userAge" : {
//						"value" : "36"
//					},
//					"userdata" : {
//						"id" : {
//							"value" : "002"
//						}
//						"recordState" : new|edit|delete|none
//					}
//				}
//			],
//			"userdata" : {
//				"idColumnName" : "userID"
//			}
//		}

define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	var baasClient = {
		map2row : function(map, defCols) {
			var row = {};
			for ( var col in map) {
				var value = map[col];
				if (typeof (value) == "string" && $.trim(value) !== "") {
					if (defCols[col] && defCols[col].type == "DateTime") {
						value = justep.Date.toString(justep.Date.fromString(value, "yyyy-MM-dd hh:mm:ss"), justep.Date.STANDART_FORMAT);
					}
				}
				row[col] = {
					"value" : value
				};
			}
			return row;
		},
		maps2table : function(maps, defCols) {
			var table = {
				"@type" : "table",
				"rows" : []
			};
			for ( var i = 0, len = maps.length; i < len; i++) {
				table.rows.push(this.map2row(maps[i], defCols));
			}
			return table;
		},
		row2map : function(idColumnName, row, defCols) {
			var map = {};
			map[idColumnName] = row.userdata.id.value;
			for ( var col in row) {
				if (col != "userdata") {
					var value = row[col]["value"];
					if (typeof (value) == "string" && $.trim(value) !== "") {
						if (defCols[col] && defCols[col].type == "DateTime") {
							var d = justep.Date.toString(justep.Date.fromString(value, justep.Date.STANDART_FORMAT), "yyyy-MM-dd hh:mm:ss");
							value = d;
						}
					}
					map[col] = value;
				}
			}
			return map;
		},
		table2delta : function(table, defCols) {
			var delta = {
				"none" : [],
				"new" : [],
				"edit" : [],
				"delete" : []
			};
			var idColumnName = table.userdata.idColumnName;
			var rows = table.rows;
			for ( var i = 0, len = rows.length; i < len; i++) {
				var row = rows[i];
				var recordState = (row.userdata && row.userdata.recordState) ? row.userdata.recordState : "none";
				delta[recordState].push(this.row2map(idColumnName, row, defCols));
			}
			return delta;
		},
		loadData : function(querys, success, error) {
			var self = this;
			var ajaxData = {};
			for (var i = 0, len = querys.length; i < len; i++) {
				var query = querys[i];
				ajaxData[query.queryName] = query.params;
			}
			$.ajax({
				"type" : "post",
				"async" : false,
				"dataType" : "json",
				"contentType" : "application/json",
				"url" : this.BASE_URL + this.QUERY_URL,
				"data" : JSON.stringify(ajaxData),
				"success" : function(json) {
					for (var i = 0, len = querys.length; i < len; i++) {
						var query = querys[i];
						var maps = json[query.queryName];
						var table = self.maps2table(maps, query.data.defCols);
						query.data.loadData(table);
						query.data.first();
					}
					if (success && $.isFunction(success)) {
						success.call(this, json);
					}
				},
				"error" : error ? error : this.errorProcesser
			});
		},
		saveData : function(saves, success, error) {
			var ajaxData = {};
			for (var i = 0, len = saves.length; i < len; i++) {
				var save = saves[i];
				var delta = this.table2delta(save.data.toJson(true), save.data.defCols);
				ajaxData[save.entityName] = delta;
			}
			
			$.ajax({
				"type" : "post",
				"async" : false,
				"dataType" : "json",
				"contentType" : "application/json",
				"url" : this.BASE_URL + this.SAVE_URL,
				"data" : JSON.stringify(ajaxData),
				"success" : function(json) {
					for (var i = 0, len = saves.length; i < len; i++) {
						var save = saves[i];
						save.data.applyUpdates();
					}
					if (success && $.isFunction(success)) {
						success.call(this, json);
					}
				},
				"error" : error ? error : this.errorProcesser
			});
		},
		errorProcesser : function(request, textStatus, errorThrown) {
			if (!errorThrown) {
				var url = window.location.protocol + "//" + window.location.host + baasClient.BASE_URL;
				throw new Error("发送请求失败：" + url);
			} else {
				throw errorThrown;
			}
		}
	};

	baasClient.BASE_URL = "/x5baas";
	baasClient.QUERY_URL = "/commonQuery";
	baasClient.SAVE_URL = "/commonSave";

	return baasClient;
});