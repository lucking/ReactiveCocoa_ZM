package com.justep.studio.ui.editors.property.datasource;

import java.util.List;

import com.justep.studio.data.DataSet;
import com.justep.studio.ui.editors.util.XuiConstant;
import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.ui.editors.xui.XuiDataSourceManager;
import com.justep.studio.ui.editors.xui.XuiElement;

/**
 * 选择Concept编辑器 数据 
 * @author linhongbao
 *
 */
public class ConceptDatasource extends PropertyDatasource {

	public DataSet getDatasource(PropertyItem propertyItem) {	
		
		XuiElement xuiElement = (XuiElement)propertyItem.getOwerElement();
		/*如果是data节点或data的子节点*/
		if("data".equals(xuiElement.getConfigAttribute("component-type")) ||  "data".equals(xuiElement.getParentElement().getConfigAttribute("component-type")) ){
			String[] actionInfo = this.getActionInfoOfData(xuiElement, XuiConstant.P_READER);
			return XuiDataSourceManager.getMainConceptOfAction(actionInfo[0], actionInfo[1]);
		}
		/*其他节点，指定editor-parameter属性为data 的ID*/
		else {
			String parameter = propertyItem.getEditorParameter();
			if(parameter != null && !parameter.equals("")){
				String dataId = propertyItem.getOwerElement().getProperyValue(parameter);
				if(dataId!=null && !dataId.equals("")){
					List<XuiElement> list = propertyItem.getOwerElement().getXuiDataModel().getRootElement().getAllChildrenByComponentType("data");
					for (XuiElement element : list) {
						if(dataId.equals(element.getId())){
							String[] actionInfo = XuiDataSourceManager.getActionInfoOfData(element, XuiConstant.P_READER);
							return XuiDataSourceManager.getMainConceptOfAction(actionInfo[0], actionInfo[1]);
						}
					}
				}
				return new DataSet();
			} else{
				return new DataSet();
			}
		}
	}
}
