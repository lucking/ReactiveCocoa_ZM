/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery"), Expr = require('./express'), Util = require('./util'), Observable = require("./observable"), Object = require('./object');

	var Operation = Object.extend({
		mixins : Observable,
		constructor : function(config, owner) {
			this.owner = owner;
			this.label = "";
			this.icon = "";
			this.enable = true;
			this.visible = true;
			Util.apply(this, config);
			Observable.prototype.constructor.call(this);
			if ('function' == typeof (this.init))
				this.init();
		},

		/**
		 * 获取显示名称
		 * 
		 * @method getLabel
		 * @returns {String}
		 */
		getLabel : function() {
			return this.label;
		},
		/**
		 * 设置显示名称
		 * 
		 * @method setLabel
		 * @param {String}
		 *            value 显示名称
		 */
		setLabel : function(value) {
			if (this.label != value) {
				var oldValue = this.label;
				this.label = value;
				this.fireEvent('change', {
					property : 'label',
					oldValue : oldValue,
					value : value
				});
			}
		},
		/**
		 * 获取图标样式
		 * 
		 * @method getIcon
		 * @returns {String}
		 */
		getIcon : function() {
			return this.icon;
		},
		/**
		 * 设置图标样式
		 * 
		 * @method setIcon
		 * @param {String}
		 *            value 显示名称
		 */
		setIcon : function(value) {
			if (this.icon != value) {
				var oldValue = this.icon;
				this.icon = value;
				this.fireEvent('change', {
					property : 'icon',
					oldValue : oldValue,
					value : value
				});
			}
		},
		/**
		 * 获取是否可用
		 * 
		 * @method getEnable
		 * @returns {Boolean}
		 */
		getEnable : function() {
			return (!this.getInnerEnable || this.getInnerEnable()) && !!this.enable;
		},
		/**
		 * 设置是否可用
		 * 
		 * @method setEnable
		 * @param {Boolean}
		 *            value
		 */
		setEnable : function(value) {
			if (value !== false)
				value = true;
			if (this.enable != value) {
				this.enable = value;
				value = this.getEnable();
				this.fireEvent('change', {
					property : 'enable',
					oldValue : !value,
					value : value
				});
			}
		},
		/**
		 * 获取可见性
		 * 
		 * @method getVisible
		 * @returns {Boolean}
		 */
		getVisible : function() {
			return !!this.visible;
		},
		/**
		 * 设置可见性
		 * 
		 * @method setVisible
		 * @param {Boolean}
		 *            value
		 */
		setVisible : function(value) {
			if (value !== false)
				value = true;
			if (this.visible != value) {
				this.visible = value;
				this.fireEvent('change', {
					property : 'visible',
					oldValue : !value,
					value : value
				});
			}
		},
		_initParams : function(ctx) {
			var ret = {};
			if ($.isArray(this.argsDef)) {
				for ( var i = 0; i < this.argsDef.length; i++) {
					var name = this.argsDef[i].name, p;
					if (ctx.args && ctx.args[name]) {
						if (!ctx._argExprs)
							ctx._argExprs = {};
						if ('string' == typeof (ctx.args[name]) && !ctx._argExprs[name]) {
							try {
								ctx._argExprs[name] = new Expr(ctx.args[name]);
							} catch (e) {
								// 忽略创建表达式的异常，认为是普通字符串
							}
						}
						if (ctx._argExprs[name] instanceof Expr)
							p = Expr.eval(ctx._argExprs[name], this, ctx);
						else
							p = ctx.args[name];
					}
					ret[name] = p;
				}
			}
			return ret;
		},
		/**
		 * 执行操作
		 * 
		 * @method execute
		 */
		execute : function(ctx) {
			if (!this.enable)
				return;
			var args = this._initParams(ctx);
			return this.method(args);
		}
	});

	var Operational = Object.extend({
		/**
		 * 
		 */
		isOperational : true,
		/**
		 * 
		 */
		constructor : function(config) {
			this.$op_list = {};
			this.initOperation();
			this.customOperation(config ? config.operations : null);
		},
		/**
		 * 后代类超载initOperation方法, 用来定义自己的操作
		 */
		initOperation : function() {
		},
		/**
		 * 定制操作, 如果已存在修改以有值,如果不存则创建新的操作
		 * 
		 * @method customOperation
		 * @param {Object}
		 *            ops
		 */
		customOperation : function(ops) {
			for ( var name in ops) {
				this.defineOperation(name, ops[name]);
			}
		},
		/**
		 * 查询是否支持操作的方法
		 * 
		 * @method hasOperation
		 * @param name
		 * @returns {Boolean}
		 */
		hasOperation : function(name) {
			return !!this.$op_list[name];
		},
		/**
		 * 获取操作(Operation)的方法
		 * 
		 * @method getOperation
		 * @param {String}
		 *            name
		 * @returns {Operation}
		 */
		getOperation : function(name) {
			return this.$op_list[name];
		},
		/**
		 * 注册监听某个操作变化的方法， 如果操作发生变化将回到对象的operationNotify方法
		 * 
		 * @method onOpChange
		 * @param {String}
		 *            name
		 * @param {Function}
		 *            fn
		 */
		onOpChange : function(name, fn, scope, options) {
			if (this.$op_list[name])
				this.$op_list[name].on('change', fn, scope, options);
		},
		/**
		 * 取消监听的方法
		 * 
		 * @method unOpChange
		 * @param {String}
		 *            name
		 * @param {Object}
		 *            obj
		 */
		unOpChange : function(name, fn, scope) {
			if (this.$op_list[name]) {
				this.$op_list[name].un(name, fn, scope);
			}
		},
		/**
		 * 定义操作的方法
		 * 
		 * @method defineOperation
		 * @param {String}
		 *            name
		 * @param {Object}
		 *            config
		 * @example this.addOperation('save', { label: '保存', src: 'image_path',
		 *          disSrc: 'image_path', method: function(){ 'some code here' }
		 *          });
		 */
		defineOperation : function(name, config) {
			if (this.$op_list[name]) {
				// 覆盖已有的操作
				Util.apply(this.$op_list[name], config);
			} else {
				this.$op_list[name] = new Operation(config, this);
			}
			return this.$op_list[name];
		},
		/**
		 * 执行操作的方法
		 * 
		 * @method executeOperation
		 * @param {String}
		 *            name
		 */
		executeOperation : function(name, ctx) {
			if (this.$op_list[name])
				return this.$op_list[name].execute(ctx);
		},
		/**
		 * 设置操作可用
		 * 
		 * @method setOperationEnable
		 * @param {String}
		 *            name
		 * @param {Boolean}
		 *            [value=true]
		 */
		setOperationEnable : function(name, value) {
			this.$op_list[name] && this.$op_list[name].setEnable(value);
		},
		/**
		 * 获取操作可用性的方法
		 * 
		 * @method getOperationEnable
		 * @param {String}
		 *            name
		 * @returns {Boolean}
		 */
		getOperationEnable : function(name) {
			return this.$op_list[name] && this.$op_list[name].getEnable();
		},
		/**
		 * 设置操作可见
		 * 
		 * @method setOperationVisible
		 * @param {String}
		 *            name
		 * @param {Boolean}
		 *            [value=true]
		 */
		setOperationVisible : function(name, value) {
			this.$op_list[name] && this.$op_list[name].setVisible(value);
		},
		/**
		 * 获取是否操作可见
		 * 
		 * @method getOperationVisible
		 * @param {String}
		 *            name
		 * @returns {Boolean}
		 */
		getOperationVisible : function(name) {
			return this.$op_list[name] && this.$op_list[name].getVisible();
		},
		/**
		 * 设置操作都可以用, 或都不可以用
		 * 
		 * @method setOperationAllEnable
		 * @param {Boolean}
		 *            value
		 */
		setOperationAllEnable : function(value) {
			for ( var i in this.$op_list) {
				this.$op_list[i].setEnable(value);
			}
		},
		/**
		 * 设置操作的显示名称
		 * 
		 * @method setOperationLabel
		 * @param {String}
		 *            name
		 * @param {String}
		 *            value
		 */
		setOperationLabel : function(name, value) {
			this.$op_list[name] && this.$op_list[name].setLabel(value);
		},
		/**
		 * 获取操作显示名称的方法
		 * 
		 * @method getOperationLabel
		 * @param {String}
		 *            name
		 * @returns {String}
		 */
		getOperationLabel : function(name) {
			return this.$op_list[name] && this.$op_list[name].getLabel();
		},
		/**
		 * 设置操作的图标样式
		 * 
		 * @method setOperationIconClass
		 * @param {String}
		 *            name
		 * @param {String}
		 *            value
		 */
		setOperationIcon : function(name, value) {
			this.$op_list[name] && this.$op_list[name].setIcon(value);
		},
		/**
		 * 获取操作图标样式的方法
		 * 
		 * @method getOperationIconClass
		 * @param {String}
		 *            name
		 * @returns {String}
		 */
		getOperationIcon : function(name) {
			return this.$op_list[name] && this.$op_list[name].getIcon();
		}

	});

	return Operational;
});