package com.justep.studio.ui.editors.property.strategy;

import java.util.List;

import com.justep.studio.data.DataRecord;
import com.justep.studio.data.DataSet;
import com.justep.studio.ui.editors.xui.IPropertyValueStrategy;

public class RelationStrategy implements IPropertyValueStrategy {

	public String transformPropertyValue(DataSet dataset) {		
		StringBuilder sb = new StringBuilder();
		if(dataset==null)
			return sb.toString();
		List<DataRecord> returnData = dataset.getSelectedRecord();		
		for(int i=0;i<returnData.size();i++){
			DataRecord r = (DataRecord)returnData.get(i);
			String alias = r.getString("alias");
			if(i==0){
				sb.append(alias);
			}else{
				sb.append(",");
				sb.append(alias);
			}
		}
		return sb.toString();
	}

}
