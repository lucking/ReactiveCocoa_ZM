package com.justep.studio.ui.editors.xui.component;
import com.justep.studio.ui.editors.xui.OperationComponent;
import com.justep.studio.ui.editors.xui.XuiElement;

public class Window extends OperationComponent{
	
	public void newView(XuiElement currentElement) {
		XuiElement window = currentElement.getXuiDataModel().getRootElement();
		XuiElement viewE = currentElement.getXuiDataModel().addElement("view", window, null);
                viewE.setPropertyValue("style","width:100%;height:100%;");
	}
	
	public  void editOperatoions(XuiElement currentElement){
		XuiElement window = currentElement.getXuiDataModel().getRootElement();
		super.editOperatoions(window);
	}
}
