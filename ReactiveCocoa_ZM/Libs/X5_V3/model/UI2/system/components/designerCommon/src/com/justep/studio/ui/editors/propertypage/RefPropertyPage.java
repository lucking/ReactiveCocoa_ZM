package com.justep.studio.ui.editors.propertypage;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.eclipse.swt.SWT;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.events.SelectionListener;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.TabFolder;
import org.eclipse.swt.widgets.TabItem;
import org.eclipse.swt.widgets.Text;
import org.w3c.dom.Element;

import com.justep.studio.data.DataRecord;
import com.justep.studio.data.DataSet;
import com.justep.studio.data.DataSetChangedEvent;
import com.justep.studio.data.DataSetChangedListener;
import com.justep.studio.ui.commonpanel.CommonSelectorComposite;
import com.justep.studio.ui.editors.property.strategy.RefPropertyValueStrategy;
import com.justep.studio.ui.editors.util.XuiDynJavaManager;
import com.justep.studio.ui.editors.xui.IPropertyValueStrategy;
import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.ui.editors.xui.XuiElement;
//import com.justep.studio.ui.views.ConsoleView;
import com.justep.studio.util.JSONUtil;
/**
ref选择器：
1、根据组件查找上层节点判断是否有foreach，with（枚举：bind-foreach,bind-with和foreach类组件，list、tree等组件通过设计时描述增加类型component-type="foreach"）
2、如果组件在foreach，with上下文中并且选择data和foreach，with上下文data相同产生ref(...),label(...)引用，否则生成$model.data.ref(...),$model.data.label(...)
3、如果组件不在foreach，with上下文中生成data.ref(...),data.label(...)引用
4、支持hasLabel，可以选择label，默认true；
5、支持syncData，同步data属性，默认false；
6、type=foreach，强制指定foreach方式引用方式
7、isRelation=true，指定返回的是relation

目前不完整地方：
1、不支持嵌套，即$parent写法
2、不支持data-bind写法的分析
 */
public class RefPropertyPage extends CommonPropertyEditorPage {
	private IPropertyValueStrategy  strategyRef = new RefPropertyValueStrategy("ref");
	private IPropertyValueStrategy  strategyLabel = new RefPropertyValueStrategy("label");
	private IPropertyValueStrategy  strategyRelation = new RefPropertyValueStrategy("relation");
	private PropertyItem propertyItem;
	private Text displayText;
	private DataSet dataset;
	private boolean selectedRef = true;
	private boolean hasLabel = true;
	private boolean isForeachRef = false;
	private String foreachData = "";
	private boolean isRelation = false;
	private boolean syncData = false;
	private Map<String,String> editorParameter = new HashMap<String,String>();
	private String data = null;
	private String dataXID = "";

	public RefPropertyPage(Composite parent, int style) {
		super(parent, style);
	}
	
	private String getForeachRef(String str){
		if(isForeachRef){
			int idx = str.indexOf(".");
			String data = str.substring(0,idx);
			dataXID = data;
			if(-1<foreachData.indexOf(data))
				return str.substring(idx+1);
			else
				return "$model."+str;
		}else return str;
	}
	
	private void findForeachContext(XuiElement xuiElement){
		if(isRelation || isForeachRef) return;
		XuiElement xuiE = xuiElement.getParentElement();
		if(null!=xuiE){
			String componentType = xuiE.getComponentType();
			Element element = xuiE.getOriginElement();
			if(element.hasAttribute("bind-foreach")){
				isForeachRef = true;
				foreachData = element.getAttribute("bind-foreach"); 
			}else if(element.hasAttribute("bind-with")){
				isForeachRef = true;
				foreachData = element.getAttribute("bind-with"); 
			}else if("foreach".equalsIgnoreCase(componentType)){
				isForeachRef = true;
				String PRange = xuiE.getConfigAttribute("parent-range");
				foreachData = getComponentData(xuiE,PRange,"data");
			}else findForeachContext(xuiE);
		}
	}
	
	private String getComponentData(XuiElement xuiE, String PRange, String attr){
		String data = "";
		if(null!=xuiE){
			Element element = xuiE.getOriginElement();
			if(null!=PRange && !"".equals(PRange)){
				if(PRange.equals(element.getAttribute("component"))){
					data = element.getAttribute(attr);
					return null!=data?data:"";
				}else{
					data = getComponentData(xuiE.getParentElement(), PRange, attr);
					return null!=data?data:"";
				}
			}else{
				data = element.getAttribute(attr);
				return null!=data?data:"";
			}
		}
		return data;
	}
	
	private void createContents(){	
		TabFolder tabFolder = new TabFolder(this, SWT.NONE);
		tabFolder.setLayoutData(new GridData(SWT.FILL, SWT.FILL, true, true));
		  
		CommonSelectorComposite commonCompositeRef = new CommonSelectorComposite(tabFolder,SWT.NONE,false,true);
		commonCompositeRef.getTreeViewer().getTree().setLinesVisible(false);
		commonCompositeRef.getTreeViewer().getTree().setHeaderVisible(false);
		commonCompositeRef.setLayoutData(new GridData(SWT.FILL, SWT.FILL, true, true));
		commonCompositeRef.setDataSet(this.dataset);
		commonCompositeRef.getTreeViewer().expandAll();
		TabItem tabItem1 = new TabItem(tabFolder, SWT.NONE);
		tabItem1.setText("Ref");
		tabItem1.setControl(commonCompositeRef);
		 
		if(hasLabel){
			CommonSelectorComposite commonCompositeLabel = new CommonSelectorComposite(tabFolder,SWT.NONE,false,true);
			commonCompositeLabel.getTreeViewer().getTree().setLinesVisible(false);
			commonCompositeLabel.getTreeViewer().getTree().setHeaderVisible(false);
			commonCompositeLabel.setLayoutData(new GridData(SWT.FILL, SWT.FILL, true, true));
			commonCompositeLabel.setDataSet(this.dataset);
			commonCompositeLabel.getTreeViewer().expandAll();
			TabItem tabItem2 = new TabItem(tabFolder, SWT.NONE);
			tabItem2.setText("Label");
			tabItem2.setControl(commonCompositeLabel);
		}

		tabFolder.addSelectionListener(new SelectionListener(){			  
			   public void widgetDefaultSelected(SelectionEvent event) {
				   selectedRef = "Ref".equals(((TabItem)event.item).getText());
			   }			 
			   public void widgetSelected(SelectionEvent event) {
				   selectedRef = "Ref".equals(((TabItem)event.item).getText());
			   }});
		  
		Composite composite = new Composite(this, SWT.NONE);
		GridData gd_composite = new GridData(SWT.FILL, SWT.FILL, true, false);

		composite.setLayoutData(gd_composite);
		GridLayout gridLayout = new GridLayout();
		gridLayout.numColumns = 2;
		gridLayout.marginWidth = 0;
		gridLayout.marginHeight = 0;
		composite.setLayout(gridLayout);

		Label label = new Label(composite, SWT.NONE);
		label.setText("属性值");
		displayText = new Text(composite, SWT.BORDER);
		displayText.setLayoutData(new GridData(SWT.FILL, SWT.CENTER, true, false));

		displayText.setEditable(false);
		displayText.setBackground(displayText.getParent().getBackground());

        displayText.setText(this.propertyItem.getValue());
	}

	@SuppressWarnings("unchecked")
	public void setPropertyItem(PropertyItem propertyItem) {
		dataXID = "";
		//ConsoleView.println("==222==EditorParameter:"+propertyItem.getEditorParameter());
		this.editorParameter = (Map<String,String>)JSONUtil.deserialize(propertyItem.getEditorParameter());
		this.propertyItem = propertyItem;
		XuiElement xuiElement = ((XuiElement)propertyItem.getOwerElement());
		if(null!=this.editorParameter){
			if(null!=this.editorParameter.get("data")){
				this.data = xuiElement.getProperyValue(this.editorParameter.get("data"));
				if(null!=data && !"".equals(data)){
					this.data = this.data.replaceAll("\\$model.", "").replaceAll("\\$parent.", "");
					foreachData = this.data;
				}
			}
			if(!"true".equalsIgnoreCase(this.editorParameter.get("isRelation"))){
				this.isForeachRef = "foreachRef".equals(this.editorParameter.get("type"));
				this.hasLabel = !"false".equalsIgnoreCase(this.editorParameter.get("hasLabel"));
				this.isRelation = false;
			}else{
				this.hasLabel = false;
				this.isRelation = true;
			}
			this.syncData = "true".equalsIgnoreCase(this.editorParameter.get("syncData"));
		}
		findForeachContext(xuiElement);
		String className = propertyItem.getDialogDynData("class-name");
		String methodName = propertyItem.getDialogDynData("method");
		this.dataset = (DataSet)XuiDynJavaManager.executeMethod(propertyItem.getOwnerElementBasePath(), className, methodName,new Object[]{propertyItem});
		if(null!=data && !"".equals(data)){
			List<DataRecord> list = this.dataset.getData().get(0).getChildList();
			for(int i=list.size()-1;i>=0;i--){
				if(!data.equals(list.get(i).getString("xid"))) list.remove(i);
			}
		}

		if(this.dataset != null){
			this.dataset.addDataSetChangedListener(new DataSetChangedListener(){
				public void dataSetChanged(DataSetChangedEvent event) {
					if(event.getEventType() == DataSetChangedEvent.DATACHANGED || event.getEventType() == DataSetChangedEvent.SELECTIONCHANGED){
						String str = !isRelation?(selectedRef?strategyRef.transformPropertyValue(dataset):strategyLabel.transformPropertyValue(dataset)):strategyRelation.transformPropertyValue(dataset);
						if(!"UNCHANGED".equals(str)){
							if(str != null && !str.equals("") && isForeachRef){
								str = getForeachRef(str);
							}
							displayText.setText(str);
						}
					}
			}});
		}
		
		this.createContents();
	}

	public Map<String,String> getReturnValue() {
		String ref = displayText.getText();
		String data = "";
		if(ref != null && !ref.equals("")){
			int idx = ref.indexOf(".");
			if(idx>-1) data = ref.substring(0,idx);
			else data = dataXID;
		}

		Map<String,String> map = new HashMap<String,String>();		 
		map.put(this.propertyItem.getName(), ref);
		if(syncData && null!=data && !"".equals(data)) map.put("data", data);
		return map;
	}
}
