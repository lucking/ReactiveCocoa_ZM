package com.justep.studio.ui.editors.stylepage;

import org.eclipse.swt.SWT;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.events.SelectionListener;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Combo;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Label;
import org.eclipse.ui.forms.widgets.TableWrapData;
import org.eclipse.ui.forms.widgets.TableWrapLayout;

import com.justep.studio.ui.editors.xui.IPropertyDialogPage;
import com.justep.studio.ui.editors.xui.IPropertyValueStrategy;
import com.justep.studio.ui.editors.xui.PropertyItem;

/**
 * 列表
 * @author linhongbao
 *
 */
public class StyleListPage extends Composite implements IPropertyDialogPage ,IStylePage {

	private Combo combo_position;
	private Combo combo_image;
	private Combo combo_type;
	
	private StyleDialog styleDialog;
	private Button button_image;
	private Composite parent;
	private String styleValue;
	private String pageName = "列表";
	/*.w文件路径剧UI的深度*/
	private int deep;
	
	public StyleListPage(Composite parent, StyleDialog styleDialog, String styleValue, int style) {
		super(parent, style);
		this.parent = parent;
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
		combo_type.setItems(new String[]{"","disc","circle","square","decimal","decimal-leading-zero","lower-roman","upper-roman","lower-greek",
				"lower-latin","upper-latin","armenian","georgian","lower-alpha","upper-alpha","none","inherit"});
		
		combo_position.setItems(new String[]{"","inside","outside","inherit"});
		
		combo_image.setItems(StyleCommonPropertyValue.FILE_DEFINED_VALUE);
	
	}

	public void initLayout() {

		TableWrapLayout tableLatout = new TableWrapLayout();
		tableLatout.numColumns = 4;
		setLayout(tableLatout);
		

		final Label liststyletypeLabel = new Label(this, SWT.NONE);
		liststyletypeLabel.setLayoutData(new TableWrapData(TableWrapData.RIGHT));
		liststyletypeLabel.setText("list-style-type:");

		combo_type = new Combo(this, SWT.NONE);
		combo_type.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
		combo_type.setLayoutData(new TableWrapData(TableWrapData.FILL));

		final Label label = new Label(this, SWT.NONE);
		label.setText("               ");

		new Label(this, SWT.NONE);

		final Label liststyleimageLabel = new Label(this, SWT.NONE);
		liststyleimageLabel.setLayoutData(new TableWrapData(TableWrapData.RIGHT));
		liststyleimageLabel.setText("list-style-image:");

		TableWrapData twd_combo_image = new TableWrapData(TableWrapData.FILL);
		twd_combo_image.colspan = 2;
		
		combo_image = new Combo(this, SWT.NONE);
		combo_image.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
		combo_image.setLayoutData(twd_combo_image);

		button_image = new Button(this, SWT.NONE);
		button_image.setText("浏览...");

		final Label liststylepositionLabel = new Label(this, SWT.NONE);
		liststylepositionLabel.setLayoutData(new TableWrapData(TableWrapData.RIGHT));
		liststylepositionLabel.setText("list-style-position:");

		combo_position = new Combo(this, SWT.NONE);
		combo_position.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
		combo_position.setLayoutData(new TableWrapData(TableWrapData.FILL));
	}

	public void initSelfDefaultValue() {
		boolean hashDefaultValue = false;
		if(styleValue==null||"".equals(styleValue)){
			return;
		}
		if(StyleCommonPropertyValue.setComboValueIndex("list-style-type", combo_type, styleValue)){
			hashDefaultValue = true;
		}
		if(StyleCommonPropertyValue.setComboValueIndex("list-style-position", combo_position, styleValue)){
			hashDefaultValue = true;
		}
		if(StyleCommonPropertyValue.setComboValueTypeFile("list-style-image", combo_image, styleValue)){
			hashDefaultValue = true;
		}
		if(hashDefaultValue){
			styleDialog.updateKindListShow(pageName);
		}
	}

	public void registerEvent() {

		combo_type.addSelectionListener(new SelectionListener(){
			public void widgetDefaultSelected(SelectionEvent e) {
			}
			public void widgetSelected(SelectionEvent e) {
				int index = combo_type.getSelectionIndex();
				if (index != -1) {
					styleDialog.setPropertyValue(pageName,"list-style-type", combo_type.getItem(index));
				}
			}
		});
		combo_position.addSelectionListener(new SelectionListener(){
			public void widgetDefaultSelected(SelectionEvent e) {
			}
			public void widgetSelected(SelectionEvent e) {
				int index = combo_position.getSelectionIndex();
				if (index != -1) {
					styleDialog.setPropertyValue(pageName,"list-style-position", combo_position.getItem(index));
				}
			}
		});
		combo_image.addSelectionListener(new SelectionListener(){
			public void widgetDefaultSelected(SelectionEvent e) {
			}
			public void widgetSelected(SelectionEvent e) {
				int index = combo_image.getSelectionIndex();
				if(index != -1){
					styleDialog.setPropertyValue(pageName,"list-style-image", combo_image.getItem(index));
				}
			}
		});
		
		button_image.addSelectionListener(new SelectionListener(){
			public void widgetDefaultSelected(SelectionEvent e) {
			}
			public void widgetSelected(SelectionEvent e) {
				/*FileTreeDialog fileTreeDialog = new FileTreeDialog(parent.getShell(),".bmp;.JPG;.JPEG;.JPE;.JFIF;.GIF;.PNG;.TIF;.TIFF",null);
				fileTreeDialog.open();
				String imageUrl = fileTreeDialog.getResultData();
				if(imageUrl!=null && !"".equals(imageUrl)){
					styleDialog.setPropertyValue(pageName,"list-style-image", "url("+imageUrl+")");
					combo_image.setText(imageUrl);
					combo_image.select(-1);
				}*/
				SelectFileDialog fileTreeDialog = new SelectFileDialog(parent.getShell(), "*.*",deep);
				fileTreeDialog.open();
				String imageUrl = fileTreeDialog.getReturnValue();
				if (imageUrl != null && !"".equals(imageUrl)) {
					styleDialog.setPropertyValue(pageName, "background-image", "url(" + imageUrl + ")");
					combo_image.setText(imageUrl);
					combo_image.select(-1);
				}
			}
		});
	}
	
	public void setDeep(int deep) {
		this.deep = deep;
	}
}
