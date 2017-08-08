package com.justep.studio.ui.editors.propertypage;

import java.util.HashMap;
import java.util.Map;

import org.eclipse.swt.SWT;
import org.eclipse.swt.custom.CCombo;
import org.eclipse.swt.graphics.RGB;
import org.eclipse.swt.layout.FillLayout;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.ColorDialog;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.FileDialog;
import org.eclipse.swt.widgets.Label;

import swing2swt.layout.BorderLayout;

import com.justep.studio.ui.editors.util.PropertyEditorUtil;
import com.justep.studio.ui.editors.xui.IPropertyDialogPage;
import com.justep.studio.ui.editors.xui.IPropertyValueStrategy;
import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.ui.editors.xui.dialog.ValueDlg;
import com.justep.studio.ui.exjface.ComboButton;

public class BackgroundPage extends Composite implements IPropertyDialogPage {
	
	private PropertyItem propertyItem;
	private String returnValue;
	
	private IPropertyValueStrategy strategy;
	
	public BackgroundPage(Composite parent, int style) {
		super(parent, style);
		setLayout(new FillLayout());

		final Composite composite = new Composite(this, SWT.NONE);
		final GridLayout gridLayout = new GridLayout();
		gridLayout.numColumns = 2;
		composite.setLayout(gridLayout);

		final Label label1 = new Label(composite, SWT.NONE);
		label1.setText("颜色：");

		ComboButton width = new ComboButton(composite, SWT.NONE){
			@Override
			public Object openDialog() {
				ColorDialog dlg = new ColorDialog(getShell());
				RGB rgb = dlg.open();
				if(rgb!=null)
					return PropertyEditorUtil.getHexValue(rgb);
				return null;
			}			
		};
		Map widthParams = new HashMap();
		widthParams.put(ComboButton.ITEMS, new String[]{"transparent"});
		width.init(widthParams);
		final GridData gd_width = new GridData(SWT.FILL, SWT.CENTER, true, false);
		width.setLayoutData(gd_width);
		
		final Label label2 = new Label(composite, SWT.NONE);
		label2.setText("图片：");
		
		ComboButton image = new ComboButton(composite, SWT.NONE){
			@Override
			public Object openDialog() {
				FileDialog dlg = new FileDialog(getShell());
				String file = dlg.open();
				if(file!=null){
					StringBuilder sb = new StringBuilder();
					return sb.append("url(").append(file).append(")").toString();	
				}
				return null;
			}
		};
		Map imageParams = new HashMap();
		imageParams.put(ComboButton.ITEMS, new String[]{"none"});
		image.init(imageParams);
		final GridData gd_image = new GridData(SWT.FILL, SWT.CENTER, true, false);
		image.setLayoutData(gd_image);
		
		final Label label3 = new Label(composite, SWT.NONE);
		label3.setText("平铺：");
		
		final Composite composite_1 = new Composite(composite, SWT.NONE);
		composite_1.setLayout(new BorderLayout(0, 0));
		composite_1.setLayoutData(new GridData(SWT.FILL, SWT.CENTER, true, false));
		
		CCombo repeat = new CCombo(composite_1, SWT.BORDER);
		repeat.setItems(new String[]{"repeat","repeat-x","repeat-y","no-repeat"});		
		
		final GridData gd_repeat = new GridData(SWT.FILL, SWT.CENTER, true, false);
		repeat.setLayoutData(gd_repeat);
		
		final Label label_1 = new Label(composite_1, SWT.NONE);
		label_1.setText("     ");
		label_1.setLayoutData(BorderLayout.EAST);
		
		final Label label4 = new Label(composite, SWT.NONE);
		label4.setText("滚动：");
		
		final Composite composite_2 = new Composite(composite, SWT.NONE);
		composite_2.setLayout(new BorderLayout(0, 0));
		composite_2.setLayoutData(new GridData(SWT.FILL, SWT.CENTER, true, false));
		
		CCombo attchment = new CCombo(composite_2, SWT.BORDER);
		attchment.setItems(new String[]{"scroll","fixed"});		
		
		final GridData gd_attchment = new GridData(SWT.FILL, SWT.CENTER, true, false);
		attchment.setLayoutData(gd_attchment);
		
		final Label label_2 = new Label(composite_2, SWT.NONE);
		label_2.setText("     ");
		label_2.setLayoutData(BorderLayout.EAST);
		
		final Label label5 = new Label(composite, SWT.NONE);
		label5.setText("定位：");

		ComboButton position = new ComboButton(composite, SWT.NONE){
			@Override
			public Object openDialog() {
				ValueDlg dlg = new ValueDlg(getShell());
				int isOk = dlg.open();
				if(isOk == ValueDlg.OK)
					return dlg.getReturnValue();
				else
					return null;
			}			
		};
		Map positionParams = new HashMap();
		positionParams.put(ComboButton.ITEMS, new String[]{"top","center","bottom","left","right"});
		position.init(positionParams);
		final GridData gd_position = new GridData(SWT.FILL, SWT.CENTER, true, false);
		position.setLayoutData(gd_position);
	}

	public Object getReturnValue() {
		Map map = new HashMap();
		String propName = propertyItem.getName();
		map.put(propName, returnValue);
		return map;
	}

	public String isValid() {
		// TODO Auto-generated method stub
		return null;
	}

	public void setPropertyItem(PropertyItem propertyItem) {
		this.propertyItem = propertyItem;
	}

	public void setReturnValueStrategy(IPropertyValueStrategy strategy) {
		if(strategy!=null){
			this.strategy = strategy;
		}
	}

}
