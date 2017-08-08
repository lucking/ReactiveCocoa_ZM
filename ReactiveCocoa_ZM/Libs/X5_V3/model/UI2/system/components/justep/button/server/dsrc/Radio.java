import java.util.Map;

import org.dom4j.Attribute;
import org.dom4j.Element;
import org.dom4j.QName;

import com.alibaba.fastjson.JSONObject;
import com.justep.ui.component.ComponentTemplate;
import com.justep.ui.xml.XMLConstants;


public class Radio implements ComponentTemplate {

	protected Element eButtonDef;

	public String getFlag(){
		return "radio";
	}
	
	public void processInput(Element eInput){
	}
	
	public void processLabel(Element eLabel){
		String label = eButtonDef.attributeValue("label");
		if(null!=label && !"".equals(label)) eLabel.setText(label);
	}
	
	public void execute(Element bound, Map<String, String> dataItems, Map<String, Object> props, Map<String, String> events,
			Map<String, Object> context) {
		this.eButtonDef = bound;
		JSONObject cfg = processConfig();
		bound.addAttribute("data-config", cfg.toJSONString());
		
		Element eInput = eButtonDef.addElement(new QName("input", XMLConstants.XHTML_NAMESPACE));
		Attribute attr = bound.attribute("bind-checked");
		eInput.addAttribute("type", getFlag());
		if(null != attr){
			String s1 = attr.getValue();
			eInput.addAttribute("bind-checked", s1);
			bound.remove(attr);
		}
		String name = eButtonDef.attributeValue("name");
		if(null!=name && !"".equals(name)) eInput.addAttribute("name", name);
		String value = eButtonDef.attributeValue("value");
		if(null!=value && !"".equals(value)) eInput.addAttribute("value", value);
		processInput(eInput);
		Element eLabel = eButtonDef.addElement(new QName("label", XMLConstants.XHTML_NAMESPACE));
		processLabel(eLabel);
	}

	protected JSONObject processConfig(){
		JSONObject cfg = new JSONObject();
		cfg.put("label", eButtonDef.attributeValue("label"));
		cfg.put("name", eButtonDef.attributeValue("name"));
		cfg.put("value", eButtonDef.attributeValue("value"));
		cfg.put("checkedValue", eButtonDef.attributeValue("checkedValue"));
		cfg.put("checked", "true".equalsIgnoreCase(eButtonDef.attributeValue("checked")));
		cfg.put("disabled", "true".equalsIgnoreCase(eButtonDef.attributeValue("disabled")));
		
		return cfg;
	}
}
