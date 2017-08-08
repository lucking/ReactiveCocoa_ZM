package com.justep.system.component;

import java.util.Map;
import java.util.UUID;

import org.dom4j.Element;

import com.justep.ui.component.ComponentTemplate;

public class List implements ComponentTemplate{
	protected Element eDef;
	//private Map<String, Object> context;
	protected String foreachFuncName;
	protected String foreachAfterRenderFuncName;

	public void execute(Element bound, Map<String, String> dataItems, Map<String, Object> props, Map<String, String> events,
			Map<String, Object> context) {
		eDef = bound;
		//this.context = context;
		String xid = eDef.attributeValue("xid");
		if(null==xid || "".equals(xid)){
			xid = UUID.randomUUID().toString().toUpperCase().replaceAll("-", "");
			eDef.addAttribute("xid", xid);
		}
		foreachFuncName = "$model.foreach_"+xid;
		foreachAfterRenderFuncName = "$model.foreach_afterRender_"+xid;
		
		processElement();
	}

	protected String getForeachFuncName() {
		return foreachFuncName+"($element)";
	}
	
	protected String getForeachAfterRenderFuncName() {
		return foreachAfterRenderFuncName+".bind($model,$element)";
	}
	
	protected Element getTemplate(){
		return (Element)eDef.selectSingleNode(".//*[contains(@class,'x-list-template')]");
	}
	
	protected void processElement(){
		Element eT = getTemplate();
		
		if(null!=eT){
			addClass(eT, "hide");
			String data = eDef.attributeValue("data");
			if(null!=data && !"".equals(data)){
				eT.addAttribute("bind-foreach", "{data:"+getForeachFuncName()+",afterRender:"+getForeachAfterRenderFuncName()+"}");				
			}
		}
	}
	
	protected void addClass(Element ele, String sClass){
		if(null!=ele){
			String clz = ele.attributeValue("class");
			if(null!=clz && !"".equals(clz))
				ele.addAttribute("class", clz+" "+sClass);
			else ele.addAttribute("class", sClass);
		}
	}
}