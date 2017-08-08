package com.justep.studio.ui.editors.propertypage;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.eclipse.swt.widgets.Composite;

import com.justep.design.model.ModelConstant;
import com.justep.studio.data.DSUtil;
import com.justep.studio.data.DataRecord;
import com.justep.studio.data.DataSet;
import com.justep.studio.ui.editors.xui.AbstractDataSetPage;
import com.justep.studio.ui.editors.xui.XuiDataSourceManager;
import com.justep.studio.ui.editors.xui.XuiElement;
import com.justep.studio.ui.exjface.DataSetViewerEditor;
import com.justep.studio.util.CommonUtil;

public class BizDataRelationWidthPage extends AbstractDataSetPage {
	public BizDataRelationWidthPage(Composite parent, int style) {
		super(parent, style);
		this.setSize(650, 500);
	}

	private String getLabelAttrName(){
		return "label-"+propertyItem.getName();
	}
	
	@Override
	public DataSet getDataSet() {
		String id = propertyItem.getOwerElement().getOriginElement().getAttribute("data");
		if(CommonUtil.isEmpty(id)){
			id = propertyItem.getOwerElement().getParentElement().getOriginElement().getAttribute("data");
		}
		XuiElement data = ((XuiElement)propertyItem.getOwerElement()).getXuiDataModel().findElementById(id);
		DataSet ds = XuiDataSourceManager.getDataRelationDataSet(data);
		DSUtil.createColumn(ds, "dispName", "导出列名", "string", false, false, 80).setDataSource("dispName").setEditor(DataSetViewerEditor.TEXT_CELL_EDITOR);
		DSUtil.createColumn(ds, "width", "列宽", "string", false, false, 60).setDataSource("width").setEditor(DataSetViewerEditor.TEXT_CELL_EDITOR);
		
		String pv = propertyItem.getOwerElement().getOriginElement().getAttribute(propertyItem.getName());
		String labelpv = propertyItem.getOwerElement().getOriginElement().getAttribute(getLabelAttrName());
		Map<String, Map<String, String>> map = new HashMap<String, Map<String, String>>();
		if(null != pv){
             String[] pvs = pv.split(",");
             String[] labels = null;
             if(null != labelpv)
            	 labels = labelpv.split(",");
             int i = 0;
             for(String s : pvs){
            	 int j = i++;
            	 if(null==s || s.equals(""))continue;
            	 String n = s;
            	 String w = "";
            	 String dispName = (labels!=null && labels.length>j)?labels[j]:"";
            	 int p = s.lastIndexOf(":");
            	 if(p>0){
            		 w = s.substring(p+1);
            		 n = s.substring(0, p);
            	 }
            	 Map<String,String> o = new HashMap<String,String>();
            	 if(!"".equals(w)) o.put("w", w);
            	 if(!"".equals(dispName)) o.put("d", dispName);
            	 map.put(n, o);
             }
		}
		List<DataRecord> rcList = ds.getData();
		for(DataRecord rc:rcList){
			if(map.containsKey(rc.getString(ModelConstant.ALIAS))){
				rc.setValue(DSUtil.SELECTED, true);
				Map<String, String> o = map.get(rc.getString(ModelConstant.ALIAS));
				if(o.containsKey("w")) rc.setValue("width", o.get("w"));
				if(o.containsKey("d")) rc.setValue("dispName", o.get("d"));
			}
		} 	
		return ds;
	}

	@Override
	public Map<String, String> getReturnValue(DataSet arg0) {
		Map<String,String> map = new HashMap<String, String>();
		List<DataRecord> list = this.getSelectedRecord();
		String value = "",label = "";
		for (int i = 0; i<list.size(); i++) {
			if(i!=0){value +=",";label +=",";} 
			String width = list.get(i).getString("width");
			if(width == null)width = "";
			String dispName = list.get(i).getString("dispName");
			label += (null!=dispName?dispName:"");
			value += list.get(i).getValue(ModelConstant.ALIAS) + ":" + width;
		} 
		map.put(this.propertyItem.getName(), value);
		map.put(getLabelAttrName(), label);
		return map;
	}

	@Override
	public boolean isMultiSelect() {
		return true;
	}

}
