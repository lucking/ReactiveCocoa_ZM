package com.justep.studio.ui.editors.property.dialog;

import java.util.HashMap;
import java.util.Map;

import org.eclipse.swt.widgets.Shell;

import com.justep.studio.ui.editors.xui.IPropertyDialog;
import com.justep.studio.ui.editors.xui.IPropertyValueStrategy;
import com.justep.studio.ui.editors.xui.PropertyItem;

/**
 * commData src propertyEdit
 * 
 * @author linhongbao
 * 
 */
public class SelectFileTreeDialog implements IPropertyDialog  {

	private PropertyItem propertyItem;
	private Shell shell;
	private FileTreeDialog fileDialog;

	private String resultData;
	
	public SelectFileTreeDialog(Shell shell) {
		this.shell = shell;
	}
	
	public void open() {
		if(fileDialog==null){
			String selfFilePath = propertyItem.getOwerElement().getXuiDataModel().getFilePath();
			fileDialog = new FileTreeDialog(shell,this.propertyItem.getEditorParameter(),selfFilePath);
		}
		fileDialog.open();
		resultData = fileDialog.getResultData();
	}

	public Object getReturnValue() {
		
		Map<String, String> map = new HashMap<String, String>();
		if (!"".equals(resultData)) {
			try{
				String wFileFullPath = this.propertyItem.getOwerElement().getXuiDataModel().getFilePath();
				String wFileFullDir = wFileFullPath.substring(0,wFileFullPath.lastIndexOf("/"));
				String selectFileDir = resultData.substring(0,resultData.lastIndexOf("/"));
				//if(wFileFullDir.endsWith(selectFileDir)){
				//	resultData = resultData.substring(resultData.lastIndexOf("/")+1);
				//}
				}catch(Exception e){
					e.printStackTrace();
				}
			map.put(this.propertyItem.getName(), resultData);
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

