package com.justep.studio.ui.editors.property.datasource;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.justep.design.model.Model;
import com.justep.design.model.element.Action;
import com.justep.design.model.element.BusinessActivity;
import com.justep.design.model.element.HasAction;
import com.justep.design.model.element.Process;
import com.justep.design.model.element.StaticActivity;
import com.justep.studio.data.DataRecord;
import com.justep.studio.data.DataSet;
import com.justep.studio.model.ModelManager;
import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.ui.editors.xui.XuiDataModel;
import com.justep.studio.ui.editors.xui.XuiDataSourceManager;
import com.justep.studio.ui.editors.xui.XuiElement;
import com.justep.studio.util.StudioConfig;

public class BizDataActionDatasource extends PropertyDatasource {

	public DataSet getDatasource(PropertyItem propertyItem) {
		XuiElement ownerE = (XuiElement) propertyItem.getOwerElement();
		XuiDataModel model = ownerE.getXuiDataModel();
		String modelName = model.getModuleName();
		DataSet ds = XuiDataSourceManager.getActionTreeDataSet(modelName);
		return ds;
	}

	public String getActivityNameByModel(XuiDataModel model) {
		String filePath = model.getFilePath();
		String fileName = filePath.substring(Math.max(filePath.lastIndexOf("/"), filePath.lastIndexOf("\\")) + 1);
		if (fileName.lastIndexOf(".") != -1) {
			fileName = fileName.substring(0, fileName.lastIndexOf("."));
		}
		return fileName;
	}

	public DataSet getHasActionDatasource(PropertyItem propertyItem) {
		XuiElement ownerE = (XuiElement) propertyItem.getOwerElement();
		XuiDataModel model = ownerE.getXuiDataModel();
		String modelName = model.getModuleName();
		Model mod = ModelManager.parseModel(StudioConfig.getBIZPath(), modelName);
		DataSet ds = XuiDataSourceManager.createTreeDataSet();
		ds.addColumn("hasAction", "false", "string").setVisible(false);

		String activityName = getActivityNameByModel(model);

		List<Process> processList = mod.getProcessList();
		HashMap<String, Object> hasMap = new HashMap<String, Object>();
		for (Process p : processList) {
			List<HasAction> has = p.getHasActionList();
			for (HasAction ha : has) {
				hasMap.put(ha.getAction(), ha);
			}
			{
				List<StaticActivity> activityList = p.getStaticActivityList();
				for (StaticActivity activity : activityList) {
					if (activityName.equals(activity.getName())) {
						List<HasAction> has1 = activity.getHasActionList();
						for (HasAction ha : has1) {
							hasMap.put(ha.getAction(), ha);
						}
					}
				}
			}
			{
				List<BusinessActivity> activityList = p.getBusinessActivityList();
				for (BusinessActivity activity : activityList) {
					if (activityName.equals(activity.getName())) {
						List<HasAction> has1 = activity.getHasActionList();
						for (HasAction ha : has1) {
							hasMap.put(ha.getAction(), ha);
						}
					}
				}
			}
		}

		List<Action> actionList = mod.getActionList();
		Map<String, List<String>> map = new LinkedHashMap<String, List<String>>();
		for (Action action : actionList) {
			if (action.isGlobal() || hasMap.containsKey(action.getName())) {
				String mdlName = action.getOwnerModelName();
				List<String> list = map.get(mdlName);
				if (list != null) {
					list.add(action.getName());
				} else {
					list = new ArrayList<String>();
					list.add(action.getName());
					map.put(mdlName, list);
				}
			}
		}
		Iterator<String> it = map.keySet().iterator();
		while (it.hasNext()) {
			String mdlName = (String) it.next();
			DataRecord mdlNode = ds.addRecord(new Object[] { "module", mdlName, mdlName, "true", "folder.gif" });
			List<String> atnList = map.get(mdlName);
			for (String atnName : atnList) {
				DataRecord atnNode = new DataRecord(new Object[] { "action", atnName, atnName }, mdlNode);
				atnNode.setValue("image", "relation.gif");
				if (hasMap.containsKey(atnName)) {
					atnNode.setValue("hasAction", "true");
				}
			}
		}

		return ds;
	}

}
