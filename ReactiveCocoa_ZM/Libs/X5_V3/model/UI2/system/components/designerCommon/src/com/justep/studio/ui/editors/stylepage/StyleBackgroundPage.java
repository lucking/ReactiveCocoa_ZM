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
 * 背景
 * @author linhongbao
 *
 */
public class StyleBackgroundPage extends Composite implements IPropertyDialogPage, IStylePage {

	private Combo combo_bg_positionYUnit;
	private Combo combo_bg_positionY;
	private Combo combo_bg_positionXUnit;
	private Combo combo_bg_positionX;
	private Combo combo_bg_attachment;
	private Combo combo_bg_repeat;
	private Combo combo_bg_image;
	private Slider slider_bg_positionX;
	private Slider slider_bg_positionY;

	private StyleDialog styleDialog;
	private Composite composite_bg_color;
	private Combo text_bg_color;
	private Button button_bg_image;
	private Composite parent;

	private String backgroundPositionX = "";
	private String backgroundPositionY = "";
	private String styleValue;
	private String pageName = "背景";
	private int deep;
	private Label backLabel;
	private Label backgroundimageLabel;
	private Label backgroundreLabel;
	private Label backgroundLabel;
	private Label xLabel;
	private Label yBackgroundpositionLabel;

	public StyleBackgroundPage(Composite parent, StyleDialog styleDialog, String styleValue, int style) {
		super(parent, style);
		this.styleDialog = styleDialog;
		this.styleValue = styleValue;
		this.parent = parent;
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

		combo_bg_repeat.setItems(new String[] { "", "repeat", "repeat-x", "repeat-y", "no-repeat", "inherit" });

		combo_bg_attachment.setItems(new String[] { "", "scroll", "fixed", "inherit" });

		combo_bg_positionX.setItems(new String[] { "", "left", "center", "right", "inherit", "(值)" });

		combo_bg_positionY.setItems(new String[] { "", "top", "center", "bottom", "inherit", "(值)" });

		combo_bg_positionXUnit.setItems(StyleCommonPropertyValue.NUMBER_UNIT_VALUE);
		combo_bg_positionXUnit.select(0);

		combo_bg_positionYUnit.setItems(StyleCommonPropertyValue.NUMBER_UNIT_VALUE);
		combo_bg_positionYUnit.select(0);

		combo_bg_image.setItems(StyleCommonPropertyValue.FILE_DEFINED_VALUE);

		combo_bg_positionXUnit.setEnabled(false);
		combo_bg_positionYUnit.setEnabled(false);

		StyleCommonPropertyValue.initSlide(slider_bg_positionX);
		StyleCommonPropertyValue.initSlide(slider_bg_positionY);
		text_bg_color.setItems(new String[] { "" });
	}

	public void initLayout() {

		final TableWrapLayout tableLayout = new TableWrapLayout();
		tableLayout.numColumns = 6;
		setLayout(tableLayout);

		backLabel = new Label(this, SWT.NONE);
		backLabel.setLayoutData(new TableWrapData(TableWrapData.RIGHT));
		backLabel.setText("background-color:");

		text_bg_color = new Combo(this, SWT.NONE);
		text_bg_color.setLayoutData(new TableWrapData(TableWrapData.FILL));

		composite_bg_color = new Composite(this, SWT.BORDER);
		composite_bg_color.setBackground(StyleCommonPropertyValue.DEFAULT_COLOR);
		final TableWrapData twd_composite_color = new TableWrapData(TableWrapData.LEFT, TableWrapData.TOP);
		twd_composite_color.heightHint = 20;
		twd_composite_color.maxWidth = 20;
		composite_bg_color.setLayoutData(twd_composite_color);

		new Label(this, SWT.NONE);
		new Label(this, SWT.NONE);
		new Label(this, SWT.NONE);

		backgroundimageLabel = new Label(this, SWT.NONE);
		backgroundimageLabel.setLayoutData(new TableWrapData(TableWrapData.RIGHT));
		backgroundimageLabel.setText("background-image:");

		combo_bg_image = new Combo(this, SWT.NONE);
		combo_bg_image.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
		TableWrapData twd_combo_bg_image = new TableWrapData(TableWrapData.FILL);
		twd_combo_bg_image.maxWidth = 227;
		twd_combo_bg_image.colspan = 3;
		combo_bg_image.setLayoutData(twd_combo_bg_image);

		button_bg_image = new Button(this, SWT.NONE);
		button_bg_image.setText("浏览...");

		new Label(this, SWT.NONE);

		backgroundreLabel = new Label(this, SWT.NONE);
		backgroundreLabel.setText("background-repeat:");
		backgroundreLabel.setLayoutData(new TableWrapData(TableWrapData.RIGHT));

		combo_bg_repeat = new Combo(this, SWT.NONE);
		combo_bg_repeat.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
		combo_bg_repeat.setLayoutData(new TableWrapData(TableWrapData.FILL));

		new Label(this, SWT.NONE);
		new Label(this, SWT.NONE);
		new Label(this, SWT.NONE);
		new Label(this, SWT.NONE);

		backgroundLabel = new Label(this, SWT.NONE);
		backgroundLabel.setLayoutData(new TableWrapData(TableWrapData.RIGHT));
		backgroundLabel.setText("background-attachment:");

		combo_bg_attachment = new Combo(this, SWT.NONE);
		combo_bg_attachment.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
		combo_bg_attachment.setLayoutData(new TableWrapData(TableWrapData.FILL));

		new Label(this, SWT.NONE);
		new Label(this, SWT.NONE);
		new Label(this, SWT.NONE);
		new Label(this, SWT.NONE);

		xLabel = new Label(this, SWT.NONE);
		xLabel.setLayoutData(new TableWrapData(TableWrapData.RIGHT));
		xLabel.setText("(x) background-position:");

		combo_bg_positionX = new Combo(this, SWT.NONE);
		combo_bg_positionX.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
		combo_bg_positionX.setLayoutData(new TableWrapData(TableWrapData.FILL));

		slider_bg_positionX = new Slider(this, SWT.VERTICAL);
		final TableWrapData twd_slider_bg_positionX = new TableWrapData(TableWrapData.LEFT, TableWrapData.TOP);
		twd_slider_bg_positionX.heightHint = 20;
		slider_bg_positionX.setLayoutData(twd_slider_bg_positionX);

		combo_bg_positionXUnit = new Combo(this, SWT.NONE);
		combo_bg_positionXUnit.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		new Label(this, SWT.NONE);
		new Label(this, SWT.NONE);

		yBackgroundpositionLabel = new Label(this, SWT.NONE);
		yBackgroundpositionLabel.setLayoutData(new TableWrapData(TableWrapData.RIGHT));
		yBackgroundpositionLabel.setText("(y) background-position:");

		combo_bg_positionY = new Combo(this, SWT.NONE);
		combo_bg_positionY.setLayoutData(new TableWrapData(TableWrapData.FILL));
		combo_bg_positionY.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);

		slider_bg_positionY = new Slider(this, SWT.VERTICAL);
		final TableWrapData twd_slider_bg_positionY = new TableWrapData(TableWrapData.LEFT, TableWrapData.TOP);
		twd_slider_bg_positionY.heightHint = 20;
		slider_bg_positionY.setLayoutData(twd_slider_bg_positionY);

		combo_bg_positionYUnit = new Combo(this, SWT.NONE);
		combo_bg_positionYUnit.setVisibleItemCount(StyleCommonPropertyValue.COMBO_VISIBLEITEM_COUNT);
	}

	public void initSelfDefaultValue() {
		boolean hashDefaultValue = false;
		if (styleValue == null || "".equals(styleValue)) {
			return;
		}
		if (StyleCommonPropertyValue.setColorValue("background-color", text_bg_color, composite_bg_color, styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueTypeFile("background-image", combo_bg_image, styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndex("background-repeat", combo_bg_repeat, styleValue)) {
			hashDefaultValue = true;
		}
		if (StyleCommonPropertyValue.setComboValueIndex("background-attachment", combo_bg_attachment, styleValue)) {
			hashDefaultValue = true;
		}

		String propertyName = "background-position";
		int bg_PositionIndex = styleValue.indexOf(propertyName);
		if (bg_PositionIndex != -1) {
			int lastSplitIndex = styleValue.lastIndexOf(";");
			String regex = "";
			if (lastSplitIndex > bg_PositionIndex) {
				regex = propertyName + StyleCommonPropertyValue.REGEX_PROPERTY_MIDDLE;
			} else {
				regex = propertyName + StyleCommonPropertyValue.REGEX_PROPERTY_END;
			}
			Pattern pattern = Pattern.compile(regex);
			Matcher matcher = pattern.matcher(styleValue);
			if (matcher.find()) {
				String bgPositionValue = matcher.group(1).trim();
				String[] bgPositionArray = bgPositionValue.split(" ");
				if (bgPositionArray.length > 0) {
					int i = 0;
					for (i = 0; i < StyleCommonPropertyValue.NUMBER_UNIT_VALUE.length; i++) {
						if (bgPositionArray[0].endsWith(StyleCommonPropertyValue.NUMBER_UNIT_VALUE[i])) {
							int num = Integer.parseInt(bgPositionArray[0].replace(StyleCommonPropertyValue.NUMBER_UNIT_VALUE[i], ""));
							combo_bg_positionX.setText(num + "");
							slider_bg_positionX.setSelection(StyleCommonPropertyValue.SLIDER_DEFAULT_SELECTION + num);
							combo_bg_positionXUnit.select(i);
							combo_bg_positionXUnit.setEnabled(true);
							hashDefaultValue = true;
						}
					}
					if (i >= StyleCommonPropertyValue.NUMBER_UNIT_VALUE.length) {
						for (int j = 0; j < combo_bg_positionX.getItems().length; j++) {
							if (combo_bg_positionX.getItem(j).equals(bgPositionArray[0])) {
								combo_bg_positionX.select(j);
								hashDefaultValue = true;
								break;
							}
						}
					}
				}
				if (bgPositionArray.length > 1) {
					int i = 0;
					for (i = 0; i < StyleCommonPropertyValue.NUMBER_UNIT_VALUE.length; i++) {
						if (bgPositionArray[1].endsWith(StyleCommonPropertyValue.NUMBER_UNIT_VALUE[i])) {
							int num = Integer.parseInt(bgPositionArray[1].replace(StyleCommonPropertyValue.NUMBER_UNIT_VALUE[i], ""));
							combo_bg_positionY.setText(num + "");
							slider_bg_positionY.setSelection(StyleCommonPropertyValue.SLIDER_DEFAULT_SELECTION + num);
							combo_bg_positionYUnit.select(i);
							combo_bg_positionYUnit.setEnabled(true);
							hashDefaultValue = true;
						}
					}
					if (i >= StyleCommonPropertyValue.NUMBER_UNIT_VALUE.length) {
						for (int j = 0; j < combo_bg_positionY.getItems().length; j++) {
							if (combo_bg_positionY.getItem(j).equals(bgPositionArray[1])) {
								combo_bg_positionY.select(j);
								hashDefaultValue = true;
								break;
							}
						}
					}
				}
			}
		}
		if (!hashDefaultValue) {
			return;
		}
		styleDialog.updateKindListShow(pageName);
		if (!text_bg_color.getText().equals("")) {
			styleDialog.rePaintText("background-color", text_bg_color.getText(), false);
		}
	}

	private MouseAdapter mouseAdapter = new MouseAdapter() {
		public void mouseDown(MouseEvent e) {
			if (combo_bg_positionX.isFocusControl()) {
				positionXNumberInputConfim();
			} else if (combo_bg_positionY.isFocusControl()) {
				positionYNumberInputConfim();
			}
		}
	};

	private void positionYNumberInputConfim() {
		String comboText = combo_bg_positionY.getText();
		if (StyleCommonPropertyValue.matchesNumber(comboText)) {
			int num = Integer.valueOf(comboText);
			if (!combo_bg_positionYUnit.getEnabled()) {
				combo_bg_positionYUnit.setEnabled(true);
			}
			slider_bg_positionY.setSelection(StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - num);
			backgroundPositionY = comboText + combo_bg_positionYUnit.getItem(combo_bg_positionYUnit.getSelectionIndex());
			setStyleDialogBgPoition();
		}
	}

	private void positionXNumberInputConfim() {
		String comboText = combo_bg_positionX.getText();
		if (StyleCommonPropertyValue.matchesNumber(comboText)) {
			int num = Integer.valueOf(comboText);
			if (!combo_bg_positionXUnit.getEnabled()) {
				combo_bg_positionXUnit.setEnabled(true);
			}
			slider_bg_positionX.setSelection(StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - num);
			backgroundPositionX = comboText + combo_bg_positionXUnit.getItem(combo_bg_positionXUnit.getSelectionIndex());
			setStyleDialogBgPoition();
		}
	}

	private void mouseEvent(Control control) {
		control.addMouseListener(mouseAdapter);
	}

	public void registerEvent() {
		mouseEvent(this);
		mouseEvent(backLabel);
		mouseEvent(backgroundimageLabel);
		mouseEvent(backgroundreLabel);
		mouseEvent(backgroundLabel);
		mouseEvent(xLabel);
		mouseEvent(yBackgroundpositionLabel);

		composite_bg_color.addMouseListener(new MouseListener() {
			public void mouseDoubleClick(MouseEvent e) {
			}

			public void mouseDown(MouseEvent e) {
			}

			public void mouseUp(MouseEvent e) {
				ColorDialog colorDialog = new ColorDialog(styleDialog.getShell());
				RGB rgb = colorDialog.open();
				if (rgb != null) {
					composite_bg_color.setBackground(new Color(null, rgb));
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
					text_bg_color.setText("#" + redStr.toUpperCase() + greenStr.toUpperCase() + blueStr.toUpperCase());
					styleDialog.setPropertyValue(pageName, "background-color", text_bg_color.getText());
					styleDialog.rePaintText("background-color", text_bg_color.getText(), true);
				}
			}
		});

		combo_bg_repeat.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_bg_repeat.getSelectionIndex();
				if (index != -1) {
					styleDialog.setPropertyValue(pageName, "background-repeat", combo_bg_repeat.getItem(index));
				}
			}
		});

		combo_bg_attachment.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_bg_attachment.getSelectionIndex();
				if (index != -1) {
					styleDialog.setPropertyValue(pageName, "background-attachment", combo_bg_attachment.getItem(index));
				}
			}
		});

		combo_bg_positionX.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_bg_positionX.getSelectionIndex();
				if (index == combo_bg_positionX.getItems().length - 1) {
					combo_bg_positionXUnit.setEnabled(true);
				} else if (index != -1) {
					combo_bg_positionXUnit.setEnabled(false);
					StyleCommonPropertyValue.initSlide(slider_bg_positionX);
					backgroundPositionX = combo_bg_positionX.getItem(combo_bg_positionX.getSelectionIndex());
					setStyleDialogBgPoition();
				}
			}
		});
		combo_bg_positionX.addFocusListener(new FocusListener() {
			public void focusGained(FocusEvent e) {
			}

			public void focusLost(FocusEvent e) {
				positionXNumberInputConfim();
			}
		});
		combo_bg_positionX.addKeyListener(new KeyAdapter() {
			public void keyPressed(KeyEvent e) {
				if (e.keyCode == SWT.CR | e.keyCode == SWT.KEYPAD_CR) {
					positionXNumberInputConfim();
				}
			}
		});

		slider_bg_positionX.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_bg_positionXUnit.getEnabled()) {
					combo_bg_positionXUnit.setEnabled(true);
				}
				int intSelect = new Integer(slider_bg_positionX.getSelection());
				combo_bg_positionX.setText((StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - intSelect) + "");
				backgroundPositionX = combo_bg_positionX.getText() + combo_bg_positionXUnit.getItem(combo_bg_positionXUnit.getSelectionIndex());
				setStyleDialogBgPoition();
			}
		});
		combo_bg_positionXUnit.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_bg_positionX.getText().equals("(值)")) {
					backgroundPositionX = combo_bg_positionX.getText() + combo_bg_positionXUnit.getItem(combo_bg_positionXUnit.getSelectionIndex());
					setStyleDialogBgPoition();
				}
			}
		});

		combo_bg_positionY.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_bg_positionY.getSelectionIndex();
				if (index == combo_bg_positionY.getItems().length - 1) {
					combo_bg_positionYUnit.setEnabled(true);
				} else if (index != -1) {
					combo_bg_positionYUnit.setEnabled(false);
					StyleCommonPropertyValue.initSlide(slider_bg_positionY);
					backgroundPositionY = combo_bg_positionY.getItem(combo_bg_positionY.getSelectionIndex());
					setStyleDialogBgPoition();
				}
			}
		});

		combo_bg_positionY.addFocusListener(new FocusListener() {
			public void focusGained(FocusEvent e) {
			}

			public void focusLost(FocusEvent e) {
				positionYNumberInputConfim();
			}
		});
		combo_bg_positionY.addKeyListener(new KeyAdapter() {
			public void keyPressed(KeyEvent e) {
				if (e.keyCode == SWT.CR | e.keyCode == SWT.KEYPAD_CR) {
					positionYNumberInputConfim();
				}
			}
		});
		slider_bg_positionY.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_bg_positionYUnit.getEnabled()) {
					combo_bg_positionYUnit.setEnabled(true);
				}
				int intSelect = new Integer(slider_bg_positionY.getSelection());
				combo_bg_positionY.setText((StyleCommonPropertyValue.SLIDER_SUBTRACTION_VALUE - intSelect) + "");
				backgroundPositionY = combo_bg_positionY.getText() + combo_bg_positionYUnit.getItem(combo_bg_positionYUnit.getSelectionIndex());
				setStyleDialogBgPoition();
			}
		});
		combo_bg_positionYUnit.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				if (!combo_bg_positionY.getText().equals("(值)")) {
					backgroundPositionY = combo_bg_positionY.getText() + combo_bg_positionYUnit.getItem(combo_bg_positionYUnit.getSelectionIndex());
					setStyleDialogBgPoition();
				}
			}
		});

		button_bg_image.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				SelectFileDialog fileTreeDialog = new SelectFileDialog(parent.getShell(), "*.*", deep);
				fileTreeDialog.open();
				String imageUrl = fileTreeDialog.getReturnValue();
				if (imageUrl != null && !"".equals(imageUrl)) {

					styleDialog.setPropertyValue(pageName, "background-image", "url(" + imageUrl + ")");
					combo_bg_image.setText(imageUrl);
					combo_bg_image.select(-1);
				}
			}
		});
		combo_bg_image.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = combo_bg_image.getSelectionIndex();
				if (index != -1) {
					styleDialog.setPropertyValue(pageName, "background-image", combo_bg_image.getItem(index));
				}
			}
		});

		text_bg_color.addSelectionListener(new SelectionListener() {
			public void widgetDefaultSelected(SelectionEvent e) {
			}

			public void widgetSelected(SelectionEvent e) {
				int index = text_bg_color.getSelectionIndex();
				if (index != -1) {
					composite_bg_color.setBackground(StyleCommonPropertyValue.DEFAULT_COLOR);
					styleDialog.setPropertyValue(pageName, "background-color", text_bg_color.getText());
					styleDialog.rePaintText("background-color", text_bg_color.getText(), true);
				}
			}
		});
	}

	protected void setStyleDialogBgPoition() {
		String splitSpace = ("".equals(backgroundPositionX) || "".equals(backgroundPositionY)) ? "" : " ";
		styleDialog.setPropertyValue(pageName, "background-position", backgroundPositionX + splitSpace + backgroundPositionY);
	}

	public void setDeep(int deep) {
		this.deep = deep;
	}

}
