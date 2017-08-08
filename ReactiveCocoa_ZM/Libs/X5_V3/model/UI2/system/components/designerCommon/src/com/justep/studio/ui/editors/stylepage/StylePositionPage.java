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
 * 定位
 * @author linhongbao
 *
 */
public class StylePositionPage extends Composite implements IPropertyDialogPage, IStylePage {

	private Combo combo_topUnit;
	private Combo combo_rightUnit;
	private Combo combo_bottomUnit;
	private Combo combo_leftUnit;
	private Combo combo_left;
	private Combo combo_bottom;
	private Combo combo_right;
	private Combo combo_top;
	private Combo combo_heightUnit;
	private Combo combo_height;
	private Combo combo_zIndex;
	private Combo combo_widthUnit;
	private Combo combo_width;
	private Combo combo_position;
	private Slider slider_width;
	private Slider slider_height;
	private Slider slider_top;
	private Slider slider_right;
	private Slider slider_bottom;
	private Slider slider_left;

	private StyleDialog styleDialog;
	private String styleValue;
	private String pageName = "定位";
	private Label positionLabel;
	private Label zindexLabel;
	private Label widthLabel;
	private Label heightLabel;
	private Label topLabel;
	private Label rightLabel;
	private Label bottomLabel;
	private Label leftLabel;

	public StylePositionPage(Composite parent, StyleDialog styleDialog, String styleValue, int style) {
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

		combo_width.setItems(new String[] { "", "auto", "inherit", "(值)" });
		combo_height.setItems(new String[] { "", "auto", "inherit", "(值)" });
		combo_top.setItems(new String[] { "", "auto", "inherit", "(值)" });
		combo_right.setItems(new String[] { "", "auto", "inherit", "(值)" });
		combo_bottom.setItems(new String[] { "", "auto", "inherit", "(值)" });
		combo_left.setItems(new String[] { "", "auto", "inherit", "(值)" });

		combo_position.setItems(new String[] { "", "static", "relative", "absolute", "fixed", "inherit" });

		combo_zIndex.setItems(new String[] { "", "auto", "inherit" });

		combo_widthUnit.setItems(StyleCommonPropertyValue.NUMBER_UNIT_VALUE);
		combo_widthUnit.select(0);

		combo_heightUnit.setItems(StyleCommonPropertyValue.NUMBER_UNIT_VALUE);
		combo_heightUnit.select(0);

		combo_topUnit.setItems(StyleCommonPropertyValue.NUMBER_UNIT_VALUE);
		combo_topUnit.select(0);

		combo_rightUnit.setItems(StyleCommonPropertyValue.NUMBER_UNIT_VALUE);
		combo_rightUnit.select(0);

		combo_bottomUnit.setItems(StyleCommonPropertyValue.NUMBER_UNIT_VALUE);
		combo_bottomUnit.select(0);

		combo_leftUnit.setItems(StyleCommonPropertyValue.NUMBER_UNIT_VALUE);
		combo_leftUnit.select(0);

		combo_widthUnit.setEnabled(false);
		combo_heightUnit.setEnabled(false);
		combo_topUnit.setEnabled(false);
		combo_rightUnit.setEnabled(false);
		combo_bottomUnit.setEnabled(false);
		combo_leftUnit.setEnabled(false);

		StyleCommonPropertyValue.initSlide(slider_bottom);
		StyleCommonPropertyValue.initSlide(slider_height);
		StyleCommonPropertyValue.initSlide(slider_left);
		StyleCommonPropertyValue.initSlide(slider_right);
		StyleCommonPropertyValue.initSlide(slider_top);
		StyleCommonPropertyValue.initSlide(slider_width);
	}

	public void initLayout() {
		final TableWrapLayout tableWrapLayout = new TableWrapLayout();
		tableWrapLayout.numColumns = 6;
		setLayout(tableWrapLayout);

		positionLabel = new Label(this, SWT.NONE);
		final TableWrapData positionLabelData = new TableWrapData(TableWrapData.RIGHT);
		positionLabel.setLayoutData(positionLabelData);
		positionLabel.setText("position:");

		combo_position = new Combo(this, SWT.NONE);
		combo_position.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
		combo_position.setLayoutData(new TableWrapData(TableWrapData.FILL));

		widthLabel = new Label(this, SWT.NONE);
		final TableWrapData widthLabelData = new TableWrapData(TableWrapData.RIGHT);
		widthLabel.setLayoutData(widthLabelData);
		widthLabel.setText("width:");

		combo_width = new Combo(this, SWT.NONE);
		combo_width.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		slider_width = new Slider(this, SWT.VERTICAL);
		final TableWrapData twd_slider_width = new TableWrapData(TableWrapData.LEFT, TableWrapData.TOP);
		twd_slider_width.heightHint = 20;
		slider_width.setLayoutData(twd_slider_width);

		combo_widthUnit = new Combo(this, SWT.NONE);
		combo_widthUnit.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		zindexLabel = new Label(this, SWT.NONE);
		final TableWrapData zindexLabelData = new TableWrapData(TableWrapData.RIGHT);
		zindexLabel.setLayoutData(zindexLabelData);
		zindexLabel.setText("z-index:");

		combo_zIndex = new Combo(this, SWT.NONE);
		combo_zIndex.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
		combo_zIndex.setLayoutData(new TableWrapData(TableWrapData.FILL));

		heightLabel = new Label(this, SWT.NONE);
		final TableWrapData heightLabelData = new TableWrapData(TableWrapData.RIGHT);
		heightLabel.setLayoutData(heightLabelData);
		heightLabel.setText("height:");

		combo_height = new Combo(this, SWT.NONE);
		combo_height.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		slider_height = new Slider(this, SWT.VERTICAL);
		final TableWrapData twd_slider_height = new TableWrapData(TableWrapData.LEFT, TableWrapData.TOP);
		twd_slider_height.heightHint = 20;
		slider_height.setLayoutData(twd_slider_height);

		combo_heightUnit = new Combo(this, SWT.NONE);
		combo_heightUnit.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
		new Label(this, SWT.NONE);
		new Label(this, SWT.NONE);

		topLabel = new Label(this, SWT.NONE);
		final TableWrapData topLabelData = new TableWrapData(TableWrapData.RIGHT);
		topLabel.setLayoutData(topLabelData);
		topLabel.setText("top:");

		combo_top = new Combo(this, SWT.NONE);
		combo_top.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		slider_top = new Slider(this, SWT.VERTICAL);
		final TableWrapData twd_slider_top = new TableWrapData(TableWrapData.LEFT, TableWrapData.TOP);
		twd_slider_top.heightHint = 20;
		slider_top.setLayoutData(twd_slider_top);

		combo_topUnit = new Combo(this, SWT.NONE);
		combo_topUnit.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
		new Label(this, SWT.NONE);
		new Label(this, SWT.NONE);

		rightLabel = new Label(this, SWT.NONE);
		final TableWrapData rightLabelData = new TableWrapData(TableWrapData.RIGHT);
		rightLabel.setLayoutData(rightLabelData);
		rightLabel.setText("right:");

		combo_right = new Combo(this, SWT.NONE);
		combo_right.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		slider_right = new Slider(this, SWT.VERTICAL);
		final TableWrapData twd_slider_right = new TableWrapData(TableWrapData.LEFT, TableWrapData.TOP);
		twd_slider_right.heightHint = 20;
		slider_right.setLayoutData(twd_slider_right);

		combo_rightUnit = new Combo(this, SWT.NONE);
		combo_rightUnit.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
		new Label(this, SWT.NONE);
		new Label(this, SWT.NONE);

		bottomLabel = new Label(this, SWT.NONE);
		final TableWrapData bottomLabelData = new TableWrapData(TableWrapData.RIGHT);
		bottomLabel.setLayoutData(bottomLabelData);
		bottomLabel.setText("bottom:");

		combo_bottom = new Combo(this, SWT.NONE);
		combo_bottom.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		slider_bottom = new Slider(this, SWT.VERTICAL);
		final TableWrapData twd_slider_bottom = new TableWrapData(TableWrapData.LEFT, TableWrapData.TOP);
		twd_slider_bottom.heightHint = 20;
		slider_bottom.setLayoutData(twd_slider_bottom);

		combo_bottomUnit = new Combo(this, SWT.NONE);
		combo_bottomUnit.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
		new Label(this, SWT.NONE);
		new Label(this, SWT.NONE);

		leftLabel = new Label(this, SWT.NONE);
		final TableWrapData leftLabelData = new TableWrapData(TableWrapData.RIGHT);
		leftLabel.setLayoutData(leftLabelData);
		leftLabel.setText("left:");

		combo_left = new Combo(this, SWT.NONE);
		combo_left.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
		combo_left.setLayoutData(new TableWrapData(TableWrapData.CENTER, TableWrapData.TOP));

		slider_left = new Slider(this, SWT.VERTICAL);
		final TableWrapData twd_slider_left = new TableWrapData(TableWrapData.LEFT, TableWrapData.TOP);
		twd_slider_left.heightHint = 20;
		slider_left.setLayoutData(twd_slider_left);

		combo_leftUnit = new Combo(this, SWT.NONE);
		combo_leftUnit.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
	}

	public void initSelfDefaultValue() {
		boolean hashDefaultValue = false;
		if (styleValue == null || "".equals(styleValue)) {
			return;
		}
		if (StyleCommonPropertyValue.setComboValueIndex("position", combo_position, styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndex("z-index", combo_zIndex, styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndexWithUnit("width", combo_width, slider_width, combo_widthUnit, styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndexWithUnit("height", combo_height, slider_height, combo_heightUnit, styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndexWithUnit("top", combo_top, slider_top, combo_topUnit, styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndexWithUnit("right", combo_right, slider_right, combo_rightUnit, styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndexWithUnit("bottom", combo_bottom, slider_bottom, combo_bottomUnit, styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndexWithUnit("left", combo_left, slider_left, combo_leftUnit, styleValue)) {
			hashDefaultValue = true;
		}
		if(hashDefaultValue){
			styleDialog.updateKindListShow(pageName);
		}
	}

	private MouseAdapter mouseAdapter = new MouseAdapter() {
		public void mouseDown(MouseEvent e) {
			if (combo_width.isFocusControl()) {
				widthNumberInputConfirm();
			} else if (combo_height.isFocusControl()) {
				heightNumberInputConfirm();
			} else if (combo_top.isFocusControl()) {
				topNumberInputConfirm();
			} else if (combo_right.isFocusControl()) {
				rightNumberInputConfirm();
			} else if (combo_bottom.isFocusControl()) {
				bottomNumberInputConfirm();
			} else if (combo_left.isFocusControl()) {
				leftNumberInputConfirm();
			}
		}
	};

	private void leftNumberInputConfirm() {
		String comboText = combo_left.getText();
		if (StyleCommonPropertyValue.matchesNumber(comboText)) {
			int num = Integer.valueOf(comboText);
			if (!combo_leftUnit.getEnabled()) {
				combo_leftUnit.setEnabled(true);
			}
			slider_left.setSelection(StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - num);
			styleDialog.setPropertyValue(pageName, "left", comboText + combo_leftUnit.getItem(combo_leftUnit.getSelectionIndex()));
		}
	}

	private void bottomNumberInputConfirm() {
		String comboText = combo_bottom.getText();
		if (StyleCommonPropertyValue.matchesNumber(comboText)) {
			int num = Integer.valueOf(comboText);
			if (!combo_bottomUnit.getEnabled()) {
				combo_bottomUnit.setEnabled(true);
			}
			slider_bottom.setSelection(StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - num);
			styleDialog.setPropertyValue("字体", "bottom", comboText + combo_bottomUnit.getItem(combo_bottomUnit.getSelectionIndex()));
		}
	}

	private void topNumberInputConfirm() {
		String comboText = combo_top.getText();
		if (StyleCommonPropertyValue.matchesNumber(comboText)) {
			int num = Integer.valueOf(comboText);
			if (!combo_topUnit.getEnabled()) {
				combo_topUnit.setEnabled(true);
			}
			slider_top.setSelection(StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - num);
			styleDialog.setPropertyValue(pageName, "top", comboText + combo_topUnit.getItem(combo_topUnit.getSelectionIndex()));
		}
	}

	private void rightNumberInputConfirm() {
		String comboText = combo_right.getText();
		if (StyleCommonPropertyValue.matchesNumber(comboText)) {
			int num = Integer.valueOf(comboText);
			if (!combo_rightUnit.getEnabled()) {
				combo_rightUnit.setEnabled(true);
			}
			slider_right.setSelection(StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - num);
			styleDialog.setPropertyValue(pageName, "right", comboText + combo_rightUnit.getItem(combo_rightUnit.getSelectionIndex()));
		}
	}

	private void heightNumberInputConfirm() {
		String comboText = combo_height.getText();
		if (StyleCommonPropertyValue.matchesNumber(comboText)) {
			int num = Integer.valueOf(comboText);
			if (!combo_heightUnit.getEnabled()) {
				combo_heightUnit.setEnabled(true);
			}
			slider_height.setSelection(StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - num);
			styleDialog.setPropertyValue(pageName, "height", comboText + combo_heightUnit.getItem(combo_heightUnit.getSelectionIndex()));
		}
	}

	private void widthNumberInputConfirm() {
		String comboText = combo_width.getText();
		if (StyleCommonPropertyValue.matchesNumber(comboText)) {
			int num = Integer.valueOf(comboText);
			if (!combo_widthUnit.getEnabled()) {
				combo_widthUnit.setEnabled(true);
			}
			slider_width.setSelection(StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - num);
			styleDialog.setPropertyValue(pageName, "width", comboText + combo_widthUnit.getItem(combo_widthUnit.getSelectionIndex()));
		}
	}

	private void mouseEvent(Control control) {
		control.addMouseListener(mouseAdapter);
	}

	public void registerEvent() {
		mouseEvent(this);
		mouseEvent(positionLabel);
		mouseEvent(zindexLabel);
		mouseEvent(widthLabel);
		mouseEvent(heightLabel);
		mouseEvent(topLabel);
		mouseEvent(rightLabel);
		mouseEvent(bottomLabel);
		mouseEvent(leftLabel);
		combo_position.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_position.getSelectionIndex();
				if (index != -1) {
					styleDialog.setPropertyValue(pageName, "position", combo_position.getItem(index));
				}
			}
		});

		combo_zIndex.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_zIndex.getSelectionIndex();
				if (index != -1) {
					styleDialog.setPropertyValue(pageName, "z-index", combo_zIndex.getItem(index));
				}
			}
		});

		combo_width.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_width.getSelectionIndex();
				if (index == combo_width.getItems().length - 1) {
					combo_widthUnit.setEnabled(true);
				} else if (index != -1) {
					combo_widthUnit.setEnabled(false);
					StyleCommonPropertyValue.initSlide(slider_width);
					styleDialog.setPropertyValue(pageName, "width", combo_width.getItem(combo_width.getSelectionIndex()));
				}
			}
		});
		combo_width.addFocusListener(new FocusListener() {
			public void focusGained(FocusEvent e) {
			}

			public void focusLost(FocusEvent e) {
				widthNumberInputConfirm();
			}
		});
		combo_width.addKeyListener(new KeyAdapter() {
			public void keyPressed(KeyEvent e) {
				if (e.keyCode == SWT.CR | e.keyCode == SWT.KEYPAD_CR) {
					widthNumberInputConfirm();
				}
			}
		});

		slider_width.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_widthUnit.getEnabled()) {
					combo_widthUnit.setEnabled(true);
				}
				int intSelect = new Integer(slider_width.getSelection());
				combo_width.setText((StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - intSelect) + "");
				styleDialog.setPropertyValue(pageName, "width", combo_width.getText() + combo_widthUnit.getItem(combo_widthUnit.getSelectionIndex()));
			}
		});
		combo_widthUnit.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_width.getText().equals("(值)")) {
					styleDialog.setPropertyValue(pageName, "width", combo_width.getText()
							+ combo_widthUnit.getItem(combo_widthUnit.getSelectionIndex()));
				}
			}
		});

		combo_height.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_height.getSelectionIndex();
				if (index == combo_height.getItems().length - 1) {
					combo_heightUnit.setEnabled(true);
				} else if (index != -1) {
					combo_heightUnit.setEnabled(false);
					StyleCommonPropertyValue.initSlide(slider_height);
					styleDialog.setPropertyValue(pageName, "height", combo_height.getItem(combo_height.getSelectionIndex()));
				}
			}
		});
		combo_height.addFocusListener(new FocusListener() {
			public void focusGained(FocusEvent e) {
			}

			public void focusLost(FocusEvent e) {
				heightNumberInputConfirm();
			}
		});
		combo_height.addKeyListener(new KeyAdapter() {
			public void keyPressed(KeyEvent e) {
				if (e.keyCode == SWT.CR | e.keyCode == SWT.KEYPAD_CR) {
					heightNumberInputConfirm();
				}
			}
		});

		slider_height.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_heightUnit.getEnabled()) {
					combo_heightUnit.setEnabled(true);
				}
				int intSelect = new Integer(slider_height.getSelection());
				combo_height.setText((StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - intSelect) + "");
				styleDialog.setPropertyValue(pageName, "height", combo_height.getText()
						+ combo_heightUnit.getItem(combo_heightUnit.getSelectionIndex()));
			}
		});
		combo_heightUnit.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_height.getText().equals("(值)")) {
					styleDialog.setPropertyValue(pageName, "height", combo_height.getText()
							+ combo_heightUnit.getItem(combo_heightUnit.getSelectionIndex()));
				}
			}
		});

		combo_top.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_top.getSelectionIndex();
				if (index == combo_top.getItems().length - 1) {
					combo_topUnit.setEnabled(true);
				} else if (index != -1) {
					combo_topUnit.setEnabled(false);
					StyleCommonPropertyValue.initSlide(slider_top);
					styleDialog.setPropertyValue(pageName, "top", combo_top.getItem(combo_top.getSelectionIndex()));
				}
			}
		});
		combo_top.addFocusListener(new FocusListener() {
			public void focusGained(FocusEvent e) {
			}

			public void focusLost(FocusEvent e) {
				topNumberInputConfirm();
			}
		});
		combo_top.addKeyListener(new KeyAdapter() {
			public void keyPressed(KeyEvent e) {
				if (e.keyCode == SWT.CR | e.keyCode == SWT.KEYPAD_CR) {
					topNumberInputConfirm();
				}
			}
		});

		slider_top.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_topUnit.getEnabled()) {
					combo_topUnit.setEnabled(true);
				}
				int intSelect = new Integer(slider_top.getSelection());
				combo_top.setText((StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - intSelect) + "");
				styleDialog.setPropertyValue(pageName, "top", combo_top.getText() + combo_topUnit.getItem(combo_topUnit.getSelectionIndex()));
			}
		});
		combo_topUnit.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_top.getText().equals("(值)")) {
					styleDialog.setPropertyValue(pageName, "top", combo_top.getText() + combo_topUnit.getItem(combo_topUnit.getSelectionIndex()));
				}
			}
		});

		combo_right.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_right.getSelectionIndex();
				if (index == combo_right.getItems().length - 1) {
					combo_rightUnit.setEnabled(true);
				} else if (index != -1) {
					combo_rightUnit.setEnabled(false);
					StyleCommonPropertyValue.initSlide(slider_right);
					styleDialog.setPropertyValue(pageName, "right", combo_right.getItem(combo_right.getSelectionIndex()));
				}
			}
		});
		combo_right.addFocusListener(new FocusListener() {
			public void focusGained(FocusEvent e) {
			}

			public void focusLost(FocusEvent e) {
				rightNumberInputConfirm();
			}
		});
		combo_right.addKeyListener(new KeyAdapter() {
			public void keyPressed(KeyEvent e) {
				if (e.keyCode == SWT.CR | e.keyCode == SWT.KEYPAD_CR) {
					rightNumberInputConfirm();
				}
			}
		});

		slider_right.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_rightUnit.getEnabled()) {
					combo_rightUnit.setEnabled(true);
				}
				int intSelect = new Integer(slider_right.getSelection());
				combo_right.setText((StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - intSelect) + "");
				styleDialog.setPropertyValue(pageName, "right", combo_right.getText() + combo_rightUnit.getItem(combo_rightUnit.getSelectionIndex()));
			}
		});
		combo_rightUnit.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_right.getText().equals("(值)")) {
					styleDialog.setPropertyValue(pageName, "right", combo_right.getText()
							+ combo_rightUnit.getItem(combo_rightUnit.getSelectionIndex()));
				}
			}
		});

		combo_bottom.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_bottom.getSelectionIndex();
				if (index == combo_bottom.getItems().length - 1) {
					combo_bottomUnit.setEnabled(true);
				} else if (index != -1) {
					combo_bottomUnit.setEnabled(false);
					StyleCommonPropertyValue.initSlide(slider_bottom);
					styleDialog.setPropertyValue(pageName, "bottom", combo_bottom.getItem(combo_bottom.getSelectionIndex()));
				}
			}
		});
		combo_bottom.addFocusListener(new FocusListener() {
			public void focusGained(FocusEvent e) {
			}

			public void focusLost(FocusEvent e) {
				bottomNumberInputConfirm();
			}
		});
		combo_bottom.addKeyListener(new KeyAdapter() {
			public void keyPressed(KeyEvent e) {
				if (e.keyCode == SWT.CR | e.keyCode == SWT.KEYPAD_CR) {
					bottomNumberInputConfirm();
				}
			}
		});

		slider_bottom.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_bottomUnit.getEnabled()) {
					combo_bottomUnit.setEnabled(true);
				}
				int intSelect = new Integer(slider_bottom.getSelection());
				combo_bottom.setText((StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - intSelect) + "");
				styleDialog.setPropertyValue(pageName, "bottom", combo_bottom.getText()
						+ combo_bottomUnit.getItem(combo_bottomUnit.getSelectionIndex()));
			}
		});
		combo_bottomUnit.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_bottom.getText().equals("(值)")) {
					styleDialog.setPropertyValue(pageName, "bottom", combo_bottom.getText()
							+ combo_bottomUnit.getItem(combo_bottomUnit.getSelectionIndex()));
				}
			}
		});

		combo_left.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_left.getSelectionIndex();
				if (index == combo_left.getItems().length - 1) {
					combo_leftUnit.setEnabled(true);
				} else if (index != -1) {
					combo_leftUnit.setEnabled(false);
					StyleCommonPropertyValue.initSlide(slider_left);
					styleDialog.setPropertyValue(pageName, "left", combo_left.getItem(combo_left.getSelectionIndex()));
				}
			}
		});
		combo_left.addFocusListener(new FocusListener() {
			public void focusGained(FocusEvent e) {
			}

			public void focusLost(FocusEvent e) {
				leftNumberInputConfirm();
			}
		});
		combo_left.addKeyListener(new KeyAdapter() {
			public void keyPressed(KeyEvent e) {
				if (e.keyCode == SWT.CR | e.keyCode == SWT.KEYPAD_CR) {
					leftNumberInputConfirm();
				}
			}
		});

		slider_left.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_leftUnit.getEnabled()) {
					combo_leftUnit.setEnabled(true);
				}
				int intSelect = new Integer(slider_left.getSelection());
				combo_left.setText((StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - intSelect) + "");
				styleDialog.setPropertyValue(pageName, "left", combo_left.getText() + combo_leftUnit.getItem(combo_leftUnit.getSelectionIndex()));
			}
		});
		combo_leftUnit.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_left.getText().equals("(值)")) {
					styleDialog.setPropertyValue(pageName, "left", combo_left.getText() + combo_leftUnit.getItem(combo_leftUnit.getSelectionIndex()));
				}
			}
		});
	}

}
