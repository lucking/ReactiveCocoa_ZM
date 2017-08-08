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
import org.eclipse.swt.widgets.Label;

import swing2swt.layout.BorderLayout;

import com.justep.studio.ui.editors.util.PropertyEditorUtil;
import com.justep.studio.ui.editors.xui.IPropertyDialogPage;
import com.justep.studio.ui.editors.xui.IPropertyValueStrategy;
import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.ui.editors.xui.dialog.WidthDlg;
import com.justep.studio.ui.exjface.ComboButton;
import com.justep.studio.ui.exjface.TextButton;

public class BorderPage extends Composite implements IPropertyDialogPage {
		
	private PropertyItem propertyItem;
	private String returnValue;
	
	private IPropertyValueStrategy strategy;
	
	public BorderPage(Composite parent, int style) {
		super(parent, style);
		setLayout(new FillLayout());

		final Composite composite = new Composite(this, SWT.NONE);
		final GridLayout gridLayout = new GridLayout();
		gridLayout.numColumns = 2;
		composite.setLayout(gridLayout);

		final Label label1 = new Label(composite, SWT.NONE);
		label1.setText("宽度：");

		ComboButton width = new ComboButton(composite, SWT.NONE){
			@Override
			public Object openDialog() {
				WidthDlg dlg = new WidthDlg(getShell());
				int isOk = dlg.open();
				if(isOk == WidthDlg.OK){
					return dlg.getReturnValue();
				}
				return null;
			}			
		};
		Map widthParams = new HashMap();
		widthParams.put(ComboButton.ITEMS, new String[]{"thin","medium","thick"});
		width.init(widthParams);
		final GridData gd_width = new GridData(SWT.FILL, SWT.CENTER, true, false);
		width.setLayoutData(gd_width);
		
		final Label label2 = new Label(composite, SWT.NONE);
		label2.setText("样式：");
		
		final Composite composite_1 = new Composite(composite, SWT.NONE);
		composite_1.setLayout(new BorderLayout(0, 0));
		composite_1.setLayoutData(new GridData(SWT.FILL, SWT.CENTER, true, false));
		
		CCombo stl = new CCombo(composite_1, SWT.BORDER);
		stl.setItems(new String[]{"none","hidden","dotted","dashed","solid","double","groove","ridge"});		
		
		final GridData gd_stl = new GridData(SWT.FILL, SWT.CENTER, true, false);
		stl.setLayoutData(gd_stl);
		
		final Label label_1 = new Label(composite_1, SWT.NONE);
		label_1.setText("     ");
		label_1.setLayoutData(BorderLayout.EAST);
		
		final Label label3 = new Label(composite, SWT.NONE);
		label3.setText("颜色：");

		TextButton color = new TextButton(composite, SWT.NONE){
			@Override
			public Object openDialog() {
				ColorDialog dlg = new ColorDialog(getShell());
				RGB rgb = dlg.open();				
				return PropertyEditorUtil.getHexValue(rgb);
			}			
		};
		Map colorParams = new HashMap();
		color.init(colorParams);		
		final GridData gd_color = new GridData(SWT.FILL, SWT.CENTER, true, false);
		color.setLayoutData(gd_color);
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
