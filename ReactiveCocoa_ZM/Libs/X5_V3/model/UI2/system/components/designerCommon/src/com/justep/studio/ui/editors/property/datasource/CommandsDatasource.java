package com.justep.studio.ui.editors.property.datasource;

import java.util.ArrayList;
import java.util.List;

import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.ui.editors.xui.XuiDataModel;
import com.justep.studio.ui.editors.xui.XuiDataModelChangedEvent;
import com.justep.studio.ui.editors.xui.XuiDataModelChangedListener;
import com.justep.studio.ui.editors.xui.XuiElement;
import com.justep.studio.ui.editors.xui.propeditor.PropertyComboCellEditor;


public class CommandsDatasource {
    
	XuiDataModel dataModel;
	XuiElement currentXuiElement;
	PropertyItem propertyItem;
	
	List<String[]> idList = new ArrayList();

	public List getList(PropertyItem propertyItem){
		this.propertyItem = propertyItem;
		String parameter = propertyItem.getEditorParameter();
		
		if(parameter != null && parameter.equals("commands")){
			return getCommandsId();
		}else if(parameter != null && parameter.equals("command")){
			return getCommandName();
		}
		return new ArrayList();
	}
	
	public List getCommandsId(){
		idList.clear();
		List<XuiElement> list = propertyItem.getOwerElement().getXuiDataModel().getRootElement().getAllChildrenByComponentType("commands");
	    for(XuiElement e:list){
	    	idList.add(new String[]{e.getId(),e.getId()});
	    }
	    attachDataChangedListener();
	    return idList;
	}

	public List getCommandName(){
		idList.clear();
		XuiElement xblElement = (XuiElement) propertyItem.getOwerElement();
		String commandsId = xblElement.getProperyValue("commands");

		List<XuiElement> list = propertyItem.getOwerElement().getXuiDataModel().getRootElement().getAllChildrenByComponentType("commands");
	    for(XuiElement e:list){
	    	if(e.getId().equals(commandsId)){
	    		List<XuiElement> commandlist = e.getChildren();
	    		for(XuiElement command:commandlist){
	    			idList.add(new String[]{command.getProperyValue("name"),command.getProperyValue("name")});
	    		}
	    		return idList;
	    	}
	    }

	    return idList;
	}

	public void attachDataChangedListener(){
		currentXuiElement = (XuiElement)propertyItem.getOwerElement();
		if(dataModel == null){
			dataModel = (XuiDataModel)propertyItem.getOwerElement().getDataModel();
			dataModel.addXuiDataChangedListener(new XuiDataModelChangedListener(){

				public void xuiDataModelChanged(XuiDataModelChangedEvent arg0) {
					if(arg0.getEventType() == XuiDataModelChangedEvent.DATACHANGED){
						 XuiElement currentE = arg0.getCurrentNode();
						if(currentE == currentXuiElement && "commands".equals(arg0.getPropData().getName())){
							PropertyItem prop = currentE.getPropertyItem("command");
							if(prop != null){
								currentE.getDataModel().setPropertyValue(currentE, prop, "");
								prop.updateCellEditorValue();
								if(prop.getCellEditor() instanceof PropertyComboCellEditor){
									PropertyComboCellEditor cellEditor = (PropertyComboCellEditor)prop.getCellEditor();
									cellEditor.setItems(getCommandName());
								}
							}
						}
					}
					
				}});
		}
	}
}
