package com.justep.studio.ui.editors.propertypage;

import java.io.File;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.dom4j.Element;
import org.eclipse.swt.SWT;
import org.eclipse.swt.browser.Browser;
import org.eclipse.swt.browser.BrowserFunction;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Composite;

import com.alibaba.fastjson.JSONException;
import com.alibaba.fastjson.JSONObject;
import com.justep.studio.ui.editors.xui.IPropertyDialog;
import com.justep.studio.ui.editors.xui.IPropertyValueStrategy;
import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.ui.editors.xui.W3cDocumentHelper;
import com.justep.studio.ui.editors.xui.XuiDataModel;
import com.justep.studio.ui.editors.xui.XuiElement;
import com.justep.studio.util.StudioConfig;

public class ClassWebPage  extends Composite implements IPropertyDialog{
	private Browser browser;
	private PropertyItem currentProp;
	private String value;
 
	public ClassWebPage(Composite parent, int style) {
		super(parent, style);
		//this.setSize(600, 500);
		final GridLayout gridLayoutAll = new GridLayout(1,false);
		gridLayoutAll.marginWidth = 0;
		gridLayoutAll.marginHeight = 0;
		this.setLayout(gridLayoutAll);
		browser = new Browser(this,SWT.NONE);
//		setBrowserListener();
		browser.setLayoutData(new GridData(SWT.FILL, SWT.FILL, true, true));
		new CustomFunction(browser,"callJava");
		browser.setUrl(new File(StudioConfig.getUIPath()).getParent()+"/UI/system/components/designerCommon/propEdtorPages/styleClass/index.html");
	}
	  class CustomFunction extends BrowserFunction {
         CustomFunction(Browser browser, String name) {
                 super(browser, name);
         }
         public Object function(Object[] arguments) {
        	 String data = arguments[0].toString();
				if(data != null){
					try {
						JSONObject jsonObj = JSONObject.parseObject(data);
						String event = (String)jsonObj.get("event");
						if("getValue".equals(event)){
							value = (String)jsonObj.get("data");
						}else if("afterInit".equals(event)){
							init(); 
						}else if("getBackground".equals(event)){
							return toHex(ClassWebPage.this.getBackground().getRed(),ClassWebPage.this.getBackground().getGreen(),ClassWebPage.this.getBackground().getBlue());
						}
					} catch (JSONException e) {
						e.printStackTrace();
					}
				}
				return data;
         }
	 }
	 
	public String toHex(int r, int g, int b) {
		return "#" + toBrowserHexValue(r) + toBrowserHexValue(g)
				+ toBrowserHexValue(b);
	}

	private String toBrowserHexValue(int number) {
 
		StringBuilder builder = new StringBuilder(
				Integer.toHexString(number & 0xff));
		while (builder.length() < 2) {
			builder.append("0");
		}
		return builder.toString().toUpperCase();
	}
	
	/**调用js方法设置数据**/
	@SuppressWarnings("unchecked")
	private void init(){
		String currentValue = this.currentProp.getValue();
		String[] valueItems = currentValue.split(" ");
		Set<String> set = new HashSet<String>();
		for(String valueItem:valueItems){
			set.add(valueItem);
		}
		Element staticData = currentProp.getDlgEditorConfig().element("static-data");
		StringBuffer sbf = new StringBuffer();
		if(staticData != null){
			List<Element> eList = (currentProp.getDlgEditorConfig().element("static-data")).elements();
			for(Element e:eList){
				List<Element> itemList = e.elements();
				StringBuffer itemsbf = new StringBuffer();
				boolean isSelected = set.contains(e.attributeValue("name"));
				for(Element item:itemList){
					String selected = "";
					String name = item.attributeValue("name");
					if(isSelected && set.contains(name)){
						selected = "checked:'checked',";
						set.remove(name);
					}
					itemsbf.append(",{"+selected+"name:'"+name+"',label:'"+item.attributeValue("label")+"',isDefault:'"+item.attributeValue("is-default")+"'}");
				}
				String selected = "";
				String name = e.attributeValue("name");
				if(set.contains(name)){
					selected = "checked:'checked',";
					set.remove(name);
				}
				sbf.append(",{"+selected+"name:'"+name+"',label:'"+e.attributeValue("label")+"',items:["+itemsbf.toString()+"]}");
			}
		}
		Element e = ((XuiDataModel)this.currentProp.getOwerElement().getDataModel()).getConfig().getCommonEditor("classList");//公共class
		String value = e.element("static-data").attributeValue("value");
		if(value != null){
			String[] items = value.split(",");
			for(String item:items){
				set.remove(item.split(":")[0]);
			}
		}
		
		String cusValue = "";
		for(String s:set){
			cusValue += " "+s;
		}

		browser.execute("init('"+currentValue+"',\"["+sbf.toString()+"]\",'"+cusValue.trim()+"','"+value+"');"); 
	}
	
	
	public Object getReturnValue() {
		browser.execute("getValue();");
		Map<String,String> map = new HashMap<String,String>();
		map.put(this.currentProp.getName(), value);
		return map;
	}

	public String isValid() {
		return null;
	}

	public void setPropertyItem(PropertyItem arg0) {
		currentProp = arg0;	
	}

	public void setReturnValueStrategy(IPropertyValueStrategy arg0) {
		
	}

	public void open() {
	}

}
