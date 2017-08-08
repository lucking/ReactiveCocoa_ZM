import java.util.Map;

import org.dom4j.Element;

import com.justep.ui.component.ComponentTemplate;


public class Panel implements ComponentTemplate {

	private Element eDef;
	
	public void execute(Element bound, Map<String, String> dataItems, Map<String, Object> props, Map<String, String> events,
			Map<String, Object> context) {
		this.eDef = bound;
		
		Element top = (Element) eDef.selectSingleNode("*[contains(@class, 'x-panel-top')]");
		if(top != null)
			top.addAttribute("component", "$model/UI2/system/components/justep/panel/child");

		Element bottom = (Element) eDef.selectSingleNode("*[contains(@class, 'x-panel-bottom')]");
		if(bottom != null)
			bottom.addAttribute("component", "$model/UI2/system/components/justep/panel/child");

		Element content = (Element) eDef.selectSingleNode("*[contains(@class, 'x-panel-content')]");
		if(content != null)
			content.addAttribute("component", "$model/UI2/system/components/justep/panel/child");
	}
	
}
