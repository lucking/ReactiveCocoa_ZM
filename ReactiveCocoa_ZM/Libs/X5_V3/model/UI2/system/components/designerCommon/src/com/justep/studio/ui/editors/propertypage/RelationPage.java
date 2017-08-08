package com.justep.studio.ui.editors.propertypage;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.eclipse.swt.SWT;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.widgets.Composite;

import com.justep.studio.data.DataRecord;
import com.justep.studio.data.DataSet;
import com.justep.studio.ui.commonpanel.CommonSelectorComposite;
import com.justep.studio.ui.editors.util.XuiDynJavaManager;
import com.justep.studio.ui.editors.xui.PropertyItem;

public class RelationPage extends CommonPropertyEditorPage {
	private PropertyItem propertyItem;
	private DataSet dataset;
	
	public RelationPage(Composite parent, int style) {
		super(parent, style);
	}
	
	private void createContents(){	
		CommonSelectorComposite commonComposite = new CommonSelectorComposite(this,SWT.NONE,true,false);
		commonComposite.setLayoutData(new GridData(SWT.FILL, SWT.FILL, true, true));
		commonComposite.setDataSet(this.dataset);
	}
	
	public void setPropertyItem(PropertyItem propertyItem) {
		this.propertyItem = propertyItem;
 
		String className = propertyItem.getDialogDynData("class-name");
		String methodName = propertyItem.getDialogDynData("method");
		this.dataset = (DataSet)XuiDynJavaManager.executeMethod(propertyItem.getOwnerElementBasePath(), className, methodName,new Object[]{propertyItem});
		this.createContents();
	}
	
	private List<DataRecord> getSelectedRecord() {
		List<DataRecord> slist = new ArrayList<DataRecord>();
		List<DataRecord> list = this.dataset.getData();
		for (DataRecord dataRecord : list) {
			if (dataRecord.getBoolean("selected")) {
				slist.add(dataRecord);
			}
		}
		return slist;
	}
	
	public Object getReturnValue() {
		Map<String,String> map = new HashMap<String,String>();
		StringBuffer sbf = new StringBuffer();
		List<DataRecord> list = this.getSelectedRecord();
		for (DataRecord r:list) {
			sbf.append(","+r.getString("alias"));
		}
		if(sbf.length()>0){
			map.put(propertyItem.getName(), sbf.toString().substring(1));
		}else{
			map.put(propertyItem.getName(), "");
		}
		return map;
	}
}
