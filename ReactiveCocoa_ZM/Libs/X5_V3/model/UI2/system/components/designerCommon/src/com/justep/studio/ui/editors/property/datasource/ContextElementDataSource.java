package com.justep.studio.ui.editors.property.datasource;

import java.util.ArrayList;
import java.util.List;

import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.ui.editors.xui.XuiElement;


public class ContextElementDataSource {

	public List getIdsByBaseClass(PropertyItem propertyItem){
		String parameter = propertyItem.getEditorParameter();
		if(parameter != null && !parameter.equals("")){
			List<XuiElement> list = propertyItem.getOwerElement().getXuiDataModel().getRootElement().getAllChildrenByComponentType(parameter);
		    List<String[]> idList = new ArrayList();
		    for(XuiElement e:list){
		    	idList.add(new String[]{e.getId(),e.getId()});
		    }
		    return idList;
		}
		return new ArrayList();
	}
}
