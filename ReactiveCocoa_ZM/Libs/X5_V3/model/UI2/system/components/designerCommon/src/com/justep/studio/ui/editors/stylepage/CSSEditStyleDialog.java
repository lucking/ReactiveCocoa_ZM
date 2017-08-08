package com.justep.studio.ui.editors.stylepage;

import java.util.ArrayList;
import java.util.List;

import org.eclipse.jface.dialogs.IDialogConstants;
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
public class CSSEditStyleDialog implements IPropertyDialog {

	private Shell shell;
	private StyleDialog styleDialog;
	private String resultData = "";
	private String cssContext;
	private String cssClassName = "";

	public CSSEditStyleDialog(Shell shell, String cssContext) {
		this.shell = shell;
		this.cssContext = cssContext;
	}

	private String filePath;
	private String editorParamter;

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public String getEditorParamter() {
		return editorParamter;
	}

	public void setEditorParamter(String editorParamter) {
		this.editorParamter = editorParamter;
	}

	public void open() {
		styleDialog = new StyleDialog(shell, "", 0, editorParamter, "添加样式");
		styleDialog.setCssContext(cssContext);
		if (styleDialog.open() == IDialogConstants.OK_ID) {
			cssClassName = styleDialog.getCssClassName();
			resultData = styleDialog.getResultData();
		}
	}

	public Object getReturnValue() {
		List<String> resuleList = new ArrayList<String>();
		resuleList.add(cssClassName);
		resuleList.add(resultData);
		return resuleList;
	}

	public String isValid() {
		return null;
	}

	public void setPropertyItem(PropertyItem propertyItem) {

	}

	public void setReturnValueStrategy(IPropertyValueStrategy strategy) {

	}

}
