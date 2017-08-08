package com.justep.studio.ui.editors.property.datasource;

import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;

import com.justep.studio.data.DataColumn;
import com.justep.studio.data.DataSet;
import com.justep.studio.ui.editors.xui.PropertyItem;

public class RuleActionsDatasource extends PropertyDatasource {

	public DataSet getDatasource(PropertyItem propertyItem) {
		
		DataColumn col1 = dataset.addColumn("alias","标识","string");
		col1.setVisible(false);
		
		col1 = dataset.addColumn("label","名称","string");
		col1.setLength(170);
		col1.setSearchField(true);		
		col1.setSort(true);		
		col1.setDisenableFilterCondition("selected==true");
		col1.setImage("relation.gif");
		
		col1 = dataset.addColumn("name","标识","string");
		col1.setSearchField(true);
		col1.setSort(true);
		col1.setLength(120);
		
		Map map = this.getDefaultRuleActions();
		Iterator it = map.keySet().iterator();
		while(it.hasNext()){
			String name = (String)it.next();
			RuleActionItem item =(RuleActionItem) map.get(name);
			String label = item.getLabel();
			this.dataset.addRecord(new Object[]{name,label,name});
		}		
		return dataset;
	
	}
	
	public Map getDefaultRuleActions(){
		Map<String,RuleActionItem> map = new LinkedHashMap<String,RuleActionItem>();
		String itemName = "xui-insert";
		map.put(itemName, new RuleActionItem(itemName,"新建"));
		itemName = "xui-save"; 
		map.put(itemName, new RuleActionItem(itemName,"保存"));
		itemName = "xui-delete";
		map.put(itemName, new RuleActionItem(itemName,"删除"));
		itemName = "xui-refresh";
		map.put(itemName, new RuleActionItem(itemName,"刷新"));
		itemName = "xui-filter";
		map.put(itemName, new RuleActionItem(itemName,"过滤"));
		itemName = "xui-first-record"; 
		map.put(itemName, new RuleActionItem(itemName,"第一条"));
		itemName = "xui-pre-record";
		map.put(itemName, new RuleActionItem(itemName,"前一条"));
		itemName = "xui-next-record";
		map.put(itemName, new RuleActionItem(itemName,"下一条"));
		itemName = "xui-last-record" ;
		map.put(itemName, new RuleActionItem(itemName,"最后一条"));
		itemName = "xui-add-next-page";
		map.put(itemName, new RuleActionItem(itemName,"下一页"));
		itemName = "xui-all-page-data"; 
		map.put(itemName, new RuleActionItem(itemName,"所有页"));
		itemName = "xui-create-new-child-node"; 
		map.put(itemName,new RuleActionItem(itemName,"创建子节点"));
		itemName = "xui-create-new-brother-node";
		map.put(itemName, new RuleActionItem(itemName,"创建兄弟节点"));
		itemName = "xui-expand-this-node"; 
		map.put(itemName, new RuleActionItem(itemName,"展开该节点"));
		itemName = "xui-collapse-this-node";
		map.put(itemName, new RuleActionItem(itemName,"收缩该节点"));
		itemName = "xui-enter-parent";
		map.put(itemName, new RuleActionItem(itemName,"进入父节点"));		
		itemName = "xui-enter-child";
		map.put(itemName, new RuleActionItem(itemName,"进入子节点"));
		return map;
	}
}
