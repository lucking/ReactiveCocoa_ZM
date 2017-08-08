package com.justep.studio.ui.editors.stylepage;

import java.util.HashMap;
import java.util.Map;

import org.eclipse.jface.dialogs.Dialog;
import org.eclipse.swt.widgets.Shell;

import com.justep.studio.ui.editors.xui.IPropertyDialog;
import com.justep.studio.ui.editors.xui.IPropertyValueStrategy;
import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.util.StudioConfig;

/**
 * commData src propertyEdit
 * 
 * @author linhongbao
 * 
 */
public class EditStyleDialog implements IPropertyDialog  {

	private PropertyItem propertyItem;
	private Shell shell;
	private StyleDialog styleDialog;
	private String resultData;
	private boolean isOk = false;;
	
	public EditStyleDialog(Shell shell) {
		this.shell = shell;
	}
	
	public void open() {
		String filePath = propertyItem.getOwerElement().getXuiDataModel().getFilePath();
		filePath = filePath.replace(StudioConfig.getBIZPath(), "");
		int deep = filePath.split("/").length-2;	
		String editorParamter = propertyItem.getEditorParameter();
		String style = propertyItem.getValue();
		style = this.fixedStyleText(style);
		styleDialog = new StyleDialog(shell,style,deep,editorParamter,"修改样式");
		if(styleDialog.open() == Dialog.OK){
			isOk = true;
			resultData = styleDialog.getResultData();
		}
	}
	
	private  String fixedStyleText(String styleStr){
		if(styleStr!=null){
			StringBuffer sbf = new StringBuffer();
			String styles[] = styleStr.trim().split(";");
			for (String style : styles) {
				style = style.trim();
				if(!style.equals("")){
					String styleArr[] = style.split(":");
					if(styleArr.length==2){
						String p = styleArr[0].trim().toLowerCase();
						String v = styleArr[1].trim();
						if(!v.equals("")){
							sbf.append(p).append(":").append(v).append(";");
						}
					}
				}
			}
			styleStr = sbf.toString();
		}
		return styleStr;
	}

	public Object getReturnValue() {
		if(!isOk){
			return null;
		}
		Map<String,String> map = new HashMap<String, String>();
		if (resultData != null) {
			map.put(propertyItem.getName(), resultData);
		}else{
			map.put(propertyItem.getName(), "");
		}
		return map;
	}

	public String isValid() {
		return null;
	}

	public void setPropertyItem(PropertyItem propertyItem) {
		this.propertyItem = propertyItem;
	}

	public PropertyItem getPropertyItem() {
		return this.propertyItem;
	}

	public void setReturnValueStrategy(IPropertyValueStrategy strategy) {

	}

}

