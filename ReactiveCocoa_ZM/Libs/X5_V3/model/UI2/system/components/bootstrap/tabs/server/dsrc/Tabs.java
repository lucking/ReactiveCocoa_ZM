import java.util.Map;

import org.dom4j.Element;

import com.justep.ui.component.ComponentTemplate;


public class Tabs implements ComponentTemplate{

	public void execute(Element bound, Map<String, String> dataItems, Map<String, Object> props, Map<String, String> events,
			Map<String, Object> context) {
		java.util.List<?> headers = bound.selectNodes("./*[local-name(.)='ul']/*[local-name(.)='li']");
		for (Object header : headers){
			((Element)header).addAttribute("component", "$UI/system/components/bootstrap/tabs/tab");
		}
	}

}
