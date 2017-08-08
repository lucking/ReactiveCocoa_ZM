/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var Util = require("$UI/system/components/justep/common/designer/common");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var xuiDoc = xuiService.getXuiDoc();
	var Button = require("../button");
	var ButtonGroup = require("../buttonGroup");
	var Radio = require("../radio");
	var Checkbox = require("../checkbox");
	var Toggle = require("../toggle");
	require('css!./css/button').load();

	var _Button = Button.extend({
		init : function(value, bindingContext) {
			var $domNode = $(this.domNode);
			this.callParent(value, bindingContext);
			var cfg = Util.attr2js($domNode, [ 'label', 'icon', 'image' ]);
			if (cfg)
				this.set(cfg);
			var onclick = $domNode.attr('onClick');
			if (onclick && 0 < onclick.indexOf('operation')) {
				// 操作感知
				this.on('onClick', onclick);
			}
			$domNode.removeAttr('onclick').off('click');
			this._d_inited_ = true;
			this._getLabelNode().attr('d_selectable', false).attr("d_canRemove", false).attr("d_canAddChild", false);
			this._getIconNode().attr('d_selectable', false).attr("d_canRemove", false).attr("d_canAddChild", false);
			this._getImgNode().attr('d_selectable', false).attr("d_canRemove", false).attr("d_canAddChild", false);
		},
		bindOperation : function(data) {
			if (data && data.eventName)
				this.on(data.eventName, data.value);
		},
		propertyChangedHandler : function(key, oldVal, value) {
			switch (key) {
			case "label":
				this.callParent(key, oldVal, value);
				if (this._d_inited_)
					xuiDoc.updateText(this._getLabelNode());
				break;
			case "icon":
				if (oldVal != value) {
					var $img,$icon;
					this._setIcon(this.icon || this.opIcon);
					if (this.$domNode) {
						if (!this.isImgIcon) {
							$icon = this._getIconNode();
							if (oldVal)
								$icon.removeClass(oldVal);
							if (this.opIcon)
								$icon.removeClass(this.opIcon);
							if (value)
								$icon.addClass(this.icon || this.opIcon);
							xuiDoc.updateProperties($icon, [ 'class' ]);
							$img = this._getImgNode();
							if ($img.size() > 0) {
								xuiDoc.deleteComponent([ $img.attr('d_id') ]);
								$img.remove();
							}
						} else {
							$img = this._getImgNode();
							if (value) {
								$icon = this._getIconNode();
								$icon.removeAttr('class');
								xuiDoc.updateProperties($icon, [ 'class' ]);
								if ($img.size() <= 0)
									this._getLabelNode().before('<img d_selectable="false" d_canRemove="false"/>');
								$img = this._getImgNode();
								$img.attr('src', this.imgIcon[this.disabled ? 1 : 0]);
								xuiDoc.updateNodes($img);
							}
						}
					}
				}
				break;
			default:
				this.callParent(key, oldVal, value);
			}
		}
	});

	var _ButtonGroup = ButtonGroup.extend({
		init : function(value, bindingContext) {
			var $domNode = $(this.domNode);
			var cfg = Util.attr2js($domNode, [ 'selected' ]);
			this.callParent(value, bindingContext);
			if (cfg)
				this.set(cfg);
			this.$domNode.off('click');
		},
		addButton : function() {
			xuiDoc.createComponent('$UI/system/components/justep/button/button', this, {
				paintComponent : true
			});
		}
	});

	function createRadioButton(button, type) {
		button.$domNode = $(button.domNode);
		button.$domNode.append("<input type='" + type + "'/><label/>");
		var cfg = Util.attr2js(button.$domNode, [ 'label', 'name', 'value' ]);
		if (cfg)
			button.set(cfg);
	}

	var _Radio = Radio.extend({
		init : function(value, bindingContext) {
			createRadioButton(this, 'radio');
			this.callParent(value, bindingContext);
			this._getInput().off('click');
		}
	});

	var _Checkbox = Checkbox.extend({
		init : function(value, bindingContext) {
			createRadioButton(this, 'checkbox');
			this.callParent(value, bindingContext);
			this._getInput().off('click');
		}
	});

	function createToggle(button) {
		button.$domNode = $(button.domNode);
		var type = button.$domNode.attr('type'), onLabel = button.$domNode.attr('ON'), offLabel = button.$domNode.attr('OFF');
		if (!type)
			type = 'radio';
		if (!onLabel)
			onLabel = 'ON';
		if (!offLabel)
			offLabel = 'OFF';
		button.$domNode.append("<input type='" + type + "'/><label data-on='" + onLabel + "' data-off='" + offLabel + "'><span/></label>");
		var cfg = Util.attr2js(button.$domNode, [ 'name', 'value' ]);
		if (!cfg)
			cfg = {};
		cfg['label'] = {
			on : onLabel,
			off : offLabel
		};
		if (cfg)
			button.set(cfg);
	}

	var _Toggle = Toggle.extend({
		init : function(value, bindingContext) {
			createToggle(this);
			this.callParent(value, bindingContext);
			this._getInput().off('click');
			this.ON = this.label.on;
			this.OFF = this.label.off;
		},
		propertyChangedHandler : function(key, oldVal, value) {
			switch (key) {
			case "ON":
			case "OFF":
				if (this._inited) {
					this.set({
						label : {
							on : this.ON,
							off : this.OFF
						}
					});
				}
				break;
			default:
				this.callParent(key, oldVal, value);
			}
		}
	});

	return {
		'$UI/system/components/justep/button/button' : _Button,
		'$UI/system/components/justep/button/buttonGroup' : _ButtonGroup,
		'$UI/system/components/justep/button/radio' : _Radio,
		'$UI/system/components/justep/button/checkbox' : _Checkbox,
		'$UI/system/components/justep/button/toggle' : _Toggle
	};
});