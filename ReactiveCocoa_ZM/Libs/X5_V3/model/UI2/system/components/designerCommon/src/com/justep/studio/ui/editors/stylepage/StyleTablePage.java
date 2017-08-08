package com.justep.studio.ui.editors.stylepage;

import org.eclipse.swt.SWT;
import org.eclipse.swt.events.FocusEvent;
import org.eclipse.swt.events.FocusListener;
import org.eclipse.swt.events.KeyAdapter;
import org.eclipse.swt.events.KeyEvent;
import org.eclipse.swt.events.MouseAdapter;
import org.eclipse.swt.events.MouseEvent;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.events.SelectionListener;
import org.eclipse.swt.widgets.Combo;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Control;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Slider;
import org.eclipse.ui.forms.widgets.TableWrapData;
import org.eclipse.ui.forms.widgets.TableWrapLayout;

import com.justep.studio.ui.editors.xui.IPropertyDialogPage;
import com.justep.studio.ui.editors.xui.IPropertyValueStrategy;
import com.justep.studio.ui.editors.xui.PropertyItem;

/**
 * 表格
 * @author linhongbao
 *
 */
public class StyleTablePage extends Composite implements IPropertyDialogPage ,IStylePage{

	private Combo combo_border_spacingUnit;
	private Combo combo_caption_side;
	private Combo combo_empty_cells;
	private Combo combo_border_spacing;
	private Combo combo_border_collapse;
	private Combo combo_table_layout;
	private Slider slider_border_spacing;
	
	private StyleDialog styleDialog;
	private String styleValue;
	
	private String pageName = "表格";
	private Label tablelayoutLabel;
	private Label borderLabel;
	private Label borderspacingLabel;
	private Label emptyLabel;
	private Label captionsideLabel;
	
	public StyleTablePage(Composite parent, StyleDialog styleDialog, String styleValue, int style) {
		super(parent, style);
		this.styleDialog = styleDialog;
		this.styleValue = styleValue;
		this.initLayout();
		this.initDefaultValue();
		this.initSelfDefaultValue();
		this.registerEvent();
	}

	public Object getReturnValue() {
		return null;
	}

	public String isValid() {
		return null;
	}

	public void setPropertyItem(PropertyItem propertyItem) {
		
	}

	public void setReturnValueStrategy(IPropertyValueStrategy strategy) {
		
	}

	public void initDefaultValue() {
		
		combo_border_spacing.setItems(new String[]{"","inherit","(值)"});
		combo_border_spacingUnit.setItems(StyleCommonPropertyValue.NUMBER_UNIT_VALUE);
		combo_border_spacingUnit.select(0);
		
		combo_table_layout.setItems(new String[]{"","auto","fixed","inherit"});
		
		combo_border_collapse.setItems(new String[]{"","collapse","separate","inherit"});
		
		combo_empty_cells.setItems(new String[]{"","show","hide","inherit"});	
		
		combo_caption_side.setItems(new String[]{"","top","bottom","inherit"});	
		
		combo_border_spacingUnit.setEnabled(false);
		StyleCommonPropertyValue.initSlide(slider_border_spacing);
	}



	public void initLayout() {
		final TableWrapLayout tableWrapLayout = new TableWrapLayout();
		tableWrapLayout.numColumns = 4;
		setLayout(tableWrapLayout);

		tablelayoutLabel = new Label(this, SWT.NONE);
		tablelayoutLabel.setText("table-layout:");
		final TableWrapData tablelayoutLabelData = new TableWrapData(TableWrapData.RIGHT);
		tablelayoutLabel.setLayoutData(tablelayoutLabelData);

		combo_table_layout = new Combo(this, SWT.NONE);
		combo_table_layout.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
		combo_table_layout.setLayoutData(new TableWrapData(TableWrapData.FILL));

		new Label(this, SWT.NONE);
		new Label(this, SWT.NONE);

		borderLabel = new Label(this, SWT.NONE);
		borderLabel.setText("border-collapse:");
		final TableWrapData borderLabelData = new TableWrapData(TableWrapData.RIGHT);
		borderLabel.setLayoutData(borderLabelData);
		
		combo_border_collapse = new Combo(this, SWT.NONE);
		combo_border_collapse.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
		combo_border_collapse.setLayoutData(new TableWrapData(TableWrapData.FILL));
		new Label(this, SWT.NONE);
		new Label(this, SWT.NONE);

		borderspacingLabel = new Label(this, SWT.NONE);
		borderspacingLabel.setText("border-spacing:");
		final TableWrapData borderspacingLabelData = new TableWrapData(TableWrapData.RIGHT);
		borderspacingLabel.setLayoutData(borderspacingLabelData);

		combo_border_spacing = new Combo(this, SWT.NONE);
		combo_border_spacing.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
		combo_border_spacing.setLayoutData(new TableWrapData(TableWrapData.FILL));

		slider_border_spacing = new Slider(this, SWT.VERTICAL);
		final TableWrapData twd_slider_border_spacing = new TableWrapData(TableWrapData.LEFT, TableWrapData.TOP);
		twd_slider_border_spacing.heightHint = 20;
		slider_border_spacing.setLayoutData(twd_slider_border_spacing);

		combo_border_spacingUnit = new Combo(this, SWT.NONE);
		combo_border_spacingUnit.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		emptyLabel = new Label(this, SWT.NONE);
		emptyLabel.setText("empty-cells");
		final TableWrapData emptyLabelData = new TableWrapData(TableWrapData.RIGHT);
		emptyLabel.setLayoutData(emptyLabelData);

		combo_empty_cells = new Combo(this, SWT.NONE);
		combo_empty_cells.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
		combo_empty_cells.setLayoutData(new TableWrapData(TableWrapData.FILL));
		new Label(this, SWT.NONE);
		new Label(this, SWT.NONE);

		captionsideLabel = new Label(this, SWT.NONE);
		captionsideLabel.setText("caption-side:");
		final TableWrapData captionsideLabelData = new TableWrapData(TableWrapData.RIGHT);
		captionsideLabel.setLayoutData(captionsideLabelData);

		combo_caption_side = new Combo(this, SWT.NONE);
		combo_caption_side.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
		combo_caption_side.setLayoutData(new TableWrapData(TableWrapData.FILL));
		new Label(this, SWT.NONE);
		new Label(this, SWT.NONE);
	}

	public void initSelfDefaultValue() {
		boolean hashDefaultValue = false;
		if(styleValue==null||"".equals(styleValue)){
			return;
		}
		if(StyleCommonPropertyValue.setComboValueIndex("table-layout", combo_table_layout, styleValue)){
			hashDefaultValue = true;
		}
		if(StyleCommonPropertyValue.setComboValueIndex("border-collapse", combo_border_collapse, styleValue)){
			hashDefaultValue = true;
		}
		if(StyleCommonPropertyValue.setComboValueIndex("empty-cells", combo_empty_cells, styleValue)){
			hashDefaultValue = true;
		}
		if(StyleCommonPropertyValue.setComboValueIndex("caption-side", combo_caption_side, styleValue)){
			hashDefaultValue = true;
		}
		if(StyleCommonPropertyValue.setComboValueIndexWithUnit("border-spacing", combo_border_spacing,slider_border_spacing ,combo_border_spacingUnit,styleValue)){
			hashDefaultValue = true;
		}
		if(hashDefaultValue){
			styleDialog.updateKindListShow(pageName);
		}
	}

	private MouseAdapter mouseAdapter = new MouseAdapter() {
		public void mouseDown(MouseEvent e) {
			if (combo_border_spacing.isFocusControl()) {
				sbNumberInputConfirm();
			}
		}
	};
	
	private void sbNumberInputConfirm() {
		String comboText = combo_border_spacing.getText();
		if(StyleCommonPropertyValue.matchesNumber(comboText)){
			int num = Integer.valueOf(comboText);
			if(!combo_border_spacingUnit.getEnabled()){
				combo_border_spacingUnit.setEnabled(true);
			}
			slider_border_spacing.setSelection(StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE-num);
			styleDialog.setPropertyValue(pageName,"border-spacing", comboText+combo_border_spacingUnit.getItem(combo_border_spacingUnit.getSelectionIndex()));
		}
	}
	
	private void mouseEvent(Control control) {
		control.addMouseListener(mouseAdapter);
	}
	
	public void registerEvent() {
		
		mouseEvent(this);
		mouseEvent(tablelayoutLabel);
		mouseEvent(borderLabel);
		mouseEvent(borderspacingLabel);
		mouseEvent(emptyLabel);
		mouseEvent(captionsideLabel);
		combo_table_layout.addSelectionListener(new SelectionListener(){
			public void widgetDefaultSelected(SelectionEvent e) {
			}
			public void widgetSelected(SelectionEvent e) {
				int index = combo_table_layout.getSelectionIndex();
				if (index != -1) {
					styleDialog.setPropertyValue(pageName,"table-layout", combo_table_layout.getItem(index));
				}
			}
		});
		combo_border_collapse.addSelectionListener(new SelectionListener(){
			public void widgetDefaultSelected(SelectionEvent e) {
			}
			public void widgetSelected(SelectionEvent e) {
				int index = combo_border_collapse.getSelectionIndex();
				if (index != -1) {
					styleDialog.setPropertyValue(pageName,"border-collapse", combo_border_collapse.getItem(index));
				}
			}
		});
		combo_empty_cells.addSelectionListener(new SelectionListener(){
			public void widgetDefaultSelected(SelectionEvent e) {
			}
			public void widgetSelected(SelectionEvent e) {
				int index = combo_empty_cells.getSelectionIndex();
				if (index!=-1) {
					styleDialog.setPropertyValue(pageName,"empty-cells", combo_empty_cells.getItem(index));
				}
			}
		});
		combo_caption_side.addSelectionListener(new SelectionListener(){
			public void widgetDefaultSelected(SelectionEvent e) {
			}
			public void widgetSelected(SelectionEvent e) {
				int index = combo_caption_side.getSelectionIndex();  
				if (index != -1) {
					styleDialog.setPropertyValue(pageName,"caption-side", combo_caption_side.getItem(index));
				}
			}
		});
		
		combo_border_spacing.addSelectionListener(new SelectionListener(){
			public void widgetDefaultSelected(SelectionEvent e) {
			}
			public void widgetSelected(SelectionEvent e) {
				int index = combo_border_spacing.getSelectionIndex();
				if(index==combo_border_spacing.getItems().length-1){
					combo_border_spacingUnit.setEnabled(true);
				}
				else if(index!=-1){
					combo_border_spacingUnit.setEnabled(false);
					StyleCommonPropertyValue.initSlide(slider_border_spacing);
					styleDialog.setPropertyValue(pageName,"border-spacing", combo_border_spacing.getItem(combo_border_spacing.getSelectionIndex()));
				}
			}
		});
		combo_border_spacing.addFocusListener(new FocusListener(){
			public void focusGained(FocusEvent e) {
			}
			public void focusLost(FocusEvent e) {
				sbNumberInputConfirm();
			}
		});
		combo_border_spacing.addKeyListener(new KeyAdapter() {
			public void keyPressed(KeyEvent e) {
				if (e.keyCode == SWT.CR | e.keyCode==SWT.KEYPAD_CR) {
					sbNumberInputConfirm();
				}
			}
		});

		slider_border_spacing.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}
			public void widgetSelected(SelectionEvent e) {
				if(!combo_border_spacingUnit.getEnabled()){
					combo_border_spacingUnit.setEnabled(true);
				}
				int intSelect = new Integer(slider_border_spacing.getSelection());
				combo_border_spacing.setText((StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE-intSelect)+"");
				styleDialog.setPropertyValue(pageName,"border-spacing", combo_border_spacing.getText()+combo_border_spacingUnit.getItem(combo_border_spacingUnit.getSelectionIndex()));
			}
		});
		combo_border_spacingUnit.addSelectionListener(new SelectionListener(){
			public void widgetDefaultSelected(SelectionEvent e) {
			}
			public void widgetSelected(SelectionEvent e) {
				if(!combo_border_spacing.getText().equals("(值)")){
					styleDialog.setPropertyValue(pageName,"border-spacing", combo_border_spacing.getText()+combo_border_spacingUnit.getItem(combo_border_spacingUnit.getSelectionIndex()));
				}
			}
		});
	}

}
