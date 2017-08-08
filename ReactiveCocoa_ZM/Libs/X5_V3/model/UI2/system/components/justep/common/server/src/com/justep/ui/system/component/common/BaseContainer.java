package com.justep.ui.system.component.common;

import java.util.List;

import org.dom4j.Element;
import org.dom4j.Node;
import org.dom4j.tree.DefaultText;

import com.alibaba.fastjson.JSONObject;

public class BaseContainer{

	public boolean hasAttribute(Element el, String attr){
		if(el == null) return false;
		return el.attributeValue(attr) != null;
	}
	
	public String attributeValue(Element el, String attr){
		return attributeValue(el, attr, null);
	}
	
	public String attributeValue(Element el, String attr, String defaultValue){
		String value = el.attributeValue(attr);
		if(value == null && defaultValue != null)
			value = defaultValue;
		return value;
	}

	public int attributeIntValue(Element el, String attr){
		return attributeIntValue(el, attr, -1);
	}
	
	public int attributeIntValue(Element el, String attr, int defaultValue){
		String value = attributeValue(el, attr);
		if(value == null)
			return defaultValue;
		try{
			return Integer.parseInt(value);
		}catch(Exception e){
			return defaultValue;
		}
	}
	
	public boolean attributeBoolValue(Element el, String attr){
		return attributeBoolValue(el, attr, false);
	}
	
	public boolean attributeBoolValue(Element el, String attr, boolean defaultValue){
		String value = attributeValue(el, attr);
		if(value == null)
			return defaultValue;
		return value.equalsIgnoreCase("true");
	}
	
	public void copyAttribute(Element source, Element target, String attr){
		copyAttribute(source, target, attr, null);
	}
	public void copyAttribute(Element source, Element target, String attr, String defaultValue){
		String value = source.attributeValue(attr);
		value = value != null? value : defaultValue;
		if(value != null)
			target.addAttribute(attr, value);
	}
	
	public void cutContent(Element source, Element target){
		if(source == null) return;
		@SuppressWarnings("unchecked")
		List<Node> items = source.selectNodes("*");
		int length = items.size();
		for(int i=0; i<length; i++){
			Node child = items.get(i);
			if(child instanceof DefaultText){
				target.addText(child.getText());
			}else{
				source.remove(child);
				target.add(child);
			}
		}
	}
	
	public void appendClass(Element el, String value){
		if(value == null) return; 
		String old = el.attributeValue("class");
		if(old != null)
			value = old + " " + value;
		el.addAttribute("class", value);
	}
	
	public Element child(Element parent, String name){
		return (Element)parent.selectSingleNode("*[local-name()='" + name + "']");
	}

	public void putBool(JSONObject json, Element el, String attr){
		if(el!=null && hasAttribute(el, attr)){
			String value = el.attributeValue(attr);
			if(value.equalsIgnoreCase("true"))
				json.put(attr, true);
			else if(value.equalsIgnoreCase("false"))
				json.put(attr, false);
			else
				json.put(attr, value);
		}
	}	
	
	public void putInt(JSONObject json, Element el, String attr){
		if(el!=null && hasAttribute(el, attr)){
			int value = this.attributeIntValue(el, attr);
			json.put(attr, value);
		}
	}
	
	public void putValue(JSONObject json, Element el, String attr){
		if(el!=null && hasAttribute(el, attr)){
			String value = this.attributeValue(el, attr);
			json.put(attr, value);
		}
	}
}
