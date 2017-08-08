define(function(require) {
	var $ = require("jquery"), idIdx = 0, callBackCount = 0;
	var webSocket = require("$UI/system/components/designerCommon/js/webSocketMng");
	var xuiServiceName = "com.justep.designer.service.XuiService";
	window.errorCallBack = function(errorMsg) {
		alert(errorMsg);
	};

	function updateDesignerAttr(sourceNode, targetNode) {
		var attrList = [ "d_selectable", "d_canmove", "d_canaddchild", "d_canremove", "componentName", "d_resizable" ];
		for ( var i = 0; i < attrList.length; i++) {
			if (!targetNode.getAttribute(attrList[i])) {
				targetNode.setAttribute(attrList[i], sourceNode.getAttribute(attrList[i]));
			}
		}
	}
	function __callJava(className, methodName, params, callback) {
		params = params || {};
		params.filePath = webSocket.getRequestParameter("filePath");
		return webSocket._callJava(className, methodName, params, callback);
	}

	var xuiDoc = {
		callJava : __callJava,

		getFilePath : function() {
			return webSocket.getRequestParameter("filePath");
		},

		/** 根据设计时id获取模型节点 */
		getNodeByDId : function(dId) {
			var sNode = this.callJava(xuiServiceName, "getModelNodeByDId", {
				"d_id" : dId,
				async : false
			});
			return sNode;
		},

		/** 根据xpath选择模型节点* */
		selectNodes : function(xpath) {
			var sNode = this.callJava(xuiServiceName, "selectModelNodes", {
				async : false,
				"xpath" : xpath
			});
			return sNode;
		},
		
		/** 生成xid **/
		genaXId : function(componentName){
			var xid = this.callJava(xuiServiceName, "genaXId", {
				async : false,
				"componentName" : componentName
			});
 
			return xid;
		},
		
		/**
		 * 获取组件模版内容.
		 */
		getTemplate : function(componentName){
			var template = this.callJava(xuiServiceName, "getTemplate", {
				async : false,
				"componentName" : componentName
			});
 
			return template;
		},

		/**
		 * 创建组件. parent 父节点--可以是dom节点也可以是d_id options 包含before--d_id
		 * 表示在这个id对应的元素之前插入、templateContent--模板内容
		 */
		createComponent : function(componentName/* 组件名 */, parent/* 父节点的d_id */, options, callBack) {
			options = options || {};
			options.componentName = componentName;
			options.parentElementId = typeof parent != 'string' ? parent.domNode.getAttribute("d_id") : parent;
			var callBackAdapter = null;
			if (callBack) {
				callBackAdapter = function(result) {
					if (result.xml) {
						callBack($(result.xml).get(0));
					} else {
						callBack(result);
					}
				};
			}
			this.callJava(xuiServiceName, "createComponent", {
				asyn : true,
				config : options
			}, callBackAdapter);
		},

		batchCreateComponent : function(configs, callBack) {
			var callBackAdapter = null;
			if (callBack) {
				callBackAdapter = function(result) {
					if (result.xml) {
						callBack($(result.xml).get(0));
					} else {
						callBack(result);
					}
				};
			}
			
			this.callJava(xuiServiceName, "batchCreateComponent", {
				asyn : true,
				config : configs
			}, callBackAdapter);
		},
		
		callMethod : function(comObjOrDId,targetMethod,params,callBack){
			if (typeof comObjOrDId != 'string') {
				comObjOrDId = comObjOrDId.domNode.getAttribute("d_id");
			}
			this.callJava(xuiServiceName, "callMethod", {
				d_id : comObjOrDId,
				targetMethod:targetMethod,
				config : params
			}, callBack);
		},

		/** 删除组件 */
		deleteComponent : function(comObjOrIds, options, callBack) {
			options = options || {};
			var paths = [];
			for ( var i = 0; i < comObjOrIds.length; i += 1) {
				var item = comObjOrIds[i];
				if (typeof item != 'string') {
					comObjOrIds[i] = item.domNode.getAttribute("d_id");
				}
				paths.push($("*[d_id='" + comObjOrIds[i] + "']").getPath());
			}
			options.paths = paths;
			options.ids = comObjOrIds;
			xuiDoc.callJava(xuiServiceName, "deleteComponent", options, callBack);
		},

		/**
		 * 设置属性值,支持同时设置多个
		 * 
		 * @param comObjOrDId
		 *            组件对象或者组件的d_id
		 * @param config
		 *            多个属性值的json对象
		 * @param callBack
		 *            属性设置完成后回调方法
		 */
		set : function(comObjOrDId, config, callBack) {
			if (typeof comObjOrDId != 'string') {
				comObjOrDId = comObjOrDId.domNode.getAttribute("d_id");
			}
			this.callJava(xuiServiceName, "set", {
				d_id : comObjOrDId,
				config : config
			}, callBack);
		},

		/**
		 * 获取属性值.
		 * 
		 * @param comObjOrDId
		 *            组件对象或者组件的d_id
		 * @param propName
		 *            属性名.
		 * @returns 返回属性值
		 */
		get : function(comObjOrDId, propName) {
			if (typeof comObjOrDId != 'string') {
				comObjOrDId = comObjOrDId.domNode.getAttribute("d_id");
			}
			return this.callJava(xuiServiceName, "get", {
				d_id : comObjOrDId,
				name : propName
			});
		},

		/**
		 * 更新属性值到w对应的dom节点上.
		 * 
		 * @param $$htmlNodeList
		 *            jquery对象
		 * @param properties
		 *            属性列表
		 * @param exclude
		 *            是否是排除属性
		 * @param callback
		 *            回调
		 */
		updateProperties : function($htmlNodeList, properties, exclude, callback) {
			var d_ids = [], propList = [];
			$htmlNodeList.each(function() {
				var dId = this.getAttribute("d_id");
				if (dId) {
					d_ids.push(dId);
					var propMap = {};
					propList.push(propMap);
					if (properties && !exclude) {
						for ( var i = 0; i < properties.length; i += 1) {
							propMap[properties[i]] = this.getAttribute(properties[i]) || "";
						}
					} else {
						var attrs = this.attributes;
						for ( var i = 0; i < attrs.length; i += 1) {
							var name = attrs[i].name;
							if (name.substring(0, 2) == "d_" || name == 'component' || name == 'componentname' || name == 'id') {
								continue;
							}
							if (exclude && properties) {
								if ($.inArray(name, properties) != -1) {
									continue;
								}
							}
							propMap[name] = attrs[i].value;
						}
					}
				}
			});
			return this.callJava(xuiServiceName, "updateProperties", {
				d_ids : d_ids,
				"properties" : propList
			}, callback);
		},

		asXml : function(htmlNode, excludeProperties, buf) {
			buf = buf || [];

			var tagName = htmlNode.tagName.toLowerCase();
			buf.push("<" + tagName + " ");
			var attributes = htmlNode.attributes;

			for ( var p in attributes) {
				var attr = attributes[p];
				if (attr.value !== undefined) {
					if (excludeProperties && $.inArray(attr.name, excludeProperties) != -1) {
						continue;
					}
					buf.push(" " + attr.name + '="' + attr.value + '" ');
				}
			}

			var childNodes = htmlNode.childNodes;
			if (childNodes.length > 0) {
				buf.push(">");
			} else {
				buf.push("/>");
			}

			for ( var i = 0; i < childNodes.length; i += 1) {
				var childNode = childNodes[i];
				if (childNode.nodeType == 1) {
					this.asXml(childNode, excludeProperties, buf);
				} else if (childNode.nodeType == 3) {
					buf.push(childNode.nodeValue);
				}
			}
			if (childNodes.length > 0) {
				buf.push("</" + tagName + ">");
			}

			return buf;

		},

		updateNodes : function($htmlNodeList, excludeProperties, callback) {
			var contents = [];

			var self = this;
			$htmlNodeList.each(function() {
				var dId = this.getAttribute("d_id");
				if (!dId) {
					this.setAttribute("d_id", "d_id_js_" + (idIdx++));
				}
				$("*", this).each(function() {
					if (this.getAttribute("d_updatable") != 'false') {
						var dId = this.getAttribute("d_id");
						if (!dId) {
							this.setAttribute("d_id", "d_id_js_" + (idx++));
						}
					}
				});

				var cloneNode = this.cloneNode(true);
				cloneNode.setAttribute("d_parentDId", this.parentNode.getAttribute("d_id"));
				var next = $(this).nextElement();// .nextSibling;
				if (next) {
					cloneNode.setAttribute("d_nextDId", next.getAttribute("d_id"));
				}
				var previous = $(this).prevElement();
				if (previous) {
					cloneNode.setAttribute("d_prevDId", previous.getAttribute("d_id"));
				}
				contents.push(self.asXml(cloneNode, excludeProperties).join(""));
			});
			var callbackAdapter = function(result) {

				var nodeList = result.nodeList;
				for ( var i = 0; i < nodeList.length; i += 1) {
					var $node = $(nodeList[i]);
					var dId = $node.attr("d_id");
					var $targetNode = $("*[d_id='" + dId + "']:first");
					if ($targetNode.length > 0) {
						updateDesignerAttr($node[0], $targetNode[0]);
					}
					$("*", $node).each(function() {
						var $targetNode = $("*[d_id='" + this.getAttribute("d_id") + "']:first");
						if ($targetNode.length > 0) {
							updateDesignerAttr(this, $targetNode[0]);
						}
					});
				}
				if (callback) {
					callback.call(window, result);
				}
			};
			return this.callJava(xuiServiceName, "udpateDomNodes", {
				"contents" : contents
			}, callbackAdapter);
		},

		updateText : function($htmlNodeList, isCDATA, callback) {
			var textMap = {};
			$htmlNodeList.each(function() {
				var $node = $(this);
				var childNodes = this.childNodes;
				var text = [];
				for ( var i = 0; i < childNodes.length; i += 1) {
					var childNode = childNodes[i];
					if (childNode.nodeType == 3) {
						text.push(childNode.nodeValue);
					}
				}
				textMap[$node.attr("d_id")] = text.join("");
			});
			return this.callJava(xuiServiceName, "updateText", {
				isCDATA : isCDATA,
				"textMap" : textMap
			}, callback);
		},

		/**
		 * 替换子元素.
		 * 
		 * @param comObjOrDId
		 *            组件对象或者组件的d_id
		 * @param childTemplate
		 *            子元素的模板内容
		 * @param options
		 *            可选参数 包含：xpathCondition 查询子元素的xpath paintComponent
		 *            是否需要在界面上绘制这些子节点.
		 * @param callBack
		 */
		replaceChild : function(comObjOrDId, childTemplate, options, callBack) {
			if (typeof comObjOrDId != 'string') {
				comObjOrDId = comObjOrDId.domNode.getAttribute("d_id");
			}
			options = options || {};
			options.childTemplate = childTemplate;
			options.d_id = comObjOrDId;
			return this.callJava(xuiServiceName, "replaceChild", options, callBack);
		},

		/**
		 * 重新绘制组件.
		 * 
		 * @param comObjOrDId
		 *            组件对象或者组件的d_id
		 * @param callBack
		 *            回调方法
		 */
		repaintComponent : function(comObjOrDId, callBack) {
			if (typeof comObjOrDId != 'string') {
				comObjOrDId = comObjOrDId.domNode.getAttribute("d_id");
			}
			this.callJava(xuiServiceName, "repaintComponent", {
				d_id : comObjOrDId
			}, callBack);
		},

		/**
		 * 移动组件节点.
		 * 
		 * @param comObjOrDId
		 *            组件对象或者组件的d_id
		 * @param targetParentObjOrDId
		 *            目标父组件对象或者d_id
		 * @param beforeObjOrId
		 *            参考组件对象或者d_id --表示移动到组件之前
		 * @param callBack
		 *            回调方法
		 * @returns
		 */
		move : function(comObjOrDId, targetParentObjOrDId, beforeObjOrId, callBack) {
			if (typeof comObjOrDId != 'string') {
				comObjOrDId = comObjOrDId.domNode.getAttribute("d_id");
			}
			if (targetParentObjOrDId && typeof targetParentObjOrDId != 'string') {
				targetParentObjOrDId = targetParentObjOrDId.domNode.getAttribute("d_id");
			}
			if (beforeObjOrId && typeof beforeObjOrId != 'string') {
				beforeObjOrId = beforeObjOrId.domNode.getAttribute("d_id");
			}
			this.callJava(xuiServiceName, "move", {
				d_id : comObjOrDId,
				targetId : targetParentObjOrDId,
				refId : beforeObjOrId
			});
		},

		/**
		 * 获取所有组件的操作.
		 * 
		 * @returns
		 */
		getAllOperations : function() {
			return this.callJava(xuiServiceName, "getAllOperations", {
				async : false
			});
		},

		/**
		 * 获取编辑器数据源.
		 * 
		 * @param method
		 *            带包名和类名的方法
		 *            如果在包com.justep.studio.ui.editors.property.datasource下，直接写类名即可,如：ConceptDatasource.getDataSource
		 * @param propertyItem
		 *            属性名，可以根据具体方法来判断是否需要传入什么样的属性
		 * @returns
		 */
		getEditorDataSource : function(method, propertyItem,dId) {
			return this.callJava(xuiServiceName, "getEditorDataSource", {
				async : false,
				method : method,
				d_id:dId,
				propertyItem : propertyItem
			});
		},

		/**
		 * 设置css项
		 * 
		 * @param comObjOrDId
		 *            组件对象或者组件的d_id
		 * @param cssConfig
		 *            例如：{width:"100px",height:"450px"}
		 */
		setCSS : function(comObjOrDId, cssConfig) {
			if (typeof comObjOrDId != 'string') {
				comObjOrDId = comObjOrDId.domNode.getAttribute("d_id");
			}
			return this.callJava(xuiServiceName, "setCSS", {
				d_id : comObjOrDId,
				config : cssConfig
			});
		},
		
		/**
		 * 批量设置CSS.
		 */
		batchSetCSS : function(d_ids,cssConfig){
			return this.callJava(xuiServiceName, "batchSetCSS", {
				d_ids : d_ids,
				config : cssConfig
			});
		},
		
		getXuiService : function() {
			return xuiService;
		}
	};

	var xuiService = {
		callJava : __callJava,

		regComponents : function(map) {
			for ( var p in map) {
				componentConfig[p]["js-class"] = map[p];
			}
		},

		/** 打开对话框页面 */
		openPage : function(url, params, callBack) {
		   if(url.substring(0,3) == "$UI"){
		    url = "$model/"+url;
		   } 
		   var lastStr = "";
		   var href = window.location.href;
		   var idx0 = href.indexOf("#");
		   if(idx0 != -1){
		    lastStr = href.substring(idx0);
		    href = href.substring(0,idx0);
		   }
		   var idx = href.indexOf("?");
		   if (idx != -1) {
		    if (url.indexOf("?") == -1) {
		     url = url + href.substring(idx);
		    } else {
		     url = url + "&" + href.substring(idx + 1);
		    }
		   }
		   if(lastStr){
		    href += lastStr;
		   }
		 
		   params = params || {};
		   this.callJava(xuiServiceName, "openPage", {
		    url : url,
		    pageParams : params
		   }, callBack);
		  },
		
		openEditor:function(name,params,callBack){ 
			this.callJava(xuiServiceName, "openEditor", {
				name : name,
				params : params
			}, callBack);
		},

		pageOkAction : function(params) {
			params = params || {};
			if (params.returnValue && typeof params.returnValue == 'object') {
				params.returnValue = JSON.stringify(params.returnValue);
			}
			params.pageId = params.pageId || webSocket.getRequestParameter("pageId");
			this.callJava(xuiServiceName, "pageOkAction", params);
		},
		
		pageApplyAction : function(params) {
			params = params || {};
			if (params.returnValue && typeof params.returnValue == 'object') {
				params.returnValue = JSON.stringify(params.returnValue);
			}
			params.pageId = params.pageId || webSocket.getRequestParameter("pageId");
			this.callJava(xuiServiceName, "pageApplyAction", params);
		},
		
		pageCloseAction : function(params) {
			params = params || {};
			params.pageId = params.pageId || webSocket.getRequestParameter("pageId");
			this.callJava(xuiServiceName, "pageCloseAction", params);
		},

		/**
		 * 获取初始化数据.
		 * 
		 * @returns
		 */
		getPageParams : function(pageId) {
			pageId = pageId || webSocket.getRequestParameter("pageId");
			var returnData = this.callJava(xuiServiceName, "getPageParams", {
				async : false,
				pageId : pageId
			});// 调用java端的方法，对应的响应方法为：jsCallJavaHandler
			return returnData;
		},

		getXuiDoc : function() {
			return xuiDoc;
		},
		
		/**
		 * 获取所有的应用名称.
		 */
		getAllAppNames : function(){
			var returnData = this.callJava(xuiServiceName, "getAllAppNames", {
				async : false
			}); 
			return returnData;
		}
	};

	return xuiService;
});