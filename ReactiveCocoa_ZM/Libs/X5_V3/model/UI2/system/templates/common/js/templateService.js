define(function(require) {
	var $ = require("jquery");
	var justep = require('$UI/system/lib/justep');
	var XML = require('$UI/system/lib/base/xml');

	var templateServiceName = "com.justep.designer.service.TemplateService";
	var webSocket = require("$UI/system/components/designerCommon/js/webSocketMng");

	function _callJava(className, methodName, params, callback) {
		params = params || {};
		if (!params.async) {
			params.async = false;
		}
		params["javaModelPath"] = "/system/templates/common";
		return webSocket._callJava(className, methodName, params, callback);
	}

	var templateService = {

		callJava : _callJava,

		/**
		 * 关闭模板向导对话框.
		 * 
		 * @returns
		 */
		closeDialog : function() {
			return this.callJava(templateServiceName, "closeDialog", {
				async : true
			});
		},

		/**
		 * 打开本地通用选择对话框.
		 * 
		 * @param options
		 *            titile、templateFilePath、targetPath、datasource:{method:'',xid:'',propertiItem:'',templateFilePath:'',excludeField:'',dsExcludeList:[]}
		 *            等
		 */
		openSwtCommonSelectorDialog : function(options, callBack) {
			var newOptions = $.extend({}, {
				async : true
			}, options);
			return this.callJava(templateServiceName, "openSwtCommonSelectorDialog", newOptions, callBack);
		},

		/**
		 * 打开属性编辑器
		 * 
		 * @param options
		 *            传入的参数，包括templateFilePath、targetPath、propName、concept、reader、writer、creator
		 *            等
		 * @param callBack
		 *            回调函数
		 */
		openXuiPropertyEditorDlg : function(options, callBack) {
			var newOptions = $.extend({}, {
				async : true
			}, options);
			this.callJava(templateServiceName, "openXuiPropertyEditorDlg", newOptions, callBack);
		},

		/**
		 * 获取模板目录数据.
		 * 
		 * @returns
		 */
		getTemplateConfigCatalog : function() {
			return this.callJava(templateServiceName, "getTemplateConfigCatalog");
		},
		
		/**
		 * 获取chartType数据.
		 * 
		 * @returns
		 */
		getChartTypeCatalog : function() {
			return this.callJava(templateServiceName, "getChartTypeSource");
		},
		
		getAppBuilderServerUrl : function(){
			return this.callJava(templateServiceName, "getAppBuilderServerUrl");
		},
		
		setAppBuilderServerUrl : function(url){
			return this.callJava(templateServiceName, "setAppBuilderServerUrl", {
				url : url});
		},
		
		getNativePath : function(){
			return this.callJava(templateServiceName, "getNativePath");
		},
		
		/**
		 * 获取listView.xml数据.
		 * 
		 * @returns
		 */
		getChartListCatalog : function() {
			return this.callJava(templateServiceName, "getChartListSource");
		},
		
		getTemplateConfig : function(templatePath) {
			return this.readFile(templatePath + "/" + "template.config.xml");
		},

		/**
		 * 读取文件内容.
		 * 
		 * @param filePath
		 *            需要读取的文件路径，形如 $UI\MyApp\MyW.w
		 * @returns 如果成功，返回文件内容，否则返回空
		 */
		readFile : function(filePath) {
			// TODO: 需要做权限控制，安全漏洞
			return this.callJava(templateServiceName, "readFile", {
				filePath1 : filePath
			});
		},

		/**
		 * 保存文件内容.
		 * 
		 * @param filePath
		 *            需要写入的文件路径，形如 $UI\MyApp\MyW.w
		 * @param content
		 *            需要写入的内容
		 * @returns 写入成功返回True，否则False
		 */
		writeFile : function(filePath, content) {
			// TODO: 需要做权限控制，安全漏洞
			return this.callJava(templateServiceName, "writeFile", {
				filePath1 : filePath,
				content : content
			});
		},

		/**
		 * 检查文件是否存在.
		 * 
		 * @param filePath
		 *            需要写入的文件路径，形如 $UI\MyApp\MyW.w
		 * @returns 如果存在返回True，否则False
		 */
		fileExists : function(filePath) {
			return this.callJava(templateServiceName, "fileExists", {
				filePath1 : filePath,
			}) === "true";
		},

		copyResourceFiles : function(templatePath, targetPath, excludeFiles) {
			return this.callJava(templateServiceName, "copyResourceFiles", {
				templatePath : templatePath,
				targetPath : targetPath,
				excludeFiles : excludeFiles
			});
		},

		/**
		 * 刷新路径，使Studio能及时显示改路径新建的文件.
		 * 
		 * @param targetPath
		 *            需要刷新的路径
		 * @returns
		 */
		refreshFile : function(targetPath) {
			return this.callJava(templateServiceName, "refreshFile", {
				targetPath : targetPath
			});
		},

		/**
		 * 选择文件或者文件夹.
		 * 
		 * @param targetPath
		 *            需选择的文件路径
		 * @returns
		 */
		selectFile : function(targetPath) {
			return this.callJava(templateServiceName, "selectFile", {
				targetPath : targetPath
			});
		},
		
		/**
		 * 打开w文件
		 * 
		 * @param targetPath
		 *            要打开的目标文件路径
		 */
		openWFile : function(filePath) {
			return this.callJava(templateServiceName, "openWFile", {
				filePath1 : filePath
			});
		},
		/**
		 * 获取所有的应用名称.
		 */
		getAllAppNames : function(){
			var returnData = this.callJava(templateServiceName, "getAllAppNames", {
				async : false
			}); 
			return returnData;
		}
	};

	return templateService;
});
