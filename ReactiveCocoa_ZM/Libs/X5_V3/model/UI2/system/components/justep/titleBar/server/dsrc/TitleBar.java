import java.util.Map;

import org.dom4j.Element;

import java.util.List;

import com.justep.ui.component.ComponentTemplate;


public class TitleBar implements ComponentTemplate {

	private Element eDef;
	
	public void execute(Element bound, Map<String, String> dataItems, Map<String, Object> props, Map<String, String> events,
			Map<String, Object> context) {
		this.eDef = bound;
		
		Element right = (Element) eDef.selectSingleNode("*[contains(@class, 'reverse')]");
		if(right != null){
			@SuppressWarnings("unchecked")
			List<Element> children = (List<Element>)right.elements();
			right.clearContent();
			
			Element empty = right.addElement("div");
			empty.addAttribute("class", "empty");
			
			for(int i = children.size()-1;i>=0;i--){
				right.add(children.get(i));
			}
			
			String cls = right.attributeValue("class");
			cls = cls.replaceFirst("reverse", "");
			right.attribute("class").setValue(cls);
		}
	}
	
}
