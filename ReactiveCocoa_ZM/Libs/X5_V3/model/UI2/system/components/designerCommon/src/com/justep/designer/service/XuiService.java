package com.justep.designer.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.xml.parsers.ParserConfigurationException;

import org.eclipse.jface.dialogs.Dialog;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.MessageBox;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import com.alibaba.fastjson.JSONArray;
import com.justep.designer.util.JsCallJavaUtil;
import com.justep.studio.ui.dialogs.WebDialog;
import com.justep.studio.ui.editors.util.XuiConstant;
import com.justep.studio.ui.editors.util.XuiDynJavaManager;
import com.justep.studio.ui.editors.xui.IComponent;
import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.ui.editors.xui.W3cDocumentHelper;
import com.justep.studio.ui.editors.xui.XuiDataModel;
import com.justep.studio.ui.editors.xui.XuiElement;
import com.justep.studio.ui.editors.xui.designpanel.WindowDesignPanel;
import com.justep.studio.ui.editors.xui.dialog.PropertyEditorDlg;
import com.justep.studio.ui.views.ConsoleView;
import com.justep.studio.util.JSONUtil;
import com.justep.studio.util.StudioConfig;
import com.justep.studio.util.XPathUtil;

public class XuiService {
	static int pageIdx = 0;
	static Map<String,String> pageParamMap = new HashMap<String,String>();//用于存放传入页面的参数
	static Map<String,String> returnValueMap = new HashMap<String,String>();//用于存放对话框页面的返回值
	static Map<String,WebDialog> dialogMap = new HashMap<String,WebDialog>();//存放对话框对象
	
	public static void println(String msg){
		 ConsoleView.println("XuiService:"+msg);
	}

	/**
	 * 打开一个对话框页面.
	 * @param context
	 */
	@SuppressWarnings("unchecked")
	public static void openPage(final Map<String,Object> context){
		String url = (String)context.get("url");
	    int idx = url.indexOf("?");
	    String pageId = "pageId"+(pageIdx++);
		if(pageIdx == 10){
			pageIdx = 0;
		}
		String targetUrl = url.substring(0,idx);
		if(targetUrl.startsWith("$UI")){
             targetUrl = "$model/"+targetUrl;
		}
	    String newUrl = "$UI/system/components/designerCommon/propEdtorPages/index/index.w"+url.substring(idx)+"&targetUrl="+targetUrl+"&pageId="+pageId;
 
		final XuiElement currentXuiElement = (XuiElement)context.get("currentXuiElement");
		final Map<String,Object> initData = (Map<String,Object>)context.get("pageParams");//web页面传入的参数
		final String callback = (String)context.get("callback");//js回调
		if(url == null || url.equals("")){
			ConsoleView.println("url不能为空！");
			return;
		}
		if(currentXuiElement!=null){
			initData.put("d_id", currentXuiElement.getDesignId());
		}
	 
		if(newUrl.startsWith("$UI")){
			newUrl = StudioConfig.getRuntimeBaseUrl()+"/"+StudioConfig.getUIDirName() +newUrl.substring(3);
		}

		pageParamMap.put(pageId, JSONUtil.serialize(initData));
		if(StudioConfig.isDebug()){
			ConsoleView.println("URL:"+newUrl);			
		}
		
		WebDialog dlg = new WebDialog(Display.getDefault().getShells()[0],newUrl,initData){
			public boolean close(){
				Set<String> keySet = XuiService.dialogMap.keySet();
				for(String key:keySet){
					if(XuiService.dialogMap.get(key) == this){
						XuiService.dialogMap.remove(key);
						pageParamMap.remove(key);
						break;
					}
				}
				return super.close();
			}
		};
	 
		dialogMap.put(pageId, dlg);
		
		if(dlg.open()==Dialog.OK){
			String returnValue = returnValueMap.get(pageId);
			returnValueMap.remove(pageId);
			if(callback != null && !callback.equals("")){
				println("returnValue:"+returnValue);
				executeCallback(context,callback,returnValue);
			}else{
				context.put("returnValue", returnValue);
			}
		}else{
			context.remove("callback");
		}
	}
	
	/**
	 * 对话框确定动作.
	 * @param context
	 */
	public static void pageOkAction(Map<String,Object> context){
		String pageId = (String)context.get("pageId");
		String returnValue = (String)context.get("returnValue");
		returnValueMap.put(pageId, returnValue);
		WebDialog dlg = XuiService.dialogMap.get(pageId);
		if(dlg != null){
			dlg.okPressed();
		}
	}
	
	/**
	 * 对话框取消动作.
	 * @param context
	 */
	public static void pageCloseAction(Map<String,Object> context){
		String pageId = (String)context.get("pageId");
		WebDialog dlg = XuiService.dialogMap.get(pageId);
		if(dlg != null){
			 dlg.cancelPressed();
		}
	}
	
	public static String getPageParams(final Map<String,Object> context){
		String pageId = (String)context.get("pageId");
		return pageParamMap.get(pageId);
	}
	
    public static void executeCallback(Map<String,Object> context,String callback,String params){
    	if(callback!=null){
    		context.put("callback", "window."+callback+"("+params+")");
    	}
    }
	
	/**根据设计时id获取模型节点*/
	public static String getModelNodeByDId(final Map<String,Object> context){
		String d_id = (String)context.get("d_id");
		XuiElement currentXuiElement = (XuiElement)context.get("currentXuiElement");
		if(d_id != null && !d_id.equals("") && currentXuiElement != null){
			XuiElement xuiElement = currentXuiElement.getXuiDataModel().findElementByDesignId(d_id);
			if(xuiElement!=null){
				String xml = xuiElement.getXuiDataModel().getDesigner().parseLayout(xuiElement);
				return xml;
			}
		}
		return "";
	}
	
	/**根据xpath选择模型节点**/
	@SuppressWarnings("unchecked")
	public static String selectModelNodes(final Map<String,Object> context){
        println("selectModelNodes--params:"+context);
		String xpath = (String)context.get("xpath");
		String parentId = (String)context.get("parentId");
		XuiElement currentXuiElement = (XuiElement)context.get("currentXuiElement");
		XuiElement parentNode = null;
		if(parentId != null && !parentId.equals("")){
		}
		parentNode = currentXuiElement.getXuiDataModel().findElementByDesignId(parentId);
		if(parentNode == null &&  currentXuiElement !=null){
			parentNode = currentXuiElement.getXuiDataModel().getRootElement();
		}
		 
		if(xpath != null && !xpath.equals("") && parentNode !=null){
		   List<Element> eList = XPathUtil.selectNodes(parentNode.getOriginElement(), xpath);
		   StringBuffer sbf = new StringBuffer();
		   for(Element e:eList){
			   parentNode.getXuiDataModel().getDesigner().parseLayout(e, sbf);			   
		   }
		   return sbf.toString();
		}
		return "";
	}
	
	@SuppressWarnings("rawtypes")
	public static String getAllOperations(final Map<String,Object> context){
		XuiElement currentXuiElement = (XuiElement)context.get("currentXuiElement");
		String optConfig = currentXuiElement.getXuiDataModel().getDesigner().executeJSMethod(WindowDesignPanel.JSMETHOD_TYPE_CANVAS, "getAllOperation", new HashMap());
		return optConfig;
	}
	
	
	/**创建组件**/
	@SuppressWarnings("unchecked")
	public static void createComponent(final Map<String,Object> context){
		final Map<String,Object> config = (Map<String,Object>)context.get("config");//web页面传入的参数
		
		final String callback = (String)context.get("callback");//js回调
		XuiDataModel xuiDataModel = (XuiDataModel)context.get("xuiDataModel");
		if(config.get("paintComponent") == null){
			config.put("paintComponent",false);
		}
		XuiElement xuiElement = xuiDataModel.getUndoRedoManager().createComponent(config);
		if(callback != null && !callback.equals("")){
			config.put("d_id", xuiElement.getDesignId());
			config.put("xml", xuiElement.getXuiDataModel().getDesigner().parseLayout(xuiElement));
			executeCallback(context,callback,JSONUtil.serialize(config));
		}
	}
	
	/**创建组件**/
	@SuppressWarnings("unchecked")
	public static void batchCreateComponent(final Map<String,Object> context){
		final List<Map<String,Object>> configs = (List<Map<String,Object>>)context.get("config");//web页面传入的参数
		
		final String callback = (String)context.get("callback");//js回调
		XuiDataModel xuiDataModel = (XuiDataModel)context.get("xuiDataModel");
		xuiDataModel.getUndoRedoManager().startBatch();
		
		try{
			for(Map<String,Object> config : configs){
				if(config.get("paintComponent") == null){
					config.put("paintComponent",false);
				}
				XuiElement xuiElement = xuiDataModel.getUndoRedoManager().createComponent(config);
				config.put("d_id", xuiElement.getDesignId());
				config.put("xml", xuiElement.getXuiDataModel().getDesigner().parseLayout(xuiElement));
			}
		 }finally{
			 xuiDataModel.getUndoRedoManager().endBatch();
		 }
		 
		if(callback != null && !callback.equals("")){
			executeCallback(context,callback,JSONUtil.serialize(configs));
		}
	}
	
	public static boolean isDebug(){
		return true;
	}
	
	public static void log(String msg){
		ConsoleView.println(msg);
	}
	
	/**
	 * 删除组件.
	 * @param context
	 */
	@SuppressWarnings({ "unchecked", "static-access" })
	public static void deleteComponent(final Map<String,Object> context){
		String callback = (String)context.get("callback");//js回调
		
		List<String> ids = (List<String>)context.get("ids");//要删除的designerId列表
		//List<String> paths = (List<String>)context.get("paths");//要删除的designerId列表
		XuiElement currentXuiElement = (XuiElement)context.get("currentXuiElement");

		List<String> paths = (List<String>)context.get("paths"); //要删除的dom节点所在的路径
		XuiDataModel dataModel = currentXuiElement.getXuiDataModel();
		if(paths == null || paths.size()==0){
			String sPaths = dataModel.getDesigner().executeJSMethod(dataModel.getDesigner().JSMETHOD_TYPE_CANVAS,"getSelectionPaths", new HashMap<String,String>());
			paths = (List<String>) JSONUtil.deserialize(sPaths);
			println(sPaths);
		}
	
		currentXuiElement.getXuiDataModel().getUndoRedoManager().deleteComponent(ids, paths);
		if(callback != null && !callback.equals("")){
			Map<String,Object> result = new HashMap<String,Object>();
			result.put("ids", ids);
			result.put("paths", paths);
			String sValue = JSONUtil.serialize(result);
			executeCallback(context,callback,sValue);
		}
	}
	
	public static String genaXId(final Map<String,Object> context){
		String componentName = (String)context.get("componentName");
		XuiDataModel dataModel =  (XuiDataModel)context.get("xuiDataModel");
		String xid = dataModel.genaId(componentName);
		System.out.println("====================>"+xid);
		return xid;
	}
	
	/**
	 * 获取属性值.
	 * @param context
	 * @return
	 */
	public static String get(final Map<String,Object> context){
		String d_id = (String)context.get("d_id");
		String name = (String)context.get("name");
		
		XuiElement currentXuiElement = (XuiElement)context.get("currentXuiElement");
		if(!currentXuiElement.getDesignId().equals(d_id)){
			currentXuiElement = currentXuiElement.getXuiDataModel().findElementByDesignId(d_id);
		}
		if(currentXuiElement != null){
			return currentXuiElement.getProperyValue(name);
		}else{
			println("id:"+d_id+"对应的元素不存在!");
		}
		return "";
	}
	
	/**
	 * 设置属性值.
	 * @param context
	 */
	@SuppressWarnings("unchecked")
	public static void set(final Map<String,Object> context){

		String d_id = (String)context.get("d_id");
		Map<String,Object> config= (Map<String,Object>)context.get("config");
		String callback = (String)context.get("callback");//js回调
		XuiElement currentXuiElement = (XuiElement)context.get("currentXuiElement");
		if(d_id==null|| d_id.equals("")){
			d_id = currentXuiElement.getDesignId();
		}
		currentXuiElement.getXuiDataModel().getUndoRedoManager().startBatch();
		try{
			Set<String> keys = config.keySet();
			for(String key:keys){
				currentXuiElement.getXuiDataModel().getUndoRedoManager().changeProperty(d_id, key, ""+config.get(key));					
			}
		}finally{
			currentXuiElement.getXuiDataModel().getUndoRedoManager().endBatch();
		}
		if(callback != null && !callback.equals("")){
			String sValue = JSONUtil.serialize(config);
			executeCallback(context,callback,sValue);
		}
	}
	
	@SuppressWarnings("unchecked")
	public static void callMethod(final Map<String,Object> context){
		String d_id = (String)context.get("d_id");
		String targetMethod = (String)context.get("targetMethod");
		
		Map<String,Object> config= (Map<String,Object>)context.get("config");
		String callback = (String)context.get("callback");//js回调
		XuiDataModel dataModel =  (XuiDataModel)context.get("xuiDataModel");
		XuiElement xuiElement = dataModel.findElementByDesignId(d_id);
		IComponent component = xuiElement.getComponent();
		if(component != null){
			XuiDynJavaManager.executeMethod(component, targetMethod, new Object[]{config});
		}
		if(callback != null && !callback.equals("")){
			String sValue = JSONUtil.serialize(config);
			executeCallback(context,callback,sValue);
		}
	}
	
	public static String getTemplate(final Map<String,Object> context){
		XuiDataModel dataModel =  (XuiDataModel)context.get("xuiDataModel");
		String componentName = (String)context.get("componentName");
		return dataModel.getConfig().getTemplateAsText(dataModel.getElementConfig(componentName), componentName, null);
	}
	
	@SuppressWarnings("unchecked")
	public static void updateProperties(final Map<String,Object> context){
		List<String> dIds = (List<String>)context.get("d_ids");
		List<Map<String,Object>> values =  (List<Map<String,Object>>)context.get("properties");
		XuiDataModel dataModel =  (XuiDataModel)context.get("xuiDataModel");
 
		dataModel.getUndoRedoManager().startBatch();
		try{
			for(int i = 0;i<dIds.size();i+=1){
				String d_id = dIds.get(i);
				Map<String,Object> config = values.get(i);
				Set<String> keys = config.keySet();
				for(String key:keys){
					dataModel.getUndoRedoManager().changeProperty(d_id, key, ""+config.get(key));					
				}
			}

		}finally{
			dataModel.getUndoRedoManager().endBatch();
		}
		String callBack = (String)context.get("callback");//js回调
		if(callBack != null && !callBack.equals("")){
			Map<String,Object> returnValue = new HashMap<String,Object>();
			returnValue.put("d_ids", dIds);
			returnValue.put("properties", values);
			String sValue = JSONUtil.serialize(returnValue);
			executeCallback(context,callBack,sValue);
		}
	}
	
	@SuppressWarnings("unchecked")
	public static void udpateDomNodes(final Map<String,Object> context){
		List<String> contents = (List<String>)context.get("contents");
		XuiDataModel dataModel =  (XuiDataModel)context.get("xuiDataModel");

		dataModel.getUndoRedoManager().startBatch();
		List<String> newList = new ArrayList<String>();
		try{
			for(int i = contents.size()-1;i>=0;i-=1){ 
				String content = rebuildTemplate(contents.get(i));
				System.out.println("==="+content);
				Document document = W3cDocumentHelper.parseText(content);
				Element element = document.getDocumentElement();
				String d_id = element.getAttribute("d_id");
				
				XuiElement xuiElement = dataModel.findElementByDesignId(d_id);
				if(xuiElement == null){
					String d_parentDId = element.getAttribute("d_parentdid");
					String d_nextDId = element.getAttribute("d_nextdid");
	 
				    String xml=   W3cDocumentHelper.asXML(element);
					Map<String,Object> initData = new HashMap<String,Object>();
					initData.put("parentElementId", d_parentDId);
					initData.put("templateContent",xml);
					initData.put("d_id",d_id);
					initData.put("before", d_nextDId);
					initData.put("paintComponent", false);
					XuiElement xuiElemnt = dataModel.getUndoRedoManager().createComponent(initData);
					newList.add(dataModel.getDesigner().parseLayout(xuiElemnt));
				}
			}
		} catch (ParserConfigurationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SAXException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally{
			dataModel.getUndoRedoManager().endBatch();
		}
		String callBack = (String)context.get("callback");//js回调
		if(callBack != null && !callBack.equals("")){
			Map<String,Object> returnValue = new HashMap<String,Object>();
			returnValue.put("nodeList", newList);
			String sValue = JSONUtil.serialize(returnValue);
			executeCallback(context,callBack,sValue);
		}
	}
	
	@SuppressWarnings("unchecked")
	public static void updateText(final Map<String,Object> context){
		Map<String,String> textMap = (Map<String,String>)context.get("textMap");
		Boolean isCDATA = (Boolean)context.get("isCDATA");
		
		XuiDataModel dataModel =  (XuiDataModel)context.get("xuiDataModel");

		dataModel.getUndoRedoManager().startBatch();
		try{ 
			Set<String> keyset = textMap.keySet();
			for(String key:keyset){
				String text = textMap.get(key);
				XuiElement xuiElement = dataModel.findElementByDesignId(key);
				if(xuiElement != null){
					if(isCDATA == null || isCDATA == false){
						W3cDocumentHelper.setElementText(xuiElement.getOriginElement(), text);						
					}else{
						W3cDocumentHelper.setFullText(xuiElement.getOriginElement(), text,isCDATA);
					}		
				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			dataModel.getUndoRedoManager().endBatch();
		}
		String callBack = (String)context.get("callback");//js回调
		if(callBack != null && !callBack.equals("")){
			Map<String,Object> returnValue = new HashMap<String,Object>();
			String sValue = JSONUtil.serialize(returnValue);
			executeCallback(context,callBack,sValue);
		}
	}
	
	public static String rebuildTemplate(String template){
		int start = 0;
		while(true){
			int idx = template.indexOf("<input",start);
			if(idx == -1){
				break;
			}
			int idx1 = template.indexOf(">",idx);
			if(idx1 !=-1){
				template = template.substring(0,idx1)+"/"+template.substring(idx1);
				start = idx1;
			}
		}
		return template;
	}
	
    @SuppressWarnings("unchecked")
	public static void replaceChild(final Map<String,Object> context){
		String d_id = (String)context.get("d_id");
		String childTemplate = (String)context.get("childTemplate");
		String xpathCondition = (String)context.get("xpathCondition");
		Map<String,Object> config= (Map<String,Object>)context.get("config");
		
		XuiElement currentXuiElement = (XuiElement)context.get("currentXuiElement");
		XuiDataModel dataModel = currentXuiElement.getXuiDataModel();
		if(!currentXuiElement.getDesignId().equals(d_id)){
			currentXuiElement = dataModel.findElementByDesignId(d_id);
		}
		List<XuiElement> childList = new ArrayList<XuiElement>();
		if(xpathCondition!=null && !xpathCondition.equals("")){
			List<Element> eList = XPathUtil.selectElementNodes(currentXuiElement.getOriginElement(), xpathCondition);
			for(Element e:eList){
				childList.add((XuiElement)e.getUserData(XuiConstant.OWNER_XUIELEMENT));
			}
		}else{
			childList = currentXuiElement.getChildren();
		}
		List<String> ids = new ArrayList<String>();
		for(XuiElement xuiElement:childList){
			ids.add(xuiElement.getDesignId());
		}
		dataModel.getUndoRedoManager().startBatch();
		try{
			dataModel.getUndoRedoManager().deleteComponent(ids, null);
			if(childTemplate != null && !childTemplate.equals("")){
				childTemplate = "<root>"+childTemplate+"</root>";
				Document document = W3cDocumentHelper.parseText(childTemplate);
				NodeList nodeList = document.getDocumentElement().getChildNodes();
				String parentElementId = (String) context.get("parentElementId");//父组件id
				if(parentElementId ==null || parentElementId.trim().equals("")){
					parentElementId = currentXuiElement.getDesignId();
				}
				Boolean paintComponent = (Boolean)context.get("paintComponent");
				for(int i=0;i<nodeList.getLength();i+=1){
					if(nodeList.item(i) instanceof Element){
						Element element = (Element)nodeList.item(i);
						org.dom4j.Element configE = dataModel.getElementConfig(element);
						Map<String,Object> initData = new HashMap<String,Object>();
						initData.put("componentName", configE != null?configE.attributeValue("name"):"default");
						initData.put("parentElementId", parentElementId);
						initData.put("templateContent", W3cDocumentHelper.asXML(element));
						initData.put("d_id",element.getAttribute("d_id"));
						initData.put("paintComponent", paintComponent);
						dataModel.getUndoRedoManager().createComponent(initData);
					}
				}
				List<XuiElement> list = new ArrayList<XuiElement>();
				list.add(currentXuiElement);
				dataModel.getDesigner().getEditorPart().getPropertyEditor().setXuiElements(list);
				dataModel.getDesigner().getEditorPart().getTreeViewer().refresh();
			}
		} catch (ParserConfigurationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException(e);
		} catch (SAXException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException(e);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException(e);
		}finally{
			dataModel.getUndoRedoManager().endBatch();
		}
		
		String callBack = (String)context.get("callback");//js回调
		executeCallback(context,callBack,JSONUtil.serialize(config));
    }
    
    /**
     * 重新绘制组件.
     * @param context
     */
    @SuppressWarnings("unchecked")
	public static void repaintComponent(final Map<String,Object> context){
		String d_id = (String)context.get("d_id");
		Map<String,Object> config= (Map<String,Object>)context.get("config");
		String callBack = (String)context.get("callback");//js回调
		XuiElement currentXuiElement = (XuiElement)context.get("currentXuiElement");
		XuiDataModel dataModel = currentXuiElement.getXuiDataModel();
		if(!currentXuiElement.getDesignId().equals(d_id)){
			currentXuiElement = dataModel.findElementByDesignId(d_id);
		}
		dataModel.getDesigner().repaintComponent(currentXuiElement);
		if(callBack != null && !callBack.equals("")){
			String sValue = JSONUtil.serialize(config);
			executeCallback(context,callBack,sValue);
		}
	}
	
    /**
     * 移动节点.
     * @param context
     */
    @SuppressWarnings("unchecked")
	public static void move(final Map<String,Object> context){
		String d_id = (String)context.get("d_id");
		Map<String,Object> config= (Map<String,Object>)context.get("config");
		String callBack = (String)context.get("callback");//js回调
		XuiElement currentXuiElement = (XuiElement)context.get("currentXuiElement");
		XuiDataModel dataModel = currentXuiElement.getXuiDataModel();
		if(d_id == null || d_id.equals("")){
			d_id = currentXuiElement.getDesignId();
		}
		String targetId = (String)context.get("targetId");
		String refId = (String)context.get("refId");
		dataModel.getUndoRedoManager().changeLocation(d_id, targetId, refId, null, null);
		Map<String,Object> paramMap = new HashMap<String,Object>();
		paramMap.put("id", d_id);
		paramMap.put("targetId", targetId);
		paramMap.put("refId", refId);
		dataModel.getDesigner().executeJSMethod(WindowDesignPanel.JSMETHOD_TYPE_CANVAS, "changeLocation", paramMap);
		if(callBack != null && !callBack.equals("")){
			String sValue = JSONUtil.serialize(config);
			executeCallback(context,callBack,sValue);
		}
    }
    
    public static String getEditorDataSource(final Map<String,Object> context){
    	String method = (String)context.get("method");
    	int idx = method.lastIndexOf(".");
    	String className = method.substring(0,idx);
    	if(className.indexOf(".") == -1){
    		className = "com.justep.studio.ui.editors.property.datasource."+className;
    	}
    	method = method.substring(idx+1);
    	if(context.get("propertyItem")==null){
    		context.put("propertyItem", "xid");
    	}
    	String s = JsCallJavaUtil.executeJavaMethod(StudioConfig.getUIPath()+"/system/components/designerCommon",className, method, context);
    	return s;
    }
    
    @SuppressWarnings("unchecked")
	public static void setCSS(final Map<String,Object> context){
		String d_id = (String)context.get("d_id");
		Map<String,String> config= (Map<String,String>)context.get("config");
		
		String callBack = (String)context.get("callback");//js回调
		XuiElement currentXuiElement = (XuiElement)context.get("currentXuiElement");
		XuiDataModel dataModel = currentXuiElement.getXuiDataModel();
		if(d_id == null || d_id.equals("")){
			d_id = currentXuiElement.getDesignId();
		}
		dataModel.getUndoRedoManager().changeStyle(d_id, config);
		if(callBack != null && !callBack.equals("")){
			String sValue = JSONUtil.serialize(config);
			System.out.println(sValue);
			executeCallback(context,callBack,sValue);
		}
    }
    
    @SuppressWarnings("unchecked")
	public static void batchSetCSS(final Map<String,Object> context){
    	List<String> d_ids = (List<String>)context.get("d_ids"); 
    	List<Map<String,String>> configList = (List<Map<String,String>>)context.get("config");
    	String callBack = (String)context.get("callback");//js回调
    	XuiDataModel dataModel =  (XuiDataModel)context.get("xuiDataModel");
    	dataModel.getUndoRedoManager().changeStyle(d_ids, configList);
		if(callBack != null && !callBack.equals("")){
			String sValue = JSONUtil.serialize(configList);
			System.out.println(sValue);
			executeCallback(context,callBack,sValue);
		}
    }
    
    @SuppressWarnings("unchecked")
	public static void openEditor(final Map<String, Object> context) {
		XuiElement currentXuiElement = (XuiElement)context.get("currentXuiElement");
		Map<String,String> paramMap = (Map<String,String>)context.get("params");
		String value = "";
		if(paramMap != null){
			value = paramMap.get("value");
		}
		XuiDataModel xuiDataModel = currentXuiElement.getXuiDataModel();
		
		;
		PropertyItem propItem = new PropertyItem();
		propItem.setOwerElement(currentXuiElement);
		propItem.setName("expression");
		propItem.setValue(value);
		
		propItem.setDlgEditorConfig(xuiDataModel.getConfig().getCommonEditor("jSExpressionEditor"));
		PropertyEditorDlg dlg = new PropertyEditorDlg(Display.getDefault().getActiveShell()) {
			protected boolean doApply() {
				try {
					String errMsg = this.currentDialogPage.isValid();
					if (errMsg != null) {
						MessageBox msg = new MessageBox(this.getShell());
						msg.setText("提示信息");
						msg.setMessage(errMsg);
						msg.open();
						return false;
					}

					Map<String, String> map = (Map<String, String>) this.currentDialogPage.getReturnValue();
					String value = map.get("expression");
					String callBack = (String) context.get("callback");//js回调
					if (callBack != null && !callBack.equals("")) {
						Map<String,String> config = new HashMap<String,String>();
						config.put("value",value);
						String sValue = JSONUtil.serialize(config);
						
						System.out.println(sValue);
						executeCallback(context,callBack,sValue);
					}

				} catch (Exception e) {
					e.printStackTrace();
				}
				return true;
			}

		};
		dlg.setPropertyItem(propItem);
		dlg.open();

	}
    
	/**
	 * 获取UI下的所有应用名称.
	 * @param context
	 * @return
	 */
	public static String getAllAppNames(Map<String,Object> context){
		JSONArray array = new JSONArray();
	    File bizDir = new File(StudioConfig.getUIPath());
	    File[] files = bizDir.listFiles();
	    for(File file:files){
	    	String name = file.getName();
	    	if(file.isFile() || name.startsWith(".") || name.endsWith("_X")){
	    		continue;
	    	}
	    	array.add(name);
	    }
	    return array.toJSONString();
	}
}
