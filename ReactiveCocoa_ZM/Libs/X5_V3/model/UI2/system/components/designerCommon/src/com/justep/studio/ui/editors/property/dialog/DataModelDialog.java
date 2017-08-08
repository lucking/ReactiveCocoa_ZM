package com.justep.studio.ui.editors.property.dialog;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.eclipse.swt.widgets.Shell;

import com.justep.studio.ui.dialogs.ModuleSelectDialog;
import com.justep.studio.ui.editors.AddModuleNotifier;
import com.justep.studio.ui.editors.xui.IPropertyDialog;
import com.justep.studio.ui.editors.xui.IPropertyValueStrategy;
import com.justep.studio.ui.editors.xui.PropertyItem;

public class DataModelDialog implements IPropertyDialog , AddModuleNotifier{
	
	private ModuleSelectDialog moduleSelectDialog;
	private Shell shell;
	private PropertyItem propertyItem;
	private String errMsg;
	private String dataModel = "";

	public DataModelDialog(Shell parent) {
		this.shell = parent;
	}
 
	public void open() {
		if(this.moduleSelectDialog==null){
			this.createDialog();
		}
		this.moduleSelectDialog.open();
		List<String> list = this.moduleSelectDialog.getReturnData();
		if(list!=null && list.size()>0){
			this.dataModel = list.get(0);
		}
	}

	private void createDialog() {
		this.moduleSelectDialog = new ModuleSelectDialog(this.shell,this);
	}

	public Object getReturnValue() {
		Map<String,String> map = new HashMap<String, String>();
		map.put(this.propertyItem.getName(), this.dataModel);
		return map;
	}

	public String isValid() {
		return errMsg;
	}

	public void setPropertyItem(PropertyItem propertyItem) {
		this.propertyItem = propertyItem;
	}

	public void setReturnValueStrategy(IPropertyValueStrategy strategy) {
		
	}

	public void addModule(String moduleName) {
		
	}

}
