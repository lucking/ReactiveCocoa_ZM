/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
/**
 * 页面的生命周期： 1. 请求页面的model.js, 创建Model实例, 在创建Model实例的过程中, 创建Data实例; 2. 请求页面的view;
 * 3. 将Model实例与view进行数据绑定, 创建view中组件实例; 4. [用户使用]触发onModelConstruct事件; 5. 加载数据,
 * [引擎使用]触发onModelConstructing事件，data监听这个事件来加载数据; 6.
 * [用户使用]触发onModelConstructDone事件; 7. [用户使用]触发onLoad事件; 8. [用户使用]页面关闭或被删除时,
 * 触发onunLoad事件
 */
define(function(require) {
	var Component = require("./component");
	var Object = require("./object");
	var _Error = require("./error");
	var Context = require("./context");
	var UUID = require("./uuid");
	var Observable = require("./observable");
	var $ = require("jquery");
	var bind = require("bind");
	var INNER_MODEL = "__inner-model__";
	var Message = require("./message");
	require("$UI/system/resources/system.res");

	var Model = Object.extend({
		mixins : Observable,
		constructor : function() {
			this._status = Model.MODEL_STATUS_CONSTRUCT;
			if (this.__contextUrl) {// __contextUrl支持url和json对象
				if (typeof (this.__contextUrl) === 'string') {
					this.__context = _processContext(this);
				} else {
					if (!this.__contextUrl.flag){
						var result = {
								"message" : this.__contextUrl.message || "",
								"reason" : this.__contextUrl.reason || "",
								"code" : this.__contextUrl.code || "",
								"stack" : this.__contextUrl.stack || "",
								"messages" : "",
								"url" : "",
								"param" : ""
							};
						throw _Error.create(_Error.SERVER_ERROR_START + JSON.stringify(result) + _Error.SERVER_ERROR_END);
					}
					this.__context = new Context(this.__contextUrl.data, this);
				}
			}
			this.callParent();

			this.__componentDefereds = {};

			this.__components = {}; // 用来存储data组件

			var self = this;

			$(window).on('message', $.proxy(function(event) {
				var data = event.originalEvent.data;
				if (data.type && data.type == "model") {
					self.fireEvent(data.event.name);
				}
			}, this));

			$(window).unload(function() {
				self.fireEvent(Model.UNLOAD_EVENT, {
					source : self
				});
			});

			Observable.prototype.constructor.call(this);
		},

		_callModelFn : function() {
			var event = arguments[2];
			event.bindingContext = bind.contextFor(event.currentTarget);
			return this[arguments[0]].apply(this, [ event ]);
		},

		call : function(caller, fn) {
			if (1 == arguments.length) {
				fn = caller;
				caller = this;
			}
			return function() {
				return fn.apply(caller);
			};
		},

		ref : function(col) {
			return function(item) {
				return (item && item.ref) ? item.ref(col) : "";
			};
		},

		getParent : function() {
			return this._parentModel;
		},

		getRootNode : function() {
			return this._rootNode;
		},

		isConctructed : function() {
			return Model.MODEL_STATUS_CONSTRUCTED===this._status;
		},

		// compositionComplete
		attached : function(child, parent, context) {
			this._rootNode = child;
			bind.utils.domData.set(parent, INNER_MODEL, this); // 在compose组件中会使用INNER_MODEL来获取
			if (parent) {
				var parentContext = bind.contextFor(parent);
				if (parentContext && parentContext.$model) {
					this._parentModel = parentContext.$model;
				}
			}

			// 处理__componentDefereds
			var allError = "";
			for ( var xid in this.__componentDefereds) {
				var dtd = this.__componentDefereds[xid];
				if (dtd.state() == 'pending') {
					var err = "";
					var curComponent = this.comp(xid);
					if (curComponent) {
						err = new Message(Message.JUSTEP230082, xid, curComponent.componentName).getMessage();
					} else {
						err = new Message(Message.JUSTEP230081, xid).getMessage();

					}
					dtd.reject(err);
					if (allError)
						allError += ",";
					allError += err;
				}
			}

			if (allError) {
				throw new Error(allError);
			}

			this.fireEvent(Model.MODEL_CONSTRUCT_EVENT, {
				source : this
			});
			this._status = Model.MODEL_STATUS_CONSTRUCTING;
			this.fireEvent(Model.MODEL_CONSTRUCTING_EVENT, {
				source : this
			});
			this._status = Model.MODEL_STATUS_CONSTRUCT_DONE;
			this.fireEvent(Model.MODEL_CONSTRUCT_DONE_EVENT, {
				source : this
			});
			this._status = Model.MODEL_STATUS_LOAD;
			this.fireEvent(Model.LOAD_EVENT, {
				source : this
			});

			var composeComponent = this.comp(parent);
			if (composeComponent && composeComponent.loaded) {
				composeComponent.loaded();
			}

			this._status = Model.MODEL_STATUS_CONSTRUCTED;
		},

		getStatus : function(){
			return this._status;
		},
		detached : function(child, parent, context) {
			this.fireEvent(Model.UNLOAD_EVENT, {
				source : this
			});
			bind.utils.domData.set(parent, INNER_MODEL);
			this._parentModel = null;
		},

		resolvedComponent : function(xidOrNode) {
			var c = this.comp(xidOrNode);
			this._getComponentDefered(xidOrNode).resolve(c);
		},

		_disposeComponent : function(xidOrNode) {
			var key = this._getComponentDeferedKey(xidOrNode);
			delete this.__componentDefereds[key];
		},

		componentPromise : function(xidOrNode) {
			return this._getComponentDefered(xidOrNode).promise();
		},

		_getComponentDeferedKey : function(xidOrNode) {
			var key = null;
			if (xidOrNode) {
				if (typeof (xidOrNode) === 'string') {
					key = xidOrNode;
				} else {
					var $e = $(xidOrNode);
					key = $e.attr("xid");
					if (!key) {
						key = new UUID().toString();
						$e.attr("xid", key);
					}
				}
			}
			return key;
		},

		_getComponentDefered : function(xidOrNode) {
			var key = this._getComponentDeferedKey(xidOrNode);
			var result = this.__componentDefereds[key];
			if (!result) {
				result = $.Deferred();
				this.__componentDefereds[key] = result;
				// 如果xidOrNode是null, undefined, ""时, 直接结束promise
				if (!xidOrNode)
					result.resolve(xidOrNode);
			}
			return result;
		},

		registerComponent : function(xid, component) {
			// 只有data组件需要调用addComponent
			this.__components[xid] = component;
		},

		unRegisterComponent : function(xid) {
			this._disposeComponent(xid);
			delete this.__components[xid];
		},

		getComponent : function(xid, sourceNode) {
			if (typeof (xid) === "string") {
				// 优先找this.__components中的data组件
				if (this.__components[xid]) {
					return this.__components[xid];
				} else if (sourceNode && sourceNode.nodeType) {
					var componentContext = this._getComponentContext(sourceNode);
					return this.getComponentByContext(xid, componentContext);
				} else {
					return this._getViewComponentByXid(xid);
				}
			} else {
				// 如果是节点，直接返回节点关联的组件
				return Component.getComponent(xid);
			}
		},

		/**
		 * @param xid
		 * @param componentContext:
		 *            结构类似{node: xx, id: xx},
		 *            其中id只会在foreach中出现，表示一行的唯一标识，即Component.INLINE_ID_ATTR_NAME
		 *            在foreach中，每一行的第一级节点会有一个Component.INLINE_ID_ATTR_NAME属性，用来标识一行
		 * @returns
		 */
		getComponentByContext : function(xid, componentContext) {
			if (this.__components[xid]) {
				return this.__components[xid];
			} else {
				if (componentContext && componentContext.node && componentContext.node.nodeType) {
					var founds = [];
					while (true) {
						if (componentContext) {
							if ($(componentContext.node).attr(Component.CONTEXT_ATTR_NAME) === Component.BLOCK_CONTEXT) {
								return this._getViewComponentByXid(xid);
							} else {
								var result = this._getComponent(xid, componentContext, founds);
								if (result)
									return result;
							}
						} else {
							return null;
						}
						componentContext = this._getComponentContext(componentContext.node);
					}

					return null;
				} else {
					return this._getViewComponentByXid(xid);
				}
			}
		},

		_getViewComponentByXid : function(xid) {
			var e = this.getElementByXid(xid);
			if (e) {
				return Component.getComponent(e);
			} else {
				return null;
			}
		},

		_getComponent : function(xid, componentContext, founds) {
			if (founds[componentContext.node]) {
				return null;
			}

			var parent = $(componentContext.node);
			var children = parent.children();
			for ( var i = 0; i < children.length; i++) {
				var child = $(children[i]);

				// 忽略不是所在行的节点，
				if (componentContext.inlineId && (child.attr(Component.INLINE_ID_ATTR_NAME) !== componentContext.inlineId)) {
					continue;
				}

				var context = child.attr(Component.CONTEXT_ATTR_NAME);
				// 忽略节点生成的私有节点
				if (context !== Component.PRIVATE_CONTEXT) {
					if (child.attr("xid") === xid) {
						return Component.getComponent(child[0]);
					}
				}

				// 忽略被compose的内容
				if (context !== Component.BLOCK_CONTEXT) {
					var result = this._getComponent(xid, {
						node : child[0]
					}, founds);
					if (result) {
						return result;
					}
				}
			}

			founds[founds.length] = componentContext.node;

			return null;
		},

		_getComponentContext : function(element) {
			if (!element)
				return null;

			var elementObj = $(element);
			if (elementObj.attr(Component.CONTEXT_ATTR_NAME) === Component.BLOCK_CONTEXT) {
				return null;
			}

			var parentObj = elementObj.parent();
			if (parentObj) {
				var contextAttr = parentObj.attr(Component.CONTEXT_ATTR_NAME);
				if (contextAttr === Component.INLINE_CONTEXT) {
					return {
						node : parentObj[0],
						inlineId : elementObj.attr(Component.INLINE_ID_ATTR_NAME)
					};

				} else if (contextAttr === Component.BLOCK_CONTEXT) {
					return {
						node : parentObj[0],
						id : null
					};
				} else {
					return this._getComponentContext(parentObj[0]);
				}
			} else {
				return null;
			}

		},

		getComponents : function(xid) {
			var result = [];
			if (this.__components[xid])
				result[result.length] = this.__components[xid];

			var elements = this.getElementsByXid();
			for ( var i = 0; i < elements.length; i++) {
				var element = elements[i];
				var component = Component.getComponent(element);
				if (component) {
					result[result.length] = component;
				}
			}

			return result;
		},

		/**
		 * @param xidOrNode:
		 *            xid属性或node节点
		 * @param sourceNode:
		 *            源节点，可选
		 * @returns 说明：如果没有指定source，将在当前的页面（即Window）中查找；
		 *          如果指定了sourceNode，将从sourceNode最近的上下文中查找（不跨出Window）；
		 *          会产生上下文的元素有：compose, foreach. 其中compse产生的上下文件是block;
		 *          foreach产生的上下文件是inline, 在foreach的第一级子节点上, 会生成__inline-id__
		 *          属性, 用来标识同一行的内容; 查找的过程中, 忽略上下文为private的节点.
		 */
		comp : function(xidOrNode, sourceNode) {
			return this.getComponent(xidOrNode, sourceNode);
		},

		comps : function(xid) {
			return this.getComponents(xid);
		},

		getIDByXID : function(xid) {
			if (xid) {
				return this.getContextID() + "_" + xid;
			} else {
				return null;
			}
		},

		getElementByXid : function(xid) {
			var id = this.getIDByXID(xid);
			if (id) {
				var items = $("#" + id);
				if (items.length > 0) {
					return items[0];
				} else {
					return null;
				}
			} else {
				return null;
			}
		},

		getElementsByXid : function(xid) {
			var id = this.getIDByXID(xid);
			if (id) {
				return $("*[id='" + id + "']");
			} else {
				return [];
			}
		},

		removeElement : function(e) {
			if (e) {
				bind.removeNode(e);
			}
		},

		removeElementByXid : function(xid) {
			var e = this.getElementByXid(xid);
			this.removeElement(e);
		},

		getContextID : function() {
			return this.__id;
		},
		getContext : function() {
			return this.__context;
		},
		postMessage : function(message) {
			this.fireEvent(Model.MESSAGE_EVENT, {
				source : this,
				message : message
			});
		},

		addComponent : function(parentElement, component, targetElement) {
			bind.addComponent(parentElement, component, targetElement);
		},

		removeComponent : function(component) {
			if (component && component.domNode) {
				bind.removeNode(component.domNode);
			}
		}
	});


	var _getParamsFromURL = function(url){
		var result = {};
		var index = url.indexOf("?");
		if(index != -1){
			var params = url.substr(index + 1).split("&");
			for(var i=0; i<params.length; i++){
				var param = params[i].split("=");
				if(param.length=2){
					result[param[0]] = param[1];
				}
			}
		}
		return result;
	};
	
	var _processContext = function(model){
		var params = _getParamsFromURL(model.__contextUrl);
		return new Context({params:params}, model);
	};
	
	Model.ACTIVE_EVENT = "onActive";
	Model.INACTIVE_EVENT = "onInactive";
	Model.MESSAGE_EVENT = "onMessage";
	Model.MODEL_CONSTRUCT_EVENT = "onModelConstruct";
	Model.MODEL_CONSTRUCTING_EVENT = "onModelConstructing";
	Model.MODEL_CONSTRUCT_DONE_EVENT = "onModelConstructDone";
	Model.MODEL_CONSTRUCTED_EVENT = "onModelConstructed";
	Model.LOAD_EVENT = "onLoad";
	Model.UNLOAD_EVENT = "onunLoad";

	Model.MODEL_STATUS_CONSTRUCT = 1;
	Model.MODEL_STATUS_CONSTRUCTING = 2;
	Model.MODEL_STATUS_CONSTRUCT_DONE = 3;
	Model.MODEL_STATUS_LOAD = 4;
	Model.MODEL_STATUS_CONSTRUCTED = 5;
	
	return Model;
});