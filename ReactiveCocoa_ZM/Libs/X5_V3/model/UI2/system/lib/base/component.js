/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var Object = require("./object");
	var Observable = require("./observable");
	var Operational = require("./operational");
	var Util = require("./util");
	var Message = require("./message");
	var _Error = require("./error");

	var bind = require("bind");
	require("$UI/system/resources/system.res");

	var Component = Object.extend({
		mixins : [ Observable, Operational ],
		constructor : function() {
			this.callParent();
			Observable.prototype.constructor.call(this);
			Operational.prototype.constructor.call(this);
		},

		// 返回组件配置信息，后代类需要超载
		getConfig : function() {
			return {};
		},

		getOperationDefs : function() {
			return this._operations_;
		},
		/**
		 * 后代类超载initOperation方法, 用来定义自己的操作
		 */
		initOperation : function() {
			var operations = this.getOperationDefs();
			if (operations) {
				for ( var name in operations) {
					this.defineOperation(name, operations[name]);
				}
			}
		},
		setModel : function(model) {
			this.__model = model;
			if (this.__model) {
				var self = this;
				this.__model.on("onunLoad", function() {
					self.dispose();
				});
			}
		},
		getModel : function() {
			return this.__model;
		},
		dispose : function() {
			delete this.__model;
		},
		propertyChangedHandler : function(key, oldVal, value) {
		},
		set : function(args) {
			if (args) {
				var obj = this;
				$.each(args, function(key, value) {
					if (undefined !== obj[key] || obj.hasOwnProperty(key)) {
						obj._setValueRaiseEvent(key, value);
					}
				});
			}
		},
		get : function(arg) {
			return this[arg];
		},
		_setValueRaiseEvent : function(key, value) {
			var oldVal = this[key];
			this[key] = value;
			if (typeof (this.propertyChangedHandler) == 'function')
				this.propertyChangedHandler.call(this, key, oldVal, value);
		},
		_execEventOperation : function(ename, evt) {
			var defOps = this.getEventOperation(ename),defOp;
			if(!$.isArray(defOps))
				defOps = [defOps];
				
			for(var i=0;i<defOps.length;i++){
				defOp = defOps[i];
				if (defOp) {
					var op = this._getOperation(defOp.operation);
					if (op) {
						defOp.operation = op;// 进行缓存
						var comp = this.getModel().comp(op.owner);
						if (comp){
							var ctx = {
									$model : this.getModel(),
									$event : evt,
									args : defOp.args
							};
							comp.executeOperation(op.name, ctx);
						} else {
							var msg = new Message(Message.JUSTEP230076, ename, op.owner);
							throw _Error.create(msg);
						}
					}
				}
			}
		},
		_getOperation : function(op) {
			if (typeof (op) == 'string') {
				var index = op.indexOf(".");
				if (index != -1) {
					return {
						owner : op.substring(0, index),
						name : op.substring(index + 1)
					};
				} else {
					var msg = new Message(Message.JUSTEP230075, op);
					throw _Error.create(msg);
				}
			} else
				return op;
		},
		getEventOperation : function(ename) {
			var defEvtOperation = this.__eventOperation__[ename];
			if (defEvtOperation && defEvtOperation['operation']) {
				return defEvtOperation['operation'];
			}
		},
		_createOpFunc : function(ename, self) {
			return function(evt) {
				self._execEventOperation(ename, evt);
			};
		},
		// 重新实现on和off支持字符串的事件挂接和卸载
		on : function(ename, fn, scope, options) {
			var viewModel = this.getModel();
			if (typeof (fn) == 'string') {
				/* jshint -W085 */
				with (viewModel) {
					/* jshint +W085 */
					try {
						fn = eval("(" + fn + ")");
					} catch (e) {
						var msg = new Message(Message.JUSTEP230064, ename, fn);
						throw _Error.create(msg);
					}
				}
			}
			var t = typeof (fn);
			if (t == 'function')
				Observable.prototype.on.call(this, ename, fn, scope, options);
			else if (t == 'object' && (fn['operation'] || $.isArray(fn))) {
				// 操作处理
				if (this.__eventOperation__[ename])
					this.off(ename, fn, viewModel);
				this.__eventOperation__[ename] = {
					operation : fn,
					func : this._createOpFunc(ename, this)
				};
				Observable.prototype.on.call(this, ename, this.__eventOperation__[ename].func, viewModel);
				this.fireEvent(Component.OPERATION_CHANGED, {
					source : this,
					eventName : ename,
					operation : this.__eventOperation__[ename]
				});
			}
		},
		off : function(ename, fn, scope) {
			var viewModel = this.getModel();
			if (typeof (fn) == 'string') {
				/* jshint -W085 */
				with (viewModel) {
					/* jshint +W085 */
					try {
						fn = eval("(" + fn + ")");
					} catch (e) {
						var msg = new Message(Message.JUSTEP230074, ename, fn);
						throw _Error.create(msg);
					}
				}
			}
			var t = typeof (fn);
			if (t == 'function')
				Observable.prototype.off.call(this, ename, fn, scope);
			else if (t == 'object' && (fn['operation'] || $.isArray(fn))) {
				// 操作处理
				Observable.prototype.off.call(this, ename, this.__eventOperation__[ename].func, viewModel);
				delete this.__eventOperation__[ename];
			}
		}
	});

	Component.BIND_NAME = "__component-javascript-object__";

	/**
	 * compId: 只在一个组件范围内起作用，找当前组件的子节点，遇到节点是组件时，忽略它的子节点；
	 */
	Component.COMP_ID = "compId";

	Component.COMPONENT_ATTR_NAME = "component";

	Component.CONTEXT_ATTR_NAME = "__component-context__";
	Component.INLINE_ID_ATTR_NAME = "__inline-id__";
	Component.INLINE_CONTEXT = "inline";
	Component.BLOCK_CONTEXT = "block";
	Component.PRIVATE_CONTEXT = "private";
	Component.OPERATION_CHANGED = "onOperationChanged";

	Component.addComponent = function(parentElement, component, targetElement) {
		bind.addComponent(parentElement, component, targetElement);
	};

	Component.removeComponent = function(component) {
		if (component && component.domNode) {
			bind.removeNode(component.domNode);
		}
	};

	Component.getComponent = function(element) {
		if (element) {
			return bind.utils.domData.get(element, Component.BIND_NAME);
		} else {
			return null;
		}
	};

	Component.hasComponent = function(element) {
		return !!Component.getComponent(element);
	};

	Component.addOperations = function(ComponentClass, operations) {
		if (!ComponentClass.prototype._operations_)
			ComponentClass.prototype._operations_ = {};
		if (ComponentClass.superclass)
			Util.apply(ComponentClass.prototype._operations_, Component._getOperations(ComponentClass.superclass));
		Util.apply(ComponentClass.prototype._operations_, operations);
	};
	Component._getOperations = function(ComponentClass) {
		var ret = {};
		if (ComponentClass) {
			if (ComponentClass.superclass)
				Util.apply(ret, Component._getOperations(ComponentClass.superclass));
			if (ComponentClass.prototype && ComponentClass.prototype._operations_)
				Util.apply(ret, ComponentClass.prototype._operations_);
		}
		return ret;
	};

	Component.register = function(name, ComponentClass) {
		ComponentClass.name = name;
		bind.bindingHandlers.component[name] = {
			init : function(element, value, allBindingsAccessor, viewModel, bindingContext) {
				var component = Component.getComponent(element);
				if (!component) {
					component = new ComponentClass({
						templateNode : element
					});
				}
				component.componentName = name;
				component.setModel(bindingContext.$model);
				var result = component.init(value, bindingContext, allBindingsAccessor);

				if (!(result && result['dependence'])) {
					component.inited();
				}

				return {
					controlsDescendantBindings : component.controlsDescendantBindings()
				};
			},

			update : function(element, value, allBindingsAccessor, viewModel, bindingContext) {
				// 注册组件依赖value中的对象
				for ( var i in value) {
					bind.utils.unwrapObservable(value[i]);
				}

				// 阻止组件update方法中的依赖计算到组件上
				bind.computedContext.ignore(function() {
					var component = Component.getComponent(element);
					if (typeof (component.update) === "function") {
						component.update(value, bindingContext, allBindingsAccessor);
					}
				});
			}
		};
	};

	return Component;
});