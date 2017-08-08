import java.util.Map;
import java.util.UUID;

import org.dom4j.Element;
import org.dom4j.QName;

import com.justep.ui.component.ComponentTemplate;
import com.justep.ui.xml.XMLConstants;
import com.justep.ui2.system.component.data.BaseDataDef;


public class RadioGroup implements ComponentTemplate {
	protected Element eDef;
	
	public void execute(Element bound, Map<String, String> dataItems, Map<String, Object> props, Map<String, String> events,
			Map<String, Object> context) {
		eDef = bound;

		//没有xid产生一个
		String xid = eDef.attributeValue("xid");
		if(null==xid || "".equals(xid)){
			xid = UUID.randomUUID().toString().toUpperCase().replaceAll("-", "");
			eDef.addAttribute("xid", xid);
		}
		String itemset = bound.attributeValue("bind-itemset");
		if(null!=itemset && !"".equals(itemset)){
			//支持data的特殊处理，支持直接写data的xid
			String str = itemset.replaceAll("\\$model.", "").replaceAll("\\$parent.", "");
			Object dataDef = context.get("data." + str);
			if(dataDef instanceof BaseDataDef) itemset = itemset+".datas";
			String foreachAfterRenderFuncName = "$model.comp($element)['_doUpdate'].bind($model.comp($element))";
			bound.addAttribute("bind-foreach", "{data:"+itemset+",afterRender:"+foreachAfterRenderFuncName+"}");
			eDef.remove(eDef.attribute("bind-itemset"));
		}
		
		Element radioButton = bound.addElement(new QName("span", XMLConstants.XHTML_NAMESPACE));
		processButton(radioButton);
	}

	protected String getButtonUrl(){
		return "$UI/system/components/justep/button/radio";
	}
	
	protected String getButtonClass(){
		return "x-radio";
	}

	protected void processButton(Element button){
		button.addAttribute("component", getButtonUrl());
		//String name = eDef.attributeValue("name");
		//没有name产生一个,不能生成，在foreach中有问题
		//if(null==name || "".equals(name)) name = UUID.randomUUID().toString().toUpperCase().replaceAll("-", "");
		//button.addAttribute("name", name);
		button.addAttribute("class", getButtonClass());
		String itemsetValue = eDef.attributeValue("bind-itemsetValue");
		if(null!=itemsetValue && !"".equals(itemsetValue)){
			button.addAttribute("bind-value", itemsetValue);
			eDef.remove(eDef.attribute("bind-itemsetValue"));
		}
		String itemsetText = eDef.attributeValue("bind-itemsetLabel");
		if(null!=itemsetText && !"".equals(itemsetText)){
			button.addAttribute("bind-label", itemsetText);
			eDef.remove(eDef.attribute("bind-itemsetLabel"));
		}
	}
	
	protected void addClass(String clz){
		String c = eDef.attributeValue("class");
		if(null!=c && !"".equals(c)){
			c += (" " + clz);
			eDef.addAttribute("class", c);
		}else eDef.addAttribute("class", clz);
	}

}
