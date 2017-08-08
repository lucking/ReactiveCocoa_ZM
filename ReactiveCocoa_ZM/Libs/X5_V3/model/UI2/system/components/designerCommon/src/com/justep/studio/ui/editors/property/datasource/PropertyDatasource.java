package com.justep.studio.ui.editors.property.datasource;

import com.justep.design.model.ModelParser;
import com.justep.studio.data.DataColumn;
import com.justep.studio.data.DataSet;
import com.justep.studio.ui.editors.util.XuiConstant;
import com.justep.studio.ui.editors.xui.IPropertyDatasource;
import com.justep.studio.ui.editors.xui.XuiElement;
import com.justep.studio.util.ExtSpaceUIUtil;
import com.justep.studio.util.LogUtil;


public abstract class PropertyDatasource implements IPropertyDatasource{
	
	protected DataSet dataset = new DataSet();

	public DataSet getDataset() {
		return dataset;
	}
	
	protected DataColumn createSelectedColumn(DataSet dataset){
		DataColumn column0 = dataset.addColumn("selected","选择","bool");
		column0.setLength(40);
		column0.setShowText(false);
		return column0;
	}
	
	public  String[] getActionInfoOfData(XuiElement bizDataE, String propName) {
		String[] actionInfo = new String[2];
		//try{
			if(!"data".equals(bizDataE.getConfigAttribute("component-type"))){
				bizDataE = bizDataE.getParentElement();
			}
			
			String action = bizDataE.getProperyValue(XuiConstant.P_READER);
			if(action == null){
				LogUtil.warn("没有设置reader action。");
				return new String[]{"",""};
			}
			int idx = action.lastIndexOf("/");
			if (idx != -1) {
				actionInfo[0] = action.substring(0, idx);
				if(ExtSpaceUIUtil.isInExtSpace(bizDataE.getXuiDataModel().getFilePath())){
					actionInfo[0] = ModelParser.getExtFileName(actionInfo[0]);
					LogUtil.debug("存在扩展空间，从扩展空间获取模块名称："+actionInfo[0]+"  原始模块名称："+action.substring(0, idx));
				}
				actionInfo[1] = action.substring(idx + 1);
				LogUtil.debug("action名称："+actionInfo[1]);
			}
		//}catch(Exception ex){
			//LogUtil.error("获取bizdata中的action信息出错。", ex);
		//}
		return actionInfo;
	}
}
