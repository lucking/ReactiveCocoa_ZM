package com.justep.studio.ui.editors.property.datasource;

import com.justep.studio.data.DataSet;
import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.ui.editors.xui.XuiDataSourceManager;
import com.justep.studio.ui.editors.xui.XuiElement;

public class RefPropertyDatasource extends PropertyDatasource{

	public DataSet getDatasource(PropertyItem propertyItem) {
		XuiElement ownerE = (XuiElement)propertyItem.getOwerElement();
		return XuiDataSourceManager.getAllDataRelationTreeDataSet(ownerE);
	}
}
