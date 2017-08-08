import java.util.Map;

import org.dom4j.Element;

import com.justep.ui.component.ComponentTemplate;


public class WindowContainer implements ComponentTemplate{
	public static final String SRC = "src";
	public static final String PROCESS = "process";
	public static final String ACTIVITY = "activity";
	
	public void execute(Element bound, Map<String, String> dataItems, Map<String, Object> props, Map<String, String> events,
			Map<String, Object> context) {
		bound.addAttribute("__component-context__", "block");
	}
}
