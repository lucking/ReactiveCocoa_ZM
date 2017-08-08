package com.justep.designer.components;

import java.util.ArrayList;
import java.util.List;

import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpression;
import javax.xml.xpath.XPathFactory;

import org.eclipse.jface.window.Window;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

import com.justep.studio.StudioPlugin2;
import com.justep.studio.data.DSUtil;
import com.justep.studio.data.DataColumn;
import com.justep.studio.data.DataRecord;
import com.justep.studio.data.DataSet;
import com.justep.studio.ui.dialog.CommonSelectorDialog;
import com.justep.studio.ui.editors.util.XuiConstant;
import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.ui.editors.xui.XuiElement;
import com.justep.studio.util.XPathUtil;

/**
 * operation相关操作
 * @author xiangyaohua
 *
 */
public class OperationManager {
	//	public List<String[]> getDatasource(PropertyItem propertyItem) {
	public List<String[]> getOperationOwnerList(PropertyItem propertyItem) {
		List<String[]> list = new ArrayList<String[]>();
		Document doc = ((XuiElement) propertyItem.getOwerElement()).getOriginElement().getOwnerDocument();
		return getOperationOwnerList(doc);
	}
	
	private static  List<String[]> getOperationOwnerList(Document doc){
		List<String[]> list = new ArrayList<String[]>();
		XPathFactory factory = XPathFactory.newInstance();
		XPath xpath = factory.newXPath();
		try {
			XPathExpression expr = xpath.compile("//*[@component]");
			NodeList result = (NodeList) expr.evaluate(doc, XPathConstants.NODESET);
			for (int i = 0; i < result.getLength(); i++) {
				Object obj = result.item(i);
				if (obj instanceof Element) {
					XuiElement xuiElement = (XuiElement) ((Element) obj).getUserData(XuiConstant.OWNER_XUIELEMENT);
					if (xuiElement != null) {
						if (xuiElement.getConfigElement().element("operations") != null) {
							list.add(new String[] { xuiElement.getId(), xuiElement.getId() });
						}
					}
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	@SuppressWarnings("unchecked")
	public List<String[]> getOperationList(PropertyItem propertyItem) {
		List<String[]> list = new ArrayList<String[]>();

		XuiElement xuiElement = (XuiElement) propertyItem.getOwerElement().getOriginElement().getUserData(XuiConstant.OWNER_XUIELEMENT);

		String id = xuiElement.getProperyValue("operation-owner"); 
		XuiElement owner = xuiElement.getXuiDataModel().findElementById(id);
		if (owner != null) {
			org.dom4j.Element operations = owner.getConfigElement().element("operations");
			if (operations != null) {
				List<org.dom4j.Element> ops = operations.elements("operation");
				for (org.dom4j.Element op : ops) {
					list.add(new String[] { op.attributeValue("name"), op.attributeValue("name") });
				}
			}
		}

		return list;
	}
	
	@SuppressWarnings("unchecked")
	public static List<DataRecord> selectOperation(XuiElement currentElement,List<String> excludeList){
		currentElement.getChildren();
 
		DataSet dataset = new DataSet();
		DSUtil.createSelectedColumn(dataset);

		DataColumn col1 = dataset.addColumn("owner", "所属组件", "string");
		col1.setLength(120);
		col1.setSearchField(true);

		col1 = dataset.addColumn("name", "操作名称", "string");
		col1.setLength(120);
		col1.setSearchField(true);
		
	
		dataset.addColumn("label", "操作描述", "string");
		col1.setLength(120);
		col1.setSearchField(true);
		col1.setDisenableFilterCondition("selected==true");

		Document doc = currentElement.getOriginElement().getOwnerDocument();
		List<Element> eList = XPathUtil.selectNodes(doc.getDocumentElement(), "//*[@component]");
		for(Element e:eList){
			XuiElement xuiElement = (XuiElement)(e.getUserData(XuiConstant.OWNER_XUIELEMENT));
			if (xuiElement != null) {
				if (xuiElement.getConfigElement().element("operations") != null) {
					String ownerId = xuiElement.getId();
					org.dom4j.Element operations = xuiElement.getConfigElement().element("operations");
					if (operations != null) {
						List<org.dom4j.Element> ops = operations.elements("operation");
						for (org.dom4j.Element op : ops) {
							String name =  op.attributeValue("name");
							if(excludeList != null && !excludeList.contains(ownerId+"."+name)){
								dataset.addRecord(new Object[] {false,ownerId, name, op.attributeValue("label") });								
							}
						}
					}
				}
			}
		}
		CommonSelectorDialog dlg = new CommonSelectorDialog(
				StudioPlugin2.getShell(), "请选择操作");
		dlg.setDataSet(dataset);
		dlg.setInitialSize(580, 600);
		dlg.open();
		if(dlg.getReturnCode() == Window.OK){
			return dlg.getSelections();
		}
		return null;
	}
}
