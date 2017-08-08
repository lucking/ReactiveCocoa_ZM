package com.justep.studio.ui.editors.xui.component;

public class RuleActionItem {

	private String name;
	private String label;
	public RuleActionItem(String name,String label){
		this.name = name;
		this.label = label;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
}
