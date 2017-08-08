package com.justep.studio.ui.editors.stylepage;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.eclipse.swt.graphics.Color;
import org.eclipse.swt.graphics.RGB;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Combo;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Slider;

public class StyleCommonPropertyValue {

	/**
	 * 默认颜色
	 */
	public static Color DEFAULT_COLOR = new Color(null, new RGB(232, 232, 215));

	/**
	 * 数值单位值
	 */
	public static String[] NUMBER_UNIT_VALUE = new String[] { "px", "%", "pt", "in", "cm", "mm", "pc", "em", "ex" };
	/**
	 * 文件属性默认值
	 */
	public static String[] FILE_DEFINED_VALUE = new String[] { "", "none", "inherit" };

	/**
	 * Combo下拉列表可见元素个数
	 */
	public static int COMBO_VISIBLEITEM_COUNT = 10;
	/**
	 * slider最小值
	 */
	public static int SLIDER_MINIMUM = 0;
	/**
	 * slider最大值
	 */
	public static int SLIDER_MAXIMUM = 1000;
	/**
	 * slider增加值
	 */
	public static int SLIDER_INCREMENT = 1;
	/**
	 * slider默认值
	 */
	public static int SLIDER_DEFAULT_SELECTION = 495;
	/**
	 * KindPage 类型列表
	 */
	public static String[] STYLE_KIND_DEFAULT_VALUE = new String[] { "字体", "块", "背景", "边框", "方框", "定位", "布局", "列表", "表格" };
	/**
	 * KindPage 类型列表
	 */
	public static String KIND_UPDATED_AFTERFIX = "(+)";
	public static String[] BOEDER_STYLE = new String[] { "", "dashed", "dotted", "double", "groove", "hidden", "inset", "none", "outset", "ridge",
			"solid", "inherit" };
	public static String[] BORDER_WIDTH = new String[] { "", "thin", "medium", "thick", "inherit", "(值)" };
	/**
	 *判断数字
	 */
	public static String REGEX_NUMBER = "[-]{0,1}[0-9]+";
	/**
	 * 判断属性
	 */
	public static String REGEX_PROPERTY_MIDDLE = ":(.[^;]+);";
	public static String REGEX_PROPERTY_END = ":(.[^;]+)";
	/**
	 * 保证slider上加下减顺序 被减数
	 * SLIDER_SUBTRACTION_VALUE-SLIDER_DEFAULT_SELECTION 为slider的选择值
	 */
	public static int SLIDER_SUBTRACTION_VALUE = 495;
	public static String REPLACE_DUBITABLE = "****";

	/**
	 * 重新设置数值
	 * @param slider
	 */
	public static void initSlide(Slider slider) {
		slider.setMinimum(SLIDER_MINIMUM);
		slider.setMaximum(SLIDER_MAXIMUM);
		slider.setIncrement(SLIDER_INCREMENT);
		slider.setSelection(SLIDER_DEFAULT_SELECTION);
	}

	/**
	 * 设置普通的combo
	 * @param propertyName
	 * @param combo
	 * @param styleValue
	 * @return
	 */
	public static boolean setComboValueIndex(String propertyName, Combo combo, String styleValue) {
		styleValue = styleValue.trim();
		String propertyNameWithCln = propertyName + ":";
		if (propertyNameWithCln.indexOf("-") == -1) {
			styleValue = styleValue.replace("-" + propertyNameWithCln, StyleCommonPropertyValue.REPLACE_DUBITABLE);
		}
		int propertyNameWithClnIndex = styleValue.indexOf(propertyNameWithCln);
		if (propertyNameWithClnIndex != -1) {
			int lastSplitIndex = styleValue.lastIndexOf(";");
			Pattern pattern = null;
			if (lastSplitIndex > propertyNameWithClnIndex) {
				pattern = Pattern.compile(propertyName + REGEX_PROPERTY_MIDDLE);
			} else {
				pattern = Pattern.compile(propertyName + REGEX_PROPERTY_END);
			}
			Matcher matcher = pattern.matcher(styleValue);
			if (matcher.find()) {
				String propertyValue = matcher.group(1);
				for (int i = 0; i < combo.getItems().length; i++) {
					if (combo.getItem(i).equals(propertyValue)) {
						combo.select(i);
						return true;
					}
				}
			}
		}
		return false;
	}

	/**
	 * 设置带单位的Combo
	 * @param propertyName
	 * @param combo
	 * @param slider
	 * @param comboUnit
	 * @param styleValue
	 * @return
	 */
	public static boolean setComboValueIndexWithUnit(String propertyName, Combo combo, Slider slider, Combo comboUnit, String styleValue) {
		Pattern patternNum = Pattern.compile(REGEX_NUMBER);
		styleValue = styleValue.trim();
		String propertyNameWithCln = propertyName + ":";
		if (propertyNameWithCln.indexOf("-") == -1) {
			styleValue = styleValue.replace("-" + propertyNameWithCln, StyleCommonPropertyValue.REPLACE_DUBITABLE);
		}
		int propertyNameWithClnIndex = styleValue.indexOf(propertyNameWithCln);
		if (propertyNameWithClnIndex != -1) {
			int lastSplitindex = styleValue.lastIndexOf(";");
			Pattern pattern = null;
			if (lastSplitindex > propertyNameWithClnIndex) {
				pattern = Pattern.compile(propertyName + REGEX_PROPERTY_MIDDLE);
			} else {
				pattern = Pattern.compile(propertyName + REGEX_PROPERTY_END);
			}
			Matcher matcher = pattern.matcher(styleValue);
			if (matcher.find()) {
				String propertyValue = matcher.group(1).trim();
				int i = 0;
				for (i = 0; i < NUMBER_UNIT_VALUE.length; i++) {
					//如果找到对应的单位
					if (propertyValue.endsWith(NUMBER_UNIT_VALUE[i])) {
						String numStr = propertyValue.replace(NUMBER_UNIT_VALUE[i], "");
						Matcher isNum = patternNum.matcher(numStr);
						if (isNum.matches()) {
							int num = Integer.parseInt(numStr);
							combo.setText(num + "");
							slider.setSelection(SLIDER_SUBTRACTION_VALUE - num);
							comboUnit.select(i);
							comboUnit.setEnabled(true);
							return true;
						}
					}
				}
				if (i >= NUMBER_UNIT_VALUE.length) {
					for (int j = 0; j < combo.getItems().length; j++) {
						if (combo.getItem(j).equals(propertyValue)) {
							combo.select(j);
							return true;
						}
					}
				}
			}
		}
		return false;
	}

	/**
	 * 设置文件UI
	 * @param propertyName
	 * @param combo
	 * @param styleValue
	 * @return
	 */
	public static boolean setComboValueTypeFile(String propertyName, Combo combo, String styleValue) {
		styleValue = styleValue.trim();
		String propertyNameWithCln = propertyName + ":";
		if (propertyNameWithCln.indexOf("-") == -1) {
			styleValue = styleValue.replace("-" + propertyNameWithCln, StyleCommonPropertyValue.REPLACE_DUBITABLE);
		}
		int propertyNameWithClnIndex = styleValue.indexOf(propertyNameWithCln);
		if (propertyNameWithClnIndex != -1) {
			int lastSplitindex = styleValue.lastIndexOf(";");
			Pattern pattern = null;
			if (lastSplitindex > propertyNameWithClnIndex) {
				pattern = Pattern.compile(propertyName + REGEX_PROPERTY_MIDDLE);
			} else {
				pattern = Pattern.compile(propertyName + REGEX_PROPERTY_END);
			}
			Matcher matcher = pattern.matcher(styleValue);
			if (matcher.find()) {
				String propertyValue = matcher.group(1);
				if (propertyValue.startsWith("url")) {
					combo.setText(propertyValue.substring(4, propertyValue.length() - 1));
					return true;
				} else {
					for (int i = 0; i < FILE_DEFINED_VALUE.length; i++) {
						if (propertyValue.equals(FILE_DEFINED_VALUE[i])) {
							combo.select(i);
							return true;
						}
					}
				}
			}
		}
		return false;
	}

	/**
	 * 设置颜色UI
	 * @param propertyName
	 * @param text
	 * @param composite
	 * @param styleValue
	 * @return
	 */
	public static boolean setColorValue(String propertyName, Combo combo, Composite composite, String styleValue) {
		styleValue = styleValue.trim();
		String propertyNameWithCln = propertyName + ":";
		if (propertyNameWithCln.indexOf("-") == -1) {
			styleValue = styleValue.replace("-" + propertyNameWithCln, StyleCommonPropertyValue.REPLACE_DUBITABLE);
		}
		int propertyNameWithClnIndex = styleValue.indexOf(propertyNameWithCln);
		if (propertyNameWithClnIndex != -1) {
			int lastSplitindex = styleValue.lastIndexOf(";");
			Pattern pattern = null;
			if (lastSplitindex > propertyNameWithClnIndex) {
				pattern = Pattern.compile(propertyName + REGEX_PROPERTY_MIDDLE);
			} else {
				pattern = Pattern.compile(propertyName + REGEX_PROPERTY_END);
			}
			Matcher matcher = pattern.matcher(styleValue);
			if (matcher.find()) {
				String colorValue = matcher.group(1).trim();
				if (colorValue.length() < 7) {
					return false;
				}
				combo.setText(colorValue);
				composite.setBackground(parseStringToColor(colorValue));
				return true;
			}
		}
		return false;
	}

	/**
	 * 设置CheckButton选择
	 * @param propertyName
	 * @param check
	 * @param styleValue
	 * @return
	 */
	public static boolean setCheckButtonValue(String propertyName, Button check, String styleValue) {
		styleValue = styleValue.trim();
		String propertyNameWithCln = propertyName + ":";
		if (propertyNameWithCln.indexOf("-") == -1) {
			styleValue = styleValue.replace("-" + propertyNameWithCln, StyleCommonPropertyValue.REPLACE_DUBITABLE);
		}
		int propertyNameWithClnIndex = styleValue.indexOf(propertyNameWithCln);
		if (propertyNameWithClnIndex != -1) {
			int lastSplitindex = styleValue.lastIndexOf(";");
			Pattern pattern = null;
			if (lastSplitindex > propertyNameWithClnIndex) {
				pattern = Pattern.compile(propertyName + REGEX_PROPERTY_MIDDLE);
			} else {
				pattern = Pattern.compile(propertyName + REGEX_PROPERTY_END);
			}
			Matcher matcher = pattern.matcher(styleValue);
			if (matcher.find()) {
				String colorValue = matcher.group(1).trim();
				if (colorValue.equalsIgnoreCase("true")) {
					check.setSelection(true);
					return true;
				} else {
					return false;
				}
			}
		}
		return false;
	}

	/**
	 * 匹配数字
	 * @param checkText
	 * @return
	 */
	public static boolean matchesNumber(String checkText) {
		Pattern pattern = Pattern.compile(REGEX_NUMBER);
		Matcher matcher = pattern.matcher(checkText);
		return matcher.matches();
	}

	/**
	 * 设置四项联合的Combo
	 * @param propertyName
	 * @param combo_topStyle
	 * @param combo_rightStyle
	 * @param combo_bottomStyle
	 * @param combo_leftStyle
	 * @param styleValue
	 * @return
	 */
	public static boolean setJoinComboValueIndex(String propertyName, Combo combo_topStyle, Combo combo_rightStyle, Combo combo_bottomStyle,
			Combo combo_leftStyle, String styleValue) {
		boolean boo = false;
		styleValue = styleValue.trim();
		String propertyNameWithCln = propertyName + ":";
		if (propertyNameWithCln.indexOf("-") == -1) {
			styleValue = styleValue.replace("-" + propertyNameWithCln, StyleCommonPropertyValue.REPLACE_DUBITABLE);
		}
		int propertyNameWithClnIndex = styleValue.indexOf(propertyNameWithCln);
		if (propertyNameWithClnIndex != -1) {
			int lastSplitIndex = styleValue.lastIndexOf(";");
			Pattern pattern = null;
			if (lastSplitIndex > propertyNameWithClnIndex) {
				pattern = Pattern.compile(propertyName + REGEX_PROPERTY_MIDDLE);
			} else {
				pattern = Pattern.compile(propertyName + REGEX_PROPERTY_END);
			}
			Matcher matcher = pattern.matcher(styleValue);
			if (matcher.find()) {
				String propertyValue = matcher.group(1).trim();
				List<String> list = splitStringToList(propertyValue);
				if (list.size() == 1) {
					for (int i = 0; i < BOEDER_STYLE.length; i++) {
						if (BOEDER_STYLE[i].equals(list.get(0))) {
							combo_topStyle.select(i);
							combo_rightStyle.select(i);
							combo_bottomStyle.select(i);
							combo_leftStyle.select(i);
							boo = true;
							break;
						}
					}
				} else if (list.size() == 2) {
					for (int i = 0; i < BOEDER_STYLE.length; i++) {
						if (BOEDER_STYLE[i].equals(list.get(0))) {
							combo_topStyle.select(i);
							combo_bottomStyle.select(i);
							boo = true;
						}
						if (BOEDER_STYLE[i].equals(list.get(1))) {
							combo_rightStyle.select(i);
							combo_leftStyle.select(i);
							boo = true;
						}
					}
				} else if (list.size() == 3) {
					for (int i = 0; i < BOEDER_STYLE.length; i++) {
						if (BOEDER_STYLE[i].equals(list.get(0))) {
							combo_topStyle.select(i);
							boo = true;
						}
						if (BOEDER_STYLE[i].equals(list.get(1))) {
							combo_rightStyle.select(i);
							combo_leftStyle.select(i);
							boo = true;
						}
						if (BOEDER_STYLE[i].equals(list.get(2))) {
							combo_bottomStyle.select(i);
							boo = true;
						}
					}
				} else if (list.size() > 3) {
					for (int i = 0; i < BOEDER_STYLE.length; i++) {
						if (BOEDER_STYLE[i].equals(list.get(0))) {
							combo_topStyle.select(i);
							boo = true;
						}
						if (BOEDER_STYLE[i].equals(list.get(1))) {
							combo_rightStyle.select(i);
							boo = true;
						}
						if (BOEDER_STYLE[i].equals(list.get(2))) {
							combo_bottomStyle.select(i);
							boo = true;
						}
						if (BOEDER_STYLE[i].equals(list.get(3))) {
							combo_leftStyle.select(i);
							boo = true;
						}
					}
				}
			}
		}
		return boo;
	}

	/**
	 * RGB转化为#FFFFFF样式的字符串
	 * @param rgb
	 * @return
	 */
	public static String parseRGBToStringValue(RGB rgb) {
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
		String resuleColor = "#" + redStr.toUpperCase() + greenStr.toUpperCase() + blueStr.toUpperCase();
		return resuleColor;
	}

	/**
	 * 设置联合Color
	 * @param propertyName
	 * @param text_topColor
	 * @param composite_topColor
	 * @param text_rightColor
	 * @param composite_rightColor
	 * @param text_bottomColor
	 * @param composite_bottomColor
	 * @param text_leftColor
	 * @param composite_leftColor
	 * @param styleValue
	 * @return
	 */
	public static boolean setJoinColorValueIndex(String propertyName, Combo text_topColor, Composite composite_topColor, Combo text_rightColor,
			Composite composite_rightColor, Combo text_bottomColor, Composite composite_bottomColor, Combo text_leftColor,
			Composite composite_leftColor, String styleValue) {

		boolean boo = false;

		styleValue = styleValue.trim();
		String propertyNameWithCln = propertyName + ":";
		if (propertyNameWithCln.indexOf("-") == -1) {
			styleValue = styleValue.replace("-" + propertyNameWithCln, StyleCommonPropertyValue.REPLACE_DUBITABLE);
		}
		int propertyNameWithClnIndex = styleValue.indexOf(propertyNameWithCln);
		if (propertyNameWithClnIndex != -1) {
			int lastSplitindex = styleValue.lastIndexOf(";");
			Pattern pattern = null;
			if (lastSplitindex > propertyNameWithClnIndex) {
				pattern = Pattern.compile(propertyName + REGEX_PROPERTY_MIDDLE);
			} else {
				pattern = Pattern.compile(propertyName + REGEX_PROPERTY_END);
			}
			Matcher matcher = pattern.matcher(styleValue);
			if (matcher.find()) {
				String propertyValue = matcher.group(1).trim();
				List<String> list = splitStringToList(propertyValue);
				if (list.size() == 1) {
					String colorValue = list.get(0);
					if (colorValue.length() == 7) {
						Color color = parseStringToColor(colorValue);
						text_topColor.setText(colorValue);
						composite_topColor.setBackground(color);
						text_rightColor.setText(colorValue);
						composite_rightColor.setBackground(color);
						text_bottomColor.setText(colorValue);
						composite_bottomColor.setBackground(color);
						text_leftColor.setText(colorValue);
						composite_leftColor.setBackground(color);
						boo = true;
					}
				} else if (list.size() == 2) {
					String colorValue = list.get(0);
					if (colorValue.length() == 7) {
						Color color = parseStringToColor(colorValue);
						text_topColor.setText(colorValue);
						composite_topColor.setBackground(color);
						text_bottomColor.setText(colorValue);
						composite_bottomColor.setBackground(color);
						boo = true;
					}
					colorValue = list.get(1);
					if (colorValue.length() == 7) {
						Color color = parseStringToColor(colorValue);
						text_rightColor.setText(colorValue);
						composite_rightColor.setBackground(color);
						text_leftColor.setText(colorValue);
						composite_leftColor.setBackground(color);
						boo = true;
					}
				} else if (list.size() == 3) {
					String colorValue = list.get(0);
					if (colorValue.length() == 7) {
						Color color = parseStringToColor(colorValue);
						text_topColor.setText(colorValue);
						composite_topColor.setBackground(color);

						boo = true;
					}
					colorValue = list.get(1);
					if (colorValue.length() == 7) {
						Color color = parseStringToColor(colorValue);
						text_rightColor.setText(colorValue);
						composite_rightColor.setBackground(color);
						text_leftColor.setText(colorValue);
						composite_leftColor.setBackground(color);
						boo = true;
					}
					colorValue = list.get(2);
					if (colorValue.length() == 7) {
						Color color = parseStringToColor(colorValue);
						text_bottomColor.setText(colorValue);
						composite_bottomColor.setBackground(color);
						boo = true;
					}

				} else if (list.size() > 3) {
					String colorValue = list.get(0);
					if (colorValue.length() == 7) {
						Color color = parseStringToColor(colorValue);
						text_topColor.setText(colorValue);
						composite_topColor.setBackground(color);
						boo = true;
					}
					colorValue = list.get(1);
					if (colorValue.length() == 7) {
						Color color = parseStringToColor(colorValue);
						text_rightColor.setText(colorValue);
						composite_rightColor.setBackground(color);

						boo = true;
					}
					colorValue = list.get(2);
					if (colorValue.length() == 7) {
						Color color = parseStringToColor(colorValue);
						text_bottomColor.setText(colorValue);
						composite_bottomColor.setBackground(color);
						boo = true;
					}
					colorValue = list.get(3);
					if (colorValue.length() == 7) {
						Color color = parseStringToColor(colorValue);
						text_leftColor.setText(colorValue);
						composite_leftColor.setBackground(color);
						boo = true;
					}
				}
			}
		}
		return boo;
	}

	/**
	 * #FFFFFF 颜色值转化为Color
	 * @param colorValue
	 * @return
	 */
	private static Color parseStringToColor(String colorValue) {
		try {
			int red = Integer.valueOf(colorValue.substring(1, 3), 16);
			int green = Integer.valueOf(colorValue.substring(3, 5), 16);
			int blue = Integer.valueOf(colorValue.substring(5, 7), 16);
			return new Color(null, red, green, blue);
		} catch (Exception e) {
			return DEFAULT_COLOR;
		}

	}

	public static boolean setJoinComboValueIndexWithUnit(String propertyName, Combo[] comboValues, Slider[] sliders, Combo[] comboUtils,
			String styleValue) {

		boolean boo = false;
		styleValue = styleValue.trim();
		String propertyNameWithCln = propertyName + ":";
		if (propertyNameWithCln.indexOf("-") == -1) {
			styleValue = styleValue.replace("-" + propertyNameWithCln, StyleCommonPropertyValue.REPLACE_DUBITABLE);
		}
		int propertyNameWithClnIndex = styleValue.indexOf(propertyNameWithCln);
		if (propertyNameWithClnIndex != -1) {
			int lastSplitindex = styleValue.lastIndexOf(";");
			Pattern pattern = null;
			if (lastSplitindex > propertyNameWithClnIndex) {
				pattern = Pattern.compile(propertyName + REGEX_PROPERTY_MIDDLE);
			} else {
				pattern = Pattern.compile(propertyName + REGEX_PROPERTY_END);
			}
			Matcher matcher = pattern.matcher(styleValue);
			if (matcher.find()) {
				String propertyValues = matcher.group(1).trim();
				List<String> list = splitStringToList(propertyValues);

				if (list.size() == 1) {
					String propertyValue = list.get(0);
					int[] valueUnit = parseUnitIndexAndValue(propertyValue);
					if (valueUnit != null) {
						comboValues[0].setText(valueUnit[0] + "");
						comboValues[1].setText(valueUnit[0] + "");
						comboValues[2].setText(valueUnit[0] + "");
						comboValues[3].setText(valueUnit[0] + "");

						sliders[0].setSelection(SLIDER_SUBTRACTION_VALUE - valueUnit[0]);
						sliders[1].setSelection(SLIDER_SUBTRACTION_VALUE - valueUnit[0]);
						sliders[2].setSelection(SLIDER_SUBTRACTION_VALUE - valueUnit[0]);
						sliders[3].setSelection(SLIDER_SUBTRACTION_VALUE - valueUnit[0]);

						comboUtils[0].select(valueUnit[1]);
						comboUtils[1].select(valueUnit[1]);
						comboUtils[2].select(valueUnit[1]);
						comboUtils[3].select(valueUnit[1]);

						comboUtils[0].setEnabled(true);
						comboUtils[1].setEnabled(true);
						comboUtils[2].setEnabled(true);
						comboUtils[3].setEnabled(true);
						boo = true;
					} else {
						int index = getValueInComboIndex(comboValues[0], propertyValue);
						if (index != -1) {
							comboValues[0].select(index);
							comboValues[1].select(index);
							comboValues[2].select(index);
							comboValues[3].select(index);
							boo = true;
						}
					}
				} else if (list.size() == 2) {
					String propertyValue = list.get(0);
					int[] valueUnit = parseUnitIndexAndValue(propertyValue);
					if (valueUnit != null) {
						comboValues[0].setText(valueUnit[0] + "");
						comboValues[2].setText(valueUnit[0] + "");

						sliders[0].setSelection(SLIDER_SUBTRACTION_VALUE - valueUnit[0]);
						sliders[2].setSelection(SLIDER_SUBTRACTION_VALUE - valueUnit[0]);

						comboUtils[0].select(valueUnit[1]);
						comboUtils[2].select(valueUnit[1]);

						comboUtils[0].setEnabled(true);
						comboUtils[2].setEnabled(true);
						boo = true;
					} else {
						int index = getValueInComboIndex(comboValues[0], propertyValue);
						if (index != -1) {
							comboValues[0].select(index);
							comboValues[2].select(index);
							boo = true;
						}
					}

					propertyValue = list.get(1);
					valueUnit = parseUnitIndexAndValue(propertyValue);
					if (valueUnit != null) {
						comboValues[1].setText(valueUnit[0] + "");
						comboValues[3].setText(valueUnit[0] + "");

						sliders[1].setSelection(SLIDER_SUBTRACTION_VALUE - valueUnit[0]);
						sliders[3].setSelection(SLIDER_SUBTRACTION_VALUE - valueUnit[0]);

						comboUtils[1].select(valueUnit[1]);
						comboUtils[3].select(valueUnit[1]);

						comboUtils[1].setEnabled(true);
						comboUtils[3].setEnabled(true);
						boo = true;
					} else {
						int index = getValueInComboIndex(comboValues[0], propertyValue);
						if (index != -1) {
							comboValues[1].select(index);
							comboValues[3].select(index);
							boo = true;
						}
					}
				} else if (list.size() == 3) {
					String propertyValue = list.get(0);
					int[] valueUnit = parseUnitIndexAndValue(propertyValue);
					if (valueUnit != null) {
						comboValues[0].setText(valueUnit[0] + "");

						sliders[0].setSelection(SLIDER_SUBTRACTION_VALUE - valueUnit[0]);

						comboUtils[0].select(valueUnit[1]);

						comboUtils[0].setEnabled(true);
						boo = true;
					} else {
						int index = getValueInComboIndex(comboValues[0], propertyValue);
						if (index != -1) {
							comboValues[0].select(index);
							boo = true;
						}
					}

					propertyValue = list.get(1);
					valueUnit = parseUnitIndexAndValue(propertyValue);
					if (valueUnit != null) {
						comboValues[1].setText(valueUnit[0] + "");
						comboValues[3].setText(valueUnit[0] + "");

						sliders[1].setSelection(SLIDER_SUBTRACTION_VALUE - valueUnit[0]);
						sliders[3].setSelection(SLIDER_SUBTRACTION_VALUE - valueUnit[0]);

						comboUtils[1].select(valueUnit[1]);
						comboUtils[3].select(valueUnit[1]);

						comboUtils[1].setEnabled(true);
						comboUtils[3].setEnabled(true);
						boo = true;
					} else {
						int index = getValueInComboIndex(comboValues[0], propertyValue);
						if (index != -1) {
							comboValues[1].select(index);
							comboValues[3].select(index);
							boo = true;
						}
					}

					propertyValue = list.get(2);
					valueUnit = parseUnitIndexAndValue(propertyValue);
					if (valueUnit != null) {
						comboValues[2].setText(valueUnit[0] + "");

						sliders[2].setSelection(SLIDER_SUBTRACTION_VALUE - valueUnit[0]);

						comboUtils[2].select(valueUnit[1]);

						comboUtils[2].setEnabled(true);
						boo = true;
					} else {
						int index = getValueInComboIndex(comboValues[0], propertyValue);
						if (index != -1) {
							comboValues[2].select(index);
							boo = true;
						}
					}
				} else if (list.size() > 3) {
					String propertyValue = list.get(0);
					int[] valueUnit = parseUnitIndexAndValue(propertyValue);
					if (valueUnit != null) {
						comboValues[0].setText(valueUnit[0] + "");
						sliders[0].setSelection(SLIDER_SUBTRACTION_VALUE - valueUnit[0]);
						comboUtils[0].select(valueUnit[1]);
						comboUtils[0].setEnabled(true);
						boo = true;
					} else {
						int index = getValueInComboIndex(comboValues[0], propertyValue);
						if (index != -1) {
							comboValues[0].select(index);
							boo = true;
						}
					}

					propertyValue = list.get(1);
					valueUnit = parseUnitIndexAndValue(propertyValue);
					if (valueUnit != null) {
						comboValues[1].setText(valueUnit[0] + "");
						sliders[1].setSelection(SLIDER_SUBTRACTION_VALUE - valueUnit[0]);
						comboUtils[1].select(valueUnit[1]);
						comboUtils[1].setEnabled(true);
						boo = true;
					} else {
						int index = getValueInComboIndex(comboValues[0], propertyValue);
						if (index != -1) {
							comboValues[1].select(index);
							boo = true;
						}
					}

					propertyValue = list.get(2);
					valueUnit = parseUnitIndexAndValue(propertyValue);
					if (valueUnit != null) {
						comboValues[2].setText(valueUnit[0] + "");
						sliders[2].setSelection(SLIDER_SUBTRACTION_VALUE - valueUnit[0]);
						comboUtils[2].select(valueUnit[1]);
						comboUtils[2].setEnabled(true);
						boo = true;
					} else {
						int index = getValueInComboIndex(comboValues[0], propertyValue);
						if (index != -1) {
							comboValues[2].select(index);
							boo = true;
						}
					}

					propertyValue = list.get(3);
					valueUnit = parseUnitIndexAndValue(propertyValue);
					if (valueUnit != null) {
						comboValues[3].setText(valueUnit[0] + "");
						sliders[3].setSelection(SLIDER_SUBTRACTION_VALUE - valueUnit[0]);
						comboUtils[3].select(valueUnit[1]);
						comboUtils[3].setEnabled(true);
						boo = true;
					} else {
						int index = getValueInComboIndex(comboValues[0], propertyValue);
						if (index != -1) {
							comboValues[3].select(index);
							boo = true;
						}
					}
				}
			}
		}
		return boo;
	}

	/**
	 * 拆分类似(border-style:solid dotted none;)组合值
	 * @param propertyValue
	 */
	private static List<String> splitStringToList(String propertyValue) {
		propertyValue = propertyValue + " ";
		StringBuffer buffer = new StringBuffer();
		List<String> list = new ArrayList<String>();
		for (int i = 0; i < propertyValue.length(); i++) {
			char c = propertyValue.charAt(i);
			if (c != ' ') {
				buffer.append(c);
			} else {
				list.add(buffer.toString());
				buffer = new StringBuffer();
			}
		}
		Iterator<String> it = list.iterator();
		while (it.hasNext()) {
			if (it.next().equals("")) {
				it.remove();
			}
		}
		return list;
	}

	/**
	 * 解析带单位数值的单位，值
	 * @return
	 */
	private static int[] parseUnitIndexAndValue(String propertyValue) {
		Pattern patternNum = Pattern.compile(REGEX_NUMBER);
		int i;
		for (i = 0; i < NUMBER_UNIT_VALUE.length; i++) {
			//如果找到对应的单位
			if (propertyValue.endsWith(NUMBER_UNIT_VALUE[i])) {
				String numStr = propertyValue.replace(NUMBER_UNIT_VALUE[i], "");
				Matcher isNum = patternNum.matcher(numStr);
				if (isNum.matches()) {
					int num = Integer.parseInt(numStr);
					int[] res = new int[2];
					res[0] = num;
					res[1] = i;
					return res;
				}
			}
		}
		return null;
	}

	/**
	 * 查找值在Combo中的Index
	 * @param combo
	 * @param propertyValue
	 * @return
	 */
	private static int getValueInComboIndex(Combo combo, String propertyValue) {
		for (int j = 0; j < combo.getItems().length; j++) {
			if (combo.getItem(j).equals(propertyValue)) {
				return j;
			}
		}
		return -1;
	}

	public static String getCommonComboPropertyValue(String styleValue, String propertyName) {
		styleValue = styleValue.trim();
		String propertyNameWithCln = propertyName + ":";
		if (propertyNameWithCln.indexOf("-") == -1) {
			styleValue = styleValue.replace("-" + propertyNameWithCln, StyleCommonPropertyValue.REPLACE_DUBITABLE);
		}
		int propertyNameWithClnIndex = styleValue.indexOf(propertyNameWithCln);
		if (propertyNameWithClnIndex != -1) {
			int lastSplitIndex = styleValue.lastIndexOf(";");
			Pattern pattern = null;
			if (lastSplitIndex > propertyNameWithClnIndex) {
				pattern = Pattern.compile(propertyName + REGEX_PROPERTY_MIDDLE);
			} else {
				pattern = Pattern.compile(propertyName + REGEX_PROPERTY_END);
			}
			Matcher matcher = pattern.matcher(styleValue);
			if (matcher.find()) {
				return matcher.group(1);
			}
		}
		return "";
	}

	public static String getComboValueIndexWithUnitPropertyValue(String styleValue, String propertyName) {
		styleValue = styleValue.trim();
		String propertyNameWithCln = propertyName + ":";
		if (propertyNameWithCln.indexOf("-") == -1) {
			styleValue = styleValue.replace("-" + propertyNameWithCln, StyleCommonPropertyValue.REPLACE_DUBITABLE);
		}
		int propertyNameWithClnIndex = styleValue.indexOf(propertyNameWithCln);
		if (propertyNameWithClnIndex != -1) {
			int lastSplitindex = styleValue.lastIndexOf(";");
			Pattern pattern = null;
			if (lastSplitindex > propertyNameWithClnIndex) {
				pattern = Pattern.compile(propertyName + REGEX_PROPERTY_MIDDLE);
			} else {
				pattern = Pattern.compile(propertyName + REGEX_PROPERTY_END);
			}
			Matcher matcher = pattern.matcher(styleValue);
			if (matcher.find()) {
				String propertyValue = matcher.group(1).trim();
				int i = 0;
				for (i = 0; i < NUMBER_UNIT_VALUE.length; i++) {
					//如果找到对应的单位
					if (propertyValue.endsWith(NUMBER_UNIT_VALUE[i])) {
						String numStr = propertyValue.replace(NUMBER_UNIT_VALUE[i], "");
						return numStr + NUMBER_UNIT_VALUE[i];
					}
				}
				if (i >= NUMBER_UNIT_VALUE.length) {
					return propertyValue;
				}
			}
		}
		return "";
	}

	public static String getColorPropertyValue(String styleValue, String propertyName) {
		styleValue = styleValue.trim();
		String propertyNameWithCln = propertyName + ":";
		if (propertyNameWithCln.indexOf("-") == -1) {
			styleValue = styleValue.replace("-" + propertyNameWithCln, StyleCommonPropertyValue.REPLACE_DUBITABLE);
		}
		int propertyNameWithClnIndex = styleValue.indexOf(propertyNameWithCln);
		if (propertyNameWithClnIndex != -1) {
			int lastSplitindex = styleValue.lastIndexOf(";");
			Pattern pattern = null;
			if (lastSplitindex > propertyNameWithClnIndex) {
				pattern = Pattern.compile(propertyName + REGEX_PROPERTY_MIDDLE);
			} else {
				pattern = Pattern.compile(propertyName + REGEX_PROPERTY_END);
			}
			Matcher matcher = pattern.matcher(styleValue);
			if (matcher.find()) {
				return matcher.group(1).trim();
			}
		}
		return "";
	}

	public static String[] getJoinComboValueIndexWithUnitPropertyValue(String styleValue, String propertyName) {

		String res[] = new String[4];

		styleValue = styleValue.trim();
		String propertyNameWithCln = propertyName + ":";
		if (propertyNameWithCln.indexOf("-") == -1) {
			styleValue = styleValue.replace("-" + propertyNameWithCln, StyleCommonPropertyValue.REPLACE_DUBITABLE);
		}
		int propertyNameWithClnIndex = styleValue.indexOf(propertyNameWithCln);
		if (propertyNameWithClnIndex != -1) {
			int lastSplitindex = styleValue.lastIndexOf(";");
			Pattern pattern = null;
			if (lastSplitindex > propertyNameWithClnIndex) {
				pattern = Pattern.compile(propertyName + REGEX_PROPERTY_MIDDLE);
			} else {
				pattern = Pattern.compile(propertyName + REGEX_PROPERTY_END);
			}
			Matcher matcher = pattern.matcher(styleValue);
			if (matcher.find()) {
				String propertyValues = matcher.group(1).trim();
				List<String> list = splitStringToList(propertyValues);

				if (list.size() == 1) {
					String propertyValue = list.get(0);
					int[] valueUnit = parseUnitIndexAndValue(propertyValue);
					if (valueUnit != null) {
						res[0] = valueUnit[0] + "" + NUMBER_UNIT_VALUE[valueUnit[1]];
						res[1] = valueUnit[0] + "" + NUMBER_UNIT_VALUE[valueUnit[1]];
						res[2] = valueUnit[0] + "" + NUMBER_UNIT_VALUE[valueUnit[1]];
						res[3] = valueUnit[0] + "" + NUMBER_UNIT_VALUE[valueUnit[1]];
					} else {
						res[0] = propertyValue;
						res[1] = propertyValue;
						res[2] = propertyValue;
						res[3] = propertyValue;
					}
				} else if (list.size() == 2) {
					String propertyValue = list.get(0);
					int[] valueUnit = parseUnitIndexAndValue(propertyValue);
					if (valueUnit != null) {
						res[0] = valueUnit[0] + "" + NUMBER_UNIT_VALUE[valueUnit[1]];
						res[2] = valueUnit[0] + "" + NUMBER_UNIT_VALUE[valueUnit[1]];
					} else {
						res[0] = propertyValue;
						res[2] = propertyValue;
					}
					propertyValue = list.get(1);
					valueUnit = parseUnitIndexAndValue(propertyValue);
					if (valueUnit != null) {
						res[1] = valueUnit[0] + "" + NUMBER_UNIT_VALUE[valueUnit[1]];
						res[3] = valueUnit[0] + "" + NUMBER_UNIT_VALUE[valueUnit[1]];
					} else {
						res[1] = propertyValue;
						res[3] = propertyValue;
					}
				} else if (list.size() == 3) {
					String propertyValue = list.get(0);
					int[] valueUnit = parseUnitIndexAndValue(propertyValue);
					if (valueUnit != null) {
						res[0] = valueUnit[0] + "" + NUMBER_UNIT_VALUE[valueUnit[1]];

					} else {
						res[0] = propertyValue;
					}
					propertyValue = list.get(1);
					valueUnit = parseUnitIndexAndValue(propertyValue);
					if (valueUnit != null) {
						res[1] = valueUnit[0] + "" + NUMBER_UNIT_VALUE[valueUnit[1]];
						res[3] = valueUnit[0] + "" + NUMBER_UNIT_VALUE[valueUnit[1]];
					} else {
						res[1] = propertyValue;
						res[3] = propertyValue;
					}
					propertyValue = list.get(2);
					valueUnit = parseUnitIndexAndValue(propertyValue);
					if (valueUnit != null) {
						res[2] = valueUnit[0] + "" + NUMBER_UNIT_VALUE[valueUnit[1]];
					} else {
						res[2] = propertyValue;
					}
				} else if (list.size() > 3) {
					String propertyValue = list.get(0);
					int[] valueUnit = parseUnitIndexAndValue(propertyValue);
					if (valueUnit != null) {
						res[0] = valueUnit[0] + "" + NUMBER_UNIT_VALUE[valueUnit[1]];
					} else {
						res[0] = propertyValue;
					}

					propertyValue = list.get(1);
					valueUnit = parseUnitIndexAndValue(propertyValue);
					if (valueUnit != null) {
						res[1] = valueUnit[0] + "" + NUMBER_UNIT_VALUE[valueUnit[1]];
					} else {
						res[1] = propertyValue;
					}

					propertyValue = list.get(2);
					valueUnit = parseUnitIndexAndValue(propertyValue);
					if (valueUnit != null) {
						res[2] = valueUnit[0] + "" + NUMBER_UNIT_VALUE[valueUnit[1]];
					} else {
						res[2] = propertyValue;
					}

					propertyValue = list.get(3);
					valueUnit = parseUnitIndexAndValue(propertyValue);
					if (valueUnit != null) {
						res[3] = valueUnit[0] + "" + NUMBER_UNIT_VALUE[valueUnit[1]];
					} else {
						res[3] = propertyValue;
					}
				}
			}
		}
		if (res[0] != null) {
			return res;
		} else {
			return null;
		}
	}

	public static String[] getJoinComboValueIndexPropertyValue(String styleValue, String propertyName) {
		String[] res = new String[4];
		styleValue = styleValue.trim();
		String propertyNameWithCln = propertyName + ":";
		if (propertyNameWithCln.indexOf("-") == -1) {
			styleValue = styleValue.replace("-" + propertyNameWithCln, StyleCommonPropertyValue.REPLACE_DUBITABLE);
		}
		int propertyNameWithClnIndex = styleValue.indexOf(propertyNameWithCln);
		if (propertyNameWithClnIndex != -1) {
			int lastSplitIndex = styleValue.lastIndexOf(";");
			Pattern pattern = null;
			if (lastSplitIndex > propertyNameWithClnIndex) {
				pattern = Pattern.compile(propertyName + REGEX_PROPERTY_MIDDLE);
			} else {
				pattern = Pattern.compile(propertyName + REGEX_PROPERTY_END);
			}
			Matcher matcher = pattern.matcher(styleValue);
			if (matcher.find()) {
				String propertyValue = matcher.group(1).trim();
				List<String> list = splitStringToList(propertyValue);
				if (list.size() == 1) {
					res[0] = list.get(0);
					res[1] = list.get(0);
					res[2] = list.get(0);
					res[3] = list.get(0);
				} else if (list.size() == 2) {
					res[0] = list.get(0);
					res[2] = list.get(0);
					res[1] = list.get(1);
					res[3] = list.get(1);
				} else if (list.size() == 3) {
					res[0] = list.get(0);
					res[1] = list.get(1);
					res[3] = list.get(1);
					res[2] = list.get(2);
				} else if (list.size() > 3) {
					res[0] = list.get(0);
					res[1] = list.get(1);
					res[2] = list.get(2);
					res[3] = list.get(3);
				}
			}
		}
		if (res[0] != null) {
			return res;
		} else {
			return null;
		}
	}

	public static String[] getJoinColorValueIndexPropertyValue(String styleValue, String propertyName) {
		String[] res = new String[4];
		styleValue = styleValue.trim();
		String propertyNameWithCln = propertyName + ":";
		if (propertyNameWithCln.indexOf("-") == -1) {
			styleValue = styleValue.replace("-" + propertyNameWithCln, StyleCommonPropertyValue.REPLACE_DUBITABLE);
		}
		int propertyNameWithClnIndex = styleValue.indexOf(propertyNameWithCln);
		if (propertyNameWithClnIndex != -1) {
			int lastSplitindex = styleValue.lastIndexOf(";");
			Pattern pattern = null;
			if (lastSplitindex > propertyNameWithClnIndex) {
				pattern = Pattern.compile(propertyName + REGEX_PROPERTY_MIDDLE);
			} else {
				pattern = Pattern.compile(propertyName + REGEX_PROPERTY_END);
			}
			Matcher matcher = pattern.matcher(styleValue);
			if (matcher.find()) {
				String propertyValue = matcher.group(1).trim();
				List<String> list = splitStringToList(propertyValue);
				if (list.size() == 1) {
					String colorValue = list.get(0);
					res[0] = colorValue;
					res[1] = colorValue;
					res[2] = colorValue;
					res[3] = colorValue;
				} else if (list.size() == 2) {
					String colorValue = list.get(0);
					res[0] = colorValue;
					res[2] = colorValue;
					colorValue = list.get(1);
					res[1] = colorValue;
					res[3] = colorValue;
				} else if (list.size() == 3) {
					String colorValue = list.get(0);
					res[0] = colorValue;
					colorValue = list.get(1);
					res[1] = colorValue;
					res[3] = colorValue;
					colorValue = list.get(2);
					res[2] = colorValue;
				} else if (list.size() > 3) {
					String colorValue = list.get(0);
					res[0] = colorValue;
					colorValue = list.get(1);
					res[1] = colorValue;
					colorValue = list.get(2);
					res[2] = colorValue;
					colorValue = list.get(3);
					res[3] = colorValue;
				}
			}
		}
		if (res[0] != null) {
			return res;
		} else {
			return null;
		}
	}

	public static void main(String[] ss) {

		/*		String propertyValue = "#00FFFF #8080FF    #008040   #FF0080";
				List list = splitStringToList(propertyValue);

				int i = 0;

				List list2 = new ArrayList();
				list2.add("aaa");
				list2.add("");
				list2.add("");
		*/
	}
}
