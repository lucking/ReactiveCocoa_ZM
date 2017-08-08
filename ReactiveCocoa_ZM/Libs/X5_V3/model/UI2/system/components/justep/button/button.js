/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	require("$UI/system/components/justep/common/res");
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");

	var url = require.normalizeName("./button");
	var ComponentConfig = require("./button.config");

	var Button = justep.BindComponent.extend({
		// 构造函数
		constructor : function(options) {
			this.callParent(options);
			this.disabled = false;
			this.icon = '';
			this.label = '';
			this.target = '';
			this.opIcon = '';
			this.opLabel = '';
			this.isImgIcon = false;
			this.imgIcon = [ '', '' ];// 分别表示可用和不可用
			this.on(justep.Component.OPERATION_CHANGED, function(event){
				this.getModel().componentPromise(this.domNode).done(function(btn){
					btn._doOperationChanged(event);
				});
			},this);
		},
		getConfig : function() {
			return ComponentConfig;
		},
		dispose : function() {
			this.$domNode.off('touchstart');
			this.$domNode.off('click', $.proxy(this._doClick, this));

			this.callParent();
		},
		buildTemplate : function(config) {
			if (!config)
				config = {};
			this.set(config);
			if (!config['class'])
				config['class'] = 'btn btn-default';
			return "<a class='" + config['class'] + "' " + (config['style'] ? (" style='" + config['style'] + "' ") : "")
					+ (config.xid ? (" xid='" + config.xid + "' ") : "") + " component='" + url + "' " + " ><i class='"
					+ (!this.isImgIcon ? config.icon : "") + "'/>"
					+ (this.isImgIcon ? ("<img src='" + (this.imgIcon[this.disabled ? 1 : 0]) + "'/>") : "") + "<span>"
					+ (config.label ? config.label : "") + "</span></a>";
		},
		doInit : function(value, bindingContext) {
			this.$domNode.on('click', $.proxy(this._doClick, this));
			if (this.target) {
				this._bindTargetEvent(this.target);
			}
		},
		_bindTargetEvent : function(targetID) {
			var m = this.getModel(), me = this;
			m.componentPromise(targetID).done(function(comp) {
				comp.on('onActive', me._doActiveTarget, me);
				comp.on('onInactive', me._doInactiveTarget, me);
				if (typeof (comp['isActive']) == 'function' && comp['isActive']())
					me.addClass('active');
			});
			this.on('onClick', this._doClickActiveTarget, this);
		},
		_unBindTargetEvent : function(targetID) {
			if (targetID) {
				var m = this.getModel(), me = this;
				m.componentPromise(targetID).done(function(comp) {
					comp.off('onActive', me._doActiveTarget, me);
					comp.off('onInactive', me._doInactiveTarget, me);
				});
				this.off('onClick', this._doClickActiveTarget, this);
			}
		},
		_doActiveTarget : function(evt) {
			this.addClass('active');
		},
		_doInactiveTarget : function(evt) {
			this.removeClass('active');
		},
		_doClickActiveTarget : function(evt) {
			var m = this.getModel(), comp = m.comp(this.target);
			if (comp && typeof (comp['active']) == 'function')
				comp['active']();
		},
		_doOperationPropChanged : function(evt) {
			if (evt.property == 'label')
				this.set({
					opLabel : evt.value
				});
			else if (evt.property == 'icon')
				this.set({
					opIcon : evt.value
				});
			else if (evt.property == 'enable')
				this.set({
					disabled : !evt.value
				});
		},
		_doOperationChanged : function(event) {
			if ("onClick" == event.eventName) {
				var op;
				var me = this;
				if (this.operation) {// 如果存在绑定先解除
					op = this.operation;
					this.getModel().componentPromise(op.owner).done(function(comp) {
						comp.unOpChange(op.name, me._doOperationPropChanged, me);
					});
				}
				var defOp = this.getEventOperation("onClick");
				if($.isArray(defOp)) defOp = defOp.length>0?defOp[0]:null;// 默认感知第一个操作
				if (defOp) {
					op = this._getOperation(defOp.operation);
					if (op) {
						this.operation = op;// 进行缓存
						defOp.operation = op;
						this.getModel().componentPromise(op.owner).done(function(comp) {
							// {property: 'label/icon/enable/visible', oldValue:
							// oldValue, value: value}
							comp.onOpChange(op.name, me._doOperationPropChanged, me);
							var prop = {};
							prop['opIcon'] = comp.getOperationIcon(op.name);
							prop['opLabel'] = comp.getOperationLabel(op.name);
							prop['disabled'] = !comp.getOperationEnable(op.name);
							me.set(prop);
						});
					}
				}
			}
		},
		_getLabelNode : function() {
			return this.$domNode.children('span');
		},
		_getIconNode : function() {
			return this.$domNode.children('i');
		},
		_getImgNode : function() {
			return this.$domNode.children('img');
		},
		propertyChangedHandler : function(key, oldVal, value) {
			switch (key) {
			case "label":
			case "opLabel":
				if (oldVal != value && this.$domNode)
					this._getLabelNode().text(this.label || this.opLabel);
				break;
			case "target":
				if (oldVal != value && this._inited) {
					this._unBindTargetEvent(oldVal);
					this._bindTargetEvent(value);
				}
				break;
			case "icon":
			case "opIcon":
				if (oldVal != value) {
					this._setIcon(this.icon || this.opIcon);
					if (this.$domNode) {
						if (!this.isImgIcon) {
							if (oldVal)
								this._getIconNode().removeClass(oldVal);
							if (value)
								this._getIconNode().addClass(this.icon || this.opIcon);
							this._getImgNode().remove();
						} else {
							if (value) {
								var img = this._getImgNode();
								if (img.size() <= 0)
									this._getLabelNode().before('<img/>');
								this._getImgNode().attr('src', this.imgIcon[this.disabled ? 1 : 0]);
								this._getIconNode().removeAttr('class');
							}
						}
					}
				}
				break;
			case "disabled":// 这里没有break，需要执行callParent
				if (oldVal != value && this.isImgIcon && this.$domNode) {
					this._getImgNode().attr('src', this.imgIcon[this.disabled ? 1 : 0]);
				}
				value ? this.$domNode.attr('disabled', true) : this.$domNode.removeAttr('disabled');
				break;
			default:
				this.callParent(key, oldVal, value);
			}
		},
		_setIcon : function(icon) {// "icon-refresh"/"img:xxx.png|xxx.png"
			if (typeof (icon) === 'string' && 0 === icon.indexOf('img:')) {
				this.isImgIcon = true;
				var ipos = icon.indexOf('|');
				if (ipos < 0)
					ipos = icon.length;
				this.imgIcon[0] = require.toUrl(icon.slice(4, ipos));
				this.imgIcon[1] = require.toUrl(icon.slice(ipos + 1, icon.length));
			} else
				this.isImgIcon = false;
		},
		_doClick : function(evt) {
			this.fireEvent('onClick', {
				source : this
			});
		},
		render : function() {
			this.callParent();
		}
	});

	justep.Component.register(url, Button);
	return Button;
});