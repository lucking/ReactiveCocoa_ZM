/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	require("$UI/system/components/justep/common/res");

	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	//目前全部引入,需要机制处理
	var DatePicker = require("./js/datePickerPC");
	require("./js/datePicker");

	var url = require.normalizeName("./input");
	var ComponentConfig = require("./input.config");

	var Input = justep.BindComponent.extend({
		getConfig : function() {
			return ComponentConfig;
		},
		// 构造函数
		constructor : function(options) {
			this.callParent(options);
			this.disabled = false;
			this.readonly = false;
			this.placeHolder = "";
			this.value = "";
			this.format = "";
			this.pattern = "";
			this.autoFocus = false;
			this.autoComplete = false;
			this.min = null;
			this.max = null;
			this.minLength = 1;
			this.maxLength = null;
			this.dataType = "String";
		},

		dispose : function() {
			this.$domNode.off('change').off('focus').off('blur');
			this.callParent();
		},

		// 动态创建组件
		buildTemplate : function(config) {
			if (!config)
				config = {};
			this.set(config);
			if (!config['class'])
				config['class'] = 'form-control';
			return "<input class='"
					+ config['class'] + "' " + (config.style ? (" style='" + config.style + "' ") : "")
					+ (config.xid ? (" xid='" + config.xid + "' ") : "") + " component='" + url + "' " + " ></input>";
		},

		_doDataTypeChange : function() {
			if (justep.Bind.isObservable(this.ref) && this.ref['define']) {
				var t = this.ref['define'].defCol.type;
				if (t !== this.dataType) {
					this.set({
						dataType : t
					});
				}
			}
		},
		_bindDataType : function() {
			if (this.dataType == 'DateTime' || this.dataType == 'Date' || this.dataType == 'Time') {
				if (!this.format) {
					if ('DateTime' == this.dataType)
						this.format = "yyyy-MM-dd hh:mm:ss";
					else if ('Date' == this.dataType)
						this.format = "yyyy-MM-dd";
					else if ('Time' == this.dataType)
						this.format = "hh:mm:ss";
				}
				var that = this;
				var type = this.dataType.toLowerCase(), format = justep.Date.STANDART_FORMAT;
				if (type == 'date')
					format = justep.Date.STANDART_FORMAT_SHOT;
				else if (type == 'time')
					format = "hh:mm:ss";
				this.$domNode.addClass(type).attr('readonly', true);
				if(justep.Browser.isMobile){
					this.$domNode.datePicker({
						preset : type,
						seconds : true,
						ampm : false,
						format : format,
						dispalyFormat : this.format,
						beforeShow : function(input, picker) {
							if (that.min)
								picker.settings['startDate'] = that._doCalcDateExpr(that.min);
							if (that.max)
								picker.settings['endDate'] = that._doCalcDateExpr(that.max);
						}
					});
				}else{
					var self = this;
					this.$domNode.on('click',function(){
						DatePicker.show(self,type==='date'?0:3,true);
					});
				}
			} else if (this.dataType)
				this.$domNode.addClass(this.dataType.toLowerCase());
		},
		_unbindDataType : function(dataType) {
			if(this.$domNode){
				this.$domNode.removeClass(dataType);
				if (dataType != 'DateTime' && dataType != 'Date' && dataType != 'Time')
					this.$domNode.datePicker('destroy');
			}
		},
		_doCalcDateExpr : function(expr) {
			var v = this._doCalcExpr(expr);
			if (justep.Bind.isObservable(v))
				v = v.get();
			if (v instanceof Date)
				return v;
			else if ('string' == typeof (v))
				return justep.Date.fromString(v, justep.Date.STANDART_FORMAT_SHOT);
			else {
				var msg = new justep.Message(justep.Message.JUSTEP231090);
				throw justep.Error.create(msg);
			}
		},
		_doCalcExpr : function(expr) {
			this._expr = this._expr || {};
			if (!this._expr[expr])
				this._expr[expr] = new justep.Express(expr);
			var ctx = justep.Bind.contextFor(this.domNode);
			return justep.Express.eval(this._expr[expr], ctx.$object, ctx);
		},
		// 初始化
		doInit : function(value, bindingContext) {
			var self = this;
			this.$domNode.on('change', $.proxy(this.doChange, this)).on('focus',function(){
				if(!self.$domNode.prop('readonly')) self.$domNode.val(self.value);
			}).on('blur',function(){
				self.render();
			});
			this._bindDataType();
		},
		doUpdate : function(value, bindingContext, allBindings) {
			this._doDataTypeChange();
			this.callParent(value, bindingContext, allBindings);
		},
		propertyChangedHandler : function(key, oldVal, value) {
			switch (key) {
			case "format":
				if (!this.format) {
					if ('DateTime' == this.dataType)
						this.format = "yyyy-MM-dd hh:mm:ss";
					else if ('Date' == this.dataType)
						this.format = "yyyy-MM-dd";
					else if ('Time' == this.dataType)
						this.format = "hh:mm:ss";
				}
				if (oldVal != value)
					this.needRender = this._inited;
				break;
			case "value":
				if (oldVal != value) {
					if (this._inited) {
						this.fireEvent('onChange', {
							source : this,
							originalValue : oldVal,
							value : value
						});
						this.val2ref();
					}
				}
				this.needRender = this._inited;
				break;
			case "dataType":
				if (oldVal != value) {
					this.needRender = this._inited;
					this._dataTypeChanged = true;
					this._unbindDataType(oldVal);
				}
				break;
			default:
				this.callParent(key, oldVal, value);
			}
		},
		render : function() {
			this.callParent();
			if(this._dataTypeChanged){
				this._bindDataType();
				this._dataTypeChanged = false;
			}
			var val = this.value;
			var d;
			if (val) {
				if ('DateTime' == this.dataType) {
					d = val instanceof Date ? val : justep.Date.fromString(val, justep.Date.STANDART_FORMAT);
					val = justep.Date.toString(d, this.format);
				} else if ('Date' == this.dataType) {
					d = val instanceof Date ? val : justep.Date.fromString(val, justep.Date.STANDART_FORMAT_SHOT);
					val = justep.Date.toString(d, this.format);
				} else if ('Time' == this.dataType) {
					d = val instanceof Date ? val : justep.Date.fromString(val, "hh:mm:ss");
					val = justep.Date.toString(d, this.format);
				}
			}
			if (val === undefined || val === null)
				val = '';
			var eData = {
				source : this,
				value : this.value,
				text : val
			};
			this.fireEvent('onRender', eData);
			this.$domNode.val(eData.text);
		},
		val : function(v) {
			if (arguments.length === 0)
				return this.value;
			this.set({
				value : v
			});
		},
		doChange : function(evt) {
			this.set({
				value : this.$domNode.val()
			});
		},

		clear : function() {
			this.set({
				value : null
			});
		}
	});

	justep.Component.register(url, Input);
	return Input;
});