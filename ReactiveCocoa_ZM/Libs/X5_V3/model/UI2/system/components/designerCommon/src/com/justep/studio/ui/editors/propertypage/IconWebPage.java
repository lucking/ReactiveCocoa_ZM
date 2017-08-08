package com.justep.studio.ui.editors.propertypage;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.util.FileHelper;
import com.justep.studio.util.StudioConfig;

public class IconWebPage  {
	private List<String> cssList = new ArrayList<String>();

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
	
	public void setPropertyItem(PropertyItem prop){
		
	}

	public Map<String,Object> buildIconList(){
		Map<String,Object> map = new HashMap<String,Object>();
		cssList.add("/system/components/justep/lib/css/icons.css");
		String path = "";
		String content = "";
        for(String cssPath:cssList){
    		String filePath = new File(StudioConfig.getUIPath())+cssPath;
    		filePath = filePath.replace("\\", "/");
    		String sList = getIconList(filePath);
    		path += ";"+filePath;
    		content += ";"+sList;
        }
        if(!path.equals("")){
        	path = path.substring(1);
        	content = content.substring(1);
        }
        //ConsoleView.println(content);
        map.put("icons", content);
        return map;
	}

}
