import java.util.Map;

import org.dom4j.Element;

import com.justep.ui.component.ComponentTemplate;


public class Wing implements ComponentTemplate {

	private Element eDef;
	
	public void execute(Element bound, Map<String, String> dataItems, Map<String, Object> props, Map<String, String> events,
			Map<String, Object> context) {
		this.eDef = bound;
		
		Element top = (Element) eDef.selectSingleNode("*[contains(@class, 'x-wing-left')]");
		if(top != null)
			top.addAttribute("component", "$model/UI2/system/components/justep/wing/child");

		Element bottom = (Element) eDef.selectSingleNode("*[contains(@class, 'x-wing-right')]");
		if(bottom != null)
			bottom.addAttribute("component", "$model/UI2/system/components/justep/wing/child");

		Element content = (Element) eDef.selectSingleNode("*[contains(@class, 'x-wing-content')]");
		if(content != null)
			content.addAttribute("component", "$model/UI2/system/components/justep/wing/child");
	}
	
}
