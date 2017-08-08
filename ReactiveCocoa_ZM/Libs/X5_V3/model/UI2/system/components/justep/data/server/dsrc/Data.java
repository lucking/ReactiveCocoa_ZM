import java.util.List;
import java.util.Map;

import org.dom4j.Element;
import org.dom4j.QName;

import com.alibaba.fastjson.JSONObject;
import com.justep.design.model.kql.QRelation;
import com.justep.ui.component.ComponentContext;
import com.justep.ui.component.ComponentTemplate;
import com.justep.ui.system.SystemComponentException;
import com.justep.ui.system.UISystemMessages;
import com.justep.ui.system.component.data.DataUtils;
import com.justep.ui2.system.component.data.BaseDataDef;
import com.justep.ui2.system.component.data.BaseDataUtils;
import com.justep.ui2.system.component.data.DataDef;



public class Data implements ComponentTemplate {
	public static final String DATA_URL = "$UI/system/components/justep/data/data";
	protected Element eDataDef;
	protected Map<String, Object> context;
	protected BaseDataDef dataDef;
	protected String xid;

	@SuppressWarnings("unchecked")
	public void execute(Element bound, Map<String, String> dataItems, Map<String, Object> props, Map<String, String> events,
			Map<String, Object> context) {
		bound.addAttribute(new QName("__delete_node__"), "true");

		this.eDataDef = bound;
		this.xid = eDataDef.attributeValue("xid");
		this.context = context;

		createDataDef();
		List<String> init = (List<String>) context.get(ComponentContext.INIT);
		String js = processData();
		init.add(js);

		this.context.put("data." + xid, dataDef);
	}

	protected void createDataDef() {
		try {
			this.dataDef = new DataDef(eDataDef, context);
		} catch (Exception e) {
			throw SystemComponentException.create(e, UISystemMessages.XBL_DATA_DEFINE_ERROR, xid, e.getMessage());
		}
	}

	protected String getURl() {
		return DATA_URL;
	}

	protected String getDataClassName() {
		return "__Data__";
	}

	protected String processData() {
		JSONObject cfg = processDataConfig();
		String require = "";
		String DataUrl = getURl();
		if(!this.context.containsKey(DataUrl)){
			this.context.put(DataUrl, DataUrl);
			require = "var "+getDataClassName()+" = require(\""+DataUrl+"\");";
		}
		return require + "new "+getDataClassName()+"(this," + cfg.toJSONString() + ");";
	}

	/**
	 * 进行定义信息处理
	 * definition格式：
	 * {'queryAction' : "**QueryAction",
	 *  'newAction' : "**CreateAction",
	 *  saveAction  : "**SaveAction",
	 *  dataModel : "...",
	 *  concept : "{'sa_org概念名' : 'p 概念别名',...}",
	 *  idColumn : "'列名，也就是列别名'",
	 *  limit : 20,
	 *  directDelete : true,
	 *  confirmDelete : false,
	 *  confirmDeleteText : "",
	 *  confirmRefresh : false,
	 *  confirmRefreshText : "",
	 *  offset : 0,
	 *  updateMode : "whereVersion",
	 *  orderBys : "{'relation':0,'relation':1}",
	 *  filters : "{'filterID':filter,...}",
	 *  defaultValues : "{'relation别名' : '默认值',...}",
	 *  defCols : "{'relation 别名':{'type 类型':'String','relation 名':'p.sName','label':'','define':'ksql中的define'}}",
	 *  defAggCols : {}
	 *  master : "{'id':'data id','relation':'relation name'}"
	 *  treeOption : "{'isDelayLoad':true,'parentRelation':'父子关联的relation','virtualRootLabel':'','rootFilter':'','nodeKindRelation':'','nodeLevelRelation':''}"
	 * }
	 */
	protected JSONObject processDataConfig() {
		JSONObject cfg = new JSONObject();
		cfg.put("xid", this.xid);
		cfg.put("readonly", getReadonlyDef());
		cfg.put("defCols", getColDef());

		cfg.put("idColumn", getIdColumn());
		cfg.put("limit", -1);//普通data没有提供limiit设置
		//cfg.put("offset", bizDataDef.getOffset());

		cfg.put("directDelete", dataDef.isDirectDelete());

		cfg.put("confirmDelete", dataDef.isDeleteConfirm());
		cfg.put("confirmDeleteText", dataDef.getDeleteConfirmText());
		cfg.put("confirmRefresh", dataDef.isRefreshConfirm());
		cfg.put("confirmRefreshText", dataDef.getRefreshConfirmText());

		cfg.put("orderBys", getOrderByDef());
		cfg.put("filters", getFiltersDef());
		cfg.put("master", getMasterDataDef());
		if (dataDef.isTree())
			cfg.put("treeOption", getTreeDef());
		cfg.put("defaultValues", getDefaultValueDef());
		cfg.put("autoLoad", dataDef.isAutoLoad());
		if (!dataDef.isAutoLoad())
			cfg.put("autoNew", dataDef.isAutoNew());
		cfg.put("events", dataDef.getEvents());
		cfg.put("initData", getInitData());

		return cfg;
	}

	protected Object getInitData(){
		Element eData = eDataDef.element("data");
		if(null!=eData){
			return eData.getTextTrim();
		}else return null;
	}
	
	protected String getIdColumn() {
		return eDataDef.attributeValue("idColumn");
	}

	@SuppressWarnings("unchecked")
	protected JSONObject getColDef() {
		JSONObject def = new JSONObject();
		List<Element> relations = eDataDef.elements("column");
		if (null != relations && !relations.isEmpty()) {
			for (Element relation : relations) {
				String colName = relation.attributeValue("name");
				String type = relation.attributeValue("type");
				String label = relation.attributeValue("label");

				JSONObject relationDef = new JSONObject();
				relationDef.put("type", type);
				relationDef.put("relation", colName);
				relationDef.put("define", colName);
				relationDef.put("label", label);
				relationDef.put("name", colName);
				relationDef.put("rules", getRuleDef(colName));
				def.put(colName, relationDef);
			}
		}

		return def;
	}

	protected Object getReadonlyDef() {
		return getReadonlyDef(null);
	}

	//有名空间问题，所以xpath使用下面方式
	protected Object getReadonlyDef(String relation) {
		if (null != relation && !"".equals(relation))
			relation = "*[local-name()='col' and @name='" + relation + "']/";
		else
			relation = "";
		Element eRule = (Element) eDataDef.selectSingleNode("./*[local-name()='rule']/" + relation
				+ "*[local-name()='readonly']/*[local-name()='expr']");
		if (null != eRule) {
			String v = eRule.getTextTrim();
			return "".equals(v) ? null : v;
		}
		return null;
	}

	protected Object getCalculateDef(String relation) {
		if (null != relation && !"".equals(relation))
			relation = "*[local-name()='col' and @name='" + relation + "']/";
		else
			relation = "";
		Element eClac = (Element) eDataDef.selectSingleNode("./*[local-name()='rule']/" + relation
				+ "*[local-name()='calculate']/*[local-name()='expr']");
		if (null != eClac) {
			String v = eClac.getTextTrim();
			return "".equals(v) ? null : v;
		}
		return null;
	}

	//获取有表达式一类的规则定义
	protected Object _getRuleExprDef(String relation, String ruleName) {
		if (null != relation && !"".equals(relation))
			relation = "*[local-name()='col' and @name='" + relation + "']/";
		else
			relation = "";
		Element eDef = (Element) eDataDef.selectSingleNode("./*[local-name()='rule']/" + relation + "*[local-name()='"+ruleName+"']");
		if (null != eDef) {
			Element eExpr = eDef.element(BaseDataDef.EXPR_QNAME);
			if (null != eExpr) {
				String v = eExpr.getTextTrim();
				if (!"".equals(v)) {
					JSONObject def = new JSONObject();
					JSONObject param = new JSONObject();
					def.put("params", param);
					param.put("expr", v);
					Element eMessage = eDef.element(BaseDataDef.MESSAGE_QNAME);
					if (null != eMessage) {
						String msg = eMessage.getTextTrim();
						if (!"".equals(msg)) {
							def.put("message", msg);
						}
					}
					return def;
				}
			}
		}
		return null;
	}

	/*
	xml:
	<constraint><expr></expr><message></message></constraint>
	js:
	constraint:{
		params:{
			expr : "js:$val.indexOf(val('fInteger'))>-1"
		},
	    message:'通用规则，必须包含fInteger'
	}
	*/
	protected Object getConstraintDef(String relation) {
		return _getRuleExprDef(relation, "constraint");
	}

	/*
	xml:
	<required><expr></expr><message></message></required>
	js:
	required:{
		params:{
			expr : "js:$val.indexOf(val('fInteger'))>-1"
		},
	    message:'通用规则，必须包含fInteger'
	}
	*/
	protected Object getRequiredDef(String relation) {
		return _getRuleExprDef(relation, "required");
	}

	protected void processRules(JSONObject def, String relation){
		List<Element> eRules = dataDef.getRuleDefList(relation);
		if (null != eRules) {
			for(Element eRule : eRules){
				String name = eRule.getName();
				//忽略处理required,calculate,readonly,constraint的规则
				if("required".equals(name) || "calculate".equals(name) || "readonly".equals(name) || "constraint".equals(name)) continue;
				JSONObject ruleDef = new JSONObject();
				Element ele = eRule.element(BaseDataDef.PARAM_QNAME);
				if(null!=ele){
					String v = ele.getTextTrim();
					if(!"".equals(v)){
						ruleDef.put("params", v);
						ele = eRule.element(BaseDataDef.MESSAGE_QNAME);				
						if(null!=ele){
							String msg = ele.getTextTrim();
							ruleDef.put("message", msg);
						}
					}
				}
				def.put(name, ruleDef);
			}
		}
	}
	
	protected void processDataTypeRule(JSONObject def, String relation){
		String dataType = "String";
		QRelation r = dataDef.getRelationRef(relation);
		if(null!=r) dataType = r.getDataType();
		if("integer".equalsIgnoreCase(dataType) || "long".equalsIgnoreCase(dataType))
			def.put("integer", true);
		else if("float".equalsIgnoreCase(dataType) 
				|| "Double".equalsIgnoreCase(dataType) 
				|| "Decimal".equalsIgnoreCase(dataType))
			def.put("number", true);
		else if("datetime".equalsIgnoreCase(dataType) 
				|| "date".equalsIgnoreCase(dataType) 
				|| "time".equalsIgnoreCase(dataType))
			def.put(dataType.toLowerCase(), true);
	}
	
	protected Object getRuleDef(String relation) {
		JSONObject def = new JSONObject();
		Object v = getCalculateDef(relation);
		if(null!=v)def.put("calculate", v);
		v = getReadonlyDef(relation);
		if(null!=v)def.put("readonly", v);
		v = getConstraintDef(relation);
		if(null!=v)def.put("constraint", v);
		v = getRequiredDef(relation);
		if(null!=v)def.put("required", v);
		processDataTypeRule(def, relation);//处理数据类型的规则
		processRules(def, relation);//处理除required,calculate,readonly,constraint的规则
		return def.size()>0?def:null;
	}

	protected JSONObject getOrderByDef() {
		return null;
	}

	protected JSONObject getFiltersDef() {
		return null;
	}

	protected JSONObject getTreeDef() {
		////treeOption : "{'isDelayLoad':true,'parentRelation':'父子关联的relation','virtualRootLabel':'','rootFilter':'','nodeKindRelation':'','nodeLevelRelation':''}"
		if (BaseDataUtils.isTreeData(eDataDef)) {
			JSONObject def = new JSONObject();

			String rootFilter = BaseDataUtils.getTreeRootFilter(eDataDef);
			String parentPath = BaseDataUtils.getParentPath(eDataDef);
			String childrenPath = BaseDataUtils.getChildrenPath(eDataDef);
			String nodeKindPath = BaseDataUtils.getNodeKindPath(eDataDef);
			String nodeLevelPath = BaseDataUtils.getNodeLevelPath(eDataDef);
			String virtualRootLabel = BaseDataUtils.getVirtualRootLabel(eDataDef);
			boolean useVirtualRoot = BaseDataUtils.useVirtualRoot(eDataDef);

			def.put("isDelayLoad", BaseDataUtils.isDelayLoad(eDataDef));
			if (!BaseDataUtils.isStringEmpty(parentPath))
				def.put("parentRelation", parentPath);
			if (!BaseDataUtils.isStringEmpty(childrenPath))
				def.put("childrenRelation", childrenPath);
			if (!BaseDataUtils.isStringEmpty(rootFilter))
				def.put("rootFilter", rootFilter);
			if (!BaseDataUtils.isStringEmpty(nodeKindPath))
				def.put("nodeKindRelation", nodeKindPath);
			if (!BaseDataUtils.isStringEmpty(nodeLevelPath))
				def.put("nodeLevelRelation", nodeLevelPath);
			if(useVirtualRoot){
				def.put("useVirtualRoot", useVirtualRoot);
				if (!BaseDataUtils.isStringEmpty(virtualRootLabel))
					def.put("virtualRootLabel", virtualRootLabel);
			}
			return def;
		} else
			return null;
	}

	protected JSONObject getMasterDataDef() {
		//master:{xid:'mainData', relation:'SA_Task'}
		Element masterDefE = dataDef.getMasterDef();
		if (null != masterDefE) {
			String data = masterDefE.attributeValue("data");
			String relation = masterDefE.attributeValue("relation");
			if (DataUtils.isStringEmpty(data) || DataUtils.isStringEmpty(relation))
				return null;
			else{
				JSONObject def = new JSONObject();
				def.put("xid", data);
				def.put("relation", relation);
				return def;
			}
		} else
			return null;
	}

	protected JSONObject getDefaultValueDef() {
		//{'relation别名' : '默认值',...}
		/*
		String result = "";
		for (Iterator<String> iter = this.relationDefaultValues.keySet().iterator(); iter.hasNext();) {
			String str = iter.next();
			String value = this.relationDefaultValues.get(str);
			if (!DataUtils.isStringEmpty(value)) {
				value = value.replaceAll("'", "\\\\\\\\'").replaceAll("\"", "\\\\\"");
			} else
				value = "";
			result += (!"".equals(result) ? "," : "") + "'" + str + "':'" + value + "'";
		}
		return DataUtils.isStringEmpty(result) ? null : "{" + result + "}";
		*/
		return null;
	}
}
