package com.justep.studio.ui.editors.propertypage;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

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
import com.justep.studio.ui.editors.xui.XuiDataModel;
import com.justep.studio.ui.editors.xui.XuiElement;
import com.justep.studio.util.FileHelper;
import com.justep.studio.util.StudioConfig;

public class WebPage  extends Composite implements IPropertyDialog{
	private Browser browser;
	//private Combo cssFileSelector;
	private PropertyItem currentProp;
	private String value;
	//private int currentIdx;
	private List<String> cssList = new ArrayList<String>();
 
	public WebPage(Composite parent, int style) {
		super(parent, style);
		this.setSize(1024, 768);
		final GridLayout gridLayoutAll = new GridLayout(1,false);
		gridLayoutAll.marginWidth = 0;
		gridLayoutAll.marginHeight = 0;
		this.setLayout(gridLayoutAll);

		
		/*Composite composite = new Composite(this, SWT.NONE);
		GridData gd_composite = new GridData(SWT.FILL, SWT.FILL, true, false);

		composite.setLayoutData(gd_composite);
		GridLayout gridLayout = new GridLayout();
		gridLayout.numColumns = 2;
		gridLayout.marginWidth = 0;
		gridLayout.marginHeight = 0;
		composite.setLayout(gridLayout);

		Label label = new Label(composite, SWT.NONE);
		label.setText("图标样式文件");
		cssFileSelector = new Combo(composite, SWT.BORDER);
		cssFileSelector.setLayoutData(new GridData(SWT.FILL, SWT.CENTER, true, false));
		cssFileSelector.setBackground(cssFileSelector.getParent().getBackground());
		cssFileSelector.addSelectionListener(new SelectionListener() {
			
			public void widgetSelected(SelectionEvent arg0) {
				if(currentIdx == cssFileSelector.getSelectionIndex()){
					return;
				}
				currentIdx = cssFileSelector.getSelectionIndex();
				browser.execute("reload();"); 
			}
			
			public void widgetDefaultSelected(SelectionEvent arg0) {
			}
		});*/
		browser = new Browser(this,SWT.NONE);
		browser.setLayoutData(new GridData(SWT.FILL, SWT.FILL, true, true));
		//cssFileSelector.select(0);
		//currentIdx = 0;
		new CustomFunction(browser,"callJava");
		browser.setUrl(new File(StudioConfig.getUIPath()).getParent()+"/UI/system/components/designerCommon/propEdtorPages/iconClass/index.html");
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
								//currentIdx = cssFileSelector.getSelectionIndex();
								init(); 
							}else if("getBackground".equals(event)){
								return toHex(WebPage.this.getBackground().getRed(),WebPage.this.getBackground().getGreen(),WebPage.this.getBackground().getBlue());
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
	private void init(){
		String path = "";
		String content = "";
        for(String cssPath:cssList){
    		String filePath = new File(StudioConfig.getUIPath()).getParent()+cssPath;
    		filePath = filePath.replace("\\", "/");
    		String sList = getIconList(filePath);
    		path += ";"+filePath;
    		content += ";"+sList;
        }
        if(!path.equals("")){
        	path = path.substring(1);
        	content = content.substring(1);
        }
      // ConsoleView.println(content);
		String currentValue = this.currentProp.getValue();
		browser.execute("init('"+path+"','"+currentValue+"','"+content+"');"); 
	}
	
	private static String getIconList(String filePath){
		Set<String> set = new HashSet<String>();
		//
		String cssContent = FileHelper.readFileAsStr(filePath, "\n", false, "UTF-8");
		if(cssContent == null){
			return "";
		}
		
		StringBuffer sbf = new StringBuffer();
		for(int i = 0,l=cssContent.length();i<l;i+=1){
			char c = cssContent.charAt(i);
			//去掉注释
			if(c == '/' && (i+1)<l && cssContent.charAt(i+1) == '*'){
				i+=2;
				while((i+=1)<l){
					if(cssContent.charAt(i)=='*' && (i+1)<l && cssContent.charAt(i+1)=='/'){
						break;
					}
				}
			}else if(c=='.'){
				//获取样式名称
                 StringBuffer iconBuf = new StringBuffer();
                 while((i+=1)<l){
                	 c = cssContent.charAt(i);
                	 if(c == ' ' || c==',' || c==':' || c=='{' || c=='\n' || c=='\r' || c=='['){
                		 break;
                	 }
                	 iconBuf.append(c);
                 }
                 String iconCls = iconBuf.toString().trim();
                 if(iconCls.startsWith("icon-") && !set.contains(iconCls)){
                	 sbf.append(","+iconCls);
                	 set.add(iconCls);
                 }
			}
		}
		if(sbf.length()>0){
			return sbf.substring(1);
		}
		return "";
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
		cssList.add("/UI/system/icons/system.icon.css");
		XuiDataModel dm = (XuiDataModel)arg0.getOwerElement().getDataModel();
		List<XuiElement> resourceList = dm.getRootElement().getChildListByName("resource");
		if(resourceList == null){
			return;
		}
		for(XuiElement xuiE:resourceList){
			List<XuiElement> resourceItems = xuiE.getChildren(); 
			if(resourceItems ==null){
			   continue;	
			}
			for(XuiElement item:resourceItems){
				if(item.getOriginElement().getLocalName().equals("link")){
					String href = item.getOriginElement().getAttribute("href");
					if(href != null && href.endsWith(".icon.css")){ 
						cssList.add(href);
					}
				}
			}
		}
	}

	public void setReturnValueStrategy(IPropertyValueStrategy arg0) {
	}

	public void open() {
	}
	
	public static void main(String[] arags){
		getIconList("D:/x5version/X5.2.4.2240_trunk/model/UI/system/config/user.css");
	}

}
