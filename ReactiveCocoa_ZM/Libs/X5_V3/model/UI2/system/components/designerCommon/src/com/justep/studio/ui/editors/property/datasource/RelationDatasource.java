package com.justep.studio.ui.editors.property.datasource;

import java.util.ArrayList;
import java.util.List;

import com.justep.design.model.ModelConstant;
import com.justep.studio.data.DSUtil;
import com.justep.studio.data.DataSet;
import com.justep.studio.ui.editors.util.XuiConstant;
import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.ui.editors.xui.XuiDataSourceManager;
import com.justep.studio.ui.editors.xui.XuiElement;
import com.justep.studio.ui.views.ConsoleView;

/**
 * 选择Relation编辑器 数据 
 * @author linhongbao
 *
 */
public class RelationDatasource extends PropertyDatasource {

	public DataSet getDatasource(PropertyItem propertyItem) {
		String oldRelations = propertyItem.getValue();
		String[] relstions = oldRelations.split(",");
		List<String> includeList = new ArrayList<String>();
        for(String relation:relstions){
        	includeList.add(relation);
        }
        
        XuiElement xuiElement = (XuiElement)propertyItem.getOwerElement();
      
		/*如果是data节点或data的子节点*/
		if((!"$UI/system/components/justep/data/data".equals(xuiElement.getName())) && ("data".equals(xuiElement.getConfigAttribute("component-type")) || "data".equals(xuiElement.getParentElement().getConfigAttribute("component-type")))){
			String[] actinoInfo = this.getActionInfoOfData(xuiElement, XuiConstant.P_READER);
			DataSet ds = XuiDataSourceManager.getRelationsOfActionMainConcept(actinoInfo[0], actinoInfo[1],true);
			ds.setValueByCondition(DSUtil.SELECTED, true, ModelConstant.ALIAS, includeList);
			return ds;
		}
		/*其他节点，指定editor-parameter属性为data 的ID*/
		else {
			String parameter = propertyItem.getEditorParameter();
			if(parameter != null && !parameter.equals("")){
				String dataId = propertyItem.getOwerElement().getProperyValue(parameter);
				if(dataId!=null && !dataId.equals("")){
					XuiElement dataE = propertyItem.getOwerElement().getXuiDataModel().findElementById(dataId);
					if(dataE != null){
						if("dataQ".equals(dataE.getName()) || "$UI/system/components/justep/data/data".equals(dataE.getName())){
							DataSet ds = XuiDataSourceManager.createHasRelationDataSet();
							String columns = dataE.getProperyValue("columns");
							String[] columnItems = columns.split(",");
							for(String col:columnItems){
							   ds.addRecord(new Object[] { false,col, col, col,"String", null, "relation" });
							}
							ds.setValueByCondition(DSUtil.SELECTED, true, ModelConstant.ALIAS, includeList);
							return ds;
						}else{
							String[] actinoInfo = this.getActionInfoOfData(dataE, XuiConstant.P_READER);
							DataSet ds = XuiDataSourceManager.getRelationsOfActionMainConcept(actinoInfo[0], actinoInfo[1],true);
							ds.setValueByCondition(DSUtil.SELECTED, true, ModelConstant.ALIAS, includeList);
							
							return ds;
						}
					}
				}
				return new DataSet();
			} else{
				return new DataSet();
			}
		}
	}
	
	public DataSet getDatasourceHasRowID(PropertyItem propertyItem) {
		DataSet ds = getDatasource(propertyItem);
		ds.addRecord(new Object[] {false, "rowID", "行ID", "rowID", "", null, "relation" });
		return ds;
	}
}
