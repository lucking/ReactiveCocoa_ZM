package com.justep.studio.ui.editors.propertypage;

import java.util.HashMap;
import java.util.Map;

import org.eclipse.swt.SWT;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.TabFolder;
import org.eclipse.swt.widgets.TabItem;
import org.eclipse.swt.widgets.Text;
import org.w3c.dom.Element;

import com.justep.studio.data.DataSet;
import com.justep.studio.data.DataSetChangedEvent;
import com.justep.studio.data.DataSetChangedListener;
import com.justep.studio.ui.commonpanel.CommonSelectorComposite;
import com.justep.studio.ui.editors.property.strategy.DataIdStrategy;
import com.justep.studio.ui.editors.util.XuiDynJavaManager;
import com.justep.studio.ui.editors.xui.IPropertyValueStrategy;
import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.ui.editors.xui.XuiElement;

public class DataPropertyPage extends CommonPropertyEditorPage {
	private PropertyItem propertyItem;
	private boolean isForeachRef = false;
	private IPropertyValueStrategy strategy = new DataIdStrategy();
	private Text displayText;
	
	private DataSet dataset;
	
	public DataPropertyPage(Composite parent, int style) {
		super(parent, style);
	}
	
	private String getForeachRef(String str){
		if(isForeachRef){
			return "$model."+str;
		}else return str;
	}
	
	private void findForeachContext(XuiElement xuiElement){
		XuiElement xuiE = xuiElement.getParentElement();
		if(null!=xuiE){
			String componentType = xuiE.getComponentType();
			Element element = xuiE.getOriginElement();
			if(element.hasAttribute("bind-foreach")){
				isForeachRef = true;
			}else if(element.hasAttribute("bind-with")){
				isForeachRef = true;
			}else if("foreach".equalsIgnoreCase(componentType)){
				isForeachRef = true;
			}else findForeachContext(xuiE);
		}
	}
	
	private void createContents(){		
		TabFolder tabFolder = new TabFolder(this, SWT.NONE);
		tabFolder.setLayoutData(new GridData(SWT.FILL, SWT.FILL, true, true));
		  
		CommonSelectorComposite commonCompositeRef = new CommonSelectorComposite(tabFolder,SWT.NONE,false,true);
		commonCompositeRef.getTreeViewer().getTree().setLinesVisible(false);
		commonCompositeRef.getTreeViewer().getTree().setHeaderVisible(false);
		commonCompositeRef.setLayoutData(new GridData(SWT.FILL, SWT.FILL, true, true));
		commonCompositeRef.setDataSet(this.dataset);
		commonCompositeRef.getTreeViewer().expandAll();
		TabItem tabItem1 = new TabItem(tabFolder, SWT.NONE);
		tabItem1.setText("数据选择");
		tabItem1.setControl(commonCompositeRef);
		  
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
	
	public void setPropertyItem(PropertyItem propertyItem) {
		this.propertyItem = propertyItem;
		XuiElement ownerE = (XuiElement)propertyItem.getOwerElement();
		findForeachContext(ownerE);
		String className = propertyItem.getDialogDynData("class-name");
		String methodName = propertyItem.getDialogDynData("method");
		this.dataset = (DataSet)XuiDynJavaManager.executeMethod(propertyItem.getOwnerElementBasePath(), className, methodName,new Object[]{propertyItem});
		
		if(this.dataset != null){
			this.dataset.addDataSetChangedListener(new DataSetChangedListener(){
				public void dataSetChanged(DataSetChangedEvent event) {
					if(event.getEventType() == DataSetChangedEvent.DATACHANGED || event.getEventType() == DataSetChangedEvent.SELECTIONCHANGED){
						String str = strategy.transformPropertyValue(dataset);
						if(!"UNCHANGED".equals(str)){
							if(str != null && !str.equals("") && isForeachRef){
								str = getForeachRef(str);
							}
							displayText.setText(str);
						}
					}
			}});
		}

		this.createContents();
	}

	public Object getReturnValue() {
		String ref = displayText.getText();
		Map<String,String> map = new HashMap<String,String>();
		map.put(this.propertyItem.getName(), ref);
		return map;
	}

}
