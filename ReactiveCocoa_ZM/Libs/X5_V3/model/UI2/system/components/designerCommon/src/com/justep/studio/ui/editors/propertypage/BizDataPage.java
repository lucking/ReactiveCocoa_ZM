package com.justep.studio.ui.editors.propertypage;

import java.util.HashMap;
import java.util.Map;

import org.eclipse.jface.dialogs.IDialogConstants;
import org.eclipse.swt.SWT;
import org.eclipse.swt.events.ModifyEvent;
import org.eclipse.swt.events.ModifyListener;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Text;

import swing2swt.layout.BorderLayout;

import com.justep.studio.data.DataSet;
import com.justep.studio.ui.editors.xui.IPropertyDialogPage;
import com.justep.studio.ui.editors.xui.IPropertyValueStrategy;
import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.ui.editors.xui.dialog.CommonPopDialog;

public class BizDataPage extends Composite implements IPropertyDialogPage {
	public static final String CONTENT_CLASS = "com.justep.studio.ui.editors.propertypage.ActionsCompoiste";
	private DataSet dataset;
	private PropertyItem propertyItem;
	private Text text;
	private Button button;
	private String returnValue;
	
	private IPropertyValueStrategy strategy;
	
	public BizDataPage(Composite parent, int style) {
		super(parent, style);
		// TODO Auto-generated constructor stub
		this.createContents(this);
	}

	public Map getReturnValue() {
		Map map = new HashMap();
		String propName = propertyItem.getName();
		map.put(propName, returnValue);
//		if("reader".equals(propName)){
//			map.put("concept", this.getConceptAlias());
//		}
		return map;
	}

	public String isValid() {
		// TODO Auto-generated method stub
		return null;
	}

	public void setPropertyItem(PropertyItem propertyItem) {
		// TODO Auto-generated method stub
		this.propertyItem = propertyItem;		
		
	}
	
	private void createContents(Composite panel){
		panel.setLayout(new BorderLayout(0, 0));

		final Composite container = new Composite(panel, SWT.NONE);
		final GridLayout gridLayout = new GridLayout();
		gridLayout.numColumns = 3;
		container.setLayout(gridLayout);
		container.setLayoutData(BorderLayout.NORTH);

		final Label label = new Label(container, SWT.NONE);
		label.setText("动作：");

		text = new Text(container, SWT.BORDER);
		text.setLayoutData(new GridData(SWT.FILL, SWT.CENTER, true, false));

		button = new Button(container, SWT.NONE);
		button.setText("选择...");
		
		installListener();
	}
	
	private void installListener(){
		text.addModifyListener(new ModifyListener(){

			public void modifyText(ModifyEvent e) {
				// TODO Auto-generated method stub
				returnValue = text.getText();
			}
			
		});
		
		this.button.addSelectionListener(new SelectionAdapter(){
			public void widgetSelected(SelectionEvent e) {
				openDlg();
			}
		});		
	}	
	
	private void openDlg(){		
		CommonPopDialog dlg = new CommonPopDialog(this.getShell(),CONTENT_CLASS);
		dlg.setPropertyItem(propertyItem);
		dlg.setBlockOnOpen(true);
		int status = dlg.open();
		if(status == IDialogConstants.OK_ID){
			String returnValue = dlg.getReturnValue();
			text.setText(returnValue);
		}
	}
	
//	private String getConceptAlias(){
//		String cptAlias = "";
//		ActionModelManager manager = new ActionModelManager();
//		String moduleName = null;
//		String actionName = null;
//		int idx = this.returnValue.lastIndexOf("/");
//		if(idx!=-1){
//			moduleName = this.returnValue.substring(0,idx);
//			actionName = this.returnValue.substring(idx+1);
//		}
//		try {
//			if(moduleName!=null){
//				manager.reloadModule(StudioConfig.getBIZPath(), moduleName);
//				ActionModel model = manager.queryActionModel(actionName);
//				if(model==null){
//					cptAlias = model.getConcept().getAlias();
//				}
//			}			
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//				
//		return cptAlias;
//	}

	public void setReturnValueStrategy(IPropertyValueStrategy strategy) {
		if(strategy!=null){
			this.strategy = strategy;
		}
	}
}
