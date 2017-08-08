package com.justep.studio.ui.editors.stylepage;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

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
 * 布局
 * @author linhongbao
 *
 */
public class StyleLayoutPage extends Composite implements IPropertyDialogPage, IStylePage {

	private Combo combo_leftUnit;
	private Combo combo_bottomUnit;
	private Combo combo_rightUnit;
	private Combo combo_topUnit;
	private Combo combo_left;
	private Combo combo_right;
	private Combo combo_top;
	private Combo combo_cursor;
	private Combo combo_clear;
	private Combo combo_float;
	private Combo combo_display;
	private Combo combo_overflow;
	private Slider slider_top;
	private Slider slider_right;
	private Slider slider_bottom;
	private Slider slider_left;

	private StyleDialog styleDialog;
	private Combo combo_bottom;
	private String styleValue;

	private String topValue = "auto";
	private String rightValue = "auto";
	private String bottomValue = "auto";
	private String leftValue = "auto";
	private Combo combo_visibility;
	private String pageName = "布局";
	private Label visibilityLabel;
	private Label diplayLabel;
	private Label folatLabel;
	private Label clearLabel;
	private Label cuLabel;
	private Label overLabel;
	private Label clipLabel;
	private Label rectLabel;
	private Label topLabel;
	private Label rightLabel;
	private Label bottomLabel;
	private Label leftLabel;

	public StyleLayoutPage(Composite parent, StyleDialog styleDialog, String styleValue, int style) {
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

		combo_top.setItems(new String[] { "", "auto", "inherit", "(值)" });
		combo_right.setItems(new String[] { "", "auto", "inherit", "(值)" });
		combo_bottom.setItems(new String[] { "", "auto", "inherit", "(值)" });
		combo_left.setItems(new String[] { "", "auto", "inherit", "(值)" });

		combo_visibility.setItems(new String[] { "", "visible", "hidden", "collapse", "inherit" });

		combo_overflow.setItems(new String[] { "", "visible", "hidden", "scroll", "auto", "inherit" });

		combo_display.setItems(new String[] { "", "inline", "block", "list-item", "run-in", "inline-block", "table", "inline-table",
				"table-row-group", "table-header-group", "table-footer-group", "table-row", "table-column-group", "table-column", "table-cell",
				"table-caption", "none", "inherit" });

		combo_float.setItems(new String[] { "", "left", "right", "none", "inherit" });

		combo_clear.setItems(new String[] { "", "none", "left", "right", "both", "inherit" });

		combo_cursor.setItems(new String[] { "", "auto", "crosshair", "default", "pointer", "move", "e-resize", "ne-resize", "nw-resize", "n-resize",
				"se-resize", "sw-resize", "s-resize", "w-resize", "text", "wait", "help", "progress", "inherit" });

		combo_topUnit.setItems(StyleCommonPropertyValue.NUMBER_UNIT_VALUE);
		combo_topUnit.select(0);

		combo_rightUnit.setItems(StyleCommonPropertyValue.NUMBER_UNIT_VALUE);
		combo_rightUnit.select(0);

		combo_bottomUnit.setItems(StyleCommonPropertyValue.NUMBER_UNIT_VALUE);
		combo_bottomUnit.select(0);

		combo_leftUnit.setItems(StyleCommonPropertyValue.NUMBER_UNIT_VALUE);
		combo_leftUnit.select(0);

		combo_topUnit.setEnabled(false);
		combo_rightUnit.setEnabled(false);
		combo_bottomUnit.setEnabled(false);
		combo_leftUnit.setEnabled(false);

		StyleCommonPropertyValue.initSlide(slider_bottom);
		StyleCommonPropertyValue.initSlide(slider_left);
		StyleCommonPropertyValue.initSlide(slider_right);
		StyleCommonPropertyValue.initSlide(slider_top);
	}

	public void initLayout() {
		final TableWrapLayout gridLayout = new TableWrapLayout();
		gridLayout.numColumns = 6;
		setLayout(gridLayout);

		visibilityLabel = new Label(this, SWT.NONE);
		visibilityLabel.setText("visibility:");
		final TableWrapData visibilityLabelData = new TableWrapData(TableWrapData.RIGHT);
		visibilityLabel.setLayoutData(visibilityLabelData);

		combo_visibility = new Combo(this, SWT.NONE);
		combo_visibility.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
		combo_visibility.setLayoutData(new TableWrapData(TableWrapData.FILL));

		overLabel = new Label(this, SWT.NONE);
		overLabel.setText("overflow:");
		final TableWrapData overLabelData = new TableWrapData(TableWrapData.RIGHT);
		overLabel.setLayoutData(overLabelData);

		combo_overflow = new Combo(this, SWT.NONE);
		combo_overflow.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		new Label(this, SWT.NONE);
		new Label(this, SWT.NONE);

		diplayLabel = new Label(this, SWT.NONE);
		diplayLabel.setText("display:");
		final TableWrapData diplayLabelData = new TableWrapData(TableWrapData.RIGHT);
		diplayLabel.setLayoutData(diplayLabelData);

		combo_display = new Combo(this, SWT.NONE);
		combo_display.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
		combo_display.setLayoutData(new TableWrapData(TableWrapData.FILL));

		clipLabel = new Label(this, SWT.NONE);
		final TableWrapData clipLabelData = new TableWrapData(TableWrapData.RIGHT);
		clipLabel.setLayoutData(clipLabelData);
		clipLabel.setText("clip:");

		rectLabel = new Label(this, SWT.NONE);
		rectLabel.setText("rect(...)");
		new Label(this, SWT.NONE);
		new Label(this, SWT.NONE);

		folatLabel = new Label(this, SWT.NONE);
		folatLabel.setText("float:");
		final TableWrapData folatLabelData = new TableWrapData(TableWrapData.RIGHT);
		folatLabel.setLayoutData(folatLabelData);

		combo_float = new Combo(this, SWT.NONE);
		combo_float.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
		combo_float.setLayoutData(new TableWrapData(TableWrapData.FILL));

		topLabel = new Label(this, SWT.NONE);
		topLabel.setText("top:");
		final TableWrapData topLabelData = new TableWrapData(TableWrapData.RIGHT);
		topLabel.setLayoutData(topLabelData);

		//un_init
		combo_top = new Combo(this, SWT.NONE);
		combo_top.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		slider_top = new Slider(this, SWT.VERTICAL);
		final TableWrapData twd_slider_top = new TableWrapData(TableWrapData.LEFT, TableWrapData.TOP);
		twd_slider_top.heightHint = 20;
		slider_top.setLayoutData(twd_slider_top);

		combo_topUnit = new Combo(this, SWT.NONE);
		combo_topUnit.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		clearLabel = new Label(this, SWT.NONE);
		clearLabel.setText("clear:");
		final TableWrapData clearLabelData = new TableWrapData(TableWrapData.RIGHT);
		clearLabel.setLayoutData(clearLabelData);

		combo_clear = new Combo(this, SWT.NONE);
		combo_clear.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
		combo_clear.setLayoutData(new TableWrapData(TableWrapData.FILL));

		rightLabel = new Label(this, SWT.NONE);
		rightLabel.setText("right:");
		final TableWrapData rightLabelData = new TableWrapData(TableWrapData.RIGHT);
		rightLabel.setLayoutData(rightLabelData);

		combo_right = new Combo(this, SWT.NONE);
		combo_right.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		slider_right = new Slider(this, SWT.VERTICAL);
		final TableWrapData twd_slider_right = new TableWrapData(TableWrapData.LEFT, TableWrapData.TOP);
		twd_slider_right.heightHint = 20;
		slider_right.setLayoutData(twd_slider_right);

		combo_rightUnit = new Combo(this, SWT.NONE);
		combo_rightUnit.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		cuLabel = new Label(this, SWT.NONE);
		final TableWrapData cuLabelData = new TableWrapData(TableWrapData.RIGHT);
		cuLabel.setLayoutData(cuLabelData);
		cuLabel.setText("cursor:");

		combo_cursor = new Combo(this, SWT.NONE);
		combo_cursor.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
		combo_cursor.setLayoutData(new TableWrapData(TableWrapData.FILL));

		bottomLabel = new Label(this, SWT.NONE);
		bottomLabel.setText("bottom:");
		final TableWrapData bottomLabelData = new TableWrapData(TableWrapData.RIGHT);
		bottomLabel.setLayoutData(bottomLabelData);

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
		leftLabel.setText("left:");
		final TableWrapData leftLabelData = new TableWrapData(TableWrapData.RIGHT);
		leftLabel.setLayoutData(leftLabelData);

		combo_left = new Combo(this, SWT.NONE);
		combo_left.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

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
		if (StyleCommonPropertyValue.setComboValueIndex("visibility", combo_visibility, styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndex("display", combo_display, styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndex("float", combo_float, styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndex("clear", combo_clear, styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndex("overflow", combo_overflow, styleValue)) {
			hashDefaultValue = true;
		}

		String propertyName = "clip";
		int clipIndex = styleValue.indexOf(propertyName);
		if (clipIndex != -1) {
			int lastSplitindex = styleValue.lastIndexOf(";");
			String regex = "";
			if (lastSplitindex > clipIndex) {
				regex = propertyName + StyleCommonPropertyValue.REGEX_PROPERTY_MIDDLE;
			} else {
				regex = propertyName + StyleCommonPropertyValue.REGEX_PROPERTY_END;
			}
			Pattern pattern = Pattern.compile(regex);
			Matcher matcher = pattern.matcher(styleValue);
			if (matcher.find()) {
				String clipValue = matcher.group(1).trim();
				clipValue = clipValue.substring(5, clipValue.length() - 1);
				String[] clipArray = clipValue.split(" ");
				if (clipArray.length > 0) {
					int i = 0;
					for (i = 0; i < StyleCommonPropertyValue.NUMBER_UNIT_VALUE.length; i++) {
						if (clipArray[0].endsWith(StyleCommonPropertyValue.NUMBER_UNIT_VALUE[i])) {
							int num = Integer.parseInt(clipArray[0].replace(StyleCommonPropertyValue.NUMBER_UNIT_VALUE[i], ""));
							combo_top.setText(num + "");
							slider_top.setSelection(StyleCommonPropertyValue.SLIDER_DEFAULT_SELECTION + num);
							combo_topUnit.select(i);
							combo_topUnit.setEnabled(true);
							hashDefaultValue = true;
						}
					}
					if (i >= StyleCommonPropertyValue.NUMBER_UNIT_VALUE.length) {
						for (int j = 0; j < combo_top.getItems().length; j++) {
							if (combo_top.getItem(j).equals(clipArray[0])) {
								combo_top.select(j);
								hashDefaultValue = true;
								break;
							}
						}
					}
				}
				if (clipArray.length > 1) {
					int i = 0;
					for (i = 0; i < StyleCommonPropertyValue.NUMBER_UNIT_VALUE.length; i++) {
						if (clipArray[1].endsWith(StyleCommonPropertyValue.NUMBER_UNIT_VALUE[i])) {
							int num = Integer.parseInt(clipArray[1].replace(StyleCommonPropertyValue.NUMBER_UNIT_VALUE[i], ""));
							combo_right.setText(num + "");
							slider_right.setSelection(StyleCommonPropertyValue.SLIDER_DEFAULT_SELECTION + num);
							combo_rightUnit.select(i);
							combo_rightUnit.setEnabled(true);
							hashDefaultValue = true;
						}
					}
					if (i >= StyleCommonPropertyValue.NUMBER_UNIT_VALUE.length) {
						for (int j = 0; j < combo_right.getItems().length; j++) {
							if (combo_right.getItem(j).equals(clipArray[1])) {
								combo_right.select(j);
								hashDefaultValue = true;
								break;
							}
						}
					}
				}
				if (clipArray.length > 2) {
					int i = 0;
					for (i = 0; i < StyleCommonPropertyValue.NUMBER_UNIT_VALUE.length; i++) {
						if (clipArray[2].endsWith(StyleCommonPropertyValue.NUMBER_UNIT_VALUE[i])) {
							int num = Integer.parseInt(clipArray[2].replace(StyleCommonPropertyValue.NUMBER_UNIT_VALUE[i], ""));
							combo_bottom.setText(num + "");
							slider_bottom.setSelection(StyleCommonPropertyValue.SLIDER_DEFAULT_SELECTION + num);
							combo_bottomUnit.select(i);
							combo_bottomUnit.setEnabled(true);
							hashDefaultValue = true;
						}
					}
					if (i >= StyleCommonPropertyValue.NUMBER_UNIT_VALUE.length) {
						for (int j = 0; j < combo_bottom.getItems().length; j++) {
							if (combo_bottom.getItem(j).equals(clipArray[2])) {
								combo_bottom.select(j);
								hashDefaultValue = true;
								break;
							}
						}
					}
				}
				if (clipArray.length > 3) {
					int i = 0;
					for (i = 0; i < StyleCommonPropertyValue.NUMBER_UNIT_VALUE.length; i++) {
						if (clipArray[3].endsWith(StyleCommonPropertyValue.NUMBER_UNIT_VALUE[i])) {
							int num = Integer.parseInt(clipArray[3].replace(StyleCommonPropertyValue.NUMBER_UNIT_VALUE[i], ""));
							combo_left.setText(num + "");
							slider_left.setSelection(StyleCommonPropertyValue.SLIDER_DEFAULT_SELECTION + num);
							combo_leftUnit.select(i);
							combo_leftUnit.setEnabled(true);
							hashDefaultValue = true;
						}
					}
					if (i >= StyleCommonPropertyValue.NUMBER_UNIT_VALUE.length) {
						for (int j = 0; j < combo_left.getItems().length; j++) {
							if (combo_left.getItem(j).equals(clipArray[3])) {
								combo_left.select(j);
								hashDefaultValue = true;
								break;
							}
						}
					}
				}
			}
		}
		if(hashDefaultValue){
			styleDialog.updateKindListShow(pageName);
		}
	}

	private MouseAdapter mouseAdapter = new MouseAdapter() {
		public void mouseDown(MouseEvent e) {
			if (combo_top.isFocusControl()) {
				topNumberInputConfirm();
			} else if (combo_bottom.isFocusControl()) {
				bottomNumberInputConfirm();
			} else if (combo_right.isFocusControl()) {
				rightNumberInputConfirm();
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
			leftValue = comboText + combo_leftUnit.getItem(combo_leftUnit.getSelectionIndex());
			setStyleDialogValue();
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
			rightValue = comboText + combo_rightUnit.getItem(combo_rightUnit.getSelectionIndex());
			setStyleDialogValue();
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
			bottomValue = comboText + combo_bottomUnit.getItem(combo_bottomUnit.getSelectionIndex());
			setStyleDialogValue();
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
			topValue = comboText + combo_topUnit.getItem(combo_topUnit.getSelectionIndex());
			setStyleDialogValue();
		}
	}

	private void mouseEvent(Control control) {
		control.addMouseListener(mouseAdapter);
	}

	public void registerEvent() {
		mouseEvent(this);
		mouseEvent(visibilityLabel);
		mouseEvent(diplayLabel);
		mouseEvent(folatLabel);
		mouseEvent(clearLabel);
		mouseEvent(cuLabel);
		mouseEvent(overLabel);
		mouseEvent(clipLabel);
		mouseEvent(rectLabel);
		mouseEvent(topLabel);
		mouseEvent(rightLabel);
		mouseEvent(bottomLabel);
		mouseEvent(leftLabel);

		combo_visibility.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_visibility.getSelectionIndex();
				if (index != -1) {
					styleDialog.setPropertyValue(pageName, "visibility", combo_visibility.getItem(index));
				}
			}
		});
		combo_overflow.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_overflow.getSelectionIndex();
				if (index != -1) {
					styleDialog.setPropertyValue(pageName, "overflow", combo_overflow.getItem(index));
				}
			}
		});
		combo_display.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_display.getSelectionIndex();
				if (index != -1) {
					styleDialog.setPropertyValue(pageName, "display", combo_display.getItem(index));
				}
			}
		});
		combo_float.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_float.getSelectionIndex();
				if (index != -1) {
					styleDialog.setPropertyValue(pageName, "float", combo_float.getItem(index));
				}
			}
		});
		combo_clear.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_clear.getSelectionIndex();
				if (index != -1) {
					styleDialog.setPropertyValue(pageName, "clear", combo_clear.getItem(index));
				}
			}
		});
		combo_cursor.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_cursor.getSelectionIndex();
				if (index != -1) {
					styleDialog.setPropertyValue(pageName, "cursor", combo_cursor.getItem(index));
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
					topValue = combo_top.getItem(combo_top.getSelectionIndex());
					setStyleDialogValue();
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
				topValue = combo_top.getText() + combo_topUnit.getItem(combo_topUnit.getSelectionIndex());
				setStyleDialogValue();
			}
		});
		combo_topUnit.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_top.getText().equals("(值)")) {
					topValue = combo_top.getText() + combo_topUnit.getItem(combo_topUnit.getSelectionIndex());
					setStyleDialogValue();
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
					rightValue = combo_right.getItem(combo_right.getSelectionIndex());
					setStyleDialogValue();
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
				rightValue = combo_right.getText() + combo_rightUnit.getItem(combo_rightUnit.getSelectionIndex());
				setStyleDialogValue();
			}
		});
		combo_rightUnit.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_right.getText().equals("(值)")) {
					rightValue = combo_right.getText() + combo_rightUnit.getItem(combo_rightUnit.getSelectionIndex());
					setStyleDialogValue();
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
					bottomValue = combo_bottom.getItem(combo_bottom.getSelectionIndex());
					setStyleDialogValue();
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
				bottomValue = combo_bottom.getText() + combo_bottomUnit.getItem(combo_bottomUnit.getSelectionIndex());
				setStyleDialogValue();
			}
		});
		combo_bottomUnit.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_bottom.getText().equals("(值)")) {
					bottomValue = combo_bottom.getText() + combo_bottomUnit.getItem(combo_bottomUnit.getSelectionIndex());
					setStyleDialogValue();
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
					leftValue = combo_left.getItem(combo_left.getSelectionIndex());
					setStyleDialogValue();
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
				leftValue = combo_left.getText() + combo_leftUnit.getItem(combo_leftUnit.getSelectionIndex());
				setStyleDialogValue();
			}
		});
		combo_leftUnit.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_left.getText().equals("(值)")) {
					leftValue = combo_left.getText() + combo_leftUnit.getItem(combo_leftUnit.getSelectionIndex());
					setStyleDialogValue();
				}
			}
		});
	}

	protected void setStyleDialogValue() {
		if (topValue.equals("") || rightValue.equals("") || bottomValue.equals("") || leftValue.equals("")) {
			styleDialog.setPropertyValue(pageName, "clip", "");
		} else {
			styleDialog.setPropertyValue(pageName, "clip", "rect(" + topValue + " " + rightValue + " " + bottomValue + " " + leftValue + ")");
		}
	}

}
