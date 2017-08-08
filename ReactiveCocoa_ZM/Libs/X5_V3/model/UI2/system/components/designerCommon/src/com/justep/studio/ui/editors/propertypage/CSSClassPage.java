package com.justep.studio.ui.editors.propertypage;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.eclipse.jface.dialogs.MessageDialog;
import org.eclipse.swt.SWT;
import org.eclipse.swt.events.KeyAdapter;
import org.eclipse.swt.events.KeyEvent;
import org.eclipse.swt.events.MouseAdapter;
import org.eclipse.swt.events.MouseEvent;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.events.TraverseEvent;
import org.eclipse.swt.events.TraverseListener;
import org.eclipse.swt.layout.FillLayout;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Table;
import org.eclipse.swt.widgets.ToolBar;
import org.eclipse.swt.widgets.ToolItem;

import swing2swt.layout.BorderLayout;

import com.justep.design.model.ModelConstant;
import com.justep.studio.data.DataColumn;
import com.justep.studio.data.DataRecord;
import com.justep.studio.data.DataSet;
import com.justep.studio.data.TreeDataHandler;
import com.justep.studio.ui.commonpanel.TextFilterComposite;
import com.justep.studio.ui.editors.property.strategy.RelationStrategy;
import com.justep.studio.ui.editors.util.XuiDynJavaManager;
import com.justep.studio.ui.editors.xui.IPropertyDialogPage;
import com.justep.studio.ui.editors.xui.IPropertyValueStrategy;
import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.ui.exjface.DataSetTableViewer;
import com.justep.studio.ui.exjface.DataSetTreeViewer;

public class CSSClassPage extends Composite implements IPropertyDialogPage {

	private List returnData = new ArrayList();
	private List unSelectedData = new ArrayList();

	private Table table;
	private DataSetTableViewer tableViewer;
	private DataSetTreeViewer treeViewer;
	private DataSet dataset;

	private boolean mutil = true;
	private boolean endterReturn = true;

	private PropertyItem propertyItem;
	private IPropertyValueStrategy strategy = new RelationStrategy();
	private TextFilterComposite filterText;

	public CSSClassPage(Composite parent, int style) {
		super(parent, style);
	}

	public Object getReturnValue() {
		Map map = new HashMap();
		String propName = propertyItem.getName();
		StringBuffer sbf = new StringBuffer();
		List<DataRecord> list = this.getSelectedRecord();
		for (int i = 0; i < list.size(); i++) {
			DataRecord r = (DataRecord) returnData.get(i);
			String alias = r.getString(ModelConstant.NAME);
			if (i == 0) {
				sbf.append(alias);
			} else {
				sbf.append(" ");
				sbf.append(alias);
			}
		}
		map.put(propName, sbf.toString());
		return map;
	}

	public List<DataRecord> getSelectedRecord() {
		List<DataRecord> slist = new ArrayList<DataRecord>();
		List<DataRecord> list = this.dataset.getData();
		for (DataRecord dataRecord : list) {
			if (dataRecord.getBoolean("selected")) {
				slist.add(dataRecord);
			}
		}
		return slist;
	}

	public String isValid() {
		return null;
	}

	public void setPropertyItem(PropertyItem propertyItem) {
		this.propertyItem = propertyItem;

		String className = propertyItem.getDialogDynData("class-name");
		String methodName = propertyItem.getDialogDynData("method");
		this.dataset = (DataSet) XuiDynJavaManager.executeMethod(propertyItem.getOwnerElementBasePath(), className, methodName,
				new Object[] { propertyItem });
		this.createContents(this);
	}

	private void createContents(Composite container) {
		container.setLayout(new BorderLayout(0, 0));

		final Composite composite = new Composite(container, SWT.NONE);
		final GridLayout gridLayout = new GridLayout();
		composite.setLayout(gridLayout);
		composite.setLayoutData(BorderLayout.NORTH);

		filterText = new TextFilterComposite(composite, SWT.NONE, true) {
			@Override
			public void doFilter(String text) {
				if (tableViewer != null) {
					tableViewer.filter(filterText.getFilterText());
				} else if (treeViewer != null) {
					treeViewer.filter(filterText.getFilterText());
				}
			}
		};
		filterText.setLayoutData(new GridData(SWT.FILL, SWT.FILL, true, false));
		filterText.getText().addTraverseListener(new TraverseListener() {
			public void keyTraversed(TraverseEvent e) {
				if (e.keyCode == 16777218) {
					if (treeViewer != null) {
						treeViewer.getTree().setFocus();
						treeViewer.getTree().select(treeViewer.getTree().getItem(0));
					} else if (tableViewer != null) {
						tableViewer.getTable().setFocus();
						tableViewer.getTable().select(0);
					}
				}
			}
		});
		
		if (mutil) {
			final Composite composite_1 = new Composite(composite, SWT.NONE);
			composite_1.setLayout(new FillLayout());
			composite_1.setLayoutData(new GridData(SWT.LEFT, SWT.CENTER, false, false, 2, 1));

			final ToolBar toolBar = new ToolBar(composite_1, SWT.RIGHT);

			final ToolItem newItemToolItem = new ToolItem(toolBar, SWT.PUSH);
			//全选
			newItemToolItem.addSelectionListener(new SelectionAdapter() {
				public void widgetSelected(final SelectionEvent e) {
					if (mutil) {
						List<DataRecord> data = dataset.getData();
						handleSelectedData(new TreeDataHandler() {
							public void excute(DataRecord record) {
								if (!"".equals(filterText.getFilterText().trim())) {
									if (record.isMatch()) {
										record.setValue("selected", true);
									}
									;
								} else {
									record.setValue("selected", true);
								}
							}
						}, data);
						if (treeViewer != null) {
							treeViewer.refresh();
						}
						if (tableViewer != null) {
							tableViewer.refresh();
						}
					}
					mouseDownHandler();
				}
			});
			newItemToolItem.setText("全 选");
			//全取消
			final ToolItem newItemToolItem_1 = new ToolItem(toolBar, SWT.PUSH);
			newItemToolItem_1.addSelectionListener(new SelectionAdapter() {
				public void widgetSelected(final SelectionEvent e) {
					if (mutil) {
						List<DataRecord> data = dataset.getData();
						handleSelectedData(new TreeDataHandler() {
							public void excute(DataRecord record) {
								record.setValue("selected", false);
							}
						}, data);
						if (treeViewer != null) {
							treeViewer.refresh();
						}
						if (tableViewer != null) {
							tableViewer.refresh();
						}
					}
					mouseDownHandler();
				}
			});
			newItemToolItem_1.setText("全取消");
			//newItemToolItem_1.setImage(ResourceManager.getPluginImage(StudioPlugin.getDefault(), "icons/xui_icons/uncheck.gif"));
		}
		if (this.dataset != null) {
			int style = this.dataset.getDisplayStyle();
			if (style == DataSet.DISPLAY_STYLE_TABLE) {
				tableViewer = new DataSetTableViewer(container, SWT.BORDER | SWT.FULL_SELECTION);
				table = tableViewer.getTable();
				table.setLayoutData(BorderLayout.CENTER);
				table.setLinesVisible(true);
				table.setHeaderVisible(true);
				tableViewer.setDataSet(this.dataset);

				tableViewer.getTable().addKeyListener(new KeyAdapter() {
					public void keyReleased(KeyEvent e) {
						if (e.keyCode == 102) {
							filterText.getText().setFocus();
						}
					}
				});
				tableViewer.getTable().addMouseListener(new MouseAdapter() {

					public void mouseDoubleClick(MouseEvent e) {
						if (endterReturn) {
							mouseDownHandler();
						}
					}

					public void mouseDown(MouseEvent e) {
						mouseDownHandler();
					}
				});
				treeViewer = null;
			} else {
				int visibleColCount = dataset.getVisibleColCount();
				int treestyle = SWT.BORDER;
				if (visibleColCount > 1) {
					treestyle = SWT.BORDER | SWT.FULL_SELECTION;
				}
				treeViewer = new DataSetTreeViewer(container, treestyle);
				treeViewer.setDataset(dataset);
				treeViewer.getTree().setLayoutData(BorderLayout.CENTER);

				treeViewer.getTree().addKeyListener(new KeyAdapter() {
					public void keyReleased(KeyEvent e) {
						if (e.keyCode == 102) {
							filterText.getText().setFocus();
						}
					}
				});

				treeViewer.getTree().addMouseListener(new MouseAdapter() {
					public void mouseDoubleClick(MouseEvent e) {
						if (endterReturn) {
							mouseDownHandler();
						}
					}
				});
				tableViewer = null;
			}
		}
	}

	public void handleSelectedData(TreeDataHandler treeDataHandler, List<DataRecord> recordList) {
		for (DataRecord record : recordList) {
			treeDataHandler.excute(record);
			List<DataRecord> childList = record.getChildList();
			if (!childList.isEmpty()) {
				handleSelectedData(treeDataHandler, childList);
			}
		}
	}

	protected void mouseDownHandler() {
		this.clearReturnData();
		this.clearUnSelectedData();
		DataColumn col = this.dataset.getDataColumn("selected");
		if (this.mutil && col != null && col.isVisible()) {
			List<DataRecord> list = this.dataset.getDataRecords();
			handleSelectedData(new TreeDataHandler() {
				public void excute(DataRecord record) {
					if (record.getBoolean("selected")) {
						addData(record);
					} else {
						addUnSelectedData(record);
					}
				}
			}, list);
		} else {
			List list = this.dataset.getSelectedRecord();
			if (list.size() == 0) {
				if (table != null)
					MessageDialog.openWarning(table.getShell(), "提示", "没有选择记录!");
				return;
			}
			this.setData(list);
			this.setUnSelectedData(this.dataset.getUnSelectedRecord());
		}

	}

	public void hideSelectedColumn(boolean multi) {
		if (!multi) {
			DataColumn col = this.dataset.getDataColumn("selected");
			if (col != null) {
				col.setVisible(false);
			}
		}
	}

	public void addData(Object obj) {
		this.returnData.add(obj);
	}

	public void setData(List data) {
		this.returnData = data;
	}

	public List getReturnData() {
		return this.returnData;
	}

	public void clearReturnData() {
		this.returnData.clear();
	}

	public List getUnSelectedData() {
		return unSelectedData;
	}

	public void setUnSelectedData(List unSelectedData) {
		this.unSelectedData = unSelectedData;
	}

	public void addUnSelectedData(Object obj) {
		if (!this.returnData.contains(obj))
			this.unSelectedData.add(obj);
	}

	public void clearUnSelectedData() {
		this.unSelectedData.clear();
	}

	public void setReturnValueStrategy(IPropertyValueStrategy strategy) {
		if (strategy != null) {
			this.strategy = strategy;
		}
	}
}
