/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	require("$UI/system/components/justep/common/res");

	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var Express = justep.Express;
	var Bind = justep.Bind;
	var Data = require("../data/data");

	var url = require.normalizeName("./list");
	var ComponentConfig = require("./list.config");

	var List = justep.BindComponent.extend({
		getConfig : function() {
			return ComponentConfig;
		},
		constructor : function(options) {
			this.filter = '';
			this.pageIndex = Bind.observable(-1);
			this.limit = -1;// -1时不自动加载，感知data的数据
			this.data = '';
			this.hasMore = false;
			this.autoLoad = true;
			this.disabled = false;
			this._canLoadData = false;
			this.disablePullToRefresh = false;
			this.disableInfiniteLoad = false;
			this.callParent(options);
		},
		dispose : function() {
			this.callParent();
		},
		buildTemplate : function(config) {
			if (!config)
				config = {};
			this.set(config);
			if (!config['class'])
				config['class'] = 'x-list';
			return "<div class='" + config['class'] + "' " + (config.style ? (" style='" + config.style + "' ") : "")
					+ (config.xid ? (" xid='" + config.xid + "' ") : "") + " component='" + url + "' " + " >" + "<div class='x-list-head'>"
					+ (config.head ? config.head : '') + "</div>" + "<div class='x-list-content'>" + (config.template ? config.template : '')
					+ "</div>" + "</div>";
		},
		getData : function() {
			return this.getModel().comp(this.data);
		},
		doInit : function(value, bindingContext) {
			this._bindEvent();
			this._createForeachData();
			if (this.autoLoad) {
				var model = this.getModel();
				if(justep.ModelBase.MODEL_STATUS_CONSTRUCT_DONE>model.getStatus()) model.on(justep.ModelBase.MODEL_CONSTRUCT_DONE_EVENT, this.refresh.bind(this, false));
				else justep.Bind.utils.domNodeReady.addReadyCallback(this.domNode, this.refresh.bind(this, false));
			}
		},
		_bindEvent : function() {
			var model = this.getModel();
			// 只能接自己祖先节点的上的pullDown, pullUp这两个事件
			model.on("onPullDown", function(evt) {
				if (!this.disablePullToRefresh && this._isSelfRefresh(evt.source))
					this.refresh(true);
			}, this);
			model.on("onPullUp", function(evt) {
				if (!this.disableInfiniteLoad && this._isSelfRefresh(evt.source)) {
					this.loadNextPage();
					evt.noMoreLoad = !this.hasMore;
				}
			}, this);
			this._getForeachNode().on('click', {
				comp : this
			}, function(evt) {
				evt.data.comp._doRowClick(evt);
				return true;
			});
		},
		_isSelfRefresh : function(refreshComp) {
			return this._getForeachNode().parents('.x-scroll')[0] == refreshComp.domNode;
		},
		_doRowClick : function(evt) {
			var bindContext = Bind.contextFor(evt.target || evt.srcElement);
			if (bindContext) {
				var row = bindContext.$object;//, data = this.getData();
				if(row instanceof Data.Row)	row.data.to(row);
			}
		},
		_createForeachData : function() {
			// 创建bind的foreach数据源
			var model = this.getModel();
			var self = this;
			if ('function' != typeof (model["foreach_" + this.$domNode.attr('xid')]))
				model["foreach_" + this.$domNode.attr('xid')] = function($element) {
					var comp = justep.Component.getComponent($($element).parents("div[component='" + self.componentName + "']:first")[0]);
					return comp._computedForeach();
				};
			if ('function' != typeof (model["foreach_afterRender_" + this.$domNode.attr('xid')]))
				model["foreach_afterRender_" + this.$domNode.attr('xid')] = function($element) {
					var comp = justep.Component.getComponent($($element).parents("div[component='" + self.componentName + "']:first")[0]);
					return comp._afterRenderForeach();
				};
		},
		_afterRenderForeach : function() {
			this._getForeachNode().trigger('afterRenderList');
			this.fireEvent('onAfterRender', {
				source : this
			});
		},
		_computedForeach : function() {
			if (!this.__computed) {
				this.__computed = true;
				try {
					this.bindingObjects = this.getForeachData();
					return this.bindingObjects;
				} finally {
					this.__computed = false;
				}
			}
		},
		_getForeachNode : function() {
			return this.$domNode.find('.x-list-template:first');
		},
		propertyChangedHandler : function(key, oldVal, value) {
			this.callParent(key, oldVal, value);
		},
		getBindingObjects : function() {
			return this.bindingObjects ? this.bindingObjects : [];
		},
		getForeachData : function() {
			if (this.pageIndex.get() == -1)
				return [];
			if (this.data) {
				var data = this.getData();
				if (data instanceof Data) {
					var datas = data.datas.get(), list_limit = (-1 == this.limit ? data.limit : this.limit);
					var size = datas.length, offset = (-1 == this.limit ? (-1 == data.limit ? size : data.getOffset()) : (list_limit * this.pageIndex
							.get())), total = data.getTotal();
					this.hasMore = offset < size || (size > 0 && total > 0 && (offset - (-1 == this.limit?0:list_limit)) < total);
					if (data.limit != list_limit || this.filter) {
						if (this.filter && 'string' == typeof (this.filter))
							this.filter = new Express(this.filter);
						var ret = [];
						var ctx = Bind.contextFor(this.domNode);
						for ( var i = 0, j = 0; (i < offset && j < size); j++) {
							var b = true;
							if (this.filter instanceof Express) {
								ctx.$row = datas[j];
								b = Express.eval(this.filter, ctx.$object, ctx);
							}
							if (b) {
								ret.push(datas[j]);
								i++;
							}
						}
						delete ctx.$row;
						if (i < offset && size < total && this._canLoadData) {
							if (data.loaded) {
								data.loadNextPageData({
									append : true
								});
								if (datas.length > size)
									return this.getForeachData();// 增加判断，如果没有加载到数据不再进行数据加载
							}
						}
						return ret;
					} else {
						if (offset <= size) {
							return datas;
						} else {
							if (data.loaded && size < total && this._canLoadData) {
								data.loadNextPageData({
									append : true
								});
								if (datas.length > size)
									return this.getForeachData();// 增加判断，如果没有加载到数据不再进行数据加载
								else
									return datas;
							} else
								return datas;
						}
					}
				}
			}
			return [];
		},
		loadNextPage : function() {
			if (this.hasMore) {
				if (-1 == this.limit)
					this.getData().loadNextPageData({
						append : true
					});
				else {
					var i = this.pageIndex.get();
					this._canLoadData = true;
					try {
						this.pageIndex.set(i + 1);
					} finally {
						this._canLoadData = false;
					}
				}
			}
		},
		refresh : function(refreshData) {
			if (this.data) {
				var data = this.getData();
				if (data instanceof Data && (refreshData || (!data.autoLoad && !data.isLoaded()))) {
					data.refreshData();
				}
				this._canLoadData = true;
				try {
					this.pageIndex.set(1);
				} finally {
					this._canLoadData = false;
				}
				if (data instanceof Data) data.first();
			}
			this._getForeachNode().removeClass('hide');
		}
	});

	justep.Component.register(url, List);
	return List;
});