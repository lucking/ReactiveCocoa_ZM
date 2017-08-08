/*! 
* E5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
*/ 
define(function(require) {
	require("$UI/system/components/justep/common/res");
	var justep = require("$UI/system/lib/justep");
	var url = require.normalizeName("./table");
	var $ = require("jquery");
 
	var Table = justep.BindComponent.extend({
		init: function(value, bindingContext){
			this.callParent(value, bindingContext);
		},
		/** 加载数据 **/
		loadData : function(rows){
			rows = rows||[];
			var buf = ["<tbody>"];
			var rowCount = rows.length;
			
			var thItems = $(">thead>tr th", this.$domNode);
			var length = thItems.length;
			for(var i = 0;i<rowCount;i+=1){
				var row = rows[i]||[];
				var isArray = $.isArray(row);
				buf.push("<tr>");
				for(var j = 0 ; j<length ; j+=1){
					var cellValue = row[isArray?j:thItems.eq(j).attr("name")];//支持数组和json行数据
					buf.push("<td>"+(cellValue ||"&nbsp")+"</td>");
				}
				buf.push("</tr>");
			}
			buf.push("</tbody>");
			
			$(">tbody",this.$domNode).remove().append($(buf.join("")));
			$(buf.join("")).appendTo(this.$domNode);
		}
	});
	

	justep.Component.register(url, Table);
	return Table;
});