package com.justep.studio.ui.editors.propertypage;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.eclipse.swt.SWT;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Text;
import org.w3c.dom.Element;

import com.justep.studio.data.DataRecord;
import com.justep.studio.data.DataSet;
import com.justep.studio.data.DataSetChangedEvent;
import com.justep.studio.data.DataSetChangedListener;
import com.justep.studio.ui.commonpanel.CommonSelectorComposite;
import com.justep.studio.ui.editors.property.strategy.BizDataActionStrategy;
import com.justep.studio.ui.editors.util.XuiDynJavaManager;
import com.justep.studio.ui.editors.xui.IPropertyValueStrategy;
import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.util.XPathUtil;

/**
 * action选择页.
 * @author zmh
 *
 */
public class ActionsCompoiste extends  CommonPropertyEditorPage  {
	private IPropertyValueStrategy  strategy = new BizDataActionStrategy();
	private PropertyItem propertyItem;
	private Text displayText;
	private DataSet dataset;
	private String actionFilter;
	private Button displayAllCheck;
	private CommonSelectorComposite commonComposite;
	
	public ActionsCompoiste(Composite parent, int style) {
		super(parent, style);
	}
	
	private void createContents(){	
		commonComposite = new CommonSelectorComposite(this,SWT.NONE,false,true);
		commonComposite.getTreeViewer().getTree().setLinesVisible(false);
		commonComposite.getTreeViewer().getTree().setHeaderVisible(false);
		commonComposite.setLayoutData(new GridData(SWT.FILL, SWT.FILL, true, true));
		if(this.dataset != null){
		  commonComposite.setDataSet(this.dataset);
		  commonComposite.getTreeViewer().expandAll();
		}
 
		Composite composite = new Composite(this, SWT.NONE);
		GridData gd_composite = new GridData(SWT.FILL, SWT.FILL, true, false);

		composite.setLayoutData(gd_composite);
		GridLayout gridLayout = new GridLayout();
		gridLayout.numColumns = 3;
		gridLayout.marginWidth = 0;
		gridLayout.marginHeight = 0;
		composite.setLayout(gridLayout);

		displayAllCheck = new Button(composite, SWT.CHECK);
		displayAllCheck.setText("显示所有");
		displayAllCheck.addSelectionListener(new SelectionAdapter(){
			public void widgetSelected(final SelectionEvent e){
				displayAll();
			}
		});	
		
		Label label = new Label(composite, SWT.NONE);
		label.setText("属性值");
		displayText = new Text(composite, SWT.BORDER);
		displayText.setLayoutData(new GridData(SWT.FILL, SWT.CENTER, true, false));

		displayText.setEditable(false);
		if(this.propertyItem != null){
           displayText.setText(this.propertyItem.getValue());
		}
	}
	
	public void setDataSet(DataSet dataset){
		this.dataset = dataset;
		this.dataset.getDataColumn("text").setLength(450);
		installDatasetListner();
		createContents();
		displayAll();
	}

	public void setPropertyItem(PropertyItem propertyItem) {
		this.propertyItem = propertyItem;
 
		@SuppressWarnings({ "unused", "unchecked" })
		List<Element> datas = XPathUtil.selectNodes(propertyItem.getOwerElement().getOriginElement().getOwnerDocument(), ".//*[local-name()='data']");
		this.propertyItem = propertyItem;
		this.actionFilter = transActionName(propertyItem.getName());
		String className = propertyItem.getDialogDynData("class-name");
		String methodName = propertyItem.getDialogDynData("method");
	 
		this.dataset = (DataSet)XuiDynJavaManager.executeMethod(propertyItem.getOwnerElementBasePath(), className, methodName,new Object[]{propertyItem});
	
		if(this.dataset != null){
			installDatasetListner();
		}
		
		this.createContents();
		displayAll();
	}
	
	private void installDatasetListner(){
		this.dataset.addDataSetChangedListener(new DataSetChangedListener(){
			public void dataSetChanged(DataSetChangedEvent event) {
				if(event.getEventType() == DataSetChangedEvent.DATACHANGED || event.getEventType() == DataSetChangedEvent.SELECTIONCHANGED){
					String str = strategy.transformPropertyValue(dataset);
					if(!"UNCHANGED".equals(str)){
						displayText.setText(str);
					}
				}
		}});
	}

	public Object getReturnValue() {
		if(this.propertyItem != null){
			Map<String,String> map = new HashMap<String,String>();		 
			map.put(this.propertyItem.getName(), displayText.getText());
			return map;
		}else{
		    return 	displayText.getText();
		}
	}
	
	private String transActionName(String actionName){
		if("reader".equals(actionName)){
			return "query";
		}else if("writer".equals(actionName)){
			return "save";
		}else if("creator".equals(actionName)){
			return "create";
		}else{
			return "";
		}
	}
	
	private void displayAll(){
		boolean b = this.displayAllCheck == null?false:displayAllCheck.getSelection();	
		String filterText = commonComposite.getFilterText();
		String filter = filterText==null?actionFilter.toLowerCase():filterText.toLowerCase();
		List<DataRecord> drl = dataset.getDataRecords();
		for(DataRecord dr:drl){
			List<DataRecord> chDrL = dr.getChildList(); 
			boolean root = false;
			for(DataRecord chDr:chDrL){
				boolean flag = chDr.getString("name").toLowerCase().indexOf(filter) != -1 && (chDr.getString("hasAction").equals("true") || b);
				chDr.setVisible(flag);
				chDr.setMatch(flag);
				root = flag || root;
			}
			
			dr.setVisible(root);
			dr.setMatch(root);
		} 
		commonComposite.getTreeViewer().refresh();
		commonComposite.getTreeViewer().expandAll();
	}
}
