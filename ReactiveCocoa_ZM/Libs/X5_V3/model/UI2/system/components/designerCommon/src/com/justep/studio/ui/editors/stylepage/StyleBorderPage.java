package com.justep.studio.ui.editors.stylepage;

import org.eclipse.swt.SWT;
import org.eclipse.swt.events.FocusAdapter;
import org.eclipse.swt.events.FocusEvent;
import org.eclipse.swt.events.KeyAdapter;
import org.eclipse.swt.events.KeyEvent;
import org.eclipse.swt.events.MouseAdapter;
import org.eclipse.swt.events.MouseEvent;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.events.SelectionListener;
import org.eclipse.swt.graphics.Color;
import org.eclipse.swt.graphics.RGB;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.ColorDialog;
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
 * 边框
 * @author linhongbao
 *
 */
public class StyleBorderPage extends Composite implements IPropertyDialogPage, IStylePage {

	private Combo combo_leftWidthUnit;
	private Combo combo_leftWidth;
	private Combo combo_leftStyle;
	private Combo combo_bottomWidthUnit;
	private Combo combo_bottomWidth;
	private Combo combo_bottomStyle;
	private Combo combo_rightWidthUnit;
	private Combo combo_rightWidth;
	private Combo combo_rightStyle;
	private Combo combo_topWidthUnit;
	private Combo combo_topWidth;
	private Combo combo_topStyle;
	private Slider slider_topWidth;
	private Slider slider_rightWidth;
	private Slider slider_bottomWidth;
	private Slider slider_leftWidth;

	private StyleDialog styleDialog;
	private Composite composite_topColor;
	private Composite composite_rightColor;
	private Composite composite_bottomColor;
	private Composite composite_leftColor;
	private Combo text_topColor;
	private Combo text_rightColor;
	private Combo text_bottomColor;
	private Combo text_leftColor;
	private Button check_style_all;
	private Button check_width_all;
	private Button check_color_all;

	private String styleValue;

	private String pageName = "边框";

	private String topStyleValue;
	private String rightStyleValue;
	private String bottomStyleValue;
	private String leftStyleValue;

	private String topWidthValue;
	private String rightWidthValue;
	private String bottomWidthValue;
	private String leftWidthValue;

	private String topColorValue;
	private String rightColorValue;
	private String bottomColorValue;
	private String leftColorValue;
	private Label borderLabel;
	private Label borderLabel_1;
	private Label bordercolorLabel;
	private Label topLabel;
	private Label rightLabel;
	private Label bottomLabel;
	private Label leftLabel;

	public StyleBorderPage(Composite parent, StyleDialog styleDialog, String styleValue, int style) {
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

		combo_topStyle.setItems(StyleCommonPropertyValue.BOEDER_STYLE);
		combo_rightStyle.setItems(StyleCommonPropertyValue.BOEDER_STYLE);
		combo_bottomStyle.setItems(StyleCommonPropertyValue.BOEDER_STYLE);
		combo_leftStyle.setItems(StyleCommonPropertyValue.BOEDER_STYLE);

		combo_topWidth.setItems(StyleCommonPropertyValue.BORDER_WIDTH);
		combo_rightWidth.setItems(StyleCommonPropertyValue.BORDER_WIDTH);
		combo_bottomWidth.setItems(StyleCommonPropertyValue.BORDER_WIDTH);
		combo_leftWidth.setItems(StyleCommonPropertyValue.BORDER_WIDTH);

		combo_topWidthUnit.setItems(StyleCommonPropertyValue.NUMBER_UNIT_VALUE);
		combo_topWidthUnit.select(0);

		combo_topWidthUnit.setItems(StyleCommonPropertyValue.NUMBER_UNIT_VALUE);
		combo_topWidthUnit.select(0);

		combo_rightWidthUnit.setItems(StyleCommonPropertyValue.NUMBER_UNIT_VALUE);
		combo_rightWidthUnit.select(0);

		combo_bottomWidthUnit.setItems(StyleCommonPropertyValue.NUMBER_UNIT_VALUE);
		combo_bottomWidthUnit.select(0);

		combo_leftWidthUnit.setItems(StyleCommonPropertyValue.NUMBER_UNIT_VALUE);
		combo_leftWidthUnit.select(0);

		check_style_all.setSelection(true);
		combo_rightStyle.setEnabled(false);
		combo_bottomStyle.setEnabled(false);
		combo_leftStyle.setEnabled(false);

		check_width_all.setSelection(true);
		combo_topWidthUnit.setEnabled(false);
		combo_rightWidth.setEnabled(false);
		combo_bottomWidth.setEnabled(false);
		combo_leftWidth.setEnabled(false);
		slider_rightWidth.setEnabled(false);
		slider_bottomWidth.setEnabled(false);
		slider_leftWidth.setEnabled(false);
		combo_rightWidthUnit.setEnabled(false);
		combo_bottomWidthUnit.setEnabled(false);
		combo_leftWidthUnit.setEnabled(false);

		check_color_all.setSelection(true);
		text_rightColor.setEnabled(false);
		text_bottomColor.setEnabled(false);
		text_leftColor.setEnabled(false);
		composite_rightColor.setEnabled(false);
		composite_bottomColor.setEnabled(false);
		composite_leftColor.setEnabled(false);

		StyleCommonPropertyValue.initSlide(slider_bottomWidth);
		StyleCommonPropertyValue.initSlide(slider_leftWidth);
		StyleCommonPropertyValue.initSlide(slider_rightWidth);
		StyleCommonPropertyValue.initSlide(slider_topWidth);

		text_topColor.setItems(new String[] { "" });
		text_rightColor.setItems(new String[] { "" });
		text_bottomColor.setItems(new String[] { "" });
		text_leftColor.setItems(new String[] { "" });
	}

	public void initLayout() {
		final TableWrapLayout wrapLayout = new TableWrapLayout();
		wrapLayout.numColumns = 7;
		setLayout(wrapLayout);

		new Label(this, SWT.NONE);

		borderLabel = new Label(this, SWT.NONE);
		borderLabel.setText("border-style:");

		borderLabel_1 = new Label(this, SWT.NONE);
		borderLabel_1.setText("border-width:");

		new Label(this, SWT.NONE);

		new Label(this, SWT.NONE);

		bordercolorLabel = new Label(this, SWT.NONE);
		bordercolorLabel.setText("border-color:");
		new Label(this, SWT.NONE);
		new Label(this, SWT.NONE);

		check_style_all = new Button(this, SWT.CHECK);
		check_style_all.setText("全部相同");

		check_width_all = new Button(this, SWT.CHECK);
		check_width_all.setText("全部相同");
		new Label(this, SWT.NONE);
		new Label(this, SWT.NONE);

		check_color_all = new Button(this, SWT.CHECK);
		check_color_all.setText("全部相同");
		new Label(this, SWT.NONE);

		final TableWrapData topLabelData = new TableWrapData(TableWrapData.RIGHT);
		topLabel = new Label(this, SWT.NONE);
		topLabel.setText("top:");
		topLabel.setLayoutData(topLabelData);

		combo_topStyle = new Combo(this, SWT.NONE);
		combo_topStyle.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		combo_topWidth = new Combo(this, SWT.NONE);
		combo_topWidth.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		slider_topWidth = new Slider(this, SWT.VERTICAL);
		final TableWrapData twd_slider_topWidth = new TableWrapData(TableWrapData.LEFT, TableWrapData.TOP);
		twd_slider_topWidth.heightHint = 20;
		slider_topWidth.setLayoutData(twd_slider_topWidth);

		combo_topWidthUnit = new Combo(this, SWT.NONE);
		combo_topWidthUnit.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		text_topColor = new Combo(this, SWT.NONE);
		text_topColor.setLayoutData(new TableWrapData(TableWrapData.FILL));

		composite_topColor = new Composite(this, SWT.BORDER);
		composite_topColor.setBackground(StyleCommonPropertyValue.DEFAULT_COLOR);
		final TableWrapData twd_composite_color = new TableWrapData(TableWrapData.LEFT, TableWrapData.TOP);
		twd_composite_color.heightHint = 20;
		twd_composite_color.maxWidth = 20;
		composite_topColor.setLayoutData(twd_composite_color);

		rightLabel = new Label(this, SWT.NONE);
		final TableWrapData rightLabelData = new TableWrapData(TableWrapData.RIGHT);
		rightLabel.setText("right:");
		rightLabel.setLayoutData(rightLabelData);

		combo_rightStyle = new Combo(this, SWT.NONE);
		combo_rightStyle.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		combo_rightWidth = new Combo(this, SWT.NONE);
		combo_rightWidth.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		slider_rightWidth = new Slider(this, SWT.VERTICAL);
		final TableWrapData twd_slider2_rightWidth = new TableWrapData(TableWrapData.LEFT, TableWrapData.TOP);
		twd_slider2_rightWidth.heightHint = 20;
		slider_rightWidth.setLayoutData(twd_slider2_rightWidth);

		combo_rightWidthUnit = new Combo(this, SWT.NONE);
		combo_rightWidthUnit.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		text_rightColor = new Combo(this, SWT.NONE);
		text_rightColor.setLayoutData(new TableWrapData(TableWrapData.FILL));

		composite_rightColor = new Composite(this, SWT.BORDER);
		composite_rightColor.setBackground(StyleCommonPropertyValue.DEFAULT_COLOR);
		final TableWrapData composite_rightColorData = new TableWrapData(TableWrapData.LEFT, TableWrapData.TOP);
		composite_rightColorData.heightHint = 20;
		composite_rightColorData.maxWidth = 20;
		composite_rightColor.setLayoutData(composite_rightColorData);

		bottomLabel = new Label(this, SWT.NONE);
		final TableWrapData bottomLabelData = new TableWrapData(TableWrapData.RIGHT);
		bottomLabel.setText("bottom:");
		bottomLabel.setLayoutData(bottomLabelData);

		combo_bottomStyle = new Combo(this, SWT.NONE);
		combo_bottomStyle.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
		combo_bottomWidth = new Combo(this, SWT.NONE);
		combo_bottomWidth.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		slider_bottomWidth = new Slider(this, SWT.VERTICAL);
		final TableWrapData twd_slider_bottomWidth = new TableWrapData(TableWrapData.LEFT, TableWrapData.TOP);
		twd_slider_bottomWidth.heightHint = 20;
		slider_bottomWidth.setLayoutData(twd_slider_bottomWidth);

		combo_bottomWidthUnit = new Combo(this, SWT.NONE);
		combo_bottomWidthUnit.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		text_bottomColor = new Combo(this, SWT.NONE);
		text_bottomColor.setLayoutData(new TableWrapData(TableWrapData.FILL));

		composite_bottomColor = new Composite(this, SWT.BORDER);
		composite_bottomColor.setBackground(StyleCommonPropertyValue.DEFAULT_COLOR);
		final TableWrapData composite_bottomColorData = new TableWrapData(TableWrapData.LEFT, TableWrapData.TOP);
		composite_bottomColorData.heightHint = 20;
		composite_bottomColorData.maxWidth = 20;
		composite_bottomColor.setLayoutData(composite_bottomColorData);

		leftLabel = new Label(this, SWT.NONE);
		leftLabel.setText("left:");
		final TableWrapData leftLabelData = new TableWrapData(TableWrapData.RIGHT);
		leftLabel.setLayoutData(leftLabelData);

		combo_leftStyle = new Combo(this, SWT.NONE);
		combo_leftStyle.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		combo_leftWidth = new Combo(this, SWT.NONE);
		combo_leftWidth.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		slider_leftWidth = new Slider(this, SWT.VERTICAL);
		final TableWrapData twd_slider_leftWidth = new TableWrapData(TableWrapData.LEFT, TableWrapData.TOP);
		twd_slider_leftWidth.heightHint = 20;
		slider_leftWidth.setLayoutData(twd_slider_leftWidth);

		combo_leftWidthUnit = new Combo(this, SWT.NONE);
		combo_leftWidthUnit.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		text_leftColor = new Combo(this, SWT.NONE);
		text_leftColor.setLayoutData(new TableWrapData(TableWrapData.FILL));

		composite_leftColor = new Composite(this, SWT.BORDER);
		composite_leftColor.setBackground(StyleCommonPropertyValue.DEFAULT_COLOR);
		final TableWrapData composite_leftColorData = new TableWrapData(TableWrapData.LEFT, TableWrapData.TOP);
		composite_leftColorData.heightHint = 20;
		composite_leftColorData.maxWidth = 20;
		composite_leftColor.setLayoutData(composite_leftColorData);

	}

	public void initSelfDefaultValue() {
		boolean hashDefaultValue = false;
		if (styleValue == null || "".equals(styleValue)) {
			return;
		}
		if (StyleCommonPropertyValue.setJoinComboValueIndex("border-style", combo_topStyle, combo_rightStyle, combo_bottomStyle, combo_leftStyle,
				styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndex("border-top-style", combo_topStyle, styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndex("border-right-style", combo_rightStyle, styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndex("border-bottom-style", combo_bottomStyle, styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndex("border-left-style", combo_leftStyle, styleValue)) {
			hashDefaultValue = true;
		}

		int styleIndex = combo_topStyle.getSelectionIndex();
		if (styleIndex != -1) {
			topStyleValue = combo_topStyle.getItem(styleIndex);
		}
		styleIndex = combo_rightStyle.getSelectionIndex();
		if (styleIndex != -1) {
			rightStyleValue = combo_rightStyle.getItem(styleIndex);
		}
		styleIndex = combo_bottomStyle.getSelectionIndex();
		if (styleIndex != -1) {
			bottomStyleValue = combo_bottomStyle.getItem(styleIndex);
		}
		styleIndex = combo_leftStyle.getSelectionIndex();
		if (styleIndex != -1) {
			leftStyleValue = combo_leftStyle.getItem(styleIndex);
		}

		if (combo_topStyle.getSelectionIndex() == combo_rightStyle.getSelectionIndex()
				&& combo_topStyle.getSelectionIndex() == combo_bottomStyle.getSelectionIndex()
				&& combo_topStyle.getSelectionIndex() == combo_leftStyle.getSelectionIndex()) {
			check_style_all.setSelection(true);
		} else {
			check_style_all.setSelection(false);
			combo_rightStyle.setEnabled(true);
			combo_bottomStyle.setEnabled(true);
			combo_leftStyle.setEnabled(true);
		}
		if (StyleCommonPropertyValue.setJoinComboValueIndexWithUnit("border-width", new Combo[] { combo_topWidth, combo_rightWidth,
				combo_bottomWidth, combo_leftWidth }, new Slider[] { slider_topWidth, slider_rightWidth, slider_bottomWidth, slider_leftWidth },
				new Combo[] { combo_topWidthUnit, combo_rightWidthUnit, combo_bottomWidthUnit, combo_leftWidthUnit }, styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndexWithUnit("border-top-width", combo_topWidth, slider_topWidth, combo_topWidthUnit, styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndexWithUnit("border-right-width", combo_rightWidth, slider_rightWidth, combo_rightWidthUnit,
				styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndexWithUnit("border-bottom-width", combo_bottomWidth, slider_bottomWidth, combo_bottomWidthUnit,
				styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndexWithUnit("border-left-width", combo_leftWidth, slider_leftWidth, combo_leftWidthUnit,
				styleValue)) {
			hashDefaultValue = true;
		}

		if (combo_topWidthUnit.getEnabled()) {
			topWidthValue = combo_topWidth.getText() + combo_topWidthUnit.getItem(combo_topWidthUnit.getSelectionIndex());
		} else if (combo_topWidth.getSelectionIndex() != -1) {
			topWidthValue = combo_topWidth.getItem(combo_topWidth.getSelectionIndex());
		}
		if (combo_rightWidthUnit.getEnabled()) {
			rightWidthValue = combo_rightWidth.getText() + combo_rightWidthUnit.getItem(combo_rightWidthUnit.getSelectionIndex());
		} else if (combo_rightWidth.getSelectionIndex() != -1) {
			rightWidthValue = combo_rightWidth.getItem(combo_rightWidth.getSelectionIndex());
		}
		if (combo_bottomWidthUnit.getEnabled()) {
			bottomWidthValue = combo_bottomWidth.getText() + combo_bottomWidthUnit.getItem(combo_bottomWidthUnit.getSelectionIndex());
		} else if (combo_bottomWidth.getSelectionIndex() != -1) {
			bottomWidthValue = combo_bottomWidth.getItem(combo_bottomWidth.getSelectionIndex());
		}
		if (combo_leftWidthUnit.getEnabled()) {
			leftWidthValue = combo_leftWidth.getText() + combo_leftWidthUnit.getItem(combo_leftWidthUnit.getSelectionIndex());
		} else if (combo_leftWidth.getSelectionIndex() != -1) {
			leftWidthValue = combo_leftWidth.getItem(combo_leftWidth.getSelectionIndex());
		}

		if (combo_topWidth.getText().equals(combo_rightWidth.getText()) && combo_topWidth.getText().equals(combo_bottomWidth.getText())
				&& combo_topWidth.getText().equals(combo_leftWidth.getText())
				&& combo_topWidthUnit.getSelectionIndex() == combo_rightWidthUnit.getSelectionIndex()
				&& combo_topWidthUnit.getSelectionIndex() == combo_bottomWidthUnit.getSelectionIndex()
				&& combo_topWidthUnit.getSelectionIndex() == combo_leftWidthUnit.getSelectionIndex()) {
			check_width_all.setSelection(true);
			combo_rightWidthUnit.setEnabled(false);
			combo_bottomWidthUnit.setEnabled(false);
			combo_leftWidthUnit.setEnabled(false);
		} else {
			check_width_all.setSelection(false);
			combo_bottomWidth.setEnabled(true);
			combo_rightWidth.setEnabled(true);
			combo_leftWidth.setEnabled(true);
			slider_rightWidth.setEnabled(true);
			slider_bottomWidth.setEnabled(true);
			slider_leftWidth.setEnabled(true);
			if (StyleCommonPropertyValue.matchesNumber(combo_rightWidth.getText())) {
				combo_rightWidthUnit.setEnabled(true);
			}
			if (StyleCommonPropertyValue.matchesNumber(combo_bottomWidth.getText())) {
				combo_bottomWidthUnit.setEnabled(true);
			}
			if (StyleCommonPropertyValue.matchesNumber(combo_leftWidth.getText())) {
				combo_leftWidthUnit.setEnabled(true);
			}
		}

		if (StyleCommonPropertyValue.setJoinColorValueIndex("border-color", text_topColor, composite_topColor, text_rightColor, composite_rightColor,
				text_bottomColor, composite_bottomColor, text_leftColor, composite_leftColor, styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setColorValue("border-top-color", text_topColor, composite_topColor, styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setColorValue("border-right-color", text_rightColor, composite_rightColor, styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setColorValue("border-bottom-color", text_bottomColor, composite_bottomColor, styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setColorValue("border-left-color", text_leftColor, composite_leftColor, styleValue)) {
			hashDefaultValue = true;
		}

		topColorValue = text_topColor.getText();
		rightColorValue = text_rightColor.getText();
		bottomColorValue = text_bottomColor.getText();
		leftColorValue = text_leftColor.getText();

		if (text_topColor.getText().equals(text_rightColor.getText()) && text_topColor.getText().equals(text_bottomColor.getText())
				&& text_topColor.getText().equals(text_leftColor.getText())) {
			check_color_all.setSelection(true);
		} else {
			check_color_all.setSelection(false);
			text_rightColor.setEnabled(true);
			text_bottomColor.setEnabled(true);
			text_leftColor.setEnabled(true);
			composite_rightColor.setEnabled(true);
			composite_bottomColor.setEnabled(true);
			composite_leftColor.setEnabled(true);
		}
		if (!hashDefaultValue){
			return;
		}
		styleDialog.updateKindListShow(pageName);
		if (!text_topColor.getText().equals("")) {
			styleDialog.rePaintText("border-top-color", text_topColor.getText(), false);
		}
		if (!text_rightColor.getText().equals("")) {
			styleDialog.rePaintText("border-right-color", text_rightColor.getText(), false);
		}
		if (!text_bottomColor.getText().equals("")) {
			styleDialog.rePaintText("border-bottom-color", text_bottomColor.getText(), false);
		}
		if (!text_leftColor.getText().equals("")) {
			styleDialog.rePaintText("border-left-color", text_leftColor.getText(), false);
		}
		if (combo_topStyle.getSelectionIndex() != -1) {
			styleDialog.rePaintText("border-top-style", combo_topStyle.getText(), false);
		}
		if (combo_rightStyle.getSelectionIndex() != -1) {
			styleDialog.rePaintText("border-right-style", combo_rightStyle.getText(), false);
		}
		if (combo_bottomStyle.getSelectionIndex() != -1) {
			styleDialog.rePaintText("border-bottom-style", combo_bottomStyle.getText(), false);
		}
		if (combo_leftStyle.getSelectionIndex() != -1) {
			styleDialog.rePaintText("border-left-style", combo_leftStyle.getText(), false);
		}
		if (!combo_topWidth.getText().equals("")) {
			if (StyleCommonPropertyValue.matchesNumber(combo_topWidth.getText())) {
				styleDialog.rePaintText("border-top-width", combo_topWidth.getText()
						+ combo_topWidthUnit.getItem(combo_topWidthUnit.getSelectionIndex()), false);
			} else {
				styleDialog.rePaintText("border-top-width", combo_topWidth.getText(), false);
			}
		}
		if (!combo_rightWidth.getText().equals("")) {
			if (StyleCommonPropertyValue.matchesNumber(combo_rightWidth.getText())) {
				styleDialog.rePaintText("border-right-width", combo_rightWidth.getText()
						+ combo_rightWidthUnit.getItem(combo_rightWidthUnit.getSelectionIndex()), false);
			} else {
				styleDialog.rePaintText("border-right-width", combo_rightWidth.getText(), false);
			}
		}
		if (!combo_bottomWidth.getText().equals("")) {
			if (StyleCommonPropertyValue.matchesNumber(combo_bottomWidth.getText())) {
				styleDialog.rePaintText("border-bottom-width", combo_bottomWidth.getText()
						+ combo_bottomWidthUnit.getItem(combo_bottomWidthUnit.getSelectionIndex()), false);
			} else {
				styleDialog.rePaintText("border-bottom-width", combo_bottomWidth.getText(), false);
			}
		}
		if (!combo_leftWidth.getText().equals("")) {
			if (StyleCommonPropertyValue.matchesNumber(combo_leftWidth.getText())) {
				styleDialog.rePaintText("border-left-width", combo_leftWidth.getText()
						+ combo_leftWidthUnit.getItem(combo_leftWidthUnit.getSelectionIndex()), false);
			} else {
				styleDialog.rePaintText("border-left-width", combo_leftWidth.getText(), false);
			}
		}
	}

	private MouseAdapter mouseAdapter = new MouseAdapter() {
		public void mouseDown(MouseEvent e) {
			if (combo_topWidth.isFocusControl()) {
				topWidthNumberInoutConfim();
			} else if (combo_rightWidth.isFocusControl()) {
				rightWidthNumberInputConfim();
			} else if (combo_bottomWidth.isFocusControl()) {
				bottomWidthNumberInputConfim();
			} else if (combo_leftWidth.isFocusControl()) {
				leftWidthNumberInputConfim();
			}
		}
	};

	private void leftWidthNumberInputConfim() {
		String comboText = combo_leftWidth.getText();
		if (StyleCommonPropertyValue.matchesNumber(comboText)) {
			int num = Integer.valueOf(comboText);
			if (!combo_leftWidthUnit.getEnabled()) {
				combo_leftWidthUnit.setEnabled(true);
			}
			slider_leftWidth.setSelection(StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - num);
			leftWidthValue = comboText + combo_leftWidthUnit.getItem(combo_leftWidthUnit.getSelectionIndex());
			setComboWidthValue();
		}
	}

	private void bottomWidthNumberInputConfim() {
		String comboText = combo_bottomWidth.getText();
		if (StyleCommonPropertyValue.matchesNumber(comboText)) {
			int num = Integer.valueOf(comboText);
			if (!combo_bottomWidthUnit.getEnabled()) {
				combo_bottomWidthUnit.setEnabled(true);
			}
			slider_bottomWidth.setSelection(StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - num);
			bottomWidthValue = comboText + combo_bottomWidthUnit.getItem(combo_bottomWidthUnit.getSelectionIndex());
			setComboWidthValue();
		}
	}

	private void rightWidthNumberInputConfim() {
		String comboText = combo_rightWidth.getText();
		if (StyleCommonPropertyValue.matchesNumber(comboText)) {
			int num = Integer.valueOf(comboText);
			if (!combo_rightWidthUnit.getEnabled()) {
				combo_rightWidthUnit.setEnabled(true);
			}
			slider_rightWidth.setSelection(StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - num);
			rightWidthValue = comboText + combo_rightWidthUnit.getItem(combo_rightWidthUnit.getSelectionIndex());
			setComboWidthValue();
		}
	}

	private void topWidthNumberInoutConfim() {
		String comboText = combo_topWidth.getText();
		if (StyleCommonPropertyValue.matchesNumber(comboText)) {
			int num = Integer.valueOf(comboText);
			if (!combo_topWidthUnit.getEnabled()) {
				combo_topWidthUnit.setEnabled(true);
			}
			int silderSelect = StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - num;
			slider_topWidth.setSelection(silderSelect);
			/*数字加上单位*/
			topWidthValue = comboText + combo_topWidthUnit.getItem(combo_topWidthUnit.getSelectionIndex());

			if (check_width_all.getSelection()) {

				rightWidthValue = topWidthValue;
				bottomWidthValue = topWidthValue;
				leftWidthValue = topWidthValue;

				combo_rightWidth.setText(comboText);
				combo_bottomWidth.setText(comboText);
				combo_leftWidth.setText(comboText);

				slider_rightWidth.setSelection(silderSelect);
				slider_bottomWidth.setSelection(silderSelect);
				slider_leftWidth.setSelection(silderSelect);
			}
			setComboWidthValue();
		}
	}

	private void mouseEvent(Control control) {
		control.addMouseListener(mouseAdapter);
	}

	public void registerEvent() {
		mouseEvent(this);
		mouseEvent(borderLabel);
		mouseEvent(borderLabel_1);
		mouseEvent(bordercolorLabel);
		mouseEvent(topLabel);
		mouseEvent(rightLabel);
		mouseEvent(bottomLabel);
		mouseEvent(leftLabel);

		composite_topColor.addMouseListener(new MouseAdapter() {
			public void mouseUp(MouseEvent e) {
				ColorDialog colorDialog = new ColorDialog(styleDialog.getShell());
				RGB topRgb = colorDialog.open();
				if (topRgb != null) {
					topColorValue = StyleCommonPropertyValue.parseRGBToStringValue(topRgb);
					text_topColor.setText(topColorValue);

					composite_topColor.setBackground(new Color(null, topRgb));
					if (check_color_all.getSelection()) {
						rightColorValue = topColorValue;
						bottomColorValue = topColorValue;
						leftColorValue = topColorValue;

						composite_rightColor.setBackground(new Color(null, topRgb));
						composite_bottomColor.setBackground(new Color(null, topRgb));
						composite_leftColor.setBackground(new Color(null, topRgb));
						text_rightColor.setText(topColorValue);
						text_bottomColor.setText(topColorValue);
						text_leftColor.setText(topColorValue);
					}
					setComboColorValue();
				}
			}
		});
		composite_rightColor.addMouseListener(new MouseAdapter() {
			public void mouseUp(MouseEvent e) {
				ColorDialog colorDialog = new ColorDialog(styleDialog.getShell());
				RGB rgb = colorDialog.open();
				if (rgb != null) {
					composite_rightColor.setBackground(new Color(null, rgb));
					rightColorValue = StyleCommonPropertyValue.parseRGBToStringValue(rgb);
					text_rightColor.setText(rightColorValue);
					setComboColorValue();
				}
			}
		});
		composite_bottomColor.addMouseListener(new MouseAdapter() {
			public void mouseUp(MouseEvent e) {
				ColorDialog colorDialog = new ColorDialog(styleDialog.getShell());
				RGB rgb = colorDialog.open();
				if (rgb != null) {
					composite_bottomColor.setBackground(new Color(null, rgb));
					bottomColorValue = StyleCommonPropertyValue.parseRGBToStringValue(rgb);
					text_bottomColor.setText(bottomColorValue);
					setComboColorValue();
				}
			}
		});
		composite_leftColor.addMouseListener(new MouseAdapter() {
			public void mouseUp(MouseEvent e) {
				ColorDialog colorDialog = new ColorDialog(styleDialog.getShell());
				RGB rgb = colorDialog.open();
				if (rgb != null) {
					composite_leftColor.setBackground(new Color(null, rgb));
					leftColorValue = StyleCommonPropertyValue.parseRGBToStringValue(rgb);
					text_leftColor.setText(leftColorValue);
					setComboColorValue();
				}
			}
		});

		combo_topWidth.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int topWidthIndex = combo_topWidth.getSelectionIndex();
				if (topWidthIndex != -1) {
					if (check_width_all.getSelection()) {
						combo_rightWidth.select(topWidthIndex);
						combo_bottomWidth.select(topWidthIndex);
						combo_leftWidth.select(topWidthIndex);

						combo_rightWidthUnit.setEnabled(false);
						combo_bottomWidthUnit.setEnabled(false);
						combo_leftWidthUnit.setEnabled(false);
					}
					if (topWidthIndex == combo_topWidth.getItems().length - 1) {
						combo_topWidthUnit.setEnabled(true);
					} else {
						topWidthValue = combo_topWidth.getItem(topWidthIndex);
						combo_topWidthUnit.setEnabled(false);
						if (check_width_all.getSelection()) {
							rightWidthValue = topWidthValue;
							bottomWidthValue = topWidthValue;
							leftWidthValue = topWidthValue;
						}
						StyleCommonPropertyValue.initSlide(slider_topWidth);
						setComboWidthValue();
					}
				}
			}
		});

		combo_topWidth.addFocusListener(new FocusAdapter() {
			public void focusLost(FocusEvent e) {
				topWidthNumberInoutConfim();
			}
		});
		combo_topWidth.addKeyListener(new KeyAdapter() {
			public void keyPressed(KeyEvent e) {
				if (e.keyCode == SWT.CR | e.keyCode == SWT.KEYPAD_CR) {
					topWidthNumberInoutConfim();
				}
			}
		});

		slider_topWidth.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				if (!combo_topWidthUnit.getEnabled()) {
					combo_topWidthUnit.setEnabled(true);
				}
				int intSelect = new Integer(slider_topWidth.getSelection());
				int valueSet = StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - intSelect;
				topWidthValue = valueSet + combo_topWidthUnit.getItem(combo_topWidthUnit.getSelectionIndex());
				combo_topWidth.setText(valueSet + "");

				if (check_width_all.getSelection()) {
					rightWidthValue = topWidthValue;
					bottomWidthValue = topWidthValue;
					leftWidthValue = topWidthValue;

					combo_rightWidth.setText(valueSet + "");
					combo_bottomWidth.setText(valueSet + "");
					combo_leftWidth.setText(valueSet + "");

					slider_rightWidth.setSelection(intSelect);
					slider_bottomWidth.setSelection(intSelect);
					slider_leftWidth.setSelection(intSelect);

				}
				setComboWidthValue();
			}
		});
		combo_topWidthUnit.addSelectionListener(new SelectionAdapter() {

			public void widgetSelected(SelectionEvent e) {
				if (StyleCommonPropertyValue.matchesNumber(combo_topWidth.getText())) {
					topWidthValue = combo_topWidth.getText() + combo_topWidthUnit.getItem(combo_topWidthUnit.getSelectionIndex());

					if (check_width_all.getSelection()) {
						rightWidthValue = topWidthValue;
						bottomWidthValue = topWidthValue;
						leftWidthValue = topWidthValue;

						combo_bottomWidthUnit.select(combo_topWidthUnit.getSelectionIndex());
						combo_rightWidthUnit.select(combo_topWidthUnit.getSelectionIndex());
						combo_leftWidthUnit.select(combo_topWidthUnit.getSelectionIndex());
					}
					setComboWidthValue();
				}
			}
		});

		combo_rightWidth.addSelectionListener(new SelectionAdapter() {

			public void widgetSelected(SelectionEvent e) {
				int index = combo_rightWidth.getSelectionIndex();
				if (index == combo_rightWidth.getItems().length - 1) {
					combo_rightWidthUnit.setEnabled(true);
				} else if (index != -1) {
					combo_rightWidthUnit.setEnabled(false);
					StyleCommonPropertyValue.initSlide(slider_rightWidth);
					rightWidthValue = combo_rightWidth.getItem(combo_rightWidth.getSelectionIndex());
					setComboWidthValue();
				}
			}
		});
		combo_rightWidth.addFocusListener(new FocusAdapter() {
			public void focusLost(FocusEvent e) {
				rightWidthNumberInputConfim();
			}
		});
		combo_rightWidth.addKeyListener(new KeyAdapter() {
			public void keyPressed(KeyEvent e) {
				if (e.keyCode == SWT.CR | e.keyCode == SWT.KEYPAD_CR) {
					rightWidthNumberInputConfim();
				}
			}
		});
		slider_rightWidth.addSelectionListener(new SelectionAdapter() {

			public void widgetSelected(SelectionEvent e) {
				if (!combo_rightWidthUnit.getEnabled()) {
					combo_rightWidthUnit.setEnabled(true);
				}
				int intSelect = new Integer(slider_rightWidth.getSelection());
				combo_rightWidth.setText((StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - intSelect) + "");
				rightWidthValue = combo_rightWidth.getText() + combo_rightWidthUnit.getItem(combo_rightWidthUnit.getSelectionIndex());
				setComboWidthValue();
			}
		});
		combo_rightWidthUnit.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				if (StyleCommonPropertyValue.matchesNumber(combo_rightWidth.getText())) {
					rightWidthValue = combo_rightWidth.getText() + combo_rightWidthUnit.getItem(combo_rightWidthUnit.getSelectionIndex());
					setComboWidthValue();
				}
			}
		});

		combo_bottomWidth.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				int index = combo_bottomWidth.getSelectionIndex();
				if (index == combo_bottomWidth.getItems().length - 1) {
					combo_bottomWidthUnit.setEnabled(true);
				} else if (index != -1) {
					combo_bottomWidthUnit.setEnabled(false);
					StyleCommonPropertyValue.initSlide(slider_bottomWidth);
					bottomWidthValue = combo_bottomWidth.getItem(combo_bottomWidth.getSelectionIndex());
					setComboWidthValue();
				}
			}
		});
		combo_bottomWidth.addFocusListener(new FocusAdapter() {

			public void focusLost(FocusEvent e) {
				bottomWidthNumberInputConfim();
			}
		});
		combo_bottomWidth.addKeyListener(new KeyAdapter() {
			public void keyPressed(KeyEvent e) {
				if (e.keyCode == SWT.CR | e.keyCode == SWT.KEYPAD_CR) {
					bottomWidthNumberInputConfim();
				}
			}
		});
		slider_bottomWidth.addSelectionListener(new SelectionAdapter() {

			public void widgetSelected(SelectionEvent e) {
				if (!combo_bottomWidthUnit.getEnabled()) {
					combo_bottomWidthUnit.setEnabled(true);
				}
				int intSelect = new Integer(slider_bottomWidth.getSelection());
				combo_bottomWidth.setText((StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - intSelect) + "");
				bottomWidthValue = combo_bottomWidth.getText() + combo_bottomWidthUnit.getItem(combo_bottomWidthUnit.getSelectionIndex());
				setComboWidthValue();
			}
		});
		combo_bottomWidthUnit.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				if (StyleCommonPropertyValue.matchesNumber(combo_bottomWidth.getText())) {
					bottomWidthValue = combo_bottomWidth.getText() + combo_bottomWidthUnit.getItem(combo_bottomWidthUnit.getSelectionIndex());
					setComboWidthValue();
				}
			}
		});

		combo_leftWidth.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				int index = combo_leftWidth.getSelectionIndex();
				if (index == combo_leftWidth.getItems().length - 1) {
					combo_leftWidthUnit.setEnabled(true);
				} else if (index != -1) {
					combo_leftWidthUnit.setEnabled(false);
					StyleCommonPropertyValue.initSlide(slider_leftWidth);
					leftWidthValue = combo_leftWidth.getItem(combo_leftWidth.getSelectionIndex());
					setComboWidthValue();
				}
			}
		});
		combo_leftWidth.addFocusListener(new FocusAdapter() {
			public void focusLost(FocusEvent e) {
				leftWidthNumberInputConfim();
			}
		});
		combo_leftWidth.addKeyListener(new KeyAdapter() {
			public void keyPressed(KeyEvent e) {
				if (e.keyCode == SWT.CR | e.keyCode == SWT.KEYPAD_CR) {
					leftWidthNumberInputConfim();
				}
			}
		});
		slider_leftWidth.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				if (!combo_leftWidthUnit.getEnabled()) {
					combo_leftWidthUnit.setEnabled(true);
				}
				int intSelect = new Integer(slider_leftWidth.getSelection());
				combo_leftWidth.setText((StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - intSelect) + "");
				leftWidthValue = combo_leftWidth.getText() + combo_leftWidthUnit.getItem(combo_leftWidthUnit.getSelectionIndex());
				setComboWidthValue();
			}
		});
		combo_leftWidthUnit.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				if (StyleCommonPropertyValue.matchesNumber(combo_leftWidth.getText())) {
					leftWidthValue = combo_leftWidth.getText() + combo_leftWidthUnit.getItem(combo_leftWidthUnit.getSelectionIndex());
					setComboWidthValue();
				}
			}
		});

		combo_topStyle.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int topStyleIndex = combo_topStyle.getSelectionIndex();
				if (topStyleIndex != -1) {
					topStyleValue = combo_topStyle.getItem(topStyleIndex);
					if (check_style_all.getSelection()) {
						rightStyleValue = topStyleValue;
						bottomStyleValue = topStyleValue;
						leftStyleValue = topStyleValue;
						combo_rightStyle.select(topStyleIndex);
						combo_bottomStyle.select(topStyleIndex);
						combo_leftStyle.select(topStyleIndex);
					}
					setComboStyleValue();
				}
			}
		});

		combo_rightStyle.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_rightStyle.getSelectionIndex();
				if (index != -1) {
					rightStyleValue = combo_rightStyle.getItem(index);
					setComboStyleValue();
				}
			}
		});

		combo_bottomStyle.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_bottomStyle.getSelectionIndex();
				if (index != -1) {
					bottomStyleValue = combo_bottomStyle.getItem(index);
					setComboStyleValue();
				}
			}
		});

		combo_leftStyle.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_leftStyle.getSelectionIndex();
				if (index != -1) {
					leftStyleValue = combo_leftStyle.getItem(index);
					setComboStyleValue();
				}
			}
		});

		check_style_all.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (check_style_all.getSelection()) {
					combo_rightStyle.setEnabled(false);
					combo_bottomStyle.setEnabled(false);
					combo_leftStyle.setEnabled(false);
					if (combo_topStyle.getSelectionIndex() != -1) {
						int topStyleIndex = combo_topStyle.getSelectionIndex();
						topStyleValue = combo_topStyle.getItem(topStyleIndex);
						rightStyleValue = topStyleValue;
						bottomStyleValue = topStyleValue;
						leftStyleValue = topStyleValue;
						combo_rightStyle.select(topStyleIndex);
						combo_bottomStyle.select(topStyleIndex);
						combo_leftStyle.select(topStyleIndex);
						setComboStyleValue();
					}
				} else {
					combo_rightStyle.setEnabled(true);
					combo_bottomStyle.setEnabled(true);
					combo_leftStyle.setEnabled(true);
				}
			}
		});

		check_width_all.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				if (check_width_all.getSelection()) {
					combo_rightWidth.setEnabled(false);
					combo_bottomWidth.setEnabled(false);
					combo_leftWidth.setEnabled(false);
					slider_rightWidth.setEnabled(false);
					slider_bottomWidth.setEnabled(false);
					slider_leftWidth.setEnabled(false);
					combo_rightWidthUnit.setEnabled(false);
					combo_bottomWidthUnit.setEnabled(false);
					combo_leftWidthUnit.setEnabled(false);
					if (!combo_topWidthUnit.getEnabled()) {
						int topWidthIndex = combo_topWidth.getSelectionIndex();
						if (topWidthIndex != -1) {
							topWidthValue = combo_topWidth.getItem(topWidthIndex);
							rightWidthValue = topWidthValue;
							bottomWidthValue = topWidthValue;
							leftWidthValue = topWidthValue;
							combo_rightWidth.select(topWidthIndex);
							combo_leftWidth.select(topWidthIndex);
							combo_bottomWidth.select(topWidthIndex);
							setComboWidthValue();
						}
					} else {
						String topWidthText = combo_topWidth.getText();
						if (StyleCommonPropertyValue.matchesNumber(topWidthText)) {
							String topWidthUnitValue = combo_rightWidthUnit.getItem(combo_rightWidthUnit.getSelectionIndex());
							combo_rightWidth.setText(topWidthText);
							combo_leftWidth.setText(topWidthText);
							combo_bottomWidth.setText(topWidthText);
							topWidthValue = topWidthText + topWidthUnitValue;
							rightWidthValue = topWidthValue;
							bottomWidthValue = topWidthValue;
							leftWidthValue = topWidthValue;
							setComboWidthValue();
						}
					}
					slider_rightWidth.setSelection(slider_topWidth.getSelection());
					slider_bottomWidth.setSelection(slider_topWidth.getSelection());
					slider_leftWidth.setSelection(slider_topWidth.getSelection());
					combo_rightWidthUnit.select(combo_topWidthUnit.getSelectionIndex());
					combo_leftWidthUnit.select(combo_topWidthUnit.getSelectionIndex());
					combo_bottomWidthUnit.select(combo_topWidthUnit.getSelectionIndex());
				} else {
					combo_rightWidth.setEnabled(true);
					combo_bottomWidth.setEnabled(true);
					combo_leftWidth.setEnabled(true);
					slider_rightWidth.setEnabled(true);
					slider_bottomWidth.setEnabled(true);
					slider_leftWidth.setEnabled(true);
					combo_rightWidthUnit.setEnabled(combo_topWidthUnit.getEnabled());
					combo_bottomWidthUnit.setEnabled(combo_topWidthUnit.getEnabled());
					combo_leftWidthUnit.setEnabled(combo_topWidthUnit.getEnabled());
				}
			}
		});

		check_color_all.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				if (check_color_all.getSelection()) {
					text_rightColor.setEnabled(false);
					text_bottomColor.setEnabled(false);
					text_leftColor.setEnabled(false);
					composite_rightColor.setEnabled(false);
					composite_bottomColor.setEnabled(false);
					composite_leftColor.setEnabled(false);

					topColorValue = text_topColor.getText();
					rightColorValue = topColorValue;
					bottomColorValue = topColorValue;
					leftColorValue = topColorValue;

					Color topColor = composite_topColor.getBackground();

					composite_rightColor.setBackground(topColor);
					composite_bottomColor.setBackground(topColor);
					composite_leftColor.setBackground(topColor);
					text_rightColor.setText(topColorValue);
					text_bottomColor.setText(topColorValue);
					text_leftColor.setText(topColorValue);
				} else {
					text_rightColor.setEnabled(true);
					text_bottomColor.setEnabled(true);
					text_leftColor.setEnabled(true);
					composite_rightColor.setEnabled(true);
					composite_bottomColor.setEnabled(true);
					composite_leftColor.setEnabled(true);
				}
				setComboColorValue();
			}
		});

		text_topColor.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = text_topColor.getSelectionIndex();
				if (index != -1) {
					composite_topColor.setBackground(StyleCommonPropertyValue.DEFAULT_COLOR);
					topColorValue = text_topColor.getText();
					if (check_color_all.getSelection()) {

						rightColorValue = topColorValue;
						bottomColorValue = topColorValue;
						leftColorValue = topColorValue;

						composite_rightColor.setBackground(StyleCommonPropertyValue.DEFAULT_COLOR);
						composite_bottomColor.setBackground(StyleCommonPropertyValue.DEFAULT_COLOR);
						composite_leftColor.setBackground(StyleCommonPropertyValue.DEFAULT_COLOR);
						text_rightColor.select(index);
						text_bottomColor.select(index);
						text_leftColor.select(index);
					}
					setComboColorValue();
				}
			}
		});

		text_rightColor.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				int index = text_rightColor.getSelectionIndex();
				if (index != -1) {
					composite_rightColor.setBackground(StyleCommonPropertyValue.DEFAULT_COLOR);
					rightColorValue = text_rightColor.getText();
					setComboColorValue();
				}
			}
		});

		text_bottomColor.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = text_bottomColor.getSelectionIndex();
				if (index != -1) {
					composite_bottomColor.setBackground(StyleCommonPropertyValue.DEFAULT_COLOR);
					bottomColorValue = text_bottomColor.getText();
					setComboColorValue();
				}
			}
		});

		text_leftColor.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = text_leftColor.getSelectionIndex();
				if (index != -1) {
					composite_leftColor.setBackground(StyleCommonPropertyValue.DEFAULT_COLOR);
					leftColorValue = text_leftColor.getText();
					setComboColorValue();
				}
			}
		});
	}

	private void setComboWidthValue() {
		if ((topWidthValue != null && !"".equals(topWidthValue)) && (rightWidthValue != null && !"".equals(rightWidthValue))
				&& (bottomWidthValue != null && !"".equals(bottomWidthValue)) && (leftWidthValue != null && !"".equals(leftWidthValue))) {

			styleDialog.removeProperty("border-top-width");
			styleDialog.removeProperty("border-right-width");
			styleDialog.removeProperty("border-bottom-width");
			styleDialog.removeProperty("border-left-width");

			styleDialog.setPropertyValue(pageName, "border-width", topWidthValue + " " + rightWidthValue + " " + bottomWidthValue + " "
					+ leftWidthValue);
			styleDialog.rePaintText("border-top-width", topWidthValue, false);
			styleDialog.rePaintText("border-right-width", rightWidthValue, false);
			styleDialog.rePaintText("border-bottom-width", bottomWidthValue, false);
			styleDialog.rePaintText("border-left-width", leftWidthValue, true);

		} else {
			styleDialog.removeProperty("border-width");
			if (topWidthValue != null && !"".equals(topWidthValue)) {
				styleDialog.setPropertyValue(pageName, "border-top-width", topWidthValue);
			} else {
				styleDialog.removeProperty("border-top-width");
			}
			styleDialog.rePaintText("border-top-width", topWidthValue, false);

			if (rightWidthValue != null && !"".equals(rightWidthValue)) {
				styleDialog.setPropertyValue(pageName, "border-right-width", rightWidthValue);
			} else {
				styleDialog.removeProperty("border-right-width");
			}
			styleDialog.rePaintText("border-right-width", rightWidthValue, false);

			if (bottomWidthValue != null && !"".equals(bottomWidthValue)) {
				styleDialog.setPropertyValue(pageName, "border-bottom-width", bottomWidthValue);
			} else {
				styleDialog.removeProperty("border-bottom-width");
			}
			styleDialog.rePaintText("border-bottom-width", bottomWidthValue, false);

			if (leftWidthValue != null && !"".equals(leftWidthValue)) {
				styleDialog.setPropertyValue(pageName, "border-left-width", leftWidthValue);
			} else {
				styleDialog.removeProperty("border-left-width");
			}
			styleDialog.rePaintText("border-left-width", leftWidthValue, true);
		}
	}

	private void setComboColorValue() {
		if ((topColorValue != null && !"".equals(topColorValue)) && (rightColorValue != null && !"".equals(rightColorValue))
				&& (bottomColorValue != null && !"".equals(bottomColorValue)) && (leftColorValue != null && !"".equals(leftColorValue))) {

			styleDialog.removeProperty("border-top-color");
			styleDialog.removeProperty("border-right-color");
			styleDialog.removeProperty("border-bottom-color");
			styleDialog.removeProperty("border-left-color");

			styleDialog.setPropertyValue(pageName, "border-color", topColorValue + " " + rightColorValue + " " + bottomColorValue + " "
					+ leftColorValue);
			styleDialog.rePaintText("border-top-color", topColorValue, false);
			styleDialog.rePaintText("border-right-color", rightColorValue, false);
			styleDialog.rePaintText("border-bottom-color", bottomColorValue, false);
			styleDialog.rePaintText("border-left-color", leftColorValue, true);
		} else {
			styleDialog.removeProperty("border-color");
			if (topColorValue != null && !"".equals(topColorValue)) {
				styleDialog.setPropertyValue(pageName, "border-top-color", topColorValue);
			} else {
				styleDialog.removeProperty("border-top-color");
			}
			styleDialog.rePaintText("border-top-color", topColorValue, false);
			if (rightColorValue != null && !"".equals(rightColorValue)) {
				styleDialog.setPropertyValue(pageName, "border-right-color", rightColorValue);
			} else {
				styleDialog.removeProperty("border-right-color");
			}
			styleDialog.rePaintText("border-right-color", rightColorValue, false);
			if (bottomColorValue != null && !"".equals(bottomColorValue)) {
				styleDialog.setPropertyValue(pageName, "border-bottom-color", bottomColorValue);
			} else {
				styleDialog.removeProperty("border-bottom-color");
			}
			styleDialog.rePaintText("border-bottom-color", bottomColorValue, false);
			if (leftColorValue != null && !"".equals(leftColorValue)) {
				styleDialog.setPropertyValue(pageName, "border-left-color", leftColorValue);
			} else {
				styleDialog.removeProperty("border-left-color");
			}
			styleDialog.rePaintText("border-left-color", leftColorValue, true);
		}
	}

	private void setComboStyleValue() {
		if ((topStyleValue != null && !"".equals(topStyleValue)) && (rightStyleValue != null && !"".equals(rightStyleValue))
				&& (bottomStyleValue != null && !"".equals(bottomStyleValue)) && (leftStyleValue != null && !"".equals(leftStyleValue))) {
			styleDialog.removeProperty("border-top-style");
			styleDialog.removeProperty("border-right-style");
			styleDialog.removeProperty("border-bottom-style");
			styleDialog.removeProperty("border-left-style");
			styleDialog.setPropertyValue(pageName, "border-style", topStyleValue + " " + rightStyleValue + " " + bottomStyleValue + " "
					+ leftStyleValue);
			styleDialog.rePaintText("border-top-style", topStyleValue, false);
			styleDialog.rePaintText("border-right-style", rightStyleValue, false);
			styleDialog.rePaintText("border-bottom-style", bottomStyleValue, false);
			styleDialog.rePaintText("border-left-style", leftStyleValue, true);
		} else {
			styleDialog.removeProperty("border-style");
			if (topStyleValue != null && !"".equals(topStyleValue)) {
				styleDialog.setPropertyValue(pageName, "border-top-style", topStyleValue);
			} else {
				styleDialog.removeProperty("border-top-style");
			}
			styleDialog.rePaintText("border-top-style", topStyleValue, false);
			if (rightStyleValue != null && !"".equals(rightStyleValue)) {
				styleDialog.setPropertyValue(pageName, "border-right-style", rightStyleValue);
			} else {
				styleDialog.removeProperty("border-right-style");
			}
			styleDialog.rePaintText("border-right-style", rightStyleValue, false);
			if (bottomStyleValue != null && !"".equals(bottomStyleValue)) {
				styleDialog.setPropertyValue(pageName, "border-bottom-style", bottomStyleValue);
			} else {
				styleDialog.removeProperty("border-bottom-style");
			}
			styleDialog.rePaintText("border-bottom-style", bottomStyleValue, false);
			if (leftStyleValue != null && !"".equals(leftStyleValue)) {
				styleDialog.setPropertyValue(pageName, "border-left-style", leftStyleValue);
			} else {
				styleDialog.removeProperty("border-left-style");
			}
			styleDialog.rePaintText("border-left-style", leftStyleValue, true);
		}
	}
}
