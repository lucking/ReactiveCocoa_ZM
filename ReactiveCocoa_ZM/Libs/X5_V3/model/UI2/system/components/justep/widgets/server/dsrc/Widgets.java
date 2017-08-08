import java.util.List;
import java.util.Map;

import org.dom4j.Element;

import com.justep.ui.component.ComponentTemplate;


public class Widgets implements ComponentTemplate {

	private Element eDef;
	
	public void execute(Element bound, Map<String, String> dataItems, Map<String, Object> props, Map<String, String> events,
			Map<String, Object> context) {
		this.eDef = bound;
		
		List<Element> columnList = eDef.selectNodes("*[contains(@class, 'x-column')]");
		for(Element column : columnList){
			column.addAttribute("component", "$model/UI2/system/components/justep/widgets/column");
			List<Element> widgetList = column.selectNodes("*[contains(@class, 'x-widget')]");
			for(Element widget : widgetList){
				widget.addAttribute("component", "$model/UI2/system/components/justep/widgets/widget");
			}
		}
	}
	
}
