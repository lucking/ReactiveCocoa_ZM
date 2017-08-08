package com.justep.studio.ui.editors.propertypage;

import java.util.HashMap;
import java.util.Map;

import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Composite;

import com.justep.studio.ui.editors.xui.IPropertyDialogPage;
import com.justep.studio.ui.editors.xui.IPropertyValueStrategy;
import com.justep.studio.ui.editors.xui.PropertyItem;

public class CommonPropertyEditorPage extends Composite implements IPropertyDialogPage {
 
	public CommonPropertyEditorPage(Composite parent, int style) {
		super(parent, style);
		GridLayout layout = new GridLayout();
		layout.marginHeight =0; 
		layout.marginWidth = 0; 
		this.setLayout(layout);
		this.setLayoutData(new GridData(GridData.FILL_BOTH));
	}
 
	public void propertyChanged(Object source, int propId) {

	}

	public String isValid() {
		return null;
	}

	public void setContainer(Composite parent) {
		
	}

	public void setPropertyItem(PropertyItem propertyItem) { }

	public Object getReturnValue() {
		Map<String,String> map = new HashMap<String,String>();		 
		return map;
	}

	public void setReturnValueStrategy(IPropertyValueStrategy strategy) {}

}
