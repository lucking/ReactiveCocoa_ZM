package com.justep.studio.ui.editors.propertypage;

import java.util.HashMap;
import java.util.Map;

import org.eclipse.swt.SWT;
import org.eclipse.swt.custom.ExtendedModifyEvent;
import org.eclipse.swt.custom.ExtendedModifyListener;
import org.eclipse.swt.custom.SashForm;
import org.eclipse.swt.custom.StyledText;
import org.eclipse.swt.events.ControlAdapter;
import org.eclipse.swt.events.ControlEvent;
import org.eclipse.swt.events.KeyAdapter;
import org.eclipse.swt.events.KeyEvent;
import org.eclipse.swt.events.PaintEvent;
import org.eclipse.swt.events.PaintListener;
import org.eclipse.swt.events.TraverseEvent;
import org.eclipse.swt.events.TraverseListener;
import org.eclipse.swt.layout.FillLayout;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Group;
import org.eclipse.swt.widgets.Table;

import swing2swt.layout.BorderLayout;

import com.justep.studio.data.DataSet;
import com.justep.studio.data.DataSetChangedEvent;
import com.justep.studio.data.DataSetChangedListener;
import com.justep.studio.ui.commonpanel.TextFilterComposite;
import com.justep.studio.ui.editors.property.strategy.DataIdStrategy;
import com.justep.studio.ui.editors.util.XuiDynJavaManager;
import com.justep.studio.ui.editors.xui.IPropertyDialogPage;
import com.justep.studio.ui.editors.xui.IPropertyValueStrategy;
import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.ui.editors.xui.XuiElement;
import com.justep.studio.ui.exjface.DataSetTableViewer;
import com.justep.studio.ui.exjface.DataSetTreeViewer;

public class DataPage extends Composite implements IPropertyDialogPage {
	
	private PropertyItem propertyItem;
	
	private DataSetTableViewer tableViewer;
	private DataSetTreeViewer treeViewer;
	
	private StyledText valueStyledText;
	private boolean painTextEditor = false;
	
	private DataSet dataset;
	private IPropertyValueStrategy strategy = new DataIdStrategy();
	
	private String value = "";

	private TextFilterComposite filterText;
	
	public DataPage(Composite parent, int style) {
		super(parent, style);
		// TODO Auto-generated constructor stub		
	}
	
	private void createContents(Composite container){		
		container.setLayout(new FillLayout(SWT.VERTICAL));
		final SashForm sashForm = new SashForm(container, SWT.VERTICAL);

		final Group group = new Group(sashForm, SWT.NONE);
		group.addControlListener(new ControlAdapter() {
			public void controlResized(final ControlEvent e) {
			}
		});
		group.setText("数据选择");
		group.setLayout(new FillLayout());
		
		final Group group1 = new Group(sashForm, SWT.NONE);
		group1.setLayout(new BorderLayout(0, 0));
		group1.setText("属性值");
 
		valueStyledText = new StyledText(group1, SWT.BORDER | SWT.MULTI | SWT.V_SCROLL | SWT.H_SCROLL);
		initTextEditor();

		final Composite composite_2 = new Composite(group, SWT.NONE);
		composite_2.setLayout(new BorderLayout(0, 0));
        if(this.dataset != null){
        	int style = this.dataset.getDisplayStyle();
        	if(style == DataSet.DISPLAY_STYLE_TABLE){
        		tableViewer = new DataSetTableViewer(composite_2, SWT.BORDER|SWT.FULL_SELECTION);
        		Table table = tableViewer.getTable();
        		table.setLayoutData(BorderLayout.CENTER);
        		table.setLinesVisible(true);
        		table.setHeaderVisible(true);
        		tableViewer.setDataSet(this.dataset);
        		installDatasetListener();
        		
        		tableViewer.getTable().addKeyListener(new KeyAdapter(){
					public void keyReleased(KeyEvent e) {
						if(e.keyCode == 102){
							filterText.getText().setFocus();
						}
					}});
        		treeViewer = null;
        	}else{
        		int visibleColCount = dataset.getVisibleColCount();
        		int treestyle = SWT.BORDER;
        		if(visibleColCount>1){
        			treestyle = SWT.BORDER | SWT.FULL_SELECTION;
        		}
        		treeViewer = new DataSetTreeViewer(composite_2, treestyle);
        		//.setDefineExpandLevel(1);
        		treeViewer.setDataset(dataset);
        		treeViewer.expandAll();
        		
        		this.dataset.addDataSetChangedListener(new DataSetChangedListener(){
        			public void dataSetChanged(DataSetChangedEvent event) {
        				if(event.getEventType() == DataSetChangedEvent.SELECTIONCHANGED){        					 
        					String str = strategy.transformPropertyValue(dataset);
        					if(!"UNCHANGED".equals(str)){
        						updateSytledText(str);
        					}
        				}
        			}
        		});
        		
        		treeViewer.getTree().addKeyListener(new KeyAdapter(){
					public void keyReleased(KeyEvent e) {
						if(e.keyCode == 102){ 
							filterText.getText().setFocus();
						}
					}});
        		tableViewer = null;
        	}
        }

		final Composite composite = new Composite(composite_2, SWT.NONE);
		final GridLayout gridLayout = new GridLayout();
		composite.setLayout(gridLayout);
		composite.setLayoutData(BorderLayout.NORTH);

		filterText = new TextFilterComposite(composite, SWT.NONE, true) {
			@Override
			public void doFilter(String text) {
				if(tableViewer != null){
					tableViewer.filter(filterText.getFilterText());
				}else if(treeViewer != null){
					treeViewer.filter(filterText.getFilterText());
				}
			}
		};
		filterText.setLayoutData(new GridData(SWT.FILL, SWT.FILL, true, false));

		filterText.getText().addTraverseListener(new TraverseListener(){
			public void keyTraversed(TraverseEvent e) {
				// TODO Auto-generated method stub
				if(e.keyCode == 16777218){
					if(treeViewer != null){
						treeViewer.getTree().setFocus();
						treeViewer.getTree().select(treeViewer.getTree().getItem(0));
					}else if(tableViewer != null){
						tableViewer.getTable().setFocus();
						tableViewer.getTable().select(0);
					}
				}else if(e.keyCode == 16777217){
					valueStyledText.setFocus();
				}
			}});
		filterText.getText().setFocus();
		sashForm.setWeights(new int[] {350, 100 });	
	}
	
	private void installDatasetListener(){
		this.dataset.addDataSetChangedListener(new DataSetChangedListener(){
			public void dataSetChanged(DataSetChangedEvent event) {
				if(event.getEventType() == DataSetChangedEvent.DATACHANGED || event.getEventType() == DataSetChangedEvent.SELECTIONCHANGED){
					String str = strategy.transformPropertyValue(dataset);
					if(!"UNCHANGED".equals(str)){
						updateSytledText(str);
					}
				}
				event.getDatarecord();
			}});
	}
	
	private void updateSytledText(String str){		
		valueStyledText.setText(str);
	}
	
	private void initTextEditor(){
        GridData spec = new GridData();
        spec.horizontalAlignment = GridData.FILL;
        spec.grabExcessHorizontalSpace = true;
        spec.verticalAlignment = GridData.FILL;
        spec.grabExcessVerticalSpace = true;
        valueStyledText.setLayoutData(spec);
        valueStyledText.addExtendedModifyListener(new ExtendedModifyListener() {
          public void modifyText(ExtendedModifyEvent e) {
            value = valueStyledText.getText();            
          }
        });
        
        valueStyledText.addPaintListener(new PaintListener(){
			public void paintControl(PaintEvent e) {
				if(!painTextEditor){					
					valueStyledText.setText(propertyItem.getValue());								
					painTextEditor =true;
				}
		}});

        valueStyledText.addTraverseListener(new TraverseListener(){
			public void keyTraversed(TraverseEvent e) {
				if(e.keyCode == 16777218){
					filterText.getText().setFocus();	 
				}
			}});
        valueStyledText.setLayoutData(BorderLayout.CENTER);
	}
	
	public void propertyChanged(Object source, int propId) {
		// TODO Auto-generated method stub

	}

	public String isValid() {
		// TODO Auto-generated method stub
		return null;
	}

	public void setContainer(Composite parent) {
		
	}

	public void setPropertyItem(PropertyItem propertyItem) {
		// TODO Auto-generated method stub
		this.propertyItem = propertyItem;
		XuiElement ownerE = (XuiElement)propertyItem.getOwerElement();
		String className = propertyItem.getDialogDynData("class-name");
		String methodName = propertyItem.getDialogDynData("method");
		this.dataset = (DataSet)XuiDynJavaManager.executeMethod(propertyItem.getOwnerElementBasePath(), className, methodName,new Object[]{propertyItem});
		this.createContents(this);
	}

	public Object getReturnValue() {
		Map map = new HashMap();
		map.put(this.propertyItem.getName(), this.value);
		return map;
	}

	public void setReturnValueStrategy(IPropertyValueStrategy strategy) {
		if(strategy!=null){
			this.strategy = strategy;
		}
	}

}
