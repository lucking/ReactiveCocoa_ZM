package com.justep.studio.ui.editors.stylepage;

import java.awt.GraphicsEnvironment;
import java.util.Locale;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.eclipse.swt.SWT;
import org.eclipse.swt.events.FocusEvent;
import org.eclipse.swt.events.FocusListener;
import org.eclipse.swt.events.KeyAdapter;
import org.eclipse.swt.events.KeyEvent;
import org.eclipse.swt.events.MouseAdapter;
import org.eclipse.swt.events.MouseEvent;
import org.eclipse.swt.events.MouseListener;
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
 * 字体
 * @author linhongbao
 *
 */
public class StyleFontPage extends Composite implements IPropertyDialogPage, IStylePage {

	private Combo combo_font_sizeUnit;
	private Combo combo_text_transform;
	private Combo combo_font_variant;
	private Combo combo_font_style;
	private Combo combo_font_weight;
	private Combo combo_font_size;
	private Combo combo_font_family;

	private StyleDialog styleDialog;
	private Slider slider_font_size;
	private Composite composite_color;
	private Combo text_color;
	private Button check_underline;
	private Button check_overline;
	private Button check_line;
	private Button check_blink;
	private Button check_none;
	private String styleValue;
	private String pageName = "字体";

	private String underline = "";
	private String overline = "";
	private String line_through = "";
	private String blink = "";
	private String none = "";
	private Label fontLabel;
	private Label fontsizeLabel;
	private Label fontweightLabel;
	private Label fontstyleLabel;
	private Label fontLabel_1;
	private Label textLabel;
	private Label colorLabel;
	private Label textdesLabel;

	public StyleFontPage(Composite parent, StyleDialog styleDialog, String styleValue, int style) {
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

		String[] fontNames = GraphicsEnvironment.getLocalGraphicsEnvironment().getAvailableFontFamilyNames(Locale.getDefault());
		String[] fontNames2 = new String[fontNames.length + 1];
		fontNames2[0] = "";
		for (int i = 0; i < fontNames.length; i++) {
			fontNames2[i + 1] = fontNames[i];
		}
		combo_font_family.setItems(fontNames2);

		combo_font_weight.setItems(new String[] { "", "normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800",
				"900", "inherit" });

		combo_font_style.setItems(new String[] { "", "normal", "italic", "oblique", "inherit" });

		combo_font_variant.setItems(new String[] { "", "normal", "small-caps", "inherit" });

		combo_text_transform.setItems(new String[] { "", "capitalize", "uppercase", "lowercase", "none", "inherit" });

		combo_font_sizeUnit.setItems(StyleCommonPropertyValue.NUMBER_UNIT_VALUE);
		combo_font_sizeUnit.select(0);

		combo_font_size.setItems(new String[] { "", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "smaller", "larger",
				"inherit", "(值)" });

		combo_font_sizeUnit.setEnabled(false);
		text_color.setItems(new String[] { "" });
	}

	public void initLayout() {
		final TableWrapLayout tableWrapLayout = new TableWrapLayout();
		tableWrapLayout.numColumns = 5;

		setLayout(tableWrapLayout);

		fontLabel = new Label(this, SWT.NONE);
		fontLabel.setLayoutData(new TableWrapData(TableWrapData.RIGHT));
		fontLabel.setText("font-family:");

		TableWrapData twd_combo_font_family = new TableWrapData(TableWrapData.FILL);
		twd_combo_font_family.colspan = 4;
		combo_font_family = new Combo(this, SWT.NONE);
		combo_font_family.setVisibleItemCount(15);
		combo_font_family.setLayoutData(twd_combo_font_family);

		fontsizeLabel = new Label(this, SWT.NONE);
		fontsizeLabel.setLayoutData(new TableWrapData(TableWrapData.RIGHT));
		fontsizeLabel.setText("font-size:");

		combo_font_size = new Combo(this, SWT.NONE);
		combo_font_size.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
		combo_font_size.setLayoutData(new TableWrapData(TableWrapData.FILL));

		slider_font_size = new Slider(this, SWT.VERTICAL);
		final TableWrapData twd_slider_font_size = new TableWrapData(TableWrapData.LEFT, TableWrapData.TOP);
		twd_slider_font_size.heightHint = 20;
		slider_font_size.setLayoutData(twd_slider_font_size);

		StyleCommonPropertyValue.initSlide(slider_font_size);

		combo_font_sizeUnit = new Combo(this, SWT.NONE);
		combo_font_sizeUnit.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		textdesLabel = new Label(this, SWT.NONE);
		textdesLabel.setText("text-decoration:");

		fontweightLabel = new Label(this, SWT.NONE);
		fontweightLabel.setLayoutData(new TableWrapData(TableWrapData.RIGHT));
		fontweightLabel.setText("font-weight:");

		combo_font_weight = new Combo(this, SWT.NONE);
		combo_font_weight.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
		combo_font_weight.setLayoutData(new TableWrapData(TableWrapData.FILL));
		new Label(this, SWT.NONE);
		new Label(this, SWT.NONE);

		check_underline = new Button(this, SWT.CHECK);
		check_underline.setText("underline");

		fontstyleLabel = new Label(this, SWT.NONE);
		fontstyleLabel.setLayoutData(new TableWrapData(TableWrapData.RIGHT));
		fontstyleLabel.setText("font-style:");

		combo_font_style = new Combo(this, SWT.NONE);
		combo_font_style.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
		combo_font_style.setLayoutData(new TableWrapData(TableWrapData.FILL));

		new Label(this, SWT.NONE);
		new Label(this, SWT.NONE);

		check_overline = new Button(this, SWT.CHECK);
		check_overline.setText("overline");

		fontLabel_1 = new Label(this, SWT.NONE);
		fontLabel_1.setLayoutData(new TableWrapData(TableWrapData.RIGHT));
		fontLabel_1.setText("font-variant:");

		combo_font_variant = new Combo(this, SWT.NONE);
		combo_font_variant.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
		combo_font_variant.setLayoutData(new TableWrapData(TableWrapData.FILL));
		new Label(this, SWT.NONE);
		new Label(this, SWT.NONE);

		check_line = new Button(this, SWT.CHECK);
		check_line.setText("line-through");

		textLabel = new Label(this, SWT.NONE);
		textLabel.setLayoutData(new TableWrapData(TableWrapData.RIGHT));
		textLabel.setText("text-transform:");

		combo_text_transform = new Combo(this, SWT.NONE);
		combo_text_transform.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
		combo_text_transform.setLayoutData(new TableWrapData(TableWrapData.FILL));
		new Label(this, SWT.NONE);
		new Label(this, SWT.NONE);

		check_blink = new Button(this, SWT.CHECK);
		check_blink.setText("blink");

		colorLabel = new Label(this, SWT.NONE);
		colorLabel.setLayoutData(new TableWrapData(TableWrapData.RIGHT));
		colorLabel.setText("color:");

		text_color = new Combo(this, SWT.NONE);
		text_color.setLayoutData(new TableWrapData(TableWrapData.FILL));

		composite_color = new Composite(this, SWT.BORDER);
		composite_color.setBackground(StyleCommonPropertyValue.DEFAULT_COLOR);
		final TableWrapData twd_composite_color = new TableWrapData(TableWrapData.LEFT, TableWrapData.TOP);
		twd_composite_color.heightHint = 20;
		twd_composite_color.maxWidth = 20;
		composite_color.setLayoutData(twd_composite_color);

		new Label(this, SWT.NONE);

		check_none = new Button(this, SWT.CHECK);
		check_none.setText("none");
	}

	public void initSelfDefaultValue() {
		boolean hashDefaultValue = false;
		if (styleValue == null || "".equals(styleValue)) {
			return;
		}
		if (StyleCommonPropertyValue.setComboValueIndex("font-family", combo_font_family, styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndexWithUnit("font-size", combo_font_size, slider_font_size, combo_font_sizeUnit, styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndex("font-weight", combo_font_weight, styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndex("font-style", combo_font_style, styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndex("font-variant", combo_font_variant, styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndex("text-transform", combo_text_transform, styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setColorValue("color", text_color, composite_color, styleValue)) {
			hashDefaultValue = true;
		}
		String propertyName = "text-decoration";
		int textd_Index = styleValue.indexOf(propertyName);
		if (textd_Index != -1) {
			int lastSplitIndex = styleValue.lastIndexOf(";");
			String regex = "";
			if (lastSplitIndex > textd_Index) {
				regex = propertyName + StyleCommonPropertyValue.REGEX_PROPERTY_MIDDLE;
			} else {
				regex = propertyName + StyleCommonPropertyValue.REGEX_PROPERTY_END;
			}
			Pattern pattern = Pattern.compile(regex);
			Matcher matcher = pattern.matcher(styleValue);
			if (matcher.find()) {
				String bgPositionValue = matcher.group(1).trim();
				if (bgPositionValue.indexOf("none") != -1) {
					check_none.setSelection(true);
					none = "none";
					hashDefaultValue = true;
				} else {
					String[] bgPositionArray = bgPositionValue.split(" ");
					for (int i = 0; i < bgPositionArray.length; i++) {
						if (bgPositionArray[i].equals("underline")) {
							check_underline.setSelection(true);
							underline = "underline";
							hashDefaultValue = true;
						} else if (bgPositionArray[i].equals("overline")) {
							check_overline.setSelection(true);
							overline = "overline";
							hashDefaultValue = true;
						} else if (bgPositionArray[i].equals("line-through")) {
							check_line.setSelection(true);
							line_through = "line-through";
							hashDefaultValue = true;
						} else if (bgPositionArray[i].equals("blink")) {
							check_blink.setSelection(true);
							blink = "blink";
							hashDefaultValue = true;
						}
					}
				}
			}
		}
		
		if (!hashDefaultValue) {
			return;
		}
		styleDialog.updateKindListShow(pageName);
		//在已经设置好的UI上取值绘制图案
		if (combo_font_family.getSelectionIndex() != -1) {
			styleDialog.rePaintText("font-family", combo_font_family.getItem(combo_font_family.getSelectionIndex()), false);
		}
		if (!combo_font_size.getText().equals("")) {
			if (StyleCommonPropertyValue.matchesNumber(combo_font_size.getText())) {
				styleDialog.rePaintText("font-size",
						combo_font_size.getText() + combo_font_sizeUnit.getItem(combo_font_sizeUnit.getSelectionIndex()), false);
			} else {
				styleDialog.rePaintText("font-size", combo_font_size.getText(), false);
			}
		}
		if (combo_font_weight.getSelectionIndex() != -1) {
			styleDialog.rePaintText("font-weight", combo_font_weight.getText(), false);
		}
		if (combo_font_style.getSelectionIndex() != -1) {
			styleDialog.rePaintText("font-style", combo_font_style.getText(), false);
		}
		if (combo_font_variant.getSelectionIndex() != -1) {
			styleDialog.rePaintText("font-variant", combo_font_variant.getText(), false);
		}
		if (combo_text_transform.getSelectionIndex() != -1) {
			styleDialog.rePaintText("text-transform", combo_text_transform.getText(), false);
		}
		if (!text_color.getText().equals("")) {
			styleDialog.rePaintText("color", text_color.getText(), false);
		}
		setTextDecoration(false);
	}

	private MouseAdapter mouseAdapter = new MouseAdapter() {
		public void mouseDown(MouseEvent e) {
			if (combo_font_size.isFocusControl()) {
				fontSizeNumberInputConfim();
			}
		}
	};
	
	private void fontSizeNumberInputConfim(){
		String comboText = combo_font_size.getText();
		if (StyleCommonPropertyValue.matchesNumber(comboText)) {
			int num = Integer.valueOf(comboText);
			if (!combo_font_sizeUnit.getEnabled()) {
				combo_font_sizeUnit.setEnabled(true);
			}
			slider_font_size.setSelection(StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - num);
			String fontSizeValue = comboText + combo_font_sizeUnit.getItem(combo_font_sizeUnit.getSelectionIndex());
			styleDialog.setPropertyValue(pageName, "font-size", fontSizeValue);
			styleDialog.rePaintText("font-size", fontSizeValue, true);
		}
	}

	private void mouseEvent(Control control) {
		control.addMouseListener(mouseAdapter);
	}

	public void registerEvent() {
		mouseEvent(this);
		mouseEvent(fontLabel);
		mouseEvent(fontsizeLabel);
		mouseEvent(fontweightLabel);
		mouseEvent(fontstyleLabel);
		mouseEvent(fontLabel_1);
		mouseEvent(textLabel);
		mouseEvent(colorLabel);
		mouseEvent(textdesLabel);

		combo_font_family.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_font_family.getSelectionIndex();
				if (index != -1) {
					String fontName = combo_font_family.getItem(combo_font_family.getSelectionIndex());
					styleDialog.setPropertyValue(pageName, "font-family", fontName);
					styleDialog.rePaintText("font-family", fontName, true);
				}
			}
		});

		combo_font_size.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_font_size.getSelectionIndex();
				if (index == combo_font_size.getItems().length - 1) {
					combo_font_sizeUnit.setEnabled(true);
				} else if (index != -1) {
					combo_font_sizeUnit.setEnabled(false);
					StyleCommonPropertyValue.initSlide(slider_font_size);
					String fontSize = combo_font_size.getItem(combo_font_size.getSelectionIndex());
					styleDialog.setPropertyValue(pageName, "font-size", fontSize);
					styleDialog.rePaintText("font-size", fontSize, true);
				}
			}
		});
		combo_font_size.addFocusListener(new FocusListener() {
			public void focusGained(FocusEvent e) {
			}
			public void focusLost(FocusEvent e) {
				fontSizeNumberInputConfim();
			}
		});
		combo_font_size.addKeyListener(new KeyAdapter() {
			public void keyPressed(KeyEvent e) {
				if (e.keyCode == SWT.CR | e.keyCode == SWT.KEYPAD_CR) {
					fontSizeNumberInputConfim();
				}
			}
		});

		slider_font_size.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_font_sizeUnit.getEnabled()) {
					combo_font_sizeUnit.setEnabled(true);
				}
				int intSelect = new Integer(slider_font_size.getSelection());
				combo_font_size.setText((StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - intSelect) + "");
				String fontSizeValue = combo_font_size.getText() + combo_font_sizeUnit.getItem(combo_font_sizeUnit.getSelectionIndex());
				styleDialog.setPropertyValue(pageName, "font-size", fontSizeValue);
				styleDialog.rePaintText("font-size", fontSizeValue, true);
			}
		});
		combo_font_sizeUnit.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_font_size.getText().equals("(值)")) {
					String fontSizeValue = combo_font_size.getText() + combo_font_sizeUnit.getItem(combo_font_sizeUnit.getSelectionIndex());
					styleDialog.setPropertyValue(pageName, "font-size", fontSizeValue);
					styleDialog.rePaintText("font-size", fontSizeValue, true);
				}
			}
		});

		composite_color.addMouseListener(new MouseListener() {
			public void mouseDoubleClick(MouseEvent e) {
			}

			public void mouseDown(MouseEvent e) {
			}

			public void mouseUp(MouseEvent e) {
				ColorDialog colorDialog = new ColorDialog(styleDialog.getShell());
				RGB rgb = colorDialog.open();

				if (rgb != null) {
					composite_color.setBackground(new Color(null, rgb));

					String redStr = Integer.toHexString(rgb.red);
					if (redStr.length() == 1) {
						redStr = ("0" + redStr);
					}
					String greenStr = Integer.toHexString(rgb.green);
					if (greenStr.length() == 1) {
						greenStr = ("0" + greenStr);
					}
					String blueStr = Integer.toHexString(rgb.blue);
					if (blueStr.length() == 1) {
						blueStr = ("0" + blueStr);
					}
					text_color.setText("#" + redStr.toUpperCase() + greenStr.toUpperCase() + blueStr.toUpperCase());
					styleDialog.setPropertyValue(pageName, "color", text_color.getText());
					styleDialog.rePaintText("color", text_color.getText(), true);
				}
			}
		});

		combo_font_weight.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_font_weight.getSelectionIndex();
				if (index != -1) {
					String fontWeight = combo_font_weight.getItem(index);
					styleDialog.setPropertyValue(pageName, "font-weight", fontWeight);
					styleDialog.rePaintText("font-weight", fontWeight, true);
				}
			}
		});

		combo_font_style.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_font_style.getSelectionIndex();
				if (index != -1) {
					String fontStyle = combo_font_style.getItem(index);
					styleDialog.setPropertyValue(pageName, "font-style", fontStyle);
					styleDialog.rePaintText("font-style", fontStyle, true);
				}
			}
		});

		combo_font_variant.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_font_variant.getSelectionIndex();
				if (index != -1) {
					String fontVariant = combo_font_variant.getItem(index);
					styleDialog.setPropertyValue(pageName, "font-variant", fontVariant);
					styleDialog.rePaintText("font-variant", fontVariant, true);
				}
			}
		});

		combo_text_transform.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_text_transform.getSelectionIndex();
				if (index != -1) {
					String textTransform = combo_text_transform.getItem(index);
					styleDialog.setPropertyValue(pageName, "text-transform", textTransform);
					styleDialog.rePaintText("text-transform", textTransform, true);
				}
			}
		});

		check_underline.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (check_underline.getSelection()) {
					underline = "underline";
					if (check_none.getSelection()) {
						check_none.setSelection(false);
						none = "";
					}
					setTextDecoration(true);
				} else {
					underline = "";
					setTextDecoration(true);
				}
			}
		});

		check_overline.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (check_overline.getSelection()) {
					overline = "overline";
					if (check_none.getSelection()) {
						check_none.setSelection(false);
						none = "";
					}
					setTextDecoration(true);
				} else {
					overline = "";
					setTextDecoration(true);
				}
			}
		});

		check_line.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (check_line.getSelection()) {
					line_through = "line-through";
					if (check_none.getSelection()) {
						check_none.setSelection(false);
						none = "";
					}
					setTextDecoration(true);
				} else {
					line_through = "";
					setTextDecoration(true);
				}
			}
		});

		check_blink.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (check_blink.getSelection()) {
					blink = "blink";
					if (check_none.getSelection()) {
						check_none.setSelection(false);
						none = "";
					}
					setTextDecoration(true);
				} else {
					blink = "";
					setTextDecoration(true);
				}
			}
		});

		check_none.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (check_none.getSelection()) {
					if (check_underline.getSelection()) {
						check_underline.setSelection(false);
						underline = "";
					}
					if (check_overline.getSelection()) {
						check_overline.setSelection(false);
						overline = "";
					}
					if (check_line.getSelection()) {
						check_line.setSelection(false);
						line_through = "";
					}
					if (check_blink.getSelection()) {
						check_blink.setSelection(false);
						blink = "";
					}
					none = "none";
					setTextDecoration(true);
				}
			}
		});

		text_color.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = text_color.getSelectionIndex();
				if (index != -1) {
					composite_color.setBackground(StyleCommonPropertyValue.DEFAULT_COLOR);
					styleDialog.setPropertyValue(pageName, "color", text_color.getText());
					styleDialog.rePaintText("color", text_color.getText(), true);
				}
			}
		});
	}

	/**
	 * 设置text-decoration系列属性
	 */
	private void setTextDecoration(boolean painFlag) {
		StringBuffer sf = new StringBuffer();
		sf.append(underline);
		if (!"".equals(underline)) {
			sf.append(" ");
		}
		sf.append(overline);
		if (!"".equals(overline)) {
			sf.append(" ");
		}
		sf.append(line_through);
		if (!"".equals(line_through)) {
			sf.append(" ");
		}
		sf.append(blink);
		if (!"".equals(blink)) {
			sf.append(" ");
		}
		sf.append(none);
		styleDialog.setPropertyValue(pageName, "text-decoration", sf.toString());
		styleDialog.rePaintText("text-decoration", sf.toString(), painFlag);
	}

}
