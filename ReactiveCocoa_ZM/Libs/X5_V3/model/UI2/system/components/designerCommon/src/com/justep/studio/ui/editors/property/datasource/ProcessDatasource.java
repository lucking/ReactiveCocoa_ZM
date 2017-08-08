package com.justep.studio.ui.editors.property.datasource;

import com.justep.studio.data.DataSet;
import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.ui.editors.xui.XuiDataModel;
import com.justep.studio.ui.editors.xui.XuiDataSourceManager;
import com.justep.studio.ui.editors.xui.XuiElement;

public class ProcessDatasource extends PropertyDatasource {

	public DataSet getDatasource(PropertyItem propertyItem) {
		XuiElement ownerE = (XuiElement)propertyItem.getOwerElement();
		XuiDataModel model = ownerE.getXuiDataModel();
		String modelName = model.getModuleName();
		DataSet ds = XuiDataSourceManager.getProcessTreeDataSet(modelName);
		return ds;
	
	}

}
