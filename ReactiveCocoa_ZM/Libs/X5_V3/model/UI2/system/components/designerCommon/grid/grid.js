define(function(require) {
	var $ = require("jquery");
	var justep = require('$UI/system/lib/justep');
	var Data = require("$UI/system/components/justep/data/data");

	// 引入jqx grid
	require('css!./css/base').load();
	require("./js/grid-base");

	var url = require.normalizeName("./grid");
	var Grid = justep.ViewComponent.extend({
		// 构造函数
		constructor : function(options) {
			this.callParent(options);
		},
		// 动态创建组件
		/*
		 * config:{ dataXID:dataXID, autoheight: true, sortable: true, editable:
		 * true, selectionmode: 'singlecell', width: 1050, height: 600, columns: [ {
		 * text: 'Name', dataField: 'name', width: 200 }, { text: 'Sales',
		 * dataField: 'sales', width: 200, cellsalign: 'right' }, { text:
		 * 'Price', dataField: 'price', width: 200, cellsformat: 'c2',
		 * cellsalign: 'right' }, { text: 'string1', dataField: 'string1',
		 * width: 100, cellsformat: 'c2', cellsalign: 'right' }, { text:
		 * 'string2', dataField: 'string2', width: 100, cellsformat: 'c2',
		 * cellsalign: 'right' }, { text: 'string3', dataField: 'string3',
		 * width: 100, cellsformat: 'c2', cellsalign: 'right' }, { text:
		 * 'string4', dataField: 'string4', width: 100, cellsformat: 'c2',
		 * cellsalign: 'right' } ] }
		 */
		buildTemplate : function(config) {
			if (config) {
				var parentNode = config['parentNode'];
				delete config['parentNode'];
				var sCfg = justep.Bind.utils.stringifyJson(config);
				config['parentNode'] = parentNode;
				return "<div component='" + url + "' config='" + sCfg + "'/>";
			}
		},

		// 初始化
		init : function(value, bindingContext) {
			this.callParent(value, bindingContext);
			var $e = $(this.domNode);
			var sCfg = $e.attr('config');
			if (sCfg) {
				var cfg = $.parseJSON(sCfg);
				if (cfg) {
					// 提供事件cell
					var bindEvent = function(colDef, field, self) {
						colDef['createeditor'] = function(row, value, editor) {
							self.fireEvent('onCreateEditor_' + field, {
								source : self,
								config : colDef,
								row : row,
								value : value,
								editor : editor
							});
						};
						colDef['cellvaluechanging'] = function(row, column, columntype, oldvalue, newvalue) {
							var evt = {
								source : self,
								config : colDef,
								row : row,
								column : column,
								type : columntype,
								oldValue : oldvalue,
								newValue : newvalue
							};
							self.fireEvent('onCellValueChanging_' + field, evt);
							return evt.newvalue;
						};
					};
					for ( var i = 0; i < cfg.columns.length; i++) {
						var colDef = cfg.columns[i], field = colDef.dataField;
						bindEvent(colDef, field, this);// 特殊实现，为了在循环中传递数据
					}

					this.fireEvent('onCreate', {
						source : this,
						config : cfg
					});
					// 创建数据源
					var dataXID = cfg.dataXID;
					var data = Data.$(this.getModel(), dataXID);
					if (!data) {// grid bind的data不存在
						var msg = new justep.Message(justep.Message.JUSTEP230062, dataXID);
						throw justep.Error.create(msg);
					}
					delete cfg['dataXID'];
					cfg.source = new $.jqx.dataAdapter({
						localdata : data.datas,
						datatype : 'observablearray'
					});
					// 创建grid组件
					$e.jqxGrid(cfg);
					var widget = $.data(this.domNode)["jqxGrid"].instance, crow = data.getRowByID();
					// 设置初始的选中行
					widget.host.jqxGrid('selectrow', data.datas.indexOf(crow));
					// 感知data的当前行变化
					data.currentRow.subscribe(function(row) {
						if (!widget['data-updating'])
							widget.host.jqxGrid('selectrow', data.datas.indexOf(row));
					});
					// bind grid的行变化事件改变data当前行
					$(this.domNode).on('rowselect', function(event) {
						if (!widget['data-updating']) {
							widget['data-updating'] = true;
							try {
								var evt = event.args;
								var crow = data.getRowByID(), irow = data.datas.get()[evt.rowindex];
								if (crow !== irow) {
									data.to(irow);
									crow = data.getRowByID();
									if (crow !== irow)// 如果data阻止变化重新回到原index
										widget.host.jqxGrid('selectrow', data.datas.indexOf(crow));
								}
							} finally {
								widget['data-updating'] = false;
							}
						}
					});
					// 感知data的只读
					data.readonly.subscribe(function(readonly) {
						widget.host.jqxGrid({
							disabled : readonly
						});
					});
					var cellbeginedit = function(rowindex, datafield, columntype, value) {
						if (data.getReadonly(datafield, data.datas.get()[rowindex]))
							return false;
					};
					for (i = 0; i < cfg.columns.length; i++) {
						widget.host.jqxGrid('setcolumnproperty', cfg.columns[i].dataField, 'cellbeginedit', cellbeginedit);
					}
					// 事件bind...
				}
			}
		},

		// 更新
		update : function(value, bindingContext) {

		},

		getGrid : function() {
			return $.data(this.domNode)["jqxGrid"].instance;
		}
	});

	justep.Component.register(url, Grid);
	return Grid;
});