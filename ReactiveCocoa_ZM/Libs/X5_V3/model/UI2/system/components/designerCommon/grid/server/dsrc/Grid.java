import java.util.Iterator;
import java.util.Map;

import org.dom4j.Element;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.justep.design.model.kql.QRelation;
import com.justep.ui.component.ComponentTemplate;
import com.justep.ui2.system.component.data.BaseDataDef;
import com.justep.ui2.system.component.data.BaseDataUtils;



public class Grid implements ComponentTemplate {
	private Element eGridDef;
	private Map<String, Object> context;
	private String dataXID;
	private BaseDataDef dataDef;
	private Map<String, String> events;

	public void execute(Element bound, Map<String, String> dataItems, Map<String, Object> props, Map<String, String> events,
			Map<String, Object> context) {
		this.eGridDef = bound;
		this.context = context;
		this.events = events;
		dataXID = eGridDef.attributeValue("data");
		dataDef = getDataDef();
		
		//生成grid的配置
		JSONObject cfg = processGridConfig();
		bound.addAttribute("config", cfg.toJSONString());
	}

	private JSONObject processGridConfig(){
		JSONObject cfg = new JSONObject();
		cfg.put("dataXID", dataXID);
		if("true".equalsIgnoreCase(eGridDef.attributeValue("autoHeight")))
			cfg.put("autoheight", true);
		if("true".equalsIgnoreCase(eGridDef.attributeValue("autoWidth")))
			cfg.put("autowidth", true);
		if("true".equalsIgnoreCase(eGridDef.attributeValue("sortable")))
			cfg.put("sortable", true);
		if("true".equalsIgnoreCase(eGridDef.attributeValue("groupable")))
			cfg.put("groupable", true);
		String selectionmode = eGridDef.attributeValue("selectionMode");
        if(null==selectionmode || "".equals(selectionmode))selectionmode = "singlerow";
		cfg.put("selectionmode", selectionmode);
        
		cfg.put("editable", !"false".equalsIgnoreCase(eGridDef.attributeValue("editable")));
		cfg.put("altrows", true);
		cfg.put("enabletooltips", true);
		
		String w = eGridDef.attributeValue("width");
		if(null!=w && !"".equals(w))
			cfg.put("width", Integer.parseInt(w));
		String h = eGridDef.attributeValue("height");
		if(null!=h && !"".equals(h))
			cfg.put("height", Integer.parseInt(h));

		String editMode = eGridDef.attributeValue("editMode");
		if(null!=editMode && !"".equals(editMode))
			cfg.put("editmode", editMode);
		
		cfg.put("columns", processColumnsConfig());
		return cfg;
	}
	
	private JSONArray processColumnsConfig(){
		JSONArray cfg = new JSONArray();
		@SuppressWarnings("rawtypes")
		Iterator colIt = eGridDef.elementIterator("column");
		while(colIt.hasNext()){
			Element col = (Element)colIt.next();
			cfg.add(processColumnConfig(col));
			eGridDef.remove(col);
		}
		return cfg;
	}
	
	private JSONObject processColumnConfig(Element col){
		JSONObject cfg = new JSONObject();
		String ref = col.attributeValue("ref");
		cfg.put("dataField", ref);
		String label = col.attributeValue("label");
		if(null==label || "".equals(label)){
			QRelation r = dataDef.getRelationRef(ref);
			if(null!=r) label = r.getLabel();
		}			
		cfg.put("text", label);
		String w = col.attributeValue("width");
		if(null!=w && !"".equals(w))
			cfg.put("width", Integer.parseInt(w));
		String align = col.attributeValue("align");
		cfg.put("cellsalign", align);
		String type = col.attributeValue("type");
		if(null==type || "".equals(type)) type = "textbox";
		cfg.put("columntype", type);
		
		String onCreateEditor = col.attributeValue("onCreateEditor");
		if(null!=onCreateEditor && !"".equals(onCreateEditor)) this.events.put("onCreateEditor_"+ref, onCreateEditor);
		String onValueChanging = col.attributeValue("onValueChanging");
		if(null!=onValueChanging && !"".equals(onValueChanging)) this.events.put("onCellValueChanging_"+ref, onValueChanging);
		return cfg;
	}
	
	private BaseDataDef getDataDef(){
		return BaseDataUtils.getDataDef(dataXID, context);
	}
}
