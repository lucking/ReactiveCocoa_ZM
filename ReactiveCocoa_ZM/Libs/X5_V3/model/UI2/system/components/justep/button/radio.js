/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	require("$UI/system/components/justep/common/res");

	var justep = require('$UI/system/lib/justep');

	var url = require.normalizeName("./radio");
	var ComponentConfig = require("./radio.config");

	var RadioButton = justep.BindComponent.extend({
		// 构造函数
		_defaultClass : "x-radio",
		_type : 'radio',

		getConfig : function() {
			return ComponentConfig;
		},

		constructor : function(options) {
			this.callParent(options);
			this.disabled = false;
			this.label = null;
			this.name = null;
			this.checkedValue = undefined;
			this.value = null;
			this.checked = false;
			this.on(justep.ViewComponent.DATA_CHANGED, function(event) {// 可以根据属性值变化事件更新value和label
				if ('ref' == event.name)
					return;
				var param = {};
				param[event.name] = event.value;
				this.set(param);
			}, this);
		},
		dispose : function() {
			this._getInput().off('change', $.proxy(this._doClick, this));
			this.callParent();
		},
		val : function() {
			if (arguments.length === 0)
				return this.value;
			this.value = arguments[0];
			this._getInput().val(this.value).prop('checked', this.checkedValue === undefined ? this.value : this.checkedValue == this.value);//lzg 这里没有使用===原因是有可能数据是int等类型
		},
		_buildInput : function(config) {
			return "<input"
					+ (config['name'] ? (" name='" + config['name'] + "'") : "") + " value='" + config['value'] + "'"
					+ (config['checked'] ? " checked" : "") + (config['bind-value'] ? (" bind-value='" + config['bind-value'] + "'") : "")
					+ " type='" + this._type + "'/>";
		},
		_buildLabel : function(config) {
			return "<label"
					+ (config['bind-label'] ? (" bind-label='" + config['bind-label'] + "'") : "") + ">" + (config['label'] ? config['label'] : '')
					+ "</label>";
		},
		buildTemplate : function(config) {
			if (!config)
				config = {};
			this.set(config);
			/*
			 * <span class="xui-radio"> <input id="toggle00" disabled="disabled"
			 * type="radio" name="toggle0-1" value="1"/> <label for="toggle00"
			 * class="">选择1</label> </span>
			 */
			if (!config['class'])
				config['class'] = this._defaultClass;
			return "<span"
					+ (config['class'] ? (" class='" + config['class'] + "'") : "") + (config.style ? (" style='" + config.style + "' ") : "")
					+ (config.xid ? (" xid='" + config.xid + "' ") : "") + " component='" + url + "'>" + this._buildInput(config)
					+ this._buildLabel(config) + "</span>";
		},
		doInit : function(value, bindingContext) {
			var $label = this._getLabel(), $input = this._getInput(), inputID = $input.attr('id');
			if (!inputID)
				$input.attr('id', justep.UUID.createUUID());
			$label.attr("for", $input.attr('id'));
			$input.on('change', $.proxy(this._doClick, this));

			var name = this.$domNode.attr('name');
			if(name) $input.attr('name',name);
			
			if (value && !value.hasOwnProperty('ref')) {
				var o = {};
				if(justep.Bind.isObservable(value.value))
					o.value = value.value.get();
				if(justep.Bind.isObservable(value.label))
					o.label = value.label.get();
				this.set(o);
			}
		},
		doUpdate : function(value, bindingContext) {
			if (value) {
				if (value.hasOwnProperty('ref')) {
					this.updateValue(value.ref);// 数据更新
					this.updateReadonly(value.ref);// 只读状态更新,当有ref时按ref感知，否则使用value
				} else
					this.updateReadonly(value.value);
			}
		},
		_doClick : function(evt) {
			var checked = this._getInput()[0].checked;
			this.value = this.checkedValue === undefined ? checked : (checked ? this.checkedValue : null);
			this.fireEvent('onChange', {
				source : this,
				checked : checked,
				value : this.value
			});
			this.val2ref();
		},
		_getInput : function() {
			return this.$domNode.children('input');
		},
		_getLabel : function() {
			return this.$domNode.children('label');
		},
		get: function(attr){
			if('checked'===attr) return this._getInput().prop('checked');
			return this.callParent(attr);
		},
		propertyChangedHandler : function(key, oldVal, value) {
			switch (key) {
			case "label":
				if (oldVal != value && this.$domNode)
					this._getLabel().text(value);
				break;
			case "value":
				if (oldVal != value && this.$domNode)
					this.val(value);
				break;
			case "checked":
				if (oldVal != value && this.$domNode)
					this._getInput().prop('checked', value);
				break;
			case "name":
			case "disabled":
				if (oldVal != value && this.$domNode)
					this._getInput().attr(key, value);
				break;
			default:
				this.callParent(key, oldVal, value);
			}
		}
	});

	justep.Component.register(url, RadioButton);
	return RadioButton;
});