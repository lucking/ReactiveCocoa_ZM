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
 * 块
 * @author linhongbao
 *
 */
public class StyleSpacePage extends Composite implements IPropertyDialogPage, IStylePage {

	private Combo combo_letter_spacingUnit;
	private Combo combo_letter_spacing;
	private Combo combo_word_spacingUnit;
	private Combo combo_word_spacing;
	private Combo combo_white_space;
	private Combo combo_text_indentUnit;
	private Combo combo_text_indent;
	private Combo combo_text_align;
	private Combo combo_vertical_alignUnit;
	private Combo combo_vertical_align;
	private Combo combo_line_heightUnit;
	private Combo combo_line_height;

	private String pageName = "块";
	private StyleDialog styleDialog;
	private Slider slider_line_height;
	private Slider slider_vertical_align;
	private Slider slider_text_indent;
	private Slider slider_word_spacing;
	private Slider slider_letter_spacing;
	private String styleValue;
	private Label lightLabel;
	private Label verticalLabel;
	private Label text_alignLabel;
	private Label textLabel;
	private Label whitespaceLabel;
	private Label wordspacingLabel;
	private Label leaterLabel;

	public StyleSpacePage(Composite parent, StyleDialog styleDialog, String styleValue, int style) {
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

		combo_line_height.setItems(new String[] { "", "normal", "inherit", "(值)" });
		combo_vertical_align.setItems(new String[] { "", "baseline", "bottom", "middle", "sub", "super", "text-bottom", "text-top", "top", "inherit",
				"(值)" });
		combo_text_indent.setItems(new String[] { "", "inherit", "(值)" });
		combo_word_spacing.setItems(new String[] { "", "normal", "inherit", "(值)" });
		combo_letter_spacing.setItems(new String[] { "", "normal", "inherit", "(值)" });
		combo_text_align.setItems(new String[] { "", "left", "center", "right", "justify", "inherit" });
		combo_white_space.setItems(new String[] { "", "normal", "pre", "nowrap", "pre-wrap", "pre-line", "inherit" });
		combo_line_heightUnit.setItems(StyleCommonPropertyValue.NUMBER_UNIT_VALUE);
		combo_line_heightUnit.select(0);
		combo_line_heightUnit.setEnabled(false);
		combo_vertical_alignUnit.setItems(StyleCommonPropertyValue.NUMBER_UNIT_VALUE);
		combo_vertical_alignUnit.select(8);
		combo_vertical_alignUnit.setEnabled(false);
		combo_text_indentUnit.setItems(StyleCommonPropertyValue.NUMBER_UNIT_VALUE);
		combo_text_indentUnit.select(0);
		combo_text_indentUnit.setEnabled(false);
		combo_word_spacingUnit.setItems(StyleCommonPropertyValue.NUMBER_UNIT_VALUE);
		combo_word_spacingUnit.select(6);
		combo_word_spacingUnit.setEnabled(false);
		combo_letter_spacingUnit.setItems(StyleCommonPropertyValue.NUMBER_UNIT_VALUE);
		combo_letter_spacingUnit.select(6);
		combo_letter_spacingUnit.setEnabled(false);

		StyleCommonPropertyValue.initSlide(slider_line_height);
		StyleCommonPropertyValue.initSlide(slider_letter_spacing);
		StyleCommonPropertyValue.initSlide(slider_text_indent);
		StyleCommonPropertyValue.initSlide(slider_vertical_align);
		StyleCommonPropertyValue.initSlide(slider_word_spacing);
	}

	public void initLayout() {

		final TableWrapLayout tableLayout = new TableWrapLayout();
		tableLayout.numColumns = 4;
		setLayout(tableLayout);

		lightLabel = new Label(this, SWT.RIGHT);
		lightLabel.setText("line-height:");
		TableWrapData twd_combo_font_family = new TableWrapData(TableWrapData.RIGHT);
		lightLabel.setLayoutData(twd_combo_font_family);

		combo_line_height = new Combo(this, SWT.NONE);
		combo_line_height.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
		combo_line_height.setLayoutData(new TableWrapData(TableWrapData.FILL));

		slider_line_height = new Slider(this, SWT.VERTICAL);
		final TableWrapData twd_slider_line_height = new TableWrapData(TableWrapData.LEFT, TableWrapData.TOP);
		twd_slider_line_height.heightHint = 20;
		slider_line_height.setLayoutData(twd_slider_line_height);

		combo_line_heightUnit = new Combo(this, SWT.NONE);
		combo_line_heightUnit.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		verticalLabel = new Label(this, SWT.NONE);
		TableWrapData verticalLabelData = new TableWrapData(TableWrapData.RIGHT);
		verticalLabel.setText("vertical-align:");
		verticalLabel.setLayoutData(verticalLabelData);

		combo_vertical_align = new Combo(this, SWT.NONE);
		combo_vertical_align.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
		combo_vertical_align.setLayoutData(new TableWrapData(TableWrapData.FILL));

		slider_vertical_align = new Slider(this, SWT.VERTICAL);
		final TableWrapData twd_slider_vertical_align = new TableWrapData(TableWrapData.LEFT, TableWrapData.TOP);
		twd_slider_vertical_align.heightHint = 20;
		slider_vertical_align.setLayoutData(twd_slider_vertical_align);

		combo_vertical_alignUnit = new Combo(this, SWT.NONE);
		combo_vertical_alignUnit.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		text_alignLabel = new Label(this, SWT.NONE);
		TableWrapData text_alignLabelData = new TableWrapData(TableWrapData.RIGHT);
		text_alignLabel.setText("text-align:");
		text_alignLabel.setLayoutData(text_alignLabelData);

		combo_text_align = new Combo(this, SWT.NONE);
		combo_text_align.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
		combo_text_align.setLayoutData(new TableWrapData(TableWrapData.FILL));
		new Label(this, SWT.NONE);
		new Label(this, SWT.NONE);

		textLabel = new Label(this, SWT.NONE);
		TableWrapData textLabelData = new TableWrapData(TableWrapData.RIGHT);
		textLabel.setText("text-indent:");
		textLabel.setLayoutData(textLabelData);

		combo_text_indent = new Combo(this, SWT.NONE);
		combo_text_indent.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
		combo_text_indent.setLayoutData(new TableWrapData(TableWrapData.FILL));

		slider_text_indent = new Slider(this, SWT.VERTICAL);
		final TableWrapData twd_slider_text_indent = new TableWrapData(TableWrapData.LEFT, TableWrapData.TOP);
		twd_slider_text_indent.heightHint = 20;
		slider_text_indent.setLayoutData(twd_slider_text_indent);

		combo_text_indentUnit = new Combo(this, SWT.NONE);
		combo_text_indentUnit.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		whitespaceLabel = new Label(this, SWT.NONE);
		TableWrapData whitespaceLabelData = new TableWrapData(TableWrapData.RIGHT);
		whitespaceLabel.setText("white-space:");
		whitespaceLabel.setLayoutData(whitespaceLabelData);

		combo_white_space = new Combo(this, SWT.NONE);
		combo_white_space.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
		combo_white_space.setLayoutData(new TableWrapData(TableWrapData.FILL));
		new Label(this, SWT.NONE);
		new Label(this, SWT.NONE);

		wordspacingLabel = new Label(this, SWT.NONE);
		TableWrapData wordspacingLabelData = new TableWrapData(TableWrapData.RIGHT);
		wordspacingLabel.setText("word-spacing:");
		wordspacingLabel.setLayoutData(wordspacingLabelData);

		combo_word_spacing = new Combo(this, SWT.NONE);
		combo_word_spacing.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
		combo_word_spacing.setLayoutData(new TableWrapData(TableWrapData.FILL));

		slider_word_spacing = new Slider(this, SWT.VERTICAL);
		final TableWrapData twd_slider_word_spacing = new TableWrapData(TableWrapData.LEFT, TableWrapData.TOP);
		twd_slider_word_spacing.heightHint = 20;
		slider_word_spacing.setLayoutData(twd_slider_word_spacing);

		combo_word_spacingUnit = new Combo(this, SWT.NONE);
		combo_word_spacingUnit.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		leaterLabel = new Label(this, SWT.NONE);
		TableWrapData leaterLabelData = new TableWrapData(TableWrapData.RIGHT);
		leaterLabel.setText("letter-spacing:");
		leaterLabel.setLayoutData(leaterLabelData);

		combo_letter_spacing = new Combo(this, SWT.NONE);
		combo_letter_spacing.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
		combo_letter_spacing.setLayoutData(new TableWrapData(TableWrapData.FILL));

		slider_letter_spacing = new Slider(this, SWT.VERTICAL);
		final TableWrapData twd_slider_letter_spacing = new TableWrapData(TableWrapData.LEFT, TableWrapData.TOP);
		twd_slider_letter_spacing.heightHint = 20;
		slider_letter_spacing.setLayoutData(twd_slider_letter_spacing);

		combo_letter_spacingUnit = new Combo(this, SWT.NONE);
		combo_letter_spacingUnit.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
	}

	public void initSelfDefaultValue() {
		boolean hashDefaultValue = false;
		if (styleValue == null || "".equals(styleValue)) {
			return;
		}
		if (StyleCommonPropertyValue.setComboValueIndex("text-align", combo_text_align, styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndex("white-space", combo_white_space, styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndexWithUnit("line-height", combo_line_height, slider_line_height, combo_line_heightUnit,
				styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndexWithUnit("vertical-align", combo_vertical_align, slider_vertical_align,
				combo_vertical_alignUnit, styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndexWithUnit("text-indent", combo_text_indent, slider_text_indent, combo_text_indentUnit,
				styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndexWithUnit("word-spacing", combo_word_spacing, slider_word_spacing, combo_word_spacingUnit,
				styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndexWithUnit("letter-spacing", combo_letter_spacing, slider_letter_spacing,
				combo_letter_spacingUnit, styleValue)) {
			hashDefaultValue = true;
		}
		if(hashDefaultValue){
			styleDialog.updateKindListShow(pageName);
		}
	}

	private MouseAdapter mouseAdapter = new MouseAdapter() {
		public void mouseDown(MouseEvent e) {
			if (combo_line_height.isFocusControl()) {
				lineHeightNumberInputConfim();
			} else if (combo_vertical_align.isFocusControl()) {
				verticalAlignNumberInputConfim();
			} else if (combo_text_indent.isFocusControl()) {
				textIndentNumberInputConfim();
			} else if (combo_word_spacing.isFocusControl()) {
				wordSpacingNumberInputConfim();
			} else if (combo_letter_spacing.isFocusControl()) {
				letterSpacingNumberInputConfim();
			}
		}
	};

	private void letterSpacingNumberInputConfim() {
		String comboText = combo_letter_spacing.getText();
		if (StyleCommonPropertyValue.matchesNumber(comboText)) {
			int num = Integer.valueOf(comboText);
			if (!combo_letter_spacingUnit.getEnabled()) {
				combo_letter_spacingUnit.setEnabled(true);
			}
			slider_letter_spacing.setSelection(StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - num);
			styleDialog.setPropertyValue(pageName, "letter-spacing", comboText
					+ combo_letter_spacingUnit.getItem(combo_letter_spacingUnit.getSelectionIndex()));
		}
	}

	private void wordSpacingNumberInputConfim() {
		String comboText = combo_word_spacing.getText();
		if (StyleCommonPropertyValue.matchesNumber(comboText)) {
			int num = Integer.valueOf(comboText);
			if (!combo_word_spacingUnit.getEnabled()) {
				combo_word_spacingUnit.setEnabled(true);
			}
			slider_word_spacing.setSelection(StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - num);
			styleDialog.setPropertyValue(pageName, "word-spacing", comboText
					+ combo_word_spacingUnit.getItem(combo_word_spacingUnit.getSelectionIndex()));
		}
	}

	private void textIndentNumberInputConfim() {
		String comboText = combo_text_indent.getText();
		if (StyleCommonPropertyValue.matchesNumber(comboText)) {
			int num = Integer.valueOf(comboText);
			if (!combo_text_indentUnit.getEnabled()) {
				combo_text_indentUnit.setEnabled(true);
			}
			slider_text_indent.setSelection(StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - num);
			styleDialog.setPropertyValue(pageName, "text-indent", comboText
					+ combo_text_indentUnit.getItem(combo_text_indentUnit.getSelectionIndex()));
		}
	}

	private void verticalAlignNumberInputConfim() {
		String comboText = combo_vertical_align.getText();
		if (StyleCommonPropertyValue.matchesNumber(comboText)) {
			int num = Integer.valueOf(comboText);
			if (!combo_vertical_alignUnit.getEnabled()) {
				combo_vertical_alignUnit.setEnabled(true);
			}
			slider_vertical_align.setSelection(StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - num);
			styleDialog.setPropertyValue(pageName, "vertical-align", comboText
					+ combo_vertical_alignUnit.getItem(combo_vertical_alignUnit.getSelectionIndex()));
		}
	}

	private void lineHeightNumberInputConfim() {
		String comboText = combo_line_height.getText();
		if (StyleCommonPropertyValue.matchesNumber(comboText)) {
			int num = Integer.valueOf(comboText);
			if (!combo_line_heightUnit.getEnabled()) {
				combo_line_heightUnit.setEnabled(true);
			}
			slider_line_height.setSelection(StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - num);
			styleDialog.setPropertyValue(pageName, "line-height", comboText
					+ combo_line_heightUnit.getItem(combo_line_heightUnit.getSelectionIndex()));
		}
	}

	private void mouseEvent(Control control) {
		control.addMouseListener(mouseAdapter);
	}

	public void registerEvent() {
		mouseEvent(this);
		mouseEvent(lightLabel);
		mouseEvent(verticalLabel);
		mouseEvent(text_alignLabel);
		mouseEvent(textLabel);
		mouseEvent(whitespaceLabel);
		mouseEvent(wordspacingLabel);
		mouseEvent(leaterLabel);

		combo_line_height.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_line_height.getSelectionIndex();
				if (index == combo_line_height.getItems().length - 1) {
					combo_line_heightUnit.setEnabled(true);
				} else if (index != -1) {
					combo_line_heightUnit.setEnabled(false);
					StyleCommonPropertyValue.initSlide(slider_line_height);
					styleDialog.setPropertyValue(pageName, "line-height", combo_line_height.getItem(combo_line_height.getSelectionIndex()));
				}
			}
		});
		combo_line_height.addFocusListener(new FocusListener() {
			public void focusGained(FocusEvent e) {
			}

			public void focusLost(FocusEvent e) {
				lineHeightNumberInputConfim();
			}
		});
		combo_line_height.addKeyListener(new KeyAdapter() {
			public void keyPressed(KeyEvent e) {
				if (e.keyCode == SWT.CR | e.keyCode == SWT.KEYPAD_CR) {
					lineHeightNumberInputConfim();
				}
			}
		});

		slider_line_height.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_line_heightUnit.getEnabled()) {
					combo_line_heightUnit.setEnabled(true);
				}
				int intSelect = new Integer(slider_line_height.getSelection());
				combo_line_height.setText((StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - intSelect) + "");
				styleDialog.setPropertyValue(pageName, "line-height", combo_line_height.getText()
						+ combo_line_heightUnit.getItem(combo_line_heightUnit.getSelectionIndex()));
			}
		});
		combo_line_heightUnit.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_line_height.getText().equals("(值)")) {
					styleDialog.setPropertyValue(pageName, "line-height", combo_line_height.getText()
							+ combo_line_heightUnit.getItem(combo_line_heightUnit.getSelectionIndex()));
				}
			}
		});

		combo_vertical_align.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_vertical_align.getSelectionIndex();
				if (index == combo_vertical_align.getItems().length - 1) {
					combo_vertical_alignUnit.setEnabled(true);
				} else if (index != -1) {
					combo_vertical_alignUnit.setEnabled(false);
					StyleCommonPropertyValue.initSlide(slider_vertical_align);
					styleDialog.setPropertyValue(pageName, "vertical-align", combo_vertical_align.getItem(combo_vertical_align.getSelectionIndex()));
				}
			}
		});
		combo_vertical_align.addFocusListener(new FocusListener() {
			public void focusGained(FocusEvent e) {
			}

			public void focusLost(FocusEvent e) {
				verticalAlignNumberInputConfim();
			}
		});
		combo_vertical_align.addKeyListener(new KeyAdapter() {
			public void keyPressed(KeyEvent e) {
				if (e.keyCode == SWT.CR | e.keyCode == SWT.KEYPAD_CR) {
					verticalAlignNumberInputConfim();
				}
			}
		});
		slider_vertical_align.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_vertical_alignUnit.getEnabled()) {
					combo_vertical_alignUnit.setEnabled(true);
				}
				int intSelect = new Integer(slider_vertical_align.getSelection());
				combo_vertical_align.setText((StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - intSelect) + "");
				styleDialog.setPropertyValue(pageName, "vertical-align", combo_vertical_align.getText()
						+ combo_vertical_alignUnit.getItem(combo_vertical_alignUnit.getSelectionIndex()));
			}
		});
		combo_vertical_alignUnit.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_vertical_align.getText().equals("(值)")) {
					styleDialog.setPropertyValue(pageName, "vertical-align", combo_vertical_align.getText()
							+ combo_vertical_alignUnit.getItem(combo_vertical_alignUnit.getSelectionIndex()));
				}
			}
		});

		combo_text_align.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_text_align.getSelectionIndex();
				if (index != -1) {
					styleDialog.setPropertyValue(pageName, "text-align", combo_text_align.getItem(index));
				}
			}
		});

		combo_white_space.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_white_space.getSelectionIndex();
				if (index != -1) {
					styleDialog.setPropertyValue(pageName, "white-space", combo_white_space.getItem(index));
				}
			}
		});

		combo_text_indent.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_text_indent.getSelectionIndex();
				if (index == combo_text_indent.getItems().length - 1) {
					combo_text_indentUnit.setEnabled(true);
				} else if (index != -1) {
					combo_text_indentUnit.setEnabled(false);
					StyleCommonPropertyValue.initSlide(slider_text_indent);
					styleDialog.setPropertyValue(pageName, "text-indent", combo_text_indent.getItem(combo_text_indent.getSelectionIndex()));
				}
			}
		});
		combo_text_indent.addFocusListener(new FocusListener() {
			public void focusGained(FocusEvent e) {
			}

			public void focusLost(FocusEvent e) {
				textIndentNumberInputConfim();
			}
		});
		combo_text_indent.addKeyListener(new KeyAdapter() {
			public void keyPressed(KeyEvent e) {
				if (e.keyCode == SWT.CR | e.keyCode == SWT.KEYPAD_CR) {
					textIndentNumberInputConfim();
				}
			}
		});

		slider_text_indent.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_text_indentUnit.getEnabled()) {
					combo_text_indentUnit.setEnabled(true);
				}
				int intSelect = new Integer(slider_text_indent.getSelection());
				combo_text_indent.setText((StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - intSelect) + "");
				styleDialog.setPropertyValue(pageName, "text-indent", combo_text_indent.getText()
						+ combo_text_indentUnit.getItem(combo_text_indentUnit.getSelectionIndex()));
			}
		});
		combo_text_indentUnit.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_text_indent.getText().equals("(值)")) {
					styleDialog.setPropertyValue(pageName, "text-indent", combo_text_indent.getText()
							+ combo_text_indentUnit.getItem(combo_text_indentUnit.getSelectionIndex()));
				}
			}
		});

		combo_word_spacing.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_word_spacing.getSelectionIndex();
				if (index == combo_word_spacing.getItems().length - 1) {
					combo_word_spacingUnit.setEnabled(true);
				} else if (index != -1) {
					combo_word_spacingUnit.setEnabled(false);
					StyleCommonPropertyValue.initSlide(slider_word_spacing);
					styleDialog.setPropertyValue(pageName, "word-spacing", combo_word_spacing.getItem(combo_word_spacing.getSelectionIndex()));
				}
			}
		});

		combo_word_spacing.addFocusListener(new FocusListener() {
			public void focusGained(FocusEvent e) {
			}

			public void focusLost(FocusEvent e) {
				wordSpacingNumberInputConfim();
			}
		});
		combo_word_spacing.addKeyListener(new KeyAdapter() {
			public void keyPressed(KeyEvent e) {
				if (e.keyCode == SWT.CR | e.keyCode == SWT.KEYPAD_CR) {
					wordSpacingNumberInputConfim();
				}
			}
		});

		slider_word_spacing.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_word_spacingUnit.getEnabled()) {
					combo_word_spacingUnit.setEnabled(true);
				}
				int intSelect = new Integer(slider_word_spacing.getSelection());
				combo_word_spacing.setText((StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - intSelect) + "");
				styleDialog.setPropertyValue(pageName, "word-spacing", combo_word_spacing.getText()
						+ combo_word_spacingUnit.getItem(combo_word_spacingUnit.getSelectionIndex()));
			}
		});
		combo_word_spacingUnit.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_word_spacing.getText().equals("(值)")) {
					styleDialog.setPropertyValue(pageName, "word-spacing", combo_word_spacing.getText()
							+ combo_word_spacingUnit.getItem(combo_word_spacingUnit.getSelectionIndex()));
				}
			}
		});

		combo_letter_spacing.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_letter_spacing.getSelectionIndex();
				if (index == combo_letter_spacing.getItems().length - 1) {
					combo_letter_spacingUnit.setEnabled(true);
				} else if (index != -1) {
					combo_letter_spacingUnit.setEnabled(false);
					StyleCommonPropertyValue.initSlide(slider_letter_spacing);
					styleDialog.setPropertyValue(pageName, "letter-spacing", combo_letter_spacing.getItem(combo_letter_spacing.getSelectionIndex()));
				}
			}
		});

		combo_letter_spacing.addFocusListener(new FocusListener() {
			public void focusGained(FocusEvent e) {
			}

			public void focusLost(FocusEvent e) {
				letterSpacingNumberInputConfim();
			}
		});
		combo_letter_spacing.addKeyListener(new KeyAdapter() {
			public void keyPressed(KeyEvent e) {
				if (e.keyCode == SWT.CR | e.keyCode == SWT.KEYPAD_CR) {
					letterSpacingNumberInputConfim();
				}
			}
		});
		slider_letter_spacing.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_letter_spacingUnit.getEnabled()) {
					combo_letter_spacingUnit.setEnabled(true);
				}
				int intSelect = new Integer(slider_letter_spacing.getSelection());
				combo_letter_spacing.setText((StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - intSelect) + "");
				styleDialog.setPropertyValue(pageName, "letter-spacing", combo_letter_spacing.getText()
						+ combo_letter_spacingUnit.getItem(combo_letter_spacingUnit.getSelectionIndex()));
			}
		});
		combo_letter_spacingUnit.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_letter_spacing.getText().equals("(值)")) {
					styleDialog.setPropertyValue(pageName, "letter-spacing", combo_letter_spacing.getText()
							+ combo_letter_spacingUnit.getItem(combo_letter_spacingUnit.getSelectionIndex()));
				}
			}
		});
	}

}
