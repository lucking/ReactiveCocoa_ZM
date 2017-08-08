package com.justep.studio.ui.editors.propertypage;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.eclipse.jface.dialogs.MessageDialog;
import org.eclipse.jface.window.Window;
import org.eclipse.swt.SWT;
import org.eclipse.swt.events.KeyAdapter;
import org.eclipse.swt.events.KeyEvent;
import org.eclipse.swt.events.MouseAdapter;
import org.eclipse.swt.events.MouseEvent;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.TableItem;
import org.eclipse.swt.widgets.Text;

import com.justep.design.model.Model;
import com.justep.design.model.ModelParser;
import com.justep.design.model.element.Action;
import com.justep.design.model.element.BaseMElement;
import com.justep.design.model.element.Concept;
import com.justep.design.model.element.IMElement;
import com.justep.design.model.element.Private;
import com.justep.design.model.element.Public;
import com.justep.studio.StudioPlugin2;
import com.justep.studio.data.DSUtil;
import com.justep.studio.data.DataColumn;
import com.justep.studio.data.DataRecord;
import com.justep.studio.data.DataSet;
import com.justep.studio.model.ModelManager;
import com.justep.studio.ui.commonpanel.CommonSelectorComposite;
import com.justep.studio.ui.commonpanel.TextFilterComposite;
import com.justep.studio.ui.editors.property.dialog.ActionDialog;
import com.justep.studio.ui.editors.util.XuiConstant;
import com.justep.studio.ui.editors.xui.IPropertyValueStrategy;
import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.ui.editors.xui.XuiDataModel;
import com.justep.studio.ui.editors.xui.XuiElement;
import com.justep.studio.ui.exjface.DataSetTableViewer;
import com.justep.studio.util.StudioConfig;

public class ConceptActionPage extends CommonPropertyEditorPage{
	private DataSet conceptDs;
	private DataSetTableViewer tableViewer;
 
	private Text readerText,writerText,creatorText,conceptText;
	private PropertyItem propertyItem;
	private HashMap<String,String> returnMap;
	private HashMap<String,String> actionMap;
	private String concept;
	private ActionDialog actionDialog;
	//private Composite parent;
	private TextFilterComposite filterText;
	
	public ConceptActionPage(Composite parent, int style) {
		super(parent, style);
	 	//this.parent = parent;
	}

	public void setPropertyItem(PropertyItem propertyItem) {
		this.propertyItem = propertyItem;
		concept = propertyItem.getValue();
		XuiElement xuiElement = (XuiElement)propertyItem.getOwerElement();
		XuiDataModel xuiModel = xuiElement.getXuiDataModel();
		String modelName = xuiModel.getModuleName();
		
		conceptDs = getConceptDataSet(modelName);
		if(conceptDs!=null){
			DataColumn dc = conceptDs.getDataColumn(DSUtil.SELECTED);
			if(dc != null){
				dc.setVisible(false);
			}		
		}else{
			MessageDialog.openInformation(StudioPlugin2.getShell(), "提示", "Model加载失败, BIZ"+modelName+"不存在.");
		}
		
		createContents();
		initText();
	}
	
	private void createContents(){
		CommonSelectorComposite commonComposite = new CommonSelectorComposite(this,SWT.NONE,false,false);
		commonComposite.setLayoutData(new GridData(SWT.FILL, SWT.FILL, true, true));
		commonComposite.setDataSet(conceptDs);
		tableViewer = commonComposite.getTableViewer();

        if(conceptDs != null){
//    		if(!"".equals(propertyItem.getValue())){ //此处在某些操作系统下回导致死循环
//    			int index = conceptDs.findRecord("label", propertyItem.getValue());
//    			commonComposite.getTableViewer().getTable().setSelection(index);
//    		}
    		
    		commonComposite.getTableViewer().getTable().addKeyListener(new KeyAdapter(){
				public void keyReleased(KeyEvent e) {
					if(e.keyCode == 102){
						filterText.getText().setFocus();						
					}
				}
			});
    		commonComposite.getTableViewer().getTable().addMouseListener(new MouseAdapter(){
    			public void mouseDown(MouseEvent e) {        				 
    				mouseDownHandler(); 
    			}
    		});
        }
        
        final Composite composite2 = new Composite(this, SWT.NONE);
		final GridLayout gridLayout2 = new GridLayout();
		gridLayout2.numColumns = 3;
		gridLayout2.marginHeight = 0;
		gridLayout2.marginWidth = 0;
		composite2.setLayout(gridLayout2);
		GridData gd_composite = new GridData(SWT.FILL, SWT.FILL, true, false);

		composite2.setLayoutData(gd_composite);

        final Label label1 = new Label(composite2, SWT.NONE);
		label1.setText("concept：");

		conceptText = new Text(composite2, SWT.BORDER);
		conceptText.setLayoutData(new GridData(SWT.FILL, SWT.CENTER, true, false));
		conceptText.setText(concept);

        new Label(composite2, SWT.NONE);
		
        final Label label2 = new Label(composite2, SWT.NONE);
		label2.setText("reader：");

		readerText = new Text(composite2, SWT.BORDER);
		readerText.setLayoutData(new GridData(SWT.FILL, SWT.CENTER, true, false));
		
		final Button button2 = new Button(composite2, SWT.NONE);
		button2.setText("...");
				
        final Label label3 = new Label(composite2, SWT.NONE);
		label3.setText("writer：");

		writerText = new Text(composite2, SWT.BORDER);
		writerText.setLayoutData(new GridData(SWT.FILL, SWT.CENTER, true, false));
		
		final Button button3 = new Button(composite2, SWT.NONE);
		button3.setText("...");
		
        final Label label4 = new Label(composite2, SWT.NONE);
		label4.setText("creator：");

		creatorText = new Text(composite2, SWT.BORDER);
		creatorText.setLayoutData(new GridData(SWT.FILL, SWT.CENTER, true, false));
		
		final Button button4 = new Button(composite2, SWT.NONE);
		button4.setText("...");
		
		button2.addSelectionListener(new SelectionAdapter(){
			public void widgetSelected(SelectionEvent e) {
				openActionDialog(readerText.getText(),readerText);
			}
		});		
		
		button3.addSelectionListener(new SelectionAdapter(){
			public void widgetSelected(SelectionEvent e) {
				openActionDialog(writerText.getText(),writerText);
			}
		});		

		button4.addSelectionListener(new SelectionAdapter(){
			public void widgetSelected(SelectionEvent e) {
				openActionDialog(creatorText.getText(),creatorText);
			}
		});		
	}

	private void openActionDialog(String action,Text targetText){	
		//if(actionDialog == null)
		actionDialog = new ActionDialog(this.getShell(), propertyItem);
		actionDialog.setBlockOnOpen(true);
		actionDialog.open();
	    if(actionDialog.getReturnCode() == Window.OK){
	    	targetText.setText(actionDialog.getResultData());
	    }
	}
	
	private void mouseDownHandler() {
		TableItem[] items = tableViewer.getTable().getSelection();
		if(items.length>0){
			Object data = items[0].getData();
			if(data instanceof DataRecord){
				DataRecord r = (DataRecord)data;
				concept = r.getString("label");
				conceptText.setText(concept);
			}	
		}		
		
		if(!"".equals(concept)){
			readerText.setText(getReaderAction(concept));
			writerText.setText(getWriterAction(concept));
			creatorText.setText(getCreatorAction(concept));
		}
		
	}
	
	public String getConeptName(Action action){
		List<IMElement> list = action.getAllChild();
		for(IMElement e:list){
			if(e instanceof Private || e instanceof Public){
				BaseMElement p = (BaseMElement)e;
				if("concept".equals(p.getProperty("name"))){
					return ""+p.getProperty("value");
				}
			}
		}
		return null;
	}
	
	public DataSet getConceptDataSet(String modelName){
		
		DataSet ds = null;
		//获取过滤重复的ontology model ,
		try{
			Model model = ModelManager.parseModel(StudioConfig.getBIZPath(), modelName);
			boolean extSpace = ModelManager.isInExtSpace(modelName,false);
			List<Model> processUseList = model.getUseList(); //get process model use list
			List<Model> includeList = model.getIncludeList();
			processUseList.addAll(includeList);
			HashMap<String, Model> ontologyMap = new HashMap<String,Model>();
			actionMap = new HashMap<String,String>();
			for(Model processMod :processUseList){
				String modName = processMod.getName();
				if (modName.indexOf("/system/") != -1) continue;
				//if (modName.indexOf("ontology") != -1) ontologyMap.put(modName, processMod);  
				Model actionModel = ModelParser.parseModel(StudioConfig.getBIZPath(),modName,new HashMap<String,Model>(), true, true,true,null,extSpace);
				List<Action> actionList = actionModel.getActionList();
				for(Action action :actionList){
					String targetConcept = getConeptName(action);
					if(targetConcept != null){
						actionMap.put(action.getName().substring(0,1)+"-"+targetConcept, action.getOwnerModelName()+"/"+action.getName());
					}else{
					   actionMap.put(action.getName(), action.getOwnerModelName()+"/"+action.getName());
					}
				}			
				List<Model> actionUseList = actionModel.getUseList(); //get action model use list
				actionUseList.addAll(actionModel.getIncludeList());
				for(Model ontologyMod:actionUseList){
					System.out.println(ontologyMod.getName());
					if (ontologyMod.getName().indexOf("/system/") == -1 || modelName.contains("OPM"))
						ontologyMap.put(ontologyMod.getName(), ontologyMod);
				}
			}
			
			//获取概念ds
			ds = createConceptColumn();
			for(String ontology:ontologyMap.keySet()){			
				List<Concept> conceptList = ontologyMap.get(ontology).getConceptList();
				for(Concept concept:conceptList){	
					ds.addRecord(new Object[] { concept.getName(), concept.getLocalLabelText()});
				}			
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}		
		
		return ds;		
	}
	
	public Object getReturnValue() {
		returnMap = new HashMap<String,String>();
		returnMap.put("concept", concept);
		returnMap.put(XuiConstant.P_READER, readerText.getText());
		returnMap.put("writer", writerText.getText());
		returnMap.put("creator", creatorText.getText());
		return returnMap;
	}
	
	public void initText(){ 
		
		XuiElement xblElement = (XuiElement) this.propertyItem.getOwerElement();
		XuiElement readerElement = (XuiElement) xblElement.getChildByTagName("reader");
		if(readerElement != null && readerElement.getProperyValue("action")!=null) 
			readerText.setText(readerElement.getProperyValue("action"));

		XuiElement writerElement = (XuiElement) xblElement.getChildByTagName("writer");
		if(writerElement != null && writerElement.getProperyValue("action") != null) 
			writerText.setText(writerElement.getProperyValue("action"));

		XuiElement creatorElement = (XuiElement) xblElement.getChildByTagName("creator");
		if(creatorElement != null && creatorElement.getProperyValue("action") != null) 
			creatorText.setText(creatorElement.getProperyValue("action"));
	
	}

	public DataSet createConceptColumn() {
		DataSet ds = new DataSet();
		DataColumn col1 = ds.addColumn("label", "概念名称", "string");
		col1.setLength(200);
		col1.setSearchField(true);
		col1.setSort(true);
		col1.setImage("concept.gif");
		col1.setDisenableFilterCondition("selected==true");

		col1 = ds.addColumn("name", "概念标识", "string");
		col1.setSearchField(true);
		col1.setSort(true);
		col1.setLength(200);
		return ds;
	}
	
	public String isValid() {
		
		return null;
	}

	public void setReturnValueStrategy(IPropertyValueStrategy strategy) {

	}
	
	public String getReaderAction(String concept){
		String s = actionMap.get("q-"+concept);
		if(s != null){
			return s;
		}
		s = actionMap.get("query" + concept + "Action");
		return s!=null?s:"";
	}
	
	public String getWriterAction(String concept){
		String s = actionMap.get("s-"+concept);
		if(s != null){
			return s;
		}
		 s = actionMap.get("save" + concept + "Action");
		return s!=null?s:"";
	}

	public String getCreatorAction(String concept){
		String s = actionMap.get("c-"+concept);
		if(s != null){
			return s;
		}
		s = actionMap.get("create" + concept + "Action");
		return s!=null?s:"";
	}	
}
