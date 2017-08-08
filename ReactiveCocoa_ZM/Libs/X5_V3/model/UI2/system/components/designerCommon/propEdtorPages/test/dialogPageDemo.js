define(function(require){
	var $ = require("jquery");
 
	/**=========================== 与java端交互必须定义工具类以及接口 start ========================**/
	/**调用java方法的工具类*/
	var javaUtil = require("$UI/system/components/designerCommon/propEdtorPages/public/js/javaUtil");
	
	/**java端点击确定后调用的方法,可以直接返回一个字符串值也可以直接返回一个json结构的字符串，
    如果是json结构时，json的key对应属性名，值对应属性值，可以同时对多个属性进行设置**/
	 window.getValue = function(){ 
	   // return $("input").val();//或者 
	    var values = {};
	    values["value"] = $("input").val();
	    return JSON.stringify(values); //用于同时返回多个属性值
	 };
	 /**=========================== 与java端交互必须定义工具类以及接口 end========================**/
	 
	var Model = function(){
		this.callParent();
	};
	Model.prototype.modelLoad = function(event){
       var initData = javaUtil.getInitData();//获取初始化数据
     
       $("input").val(initData.value);//初始化属性值
	};

	return Model;
});
