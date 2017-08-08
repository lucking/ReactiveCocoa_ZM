package com.justep.ui.system.component.common.nativeComponent;
import java.util.Map;

import org.dom4j.Element;

import com.alibaba.fastjson.JSONObject;
import com.justep.ui.component.ComponentTemplate;


public class NativeComponentTemplate implements ComponentTemplate{
	public static final String CONFIGATTRS = "configAttrs";
	
	public void execute(Element bound, Map<String, String> dataItems, Map<String, Object> props, Map<String, String> events,
			Map<String, Object> context) {
		JSONObject cfg = processConfig(bound);
		bound.addAttribute("data-config", cfg.toJSONString());
		
	}
	
	/**
	 * 把组件时的属性搬到config属性中,方便运行时读取
	*/
	private JSONObject processConfig(Element ele){
		JSONObject cfg = new JSONObject();
		String attrs = ele.attributeValue(CONFIGATTRS);
		
		if(attrs != null){
			ele.remove(ele.attribute(CONFIGATTRS));
			String[] attrArray =  attrs.split(",");
			for (String attr : attrArray) {
				String value = ele.attributeValue(attr);
				if(value !=null){
					cfg.put(attr, value);
					ele.remove(ele.attribute(attr));
				}
			}
		}
		return cfg;
	}
}
