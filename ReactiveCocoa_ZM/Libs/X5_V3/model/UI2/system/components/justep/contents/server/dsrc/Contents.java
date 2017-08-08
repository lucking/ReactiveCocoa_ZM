import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.dom4j.Element;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.justep.ui.component.ComponentTemplate;
import com.justep.ui.system.component.common.BaseContainer;


public class Contents extends BaseContainer implements ComponentTemplate {

	private Element eDef;
	
	public void execute(Element bound, Map<String, String> dataItems, Map<String, Object> props, Map<String, String> events,
			Map<String, Object> context) {
		this.eDef = bound;
		
		@SuppressWarnings("unchecked")
		List<Element> items = eDef.selectNodes("*");
		int active = 0;
		String activeValue = eDef.attributeValue("active");
		if(activeValue != null)
			active = Integer.parseInt(activeValue);
		int size = items.size();
		for(int i=0; i<size; i++){
			Element item = items.get(i);
			item.addAttribute("component", "$model/UI2/system/components/justep/contents/content");
			if(active == i)
				item.attribute("class").setValue(item.attributeValue("class") + " active");
		}	
		
	}
	
}
