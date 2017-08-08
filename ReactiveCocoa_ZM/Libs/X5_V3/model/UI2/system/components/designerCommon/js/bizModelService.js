define(function(require) {
	var webSocket = require("$UI/system/components/designerCommon/js/webSocketMng");
	var serviceName = "com.justep.designer.service.BizModelService";
	window.errorCallBack = function(errorMsg) {
		alert(errorMsg);
	};

	function __callJava(className, methodName, params, callback) {
		params = params || {};
		params.filePath = webSocket.getRequestParameter("filePath");
		params.async = false;
		return webSocket._callJava(className, methodName, params, callback);
	}

	var Model = function(modelPath) {
		this.modelPath = modelPath;
	};

	Model.prototype = {
		_callMethod : function(method,params,returnAllProperty) {
			var args = {targetMethod:method,modelPath:this.modelPath,params:params,returnAllProperty:returnAllProperty};
			return __callJava(serviceName, "callMethod", args);
		},
 
		/**
		 * 获取模型元素的属性.
		 */
		get : function(ownerMElement/*模型元素信息*/,propName/*属性名*/,returnAllProperty/*true或false 返回所有属性*/){
			var args = {ownerMElement:ownerMElement,async:false,modelPath:this.modelPath,propName:propName,returnAllProperty:returnAllProperty};
			return __callJava(serviceName, "get", args);
		},
		
		getBasePath : function() {
			return this._callMethod("getBasePath");
		},

		getName : function() {
			return this._callMethod("getName");
		},

		getStoreList : function() {
			return this._callMethod("getStoreList");
		},
		
		getRelationList : function(fields) {
			return this._callMethod("getRelationList");
		},

		getConceptList : function() {
			return this._callMethod("getConceptList");
		},

		getMappingList : function() {
			return this._callMethod("getMappingList");
		},

		getListenerList : function() {
			return this._callMethod("getListenerList");
		},

		getProcedureList : function() {
			return this._callMethod("getProcedureList");
		},

		getProcessList : function() {
			return this._callMethod("getProcessList");
		},

		getTemplateList : function() {
			return this._callMethod("getTemplateList");
		},

		getActionList : function() {
			return this._callMethod("getActionList");
		},

		getFnList : function() {
			return this._callMethod("getFnList");
		},

		getDataSource : function() {
			return this._callMethod("getDataSource");
		},

		getConfigList : function() {
			return this._callMethod("getConfigList");
		},

		/**
		 * 根据一个概念名称查找一个概念.
		 * 
		 * @param conceptName
		 *            概念名称
		 * @return 概念对象，查找不到返回null
		 */
		findConcept : function(conceptName,returnAllProperty) {
			if(returnAllProperty !== false){
				returnAllProperty = true;
			}
			return this._callMethod("findConcept",[conceptName],returnAllProperty);
		},

		/**
		 * 根据一个关系名称查找一个关系.
		 * 
		 * @param conceptName
		 *            关系名称
		 * @return 关系对象，查找不到返回null
		 */
		findRelation : function(relationName,returnAllProperty/*true或false 返回所有属性*/) {
			if(returnAllProperty !== false){
				returnAllProperty = true;
			}
			return this._callMethod("findRelation",[relationName],returnAllProperty);
		},

		/**
		 * 根据一个概念名称查找对应的映射.
		 * 
		 * @param conceptName
		 *            概念名称
		 * @return 映射对象，查找不到返回null
		 */
		findMapping : function(conceptName,returnAllProperty/*true或false 返回所有属性*/) {
			if(returnAllProperty !== false){
				returnAllProperty = true;
			}
			return this._callMethod("findMapping",[conceptName],returnAllProperty);
		},

		/**
		 * 根据一个Action名称查找Action.
		 * 
		 * @param actionName
		 *            Action名称
		 * @return Action对象，查找不到返回null
		 */
		findAction : function(actionName,returnAllProperty/*true或false 返回所有属性*/) {
			if(returnAllProperty !== false){
				returnAllProperty = true;
			}
			return this._callMethod("findAction",[actionName],returnAllProperty);
		},

		/**
		 * 根据process名称查找process对象.
		 * 
		 * @param processName
		 *            process名称
		 * @return
		 */
		findProcess : function(processName,returnAllProperty/*true或false 返回所有属性*/) {
			if(returnAllProperty !== false){
				returnAllProperty = true;
			}
			return this._callMethod("findProcess",[processName],returnAllProperty);
		},

		/**
		 * 根据概念名称查找store对象.
		 * 
		 * @param conceptName
		 *            概念名称
		 * @return
		 */
		findStore : function(conceptName,returnAllProperty/*true或false 返回所有属性*/) {
			if(returnAllProperty !== false){
				returnAllProperty = true;
			}
			return this._callMethod("findStore",[conceptName],returnAllProperty);
		},

		/**
		 * 根据process名称查找process对象.
		 * 
		 * @param processName
		 *            process名称
		 * @return
		 */
		findTemplate : function(templateName,returnAllProperty/*true或false 返回所有属性*/) {
			if(returnAllProperty !== false){
				returnAllProperty = true;
			}
			return this._callMethod("findTemplate",[templateName],returnAllProperty);
		},

		/**
		 * 根据procedure名称查找procedureName对象.
		 * 
		 * @param procedureName
		 *            procedure名称
		 * @return
		 */
		findProcedure : function(procedureName,returnAllProperty/*true或false 返回所有属性*/) {
			if(returnAllProperty !== false){
				returnAllProperty = true;
			}
			return this._callMethod("findProcedure",[procedureName],returnAllProperty);
		},

		/**
		 * 查找关系的数据类型.
		 * 
		 * @param conceptName
		 *            关系所属的概念名称
		 * @param relationName
		 *            关系名称
		 * @return
		 */
		findDataType : function(conceptName, relationName,returnAllProperty/*true或false 返回所有属性*/) {
			if(returnAllProperty !== false){
				returnAllProperty = true;
			}
			return this._callMethod("findDataType",[conceptName, relationName],returnAllProperty);
		},

		/**
		 * 根据上下文语言查找文本标签.
		 * 
		 * @param conceptName
		 * @param relationName
		 * @return
		 */
		findLabelByContextLanauge : function(conceptName, relationName,returnAllProperty/*true或false 返回所有属性*/) {
			if(returnAllProperty !== false){
				returnAllProperty = true;
			}
			return this._callMethod("findLabelByContextLanauge",[conceptName, relationName],returnAllProperty);
		}
	};

	var bizModelService = {
		callJava : __callJava,

		/** 解析模型 */
		parseModel : function(modelPath) {
			return new Model(modelPath);
		},
		
		/**
		 * 获取所有的应用名称.
		 */
		getAllAppNames : function(){
			return __callJava(serviceName, "getAllAppNames", {});
		}
	};

	return bizModelService;
});