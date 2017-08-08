package com.justep.studio.ui.editors.property.dialog;


import org.eclipse.jface.dialogs.Dialog;
import org.eclipse.jface.dialogs.IDialogConstants;
import org.eclipse.jface.dialogs.MessageDialog;
import org.eclipse.swt.SWT;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Control;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.swt.widgets.Text;
import org.eclipse.ui.dialogs.ContainerSelectionDialog;

import com.justep.studio.ui.dialogs.SingleFileSelectComposite;
import com.justep.studio.ui.dialogs.SingleFileSelectResult;
import com.justep.studio.util.StudioConfig;
	   
public class FileTreeDialog extends Dialog implements SingleFileSelectResult{
	
	private Text text;
	private String editParam;
	private String resultData;
	private Shell shell;
	private String selfFilePath;
	
	private SingleFileSelectComposite searchFileComposite;
	
	public String getResultData() {
		return resultData;
	}

	@Override
	public int open() {
		return super.open();
	}

	public FileTreeDialog(Shell parentShell) {
		super(parentShell);
		this.shell = parentShell;
		resultData = "";
	}
	
	public FileTreeDialog(Shell parentShell,String editParam,String selfFilePath) {
		super(parentShell);
		this.editParam = editParam;
		this.shell = parentShell;
		resultData = "";
		this.selfFilePath = selfFilePath;
	}
	
	@Override
	protected void createButtonsForButtonBar(Composite parent) {
		//createButton(parent, 1000, "测试",false);
		createButton(parent, IDialogConstants.OK_ID, "确定",false);
		createButton(parent, IDialogConstants.CANCEL_ID,"取消", false);
	}

	protected void buttonPressed(int buttonId) {
		if (IDialogConstants.OK_ID == buttonId) {
			if(resultData.length()==0){
				MessageDialog.openError(this.shell, "提示", "请选择一个文件！");
				return;
			}
			okPressed();
		} else if (IDialogConstants.CANCEL_ID == buttonId) {
			resultData = "";
			cancelPressed();
		}
		else if(1000==buttonId){
			//测试Start
			System.out.println("点击测试==");
			ContainerSelectionDialog co = new ContainerSelectionDialog(this.shell,null,true,"");
			co.open();
			//测试Start
		}
	}
	
	@Override
	protected Control createDialogArea(Composite parent) {
		parent.getShell().setText("选择文件");
		Composite composite = new Composite(parent, SWT.NONE);
		composite.setLayout(new GridLayout());
		composite.setLayoutData(new GridData(SWT.FILL, SWT.CENTER, true, false));
		searchFileComposite = new SingleFileSelectComposite(composite,SWT.NONE,this.editParam, this,StudioConfig.getRootPath(selfFilePath));
		final GridData gd_searchFileComposite = new GridData(SWT.FILL, SWT.CENTER, true, false);
		gd_searchFileComposite.heightHint = 371;
		gd_searchFileComposite.widthHint = 448;
		searchFileComposite.setLayoutData(gd_searchFileComposite);
		text = new Text(composite, SWT.BORDER);
		text.setLayoutData(new GridData(SWT.FILL, SWT.CENTER, true, false));
		return composite;
	}
	
	protected void configureShell(Shell newShell) {
		super.configureShell(newShell);
		newShell.setText("选择文件");
	}

	public void setResultData(String resultData){
		this.resultData = resultData;
		text.setText(resultData);
	}

	public String getSelfFilePath() {
		return this.selfFilePath;
	}
}

