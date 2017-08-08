import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.eclipse.swt.SWT;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.graphics.Color;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Table;
import org.eclipse.swt.widgets.ToolBar;
import org.eclipse.swt.widgets.ToolItem;

import swing2swt.layout.BorderLayout;

import com.justep.studio.data.DataRecord;
import com.justep.studio.data.DataSet;
import com.justep.studio.ui.editors.xui.IPropertyDialogPage;
import com.justep.studio.ui.editors.xui.IPropertyValueStrategy;
import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.ui.exjface.DataSetTableViewer;
import com.justep.studio.ui.exjface.DatasetTableLabelProvider;

/**
 * commData columns propertyEdit
 * @author linhongbao
 *
 */
public class EditColumnPage extends Composite implements IPropertyDialogPage {

	private Table table;
	private DataSet dataset;
	private final DataSetTableViewer tableViewer ;
	private PropertyItem propertyItem;
	
	public EditColumnPage(Composite parent, int style) {
		super(parent, style);
		setLayout(new BorderLayout(0, 0));

		tableViewer = new DataSetTableViewer(this, SWT.BORDER|SWT.FULL_SELECTION);
		dataset=new DataSet();
		tableViewer.setDataSet(dataset);
		table = tableViewer.getTable();
		table.setLinesVisible(true);
		table.setHeaderVisible(true);
	
		tableViewer.setLabelProvider(new DatasetTableLabelProvider(tableViewer){
			public Color getBackground(Object element, int columnIndex) {
				return new Color(null,211,226,243);
			}
		});
		
		final ToolBar toolBar = new ToolBar(this, SWT.NONE);
		toolBar.setLayoutData(BorderLayout.NORTH);

		final ToolItem newItemToolItem = new ToolItem(toolBar, SWT.PUSH);
		
		newItemToolItem.setText("增加列");
		newItemToolItem.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(final SelectionEvent e) {
				Object[] values = new Object[] {""};
				dataset.addRecord(values);
			}
		});

		final ToolItem newItemToolItem_1 = new ToolItem(toolBar, SWT.PUSH);
		newItemToolItem_1.setText("删除列");
		newItemToolItem_1.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(final SelectionEvent e) {
				List<DataRecord> list = dataset.getSelectedRecord();
				if(list.size()>0){
					dataset.deleteRecord(dataset.getSelectedRecord().get(0));
				}
			}
		});

		final ToolItem newItemToolItem_2 = new ToolItem(toolBar, SWT.PUSH);
		newItemToolItem_2.setText("上移");
		newItemToolItem_2.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(final SelectionEvent e) {
				List<DataRecord> list = dataset.getSelectedRecord();
				if(list.size()>0){
					DataRecord selectedData = list.get(0);
					
					List<DataRecord> allList = dataset.getData();
					int selectIndex = 0;
					for (int i = 0; i < allList.size(); i++) {
						if(allList.get(i) == selectedData){
							selectIndex = i;
							break;
						}
					}
					if(selectIndex>0){
						allList.set(selectIndex, allList.get(selectIndex-1));
						allList.set(selectIndex-1, selectedData);
						dataset.setData(allList);
						tableViewer.reloadDataSet(dataset);
					}
				}
			}
		});
		

		final ToolItem newItemToolItem_3 = new ToolItem(toolBar, SWT.PUSH);
		newItemToolItem_3.setText("下移");
		newItemToolItem_3.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(final SelectionEvent e) {
				List<DataRecord> list = dataset.getSelectedRecord();
				if(list.size()>0){
					DataRecord selectedData = list.get(0);
					
					List<DataRecord> allList = dataset.getData();
					int selectIndex = 0;
					for (int i = 0; i < allList.size(); i++) {
						if(allList.get(i) == selectedData){
							selectIndex = i;
							break;
						}
					}
					if(selectIndex<allList.size()-1){
						allList.set(selectIndex, allList.get(selectIndex+1));
						allList.set(selectIndex+1, selectedData);
						dataset.setData(allList);
						tableViewer.reloadDataSet(dataset);
					}
				}
			}
		});
		
		String header = "column";
		dataset.addColumn(header).setLength(150).setDataType("String").setHeader(header).setEditable(true).setEditor("TextCellEditor");
		tableViewer.reloadDataSet(dataset);
		
	}

	public Object getReturnValue() {
		List<DataRecord> list = this.dataset.getData();
		StringBuffer buffer = new StringBuffer();
		for (int i = 0; i < list.size(); i++) {
			DataRecord dataRecord = list.get(i);
			buffer.append(dataRecord.getString("column"));
			if(i<list.size()-1){
				buffer.append(",");
			}
		}
		Map<String,String> map = new HashMap<String,String>();
		map.put("columns", buffer.toString());
		return map;
	}

	public String isValid() {
		return this.dataset.validate();
	}

	public void setPropertyItem(PropertyItem propertyItem) {
		
		this.propertyItem = propertyItem;
		String columnValue = propertyItem.getValue();
		String[] columnValueArray = columnValue.split(",");
		Object[] values = new Object[] {""};
		for (int i = 0; i < columnValueArray.length; i++) {
			values[0] = columnValueArray[i];
			dataset.addRecord(values);
		}
		this.tableViewer.setDataSet(this.dataset);
	}
	
	public PropertyItem getPropertyItem(){
		return this.propertyItem;
	}

	public void setReturnValueStrategy(IPropertyValueStrategy strategy) {

	}

}
