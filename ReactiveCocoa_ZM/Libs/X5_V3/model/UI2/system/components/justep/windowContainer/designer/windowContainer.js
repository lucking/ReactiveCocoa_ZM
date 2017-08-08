/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	var $ = require("jquery");
	var WindowContainer = require("../windowContainer");
	require('css!./css/windowContainer').load();
	
	var WindowContainerDesigner = WindowContainer.extend({
		refresh: function(){
			var e = $(this.domNode);
			var src = e.attr("src");
			e.addClass("x-window-container").text("页面文件：" + (src?src:""));
		},
		set: function(obj){
			if ("src" in obj){
				var e = $(this.domNode);
				e.attr("src", obj.src ? obj.src : "");
				this.refresh();
			}
		}
		
	});
	
	return {'$UI/system/components/justep/windowContainer/windowContainer':WindowContainerDesigner};
});