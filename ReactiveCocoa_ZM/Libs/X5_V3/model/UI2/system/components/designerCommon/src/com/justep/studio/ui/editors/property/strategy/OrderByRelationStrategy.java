package com.justep.studio.ui.editors.property.strategy;

import java.util.List;

import com.justep.studio.data.DataRecord;
import com.justep.studio.data.DataSet;
import com.justep.studio.ui.editors.xui.IPropertyValueStrategy;

public class OrderByRelationStrategy implements IPropertyValueStrategy {

	public String transformPropertyValue(DataSet dataset) {
		List<DataRecord> rcList = dataset.getSelectedRecord();
		if(rcList.size()>0){
			String alias = rcList.get(0).getString("alias");
			return new StringBuilder().append(alias).append(":").append("desc").toString();
		}
		return "";
	}

}
