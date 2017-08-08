import java.util.HashMap;
import java.util.Map;

import org.eclipse.swt.SWT;
import org.eclipse.swt.custom.StyledText;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Label;

import com.justep.studio.ui.editors.xui.IPropertyDialogPage;
import com.justep.studio.ui.editors.xui.IPropertyValueStrategy;
import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.ui.editors.xui.W3cDocumentHelper;
import com.justep.studio.ui.editors.xui.XuiElement;

public class EditFilterPage extends Composite implements IPropertyDialogPage {

	private StyledText styledText;
	private PropertyItem propertyItem;
	
	public EditFilterPage(Composite parent, int style) {
		super(parent, style);
		setLayout(new GridLayout(1,false));

		final Label label = new Label(this, SWT.NONE);
		label.setLayoutData(new GridData(169, SWT.DEFAULT));
		label.setText("过滤条件：");

		styledText = new StyledText(this, SWT.BORDER|SWT.MULTI | SWT.V_SCROLL | SWT.H_SCROLL);
		styledText.setLayoutData(new GridData(SWT.FILL, SWT.FILL, true, true));
//		styledText.setFont(new Font(null,"宋体", 14,SWT.NONE));
		
	}

	public Object getReturnValue() {
		Map<String, String> map = new HashMap<String, String>();
		XuiElement filterElement = (XuiElement)this.propertyItem.getOwerElement();
		W3cDocumentHelper.setFullText(filterElement.getOriginElement(), styledText.getText(), true);//.setElementText(filterElement.getOriginElement(), filterValue);
		filterElement.getXuiDataModel().setDirty(true);
		return map;
	}

	public String isValid() {

		return null;
	}

	public void setPropertyItem(PropertyItem propertyItem) {
		this.propertyItem = propertyItem;
		XuiElement filterElement = (XuiElement)this.propertyItem.getOwerElement(); 
		String filterValue = W3cDocumentHelper.getFullText(filterElement.getOriginElement());
		filterValue = filterValue.replace("<![CDATA[", "");
		filterValue = filterValue.replace("]]>", "");
		styledText.setText(filterValue.trim());
	}

	public void setReturnValueStrategy(IPropertyValueStrategy strategy) {

	}

}
