package com.justep.studio.ui.editors.property.org;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import com.justep.design.model.MDocument;
import com.justep.design.model.ModelParser;
import com.justep.design.model.element.Config;
import com.justep.design.model.element.Item;
import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.util.StudioConfig;

public class OrgKinds {
	public List<String[]> getOrgKindsList(PropertyItem propertyItem) {
		List<String[]> orgKinds = new ArrayList<String[]>(); 
		MDocument doc = ModelParser.parseFile(StudioConfig.getBIZPath() + "/system/config/opm.config.m");
		Config config = null;
		for (Config c : doc.getConfigList()) {
			if ("orgKind".equals(c.getName())) {
				config = c;
				break;
			}
		}

		if (config == null) {
			orgKinds.add("ogn,机构".split(","));
			orgKinds.add("dpt,部门".split(","));
			orgKinds.add("pos,岗位".split(","));
			orgKinds.add("psm,人员".split(","));
		} else {
			List<Item> items = config.getItemList();
			Collections.sort(items, new ConfigItemComparator());
			for (Item item : items) {
				String[] orgKind = new String[2];
				orgKind[0] = item.getName();
				orgKind[1] = item.getLocalLabelText();
				orgKinds.add(orgKind);
			}
		}
		return orgKinds;
	}
	
	private Item findItemByName(List<Item> items, String name) {
		for (Item item : items) {
			if (name.equals(item.getName())) {
				return item;
			}
		}
		return null;
	}
	private String getItemSequence(Item item) {
		Item sequenceItem = findItemByName(item.getItemList(), "sequence");
		return (sequenceItem == null) ? null : sequenceItem.getValue(); 
	}

	
	private boolean isEmptyString(String s) {
		return s == null || "".equals(s.trim());
	}
	
	private class ConfigItemComparator implements Comparator<Item> {
		public int compare(Item arg0, Item arg1) {
			String sequence0 = (String) getItemSequence(arg0);
			String sequence1 = (String) getItemSequence(arg1);
			return isEmptyString(sequence0) ? 1 : (isEmptyString(sequence1) ? -1 : sequence0.compareTo(sequence1));
		}
	}
	
}
