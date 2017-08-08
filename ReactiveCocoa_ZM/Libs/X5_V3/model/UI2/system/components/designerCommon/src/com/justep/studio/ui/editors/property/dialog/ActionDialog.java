package com.justep.studio.ui.editors.property.dialog;

import org.eclipse.jface.dialogs.Dialog;
import org.eclipse.jface.dialogs.IDialogConstants;
import org.eclipse.swt.SWT;
import org.eclipse.swt.graphics.Point;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Control;
import org.eclipse.swt.widgets.Shell;

import com.justep.studio.data.DataSet;
import com.justep.studio.ui.editors.property.datasource.BizDataActionDatasource;
import com.justep.studio.ui.editors.propertypage.ActionsCompoiste;
import com.justep.studio.ui.editors.xui.PropertyItem;

public class ActionDialog extends Dialog {
	private DataSet dataset;
	private String returnValue;
	private ActionsCompoiste actionComposite;

	public ActionDialog(Shell parent, PropertyItem propertyItem) {
		super(parent);
		this.dataset = new BizDataActionDatasource()
				.getHasActionDatasource(propertyItem);
	}

	protected Control createDialogArea(Composite parent) {
		Composite container = (Composite) super.createDialogArea(parent);
		actionComposite = new ActionsCompoiste(container, SWT.NONE);
		actionComposite.setDataSet(dataset);
		return container;
	}

	protected void buttonPressed(int buttonId) {
		if (IDialogConstants.OK_ID == buttonId) {
			returnValue = actionComposite.getReturnValue() + "";
			okPressed();
		} else if (IDialogConstants.CANCEL_ID == buttonId) {
			cancelPressed();
		}
	}

	protected Point getInitialSize() {
		return new Point(500, 500);
	}

	protected void configureShell(Shell newShell) {
		super.configureShell(newShell);
		newShell.setText("选择Action");
	}

	public void setAciton(String action) {
		this.returnValue = action;
	}

	public String getResultData() {
		return returnValue;
	}
}
