import java.util.List;

import org.eclipse.jface.dialogs.Dialog;
import org.eclipse.jface.dialogs.IDialogConstants;
import org.eclipse.swt.SWT;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.graphics.Color;
import org.eclipse.swt.graphics.Point;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Control;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.swt.widgets.Table;
import org.eclipse.swt.widgets.ToolBar;
import org.eclipse.swt.widgets.ToolItem;

import swing2swt.layout.BorderLayout;

import com.justep.studio.data.DataColumn;
import com.justep.studio.data.DataRecord;
import com.justep.studio.data.DataSet;
import com.justep.studio.ui.editors.xui.W3cDocumentHelper;
import com.justep.studio.ui.editors.xui.XuiElement;
import com.justep.studio.ui.exjface.DataSetTableViewer;
import com.justep.studio.ui.exjface.DatasetTableLabelProvider;

public class EditDataDialog extends Dialog {
	private String title;
	private Table table;
	private DataSet dataset;
	private DataSetTableViewer tableViewer;
	private XuiElement currentElement;
	private String[] columns;

	/**
	 * Create the dialog
	 * @param parentShell
	 */
	public EditDataDialog(Shell parentShell) {
		super(parentShell);
	}

	public EditDataDialog(Shell parentShell, String title) {
		super(parentShell);
		this.title = title;
	}

	public EditDataDialog(Shell parentShell, String title, XuiElement element) {
		super(parentShell);
		this.title = title;
		currentElement = element;
	}

	public void setProperty(String propName, String propValue) {
		if (propName.equals("columnids")) {
			if (propValue != null && !propValue.equals("")) {
				String[] headers = propValue.split(",");
				for (String header : headers) {
					dataset.addColumn(header).setLength(150).setDataType("String").setHeader(header).setEditable(true).setEditor("TextCellEditor");
				}
			}
			tableViewer.reloadDataSet(dataset);
		}
	}

	/**
	 * Create contents of the dialog
	 * @param parent
	 */
	@Override
	protected Control createDialogArea(Composite parent) {
		Composite container = (Composite) super.createDialogArea(parent);
		container.setLayout(new BorderLayout(0, 0));

		//工具条
		final ToolBar toolBar = new ToolBar(container, SWT.NONE);
		toolBar.setLayoutData(BorderLayout.NORTH);
		final ToolItem newItemToolItem_2 = new ToolItem(toolBar, SWT.PUSH);
		newItemToolItem_2.setText("增加行");
		newItemToolItem_2.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(final SelectionEvent e) {
				if (tableViewer.getTable().getColumnCount() <= 0) {
					return;
				}
				Object[] values = new Object[] { "" };
				dataset.addRecord(values);
			}
		});

		final ToolItem newItemToolItem_3 = new ToolItem(toolBar, SWT.PUSH);
		newItemToolItem_3.setText("删除行");

		newItemToolItem_3.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(final SelectionEvent e) {
				List<DataRecord> list = dataset.getSelectedRecord();
				if (list.size() > 0) {
					dataset.deleteRecord(dataset.getSelectedRecord().get(0));
				}
			}
		});

		//表格
		tableViewer = new DataSetTableViewer(container, SWT.BORDER | SWT.FULL_SELECTION);
		tableViewer.setLabelProvider(new DatasetTableLabelProvider(tableViewer) {
			public Color getBackground(Object element, int columnIndex) {
				Color color = new Color(null, 211, 226, 243);
				return color;
			}
		});
		table = tableViewer.getTable();
		table.setLinesVisible(true);
		table.setHeaderVisible(true);
		initParamTable();
		setTableData();
		return container;
	}

	private void setTableData() {
		XuiElement lastRowsElement = currentElement.getChildByTagName("rows");
		if (lastRowsElement == null) {
			return;
		}
		List<XuiElement> rowList = lastRowsElement.getChildListByTagName("row");
		if (rowList == null || rowList.size() <= 0) {
			return;
		}
		String[] vals = new String[columns.length];
		for (int i = 0; i < rowList.size(); i++) {
			XuiElement row = rowList.get(i);
			List<XuiElement> cells = row.getChildListByTagName("cell");
			List<DataColumn> list = dataset.getDataColumns();
			if (list != null && list.size() > 0) {
				for (int j = 0; j < list.size(); j++) {
					try {
						XuiElement cell = cells.get(j);
						vals[j] = W3cDocumentHelper.getText(cell.getOriginElement());
					} catch (Exception e) {
						vals[j] = "";
					}
				}
				dataset.addRecord(vals);
			}
		}
	}

	/**
	 * Create contents of the button bar
	 * @param parent
	 */
	@Override
	protected void createButtonsForButtonBar(Composite parent) {
		createButton(parent, IDialogConstants.OK_ID, "确定", true);
		createButton(parent, IDialogConstants.CANCEL_ID, "取消", false);
	}

	public void editData() {
	}

	/**
	 * Return the initial size of the dialog
	 */
	@Override
	protected Point getInitialSize() {
		return new Point(500, 400);
	}

	protected void configureShell(Shell newShell) {
		super.configureShell(newShell);
		newShell.setText(this.title);
	}

	public List<DataRecord> getRecord() {
		return this.dataset.getData();
	}

	public String[] getTableColumnCount() {
		return columns;
	}

	private void initParamTable() {
		columns = currentElement.getProperyValue("columns").split(",");
		dataset = new DataSet();
		for (int i = 0; i < columns.length; i++) {
			if (!columns[i].equals("")) {
				dataset.addColumn(columns[i], columns[i], "string").setLength(150).setEditor("TextCellEditor");
			}
		}
		tableViewer.setDataSet(dataset);
	}

}
