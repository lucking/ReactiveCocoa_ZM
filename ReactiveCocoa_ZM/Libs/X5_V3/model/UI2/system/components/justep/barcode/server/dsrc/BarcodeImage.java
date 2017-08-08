import java.util.Map;

import org.dom4j.Element;

import com.alibaba.fastjson.JSONObject;
import com.justep.ui.component.ComponentTemplate;
import com.justep.ui.system.component.common.ComponentUtils;

public class BarcodeImage implements ComponentTemplate {
	private Element eInputDef;
	private String dataXID;
	private String relation;

	public void execute(Element bound, Map<String, String> dataItems, Map<String, Object> props, Map<String, String> events, Map<String, Object> context) {
		this.eInputDef = bound;
		if (ComponentUtils.hasBindRef(eInputDef)) {
			dataXID = eInputDef.attributeValue("data");
			relation = ComponentUtils.getRelation(eInputDef.attributeValue("bind-ref"), eInputDef.attributeValue("xid"));
		}
		JSONObject cfg = processInputConfig();
		eInputDef.addAttribute("config", cfg.toJSONString());
		Element img = bound.addElement("img");
		img.addAttribute("id", "img-" + eInputDef.attributeValue("xid"));
		img.addAttribute("src", "about:blank");
		img.addAttribute("style", "vertical-align:middle;");
		ComponentUtils.processBindRef(bound, dataItems);
	}

	private JSONObject processInputConfig() {
		JSONObject cfg = new JSONObject();
		if (ComponentUtils.hasBindRef(eInputDef)) {
			cfg.put("data", dataXID);
			cfg.put("relation", relation);
		}
		cfg.put("type", eInputDef.attributeValue("type"));
		cfg.put("barcodeConfig", eInputDef.attributeValue("barcodeConfig"));
		cfg.put("stretch", eInputDef.attributeValue("stretch"));
		return cfg;
	}
}
