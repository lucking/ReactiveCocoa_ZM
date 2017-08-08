/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var $ = require("jquery");
	var justep = require('$UI/system/lib/justep');
	var Bind = justep.Bind;
	var Model = justep.ModelBase;
	var Expr = justep.Express;
	var Rules = require("./js/rules");

	require("$UI/system/lib/bind/bind.validation");
	require('$UI/system/resources/system.res');

	var Row = justep.Object.extend({
		constructor : function(data, row) {
			this.data = data;
			this.row = row;
		},
		ref : function(name) {
			var col = this.row[name];
			return col?col.value:undefined;
		},
		val : function(name, value) {
			if (arguments.length == 1)
				return this.data.getValue(name, this);
			else
				this.data.setValue(name, value, this);
		},
		label : function(name) {
			return this.data.label(name);
		},
		parent : function() {
			return this.row.userdata ? this.row.userdata.parent : undefined;
		},
		hasChildren : function(){
			return this.rows && this.rows.get().length>0;
		},
		getID: function(){
			return this.data.getRowID(this);
		}
	});

	var Data = justep.ModelComponent
			.extend({
				constructor : function(model, config) {
					this.callParent();

					this.clz = Data;
					this.autoLoad = false;
					this.autoNew = false;
					this.isMainData = false;
					this.delim = ",";
					this.versionRelation = "version";
					this.updateMode = 'whereVersion';
					this.distinct = null;
					// tree定义
					this.defTreeOption = {
						'isTree' : false
					};
					this.orderBys = {};
					this.userdata = {};

					this.directDeleteMode = false;// 是否直接删除，默认false
					this.confirmDelete = true;
					this.confirmDeleteText = justep.Message.getMessage(justep.Message.JUSTEP231000);

					this.confirmRefresh = true;
					this.confirmRefreshText = justep.Message.getMessage(justep.Message.JUSTEP231001);

					this.offset = 0;
					this.limit = 20;
					this.dataType = 'json';
					// var self = this;

					this.xid = config ? config.xid : "";

					// this.indexParent = null;
					// this.index = -1;//this.indexParent+this.index唯一定位一行
					this.currentRow = Bind.observable();

					this.datas = this.allDatas = Bind.observableArray();
					this.allDatas.owner = this;
					this.setTotal(0);

					this.deleteDatas = Bind.observableArray();
					this.slaveDatas = [];
					this.isModified = Bind.observable(false);
					// 错误监听,修改机制不整体监控规则计算
					// this.errors =
					// Bind.validation.group(this.allDatas,{enable:this.isModified});
					// this._selfValid = Bind.observable(true);
					// this.errors.subscribe(function (errors) {
					// self._selfValid.set(errors.length === 0);
					// });
					// 数据修改
					this.isChanged = function() {
						return this.isSelfChanged() || this.isSlaveChanged();
					};

					this._init(model, config);
				},
				_getSelfValid : function() {
					var ret = true;
					this.eachAll(function(data) {
						var row = data.row, state = row.row.userdata.recordState;
						if (Data.STATE.NEW == state || Data.STATE.EDIT == state) {
							for ( var k in data.data.defCols) {
								var v = row.ref(k);
								if (v && Bind.isObservable(v.isValid) && !v.isValid.get()) {
									ret = false;
									data.cancel = true;
									break;
								}
							}
						}
					});
					return ret;
				},
				_getSelfInvalidInfo : function() {
					var ret = [];
					this.eachAll(function(data) {
						var row = data.row, state = row.row.userdata.recordState;
						if (Data.STATE.NEW == state || Data.STATE.EDIT == state) {
							for ( var k in data.data.defCols) {
								var v = row.ref(k);
								if (v && Bind.isObservable(v.error)) {
									var err = v.error.get();
									if (err)
										ret.push(err);
								}
							}
						}
					});
					return ret.join(';');
				},
				getReadonly : function(col, row) {
					if (col && row) {
						var obsv = row.ref(col);
						if (obsv && obsv.readonly && obsv.readonly.used)
							return obsv.readonly.computed.get();
						else
							this.readonly.get();
					} else
						return this.readonly.get();
				},
				clone : function(xid) {
					var cfg = $.extend({}, this.definition);
					cfg.xid = xid || Data.UUID();
					delete cfg.master;
					delete cfg.autoLoad;
					delete cfg.autoNew;
					return new this.clz(this.getModel(), cfg);
				},
				_dispose : function(o) {
					if (Bind.isObservable(o)) {
						o.extend({
							validatable : false,
							readonly : false
						});
						if (o.getSubscriptionsCount() > 0) {
							o._subscriptions.change = [];
						}
					} else if (Bind.isComputed(o)) {
						o.extend({
							validatable : false,
							readonly : false
						});
						if (o.target) {
							this._dispose(o.target);
							delete o.target;
						}
						o.dispose();
					} else if (Bind.validation.utils.isObservableArray(o)) {
						var rows = o.get(), i = 0;
						for (; i < rows.length; i++) {
							var r = rows[i].row;
							if (r.userdata && r.userdata.isModified)
								this._dispose(r.userdata.isModified);
							for ( var col in this.defCols) {
								this._dispose(r.ref(col));
							}
						}
						o.destroyAll();
					}
				},
				dispose : function() {
					Data.unRegisterData(this.getModel(), this.xid);

					this._dispose(this.readonly);
					this._dispose(this.index);
					this._dispose(this.indexParent);
					this._dispose(this.currentRow);
					this._dispose(this.isModified);
					// this._dispose(this._selfValid);
					this._dispose(this.allDatas);
					this._dispose(this.deleteDatas);

					delete this.readonly;
					delete this.index;
					delete this.indexParent;
					delete this.currentRow;
					delete this.isModified;
					// delete this['_selfValid'];
					delete this.allDatas;
					delete this.deleteDatas;
				},
				createErrorValue : function(value) {
					return Data.createErrorValue(value);
				},
				getContext : function() {
					return this.getModel().getContext();
				},
				getProcess : function() {
					return this.process || this.getContext().getProcess();
				},
				getActivity : function() {
					return this.activity || this.getContext().getActivity();
				},
				label : function(name) {
					var def = this.defCols[name];
					return def ? def.label : '';
				},
				_setLoaded : function(v, parent) {
					if (!parent) {
						this.loaded = v;
					} else {
						if (!parent.row.userdata)
							parent.row.userdate = {};
						parent.row.userdata._loaded = v;
					}
				},
				open : function() {
					if (!this.isLoaded())
						this.refreshData();
				},
				isLoaded : function(parent) {
					if (!parent || (this.defTreeOption.isTree && !this.defTreeOption.option.isDelayLoad))
						return this.loaded;
					else
						return parent.row.userdata && parent.row.userdata._loaded ? parent.row.userdata._loaded : false;
				},
				hasMore : function(parent){
					if (this.limit == -1) return false;
					var rows = parent?(parent.rows?parent.rows.get():[]):this.datas.get();
					return this.getTotal(parent)>rows.length;
				},
				getTotal : function(parent) {
					if (!parent)
						return this.total.get();
					else
						return parent.row.userdata && parent.row.userdata._total ? parent.row.userdata._total.get() : 0;
				},
				setTotal : function(v, parent) {
					if (!parent) {
						if (!this.total)
							this.total = Bind.observable();
						this.total.set(v);
					} else {
						if (!parent.row.userdata)
							parent.row.userdata = {};
						if (!parent.row.userdata._total)
							parent.row.userdata._total = Bind.observable();
						parent.row.userdata._total.set(v);
					}
				},
				getOffset : function(parent) {
					if (!parent)
						return this.offset;
					else
						return parent.row.userdata && parent.row.userdata._offset ? parent.row.userdata._offset : 0;
				},
				setOffset : function(v, parent) {
					if (!parent) {
						this.offset = v;
					} else {
						if (!parent.row.userdata)
							parent.row.userdata = {};
						parent.row.userdata._offset = v;
					}
				},
				ref : function(name, row) {
					if (this._inited) {
						if (typeof (row) !== 'object')
							row = this.currentRow.get();
						return row ? row.ref(name) : '';
					} else
						return '';
				},
				val : function(name, row) {
					return this.getValue(name, row);
				},
				eachAll : function(callback, caller, parent) {
					if ('function' !== typeof (callback))
						return;
					var allItems = !parent ? this.allDatas.get() : (Bind.isObservable(parent.rows) ? parent.rows.get() : []);
					var len = allItems.length;
					for ( var i = 0; i < len; i++) {
						var param = {
							index : i,
							row : allItems[i],
							cancel : false,
							parent : parent,
							data : this
						};
						callback.call(caller || param.row, param);
						if (param.cancel)
							return;
						if (Bind.isObservable(param.row.rows))
							if(!this.eachAll(callback, caller, param.row)) return;
					}
					return true;
				},
				each : function(callback, caller, parent) {
					this.eachAll(callback, caller, !parent ? {
						rows : this.datas
					} : parent);
				},
				getChildren : function(parent){
					return !parent?this.datas.get():(Bind.isObservable(parent.rows) ? parent.rows.get() : []);
				},
				isSelfChanged : function() {
					var ret = false;
					this.eachAll(function(data) {
						var state = data.row.row.userdata.recordState;
						if (Data.STATE.NEW == state || Data.STATE.EDIT == state) {
							ret = true;
							data.cancel = true;
						}
					});
					return ret || this.deleteDatas.get().length > 0;
				},
				isSlaveChanged : function() {
					var len = this.slaveDatas.length;
					for ( var i = 0; i < len; i++) {
						if (this.slaveDatas[i].isChanged())
							return true;
					}
					return false;
				},
				_bindMaster : function() {// 不支持多次绑定
					if (this.master && !this.master.masterData && this.master.xid) {
						this.master.masterData = Data.$(this.getModel(), this.master.xid);
						if (this.master.masterData) {
							this.master.masterData.slaveDatas.push(this);
							this.byMaster = {};
							// 主从过滤
							this.datas = this.filterByMaster();
							this.setTotal(0);
							// 生成主data index监听
							this.master.masterData.currentRow.subscribe(function(row) {
								if (undefined === row)
									return;
								var rid = this.master.masterData.getRowID(row);
								if (!this.byMaster[rid])
									this.byMaster[rid] = {};
								this.byMaster[rid].current = this.currentRow.get();
								this.byMaster[rid].offset = this.getOffset();
							}, this, "beforeChange");
						}
					}
				},
				_createReadonly : function() {
					if (typeof (this.definition.readonly) == 'string')
						this.definition.readonly = new Expr(this.definition.readonly);
					this.readonly = Bind.computed(function() {
						var ctx = {
							$model : this.getModel(),
							$data : this
						};
						return this.definition.readonly instanceof Expr ? Expr.eval(this.definition.readonly, this, ctx) : this.definition.readonly;
					}, this);
				},
				_init : function(model, config) {
					if (!model || !config)
						return;
					this.setModel(model);
					this.definition = config;
					// 创建data的只读
					this._createReadonly();
					this._initDefinition();
					// bind事件
					this.attachEvents(config.events);
					var func = function() {
						this._bindMaster();

						// 注册
						Data.registerData(model, this.xid, this);

						var eventData = {
							'source' : this
						};
						this.fireEvent(Data.EVENT_CREATE, eventData);

						// 标记组件初始化完成
						this.getModel().resolvedComponent(this.xid);
						this._inited = true;
					};

					var self = this;
					var doModelConstructing = function(ev) {
						if (self.autoNew && !self.master)
							self.newData();
						else if (self.autoLoad && !self.master){
							self.open();// 如果是从data依赖主data的自动加载
						}
					};

					if(!model.isConctructed())model.on(Model.MODEL_CONSTRUCTING_EVENT, doModelConstructing);
					else doModelConstructing();

					if (!this.master || this.master.masterData || !this.master.xid) {
						func.call(self);
					} else {// 有依赖的主data
						model.componentPromise(this.master.xid).then(function() {
							func.call(self);
						}, function(error) {// data[xid=self.xid]初始化失败，error
							var msg = new justep.Message(justep.Message.JUSTEP231078, self.xid, error);
							throw justep.Error.create(msg);
						});
					}
				},
				/**
				 * 进行定义信息处理 definition格式： {'queryAction' : "**QueryAction",
				 * 'newAction' : "**CreateAction", saveAction : "**SaveAction",
				 * dataModel : "...", concept : "{'sa_org概念名' : 'p 概念别名',...}",
				 * idColumn : "'列名，也就是列别名'", limit : 20, directDelete : true,
				 * confirmDelete : false, confirmDeleteText : "", confirmRefresh :
				 * false, confirmRefreshText : "", offset : 0, updateMode :
				 * "whereVersion", orderBys : "{'relation':0,'relation':1}",
				 * filters : "{'filterID':filter,...}", defaultValues :
				 * "{'relation别名' : '默认值',...}", defCols : "{'relation
				 * 别名':{'type 类型':'String','relation
				 * 名':'p.sName','label':'','define':'ksql中的define'}}", master :
				 * "{'id':'data id','relation':'relation name'}" treeOption :
				 * "{'delayLoad':true,'parentRelation':'父子关联的relation','rootFilter':'','nodeKindRelation':'','nodeLevelRelation':''}" }
				 */
				_initDefinition : function() {
					this.process = this.definition.process || "";
					this.activity = this.definition.activity || "";
					this.dataModel = this.definition.dataModel || "";

					if (this.definition.autoLoad)
						this.autoLoad = true;
					if (this.definition.autoNew)
						this.autoNew = true;

					if (this.definition.limit)
						this.limit = this.definition.limit;
					if (this.definition.offset)
						this.setOffset(this.definition.offset);

					if (this.definition.directDelete)
						this.directDeleteMode = this.definition.directDelete;// 是否直接删除，默认false

					if (this.definition.confirmDelete === false)
						this.confirmDelete = false;
					if (this.definition.confirmDeleteText)
						this.confirmDeleteText = this.definition.confirmDeleteText;

					if (this.definition.confirmRefresh === false)
						this.confirmRefresh = false;
					if (this.definition.confirmRefreshText)
						this.confirmRefreshText = this.definition.confirmRefreshText;

					if (this.definition.filterRelations)
						this.defFilterRelations = this.definition.filterRelations;

					if (this.definition.updateMode)
						this.updateMode = this.definition.updateMode;
					// 处理默认的排序orderBys
					// 格式{'relation':0,'relation':1}
					if(this.definition.orderBys)
						this.orderBys = this.definition.orderBys;
					// 处理定义的filter
					// 格式{'filterID':filter,...}
					var filters = this.definition.filters;
					for ( var o in filters)
						this.setFilter(o, filters[o]);
					// 处理relation定义
					// 格式{'sa_org概念名' : 'p 概念别名',...}
					this.concept = this.definition.concept;
					this.idColumn = this.definition.idColumn;
					// 格式{'relation别名' : '默认值',...}
					this.defaultValues = this.definition.defaultValues;
					this._initDefCols();
					this._initRules();
					// 格式{'统计relation 别名':realtion}
					this.defAggCols = this.definition.defAggCols;
					// 主从关系赋值
					// 格式{'id':'data id','relation':'relation
					// name','autoLoad':true}
					this.master = this.definition.master;
					// 树的属性赋值
					// treeOption :
					// "{'delayLoad':true,	'parentRelation':'父子关联的relation','rootFilter':'','nodeKindRelation':'','nodeLevelRelation':''}"
					if (this.definition.treeOption) {
						this.defTreeOption.isTree = true;
						this.defTreeOption.option = this.definition.treeOption;
					}else this.defTreeOption.option = {};
				},
				getTreeOption : function() {
					return this.defTreeOption.option;
				},
				_initDefCols : function() {
					// 格式{'relation 别名':{'type
					// 类型':'string','relation 名':'p.sName','label':''}}
					// 当relation=EXPRESS或STATISTICAL时type取值为OBJECT
					this.defCols = this.definition.defCols;
				},
				_initRules : function() {
					for ( var o in this.defCols) {
						var rules = this.defCols[o].rules;
						if (rules && !Bind.validation.utils.isObservableArray(rules)) {// 如果是isObservableArray说明已经处理过了
							var rlist = [];
							for ( var ruleName in rules) {
								// 特殊处理readonly和calculate，实现逻辑特殊
								if ('readonly' == ruleName || 'calculate' == ruleName) {
									(this.defCols[o])[ruleName] = rules[ruleName];
									delete rules[ruleName];
									continue;
								}
								var params = rules[ruleName];
								if (params && (params.message || params.onlyIf)) {
									rlist.push({
										rule : ruleName,
										message : params.message,
										params : Bind.validation.utils.isEmptyVal(params.params) ? true : params.params,
										condition : params.onlyIf
									});
								} else {
									rlist.push({
										rule : ruleName,
										params : params
									});
								}
							}

							if (rlist.length > 0)
								this.defCols[o].rules = Bind.observableArray(rlist);
							else
								delete this.defCols[o].rules;
						}
					}
				},
				//没有实现filter相关方法，在子类中实现
				buildFilter : function() {
					return '';
				},
				getFilter : function(name) {
					return '';
				},
				setFilter : function(name, filter) {
					return '';
				},
				setOrderBy : function(relation, type) {
					if (null !== type && undefined !== type)
						this.orderBys[relation] = type;
					else
						delete this.orderBys[relation];
				},
				/**
				 * 获取排序
				 * 
				 * @param {string}
				 *            relation
				 * @return {int} OrderBy的类型0:DESC/1:ASC
				 */
				getOrderBy : function(relation) {
					return this.orderBys[relation];
				},
				clearOrderBy : function() {
					this.orderBys = {};
				},
				getOrderBys : function() {
					var result = '';
					for ( var o in this.orderBys) {
						result += (result !== '' ? ',' : '') + o + (0 === this.orderBys[o] ? ' DESC' : ' ASC');
					}
					return result;
				},
				getResultRelations : function() {
					var result = null;
					for ( var o in this.defCols) {
						if (!this.isUICalculateCol(o))
							result = null !== result ? (result + ',' + o) : o;
					}
					return result;
				},
				getColumnIDs : function() {
					var result = null;
					for ( var o in this.defCols) {
						result = null !== result ? (result + ',' + o) : o;
					}
					return result;
				},
				/**
				 * 返回查询的统计relation
				 */
				getAggRelations : function() {
					var result = "";
					for ( var o in this.defAggCols) {
						result += ("" !== result) ? (',' + o) : o;
					}
					return result;
				},
				doDataChanged : function(eventData) {
					var eData = {};
					if (this.hasListener(Data.EVENT_DATA_CHANGE)) {
						justep.Util.apply(eData, eventData);
						this.fireEvent(Data.EVENT_DATA_CHANGE, eData);
					}
					if (this.master && this.master.masterData) {
						var masterData = this.master.masterData;
						if (masterData) {
							eData = $.extend({}, eventData);
							eData.source = masterData;
							eData.selfChanged = false;
							masterData.doDataChanged(eData);
						}
					}
				},
				attachEvents : function(events) {
					if (!events)
						return;
					if (typeof events == 'string') {
						events = eval('(' + events + ')');
					}
					if (!events)
						return;
					for ( var o in events) {
						var func = events[o];
						if (typeof func == 'string')
							//lzg 忽略 with用法
							/*jshint -W085 */
							with (this.getModel() || window) {
							/*jshint +W085 */
								func = eval('(' + func + ')');
							}
						if (typeof func == 'function')
							this.on(o, func, this.getModel());
					}
				},
				_clear : function(parent) {
					// 清空data代码
					//当前行是parent的子才进行重置当前行
					if(!parent || this.isChild(this.getCurrentRow(), parent))
						this.currentRow.set();

					var arrayRows, row = null;
					if (!parent) {
						arrayRows = this.allDatas.get();
						for (row in arrayRows) {
							this._clear(arrayRows[row]);
						}
						this.allDatas.removeAll();
						this.deleteDatas.removeAll();
					} else {
						if (parent.rows) {
							arrayRows = parent.rows.get();
							for (row in arrayRows) {
								this._clear(arrayRows[row]);
							}
							parent.rows.removeAll();
						}
						var dels = this.deleteDatas.get();
						for(var i=0;i<dels.length;i++){//删除子
							if(this.isChild(dels[i], parent))
								this.deleteDatas.splice(i,1);
						}
					}
				},
				isChild: function(row,parent){
					if(!row) return false;
					var p = row.parent();
					if(p===parent) return true;
					if(p) return this.isChild(p, parent);
					else return false;
				},
				clear : function(parent) {
					// 清空data代码
					this._clear(parent);

					var eventData = {};
					eventData.source = this;
					eventData.changedSource = this;
					eventData.type = 'clear';
					eventData.selfChanged = true;
					eventData.parent = parent;
					this.doDataChanged(eventData);
				},
				_reloadDefByUserData : function(userdata, parent) {
					if (!parent)
						justep.Util.apply(this.userdata, userdata);
					if (typeof userdata === 'object') {
						if (userdata.hasOwnProperty('sys.loaded'))
							this._setLoaded(userdata['sys.loaded'], parent);
						if (userdata.hasOwnProperty('sys.count'))
							this.setTotal(userdata['sys.count'], parent);
						if (userdata.hasOwnProperty('sys.offset'))
							this.setOffset(userdata['sys.offset'], parent);
					}
				},
				loadData : function(data, append, parent, index) {
					index = undefined === index?-1:index;
					var ret = [];
					if (data && ('table' == data['@type'] || $.isArray(data.rows))) {
						if (!append) {
							this._clear(parent);
						}
						this._reloadDefByUserData(data.userdata, parent);
						var rows = data.rows ? data.rows : [], retRow = [];
						for ( var i = 0; i < rows.length; i++) {
							var row = rows[i];
							if (row.userdata && row.userdata.id) {
								row[this.idColumn] = row.userdata.id;
								delete row.userdata.id;
							}
							var r = this.add(row, parent, true, true);
							retRow.push(r);
							ret.push(r);
							if (row.rows) {
								ret.push(ret, this.loadData(row, append, r));
							}
						}
						if (!parent) {
							if (-1 == index)
								this.allDatas.push.apply(this.allDatas, retRow);
							else
								this.allDatas.splice.apply(this.allDatas, [ index, 0 ].concat(retRow));
						} else {
							if (!parent.rows)
								parent.rows = Bind.observableArray(retRow);
							else {
								if (-1 == index)
									parent.rows.push.apply(parent.rows, retRow);
								else
									parent.rows.splice.apply(parent.rows, [ index, 0 ].concat(retRow));
							}
						}
					}
					return ret;
				},
				isExist : function(id) {
					var ret = false;
					this.each(function(evt) {
						if (id == this.getRowID(evt.row)) {
							evt.cancel = true;
							ret = true;
						}
					}, this);
					return ret;
				},
				getUserData : function(name, row) {
					return row ? row.row.userdata[name] : this.userdata[name];
				},
				setUserData : function(name, v, row) {
					var userdata = row ? row.row.userdata : this.userdata;
					userdata[name] = v;
				},
				find : function(fields, values, First, CaseInsensitive, PartialKey, all) {
					var res = [];
					var len = 0;
					if (values && fields)
						len = values.length > fields.length ? fields.length : values.length;
					if (len > 0) {
						var func = all ? "eachAll" : "each";
						this[func](function(data) {
							var ok = true;
							var r = data.row;
							for ( var i = 0; i < len; i++) {
								var v = this.getValue(fields[i], r);
								if (typeof (v) === 'string') {
									v = !CaseInsensitive ? v : v.toLowerCase();
									var value = !CaseInsensitive ? values[i] : (values[i] + '').toLowerCase();
									ok = ok && (!PartialKey ? v == value : v.indexOf(value) != -1);
								} else
									ok = values[i] === v;
								if (!ok)
									break;
							}
							if (ok) {
								res.push(r);
								if (First)
									return res;
							}
						}, this);
					}
					return res;
				},
				isValid : function() {
					return this._getSelfValid() && (function() {
						for ( var i = 0; i < this.slaveDatas.length; i++)
							if (!this.slaveDatas[i].isValid())
								return false;
						return true;
					}).call(this);
				},
				getInvalidInfo : function() {
					var ret = "";
					for ( var i = 0; i < this.slaveDatas.length; i++)
						ret += (this.slaveDatas[i]._getSelfInvalidInfo() + "\n");

					return this._getSelfInvalidInfo() + "\n" + ret;
				},
				convert : function(v, t) {
					return Data.convert(v, t);
				},
				// 主从过滤
				filterByMaster : function() {
					if (!this.master)
						return this.allDatas;
					else {
						var ret = Bind.computed(function() {
							var mData = this.master.masterData;
							var mr = mData.currentRow.get(), mrid = mData.getRowID(mr);
							if (undefined === mr)
								return [];
							var byMaster = this.byMaster[mrid];

							// 根据主加载当前的数据
							if (!byMaster || !byMaster.loaded) {
								var eventData = {
									source : this,
									loaded : Data.STATE.NEW === mData.getRowState(mData.currentRow.get())
								};
								this.fireEvent(Data.EVENT_LOAD_SLAVEDATA, eventData);
								// 这里目前没有处理autoNew
								if (!eventData.loaded && this.autoLoad && Data.STATE.NEW !== mData.getRowState(mData.currentRow.get())) {
									eventData.loaded = this._refreshData({
										append : true,
										offset : 0
									});
								}
								if (byMaster)
									byMaster.loaded = eventData.loaded;
								else
									this.byMaster[mrid] = {
										loaded : eventData.loaded
									};
							}

							var allItems = this.allDatas.get(), matchingItems = [];
							for ( var i = 0; i < allItems.length; i++) {
								var current = allItems[i];
								if (Bind.unwrap(current.ref(this.master.relation).get()) === mrid)
									matchingItems.push(current);
							}

							if (byMaster && byMaster.loaded) {
								this.currentRow.set(byMaster.current);
								this.setOffset(byMaster.offset);
							} else if (matchingItems.length > 0)
								this.currentRow.set(matchingItems[0]);

							return matchingItems;
						}, this);
						ret.owner = this;
						return ret;
					}
				},
				// 绑定规则
				bindRules : function(target, rules, isModified, ctx) {
					if (rules) {
						target.extend({
							validatable : {
								enable : true,
								rules : rules,
								isModified : isModified,
								ctx : ctx
							}
						});
					}
					return target;
				},
				_doReadonly : function(readonlyExpr, ctx) {
					return this.readonly.get() || ((readonlyExpr instanceof Expr) && Expr.eval(readonlyExpr, ctx.$row, ctx));
				},
				// 绑定规则
				bindReadonly : function(target, readonlyDef, ctx) {
					ctx.caller = this;
					target.extend({
						readonly : {
							readonlyFN : this._doReadonly,
							readonlyDef : readonlyDef,
							ctx : ctx
						}
					});
					return target;
				},
				// 绑定计算
				bindCalculate : function(target, calcExpr, context) {
					var interceptor = Bind.computed({
						read : function() {
							if (!this._inited)
								return '';// data没有初始化完成不进行计算
							var currentValue = target.get();
							// {$model:this.getModel(),$data:this,$row:r,$rowID:rowid,$col:col}
							var newValue = Expr.eval(calcExpr, context.$row, context);
							if (newValue !== currentValue) {
								target.set(newValue);
							}
							return target.get();
						},
						write : function(v) {
							target.set(v);
						}
					}, this);
					interceptor.target = target;
					return interceptor;
				},
				getParentRelation : function() {
					return !this.defTreeOption.isTree ? '' : this.defTreeOption.option.parentRelation;
				},
				// 还可以做数据的格式转换
				bindValueChange : function(v, option) {
					var interceptor = Bind.observable(v);
					interceptor.subscribe(function(evt) {//变化中
						if (evt.newValue !== evt.oldValue) {
							evt.source = option.data;
							evt.row = option.row;
							evt.col = option.col;
							option.handler.call(option.caller, evt);
						}
					}, null, "changing");
					interceptor.subscribe(function(val) {//变化后
						var evt = {
							source: option.data,
							row: option.row,
							col: option.col,
							value: val
						};
						option.handler.call(option.caller, evt, true);
					});
					return interceptor;
				},
				disableRecordChange : function() {
					this._disableRecordChange = true;
				},
				enabledRecordChange : function() {
					this._disableRecordChange = false;
				},
				canRecordChange : function() {
					return !this._disableRecordChange;
				},
				// col可以是列名或者列定义
				isCalculateCol : function(col) {
					if (col) {
						if ('string' === typeof (col))
							col = this.defCols[col];
						if ('object' === typeof (col)) {
							return "EXPRESS" === col.relation || "STATISTICAL" == col.relation;
						}
					}
				},
				isUICalculateCol : function(col) {
					if (col) {
						if ('string' === typeof (col))
							col = this.defCols[col];
						if ('object' === typeof (col)) {
							return !col.isBiz && ("EXPRESS" === col.relation || "STATISTICAL" == col.relation);
						}
					}
				},
				_doValueChange : function(event,isChanged) {
					// 不记录变化
					if (!this.canRecordChange())
						return;
					if(!isChanged){
						this.fireEvent(Data.EVENT_VALUE_CHANGE, event);
						if (!this.isCalculateCol(event.col) && event.oldValue !== event.newValue) {
							var row = event.row;
							if (row) {
								var recordState = row.row.userdata.recordState;
								if (recordState !== Data.STATE.NEW) {
									var col = row.row[event.col];
									if (1 !== col.changed) {// 目前暂时不支持修改回原值后状态复原，原因BIND从组件写回的数据全部变成了str
										col.originalValue = event.oldValue;
										row.row.userdata.recordState = Data.STATE.EDIT;
										col.changed = 1;
										row.row.userdata.isModified.set(true);
										this.isModified.set(true);
									}
								}
							}
						}
					}else{
						this.fireEvent(Data.EVENT_VALUE_CHANGED, event);
						event.changedSource = this;
						event.type = 'valueChanged';
						event.selfChanged = true;
						this.doDataChanged(event);
					}

					if (Data.debug)
						console.log("行[" + event.rowID + "]列[" + event.col + "]changed," + "old:" + event.oldValue + ",newValue:" + event.newValue);
				},
				getRowByID : function(id, all) {
					if (id !== undefined) {
						var r = null, func = !all ? 'each' : 'eachAll';
						this[func](function(evt) {
							if (id == this.getRowID(evt.row)) {
								evt.cancel = true;
								r = evt.row;
							}
						}, this);
						return r;
					} else
						return this.currentRow.get();
				},
				getValue : function(col, row) {
					if (!row)
						row = this.currentRow.get();
					var cc = row?row.ref(col):undefined;
					var colDef = this.defCols[col];
					return this.convert(Bind.isObservable(cc)? cc.get() : cc, colDef?colDef.type:'String');
				},
				setValue : function(col, value, row) {
					if (!row)
						row = this.currentRow.get();
					row.ref(col).set(value);
				},
				getValueByID : function(col, id) {
					return this.getValue(col, this.getRowByID(id, true));
				},
				setValueByID : function(col, value, id) {
					this.setValue(col, value, this.getRowByID(id, true));
				},
				getRowState : function(row) {
					return (row && row.row.userdata && row.row.userdata.recordState) ? row.row.userdata.recordState : Data.STATE.NONE;
				},
				setRowState : function(row, state) {
					if (row && row.row.userdata)
						row.row.userdata.recordState = state;
				},
				getRowID : function(r) {
					if(r===undefined) r = this.getCurrentRow();
					return r ? r.ref(this.idColumn).get() : undefined;
				},
				to : function(row) {
					if (typeof (row) == 'string')// 当时string时认为是id
						row = this.getRowByID(row);
					if ((row instanceof Data.Row || row===undefined || row===null) && row!==this.getCurrentRow()) {
						var eventData = {
							source : this,
							row : row,
							originalRow : this.currentRow.get(),
							cancel : false
						};
						this.fireEvent(Data.EVENT_INDEX_CHANGING, eventData);
						if (eventData.cancel)
							return;
						this.currentRow.set(row);
						this.fireEvent(Data.EVENT_INDEX_CHANGED, eventData);
					}
				},
				getCount : function() {
					if (!this.defTreeOption.isTree)
						return this.datas.get().length;
					else {
						var len = 0;
						this.each(function() {
							len++;
						}, this);
						return len;
					}
				},
				next : function() {
					var crow = this.currentRow.get(), isNext = false;
					this.each(function(evt) {
						if (isNext) {
							this.to(evt.row);
							evt.cancel = true;
							isNext = false;
						}
						if (evt.row == crow)
							isNext = true;
					}, this);
				},
				pre : function() {
					var crow = this.currentRow.get(), preRow = null;
					this.each(function(evt) {
						if (evt.row == crow) {
							if (null !== preRow)
								this.to(preRow);
							evt.cancel = true;
							preRow = null;
						}
						preRow = evt.row;
					}, this);
				},
				first : function() {
					this.to(this.getFirstRow());
				},
				last : function() {
					this.to(this.getLastRow());
				},
				getFirstRow : function() {
					var datas = this.datas.get();
					if (datas.length > 0)
						return datas[0];
					else
						return null;
				},
				getLastRow : function() {
					var datas = this.datas.get();
					if (datas.length > 0)
						return this._lastRow(datas);
					else
						return null;
				},
				getCurrentRow : function() {
					return this.currentRow.get();
				},
				getCurrentRowID : function(){
					return this.getRowID(this.getCurrentRow());
				},
				_lastRow : function(rows) {
					var len = rows.length, ret = rows[len - 1];
					if (len>0 && ret.rows)
						return this._lastRow(ret.rows.get());
					else
						return ret;
				},
				isLeaf : function(row) {
					if (this.defTreeOption.isTree && row) {
						return row.row[this.defTreeOption.option.nodeKindRelation] ? (Data.NODE_KIND_LEAF == row.ref(
								this.defTreeOption.option.nodeKindRelation).get()) : false;
					} else
						return true;
				},
				isTree : function(){
					return this.defTreeOption && this.defTreeOption.isTree;
				},
				/**
				 * 创建新的数据, 可以同时创建多行数据 兼容支持原来的3个参数写法index, parent, rows
				 * 
				 * @method newData
				 * @param [options]
				 *            可以设置默认值, 父, 如果创建多条数据可以设置默认值为默认值数组 参数结构
				 *            {defaultValues: [{column1: (value), column2:
				 *            (value), ...},{...},...], parent: ({Data.Row}),
				 *            onSuccess: ({Function}), onError: ({Function})}
				 * @returns {Array(String)} rows
				 */
				newData : function(options) {
					var index = -1, parent = null, rows = null, onSuccess = null, onError = null;
					if (arguments.length == 1 && typeof (options) == 'object') {
						// options
						index = options.hasOwnProperty('index') ? options.index : index;
						parent = options.parent;
						rows = options.defaultValues;
						onSuccess = options.onSuccess;
						onError = options.onError;
					}

					var eventData = {
						'cancel' : false,
						'option': options,
						'source' : this
					};
					this.fireEvent(Data.EVENT_NEWDATA_BEFORE, eventData);
					if (eventData.cancel)
						return null;

					var data = null;

					if (this.hasListener(Data.EVENT_NEWDATA)) {
						eventData = {
							'data' : data,
							'option': options,
							'source' : this
						};
						this.fireEvent(Data.EVENT_NEWDATA, eventData);
						data = eventData.data;
					} else {
						data = this.doNewData(rows, options);
					}

					if (!data)
						return null;

					rows = this.loadData(data, true, parent, index);
					eventData = {
						'rows' : rows,
						'source' : this
					};
					this.fireEvent(Data.EVENT_NEWDATA_AFTER, eventData);
					eventData.changedSource = this;
					eventData.type = 'new';
					eventData.selfChanged = true;
					this.doDataChanged(eventData);
					this._setLoaded(true, parent);

					if (onSuccess && $.isFunction(onSuccess))
						onSuccess({
							'source' : this,
							'rows' : rows
						});

					if (rows.length > 0)
						this.to(rows[0]);
					return rows;
				},
				/**
				 * 产生新的数据
				 * 
				 * @return {object}
				 *         包含id(行数据id)，version(数据版本)，state(数据状态)，colValues(列值数组)，返回null或者undefined表示操作失败
				 */
				doNewData : function(rows, options) {
					// 需要在派生类中重新实现
					if (!rows || rows.length <= 0)
						rows = [ {} ];
					var ret = {
						rows : [],
						userData : {},
						"@type" : "table"
					};

					for ( var i in rows) {
						var r = rows[i];
						if (!r.userdata)
							r.userdata = {};
						r.userdata.recordState = Data.STATE.NEW;
						ret.rows.push(r);
					}
					return ret;
				},
				//保存时启动批事务的api
				_beginBatch: function(){
					return true;
				},
				_cancelBatch: function(){
					return true;
				},
				_endBatch: function(){
					return true;
				},
				/**
				 * 业务数据保存方法 兼容支持原来的3个参数写法callback, useTrans, ignoreInvalid
				 * 
				 * @param [options]
				 *            可以设置成功失败的回调 参数结构 {ignoreInvalid: true, onSuccess:
				 *            ({Function}), onError: ({Function})}
				 * @return {boolean}
				 */
				saveData : function(options) {
					var callback = null, onSuccess = null, onError = null, useTrans = true, ignoreInvalid = false;
					if (arguments.length == 1 && typeof (options) == 'object') {
						// options
						ignoreInvalid = !!options.ignoreInvalid;
						if (undefined !== options.useTrans)
							useTrans = !!options.useTrans;
						onSuccess = options.onSuccess;
						onError = options.onError;
					}
					var result = false;

					if (!this.isChanged())
						return true;

					if (!ignoreInvalid && !this.isValid()) {
						throw new Error(this.getInvalidInfo());
					}

					if (false !== useTrans) {
						if (!this._beginBatch()) {
							var msg = new justep.Message(justep.Message.JUSTEP231019);
							throw justep.Error.create(msg);
						}
					}

					try {
						var eventData = {
							'cancel' : false,
							'source' : this
						};
						this.fireEvent(Data.EVENT_SAVEDATA_BEFORE, eventData);
						if (eventData.cancel) {
							if (false !== useTrans)
								this._cancelBatch();
							return false;
						}

						if (this.hasListener(Data.EVENT_SAVEDATA)) {
							eventData = {
								'cancel' : false,
								'source' : this
							};
							this.fireEvent(Data.EVENT_SAVEDATA, eventData);
							result = !eventData.cancel;
						} else {
							result = this.doSaveData(callback, {
								'onSuccess' : onSuccess,
								'onError' : onError
							});
						}
						if (!result) {
							if (false !== useTrans)
								this._cancelBatch();
							return false;
						}

						eventData = {
							'cancel' : false,
							'source' : this
						};
						this.fireEvent(Data.EVENT_SAVEDATA_AFTER, eventData);
						if (eventData.cancel) {
							if (false !== useTrans)
								this._cancelBatch();
							return false;
						}
					} catch (e) {
						if (false !== useTrans)
							this._cancelBatch();
						var msg = new justep.Message(justep.Message.JUSTEP231020, (e.message || e));
						throw justep.Error.create(msg);
					}

					if (false !== useTrans) {
						this._endBatch();
					}

					return true;
				},
				/**
				 * 执行保存的动作
				 * 
				 * @param {function}
				 *            callback 回调
				 * @return {boolean}
				 */
				doSaveData : function(callback, options) {
					return true;
				},
				/**
				 * 保存成功后whereVersion的模式进行version自动加一
				 */
				applyUpdates : function(){
					// 更新版本字段和状态不触发事件和状态变化
					this.disableRecordChange();
					try {// 特殊删除，解决关联计算触发问题
						var delList = this.deleteDatas.get();
						delList.splice(0, delList.length);
						this.eachAll(function(data) {
							var row = data.row.row;

							if (this.updateMode == 'whereVersion') {
								var recordState = row.userdata.recordState;
								if (Data.STATE.EDIT == recordState) {
									var versionRelation = this.getVersionColumn();
									if (versionRelation && row[versionRelation]) {
										var iVer = parseInt(row[versionRelation].value.get(),10) + 1;
										row[versionRelation].value.set(iVer);
									}
								}
							}
							for ( var col in this.defCols) {
								row[col].changed = 0;
								row[col].originalValue = row[col].value.get();
							}

							row.userdata.recordState = Data.STATE.NONE;
						}, this);
					} finally {
						this.enabledRecordChange();
					}
				},
				getVersionColumn : function() {
					return this.versionRelation;
				},
				/**
				 * 加载下一页的数据
				 */
				loadNextPageData : function(options) {
					if (this.limit == -1)
						return;
					// 目前没有支持树局部加载数据
					options = options || {append:true};
					return this.isLoaded() ? this._refreshData(options) : this.refreshData(options);
				},
				/**
				 * 加载所有数据
				 */
				loadAllPageData : function(options) {
					options = options || {};
					// 目前没有支持树局部加载数据
					if (this.limit == -1 && !this.isLoaded())
						return this.refreshData(options);
					if(this.isLoaded()) return;
					var total = this.getTotal(options.parent), offset = this.getOffset(options.parent);
					if (total <= offset)
						return;
					if (total < 1)
						return;
					var limit = this.limit;
					try {
						options.append = true;
						options.limit = total;
						return this._refreshData(options);
					} finally {
						this.limit = limit;
					}
				},
				/**
				 * 加载第N页数据
				 */
				loadPageData : function(pageIndex, options) {
					if (this.limit == -1 || 1 == pageIndex)
						return this.refreshData(options);
					options = options || {};
					pageIndex = pageIndex < 1 ? 1 : pageIndex;
					options.offset = (pageIndex - 1) * this.limit;
					options.append = false;
					return this._refreshData(options);
				},
				refreshData : function(options) {
					options = options || {};
					if (this.definition.offset)
						options.offset = this.definition.offset;
					else
						options.offset = 0;
					options.append = false;
					// if(this.defTreeOption.isTree)
					// options.parent = null;
					return this._refreshData(options);
				},
				_refreshData : function(options) {
					var result = false;

					var oldRowID = this.getRowID(this.currentRow.get());

					var eventData = {
						cancel : false,
						options : options,
						source : this
					};
					this.fireEvent(Data.EVENT_REFRESHDATA_BEFORE, eventData);
					if (eventData.cancel)
						return false;

					var canRefresh = (options && options.append) ||
							(this.isChanged() && this.confirmRefresh ? confirm(this.confirmRefreshText) : true);

					if (canRefresh) {
						if (options && 'number' == typeof (options.offset))
							this.setOffset(options.offset, options.parent);
						if (options && 'number' == typeof (options.limit))
							this.limit = options.limit;

						if (this.hasListener(Data.EVENT_REFRESHDATA)) {
							eventData = {
								cancel : false,
								limit : this.limit,
								offset : this.getOffset(options.parent),
								options : options,
								source : this
							};
							this.fireEvent(Data.EVENT_REFRESHDATA, eventData);
							result = !eventData.cancel;
						} else {
							result = this.doRefreshData(options);
						}
						if (result) {
							this._setLoaded(true, options ? options.parent : null);
							if (!(options && options.append)) {
								var r = this.getRowByID(oldRowID);
								if (!r)
									this.first();
								else if (r)
									this.to(r);
							}
							if (this.limit != -1)
								this.setOffset(this.getOffset(options ? options.parent : null) + this.limit, options ? options.parent : null);
						}
					}

					eventData = {
						limit : this.limit,
						offset : this.getOffset(options ? options.parent : null),
						options : options,
						source : this,
						success : result
					};
					this.fireEvent(Data.EVENT_REFRESHDATA_AFTER, eventData);
					eventData.changedSource = this;
					eventData.type = 'refresh';
					eventData.selfChanged = true;
					this.doDataChanged(eventData);

					return result;
				},
				/**
				 * 执行数据刷新的动作
				 */
				doRefreshData : function(options) {
					if (this.definition.initData) {// 加载初始数据
						this.loadData({
							rows : eval("(" + this.definition.initData + ")"),
							'@type' : 'table'
						});
					}
					return true;
				},
				deleteData : function(rows, options) {
					var result = false;

					rows = rows ? rows : [ this.currentRow.get() ];
					if(rows instanceof Data.Row) rows = [rows]; 

					var eventData = {
						'cancel' : false,
						'source' : this,
						'deleteRows' : rows
					};
					this.fireEvent(Data.EVENT_DELETEDATA_BEFORE, eventData);
					if (eventData.cancel)
						return false;

					if (this.hasListener(Data.EVENT_DELETEDATA)) {
						eventData = {
							'cancel' : false,
							'source' : this,
							'deleteRows' : rows
						};
						this.fireEvent(Data.EVENT_DELETEDATA, eventData);
						if (eventData.cancel)
							return false;
					} else {
						var canDelete = this.confirmDelete ? confirm(this.confirmDeleteText) : true;
						var i = 0;
						var row;
						if (canDelete) {
							if (!this.directDeleteMode) {// 做删除标记
								if (!rows)
									return false;
								for (i = 0; i < rows.length; i++) {
									row = rows[i];
									if (Data.STATE.NEW != this.getRowState(row)) {
										this.setRowState(row, Data.STATE.DELETE);
										this.deleteDatas.push(row);
									}
									// 删除数据
									this.remove(row);
								}

								result = true;
							} else {// 直接后台删除
								result = this.doDirectDeleteData(rows);

								if (result) {
									for (i = 0; i < rows.length; i++) {
										row = rows[i];
										var total = this.getTotal(row.row.userdata.parent) - 1;
										this.setTotal(total >= 0 ? total : 0, row.row.userdata.parent);
										this.remove(row);
									}
								}
							}
						} else
							return false;
					}
					eventData = {
						'source' : this,
						'deleteRows' : rows
					};
					this.fireEvent(Data.EVENT_DELETEDATA_AFTER, eventData);
					eventData.changedSource = this;
					eventData.type = 'delete';
					eventData.selfChanged = true;
					this.doDataChanged(eventData);
					return result;
				},
				doDirectDeleteData : function(ids) {
					return true;
				},
				_bindValue : function(r, col, rowid) {
					if (typeof (r.row[col]) !== 'object')
						r.row[col] = {
							changed : 0,
							value : r.row[col],
							originalValue : null
						};

					r.row[col].value = this.bindValueChange(r.row[col].value, {
						data : this,
						handler : this._doValueChange,
						caller : this,
						rowID : rowid,
						row : r,
						col : col
					});
				},
				_bindRule : function(r, col, rowid){
					var def = this.defCols[col];
					if (def.calculate) {
						if (typeof (def.calculate) == 'string')
							def.calculate = new Expr(def.calculate);
						if (def.calculate instanceof Expr)
							r.row[col].value = this.bindCalculate(r.row[col].value, def.calculate, {
								$model : this.getModel(),
								$data : this,
								$row : r,
								$rowID : rowid,
								$col : col
							});
					}

					this.bindRules(r.row[col].value, def.rules, r.row.userdata.isModified, {
						$model : this.getModel(),
						$data : this,
						$row : r,
						$rowID : rowid,
						$col : col
					});
					if (typeof (def.readonly) == 'string')
						def.readonly = new Expr(def.readonly);
					this.bindReadonly(r.row[col].value, def.readonly, {
						$model : this.getModel(),
						$data : this,
						$row : r,
						$rowID : rowid,
						$col : col
					});
					r.row[col].value.define = {
						data : this,
						row : r,
						defCol : def
					};
				},
				add : function(row, parent, disableCursor, nopush) {
					row = row || {};
					for ( var k in this.defCols) {
						row[k] = row[k];// 添加数据列，保证存在列对应的域
					}
					if (this.master && !row[this.master.relation]) {
						row[this.master.relation] = this.master.masterData.getRowID(this.master.masterData.currentRow.get());
					}
					var rowid = row[this.idColumn];
					if (typeof (rowid) === 'object')
						rowid = rowid.value;
					var r = row;
					if (!r.userdata)
						r.userdata = {};
					if (parent && !Bind.isObservable(parent.rows))
						parent.rows = Bind.observableArray();
					r.userdata.parent = parent;
					var b = r.userdata.recordState == Data.STATE.NEW || r.userdata.recordState == Data.STATE.EDIT;
					r.userdata.isModified = Bind.observable(b);
					if (b)
						this.isModified.set(true);

					r = new Row(this, r);
					for (k in this.defCols) {
						this._bindValue(r, k, rowid);
					}
					for (k in this.defCols) {
						this._bindRule(r, k, rowid);
					}
					if (!nopush)
						if (!parent)
							this.allDatas.push(r);
						else
							parent.rows.push(r);
					if (!disableCursor)
						this.to(r);
					return r;
				},
				remove : function(row) {
					row = row ? row : this.currentRow.get();
					var parent = row.row.userdata.parent, datas = !parent ? this.allDatas : parent.rows, index = datas.indexOf(row), len = datas
							.get().length;
					if (index >= 0 && index < len) {
						var isCurrent = row === this.currentRow.get(), _datas = !parent ? this.datas : parent.rows, _index = Bind.utils.arrayIndexOf(
								_datas.get(), row);
						datas.splice(index, 1);
						if (isCurrent) {
							var size = this.getCount();
							len = _datas.get().length;
							if (size <= 0)
								this.to(null);
							else if (_index < len)
								this.to(_datas.get()[_index]);
							else if (_index >= len && len > 0)
								this.to(_datas.get()[_index - 1]);
							else
								this.to(parent);// 如果没有子了定位到parent
						}
					}
				},
				_masterFilter : function(val, row) {
					if (!this.master)
						return true;
					else {
						var mdata = this.master.masterData;
						if (row) {
							var v = row.ref(mdata.idColumn);
							if (Bind.isObservable(v))
								return val === v.get();
						}
					}
				},
				_setTreeFilter : function(treeFilter) {
					this.setFilter('_treeFilter_', treeFilter);
				},
				_aggregate : function(type, col, filterCallback) {
					var datas = this.allDatas.get();
					var ret = 0.0, len = 0, min = null, max = null;
					var isFilter = filterCallback && (typeof (filterCallback) == 'function');
					var masterRow = typeof (filterCallback) == 'object' ? filterCallback : undefined;
					for ( var i = 0; i < datas.length; i++) {
						var id = this.master ? datas[i].ref(this.master.relation).get() : null;
						if ((!isFilter && masterRow === undefined) || (isFilter && filterCallback({
							'source' : this,
							'row' : datas[i]
						})) || (masterRow !== undefined && this._masterFilter(id, masterRow))) {
							len++;
							if(col){
								var colDef = this.defCols[col];
								var v = this.convert(datas[i].ref(col).get(), colDef.type);
								ret += v;
								max = max === null ? v : (max < v ? v : max);
								min = min === null ? v : (min > v ? v : min);
							}
						}
					}
					if ('count' === type)
						return len;
					else if ('avg' === type)
						return ret / len;
					else if ('sum' === type)
						return ret;
					else if ('min' === type)
						return min;
					else if ('max' === type)
						return max;
				},
				Count : function(filterCallback) {
					return this._aggregate("count", null, filterCallback);
				},
				count : function(filterCallback) {
					return this._aggregate("count", null, filterCallback);
				},
				Avg : function(col, filterCallback) {
					return this._aggregate("avg", col, filterCallback);
				},
				avg : function(col, filterCallback) {
					return this._aggregate("avg", col, filterCallback);
				},
				Sum : function(col, filterCallback) {
					return this._aggregate("sum", col, filterCallback);
				},
				sum : function(col, filterCallback) {
					return this._aggregate("sum", col, filterCallback);
				},
				Min : function(col, filterCallback) {
					return this._aggregate("min", col, filterCallback);
				},
				min : function(col, filterCallback) {
					return this._aggregate("min", col, filterCallback);
				},
				Max : function(col, filterCallback) {
					return this._aggregate("max", col, filterCallback);
				},
				max : function(col, filterCallback) {
					return this._aggregate("max", col, filterCallback);
				},
				_row2Json : function(row,excludeCalculateCol) {
					var ret = {};
					for ( var k in this.defCols) {
						if (k !== this.idColumn && (!excludeCalculateCol||(excludeCalculateCol && !this.isUICalculateCol(k))))
							ret[k] = row.row[k];
					}
					ret.userdata = $.extend({},row.row.userdata);					
					ret.userdata.id = row.row[this.idColumn];
					delete ret.userdata.parent;
					return Bind.toJS(ret);
				},
				_rows2Json : function(rows,excludeCalculateCol) {
					var relationAlias = '', relationTypes = '', relations = '';
					for ( var col in this.defCols) {
						if (col !== this.idColumn && (!excludeCalculateCol||(excludeCalculateCol && !this.isUICalculateCol(col)))) {
							var defcol = this.defCols[col];
							relationAlias += ('' !== relationAlias ? (',' + col) : col);
							relationTypes += ('' !== relationTypes ? (',' + defcol.type) : defcol.type);
							relations += ('' !== relations ? (',' + defcol.define) : defcol.define);
						}
					}
					return {
						"@type" : "table",
						rows : rows,
						userdata : {
							idColumnDefine : this.defCols[this.idColumn].define,
							idColumnName : this.idColumn,
							idColumnType : this.defCols[this.idColumn].type,
							model : this.dataModel,
							relationAlias : relationAlias,
							relationTypes : relationTypes,
							relations : relations,
							updateMode : this.updateMode
						}
					};
				},
				toJson : function(changed,excludeCalculateCol) {
					var rows = [];
					this.eachAll(function(data) {
						var row = data.row;
						var recordState = row.row.userdata.recordState;
						if (!changed || Data.STATE.EDIT == recordState || Data.STATE.NEW == recordState || Data.STATE.DELETE == recordState) {
							rows.push(this._row2Json(row,excludeCalculateCol));
						}
					}, this);
					// 删除的数据
					var delDatas = this.deleteDatas.get();
					if (delDatas.length > 0) {
						var len = delDatas.length;
						for ( var i = 0; i < len; i++) {
							rows.push(this._row2Json(delDatas[i],excludeCalculateCol));
						}
					}
					return this._rows2Json(rows,excludeCalculateCol);
				}
			});

	Data.Row = Row;
	Data.registerData = function(model, xid, data) {
		if (model instanceof Model) {
			model[xid] = data;
			model.registerComponent(xid, data);
		}
	};

	Data.unRegisterData = function(model, xid) {
		if (model instanceof Model) {
			model.unRegisterComponent(xid);
			delete model[xid];
		}
	};

	Data.$ = function(model, xid) {
		return model instanceof Model ? model.getComponent(xid) : null;
	};

	Data.each = function(model, callback) {
		if (!model || !$.isFunction(callback))
			return;
		for ( var s in model) {
			var o = model[s];
			if (o instanceof Data) {
				var eventData = {
					data : o,
					cancel : false
				};
				callback(eventData);
				if (eventData.cancel)
					return;
			}
		}
	};

	Data.UUID = function() {
		return justep.UUID.createUUID();
	};

	Data.STATE = {
		'NEW' : 'new',
		'DELETE' : 'delete',
		'EDIT' : 'edit',
		'NONE' : 'none'
	};

	// 其他事件＝＝＝＝＝＝＝＝＝＝＝＝＝＝
	Data.EVENT_CREATE = "onCreate";
	Data.EVENT_CUSTOM_SORT = "onCustomSort";
	// 数据值变化
	Data.EVENT_VALUE_CHANGE = "onValueChange";
	Data.EVENT_VALUE_CHANGED = "onValueChanged";
	Data.EVENT_DATA_CHANGE = "onDataChange";
	Data.EVENT_INDEX_CHANGED = "onIndexChanged";
	Data.EVENT_INDEX_CHANGING = "onIndexChanging";
	Data.EVENT_LOAD_SLAVEDATA = "onLoadSlave";
	// 新增业务数据的事件＝＝＝＝＝＝＝＝＝
	Data.EVENT_NEWDATA_ERROR = "onNewError";
	Data.EVENT_NEWDATA_CREATEPARAM = "onNewCreateParam";
	Data.EVENT_NEWDATA_BEFORE = "onBeforeNew";
	Data.EVENT_NEWDATA = "onCustomNew";
	Data.EVENT_NEWDATA_AFTER = "onAfterNew";
	// 删除业务数据的事件＝＝＝＝＝＝＝＝＝
	Data.EVENT_DELETEDATA_ERROR = "onDeleteError";
	Data.EVENT_DELETEDATA_BEFORE = "onBeforeDelete";
	Data.EVENT_DELETEDATA = "onCustomDelete";
	Data.EVENT_DELETEDATA_AFTER = "onAfterDelete";
	// 刷新业务数据的事件＝＝＝＝＝＝＝＝＝
	Data.EVENT_REFRESHDATA_ERROR = "onRefreshError";
	Data.EVENT_REFRESHDATA_CREATEPARAM = "onRefreshCreateParam";
	Data.EVENT_REFRESHDATA_BEFORE = "onBeforeRefresh";
	Data.EVENT_REFRESHDATA = "onCustomRefresh";
	Data.EVENT_REFRESHDATA_AFTER = "onAfterRefresh";
	// 保存业务数据的事件＝＝＝＝＝＝＝＝＝
	Data.EVENT_SAVEDATA_ERROR = "onSaveError";
	Data.EVENT_SAVEDATA_CREATEPARAM = "onSaveCreateParam";
	Data.EVENT_SAVEDATA_BEFORE = "onBeforeSave";
	Data.EVENT_SAVEDATA = "onCustomSave";
	Data.EVENT_SAVEDATA_AFTER = "onAfterSave";
	// 保存事务启动后
	Data.EVENT_SAVE_COMMIT = "onSaveCommit";
	Data.LOAD_TREE_ROOT = "___tree___root___";
	Data.NODE_KIND_LEAF = "nkLeaf";

	Data.convert = function(v, t) {
		var errorValue = Data.createErrorValue(v);
		if (-1 < $.inArray(t, [ 'Integer', 'Long' ]) && typeof (v) === 'string')
			v = justep.String.toInt(v, errorValue);
		else if (-1 < $.inArray(t, [ 'Double', 'Float', 'Decimal']) && typeof (v) === 'string')
			v = justep.String.toFloat(v, errorValue);
		else if (t == 'Date' && typeof (v) === 'string' && v) {
			v = justep.Date.fromString(v, "yyyy-MM-dd");
			if (!v)
				v = errorValue;
		} else if (t == 'DateTime' && typeof (v) === 'string' && v) {
			v = justep.Date.fromString(v, "yyyy-MM-ddThh:mm:ss.fff");
			if (!v)
				v = errorValue;
		}
		return v;
	};

	Data.createErrorValue = function(value) {
		return {
			value : value,
			toString : function() {
				return NaN;
			}
		};
	};

	Data.Rules = Rules;

	justep.Component.addOperations(Data, {
		'save' : {
			label : justep.Message.getMessage(justep.Message.JUSTEP231003),
			icon : 'glyphicon glyphicon-floppy-disk',
			init : function() {
				var op = this, data = this.owner, canSave = function() {
					op.setEnable(!data.getReadonly() && data.isChanged());
				};
				this.owner.on(Data.EVENT_DATA_CHANGE, canSave);
				this.owner.on(Data.EVENT_SAVE_COMMIT, canSave);
				this.owner.on(Data.EVENT_INDEX_CHANGED, canSave);
			},
			method : function(args) {
				return this.owner.saveData();
			}
		},
		'delete' : {
			label : justep.Message.getMessage(justep.Message.JUSTEP231005),
			icon : 'icon-minus',
			init : function() {
				var op = this, data = this.owner, canDel = function() {
					op.setEnable(!data.getReadonly() && data.getCount() > 0 && !!data.getCurrentRow());
				};
				this.owner.on(Data.EVENT_DATA_CHANGE, canDel);
				this.owner.on(Data.EVENT_INDEX_CHANGED, canDel);
			},
			argsDef : [ {
				name : 'rows',
				displayName : justep.Message.getMessage(justep.Message.JUSTEP231083)
			} ],
			method : function(args) {
				return this.owner.deleteData(args.rows);
			}
		},
		'new' : {
			label : justep.Message.getMessage(justep.Message.JUSTEP231006),
			icon : 'icon-plus',
			init : function() {
				var op = this, data = this.owner, canNew = function() {
					op.setEnable(!data.getReadonly());
				};
				this.owner.on(Data.EVENT_DATA_CHANGE, canNew);
				this.owner.on(Data.EVENT_INDEX_CHANGED, canNew);
			},
			argsDef : [ {
				name : 'defaultValues',
				displayName : justep.Message.getMessage(justep.Message.JUSTEP231084)
			},
			{
				name : 'index',
				displayName : justep.Message.getMessage(justep.Message.JUSTEP231096)
			}],
			method : function(args) {
				return this.owner.newData(args);
			}
		},
		'newChild' : {
			label : justep.Message.getMessage(justep.Message.JUSTEP231008),
			icon : 'icon-plus',
			init : function() {
				var op = this, data = this.owner, canNew = function() {
					op.setEnable(data.isTree()&&!data.getReadonly()&&!!data.getCurrentRow());
				};
				this.owner.on(Data.EVENT_DATA_CHANGE, canNew);
				this.owner.on(Data.EVENT_INDEX_CHANGED, canNew);
			},
			argsDef : [ {
				name : 'defaultValues',
				displayName : justep.Message.getMessage(justep.Message.JUSTEP231084)
			} ],
			method : function(args) {
				args.parent = this.owner.getCurrentRow();
				return this.owner.newData(args);
			}
		},
		'newBrother' : {
			label : justep.Message.getMessage(justep.Message.JUSTEP231009),
			icon : 'icon-plus',
			init : function() {
				var op = this, data = this.owner, canNew = function() {
					op.setEnable(data.isTree()&&!data.getReadonly()&&!!data.getCurrentRow());
				};
				this.owner.on(Data.EVENT_DATA_CHANGE, canNew);
				this.owner.on(Data.EVENT_INDEX_CHANGED, canNew);
			},
			argsDef : [ {
				name : 'defaultValues',
				displayName : justep.Message.getMessage(justep.Message.JUSTEP231084)
			} ],
			method : function(args) {
				var crow = this.owner.getCurrentRow();
				if(crow)
					args.parent = crow.parent();
				return this.owner.newData(args);
			}
		},
		'refresh' : {
			label : justep.Message.getMessage(justep.Message.JUSTEP231007),
			icon : 'icon-refresh',
			method : function(args) {
				return this.owner.refreshData();
			}
		},
		'firstRow' : {
			label : justep.Message.getMessage(justep.Message.JUSTEP231086),
			icon : 'icon-chevron-left',
			init : function() {
				var op = this, data = this.owner, can = function() {
					var len = data.getCount();
					op.setEnable(len > 0);
				};
				this.owner.on(Data.EVENT_DATA_CHANGE, can);
				this.owner.on(Data.EVENT_INDEX_CHANGED, can);
			},
			method : function() {
				return this.owner.first();
			}
		},
		'prevRow' : {
			label : justep.Message.getMessage(justep.Message.JUSTEP231010),
			icon : 'icon-chevron-left',
			init : function() {
				var op = this, data = this.owner, can = function() {
					var len = data.getCount();
					op.setEnable(len > 0);
				};
				this.owner.on(Data.EVENT_DATA_CHANGE, can);
				this.owner.on(Data.EVENT_INDEX_CHANGED, can);
			},
			method : function() {
				return this.owner.pre();
			}
		},
		'nextRow' : {
			label : justep.Message.getMessage(justep.Message.JUSTEP231011),
			icon : 'icon-chevron-right',
			init : function() {
				var op = this, data = this.owner, can = function() {
					var len = data.getCount();
					op.setEnable(len > 0);
				};
				this.owner.on(Data.EVENT_DATA_CHANGE, can);
				this.owner.on(Data.EVENT_INDEX_CHANGED, can);
			},
			method : function() {
				return this.owner.next();
			}
		},
		'lastRow' : {
			label : justep.Message.getMessage(justep.Message.JUSTEP231087),
			icon : 'icon-chevron-right',
			init : function() {
				var op = this, data = this.owner, can = function() {
					var len = data.getCount();
					op.setEnable(len > 0);
				};
				this.owner.on(Data.EVENT_DATA_CHANGE, can);
				this.owner.on(Data.EVENT_INDEX_CHANGED, can);
			},
			method : function() {
				return this.owner.last();
			}
		},
		'loadPage' : {
			label : justep.Message.getMessage(justep.Message.JUSTEP231097),
			icon : '',
			argsDef : [ {
				name : 'pageIndex',
				displayName : justep.Message.getMessage(justep.Message.JUSTEP231061)
			} ],
			method : function(args) {
				var data = this.owner;
				var pageIndex = isNaN(args.pagrIndex)||'number'!=typeof(args.pagrIndex)?1:args.pagrIndex;
				return data.loadPageData(pageIndex);
			}
		},
		'firstPage' : {
			label : justep.Message.getMessage(justep.Message.JUSTEP231064),
			icon : '',
			method : function(args) {
				return this.owner.loadPageData(1);
			}
		},
		'prevPage' : {
			label : justep.Message.getMessage(justep.Message.JUSTEP231015),
			icon : '',
			method : function(args) {
				var data = this.owner;
				var pageIndex = data.getOffset()/data.limit - 1;
				return data.loadPageData(pageIndex);
			}
		},
		'nextPage' : {
			label : justep.Message.getMessage(justep.Message.JUSTEP231014),
			icon : '',
			method : function(args) {
				var data = this.owner;
				var pageIndex = data.getOffset()/data.limit + 1;
				return data.loadPageData(pageIndex);
			}
		},
		'lastPage' : {
			label : justep.Message.getMessage(justep.Message.JUSTEP231065),
			icon : '',
			method : function(args) {
				var data = this.owner,mod=data.getTotal()%data.limit;
				var pageIndex = data.getTotal()/data.limit + (mod===0?0:1);
				return data.loadPageData(pageIndex);
			}
		},
		'loadNextPage' : {
			label : justep.Message.getMessage(justep.Message.JUSTEP231012),
			icon : '',
			method : function() {
				return this.owner.loadNextPageData();
			}
		},
		'loadAllPage' : {
			label : justep.Message.getMessage(justep.Message.JUSTEP231013),
			icon : '',
			method : function() {
				return this.owner.loadAllPageData();
			}
		}
	});
	return Data;
});