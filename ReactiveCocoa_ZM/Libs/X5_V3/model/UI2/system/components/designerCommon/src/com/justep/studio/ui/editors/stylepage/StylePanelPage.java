package com.justep.studio.ui.editors.stylepage;

import java.io.File;

import org.eclipse.swt.SWT;
import org.eclipse.swt.events.FocusEvent;
import org.eclipse.swt.events.FocusListener;
import org.eclipse.swt.events.KeyAdapter;
import org.eclipse.swt.events.KeyEvent;
import org.eclipse.swt.events.MouseAdapter;
import org.eclipse.swt.events.MouseEvent;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.events.SelectionListener;
import org.eclipse.swt.graphics.Image;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Button;
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
import com.justep.studio.util.StudioConfig;

/**
 * 方框
 * @author linhongbao
 *
 */
public class StylePanelPage extends Composite implements IPropertyDialogPage, IStylePage {

	private Combo combo_maLeftUnit;
	private Combo combo_maLeft;
	private Combo combo_paLeftUnit;
	private Combo combo_paLeft;
	private Combo combo_maBottomUnit;
	private Combo combo_maBottom;
	private Combo combo_paBottomUnit;
	private Combo combo_paBottom;
	private Combo combo_maRightUnit;
	private Combo combo_maRight;
	private Combo combo_paRightUnit;
	private Combo combo_paRight;
	private Combo combo_maTopUnit;
	private Combo combo_maTop;
	private Combo combo_paTopUnit;
	private Combo combo_paTop;
	private Slider slider_paTop;
	private Slider slider_paRight;
	private Slider slider_paBottom;
	private Slider slider_paLeft;
	private Slider slider_maTop;
	private Slider slider_maRight;
	private Slider slider_maBottom;
	private Slider slider_maLeft;
	private String pageName = "方框";

	private StyleDialog styleDialog;
	private Button check_paddingAll;
	private Button check_marginAll;
	private String styleValue;

	private String topPaddingValue;
	private String rightPaddingValue;
	private String bottomPaddingValue;
	private String leftPaddingValue;

	private String topMarginValue;
	private String rightMarginValue;
	private String bottomMarginValue;
	private String leftMarginValue;

	private Label paddingLabel;
	private Label marginLabel;
	private Label topLabel;
	private Label rightLabel;
	private Label bottomLabel;
	private Label leftLabel;
	private Label topLabel_1;
	private Label rightLabel_1;
	private Label bottomLabel_1;
	private Label leftLabel_1;
	private Composite composite;
	private Label label_4;
	private Composite composite_10;
	private Composite composite_1;

	public StylePanelPage(Composite parent, StyleDialog styleDialog, String styleValue, int style) {
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

		combo_paTop.setItems(new String[] { "", "inherit", "(值)" });
		combo_paRight.setItems(new String[] { "", "inherit", "(值)" });
		combo_paBottom.setItems(new String[] { "", "inherit", "(值)" });
		combo_paLeft.setItems(new String[] { "", "inherit", "(值)" });

		combo_maTop.setItems(new String[] { "", "auto", "inherit", "(值)" });
		combo_maRight.setItems(new String[] { "", "auto", "inherit", "(值)" });
		combo_maBottom.setItems(new String[] { "", "auto", "inherit", "(值)" });
		combo_maLeft.setItems(new String[] { "", "auto", "inherit", "(值)" });

		combo_paTopUnit.setItems(StyleCommonPropertyValue.NUMBER_UNIT_VALUE);
		combo_paTopUnit.select(0);

		combo_maTopUnit.setItems(StyleCommonPropertyValue.NUMBER_UNIT_VALUE);
		combo_maTopUnit.select(0);

		combo_paRightUnit.setItems(StyleCommonPropertyValue.NUMBER_UNIT_VALUE);
		combo_paRightUnit.select(0);

		combo_maRightUnit.setItems(StyleCommonPropertyValue.NUMBER_UNIT_VALUE);
		combo_maRightUnit.select(0);

		combo_paBottomUnit.setItems(StyleCommonPropertyValue.NUMBER_UNIT_VALUE);
		combo_paBottomUnit.select(0);

		combo_maBottomUnit.setItems(StyleCommonPropertyValue.NUMBER_UNIT_VALUE);
		combo_maBottomUnit.select(0);

		combo_paLeftUnit.setItems(StyleCommonPropertyValue.NUMBER_UNIT_VALUE);
		combo_paLeftUnit.select(0);

		combo_maLeftUnit.setItems(StyleCommonPropertyValue.NUMBER_UNIT_VALUE);
		combo_maLeftUnit.select(0);

		check_paddingAll.setSelection(true);
		combo_paTopUnit.setEnabled(false);
		combo_paRight.setEnabled(false);
		combo_paBottom.setEnabled(false);
		combo_paLeft.setEnabled(false);
		slider_paRight.setEnabled(false);
		slider_paBottom.setEnabled(false);
		slider_paLeft.setEnabled(false);
		combo_paRightUnit.setEnabled(false);
		combo_paBottomUnit.setEnabled(false);
		combo_paLeftUnit.setEnabled(false);

		check_marginAll.setSelection(true);
		combo_maTopUnit.setEnabled(false);
		combo_maRight.setEnabled(false);
		combo_maBottom.setEnabled(false);
		combo_maLeft.setEnabled(false);
		slider_maRight.setEnabled(false);
		slider_maBottom.setEnabled(false);
		slider_maLeft.setEnabled(false);
		combo_maRightUnit.setEnabled(false);
		combo_maBottomUnit.setEnabled(false);
		combo_maLeftUnit.setEnabled(false);

		StyleCommonPropertyValue.initSlide(slider_maBottom);
		StyleCommonPropertyValue.initSlide(slider_maLeft);
		StyleCommonPropertyValue.initSlide(slider_maRight);
		StyleCommonPropertyValue.initSlide(slider_maTop);
		StyleCommonPropertyValue.initSlide(slider_paBottom);
		StyleCommonPropertyValue.initSlide(slider_paLeft);
		StyleCommonPropertyValue.initSlide(slider_paRight);
		StyleCommonPropertyValue.initSlide(slider_paTop);
	}

	public void initLayout() {
		GridLayout gridLayout = new GridLayout();
		setLayout(gridLayout);

		composite = new Composite(this, SWT.NONE);
		final GridData gd_composite = new GridData(SWT.FILL, SWT.CENTER, true, false);
		gd_composite.heightHint = 145;
		composite.setLayoutData(gd_composite);

		final TableWrapLayout tableLayout = new TableWrapLayout();
		tableLayout.numColumns = 8;
		composite.setLayout(tableLayout);

		paddingLabel = new Label(composite, SWT.NONE);
		paddingLabel.setText("padding:");

		check_paddingAll = new Button(composite, SWT.CHECK);
		check_paddingAll.setText("全部相同");

		new Label(composite, SWT.NONE);
		new Label(composite, SWT.NONE);

		marginLabel = new Label(composite, SWT.NONE);
		marginLabel.setText("margin:");

		check_marginAll = new Button(composite, SWT.CHECK);
		check_marginAll.setText("全部相同");

		new Label(composite, SWT.NONE);
		new Label(composite, SWT.NONE);

		topLabel = new Label(composite, SWT.NONE);
		final TableWrapData topLabelData = new TableWrapData(TableWrapData.RIGHT);
		topLabel.setText("top:");
		topLabel.setLayoutData(topLabelData);

		combo_paTop = new Combo(composite, SWT.NONE);
		combo_paTop.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		slider_paTop = new Slider(composite, SWT.VERTICAL);
		final TableWrapData twd_slider_paTop = new TableWrapData(TableWrapData.LEFT, TableWrapData.TOP);
		twd_slider_paTop.heightHint = 20;
		slider_paTop.setLayoutData(twd_slider_paTop);

		combo_paTopUnit = new Combo(composite, SWT.NONE);
		combo_paTopUnit.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		topLabel_1 = new Label(composite, SWT.NONE);
		final TableWrapData topLabel_1Data = new TableWrapData(TableWrapData.RIGHT);
		topLabel_1.setText("top:");
		topLabel_1.setLayoutData(topLabel_1Data);

		combo_maTop = new Combo(composite, SWT.NONE);
		combo_maTop.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		slider_maTop = new Slider(composite, SWT.VERTICAL);
		final TableWrapData twd_slider_maTop = new TableWrapData(TableWrapData.LEFT, TableWrapData.TOP);
		twd_slider_maTop.heightHint = 20;
		slider_maTop.setLayoutData(twd_slider_maTop);

		combo_maTopUnit = new Combo(composite, SWT.NONE);
		combo_maTopUnit.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		rightLabel = new Label(composite, SWT.NONE);
		final TableWrapData rightLabelData = new TableWrapData(TableWrapData.RIGHT);
		rightLabel.setText("right:");
		rightLabel.setLayoutData(rightLabelData);

		combo_paRight = new Combo(composite, SWT.NONE);
		combo_paRight.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		slider_paRight = new Slider(composite, SWT.VERTICAL);
		final TableWrapData twd_slider_paRight = new TableWrapData(TableWrapData.LEFT, TableWrapData.TOP);
		twd_slider_paRight.heightHint = 20;
		slider_paRight.setLayoutData(twd_slider_paRight);

		combo_paRightUnit = new Combo(composite, SWT.NONE);
		combo_paRightUnit.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		rightLabel_1 = new Label(composite, SWT.NONE);
		final TableWrapData rightLabel_1Data = new TableWrapData(TableWrapData.RIGHT);
		rightLabel_1.setLayoutData(rightLabel_1Data);
		rightLabel_1.setText("right:");

		combo_maRight = new Combo(composite, SWT.NONE);
		combo_maRight.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		slider_maRight = new Slider(composite, SWT.VERTICAL);
		final TableWrapData twd_slider_maRight = new TableWrapData(TableWrapData.LEFT, TableWrapData.TOP);
		twd_slider_maRight.heightHint = 20;
		slider_maRight.setLayoutData(twd_slider_maRight);

		combo_maRightUnit = new Combo(composite, SWT.NONE);
		combo_maRightUnit.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		bottomLabel = new Label(composite, SWT.NONE);
		final TableWrapData bottomLabelData = new TableWrapData(TableWrapData.RIGHT);
		bottomLabel.setText("bottom:");
		bottomLabel.setLayoutData(bottomLabelData);

		combo_paBottom = new Combo(composite, SWT.NONE);
		combo_paBottom.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		slider_paBottom = new Slider(composite, SWT.VERTICAL);
		final TableWrapData twd_slider_paBottom = new TableWrapData(TableWrapData.LEFT, TableWrapData.TOP);
		twd_slider_paBottom.heightHint = 20;
		slider_paBottom.setLayoutData(twd_slider_paBottom);

		combo_paBottomUnit = new Combo(composite, SWT.NONE);
		combo_paBottomUnit.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		bottomLabel_1 = new Label(composite, SWT.NONE);
		final TableWrapData bottomLabel_1Data = new TableWrapData(TableWrapData.RIGHT);
		bottomLabel_1.setLayoutData(bottomLabel_1Data);
		bottomLabel_1.setText("bottom:");

		combo_maBottom = new Combo(composite, SWT.NONE);
		combo_maBottom.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		slider_maBottom = new Slider(composite, SWT.VERTICAL);
		final TableWrapData twd_slider_maBottom = new TableWrapData(TableWrapData.LEFT, TableWrapData.TOP);
		twd_slider_maBottom.heightHint = 20;
		slider_maBottom.setLayoutData(twd_slider_maBottom);

		combo_maBottomUnit = new Combo(composite, SWT.NONE);
		combo_maBottomUnit.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		leftLabel = new Label(composite, SWT.NONE);
		final TableWrapData leftLabelData = new TableWrapData(TableWrapData.RIGHT);
		leftLabel.setLayoutData(leftLabelData);
		leftLabel.setText("left:");

		combo_paLeft = new Combo(composite, SWT.NONE);
		combo_paLeft.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		slider_paLeft = new Slider(composite, SWT.VERTICAL);
		final TableWrapData twd_slider_paLeft = new TableWrapData(TableWrapData.LEFT, TableWrapData.TOP);
		twd_slider_paLeft.heightHint = 20;
		slider_paLeft.setLayoutData(twd_slider_paLeft);

		combo_paLeftUnit = new Combo(composite, SWT.NONE);
		combo_paLeftUnit.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		leftLabel_1 = new Label(composite, SWT.NONE);
		final TableWrapData leftLabel_1Data = new TableWrapData(TableWrapData.RIGHT);
		leftLabel_1.setLayoutData(leftLabel_1Data);
		leftLabel_1.setText("left:");

		combo_maLeft = new Combo(composite, SWT.NONE);
		combo_maLeft.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		slider_maLeft = new Slider(composite, SWT.VERTICAL);
		final TableWrapData twd_slider_maLeft = new TableWrapData(TableWrapData.LEFT, TableWrapData.TOP);
		twd_slider_maLeft.heightHint = 20;
		slider_maLeft.setLayoutData(twd_slider_maLeft);

		combo_maLeftUnit = new Combo(composite, SWT.NONE);
		combo_maLeftUnit.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		composite_1 = new Composite(this, SWT.NONE);
		final GridData gd_composite_1 = new GridData(SWT.FILL, SWT.CENTER, true, false);
		gd_composite_1.heightHint = 115;
		composite_1.setLayoutData(gd_composite_1);
		composite_1.setLayout(new GridLayout());

		label_4 = new Label(composite_1, SWT.NONE);
		label_4.setText("CSS 方框模型参考：");

		composite_10 = new Composite(composite_1, SWT.BORDER);

		String imagePath = StudioConfig.getBIZPath() + "/system/images/style.jpg";
		File file = new File(imagePath);
		if (file.exists()) {
			composite_10.setBackgroundImage(new Image(null, imagePath));
		}
		composite_10.setLayoutData(new GridData(250,85));
		composite_10.setLayout(new GridLayout());
	}

	public void initSelfDefaultValue() {
		boolean hashDefaultValue = false;
		if (styleValue == null || "".equals(styleValue)) {
			return;
		}
		if (StyleCommonPropertyValue.setJoinComboValueIndexWithUnit("padding",
				new Combo[] { combo_paTop, combo_paRight, combo_paBottom, combo_paLeft }, new Slider[] { slider_paTop, slider_paRight,
						slider_paBottom, slider_paLeft }, new Combo[] { combo_paTopUnit, combo_paRightUnit, combo_paBottomUnit, combo_paLeftUnit },
				styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndexWithUnit("padding-top", combo_paTop, slider_paTop, combo_paTopUnit, styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndexWithUnit("padding-right", combo_paRight, slider_paRight, combo_paRightUnit, styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndexWithUnit("padding-bottom", combo_paBottom, slider_paBottom, combo_paBottomUnit, styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndexWithUnit("padding-left", combo_paLeft, slider_paLeft, combo_paLeftUnit, styleValue)) {
			hashDefaultValue = true;
		}

		if (combo_paTopUnit.getEnabled()) {
			topPaddingValue = combo_paTop.getText() + combo_paTopUnit.getItem(combo_paTopUnit.getSelectionIndex());
		} else if (combo_paTop.getSelectionIndex() != -1) {
			topPaddingValue = combo_paTop.getItem(combo_paTop.getSelectionIndex());
		}
		if (combo_paRightUnit.getEnabled()) {
			rightPaddingValue = combo_paRight.getText() + combo_paRightUnit.getItem(combo_paRightUnit.getSelectionIndex());
		} else if (combo_paRight.getSelectionIndex() != -1) {
			rightPaddingValue = combo_paRight.getItem(combo_paRight.getSelectionIndex());
		}
		if (combo_paBottomUnit.getEnabled()) {
			bottomPaddingValue = combo_paBottom.getText() + combo_paBottomUnit.getItem(combo_paBottomUnit.getSelectionIndex());
		} else if (combo_paBottom.getSelectionIndex() != -1) {
			bottomPaddingValue = combo_paBottom.getItem(combo_paBottom.getSelectionIndex());
		}
		if (combo_paLeftUnit.getEnabled()) {
			leftPaddingValue = combo_paLeft.getText() + combo_paLeftUnit.getItem(combo_paLeftUnit.getSelectionIndex());
		} else if (combo_paLeft.getSelectionIndex() != -1) {
			leftPaddingValue = combo_paLeft.getItem(combo_paLeft.getSelectionIndex());
		}

		if (combo_paTop.getText().equals(combo_paRight.getText()) && combo_paTop.getText().equals(combo_paBottom.getText())
				&& combo_paTop.getText().equals(combo_paLeft.getText())
				&& combo_paTopUnit.getSelectionIndex() == combo_paRightUnit.getSelectionIndex()
				&& combo_paTopUnit.getSelectionIndex() == combo_paBottomUnit.getSelectionIndex()
				&& combo_paTopUnit.getSelectionIndex() == combo_paLeftUnit.getSelectionIndex()) {
			check_paddingAll.setSelection(true);
			combo_paRightUnit.setEnabled(false);
			combo_paBottomUnit.setEnabled(false);
			combo_paLeftUnit.setEnabled(false);
		} else {
			check_paddingAll.setSelection(false);
			combo_paRight.setEnabled(true);
			combo_paBottom.setEnabled(true);
			combo_paLeft.setEnabled(true);
			slider_paRight.setEnabled(true);
			slider_paBottom.setEnabled(true);
			slider_paLeft.setEnabled(true);
			if (StyleCommonPropertyValue.matchesNumber(combo_paRight.getText())) {
				combo_paRightUnit.setEnabled(true);
			}
			if (StyleCommonPropertyValue.matchesNumber(combo_paBottom.getText())) {
				combo_paBottomUnit.setEnabled(true);
			}
			if (StyleCommonPropertyValue.matchesNumber(combo_paLeft.getText())) {
				combo_paLeftUnit.setEnabled(true);
			}
		}

		if (StyleCommonPropertyValue.setJoinComboValueIndexWithUnit("margin",
				new Combo[] { combo_maTop, combo_maRight, combo_maBottom, combo_maLeft }, new Slider[] { slider_maTop, slider_maRight,
						slider_maBottom, slider_maLeft }, new Combo[] { combo_maTopUnit, combo_maRightUnit, combo_maBottomUnit, combo_maLeftUnit },
				styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndexWithUnit("margin-top", combo_maTop, slider_maTop, combo_maTopUnit, styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndexWithUnit("margin-right", combo_maRight, slider_maRight, combo_maRightUnit, styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndexWithUnit("margin-bottom", combo_maBottom, slider_maBottom, combo_maBottomUnit, styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndexWithUnit("margin-left", combo_maLeft, slider_maLeft, combo_maLeftUnit, styleValue)) {
			hashDefaultValue = true;
		}

		if (combo_maTopUnit.getEnabled()) {
			topMarginValue = combo_maTop.getText() + combo_maTopUnit.getItem(combo_maTopUnit.getSelectionIndex());
		} else if (combo_maTop.getSelectionIndex() != -1) {
			topMarginValue = combo_maTop.getItem(combo_maTop.getSelectionIndex());
		}
		if (combo_maRightUnit.getEnabled()) {
			rightMarginValue = combo_maRight.getText() + combo_maRightUnit.getItem(combo_maRightUnit.getSelectionIndex());
		} else if (combo_maRight.getSelectionIndex() != -1) {
			rightMarginValue = combo_maRight.getItem(combo_maRight.getSelectionIndex());
		}
		if (combo_maBottomUnit.getEnabled()) {
			bottomMarginValue = combo_maBottom.getText() + combo_maBottomUnit.getItem(combo_maBottomUnit.getSelectionIndex());
		} else if (combo_maBottom.getSelectionIndex() != -1) {
			bottomMarginValue = combo_maBottom.getItem(combo_maBottom.getSelectionIndex());
		}
		if (combo_maLeftUnit.getEnabled()) {
			leftMarginValue = combo_maLeft.getText() + combo_maLeftUnit.getItem(combo_maLeftUnit.getSelectionIndex());
		} else if (combo_maLeft.getSelectionIndex() != -1) {
			leftMarginValue = combo_maLeft.getItem(combo_maLeft.getSelectionIndex());
		}

		if (combo_maTop.getText().equals(combo_maRight.getText()) && combo_maTop.getText().equals(combo_maBottom.getText())
				&& combo_maTop.getText().equals(combo_maLeft.getText())
				&& combo_maTopUnit.getSelectionIndex() == combo_maRightUnit.getSelectionIndex()
				&& combo_maTopUnit.getSelectionIndex() == combo_maBottomUnit.getSelectionIndex()
				&& combo_maTopUnit.getSelectionIndex() == combo_maLeftUnit.getSelectionIndex()) {
			check_marginAll.setSelection(true);
			combo_maRightUnit.setEnabled(false);
			combo_maBottomUnit.setEnabled(false);
			combo_maLeftUnit.setEnabled(false);
		} else {
			check_marginAll.setSelection(false);
			combo_maRight.setEnabled(true);
			combo_maBottom.setEnabled(true);
			combo_maLeft.setEnabled(true);
			slider_maRight.setEnabled(true);
			slider_maBottom.setEnabled(true);
			slider_maLeft.setEnabled(true);
			if (StyleCommonPropertyValue.matchesNumber(combo_maRight.getText())) {
				combo_maRightUnit.setEnabled(true);
			}
			if (StyleCommonPropertyValue.matchesNumber(combo_maBottom.getText())) {
				combo_maBottomUnit.setEnabled(true);
			}
			if (StyleCommonPropertyValue.matchesNumber(combo_maLeft.getText())) {
				combo_maLeftUnit.setEnabled(true);
			}
		}
		if(hashDefaultValue){
			styleDialog.updateKindListShow(pageName);
		}
	}

	private MouseAdapter mouseAdapter = new MouseAdapter() {
		public void mouseDown(MouseEvent e) {
			if (combo_paTop.isFocusControl()) {
				paTopNumberInputConfirm();
			} else if (combo_paRight.isFocusControl()) {
				paRightNumberInputConfirm();
			} else if (combo_paBottom.isFocusControl()) {
				paBottomNumberInputConfirm();
			} else if (combo_paLeft.isFocusControl()) {
				paLeftNumberInputConfirm();
			} else if (combo_maTop.isFocusControl()) {
				maTopNumberInputConfirm();
			} else if (combo_maRight.isFocusControl()) {
				maRightNumberInputConfirm();
			} else if (combo_maBottom.isFocusControl()) {
				maBottomNumberInputConfirm();
			} else if (combo_maLeft.isFocusControl()) {
				maLeftNumberInputConfirm();
			}
		}
	};

	private void maLeftNumberInputConfirm() {
		String comboText = combo_maLeft.getText();
		if (StyleCommonPropertyValue.matchesNumber(comboText)) {
			int num = Integer.valueOf(comboText);
			if (!combo_maLeftUnit.getEnabled()) {
				combo_maLeftUnit.setEnabled(true);
			}
			slider_maLeft.setSelection(StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - num);
			leftMarginValue = comboText + combo_maLeftUnit.getItem(combo_maLeftUnit.getSelectionIndex());
			setComboMarginValue();
		}
	}

	private void maBottomNumberInputConfirm() {
		String comboText = combo_maBottom.getText();
		if (StyleCommonPropertyValue.matchesNumber(comboText)) {
			int num = Integer.valueOf(comboText);
			if (!combo_maBottomUnit.getEnabled()) {
				combo_maBottomUnit.setEnabled(true);
			}
			slider_maBottom.setSelection(StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - num);
			bottomMarginValue = comboText + combo_maBottomUnit.getItem(combo_maBottomUnit.getSelectionIndex());
			setComboMarginValue();
		}
	}

	private void maRightNumberInputConfirm() {
		String comboText = combo_maRight.getText();
		if (StyleCommonPropertyValue.matchesNumber(comboText)) {
			int num = Integer.valueOf(comboText);
			if (!combo_maRightUnit.getEnabled()) {
				combo_maRightUnit.setEnabled(true);
			}
			slider_maRight.setSelection(StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - num);
			rightMarginValue = comboText + combo_maRightUnit.getItem(combo_maRightUnit.getSelectionIndex());
			setComboMarginValue();
		}
	}

	private void maTopNumberInputConfirm() {
		String comboText = combo_maTop.getText();
		if (StyleCommonPropertyValue.matchesNumber(comboText)) {
			int num = Integer.valueOf(comboText);
			if (!combo_maTopUnit.getEnabled()) {
				combo_maTopUnit.setEnabled(true);
			}
			int sliderTopSelection = StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - num;
			slider_maTop.setSelection(sliderTopSelection);
			topMarginValue = comboText + combo_maTopUnit.getItem(combo_maTopUnit.getSelectionIndex());

			if (check_marginAll.getSelection()) {
				rightMarginValue = topMarginValue;
				bottomMarginValue = topMarginValue;
				leftMarginValue = topMarginValue;
				combo_maRight.setText(comboText);
				combo_maBottom.setText(comboText);
				combo_maLeft.setText(comboText);
				slider_maRight.setSelection(sliderTopSelection);
				slider_maBottom.setSelection(sliderTopSelection);
				slider_maLeft.setSelection(sliderTopSelection);
			}
			setComboMarginValue();
		}
	}

	private void paLeftNumberInputConfirm() {
		String comboText = combo_paLeft.getText();
		if (StyleCommonPropertyValue.matchesNumber(comboText)) {
			int num = Integer.valueOf(comboText);
			if (!combo_paLeftUnit.getEnabled()) {
				combo_paLeftUnit.setEnabled(true);
			}
			slider_paLeft.setSelection(StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - num);
			leftPaddingValue = comboText + combo_paLeftUnit.getItem(combo_paLeftUnit.getSelectionIndex());
			setComboPaddingValue();
		}
	}

	private void paBottomNumberInputConfirm() {
		String comboText = combo_paBottom.getText();
		if (StyleCommonPropertyValue.matchesNumber(comboText)) {
			int num = Integer.valueOf(comboText);
			if (!combo_paBottomUnit.getEnabled()) {
				combo_paBottomUnit.setEnabled(true);
			}
			slider_paBottom.setSelection(StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - num);
			bottomPaddingValue = comboText + combo_paBottomUnit.getItem(combo_paBottomUnit.getSelectionIndex());
			setComboPaddingValue();
		}
	}

	private void paRightNumberInputConfirm() {
		String comboText = combo_paRight.getText();
		if (StyleCommonPropertyValue.matchesNumber(comboText)) {
			int num = Integer.valueOf(comboText);
			if (!combo_paRightUnit.getEnabled()) {
				combo_paRightUnit.setEnabled(true);
			}
			slider_paRight.setSelection(StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - num);
			rightPaddingValue = comboText + combo_paRightUnit.getItem(combo_paRightUnit.getSelectionIndex());
			setComboPaddingValue();
		}
	}

	private void paTopNumberInputConfirm() {
		String comboText = combo_paTop.getText();
		if (StyleCommonPropertyValue.matchesNumber(comboText)) {
			int num = Integer.valueOf(comboText);
			if (!combo_paTopUnit.getEnabled()) {
				combo_paTopUnit.setEnabled(true);
			}
			int sliderTopSelection = StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - num;
			slider_paTop.setSelection(sliderTopSelection);
			topPaddingValue = comboText + combo_paTopUnit.getItem(combo_paTopUnit.getSelectionIndex());
			if (check_paddingAll.getSelection()) {
				rightPaddingValue = topPaddingValue;
				bottomPaddingValue = topPaddingValue;
				leftPaddingValue = topPaddingValue;

				combo_paRight.setText(comboText);
				combo_paBottom.setText(comboText);
				combo_paLeft.setText(comboText);

				slider_paRight.setSelection(sliderTopSelection);
				slider_paBottom.setSelection(sliderTopSelection);
				slider_paLeft.setSelection(sliderTopSelection);
			}
			setComboPaddingValue();
		}
	}

	private void mouseEvent(Control control) {
		control.addMouseListener(mouseAdapter);
	}

	public void registerEvent() {
		mouseEvent(this);
		mouseEvent(paddingLabel);
		mouseEvent(marginLabel);
		mouseEvent(topLabel);
		mouseEvent(rightLabel);
		mouseEvent(bottomLabel);
		mouseEvent(leftLabel);
		mouseEvent(topLabel_1);
		mouseEvent(rightLabel_1);
		mouseEvent(bottomLabel_1);
		mouseEvent(leftLabel_1);
		mouseEvent(composite);
		mouseEvent(label_4);
		mouseEvent(composite_10);
		mouseEvent(composite_1);

		combo_paTop.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_paTop.getSelectionIndex();
				if (index != -1) {
					if (check_paddingAll.getSelection()) {
						combo_paRight.select(index);
						combo_paBottom.select(index);
						combo_paLeft.select(index);

						combo_paRight.setEnabled(false);
						combo_paBottom.setEnabled(false);
						combo_paLeft.setEnabled(false);
					}
					if (index == combo_paTop.getItems().length - 1) {
						combo_paTopUnit.setEnabled(true);
					} else if (index != -1) {
						combo_paTopUnit.setEnabled(false);
						topPaddingValue = combo_paTop.getItem(index);
						if (check_paddingAll.getSelection()) {
							rightPaddingValue = topPaddingValue;
							bottomPaddingValue = topPaddingValue;
							leftPaddingValue = topPaddingValue;
						}
						StyleCommonPropertyValue.initSlide(slider_paTop);
						setComboPaddingValue();
					}
				}
			}
		});
		combo_paTop.addFocusListener(new FocusListener() {
			public void focusGained(FocusEvent e) {
			}

			public void focusLost(FocusEvent e) {
				paTopNumberInputConfirm();
			}
		});
		combo_paTop.addKeyListener(new KeyAdapter() {
			public void keyPressed(KeyEvent e) {
				if (e.keyCode == SWT.CR | e.keyCode == SWT.KEYPAD_CR) {
					paTopNumberInputConfirm();
				}
			}
		});

		slider_paTop.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_paTopUnit.getEnabled()) {
					combo_paTopUnit.setEnabled(true);
				}
				int intSelect = new Integer(slider_paTop.getSelection());
				int valueSet = StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - intSelect;
				topPaddingValue = valueSet + combo_paTopUnit.getItem(combo_paTopUnit.getSelectionIndex());
				combo_paTop.setText(valueSet + "");

				if (check_paddingAll.getSelection()) {
					rightPaddingValue = topPaddingValue;
					bottomPaddingValue = topPaddingValue;
					leftPaddingValue = topPaddingValue;

					combo_paRight.setText(valueSet + "");
					combo_paBottom.setText(valueSet + "");
					combo_paLeft.setText(valueSet + "");

					slider_paRight.setSelection(intSelect);
					slider_paBottom.setSelection(intSelect);
					slider_paLeft.setSelection(intSelect);
				}
				setComboPaddingValue();
			}
		});
		combo_paTopUnit.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (StyleCommonPropertyValue.matchesNumber(combo_paTop.getText())) {
					topPaddingValue = combo_paTop.getText() + combo_paTopUnit.getItem(combo_paTopUnit.getSelectionIndex());
					if (check_paddingAll.getSelection()) {
						rightPaddingValue = topPaddingValue;
						bottomPaddingValue = topPaddingValue;
						leftPaddingValue = topPaddingValue;

						combo_paRightUnit.select(combo_paTopUnit.getSelectionIndex());
						combo_paBottomUnit.select(combo_paTopUnit.getSelectionIndex());
						combo_paLeftUnit.select(combo_paTopUnit.getSelectionIndex());
					}
					setComboPaddingValue();
				}
			}
		});

		combo_maTop.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_maTop.getSelectionIndex();
				if (index != -1) {
					if (check_marginAll.getSelection()) {
						combo_maRight.select(index);
						combo_maBottom.select(index);
						combo_maLeft.select(index);

						combo_maRightUnit.setEnabled(false);
						combo_maBottomUnit.setEnabled(false);
						combo_maLeftUnit.setEnabled(false);
					}
					if (index == combo_maTop.getItems().length - 1) {
						combo_maTopUnit.setEnabled(true);
					} else if (index != -1) {
						combo_maTopUnit.setEnabled(false);
						topMarginValue = combo_maTop.getItem(index);
						if (check_marginAll.getSelection()) {
							rightMarginValue = topMarginValue;
							bottomMarginValue = topMarginValue;
							leftMarginValue = topMarginValue;
						}
						StyleCommonPropertyValue.initSlide(slider_maTop);
						setComboMarginValue();
					}
				}
			}
		});
		combo_maTop.addFocusListener(new FocusListener() {
			public void focusGained(FocusEvent e) {
			}

			public void focusLost(FocusEvent e) {
				maTopNumberInputConfirm();
			}
		});
		combo_maTop.addKeyListener(new KeyAdapter() {
			public void keyPressed(KeyEvent e) {
				if (e.keyCode == SWT.CR | e.keyCode == SWT.KEYPAD_CR) {
					maTopNumberInputConfirm();
				}
			}
		});
		slider_maTop.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_maTopUnit.getEnabled()) {
					combo_maTopUnit.setEnabled(true);
				}
				int intSelect = new Integer(slider_maTop.getSelection());
				int valueSet = StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - intSelect;
				topMarginValue = valueSet + combo_maTopUnit.getItem(combo_maTopUnit.getSelectionIndex());
				combo_maTop.setText(valueSet + "");
				if (check_marginAll.getSelection()) {
					rightMarginValue = topMarginValue;
					bottomMarginValue = topMarginValue;
					leftMarginValue = topMarginValue;

					combo_maRight.setText(valueSet + "");
					combo_maBottom.setText(valueSet + "");
					combo_maLeft.setText(valueSet + "");
					slider_maRight.setSelection(intSelect);
					slider_maBottom.setSelection(intSelect);
					slider_maLeft.setSelection(intSelect);
				}
				setComboMarginValue();
			}
		});
		combo_maTopUnit.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (StyleCommonPropertyValue.matchesNumber(combo_maTop.getText())) {
					topMarginValue = combo_maTop.getText() + combo_maTopUnit.getItem(combo_maTopUnit.getSelectionIndex());

					if (check_marginAll.getSelection()) {
						rightMarginValue = topMarginValue;
						bottomMarginValue = topMarginValue;
						leftMarginValue = topMarginValue;
						combo_maRightUnit.select(combo_maTopUnit.getSelectionIndex());
						combo_maBottomUnit.select(combo_maTopUnit.getSelectionIndex());
						combo_maLeftUnit.select(combo_maTopUnit.getSelectionIndex());

					}
					setComboMarginValue();
				}
			}
		});

		combo_paRight.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_paRight.getSelectionIndex();
				if (index == combo_paRight.getItems().length - 1) {
					combo_paRightUnit.setEnabled(true);
				} else if (index != -1) {
					combo_paRightUnit.setEnabled(false);
					StyleCommonPropertyValue.initSlide(slider_paRight);
					rightPaddingValue = combo_paRight.getItem(combo_paRight.getSelectionIndex());
					setComboPaddingValue();
				}
			}
		});
		combo_paRight.addFocusListener(new FocusListener() {
			public void focusGained(FocusEvent e) {
			}

			public void focusLost(FocusEvent e) {
				paRightNumberInputConfirm();
			}
		});
		combo_paRight.addKeyListener(new KeyAdapter() {
			public void keyPressed(KeyEvent e) {
				if (e.keyCode == SWT.CR | e.keyCode == SWT.KEYPAD_CR) {
					paRightNumberInputConfirm();
				}
			}
		});
		slider_paRight.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_paRightUnit.getEnabled()) {
					combo_paRightUnit.setEnabled(true);
				}
				int intSelect = new Integer(slider_paRight.getSelection());
				combo_paRight.setText((StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - intSelect) + "");
				rightPaddingValue = combo_paRight.getText() + combo_paRightUnit.getItem(combo_paRightUnit.getSelectionIndex());
				setComboPaddingValue();
			}
		});
		combo_paRightUnit.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (StyleCommonPropertyValue.matchesNumber(combo_paRight.getText())) {
					rightPaddingValue = combo_paRight.getText() + combo_paRightUnit.getItem(combo_paRightUnit.getSelectionIndex());
					setComboPaddingValue();
				}
			}
		});

		combo_maRight.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_maRight.getSelectionIndex();
				if (index == combo_maRight.getItems().length - 1) {
					combo_maRightUnit.setEnabled(true);
				} else if (index != -1) {
					combo_maRightUnit.setEnabled(false);
					StyleCommonPropertyValue.initSlide(slider_maRight);
					rightMarginValue = combo_maRight.getItem(combo_maRight.getSelectionIndex());
					setComboMarginValue();
				}
			}
		});
		combo_maRight.addFocusListener(new FocusListener() {
			public void focusGained(FocusEvent e) {
			}

			public void focusLost(FocusEvent e) {
				maRightNumberInputConfirm();
			}
		});
		combo_maRight.addKeyListener(new KeyAdapter() {
			public void keyPressed(KeyEvent e) {
				if (e.keyCode == SWT.CR | e.keyCode == SWT.KEYPAD_CR) {
					maRightNumberInputConfirm();
				}
			}
		});
		slider_maRight.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_maRightUnit.getEnabled()) {
					combo_maRightUnit.setEnabled(true);
				}
				int intSelect = new Integer(slider_maRight.getSelection());
				combo_maRight.setText((StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - intSelect) + "");
				rightMarginValue = combo_maRight.getText() + combo_maRightUnit.getItem(combo_maRightUnit.getSelectionIndex());
				setComboMarginValue();
			}
		});
		combo_maRightUnit.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (StyleCommonPropertyValue.matchesNumber(combo_maRight.getText())) {
					rightMarginValue = combo_maRight.getText() + combo_maRightUnit.getItem(combo_maRightUnit.getSelectionIndex());
					setComboMarginValue();
				}
			}
		});

		combo_paBottom.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_paBottom.getSelectionIndex();
				if (index == combo_paBottom.getItems().length - 1) {
					combo_paBottomUnit.setEnabled(true);
				} else if (index != -1) {
					combo_paBottomUnit.setEnabled(false);
					StyleCommonPropertyValue.initSlide(slider_paBottom);
					bottomPaddingValue = combo_paBottom.getItem(combo_paBottom.getSelectionIndex());
					setComboPaddingValue();
				}
			}
		});

		combo_paBottom.addFocusListener(new FocusListener() {
			public void focusGained(FocusEvent e) {
			}

			public void focusLost(FocusEvent e) {
				paBottomNumberInputConfirm();
			}
		});
		combo_paBottom.addKeyListener(new KeyAdapter() {
			public void keyPressed(KeyEvent e) {
				if (e.keyCode == SWT.CR | e.keyCode == SWT.KEYPAD_CR) {
					paBottomNumberInputConfirm();
				}
			}
		});
		slider_paBottom.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_paBottomUnit.getEnabled()) {
					combo_paBottomUnit.setEnabled(true);
				}
				int intSelect = new Integer(slider_paBottom.getSelection());
				combo_paBottom.setText((StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - intSelect) + "");
				bottomPaddingValue = combo_paBottom.getText() + combo_paBottomUnit.getItem(combo_paBottomUnit.getSelectionIndex());
				setComboPaddingValue();
			}
		});
		combo_paBottomUnit.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (StyleCommonPropertyValue.matchesNumber(combo_paBottom.getText())) {
					bottomPaddingValue = combo_paBottomUnit.getItem(combo_paBottomUnit.getSelectionIndex());
					setComboPaddingValue();
				}
			}
		});

		combo_maBottom.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_maBottom.getSelectionIndex();
				if (index == combo_maBottom.getItems().length - 1) {
					combo_maBottomUnit.setEnabled(true);
				} else if (index != -1) {
					combo_maBottomUnit.setEnabled(false);
					StyleCommonPropertyValue.initSlide(slider_maBottom);
					bottomMarginValue = combo_maBottom.getItem(combo_maBottom.getSelectionIndex());
					setComboMarginValue();
				}
			}
		});
		combo_maBottom.addFocusListener(new FocusListener() {
			public void focusGained(FocusEvent e) {
			}

			public void focusLost(FocusEvent e) {
				maBottomNumberInputConfirm();
			}
		});
		combo_maBottom.addKeyListener(new KeyAdapter() {
			public void keyPressed(KeyEvent e) {
				if (e.keyCode == SWT.CR | e.keyCode == SWT.KEYPAD_CR) {
					maBottomNumberInputConfirm();
				}
			}
		});
		slider_maBottom.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_maBottomUnit.getEnabled()) {
					combo_maBottomUnit.setEnabled(true);
				}
				int intSelect = new Integer(slider_maBottom.getSelection());
				combo_maBottom.setText((StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - intSelect) + "");
				bottomMarginValue = combo_maBottom.getText() + combo_maBottomUnit.getItem(combo_maBottomUnit.getSelectionIndex());
				setComboMarginValue();
			}
		});
		combo_maBottomUnit.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (StyleCommonPropertyValue.matchesNumber(combo_maBottom.getText())) {
					bottomMarginValue = combo_maBottom.getText() + combo_maBottomUnit.getItem(combo_maBottomUnit.getSelectionIndex());
					setComboMarginValue();
				}
			}
		});

		combo_paLeft.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_paLeft.getSelectionIndex();
				if (index == combo_paLeft.getItems().length - 1) {
					combo_paLeftUnit.setEnabled(true);
				} else if (index != -1) {
					combo_paLeftUnit.setEnabled(false);
					StyleCommonPropertyValue.initSlide(slider_paLeft);
					leftPaddingValue = combo_paLeft.getItem(combo_paLeft.getSelectionIndex());
					setComboPaddingValue();
				}
			}
		});
		combo_paLeft.addFocusListener(new FocusListener() {
			public void focusGained(FocusEvent e) {
			}

			public void focusLost(FocusEvent e) {
				paLeftNumberInputConfirm();
			}
		});
		combo_paLeft.addKeyListener(new KeyAdapter() {
			public void keyPressed(KeyEvent e) {
				if (e.keyCode == SWT.CR | e.keyCode == SWT.KEYPAD_CR) {
					paLeftNumberInputConfirm();
				}
			}
		});
		slider_paLeft.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_paLeftUnit.getEnabled()) {
					combo_paLeftUnit.setEnabled(true);
				}
				int intSelect = new Integer(slider_paLeft.getSelection());
				combo_paLeft.setText((StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - intSelect) + "");
				leftPaddingValue = combo_paLeft.getText() + combo_paLeftUnit.getItem(combo_paLeftUnit.getSelectionIndex());
				setComboPaddingValue();
			}
		});
		combo_paLeftUnit.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (StyleCommonPropertyValue.matchesNumber(combo_paLeft.getText())) {
					leftPaddingValue = combo_paLeft.getText() + combo_paLeftUnit.getItem(combo_paLeftUnit.getSelectionIndex());
					setComboPaddingValue();
				}
			}
		});

		combo_maLeft.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_maLeft.getSelectionIndex();
				if (index == combo_maLeft.getItems().length - 1) {
					combo_maLeftUnit.setEnabled(true);
				} else if (index != -1) {
					combo_maLeftUnit.setEnabled(false);
					StyleCommonPropertyValue.initSlide(slider_maLeft);
					leftMarginValue = combo_maLeft.getItem(combo_maLeft.getSelectionIndex());
					setComboMarginValue();
				}
			}
		});
		combo_maLeft.addFocusListener(new FocusListener() {
			public void focusGained(FocusEvent e) {
			}

			public void focusLost(FocusEvent e) {
				maLeftNumberInputConfirm();
			}
		});
		combo_maLeft.addKeyListener(new KeyAdapter() {
			public void keyPressed(KeyEvent e) {
				if (e.keyCode == SWT.CR | e.keyCode == SWT.KEYPAD_CR) {
					maLeftNumberInputConfirm();
				}
			}
		});
		slider_maLeft.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_maLeftUnit.getEnabled()) {
					combo_maLeftUnit.setEnabled(true);
				}
				int intSelect = new Integer(slider_maLeft.getSelection());
				combo_maLeft.setText((StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - intSelect) + "");
				leftMarginValue = combo_maLeft.getText() + combo_maLeftUnit.getItem(combo_maLeftUnit.getSelectionIndex());
				setComboMarginValue();
			}
		});
		combo_maLeftUnit.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (StyleCommonPropertyValue.matchesNumber(combo_maLeft.getText())) {
					leftMarginValue = combo_maLeft.getText() + combo_maLeftUnit.getItem(combo_maLeftUnit.getSelectionIndex());
					setComboMarginValue();
				}
			}
		});

		check_paddingAll.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (check_paddingAll.getSelection()) {
					combo_paRight.setEnabled(false);
					combo_paBottom.setEnabled(false);
					combo_paLeft.setEnabled(false);
					slider_paRight.setEnabled(false);
					slider_paBottom.setEnabled(false);
					slider_paLeft.setEnabled(false);
					combo_paRightUnit.setEnabled(false);
					combo_paBottomUnit.setEnabled(false);
					combo_paLeftUnit.setEnabled(false);
					if (!combo_paTopUnit.getEnabled()) {
						int topIndex = combo_paTop.getSelectionIndex();
						if (topIndex != -1) {
							topPaddingValue = combo_paTop.getItem(topIndex);
							rightPaddingValue = topPaddingValue;
							bottomPaddingValue = topPaddingValue;
							leftPaddingValue = topPaddingValue;

							combo_paRight.select(topIndex);
							combo_paBottom.select(topIndex);
							combo_paLeft.select(topIndex);

							setComboPaddingValue();
						}

					} else {
						String topText = combo_paTop.getText();
						if (StyleCommonPropertyValue.matchesNumber(topText)) {
							String topUnitValue = combo_paTopUnit.getItem(combo_paTopUnit.getSelectionIndex());
							combo_paRight.setText(topText);
							combo_paBottom.setText(topText);
							combo_paLeft.setText(topText);

							topPaddingValue = topText + topUnitValue;
							rightPaddingValue = topPaddingValue;
							bottomPaddingValue = topPaddingValue;
							leftPaddingValue = topPaddingValue;
							setComboPaddingValue();
						}
					}
					slider_paRight.setSelection(slider_paTop.getSelection());
					slider_paBottom.setSelection(slider_paTop.getSelection());
					slider_paLeft.setSelection(slider_paTop.getSelection());
					combo_paRightUnit.select(combo_paTopUnit.getSelectionIndex());
					combo_paBottomUnit.select(combo_paTopUnit.getSelectionIndex());
					combo_paLeftUnit.select(combo_paTopUnit.getSelectionIndex());
				} else {
					combo_paRight.setEnabled(true);
					combo_paBottom.setEnabled(true);
					combo_paLeft.setEnabled(true);
					slider_paRight.setEnabled(true);
					slider_paBottom.setEnabled(true);
					slider_paLeft.setEnabled(true);
					combo_paRightUnit.setEnabled(combo_paTopUnit.getEnabled());
					combo_paBottomUnit.setEnabled(combo_paTopUnit.getEnabled());
					combo_paLeftUnit.setEnabled(combo_paTopUnit.getEnabled());
				}
			}
		});

		check_marginAll.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (check_marginAll.getSelection()) {
					combo_maRight.setEnabled(false);
					combo_maBottom.setEnabled(false);
					combo_maLeft.setEnabled(false);
					slider_maRight.setEnabled(false);
					slider_maBottom.setEnabled(false);
					slider_maLeft.setEnabled(false);
					combo_maRightUnit.setEnabled(false);
					combo_maBottomUnit.setEnabled(false);
					combo_maLeftUnit.setEnabled(false);
					if (!combo_maTopUnit.getEnabled()) {
						int topIndex = combo_maTop.getSelectionIndex();
						if (topIndex != -1) {
							topMarginValue = combo_maTop.getItem(topIndex);
							rightMarginValue = topMarginValue;
							bottomMarginValue = topMarginValue;
							leftMarginValue = topMarginValue;

							combo_maRight.select(topIndex);
							combo_maBottom.select(topIndex);
							combo_maLeft.select(topIndex);
							setComboMarginValue();
						}

					} else {
						String topText = combo_maTop.getText();
						if (StyleCommonPropertyValue.matchesNumber(topText)) {
							String topUnitValue = combo_maTopUnit.getItem(combo_maTopUnit.getSelectionIndex());
							combo_maRight.setText(topText);
							combo_maBottom.setText(topText);
							combo_maLeft.setText(topText);
							topMarginValue = topText + topUnitValue;

							rightMarginValue = topMarginValue;
							bottomMarginValue = topMarginValue;
							leftMarginValue = topMarginValue;
							setComboMarginValue();
						}
					}
					slider_maRight.setSelection(slider_maTop.getSelection());
					slider_maBottom.setSelection(slider_maTop.getSelection());
					slider_maLeft.setSelection(slider_maTop.getSelection());
					combo_maRightUnit.select(combo_maTopUnit.getSelectionIndex());
					combo_maBottomUnit.select(combo_maTopUnit.getSelectionIndex());
					combo_maLeftUnit.select(combo_maTopUnit.getSelectionIndex());
				} else {
					combo_maRight.setEnabled(true);
					combo_maBottom.setEnabled(true);
					combo_maLeft.setEnabled(true);
					slider_maRight.setEnabled(true);
					slider_maBottom.setEnabled(true);
					slider_maLeft.setEnabled(true);
					combo_maRightUnit.setEnabled(combo_maTopUnit.getEnabled());
					combo_maBottomUnit.setEnabled(combo_maTopUnit.getEnabled());
					combo_maLeftUnit.setEnabled(combo_maTopUnit.getEnabled());
				}
			}
		});
	}

	private void setComboPaddingValue() {
		if ((topPaddingValue != null && !"".equals(topPaddingValue)) && (rightPaddingValue != null && !"".equals(rightPaddingValue))
				&& (bottomPaddingValue != null && !"".equals(bottomPaddingValue)) && (leftPaddingValue != null && !"".equals(leftPaddingValue))) {

			styleDialog.removeProperty("padding-top");
			styleDialog.removeProperty("padding-right");
			styleDialog.removeProperty("padding-bottom");
			styleDialog.removeProperty("padding-left");

			styleDialog.setPropertyValue(pageName, "padding", topPaddingValue + " " + rightPaddingValue + " " + bottomPaddingValue + " "
					+ leftPaddingValue);
		} else {
			styleDialog.removeProperty("padding");
			if (topPaddingValue != null && !"".equals(topPaddingValue)) {
				styleDialog.setPropertyValue(pageName, "padding-top", topPaddingValue);
			} else {
				styleDialog.removeProperty("padding-top");
			}
			if (rightPaddingValue != null && !"".equals(rightPaddingValue)) {
				styleDialog.setPropertyValue(pageName, "padding-right", rightPaddingValue);
			} else {
				styleDialog.removeProperty("padding-right");
			}
			if (bottomPaddingValue != null && !"".equals(bottomPaddingValue)) {
				styleDialog.setPropertyValue(pageName, "padding-bottom", bottomPaddingValue);
			} else {
				styleDialog.removeProperty("padding-bottom");
			}
			if (leftPaddingValue != null && !"".equals(leftPaddingValue)) {
				styleDialog.setPropertyValue(pageName, "padding-left", leftPaddingValue);
			} else {
				styleDialog.removeProperty("padding-left");
			}
		}
	}

	private void setComboMarginValue() {
		if ((topMarginValue != null && !"".equals(topMarginValue)) && (rightMarginValue != null && !"".equals(rightMarginValue))
				&& (bottomMarginValue != null && !"".equals(bottomMarginValue)) && (leftMarginValue != null && !"".equals(leftMarginValue))) {

			styleDialog.removeProperty("margin-top");
			styleDialog.removeProperty("margin-right");
			styleDialog.removeProperty("margin-bottom");
			styleDialog.removeProperty("margin-left");

			styleDialog.setPropertyValue(pageName, "margin", topMarginValue + " " + rightMarginValue + " " + bottomMarginValue + " "
					+ leftMarginValue);

		} else {
			styleDialog.removeProperty("margin");
			if (topMarginValue != null && !"".equals(topMarginValue)) {
				styleDialog.setPropertyValue(pageName, "margin-top", topMarginValue);
			} else {
				styleDialog.removeProperty("margin-top");
			}

			if (rightMarginValue != null && !"".equals(rightMarginValue)) {
				styleDialog.setPropertyValue(pageName, "margin-right", rightMarginValue);
			} else {
				styleDialog.removeProperty("margin-right");
			}
			if (bottomMarginValue != null && !"".equals(bottomMarginValue)) {
				styleDialog.setPropertyValue(pageName, "margin-bottom", bottomMarginValue);
			} else {
				styleDialog.removeProperty("margin-bottom");
			}
			if (leftMarginValue != null && !"".equals(leftMarginValue)) {
				styleDialog.setPropertyValue(pageName, "margin-left", leftMarginValue);
			} else {
				styleDialog.removeProperty("margin-left");
			}
		}
	}
}
