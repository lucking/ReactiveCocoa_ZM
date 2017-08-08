import java.util.List;

import org.dom4j.Element;

import com.justep.studio.ui.editors.xui.BaseComponent;
import com.justep.studio.ui.editors.xui.XuiElement;


public class Operation extends BaseComponent {
	public String getPropDefalutValue(String propName) {
		XuiElement operation = getXuiElement();
		
		if(operation!=null){
			String opName = operation.getProperyValue("name");
			XuiElement parent = operation.getParentElement().getParentElement();
			Element operations = parent.getConfigElement().element("operations");
			if (operations != null) {
				@SuppressWarnings("unchecked")
				List<Element> ops = operations.elements("operation");
				for (Element op : ops) {
					if(opName.equals(op.attributeValue("name"))){
						String value =  op.attributeValue(propName);
						if(value==null)
							value="";
						return value;
						
					}
				}
			}
		}
		return "";
	}
}


