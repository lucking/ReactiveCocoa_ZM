package com.justep.studio.ui.editors.stylepage;

import java.util.ArrayList;

import org.eclipse.swt.SWT;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.events.SelectionListener;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.List;

import com.justep.studio.ui.editors.xui.IPropertyDialogPage;
import com.justep.studio.ui.editors.xui.IPropertyValueStrategy;
import com.justep.studio.ui.editors.xui.PropertyItem;

/**
 * 类别
 * @author linhongbao
 *
 */
public class StyleKindPage extends Composite implements IPropertyDialogPage, IStylePage {

	private List list;
	private StyleDialog styleDialog;

	public StyleKindPage(Composite parent, int style) {
		super(parent, style);
	}

	public StyleKindPage(Composite parent, int style, StyleDialog styleDialog) {
		this(parent, style);
		this.styleDialog = styleDialog;
		this.initLayout();
		this.initDefaultValue();
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
		java.util.List<String> includes = styleDialog.getIncludePanels();
		list.setItems(includes.toArray(new String[includes.size()]));
		String items[] = list.getItems();
		if (items.length > 0) {
			list.select(0);
			if (styleDialog.getVisiblePabel() != null) {
				for (int i = 0; i < items.length; i++) {
					if (styleDialog.getVisiblePabel().equals(items[i])) {
						list.select(i);
						break;
					}
				}
			}
		}
	}

	public void initLayout() {
		setLayout(new GridLayout());
		final Label label = new Label(this, SWT.NONE);
		label.setLayoutData(new GridData(SWT.FILL, SWT.CENTER, true, false));
		label.setText("类别(C):");
		list = new List(this, SWT.BORDER);

		final GridData gd_list = new GridData(SWT.FILL, SWT.CENTER, true, false);
		gd_list.heightHint = 255;
		list.setLayoutData(gd_list);
	}

	public void initSelfDefaultValue() {

	}

	public void registerEvent() {
		list.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				styleDialog.changeRightPage(list.getItem(list.getSelectionIndex()));
			}
		});
	}

	/**
	 * 设置左侧List是否已经编辑标记
	 * @param kindName
	 * @param weightFlag
	 */
	public void updateKindListShow(String kindName) {
		String[] listItems = list.getItems();
		for (int i = 0; i < listItems.length; i++) {
			if (listItems[i].equals(kindName)) {
				list.setItem(i,kindName + StyleCommonPropertyValue.KIND_UPDATED_AFTERFIX);
				return;
			}
		}
	}

}
