import org.dom4j.Element;
import org.dom4j.QName;

import com.alibaba.fastjson.JSONObject;
import com.justep.ui.xml.XMLConstants;

public class Toggle extends Radio {

	public String getFlag(){
		String ret = eButtonDef.attributeValue("type");
		if(null==ret || "".equals(ret)) ret = "checkbox";
		return ret;
	}
	
	public void processInput(Element eInput){
		super.processInput(eInput);
	}
	
	public void processLabel(Element eLabel){
		eLabel.addElement(new QName("span", XMLConstants.XHTML_NAMESPACE));
		String ONLabel = eButtonDef.attributeValue("ON");
		if(null==ONLabel || "".equals(ONLabel)) ONLabel = "ON";
		eLabel.addAttribute("data-on", ONLabel);		
		String OFFLabel = eButtonDef.attributeValue("OFF");
		if(null==OFFLabel || "".equals(OFFLabel)) OFFLabel = "OFF";
		eLabel.addAttribute("data-off", OFFLabel);		
	}
	
	protected JSONObject processConfig(){
		JSONObject cfg = super.processConfig();
		cfg.put("disabled", "true".equalsIgnoreCase(eButtonDef.attributeValue("disabled")));
		String ONLabel = eButtonDef.attributeValue("ON");
		if(null==ONLabel || "".equals(ONLabel)) ONLabel = "ON";
		String OFFLabel = eButtonDef.attributeValue("OFF");
		if(null==OFFLabel || "".equals(OFFLabel)) OFFLabel = "OFF";
		JSONObject label = new JSONObject();
		label.put("on", ONLabel);
		label.put("off", OFFLabel);
		cfg.put("label", label);
		return cfg;
	}
	
}
