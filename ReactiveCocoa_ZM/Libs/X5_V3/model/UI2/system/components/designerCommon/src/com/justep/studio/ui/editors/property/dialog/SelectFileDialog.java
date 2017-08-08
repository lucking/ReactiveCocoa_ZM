package com.justep.studio.ui.editors.property.dialog;

import java.util.HashMap;
import java.util.Map;

import org.eclipse.swt.SWT;
import org.eclipse.swt.widgets.FileDialog;
import org.eclipse.swt.widgets.Shell;

import com.justep.studio.StudioPlugin2;
import com.justep.studio.ui.editors.xui.IPropertyDialog;
import com.justep.studio.ui.editors.xui.IPropertyValueStrategy;
import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.util.StudioConfig;

/**
 * XUI组件选择文件对话框
 * @author LINHONGBAO
 *
 */
public class SelectFileDialog implements IPropertyDialog {

	private FileDialog dlg = null;
	private Shell shell;
	private PropertyItem propertyItem;
	private String fileName;
	private String errMsg;
	private String uiPath;
	private String uiPath2;
	private String projectName;
	private String projectName2;

	public SelectFileDialog(Shell parent) {
		this.shell = parent;
	}

	private void createDialog() {
		this.dlg = new FileDialog(this.shell,SWT.OPEN);
		String param = this.propertyItem.getEditorParameter();
		fileName = this.propertyItem.getValue() == null ? "" : this.propertyItem.getValue();
		String baseURL = propertyItem.getOwerElement().getXuiDataModel().getFilePath();
		if (baseURL.startsWith(StudioConfig.getUIPath())) {
			uiPath = StudioConfig.getUIPath();
//			uiPath2 = StudioConfig.getMobileUIPath();
			projectName = StudioPlugin2.UI;
			//projectName2 = StudioPlugin2.MOBILE_UI;
		} else {
//			uiPath = StudioConfig.getMobileUIPath();
			uiPath2 = StudioConfig.getUIPath();
			//projectName = StudioPlugin2.MOBILE_UI;
			projectName2 = StudioPlugin2.UI;
		}

		if (param != null && !param.trim().equals("")) {
			String[] exts = param.trim().split(";");
			this.dlg.setFilterExtensions(exts);
		}
		
	}

	public void open() {
		if (this.dlg == null) {
			this.createDialog();
		}
 
		dlg.setFilterPath("c:\\");
		this.dlg.setFilterPath(uiPath);
		String fillPath = this.dlg.open();
		if (fillPath != null) {
			this.fileName = fillPath.replaceAll("\\\\", "/");
			if (this.fileName.indexOf(uiPath) == -1) {
				this.errMsg = "请选择" + projectName + "下文件！";
				return;
			}
			if (this.fileName.indexOf(uiPath) != -1) {
				this.fileName = "$UI"  + this.fileName.replace(uiPath, "");
			} else {
				this.fileName = "$UI"  + this.fileName.replace(uiPath2, "");
			}
		}
	}

	public Object getReturnValue() {
		Map<String, String> map = new HashMap<String, String>();
		map.put(this.propertyItem.getName(), this.fileName);
		return map;
	}

	public String isValid() {
		return this.errMsg;
	}

	public void setPropertyItem(PropertyItem propertyItem) {
		this.propertyItem = propertyItem;
	}

	public void setReturnValueStrategy(IPropertyValueStrategy strategy) {

	}

}
