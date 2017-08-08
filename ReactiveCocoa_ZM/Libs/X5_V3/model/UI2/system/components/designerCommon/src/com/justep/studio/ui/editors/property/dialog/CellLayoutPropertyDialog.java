package com.justep.studio.ui.editors.property.dialog;
import org.eclipse.jface.dialogs.Dialog;
import org.eclipse.jface.dialogs.IDialogConstants;
import org.eclipse.jface.dialogs.MessageDialog;
import org.eclipse.jface.window.Window;
import org.eclipse.swt.SWT;
import org.eclipse.swt.graphics.Point;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Control;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.swt.widgets.Text;

public class CellLayoutPropertyDialog extends Dialog {

	private Text textColumnWidth;
	private Text textRowHeight;

	private int columnWidth = 0;
	private int rowHeight = 0;

	/**
	 * Create the dialog
	 * @param parentShell
	 */
	public CellLayoutPropertyDialog(Shell parentShell) {
		super(parentShell);
	}

	/**
	 * Create contents of the dialog
	 * @param parent
	 */
	@Override
	protected Control createDialogArea(Composite parent) {
		Composite container = (Composite) super.createDialogArea(parent);
		final GridLayout gridLayout = new GridLayout();
		gridLayout.numColumns = 3;
		container.setLayout(gridLayout);
		final Label label = new Label(container, SWT.NONE);
		label.setText("行高:");

		textRowHeight = new Text(container, SWT.BORDER);
		if(this.rowHeight!=0){
			textRowHeight.setText(this.rowHeight+"");
		}
		final GridData gd_textRowHeight = new GridData(SWT.FILL, SWT.CENTER, true, false);
		gd_textRowHeight.widthHint = 142;
		textRowHeight.setLayoutData(gd_textRowHeight);

		final Label pxLabel = new Label(container, SWT.NONE);
		pxLabel.setText("px");

		final Label label_1 = new Label(container, SWT.NONE);
		label_1.setText("列宽:");

		textColumnWidth = new Text(container, SWT.BORDER);
		if(this.columnWidth!=0){
			textColumnWidth.setText(this.columnWidth+"");
		}
		final GridData gd_textColumnWidth = new GridData(SWT.FILL, SWT.CENTER, true, false);
		textColumnWidth.setLayoutData(gd_textColumnWidth);

		final Label pxLabel_1 = new Label(container, SWT.NONE);
		pxLabel_1.setText("px");
		//
		return container;
	}

	/**
	 * Create contents of the button bar
	 * @param parent
	 */
	@Override
	protected void createButtonsForButtonBar(Composite parent) {
		createButton(parent, IDialogConstants.OK_ID, IDialogConstants.OK_LABEL, true);
		createButton(parent, IDialogConstants.CANCEL_ID, IDialogConstants.CANCEL_LABEL, false);
	}

	/**
	 * Return the initial size of the dialog
	 */
	@Override
	protected Point getInitialSize() {
		return new Point(236, 138);
	}

	protected void configureShell(Shell newShell) {
		super.configureShell(newShell);
		newShell.setText("行高列宽");
	}

	public int getColumnWidth() {
		return columnWidth;
	}

	public void setColumnWidth(int columnWidth) {
		this.columnWidth = columnWidth;
	}

	public int getRowHeight() {
		return rowHeight;
	}

	public void setRowHeight(int rowHeight) {
		this.rowHeight = rowHeight;
	}

	@Override
	protected void buttonPressed(int buttonId) {
		if (buttonId == Window.OK) {
			boolean err = false;
			try {
				if(!textColumnWidth.getText().trim().equals("")){
					this.columnWidth = Integer.parseInt(textColumnWidth.getText());
					if(this.columnWidth<1){
						err = true;
					}
				}
				if(!textRowHeight.getText().trim().equals("")){
					this.rowHeight = Integer.parseInt(textRowHeight.getText());
					if(this.rowHeight<1 ){
						err = true;
					}
				}
			
			} catch (Exception e) {
				err = true;
			}
			if(!err){
				super.buttonPressed(buttonId);
			}else{
				MessageDialog.openError(this.getShell(), "提示", "请输入大于0的整数");
			}
			
		}else{
			super.buttonPressed(buttonId);
		}
		
	}

}
