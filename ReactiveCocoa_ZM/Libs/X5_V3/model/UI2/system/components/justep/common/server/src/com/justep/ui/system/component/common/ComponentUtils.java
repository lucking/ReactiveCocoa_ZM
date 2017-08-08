package com.justep.ui.system.component.common;

import java.util.Map;

import org.dom4j.Element;

import com.justep.ui.system.SystemComponentException;
import com.justep.ui.system.UISystemMessages;

public class ComponentUtils {
	public static String getRelation(String bindRef, String XID){
		int ib = bindRef.indexOf("ref(");
		if(ib<0) throw SystemComponentException.create(UISystemMessages.BIND_REF_ERROR, XID, bindRef);
		int ie = bindRef.indexOf(")", ib);
		if(ie<0) throw SystemComponentException.create(UISystemMessages.BIND_REF_ERROR, XID, bindRef);
		return bindRef.substring(ib+5, ie-1);
	}
	
	public static boolean hasBindRef(Element bound){
		String bindRef = bound.attributeValue("bind-ref");
		return null!=bindRef && !"".equals(bindRef);
	}
	
	public static void processBindRef(Element bound, Map<String, String> dataItems){
		if (hasBindRef(bound))
			dataItems.put("ref", bound.attributeValue("bind-ref"));
	}
}
