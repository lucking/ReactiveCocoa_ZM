package com.justep.studio.ui.editors.property.datasource;

import java.util.List;

import com.justep.studio.data.DataSet;
import com.justep.studio.ui.editors.util.XuiConstant;
import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.ui.editors.xui.XuiDataSourceManager;
import com.justep.studio.ui.editors.xui.XuiElement;

public class RuleRelationDatasource extends PropertyDatasource {

	public DataSet getDatasource(PropertyItem propertyItem) {
		String[] actinoInfo = this.getActionInfoOfData((XuiElement)propertyItem.getOwerElement(), XuiConstant.P_READER);
		XuiElement data = ((XuiElement)propertyItem.getOwerElement());
		if(data.getName().equals("$UI/system/components/justep/data/data")){
			return XuiDataSourceManager.getDataRelationDataSet(data);			
		}
		DataSet result = XuiDataSourceManager.getRelationsOfActionMainConcept(actinoInfo[0], actinoInfo[1]);
		//增加bizData的计算关系
		List<XuiElement> calcCols = data.getChildListByName("$UI/system/components/justep/data/bizData#calculateRelation");
		for(XuiElement col : calcCols){
			String rela = col.getProperyValue("relation");
			String type = col.getProperyValue("type");
			result.addRecord(new Object[]{rela,rela,type});
		}
		return result;
       
//		DataSet dataset = new DataSet();
//		
//		DataColumn col1 = dataset.addColumn("alias","关系别名","string");
//		col1.setLength(120);
//		col1.setSearchField(true);
//		col1.setSort(true);
//		col1.setImage("relation.gif");
//		col1.setDisenableFilterCondition("selected==true");
//		
//		col1 = dataset.addColumn("label","关系名称","string");
//		col1.setLength(170);
//		col1.setSearchField(true);		
//		col1.setSort(true);		
//		
//		col1 = dataset.addColumn("name","关系标识","string");
//		col1.setSearchField(true);
//		col1.setSort(true);
//		col1.setLength(120);
//		
//		col1 = dataset.addColumn("rangeType","关系类型","string");
//		col1.setLength(120);
//		col1.setSort(true);
//		XuiElement e = (XuiElement)propertyItem.getOwerElement();
//		while(e != null){
//			if(e.getName().equals("bizData") || e.getName().equals("data")){
//				break;
//			}
//			e = e.getParentElement();
//		}
//		Element srcE = e.getOriginElement();
//		if(srcE==null){
//			System.out.println("没有找到数据源元素。");
//			return dataset;
//		}
//		String component = srcE.getAttribute("component");
//		if(component.equals("/UI/system/components/data.xbl.xml#data")){
//			String columns = srcE.getAttribute("columns");
//			if(columns == null){
//				return dataset;
//			}
//			String[] cls = columns.split(",");
//			String[] rels = null;
//			for(String cl:cls){
//				dataset.addRecord(new Object[]{cl,"",cl,""});
//			}	
//			return dataset;
//		}
//		//Element parentE = (Element)srcE.getParentNode();
//		Element readerE = W3cDocumentHelper.getFirstChildXmlElementByTag(srcE, "reader");
//		String moduleName = null;
//		String actionName = null;
//		if(readerE!=null){
//			String action = readerE.getAttribute("action");
//			int idx = action.lastIndexOf("/");
//			if(idx!=-1){
//				moduleName = action.substring(0,idx);
//				actionName = action.substring(idx+1);
//			}
//		}		
//		
//		if(moduleName!=null){
//			ActionModelManager manager = new ActionModelManager();
//			try {
//				manager.reloadModule(StudioConfig.getBIZPath(), moduleName);
//				ActionModel model = manager.queryActionModel(actionName);
//				if(model==null){
//					return dataset;
//				}
//				List<ActnRelation> atnRels = model.getRelations();
//				for(ActnRelation atnRel : atnRels){
//					String alias = atnRel.getAlias();
//					String relName = atnRel.getName();
//					
//					Collection<String> collection = atnRel.getMultiLabelMap().values();
//					int size = collection.size();
//					String[] labels = collection.toArray(new String[size]);
//					String relLabel = size>0?labels[0]:relName; 
//					dataset.addRecord(new Object[]{alias,relLabel,relName,atnRel.getRangeType()});
//				}
//				
//				List<XuiElement> list = e.getChildListByName("calculate-relation");
//				for(XuiElement relationE:list){
//					String relation = relationE.getProperyValue("relation");
//					dataset.addRecord(new Object[]{relation,"",relation,""});
//				}
//				list = e.getChildListByName("aggregate-relation");
//				for(XuiElement relationE:list){
//					String relation = relationE.getProperyValue("relation");
//					dataset.addRecord(new Object[]{relation,"",relation,""});
//				}
//			} catch (Exception e2) {
//				e2.printStackTrace();
//			}
//		}		
//		
//		return dataset;
	
	}

}
