package com.justep.studio.ui.editors.stylepage;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.eclipse.jface.dialogs.Dialog;
import org.eclipse.jface.dialogs.IDialogConstants;
import org.eclipse.jface.dialogs.MessageDialog;
import org.eclipse.swt.SWT;
import org.eclipse.swt.custom.StackLayout;
import org.eclipse.swt.events.ModifyEvent;
import org.eclipse.swt.events.ModifyListener;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Control;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.swt.widgets.Text;

import com.justep.studio.StudioPlugin2;

public class StyleDialog extends Dialog {

	private StyleKindPage styleKindPage;

	private StylePreviewPage stylePreviewPage;

	private StylePageContainer stylePageContainer = new StylePageContainer();

	private StackLayout stackLayout = new StackLayout();

	private Composite composite_top_right;

	private String oldStyleValue;

	private String newStyleValue;

	private String cssClassName;

	/**
	 * 首先显示的面板
	 */
	private String visiblePabel;
	/**
	 * 包含的面板
	 */
	private List<String> includePanels;

	private String title;

	private String cssContext;

	private Text text;

	public String getCssContext() {
		return cssContext;
	}

	public void setCssContext(String cssContext) {
		this.cssContext = cssContext;
	}

	private void setContainShowPanel(String editorParamter) {
		includePanels = new ArrayList<String>();
		if (editorParamter != null && !editorParamter.equals("")) {
			String[] editPs = editorParamter.split(",");
			int showIndex = 0;
			for (int i = 0; i < StyleCommonPropertyValue.STYLE_KIND_DEFAULT_VALUE.length; i++) {
				for (int j = 0; j < editPs.length; j++) {
					if (StyleCommonPropertyValue.STYLE_KIND_DEFAULT_VALUE[i].equals(editPs[j])) {
						if (!includePanels.contains(StyleCommonPropertyValue.STYLE_KIND_DEFAULT_VALUE[i])) {
							includePanels.add(StyleCommonPropertyValue.STYLE_KIND_DEFAULT_VALUE[i]);
						}
					} else if (("[" + StyleCommonPropertyValue.STYLE_KIND_DEFAULT_VALUE[i] + "]").equals(editPs[j])) {
						if (!includePanels.contains(StyleCommonPropertyValue.STYLE_KIND_DEFAULT_VALUE[i])) {
							includePanels.add(StyleCommonPropertyValue.STYLE_KIND_DEFAULT_VALUE[i]);
						}
						showIndex = includePanels.indexOf(StyleCommonPropertyValue.STYLE_KIND_DEFAULT_VALUE[i]);
					} else if (editPs[j].equals("*")) {
						initAddAllPanel();
					}
				}
			}
			if (includePanels.size() == 0) {
				initAddAllPanel();
			}
			this.visiblePabel = includePanels.get(showIndex);
		} else {
			initAddAllPanel();
			this.visiblePabel = includePanels.get(0);
		}
	}

	private void initAddAllPanel() {
		for (int i = 0; i < StyleCommonPropertyValue.STYLE_KIND_DEFAULT_VALUE.length; i++) {
			if (!includePanels.contains(StyleCommonPropertyValue.STYLE_KIND_DEFAULT_VALUE[i])) {
				includePanels.add(StyleCommonPropertyValue.STYLE_KIND_DEFAULT_VALUE[i]);
			}
		}
	}

	protected StyleDialog(Shell parentShell, String styleValue, int deep, String editorParamter, String title) {
		super(parentShell);
		super.setShellStyle(SWT.DIALOG_TRIM);
		this.oldStyleValue = styleValue;
		this.newStyleValue = styleValue;
		this.title = title;
		setContainShowPanel(editorParamter);
		stylePageContainer.setDeep(deep);
	}

	@Override
	protected int getShellStyle() {
		return super.getShellStyle();
	}

	@Override
	public int open() {
		return super.open();
	}

	@Override
	protected void createButtonsForButtonBar(Composite parent) {
		createButton(parent, IDialogConstants.OK_ID, "确定", false);
		createButton(parent, IDialogConstants.CANCEL_ID, "取消", false);
	}

	protected void buttonPressed(int buttonId) {
		if (IDialogConstants.OK_ID == buttonId) {
			okPressed();
		} else if (IDialogConstants.CANCEL_ID == buttonId) {
			newStyleValue = oldStyleValue;
			cancelPressed();
		}
	}

	@Override
	protected Control createDialogArea(Composite parent) {
		//Main Composite
		Composite composite_main = new Composite(parent, SWT.NONE);

		final GridLayout gridLayout_main = new GridLayout();
		gridLayout_main.numColumns = 1;
		composite_main.setLayout(gridLayout_main);
		composite_main.setLayoutData(new GridData(SWT.FILL, SWT.CENTER, true, false));

		//Top Composite
		Composite composite_top = new Composite(composite_main, SWT.NONE);
		final GridData gridData_top = new GridData(SWT.FILL, SWT.CENTER, true, false);
		gridData_top.heightHint = 295;
		gridData_top.widthHint = 553;
		composite_top.setLayoutData(gridData_top);
		final GridLayout gridLayout_top = new GridLayout();
		gridLayout_top.numColumns = 2;
		composite_top.setLayout(gridLayout_top);

		if (title.equals("添加样式")) {
			Label label = new Label(composite_top, SWT.NONE);
			label.setText(" 样式名称：");
			text = new Text(composite_top, SWT.BORDER);
			text.setLayoutData(new GridData(440, 14));
			text.addModifyListener(new ModifyListener() {
				public void modifyText(ModifyEvent event) {
					cssClassName = text.getText();
				}
			});
		}

		//StyleKindPage (Top Left)
		final GridData styleKindGridData = new GridData(87, 309);
		styleKindPage = new StyleKindPage(composite_top, SWT.NONE, this);
		//		styleKindPage.setVisible(false);
		styleKindPage.setLayoutData(styleKindGridData);

		//Top Right Composite
		composite_top_right = new Composite(composite_top, SWT.NONE);
		composite_top_right.setLayoutData(new GridData(525, 256));
		composite_top_right.setLayout(stackLayout);

		//Bottom Composite
		Composite composite_bottom = new Composite(composite_main, SWT.NONE);
		final GridData gd_composite_bottom = new GridData(SWT.FILL, SWT.CENTER, true, false);
		gd_composite_bottom.heightHint = 160;
		composite_bottom.setLayoutData(gd_composite_bottom);
		final GridLayout gridLayout_bottom = new GridLayout();
		gridLayout_bottom.numColumns = 1;
		composite_bottom.setLayout(gridLayout_bottom);

		//StylePreviewPage
		final GridData styleViewGridData = new GridData(SWT.FILL, SWT.CENTER, true, false);
		styleViewGridData.heightHint = 152;
		styleViewGridData.widthHint = 65;
		stylePreviewPage = new StylePreviewPage(composite_bottom, SWT.NONE, oldStyleValue, this);
		stylePreviewPage.setLayoutData(styleViewGridData);

		/*初始化 visiblePabel*/
		stylePageContainer.initAllPage(visiblePabel, composite_top_right, this, oldStyleValue);

		/*显示  visiblePabel*/
		stackLayout.topControl = stylePageContainer.getStylePage(visiblePabel, composite_top_right, this);

		initPreviewValue();
		stylePreviewPage.setBrowserContent();
		return composite_main;
	}

	private boolean isNotEmpty(String value) {
		return value != null && !value.equals("");
	}

	private void initPreviewValue() {
		boolean fontChanged = false;
		String font_family = StyleCommonPropertyValue.getCommonComboPropertyValue(oldStyleValue, "font-family");
		if (isNotEmpty(font_family))
			fontChanged = true;
		stylePreviewPage.rePaintText("font-family", font_family, false);
		String font_size = StyleCommonPropertyValue.getComboValueIndexWithUnitPropertyValue(oldStyleValue, "font-size");
		if (isNotEmpty(font_size))
			fontChanged = true;
		stylePreviewPage.rePaintText("font-size", font_size, false);
		String font_weight = StyleCommonPropertyValue.getCommonComboPropertyValue(oldStyleValue, "font-weight");
		if (isNotEmpty(font_weight))
			fontChanged = true;
		stylePreviewPage.rePaintText("font-weight", font_weight, false);
		String font_style = StyleCommonPropertyValue.getCommonComboPropertyValue(oldStyleValue, "font-style");
		if (isNotEmpty(font_style))
			fontChanged = true;
		stylePreviewPage.rePaintText("font-style", font_style, false);
		String font_variant = StyleCommonPropertyValue.getCommonComboPropertyValue(oldStyleValue, "font-variant");
		if (isNotEmpty(font_variant))
			fontChanged = true;
		stylePreviewPage.rePaintText("font-variant", font_variant, false);
		String text_transform = StyleCommonPropertyValue.getCommonComboPropertyValue(oldStyleValue, "text-transform");
		if (isNotEmpty(text_transform))
			fontChanged = true;
		stylePreviewPage.rePaintText("text-transform", text_transform, false);
		String color = StyleCommonPropertyValue.getColorPropertyValue(oldStyleValue, "color");
		if (isNotEmpty(color))
			fontChanged = true;
		stylePreviewPage.rePaintText("color", color, false);
		String text_decoration = StyleCommonPropertyValue.getCommonComboPropertyValue(oldStyleValue, "text-decoration");
		if (isNotEmpty(text_decoration))
			fontChanged = true;
		stylePreviewPage.rePaintText("text-decoration", text_decoration, false);
		if (fontChanged) {
			styleKindPage.updateKindListShow("字体");
		}

		String background_color = StyleCommonPropertyValue.getColorPropertyValue(oldStyleValue, "background-color");
		boolean backChanged = isNotEmpty(background_color);
		if (backChanged) {
			styleKindPage.updateKindListShow("背景");
		}
		stylePreviewPage.rePaintText("background-color", background_color, false);

		boolean borderChanged = false;
		String[] border_width = StyleCommonPropertyValue.getJoinComboValueIndexWithUnitPropertyValue(oldStyleValue, "border-width");
		if (border_width != null) {
			borderChanged = true;
			stylePreviewPage.rePaintText("border-top-width", border_width[0], false);
			stylePreviewPage.rePaintText("border-right-width", border_width[1], false);
			stylePreviewPage.rePaintText("border-bottom-width", border_width[2], false);
			stylePreviewPage.rePaintText("border-left-width", border_width[3], false);
		} else {
			String border_top_width = StyleCommonPropertyValue.getComboValueIndexWithUnitPropertyValue(oldStyleValue, "border-top-width");
			if (isNotEmpty(border_top_width))
				borderChanged = true;
			stylePreviewPage.rePaintText("border-top-width", border_top_width, false);
			String border_right_width = StyleCommonPropertyValue.getComboValueIndexWithUnitPropertyValue(oldStyleValue, "border-right-width");
			if (isNotEmpty(border_right_width))
				borderChanged = true;
			stylePreviewPage.rePaintText("border-right-width", border_right_width, false);
			String border_bottom_width = StyleCommonPropertyValue.getComboValueIndexWithUnitPropertyValue(oldStyleValue, "border-bottom-width");
			if (isNotEmpty(border_bottom_width))
				borderChanged = true;
			stylePreviewPage.rePaintText("border-bottom-width", border_bottom_width, false);
			String border_left_width = StyleCommonPropertyValue.getComboValueIndexWithUnitPropertyValue(oldStyleValue, "border-left-width");
			if (isNotEmpty(border_left_width))
				borderChanged = true;
			stylePreviewPage.rePaintText("border-left-width", border_left_width, false);
		}
		String[] border_style = StyleCommonPropertyValue.getJoinComboValueIndexPropertyValue(oldStyleValue, "border-style");
		if (border_style != null) {
			borderChanged = true;
			stylePreviewPage.rePaintText("border-top-style", border_style[0], false);
			stylePreviewPage.rePaintText("border-right-style", border_style[1], false);
			stylePreviewPage.rePaintText("border-bottom-style", border_style[2], false);
			stylePreviewPage.rePaintText("border-left-style", border_style[3], false);
		} else {
			String border_top_style = StyleCommonPropertyValue.getCommonComboPropertyValue(oldStyleValue, "border-top-style");
			if (isNotEmpty(border_top_style))
				borderChanged = true;
			stylePreviewPage.rePaintText("border-top-style", border_top_style, false);
			String border_right_style = StyleCommonPropertyValue.getCommonComboPropertyValue(oldStyleValue, "border-right-style");
			if (isNotEmpty(border_right_style))
				borderChanged = true;
			stylePreviewPage.rePaintText("border-right-style", border_right_style, false);
			String border_bottom_style = StyleCommonPropertyValue.getCommonComboPropertyValue(oldStyleValue, "border-bottom-style");
			if (isNotEmpty(border_bottom_style))
				borderChanged = true;
			stylePreviewPage.rePaintText("border-bottom-style", border_bottom_style, false);
			String border_left_style = StyleCommonPropertyValue.getCommonComboPropertyValue(oldStyleValue, "border-left-style");
			if (isNotEmpty(border_left_style))
				borderChanged = true;
			stylePreviewPage.rePaintText("border-left-style", border_left_style, false);
		}
		String[] border_color = StyleCommonPropertyValue.getJoinColorValueIndexPropertyValue(oldStyleValue, "border-color");
		if (border_color != null) {
			borderChanged = true;
			stylePreviewPage.rePaintText("border-top-color", border_color[0], false);
			stylePreviewPage.rePaintText("border-right-color", border_color[1], false);
			stylePreviewPage.rePaintText("border-bottom-color", border_color[2], false);
			stylePreviewPage.rePaintText("border-left-color", border_color[3], false);
		} else {
			String border_top_color = StyleCommonPropertyValue.getColorPropertyValue(oldStyleValue, "border-top-color");
			if (isNotEmpty(border_top_color))
				borderChanged = true;
			stylePreviewPage.rePaintText("border-top-color", border_top_color, false);
			String border_right_color = StyleCommonPropertyValue.getColorPropertyValue(oldStyleValue, "border-right-color");
			if (isNotEmpty(border_right_color))
				borderChanged = true;
			stylePreviewPage.rePaintText("border-right-color", border_right_color, false);
			String border_bottom_color = StyleCommonPropertyValue.getColorPropertyValue(oldStyleValue, "border-bottom-color");
			if (isNotEmpty(border_bottom_color))
				borderChanged = true;
			stylePreviewPage.rePaintText("border-bottom-color", border_bottom_color, false);
			String border_left_color = StyleCommonPropertyValue.getColorPropertyValue(oldStyleValue, "border-left-color");
			if (isNotEmpty(border_left_color))
				borderChanged = true;
			stylePreviewPage.rePaintText("border-left-color", border_left_color, false);
		}
		if (borderChanged) {
			styleKindPage.updateKindListShow("边框");
		}
		checkSpaceChanged();
		if (!backChanged) {
			checkBackgroundChanged();
		}
		checkPanelChanged();
		checkPositionChanged();
		checkLayoutChanged();
		checkListChanged();
		checkTableChanged();
	}

	private void checkTableChanged() {
		String table_layout = StyleCommonPropertyValue.getCommonComboPropertyValue(oldStyleValue, "table-layout");
		if (isNotEmpty(table_layout)) {
			styleKindPage.updateKindListShow("表格");
			return;
		}
		String border_collapse = StyleCommonPropertyValue.getCommonComboPropertyValue(oldStyleValue, "border-collapse");
		if (isNotEmpty(border_collapse)) {
			styleKindPage.updateKindListShow("表格");
			return;
		}
		String border_spacing = StyleCommonPropertyValue.getComboValueIndexWithUnitPropertyValue(oldStyleValue, "border-spacing");
		if (isNotEmpty(border_spacing)) {
			styleKindPage.updateKindListShow("表格");
			return;
		}
		String empty_cells = StyleCommonPropertyValue.getCommonComboPropertyValue(oldStyleValue, "empty-cells");
		if (isNotEmpty(empty_cells)) {
			styleKindPage.updateKindListShow("表格");
			return;
		}
		String caption_side = StyleCommonPropertyValue.getCommonComboPropertyValue(oldStyleValue, "caption-side");
		if (isNotEmpty(caption_side)) {
			styleKindPage.updateKindListShow("表格");
			return;
		}
	}

	private void checkListChanged() {
		String list_style_type = StyleCommonPropertyValue.getCommonComboPropertyValue(oldStyleValue, "list-style-type");
		if (isNotEmpty(list_style_type)) {
			styleKindPage.updateKindListShow("列表");
			return;
		}
		String list_style_image = StyleCommonPropertyValue.getCommonComboPropertyValue(oldStyleValue, "list-style-image");
		if (isNotEmpty(list_style_image)) {
			styleKindPage.updateKindListShow("列表");
			return;
		}
		String list_style_position = StyleCommonPropertyValue.getCommonComboPropertyValue(oldStyleValue, "list-style-position");
		if (isNotEmpty(list_style_position)) {
			styleKindPage.updateKindListShow("列表");
			return;
		}
	}

	private void checkLayoutChanged() {
		String visibility = StyleCommonPropertyValue.getCommonComboPropertyValue(oldStyleValue, "visibility");
		if (isNotEmpty(visibility)) {
			styleKindPage.updateKindListShow("布局");
			return;
		}
		String display = StyleCommonPropertyValue.getCommonComboPropertyValue(oldStyleValue, "display");
		if (isNotEmpty(display)) {
			styleKindPage.updateKindListShow("布局");
			return;
		}
		String floatv = StyleCommonPropertyValue.getCommonComboPropertyValue(oldStyleValue, "float");
		if (isNotEmpty(floatv)) {
			styleKindPage.updateKindListShow("布局");
			return;
		}
		String clear = StyleCommonPropertyValue.getCommonComboPropertyValue(oldStyleValue, "clear");
		if (isNotEmpty(clear)) {
			styleKindPage.updateKindListShow("布局");
			return;
		}
		String cursor = StyleCommonPropertyValue.getCommonComboPropertyValue(oldStyleValue, "cursor");
		if (isNotEmpty(cursor)) {
			styleKindPage.updateKindListShow("布局");
			return;
		}
		String overflow = StyleCommonPropertyValue.getCommonComboPropertyValue(oldStyleValue, "overflow");
		if (isNotEmpty(overflow)) {
			styleKindPage.updateKindListShow("布局");
			return;
		}
		String clip = StyleCommonPropertyValue.getCommonComboPropertyValue(oldStyleValue, "clip");
		if (isNotEmpty(clip)) {
			styleKindPage.updateKindListShow("布局");
			return;
		}
	}

	private void checkPositionChanged() {
		String position = StyleCommonPropertyValue.getCommonComboPropertyValue(oldStyleValue, "position");
		if (isNotEmpty(position)) {
			styleKindPage.updateKindListShow("定位");
			return;
		}
		String z_index = StyleCommonPropertyValue.getCommonComboPropertyValue(oldStyleValue, "z-index");
		if (isNotEmpty(z_index)) {
			styleKindPage.updateKindListShow("定位");
			return;
		}
		String width = StyleCommonPropertyValue.getComboValueIndexWithUnitPropertyValue(oldStyleValue, "width");
		if (isNotEmpty(width)) {
			styleKindPage.updateKindListShow("定位");
			return;
		}
		String height = StyleCommonPropertyValue.getComboValueIndexWithUnitPropertyValue(oldStyleValue, "height");
		if (isNotEmpty(height)) {
			styleKindPage.updateKindListShow("定位");
			return;
		}
		String top = StyleCommonPropertyValue.getComboValueIndexWithUnitPropertyValue(oldStyleValue, "top");
		if (isNotEmpty(top)) {
			styleKindPage.updateKindListShow("定位");
			return;
		}
		String right = StyleCommonPropertyValue.getComboValueIndexWithUnitPropertyValue(oldStyleValue, "right");
		if (isNotEmpty(right)) {
			styleKindPage.updateKindListShow("定位");
			return;
		}
		String bottom = StyleCommonPropertyValue.getComboValueIndexWithUnitPropertyValue(oldStyleValue, "bottom");
		if (isNotEmpty(bottom)) {
			styleKindPage.updateKindListShow("定位");
			return;
		}
		String left = StyleCommonPropertyValue.getComboValueIndexWithUnitPropertyValue(oldStyleValue, "left");
		if (isNotEmpty(left)) {
			styleKindPage.updateKindListShow("定位");
			return;
		}
	}

	private void checkPanelChanged() {
		String[] padding = StyleCommonPropertyValue.getJoinComboValueIndexWithUnitPropertyValue(oldStyleValue, "padding");
		if (padding != null) {
			styleKindPage.updateKindListShow("方框");
			return;
		} else {
			String padding_top = StyleCommonPropertyValue.getComboValueIndexWithUnitPropertyValue(oldStyleValue, "padding-top");
			if (isNotEmpty(padding_top)) {
				styleKindPage.updateKindListShow("方框");
				return;
			}
			String padding_right = StyleCommonPropertyValue.getComboValueIndexWithUnitPropertyValue(oldStyleValue, "padding-right");
			if (isNotEmpty(padding_right)) {
				styleKindPage.updateKindListShow("方框");
				return;
			}
			String padding_bottom = StyleCommonPropertyValue.getComboValueIndexWithUnitPropertyValue(oldStyleValue, "padding-bottom");
			if (isNotEmpty(padding_bottom)) {
				styleKindPage.updateKindListShow("方框");
				return;
			}
			String padding_left = StyleCommonPropertyValue.getComboValueIndexWithUnitPropertyValue(oldStyleValue, "padding-left");
			if (isNotEmpty(padding_left)) {
				styleKindPage.updateKindListShow("方框");
				return;
			}
		}
		String[] margin = StyleCommonPropertyValue.getJoinComboValueIndexWithUnitPropertyValue(oldStyleValue, "margin");
		if (margin != null) {
			styleKindPage.updateKindListShow("方框");
			return;
		} else {
			String margin_top = StyleCommonPropertyValue.getComboValueIndexWithUnitPropertyValue(oldStyleValue, "margin-top");
			if (isNotEmpty(margin_top)) {
				styleKindPage.updateKindListShow("方框");
				return;
			}
			String margin_right = StyleCommonPropertyValue.getComboValueIndexWithUnitPropertyValue(oldStyleValue, "margin-right");
			if (isNotEmpty(margin_right)) {
				styleKindPage.updateKindListShow("方框");
				return;
			}
			String margin_bottom = StyleCommonPropertyValue.getComboValueIndexWithUnitPropertyValue(oldStyleValue, "margin-bottom");
			if (isNotEmpty(margin_bottom)) {
				styleKindPage.updateKindListShow("方框");
				return;
			}
			String margin_left = StyleCommonPropertyValue.getComboValueIndexWithUnitPropertyValue(oldStyleValue, "margin-left");
			if (isNotEmpty(margin_left)) {
				styleKindPage.updateKindListShow("方框");
				return;
			}
		}
	}

	private void checkBackgroundChanged() {
		String background_image = StyleCommonPropertyValue.getComboValueIndexWithUnitPropertyValue(oldStyleValue, "background-image");
		if (isNotEmpty(background_image)) {
			styleKindPage.updateKindListShow("背景");
			return;
		}
		String background_repeat = StyleCommonPropertyValue.getComboValueIndexWithUnitPropertyValue(oldStyleValue, "background-repeat");
		if (isNotEmpty(background_repeat)) {
			styleKindPage.updateKindListShow("背景");
			return;
		}
		String background_attachment = StyleCommonPropertyValue.getComboValueIndexWithUnitPropertyValue(oldStyleValue, "background-attachment");
		if (isNotEmpty(background_attachment)) {
			styleKindPage.updateKindListShow("背景");
			return;
		}
		String background_position = StyleCommonPropertyValue.getComboValueIndexWithUnitPropertyValue(oldStyleValue, "background-position");
		if (isNotEmpty(background_position)) {
			styleKindPage.updateKindListShow("背景");
			return;
		}
	}

	private void checkSpaceChanged() {
		String line_height = StyleCommonPropertyValue.getComboValueIndexWithUnitPropertyValue(oldStyleValue, "line-height");
		if (isNotEmpty(line_height)) {
			styleKindPage.updateKindListShow("块");
			return;
		}
		String vertical_align = StyleCommonPropertyValue.getComboValueIndexWithUnitPropertyValue(oldStyleValue, "vertical-align");
		if (isNotEmpty(vertical_align)) {
			styleKindPage.updateKindListShow("块");
			return;
		}
		String text_align = StyleCommonPropertyValue.getCommonComboPropertyValue(oldStyleValue, "text-align");
		if (isNotEmpty(text_align)) {
			styleKindPage.updateKindListShow("块");
			return;
		}
		String text_indent = StyleCommonPropertyValue.getComboValueIndexWithUnitPropertyValue(oldStyleValue, "text-indent");
		if (isNotEmpty(text_indent)) {
			styleKindPage.updateKindListShow("块");
			return;
		}
		String white_space = StyleCommonPropertyValue.getCommonComboPropertyValue(oldStyleValue, "white-space");
		if (isNotEmpty(white_space)) {
			styleKindPage.updateKindListShow("块");
			return;
		}
		String word_spacing = StyleCommonPropertyValue.getComboValueIndexWithUnitPropertyValue(oldStyleValue, "word-spacing");
		if (isNotEmpty(word_spacing)) {
			styleKindPage.updateKindListShow("块");
			return;
		}
		String letter_spacing = StyleCommonPropertyValue.getComboValueIndexWithUnitPropertyValue(oldStyleValue, "letter-spacing");
		if (isNotEmpty(letter_spacing)) {
			styleKindPage.updateKindListShow("块");
			return;
		}
	}

	protected void configureShell(Shell newShell) {
		super.configureShell(newShell);
		newShell.setText(title);
	}

	public void changeRightPage(String pageName) {
		stackLayout.topControl = stylePageContainer.getStylePage(pageName, composite_top_right, this);
		composite_top_right.layout();
	}

	public void rePaintText(String paintType, String fontValue, boolean paintFlag) {
		stylePreviewPage.rePaintText(paintType, fontValue, paintFlag);
	}

	public void setPropertyValue(String stylePageName, String name, String value) {
		if (value == null || "".equals(value)) {
			stylePreviewPage.removeProperty(name);
		} else {
			stylePreviewPage.setPropertyValue(name, value);
			styleKindPage.updateKindListShow(stylePageName);
		}
	}

	public void removeProperty(String name) {
		stylePreviewPage.removeProperty(name);
	}

	public String getResultData() {
		return this.newStyleValue;
	}

	public void setResultData(String styleValue) {
		this.newStyleValue = styleValue;
	}

	public void updateKindListShow(String kindName) {
		styleKindPage.updateKindListShow(kindName);
	}

	//	protected Point getInitialSize() {
	//		return new Point(500,450);
	//	}

	public List<String> getIncludePanels() {
		return includePanels;
	}

	public String getVisiblePabel() {
		return visiblePabel;
	}

	protected boolean isResizable() {
		return false;
	}

	@Override
	protected void okPressed() {
		if (title.equals("添加样式")) {
			if (text.getText().length() == 0) {
				MessageDialog.openInformation(getShell(), "提示", "CSS样式名称不能为空");
				return;
			}
			if (hasClassName(cssClassName, cssContext)) {
				MessageDialog.openInformation(StudioPlugin2.getShell(), "提示", "CSS样式 " + cssClassName + " 已经存在！");
				return;
			}
		}
		super.okPressed();
	}

	public String getCssClassName() {
		return cssClassName;
	}

	private boolean hasClassName(String className, String cssContext) {
		Pattern pattern = Pattern.compile(className + "[ \\n]*[{][^{^}]*[}]");
		Matcher matcher = pattern.matcher(cssContext);
		if (matcher.find()) {
			return true;
		}
		return false;
	}

}
