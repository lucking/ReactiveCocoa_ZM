define(function(require) {
	var $ = require("jquery");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var xuiDoc = xuiService.getXuiDoc();

	var Model = function() {
		this.callParent();
	};
	/**
	 * 获取返回值，点击确定后调用的方法,必须是一个json格式的数据 .
	 */
	Model.prototype.getReturnValue = function() {
		var $input = $("input:checked"), ret = [];
		$input.each(function(){
			var value = $(this).attr("operation");
			if(value)ret.push({operation: value}); // 用于同时返回多个属性值
		});
		
		return ret.length===1?ret[0]:(ret.length===0?"":ret);
	};

	Model.prototype.modelLoad = function(event) {
		var idIdx = 0;
		// debugger;
		// var initData = xuiService.getPageParams();
		// document.body.style.background = initData.background;
		var allOperations = xuiDoc.getAllOperations();
		var buf = [ "<div style='padding:2px;'>" ];
		for ( var i = 0; i < allOperations.length; i += 1) {
			var operationConfig = allOperations[i];
			var xid = operationConfig.xid;
			buf.push("<H3 style='margin:0;'>" + xid + "</H3>");
			buf.push("<div style='padding-left:10px;border-top:1px solid gray;margin-bottom:5px;'>");
			var operationItems = operationConfig.operations;
			for ( var j = 0; j < operationItems.length; j += 1) {
				var operationItem = operationItems[j];
				var id = "__inner_input_" + (idIdx++);
				var value = xid + "." + operationItem.name;
				var text = operationItem.name + "[<i class='" + operationItem.icon + "'></i>" + operationItem.label + "]";
				buf.push("<div class='operatonItem' style='height:28px;line-height:28px;display:inline-block;width:33%;'><input operation='" + value + "' name='operationInput' type='checkbox' id='" + id
						+ "'/><label for='" + id + "'>" + text + "</label></div>");
			}
			buf.push("</div>");
		}
		buf.push("</div>");
		var e = this.getElementByXid("div1");
		e.innerHTML = buf.join("");

	};

	return Model;
});
