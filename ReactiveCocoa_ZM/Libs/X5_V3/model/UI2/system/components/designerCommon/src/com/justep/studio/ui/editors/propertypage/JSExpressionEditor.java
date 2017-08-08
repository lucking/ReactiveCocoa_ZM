package com.justep.studio.ui.editors.propertypage;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.dom4j.Document;
import org.dom4j.Element;
import org.eclipse.jface.viewers.IColorProvider;
import org.eclipse.jface.viewers.ISelectionChangedListener;
import org.eclipse.jface.viewers.ITableLabelProvider;
import org.eclipse.jface.viewers.LabelProvider;
import org.eclipse.jface.viewers.SelectionChangedEvent;
import org.eclipse.jface.viewers.TreeViewer;
import org.eclipse.swt.SWT;
import org.eclipse.swt.custom.SashForm;
import org.eclipse.swt.custom.StyledText;
import org.eclipse.swt.dnd.DND;
import org.eclipse.swt.dnd.DragSource;
import org.eclipse.swt.dnd.DragSourceAdapter;
import org.eclipse.swt.dnd.DragSourceEvent;
import org.eclipse.swt.dnd.DropTarget;
import org.eclipse.swt.dnd.DropTargetAdapter;
import org.eclipse.swt.dnd.DropTargetEvent;
import org.eclipse.swt.dnd.TextTransfer;
import org.eclipse.swt.dnd.Transfer;
import org.eclipse.swt.events.KeyAdapter;
import org.eclipse.swt.events.KeyEvent;
import org.eclipse.swt.events.MouseAdapter;
import org.eclipse.swt.events.MouseEvent;
import org.eclipse.swt.events.PaintEvent;
import org.eclipse.swt.events.PaintListener;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.events.TraverseEvent;
import org.eclipse.swt.events.TraverseListener;
import org.eclipse.swt.graphics.Color;
import org.eclipse.swt.graphics.Image;
import org.eclipse.swt.graphics.Point;
import org.eclipse.swt.layout.FillLayout;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Group;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.ToolBar;
import org.eclipse.swt.widgets.ToolItem;
import org.eclipse.swt.widgets.Tree;

import com.alibaba.fastjson.JSONObject;
import com.justep.studio.data.DataRecord;
import com.justep.studio.data.DataSet;
import com.justep.studio.ui.commonpanel.TextFilterComposite;
import com.justep.studio.ui.editors.util.ImageManager;
import com.justep.studio.ui.editors.xui.IPropertyDialogPage;
import com.justep.studio.ui.editors.xui.IPropertyValueStrategy;
import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.ui.editors.xui.W3cDocumentHelper;
import com.justep.studio.ui.editors.xui.XuiDataSourceManager;
import com.justep.studio.ui.editors.xui.XuiElement;
import com.justep.studio.ui.editors.xui.js.JsModelClass;
import com.justep.studio.ui.exjface.DataSetTreeViewer;
import com.justep.studio.util.FileHelper;
import com.justep.studio.util.StudioConfig;
/**
 * js表达式编辑器.
 * @author Administrator
 *
 */
public class JSExpressionEditor extends Composite implements IPropertyDialogPage {

	private StyledText styledText;
	private PropertyItem propData;
 
	private DataSetTreeViewer treeViewerData;
	private Tree treeData;

	private DataSetTreeViewer treeViewerXpath;
	private Tree treeXpath;

	private DataSet dataset;

	private boolean painTextEditor = false;
//	private RefPropertyValueStrategy refStrategy = new RefPropertyValueStrategy();
	private TextFilterComposite filterText1;
	private TextFilterComposite filterText2;

	/**
	 * Create contents of the dialog
	 * @param parent
	 */
	public JSExpressionEditor(Composite parent, int style) {
		super(parent, style);
		this.setSize(700, 550);
		this.setLayout(new FillLayout(SWT.VERTICAL));

		final SashForm sashForm = new SashForm(this, SWT.VERTICAL);

		final Group group = new Group(sashForm, SWT.NONE);
		group.setText("数据选择");
		group.setLayout(new FillLayout());
		final SashForm sashFormUp = new SashForm(group, SWT.NONE);

		final Composite compositeUpData = new Composite(sashFormUp, SWT.NONE);
		GridLayout gridLayoutUpData = new GridLayout();
		gridLayoutUpData.marginHeight = 0;
		gridLayoutUpData.marginWidth = 0;
		compositeUpData.setLayout(gridLayoutUpData);

		final Label label1 = new Label(compositeUpData, SWT.NONE);
		label1.setText("数据选择区(选择拖动到编辑区)");
		label1.setLayoutData(new GridData(SWT.FILL, SWT.FILL, true, false));

		filterText1 = new TextFilterComposite(compositeUpData, SWT.NONE, true) {
			@Override
			public void doFilter(String text) {
				if (treeViewerData != null) {
					treeViewerData.filter(filterText1.getFilterText());
				}
			}
		};
		filterText1.setLayoutData(new GridData(SWT.FILL, SWT.FILL, true, false));
		filterText1.getText().addTraverseListener(new TraverseListener() {
			public void keyTraversed(TraverseEvent e) {
				if (e.keyCode == 16777218) {
					if (treeViewerData != null) {
						treeViewerData.getTree().setFocus();
						treeViewerData.getTree().select(treeViewerData.getTree().getItem(0));
					}
				} else if (e.keyCode == 16777217) {
					styledText.setFocus();
				}
			}
		});

		treeViewerData = new DataSetTreeViewer(compositeUpData, SWT.BORDER);
		treeData = treeViewerData.getTree();
		treeData.addMouseListener(new MouseAdapter(){

			public void mouseDoubleClick(MouseEvent arg0) {
				addValue(getFunPath(treeData));
			} });
		treeData.setLayoutData(new GridData(SWT.FILL, SWT.FILL, true, true));
		initDataTreeViwer(treeViewerData);

		final Composite compositeDown = new Composite(sashForm, SWT.NONE);
		GridLayout gridLayoutDown = new GridLayout();
		gridLayoutDown.marginHeight = 0;
		gridLayoutDown.marginWidth = 0;
		gridLayoutDown.verticalSpacing = 0;
		compositeDown.setLayout(gridLayoutDown);

		Label label = new Label(compositeDown, SWT.NULL);
		label.setText("（运算符两边用空格隔开）");
		
		final ToolBar toolBar = new ToolBar(compositeDown, SWT.RIGHT |SWT.FLAT);

		final ToolItem newItemToolItem = new ToolItem(toolBar, SWT.PUSH);
		newItemToolItem.setText(" + ");
		newItemToolItem.setToolTipText("加");

		newItemToolItem.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent event) {
				addValue("+");
			}
		});

		final ToolItem newItemToolItem_1 = new ToolItem(toolBar, SWT.PUSH);
		newItemToolItem_1.setText(" - ");
		newItemToolItem_1.setToolTipText("减");
		newItemToolItem_1.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent event) {
				addValue("-");
			}
		});

		final ToolItem newItemToolItem_2 = new ToolItem(toolBar, SWT.PUSH);
		newItemToolItem_2.setText(" * ");
		newItemToolItem_2.setToolTipText("乘");
		newItemToolItem_2.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent event) {
				addValue("*");
			}
		});

		final ToolItem newItemToolItem_3 = new ToolItem(toolBar, SWT.PUSH);
		newItemToolItem_3.setText("/");
		newItemToolItem_3.setToolTipText("除");
		newItemToolItem_3.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent event) {
				styledText.replaceTextRange(styledText.getCaretOffset(), 0, "/");
				styledText.setSelection(styledText.getText().length(), styledText.getText().length()+1);
			}
		});

		final ToolItem newItemToolItem_13 = new ToolItem(toolBar, SWT.PUSH);
		newItemToolItem_13.setText("%");
		newItemToolItem_13.setToolTipText("求模");
		newItemToolItem_13.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent event) {
				addValue("%");
			}
		});

//		final ToolItem newItemToolItem_4 = new ToolItem(toolBar, SWT.PUSH);
//		newItemToolItem_4.setText(" | ");
//		newItemToolItem_4.setToolTipText("节点集或");
//		newItemToolItem_4.addSelectionListener(new SelectionAdapter() {
//			public void widgetSelected(SelectionEvent event) {
//				styledText.replaceTextRange(styledText.getCaretOffset(), 0, "|");
//			}
//		});

		final ToolItem newItemToolItem_5 = new ToolItem(toolBar, SWT.PUSH);
		newItemToolItem_5.setText("&&");
		newItemToolItem_5.setToolTipText("与");
		newItemToolItem_5.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent event) {
				addValue("&&");
			}
		});

		final ToolItem newItemToolItem_6 = new ToolItem(toolBar, SWT.PUSH);
		newItemToolItem_6.setText(" || ");
		newItemToolItem_6.setToolTipText("表达式或");
		newItemToolItem_6.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent event) {
				addValue("||");
			}
		});

		final ToolItem newItemToolItem_7 = new ToolItem(toolBar, SWT.PUSH);
		newItemToolItem_7.setText(" = ");
		newItemToolItem_7.setToolTipText("等于");
		newItemToolItem_7.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent event) {
				addValue("=");
			}
		});

		final ToolItem newItemToolItem_8 = new ToolItem(toolBar, SWT.PUSH);
		newItemToolItem_8.setText(" != ");
		newItemToolItem_8.setToolTipText("不等于");
		newItemToolItem_8.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent event) {
				addValue("!=");
			}
		});

		final ToolItem newItemToolItem_9 = new ToolItem(toolBar, SWT.PUSH);
		newItemToolItem_9.setText(" > ");
		newItemToolItem_9.setToolTipText("大于");
		newItemToolItem_9.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent event) {
				addValue(">");
			}
		});

		final ToolItem newItemToolItem_10 = new ToolItem(toolBar, SWT.PUSH);
		newItemToolItem_10.setText(" >= ");
		newItemToolItem_10.setToolTipText("大于等于");
		newItemToolItem_10.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent event) {
				addValue(">=");
			}
		});

		final ToolItem newItemToolItem_11 = new ToolItem(toolBar, SWT.PUSH);
		newItemToolItem_11.setText(" < ");
		newItemToolItem_11.setToolTipText("小于");
		newItemToolItem_11.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent event) {
				addValue("<");
			}
		});

		final ToolItem newItemToolItem_12 = new ToolItem(toolBar, SWT.PUSH);
		newItemToolItem_12.setText(" <= ");
		newItemToolItem_12.setToolTipText("小于等于");
		newItemToolItem_12.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent event) {
				addValue("<=");
			}
		});

//		final ToolItem newItemToolItem_15 = new ToolItem(toolBar, SWT.PUSH);
//		newItemToolItem_15.setText("添加");
//		newItemToolItem_15.setImage(ImageManager.getIconByFileName("add.gif"));
//		newItemToolItem_15.addSelectionListener(new SelectionAdapter() {
//			public void widgetSelected(SelectionEvent e) {
//				if (treeViewerData.getTree().getSelection().length > 0) {
//					DataRecord dataRecord = (DataRecord) treeViewerData.getTree().getSelection()[0].getData();
//					String name = dataRecord.getString("name");
//					String value = "";
//					if (name != null && !name.equals("")) {
//						value = name;
//					} else {
//						value = refStrategy.getRelationPath(dataRecord);
//					}
//					styledText.replaceTextRange(styledText.getCaretOffset(), 0, value);
//				}
//				if (treeViewerXpath.getTree().getSelection().length > 0) {
//					DataRecord dataRecord = (DataRecord) treeViewerXpath.getTree().getSelection()[0].getData();
//					String name = dataRecord.getString("name");
//					String value = "";
//					if (name != null && !name.equals("")) {
//						value = name;
//					} else {
//						value = refStrategy.getRelationPath(dataRecord);
//					}
//					styledText.replaceTextRange(styledText.getCaretOffset(), 0, value);
//				}
//			}
//		});

		final ToolItem newItemToolItem_14 = new ToolItem(toolBar, SWT.PUSH);
		newItemToolItem_14.setText("清除");
		newItemToolItem_14.setImage(ImageManager.getIconByFileName("remove.gif"));
		newItemToolItem_14.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent event) {
				styledText.setText("");
			}
		});

		styledText = new StyledText(compositeDown, SWT.BORDER | SWT.MULTI | SWT.V_SCROLL | SWT.H_SCROLL);
		styledText.setLayoutData(new GridData(SWT.FILL, SWT.FILL, true, true));
		initTextEditor();

		final Composite compositeUpXpath = new Composite(sashFormUp, SWT.NONE);
		GridLayout gridLayoutUpXpath = new GridLayout();
		gridLayoutUpXpath.marginHeight = 0;
		gridLayoutUpXpath.marginWidth = 0;
		compositeUpXpath.setLayout(gridLayoutUpXpath);

		final Label label9 = new Label(compositeUpXpath, SWT.NONE);
		label9.setText("函数选择区(选择拖动到编辑区)");
		label9.setLayoutData(new GridData(SWT.FILL, SWT.FILL, true, false));

		filterText2 = new TextFilterComposite(compositeUpXpath, SWT.NONE, true) {
			@Override
			public void doFilter(String text) {
				if (treeViewerXpath != null) {
					treeViewerXpath.filter(filterText2.getFilterText());
				}
			}
		};

		treeViewerXpath = new DataSetTreeViewer(compositeUpXpath, SWT.BORDER);
		treeXpath = treeViewerXpath.getTree();
		treeXpath.setLayoutData(new GridData(SWT.FILL, SWT.FILL, true, true));
		initMidTreeViwer(treeViewerXpath);
		treeXpath.addMouseListener(new MouseAdapter() {
			public void mouseDoubleClick(MouseEvent arg0) {
				addValue(getFunPath(treeXpath));
			}
		});
		
		filterText2.setLayoutData(new GridData(SWT.FILL, SWT.FILL, true, false));
		filterText2.getText().addTraverseListener(new TraverseListener() {
			public void keyTraversed(TraverseEvent e) {
				if (e.keyCode == 16777218) {
					if (treeViewerXpath != null) {
						treeViewerXpath.getTree().setFocus();
						treeViewerXpath.getTree().select(treeViewerXpath.getTree().getItem(0));
					}
				} else if (e.keyCode == 16777217) {
					styledText.setFocus();
				}
			}
		});
		sashFormUp.setWeights(new int[] { 202, 289 });
		sashForm.setWeights(new int[] { 350, 100 });

	}
	
	private void addValue(String value){
		styledText.replaceTextRange(styledText.getCaretOffset(), 0," "+value);
		styledText.setSelection(styledText.getText().length(), styledText.getText().length()+1);
	}

	private void initTextEditor() {

		styledText.addPaintListener(new PaintListener() {
			public void paintControl(PaintEvent e) {
				if (!painTextEditor) {
					String value = propData.getValue();
					if(value != null && !value.equals("")){
						value = value.trim();
						if(value.startsWith("js:")){
							value = value.substring(3);
						}
					}
					styledText.setText(value);
					painTextEditor = true;
				}
			}
		});

		styledText.addTraverseListener(new TraverseListener() {
			public void keyTraversed(TraverseEvent e) {
				if (e.keyCode == 16777218) {
					filterText2.getText().setFocus();
				}
			}
		});

		DropTarget dt = new DropTarget(styledText, DND.DROP_MOVE);
		dt.setTransfer(new Transfer[] { TextTransfer.getInstance() });
		dt.addDropListener(new DropTargetAdapter() {
			public void drop(DropTargetEvent event) {
				Point p = styledText.getSelection();
				styledText.replaceTextRange(p.x, 0, " "+(String) event.data);
				styledText.setSelection(styledText.getText().length(), styledText.getText().length()+1);
			}
		});
	}
	
	private String getPath(DataRecord record){
		List<String> list = new ArrayList<String>();
		while(record != null){
			if(record.getBoolean("asPath")){
				list.add(record.getString("name"));
			}
			record = record.getParent();
		}
		StringBuffer sbf = new StringBuffer();
		for(int i = list.size()-1;i>=0;i-=1){
			sbf.append("."+list.get(i));
		}
		
		if(sbf.length()>0){
			return sbf.toString().substring(1);
		}
		return "";
	}

	private void initMidTreeViwer(TreeViewer treeViewer) {
		DragSource ds = new DragSource(treeXpath, DND.DROP_MOVE);
		ds.setTransfer(new Transfer[] { TextTransfer.getInstance() });
		ds.addDragListener(new DragSourceAdapter() {
			public void dragSetData(DragSourceEvent event) {
				event.data = getFunPath(treeXpath); 
			}
		});
		
		treeViewer.getTree().addKeyListener(new KeyAdapter() {
			public void keyReleased(KeyEvent e) {
				if (e.keyCode == 102) {
					filterText2.getText().setFocus();
				}
			}
		});
		
		treeViewer.addSelectionChangedListener(new ISelectionChangedListener() {
			public void selectionChanged(SelectionChangedEvent event) {
				if (!treeViewerXpath.getSelection().isEmpty() && treeViewerXpath.getTree().getSelection().length != 0) {
					treeViewerData.setSelection(null);
				}
			}
		});
	}

	private void initDataTreeViwer(TreeViewer treeViewer) {
		DragSource ds = new DragSource(treeData, DND.DROP_MOVE);
		ds.setTransfer(new Transfer[] { TextTransfer.getInstance() });
		ds.addDragListener(new DragSourceAdapter() {
			public void dragSetData(DragSourceEvent event) {
				event.data = getFunPath(treeData);
			}
		});
		treeViewer.getTree().addKeyListener(new KeyAdapter() {
			public void keyReleased(KeyEvent e) {
				if (e.keyCode == 102) {
					filterText1.getText().setFocus();
				}
			}
		});
		treeViewer.addSelectionChangedListener(new ISelectionChangedListener() {
			public void selectionChanged(SelectionChangedEvent event) {
				if (!treeViewerData.getSelection().isEmpty() && treeViewerData.getTree().getSelection().length != 0) {
					treeViewerXpath.setSelection(null);
				}
			}
		});
	}
	
	private String getFunPath(Tree tree){
		if(tree == treeXpath){
			DataRecord record = (DataRecord) tree.getSelection()[0].getData();
			return getPath(record);
		}
		DataRecord record = (DataRecord) tree.getSelection()[0].getData();
		String path = "";
		String nodeType = record.getString("nodeType");
		if("method".equals(record.getString("nodeType"))){
			DataRecord pRecord = record.getParent();
			if(pRecord != null && "relation".equals(pRecord.getString("nodeType"))){
				path = getPath(record.getParent().getParent())+"."+record.getString("name")+"(\""+pRecord.getString("name")+"\")";
			}else{
				path = getPath(record);
			}
		}else if("relation".equals(nodeType)){
			path = getPath(record.getParent())+".val(\""+record.getString("name")+"\")";
		}else{
			path = getPath(record);
		}
		return path;
	}

	private DataSet createDataSet() {
		DataSet dataset = new DataSet();
		dataset.setFireDataChangedEvent(false);
		dataset.setDisplayStyle(DataSet.DISPLAY_STYLE_TREE);
		dataset.addColumn("nodeType", "nodeType", "string").setVisible(false);
		dataset.addColumn("name", "name", "string").setSearchField(true).setVisible(false);
		dataset.addColumn("text", "text", "string").setTreeColumn(true).setLength(1000);
		dataset.addColumn("asPath", "asPath", "string").setVisible(false);
		dataset.addColumn("image", "image", "string").setVisible(false);
		return dataset;
	}

 

	public DataSet getCommonFunctionDataset() {
		dataset = createDataSet();

		String xpath = "funcs";
		getData(xpath, dataset);

		dataset.setFireDataChangedEvent(true);
		return dataset;
	}

 

	public Object getReturnValue() {
		Map<String, String> map = new HashMap<String, String>();
		String value = styledText.getText();
		if(value != null && !value.equals("")){
			value = "js:"+value;
		}
		map.put(this.propData.getName(), value);
		return map;
	}

	public String isValid() {
		return null;
	}
	
	String forearchData ,ownerData;

	public void setPropertyItem(PropertyItem propertyItem) {
		this.propData = propertyItem;
		this.forearchData = this.getForeachData();
		this.ownerData = this.getOwnerData();
		
		DataSet dataset = buildVarDataset();
		treeViewerData.setDataset(dataset);
		treeViewerData.expandToLevel(2);
		treeViewerXpath.setDataset(getCommonFunctionDataset());
		treeViewerXpath.expandToLevel(2);
	}

	public void setReturnValueStrategy(IPropertyValueStrategy arg0) {
		
	}
	
	/**
	 * 根据上下文获取变量列表.
	 * @return
	 */
	private String getVars(){
		String vars = "$model";
		if(this.forearchData != null && !this.forearchData.equals("")){
			vars += ",$object";
			if(this.forearchData.split(",").length>1){
				vars += ",$parent";
			}
		}else if(this.ownerData != null){
			vars += ",$data,$row,$val,$col";
		}
		return vars;
	}
	
	/**
	 * 构建内置对象函数.
	 * @param dataset
	 * @param currentComp
	 */
	private DataSet buildVarDataset(){
		XuiElement currentComp = (XuiElement)this.propData.getOwerElement();
		DataSet dataset = createDataSet();

		JSONObject editorParamObj = null;
		String editorParameter = this.propData.getEditorParameter();
		if(editorParameter != null && !editorParameter.equals("")){
			editorParamObj = JSONObject.parseObject(editorParameter);
		}
		String vars = "";
		if(editorParamObj != null){
			vars = editorParamObj.getString("vars");//优先配置的参数	
		}
		
		if(vars == null || vars.equals("")){
			vars = this.getVars();// 没有配置变量则根据上下文自动获取
		}
		 
		if(vars != null){
			String[] varItems = vars.split(",");
			for(String item:varItems){
				DataRecord varRecord = dataset.addRecord(new Object[]{"var",item,item,true,"var.gif"});
				if("$data".equals(item) || "$row".equals(item)){
					DataSet currentDataSet = XuiDataSourceManager.getDataRelationDataSet(currentComp,true);
					List<DataRecord> relationList = currentDataSet.getData();
					createRelationNode(varRecord,relationList);
				}else if("$model".equals(item)){
					DataSet tempDataset = XuiDataSourceManager.getAllDataRelationTreeDataSet(currentComp);
					List<DataRecord> rootList = tempDataset.getData();
					if(rootList == null){
						continue;
					}
					List<DataRecord> dataList = rootList.get(0).getChildList();
					for(DataRecord rc:dataList){
						DataRecord dataRc = new DataRecord(new Object[]{"data",rc.getString("xid"),rc.getString("text"),true,"data.gif"},varRecord);
						List<DataRecord> relationList = rc.getChildList();
						createRelationNode(dataRc,relationList);
					}
					buildModelFunction(varRecord);
				}else if("$object".equals(item) || "$parent".equals(item)){
					int idx = "$object".equals(item)?1:2;
					String[] dataList = this.forearchData.split(",");
					
					XuiElement dataE = currentComp.getXuiDataModel().findElementById(dataList[dataList.length-idx]);
					if(dataE != null){
						DataSet currentDataSet = XuiDataSourceManager.getDataRelationDataSet(dataE,true);
						List<DataRecord> relationList = currentDataSet.getData();
						createRelationNode(varRecord,relationList);
					}
				} 
			}
			if(this.forearchData != null){
				String[] dataList = this.forearchData.split(",");
				if(dataList.length>2){
					DataRecord varRecord = dataset.addRecord(new Object[]{"var","$parent.$parent","$parent.$parent",true,"var.gif"});
					XuiElement dataE = currentComp.getXuiDataModel().findElementById(dataList[dataList.length-3]);
					if(dataE != null){
						DataSet currentDataSet = XuiDataSourceManager.getDataRelationDataSet(dataE,true);
						List<DataRecord> relationList = currentDataSet.getData();
						createRelationNode(varRecord,relationList);
					}
				}
			}
		}
 
		return dataset;
		//DataRecord functionRecord = new DataRecord(new Object[]{"function","test","test",true,"method.gif"},varRecord);
	}
	
	/**
	 * 获取model下的函数列表.
	 * @param parentRecord
	 */
	private void buildModelFunction(DataRecord parentRecord){
		XuiElement ownerElement = (XuiElement)this.propData.getOwerElement();
		String wContent = W3cDocumentHelper.asXML(ownerElement.getXuiDataModel().getRootElement().getOriginElement());
		String wFilePath = ownerElement.getXuiDataModel().getFilePath();
		String jsFilePath = wFilePath.substring(0,wFilePath.lastIndexOf("."))+".js";
		File jsFile = new File(jsFilePath);
		if(jsFile.exists()){
			String content = FileHelper.readFileAsStr(jsFile.getAbsolutePath(),"UTF-8",false);
			JsModelClass modeClass = new JsModelClass(content,new ArrayList<String>());
			List<String> methodList = modeClass.getMethodWithParamList(true);
			for(String method:methodList){
				if(wContent.indexOf("\""+method.substring(0,method.indexOf("("))+"\"") == -1){//排除事件类型的函数
					new DataRecord(new Object[]{"method",method,method,true,"method.gif"},parentRecord);					
				}
			}
		}
	}
	
	/**
	 * 获取所在的foreach所绑定的数据名称，返回空，说明不再foreach里面.
	 * @return
	 */
	private String getForeachData(){
		XuiElement xuiE = ((XuiElement)(this.propData.getOwerElement())).getParentElement();
		if(null == xuiE){
			return null;
		}
		String sData = "";
		while(xuiE != null){
			org.w3c.dom.Element element = xuiE.getOriginElement();
			if(element.hasAttribute("bind-foreach")){
				sData = element.getAttribute("bind-foreach")+","+sData; 
			}else if(element.hasAttribute("bind-with")){
				sData = element.getAttribute("bind-with")+","+sData; ; 
			}else if("foreach".equalsIgnoreCase(xuiE.getComponentType())){
				String PRange = xuiE.getConfigAttribute("parent-range");
				sData = getComponentData(xuiE,PRange,"data")+","+sData; ; ;
			}
			xuiE = xuiE.getParentElement();
		}
		if(!"".equals(sData)){
			sData = sData.substring(0,sData.length()-1);
		}
		return sData;
	}
	
	/*
	 * 获取所属的数据的xid.
	 */
	private String getOwnerData(){
		XuiElement xuiE = ((XuiElement)(this.propData.getOwerElement()));
		if(null == xuiE){
			return null;
		}
		while(xuiE != null){
			if("data".equals(xuiE.getComponentType())){
				return xuiE.getProperyValue("xid");
			}
			xuiE = xuiE.getParentElement();
		}
		return null;
	}

	private String getComponentData(XuiElement xuiE, String PRange, String attr){
		String data = "";
		if(null!=xuiE){
			org.w3c.dom.Element element = xuiE.getOriginElement();
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
	
	private void createRelationNode(DataRecord parentRc,List<DataRecord> relationList){
		for(DataRecord relation:relationList){
			String label = relation.getString("label");
			if(label == null || label.equals("")){
				label = relation.getString("text");
			}
			String name = relation.getString("name");
			if(name == null || name.equals("")){
				name = relation.getString("xid");
			}
			if(label == null || label.equals("")){
				label = name;
			}else if(!name.equals(label)){
				label = name+"("+label+")";
			}
			DataRecord relationRc = new DataRecord(new Object[]{"relation",name,label,true,"relation.gif"},parentRc);
			//relationRc.canFilt("false");
			relationRc.setAlwaysDisplayChild(true);
			createMethodNode(relationRc);
		}
	}
	
	private void createMethodNode(DataRecord parentRc){
		new DataRecord(new Object[]{"method","ref","ref",true,"relation.gif"},parentRc);
		new DataRecord(new Object[]{"method","val","val",true,"relation.gif"},parentRc);
		new DataRecord(new Object[]{"method","label","label",true,"relation.gif"},parentRc);
	}
	
	private void getData(String xpath,DataSet dataset){
		Document doc = FileHelper.getXmlDocument( StudioConfig.getUIPath()+"/system/components/designerCommon/propEdtorPages/jsExpressionEditor/expressionFuns.xml");
		Element funcE = (Element)doc.getRootElement().selectSingleNode(xpath);
		if(funcE!=null){
			@SuppressWarnings("unchecked")
			List<Element> items = funcE.selectNodes("item");
			for(Element itemE : items){
				String nodeType = itemE.attributeValue("nodeType");
				String name = itemE.attributeValue("name");
				String text = itemE.attributeValue("text");
				Boolean asPath = "false".equals(itemE.attributeValue("asPath"))?false:true;
				String image = itemE.attributeValue("image");
				if(image == null || image.equals("")){
					image = "folder.gif";
				}
				DataRecord record = dataset.addRecord(new Object[]{nodeType,name,text,asPath,image});
				@SuppressWarnings("unchecked")
				List<Element> list = itemE.selectNodes("item");
				for(Element childE : list){
					buildData(childE,record);
				}
			}
		}
	}
	
	private static void buildData(Element itemE,DataRecord pRrecord){
		String nodeType = itemE.attributeValue("nodeType");
		String name = itemE.attributeValue("name");
		String text = itemE.attributeValue("text");
		Boolean asPath = "false".equals(itemE.attributeValue("asPath"))?false:true;
		String image = "method.gif";//itemE.attributeValue("image");
		DataRecord parent = new DataRecord(new Object[]{nodeType,name,text,asPath,image},pRrecord);
		@SuppressWarnings("unchecked")
		List<Element> list = itemE.selectNodes("item");
		for(Element childE : list){
			buildData(childE,parent);
		}
	}
	
	class TableLabelProvider extends LabelProvider implements ITableLabelProvider, IColorProvider {
		public String getColumnText(Object element, int columnIndex) {
			String[] data = (String[]) element;
			return data[columnIndex];
		}

		public Image getColumnImage(Object element, int columnIndex) {
			Image image = new Image(null, 1, 16);

			return image;
		}

		public Color getBackground(Object element) {
			return null;
		}

		public Color getForeground(Object element) {
			return null;
		}
	}

}
