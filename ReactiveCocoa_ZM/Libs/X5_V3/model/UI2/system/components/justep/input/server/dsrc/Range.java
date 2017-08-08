import java.util.Map;

import org.dom4j.Element;

import com.justep.ui.component.ComponentTemplate;


public class Range  implements ComponentTemplate {
	private Element eInputDef;

	public void execute(Element bound, Map<String, String> dataItems, Map<String, Object> props, Map<String, String> events,
			Map<String, Object> context) {
		this.eInputDef = bound;
		eInputDef.addAttribute("type","range");
	}
}
