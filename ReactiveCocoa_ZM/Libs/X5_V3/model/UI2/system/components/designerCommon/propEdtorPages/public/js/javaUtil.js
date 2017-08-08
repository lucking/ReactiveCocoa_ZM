define(function(require){
	var $ = require("jquery");
	var returnValues = {};

	 
	var javaUtil = {
		  /**调用java端的方法，参数为json格式的对象，返回值为json格式的对象**/
		  callJava:function(params,callback){
			  window.currentCallback = callback;
			  var returnData = callJava(JSON.stringify(params));//调用java端的方法，对应的响应方法为：jsCallJavaHandler
			  return eval("("+returnData+")");
		  },
		  
		  /**获取初始化数据**/
		  getInitData:function(){
			  var initData = this.callJava({action:"getInitData"});
		      document.body.style.background=initData.background;//设置页面背景颜色
			  return this.callJava({action:"getInitData"});
		  },
		  
		  getBaseUrl:function(){
			  
		  },
		  
		  addReturnValue:function(jsonValues){
			  $.extend(returnValues,jsonValues);
		  }
	};
	

	return javaUtil;
});