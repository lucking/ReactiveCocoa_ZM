import com.justep.studio.ui.editors.xui.OperationComponent;


public class Data extends OperationComponent {
//	public Map<?,?> editColumn(XuiElement currentElement) {
//		Map<String,Object> paramMap = getEditColumnParam(currentElement);
//		
//		BaseWebDialog dlg = new BaseWebDialog(StudioPlugin2.getShell(), "http://localhost:8080/x5/UI2/system/components/data/designer/editColumn.w", paramMap);
//		if(dlg.open()==Dialog.OK){//处理规则
//			//获取旧的列定义
//			List<String> columnIDs = new ArrayList<String>();
//			List<XuiElement> columns = currentElement.getChildListByName("column");
//			for(XuiElement col : columns){
//				columnIDs.add(col.getDesignId());
//			}
//			UndoRedoManager undoRedoManager = currentElement.getXuiDataModel().getUndoRedoManager();
//			undoRedoManager.startBatch();
//			try{
//				//删除旧的列定义
//				undoRedoManager.deleteComponent(columnIDs, null);
//	
//				@SuppressWarnings("unchecked")
//				Map<String, Object> v = (Map<String, Object>)dlg.getReturnValue();
//				@SuppressWarnings("unchecked")
//				List<String> templates = (List<String>)v.get("def");
//				for(String t : templates){
//					Map<String,Object> initData = new HashMap<String,Object>();
//					initData.put("paintComponent", false);
//					initData.put("componentName", "column");
//					initData.put("templateContent", t);
//					initData.put("parentElementId", currentElement.getDesignId());
//					undoRedoManager.createComponent(initData);
//				}
//			}finally{
//				undoRedoManager.endBatch();
//			}
//		}
//		return null;
//	}
//	
//	public Map<String,Object> getEditColumnParam(XuiElement currentE) {
//		Map<String,Object> ret = new HashMap<String,Object>();
//		ret.put("xml", W3cDocumentHelper.asXML(currentE.getOriginElement()));
//		return ret;
//	}
//	
//	static public Map<String,Object> getEditRuleParam(XuiElement currentE) {
//		Map<String,Object> ret = new HashMap<String,Object>();
//		ret.put("xml", W3cDocumentHelper.asXML(currentE.getOriginElement()));
//		RuleRelationDatasource ruleRelationDatasource = new RuleRelationDatasource();
//		DataSet dataset = ruleRelationDatasource.getDatasource(currentE.getPropertyItem("xid"));
//		ret.put("cols",dataset.toJsonString());
//		return ret;
//	}
//
//	static public Map<?, ?> doEditRule(XuiElement currentElement) {
//		if("rule".equalsIgnoreCase(currentElement.getTagName()))
//			currentElement = currentElement.getParentElement();
//
//		Map<String,Object> paramMap = getEditRuleParam(currentElement);
//		
//		BaseWebDialog dlg = new BaseWebDialog(StudioPlugin2.getShell(), "http://localhost:8080/x5/UI2/system/components/data/designer/editRule.w", currentElement, paramMap);
//		if(dlg.open()==Dialog.OK){//处理规则
//			//获取旧的规则定义
//			List<String> ruleIDs = new ArrayList<String>();
//			List<XuiElement> rules = currentElement.getChildListByName("rule");
//			for(XuiElement col : rules){
//				ruleIDs.add(col.getDesignId());
//			}
//			UndoRedoManager undoRedoManager = currentElement.getXuiDataModel().getUndoRedoManager();
//			undoRedoManager.startBatch();
//			try{
//				//删除旧的规则定义
//				undoRedoManager.deleteComponent(ruleIDs, null);
//	
//				@SuppressWarnings("unchecked")
//				Map<String, Object> v = (Map<String, Object>)dlg.getReturnValue();
//				String template = (String)v.get("def");
//				Map<String,Object> initData = new HashMap<String,Object>();
//				initData.put("paintComponent", false);
//				initData.put("componentName", "rule");
//				initData.put("templateContent", template);
//				initData.put("parentElementId", currentElement.getDesignId());
//				undoRedoManager.createComponent(initData);
//			}finally{
//				undoRedoManager.endBatch();
//			}
//		}
//		return null;
//	}

//	public Map<?, ?> editRule(XuiElement currentElement) {
//		return Data.doEditRule(currentElement);
//	}
	
}
