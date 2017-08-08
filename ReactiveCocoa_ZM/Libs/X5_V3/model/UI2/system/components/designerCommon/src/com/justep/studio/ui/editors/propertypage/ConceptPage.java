package com.justep.studio.ui.editors.propertypage;

import java.util.HashMap;
import java.util.Map;

import org.eclipse.swt.SWT;
import org.eclipse.swt.events.MouseAdapter;
import org.eclipse.swt.events.MouseEvent;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.TableItem;
import org.eclipse.swt.widgets.Text;

import com.justep.studio.data.DataRecord;
import com.justep.studio.data.DataSet;
import com.justep.studio.ui.commonpanel.CommonSelectorComposite;
import com.justep.studio.ui.editors.util.XuiDynJavaManager;
import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.ui.exjface.DataSetTableViewer;

public class ConceptPage extends CommonPropertyEditorPage {
	private PropertyItem propertyItem;
	private Text displayText;
	private DataSet dataset;
	private DataSetTableViewer tableViewer;
	
	public ConceptPage(Composite parent, int style) {
		super(parent, style);
	}
	
	private void createContents(){	
		CommonSelectorComposite commonComposite = new CommonSelectorComposite(this,SWT.NONE,false,false);
		commonComposite.setLayoutData(new GridData(SWT.FILL, SWT.FILL, true, true));
		commonComposite.setDataSet(this.dataset);
		tableViewer = commonComposite.getTableViewer();
		tableViewer.getTable().addMouseListener(new MouseAdapter(){
			public void mouseDown(MouseEvent e) {        				 
				mouseDownHandler();
			}
		});
		Composite composite = new Composite(this, SWT.NONE);
		GridData gd_composite = new GridData(SWT.FILL, SWT.FILL, true, false);

		composite.setLayoutData(gd_composite);
		GridLayout gridLayout = new GridLayout();
		gridLayout.numColumns = 2;
		gridLayout.marginWidth = 0;
		gridLayout.marginHeight = 0;
		composite.setLayout(gridLayout);

		Label label = new Label(composite, SWT.NONE);
		label.setText("属性值");
		displayText = new Text(composite, SWT.BORDER);
		displayText.setLayoutData(new GridData(SWT.FILL, SWT.CENTER, true, false));

		displayText.setEditable(false);
		displayText.setBackground(displayText.getParent().getBackground());

        displayText.setText(this.propertyItem.getValue());
	}
	private void mouseDownHandler() {
		TableItem[] items = tableViewer.getTable().getSelection();
		if(items.length>0){
			Object data = items[0].getData();
			if(data instanceof DataRecord){
				
				DataRecord r = (DataRecord)data;
				displayText.setText(r.getString("alias")); 
			}	
		}		
	}
	public void setPropertyItem(PropertyItem propertyItem) {
		this.propertyItem = propertyItem;
 
		String className = propertyItem.getDialogDynData("class-name");
		String methodName = propertyItem.getDialogDynData("method");
		this.dataset = (DataSet)XuiDynJavaManager.executeMethod(propertyItem.getOwnerElementBasePath(), className, methodName,new Object[]{propertyItem});
		this.createContents();
	}

	public Map<String,String> getReturnValue() {
		Map<String,String> map = new HashMap<String,String>();		 
		map.put(this.propertyItem.getName(), displayText.getText());
		return map;
	}
}
