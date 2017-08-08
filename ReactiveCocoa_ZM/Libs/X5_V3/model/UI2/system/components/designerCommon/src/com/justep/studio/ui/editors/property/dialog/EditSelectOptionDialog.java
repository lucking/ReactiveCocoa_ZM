package com.justep.studio.ui.editors.property.dialog;
import java.util.List;

import org.eclipse.jface.dialogs.Dialog;
import org.eclipse.jface.dialogs.IDialogConstants;
import org.eclipse.jface.window.IShellProvider;
import org.eclipse.swt.SWT;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.graphics.Color;
import org.eclipse.swt.graphics.Point;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Control;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.swt.widgets.Table;
import org.eclipse.swt.widgets.ToolBar;
import org.eclipse.swt.widgets.ToolItem;

import swing2swt.layout.BorderLayout;

import com.justep.studio.data.DataRecord;
import com.justep.studio.data.DataSet;
import com.justep.studio.ui.editors.xui.W3cDocumentHelper;
import com.justep.studio.ui.editors.xui.XuiElement;
import com.justep.studio.ui.exjface.DataSetTableViewer;
import com.justep.studio.ui.exjface.DatasetTableLabelProvider;

public class EditSelectOptionDialog extends Dialog {

	private Table table;
	private DataSet dataset;
	private DataSetTableViewer tableViewer;
	private XuiElement lastRowsElement;
	private String title;

	public EditSelectOptionDialog(Shell parentShell) {
		super(parentShell);
	}

	public EditSelectOptionDialog(Shell parentShell, String title) {
		super(parentShell);
	}

	public EditSelectOptionDialog(Shell parentShell, String title, XuiElement element) {
		super(parentShell);
		this.title = title;
		this.lastRowsElement = element;
	}

	protected EditSelectOptionDialog(IShellProvider parentShell) {
		super(parentShell);
	}

	@Override
	protected Control createDialogArea(Composite parent) {
		Composite container = (Composite) super.createDialogArea(parent);
		//container.setLayout(new BorderLayout(0, 0));

		//工具条
		final ToolBar toolBar = new ToolBar(container, SWT.NONE);
		toolBar.setLayoutData(BorderLayout.NORTH);
		toolBar.setLayoutData(new GridData(SWT.FILL,SWT.CENTER,true,false));
		final ToolItem newItemToolItem = new ToolItem(toolBar, SWT.PUSH);
		newItemToolItem.setText("添加");
		newItemToolItem.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(final SelectionEvent e) {
				if (tableViewer.getTable().getColumnCount() <= 0) {
					return;
				}
				Object[] values = new Object[] { "", "" };
				dataset.addRecord(values);
			}
		});

		final ToolItem newItemToolItem_1 = new ToolItem(toolBar, SWT.PUSH);
		newItemToolItem_1.setText("删除");
		newItemToolItem_1.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(final SelectionEvent e) {
				List<DataRecord> list = dataset.getSelectedRecord();
				if (list.size() > 0) {
					dataset.deleteRecord(dataset.getSelectedRecord().get(0));
				}
			}
		});

		//表格
		tableViewer = new DataSetTableViewer(container, SWT.BORDER | SWT.FULL_SELECTION);
		tableViewer.getTable().setLayoutData(new GridData(SWT.FILL,SWT.FILL,true,true));
		tableViewer.setLabelProvider(new DatasetTableLabelProvider(tableViewer) {
			public Color getBackground(Object element, int columnIndex) {
				Color color = new Color(null, 211, 226, 243);
				return color;
			}
		});
		dataset = new DataSet();
		tableViewer.setDataSet(dataset);
		table = tableViewer.getTable();

		table.setLinesVisible(true);
		table.setHeaderVisible(true);

		dataset.addColumn("text").setLength(150).setDataType("String").setHeader("文本").setEditable(true).setEditor("TextCellEditor");
		dataset.addColumn("value").setLength(150).setDataType("String").setHeader("值").setEditable(true).setEditor("TextCellEditor");
		tableViewer.reloadDataSet(dataset);

		setTableData();
		return container;
	}

	private void setTableData() {

		if (this.lastRowsElement == null)
			return;//rows
		List<XuiElement> optionList = this.lastRowsElement.getChildListByTagName("option");
		if (optionList == null || optionList.size() <= 0)
			return;
		String[] vals = new String[2];
		for (int i = 0; i < optionList.size(); i++) {
			XuiElement option = optionList.get(i);
			String value = option.getProperyValue("value");
			String label = W3cDocumentHelper.getText(option.getOriginElement());
			vals[0] = label;
			vals[1] = value;
			dataset.addRecord(vals);
		}
		tableViewer.setDataSet(dataset);
	}

	@Override
	protected Point getInitialSize() {
		return new Point(500, 400);
	}

	protected void configureShell(Shell newShell) {
		super.configureShell(newShell);
		newShell.setText(this.title);
	}

	/**
	 * Create contents of the button bar
	 * @param parent
	 */
//	@Override
//	protected void createButtonsForButtonBar(Composite parent) {
//		createButton(parent, IDialogConstants.OK_ID, "确定", true);
//		createButton(parent, IDialogConstants.CANCEL_ID, "取消", false);
//	}

	public List getRecord() {
		return this.dataset.getData();
	}
}
