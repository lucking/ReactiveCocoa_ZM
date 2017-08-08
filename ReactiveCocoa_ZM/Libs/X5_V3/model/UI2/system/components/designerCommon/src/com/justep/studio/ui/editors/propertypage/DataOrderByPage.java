package com.justep.studio.ui.editors.propertypage;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.eclipse.swt.SWT;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.widgets.Composite;

import com.justep.design.model.ModelConstant;
import com.justep.studio.data.DSUtil;
import com.justep.studio.data.DataRecord;
import com.justep.studio.data.DataSet;
import com.justep.studio.ui.commonpanel.CommonSelectorComposite;
import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.ui.editors.xui.XuiDataSourceManager;
import com.justep.studio.ui.editors.xui.XuiElement;

public class DataOrderByPage  extends CommonPropertyEditorPage {
	private PropertyItem propertyItem;
	private DataSet dataset;
	
	public DataOrderByPage(Composite parent, int style) {
		super(parent, style);
		this.setSize(650, 500);
	}
	
	private void createContents(){	
		CommonSelectorComposite commonComposite = new CommonSelectorComposite(this,SWT.NONE,true,false);
		commonComposite.setLayoutData(new GridData(SWT.FILL, SWT.FILL, true, true));
		commonComposite.setDataSet(dataset);
	}
	
	public void setPropertyItem(PropertyItem propertyItem) {
		this.propertyItem = propertyItem;
		
		/*
		XuiElement currentElement = ((XuiElement)propertyItem.getOwerElement());
		String gridId = currentElement.getProperyValue("gridID");
		XuiElement gridElement = currentElement.getXuiDataModel().findElementById(gridId);
		List<XuiElement> columnList = gridElement.getChildren();
		*/
		
		dataset = createDataSet();
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
 
	private DataSet createDataSet() {
		DataSet ds = XuiDataSourceManager.getDataRelationDataSet((XuiElement)propertyItem.getOwerElement());
		DSUtil.createColumn(ds, "sortType", "排序方式", "string", false, false, 100).setDataSource("sortType").setEditor("ComboboxEditor");
		
		String pv = propertyItem.getValue();
		Map<String,String> map = new HashMap<String,String>();
		if(pv != null){
             String[] pvs = pv.split(",");
             for(String s:pvs){
            	 if(s.equals(""))continue;
            	 String[] ss = s.indexOf(":")!=-1?s.split(":"):s.split(" ");
            	 map.put(ss[0], ss[1]);
             }
		}
		List<DataRecord> rcList = ds.getData();
		for(DataRecord rc:rcList){
			String sortType = map.get(rc.getString(ModelConstant.ALIAS));
			if(sortType != null){
			   rc.setValue(DSUtil.SELECTED, true);
			   rc.setValue("sortType",sortType==null?"desc":sortType);
			}
		} 	
		return ds;
	}
 
	public Object getReturnValue() {
		Map<String,String> map = new HashMap<String, String>();
		List<DataRecord> list = this.getSelectedRecord();
		String value = "";
		for (int i = 0; i<list.size(); i++) {
			if(i!=0)value +=","; 
			String sortType = list.get(i).getString("sortType");
			if(sortType == null || sortType.equals("")){
				sortType = "desc";
			}
			value += list.get(i).getValue(ModelConstant.ALIAS)+" "+sortType;
		} 
		map.put(this.propertyItem.getName(), value);
		return map;
	}
}