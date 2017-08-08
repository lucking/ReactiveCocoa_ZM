package com.justep.studio.ui.editors.stylepage;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.eclipse.swt.SWT;
import org.eclipse.swt.browser.Browser;
import org.eclipse.swt.custom.StyledText;
import org.eclipse.swt.layout.FillLayout;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Label;

import com.justep.studio.ui.editors.xui.IPropertyDialogPage;
import com.justep.studio.ui.editors.xui.IPropertyValueStrategy;
import com.justep.studio.ui.editors.xui.PropertyItem;
import com.swtdesigner.SWTResourceManager;

/**
 * 预览及说明
 * @author linhongbao
 *
 */
public class StylePreviewPage extends Composite implements IPropertyDialogPage, IStylePage {

	private StyledText styledText;
	private Composite composite;
	private String paintStr = "绘制字体ABCabc";
	private String styleValue;
	private StyleDialog styleDialog;

	private String font_family = "宋体";
	private String font_size = "medium";
	private String font_weight = "normal";
	private String font_style = "normal";
	private String font_variant = "normal";
	private String text_transform = "none";
	private String font_color = "";

	private String background_color = "";

	private String border_top_color = "";
	private String border_right_color = "";
	private String border_bottom_color = "";
	private String border_left_color = "";
	private String border_top_width = "";
	private String border_right_width = "";
	private String border_bottom_width = "";
	private String border_left_width = "";
	private String border_top_style = "";
	private String border_right_style = "";
	private String border_bottom_style = "";
	private String border_left_style = "";

	private String text_decoration = "none";

	private Browser browser;

	public StylePreviewPage(Composite parent, int style, String styleValue, StyleDialog styleDialog) {
		super(parent, style);
		this.styleValue = styleValue;
		this.styleDialog = styleDialog;
		this.initLayout();
		this.initDefaultValue();
		this.initSelfDefaultValue();
	}

	public StylePreviewPage(Composite parent, int style) {
		super(parent, style);
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

	/**
	 * 按照设置的属性值重新绘图
	 * 颜色
	 * @param paintType
	 * @param fontValue
	 */
	public void rePaintText(String paintType, String fontValue, boolean paintFlag) {
		if ("font-family".equals(paintType)) {
			font_family = fontValue;
		} else if ("font-size".equals(paintType)) {
			font_size = fontValue;
		} else if ("font-weight".equals(paintType)) {
			font_weight = fontValue;
		} else if ("font-style".equals(paintType)) {
			font_style = fontValue;
		} else if ("font-variant".equals(paintType)) {
			font_variant = fontValue;
		} else if ("text-transform".equals(paintType)) {
			text_transform = fontValue;
		} else if ("color".equals(paintType)) {
			font_color = fontValue;
		} else if ("background-color".equals(paintType)) {
			background_color = fontValue;
		}

		else if ("border-top-color".equals(paintType)) {
			border_top_color = fontValue;
		} else if ("border-right-color".equals(paintType)) {
			border_right_color = fontValue;
		} else if ("border-bottom-color".equals(paintType)) {
			border_bottom_color = fontValue;
		} else if ("border-left-color".equals(paintType)) {
			border_left_color = fontValue;
		} else if ("border-top-width".equals(paintType)) {
			border_top_width = fontValue;
		} else if ("border-right-width".equals(paintType)) {
			border_right_width = fontValue;
		} else if ("border-bottom-width".equals(paintType)) {
			border_bottom_width = fontValue;
		} else if ("border-left-width".equals(paintType)) {
			border_left_width = fontValue;
		} else if ("border-top-style".equals(paintType)) {
			border_top_style = fontValue;
		} else if ("border-right-style".equals(paintType)) {
			border_right_style = fontValue;
		} else if ("border-bottom-style".equals(paintType)) {
			border_bottom_style = fontValue;
		} else if ("border-left-style".equals(paintType)) {
			border_left_style = fontValue;
		} else if ("text-decoration".equals(paintType)) {
			text_decoration = fontValue;
		}

		if (paintFlag) {
			setBrowserContent();
		}
	}

	public void initLayout() {
		final GridLayout gridLayout = new GridLayout();
		gridLayout.numColumns = 2;
		setLayout(gridLayout);

		final Label label = new Label(this, SWT.NONE);
		final GridData gd_label = new GridData(SWT.FILL, SWT.TOP, true, false);
		gd_label.widthHint = 18;
		label.setLayoutData(gd_label);
		label.setText("预览：");

		composite = new Composite(this, SWT.BORDER);
		composite.setLayout(new FillLayout());
		composite.setBackground(SWTResourceManager.getColor(255, 255, 255));
		composite.setLayoutData(new GridData(440, 70));

		browser = new Browser(composite, SWT.NORMAL);
		setBrowserContent();

		final Label label_1 = new Label(this, SWT.NONE);
		label_1.setLayoutData(new GridData(SWT.LEFT, SWT.TOP, false, false));
		label_1.setText("说明：");

		styledText = new StyledText(this, SWT.V_SCROLL | SWT.READ_ONLY | SWT.BORDER);

		styledText.setWordWrap(true);
		styledText.setLayout(new FillLayout());
		styledText.setLayoutData(new GridData(423, 60));
	}

	public void setBrowserContent() {
		StringBuffer sf = new StringBuffer();
		sf.append("<body oncontextmenu=\"return true;\">");
		sf.append("<div style=\"width:380px;height:56px;position:absolute;");
		sf.append("left:50%;top:50%;margin-left:-190px;margin-top:-28px;valign=auto;");
		sf.append("text-align:center;vertical-align:middle;line-height:56px;");

		/*StyleBorderPage*/
		sf.append("font-family:" + font_family + ";");
		sf.append("font-size:" + font_size + ";");
		sf.append("font-weight:" + font_weight + ";");
		sf.append("font-style:" + font_style + ";");
		sf.append("font-variant:" + font_variant + ";");
		sf.append("text-transform:" + text_transform + ";");
		sf.append("color:" + font_color + ";");
		sf.append("text-decoration:" + text_decoration + ";");

		/*StyleBackgroundPage*/
		sf.append("background-color:" + background_color + ";");

		/*StyleBorderPage*/
		sf.append("border-top-color:" + border_top_color + ";");
		sf.append("border-right-color:" + border_right_color + ";");
		sf.append("border-bottom-color:" + border_bottom_color + ";");
		sf.append("border-left-color:" + border_left_color + ";");
		sf.append("border-top-width:" + border_top_width + ";");
		sf.append("border-right-width:" + border_right_width + ";");
		sf.append("border-bottom-width:" + border_bottom_width + ";");
		sf.append("border-left-width:" + border_left_width + ";");
		sf.append("border-top-style:" + border_top_style + ";");
		sf.append("border-right-style:" + border_right_style + ";");
		sf.append("border-bottom-style:" + border_bottom_style + ";");
		sf.append("border-left-style:" + border_left_style + ";");

		sf.append("\">" + paintStr + "</div></body></html>");

		browser.setText(sf.toString());
	}

	public void initSelfDefaultValue() {
		this.styledText.setText(this.styleValue);
	}

	public void registerEvent() {
	}

	private String transPropName(String propName) {
		int idx = propName.indexOf("|");
		if (idx != -1) {
			return propName.substring(idx + 1);
		}
		return propName;
	}

	/**
	 * 设置属性值
	 * @param name
	 * @param value
	 */
	public void setPropertyValue(String name, String value) {
		boolean hasProperty = false;
		/*查找设置的属性是否存在*/
		String oldStyle = styledText.getText().trim();
		StringBuffer sbf = new StringBuffer();
		if (oldStyle != null && !oldStyle.equals("")) {
			String[] styleItems = oldStyle.split(";");
			for (String sItem : styleItems) {
				int ind = sItem.indexOf(":");
				if (ind != -1) {
					String pName = sItem.substring(0, ind).trim();
					String pValue = sItem.substring(ind + 1, sItem.length()).trim();
					if (!pName.equalsIgnoreCase(this.transPropName(name))) {
						sbf.append(pName + ":" + pValue + ";");
					} else if (pName.equalsIgnoreCase(this.transPropName(name))) {
						hasProperty = true;
						if (value != null && !value.equals("")) {
							sbf.append(this.transPropName(name) + ":" + value + ";");
						}
					}
				}
			}
		}

		styleValue = sbf.toString();
		styledText.setText(styleValue);
		styleDialog.setResultData(styleValue);

		if (!hasProperty) {

			String nameWithCln = name + ":";
			String styledTextContext = styledText.getText().trim();
			if (nameWithCln.indexOf("-") == -1) {
				styledTextContext = styledTextContext.replace("-" + nameWithCln, StyleCommonPropertyValue.REPLACE_DUBITABLE);
			}
			int nameWithClnIndex = styledTextContext.indexOf(nameWithCln);
			if (nameWithClnIndex != -1) {
				int lastSignIndex = styledTextContext.lastIndexOf(";");
				if (lastSignIndex > nameWithClnIndex) {
					String regex = name + StyleCommonPropertyValue.REGEX_PROPERTY_MIDDLE;
					Pattern pattern = Pattern.compile(regex);
					Matcher matcher = pattern.matcher(styledTextContext);
					if (matcher.find()) {
						String arrStr[] = pattern.split(styledTextContext);
						styleValue = arrStr[0] + nameWithCln + value + ";" + arrStr[1];
						if (nameWithCln.indexOf("-") == -1) {
							styleValue = styleValue.replace(StyleCommonPropertyValue.REPLACE_DUBITABLE, "-" + nameWithCln);
						}
						styledText.setText(styleValue);
						styleDialog.setResultData(styleValue);
					}
				} else {
					int lastMaoIndex = styledTextContext.lastIndexOf(":");
					styleValue = styledTextContext.substring(0, lastMaoIndex + 1) + value;
					if (nameWithCln.indexOf("-") == -1) {
						styleValue = styleValue.replace(StyleCommonPropertyValue.REPLACE_DUBITABLE, "-" + nameWithCln);
					}
					styledText.setText(styleValue);
					styleDialog.setResultData(styleValue);
				}
			} else {
				if (styledTextContext.trim().equals("")) {
					styleValue = nameWithCln + value + ";";
					styledText.setText(styleValue);
					styleDialog.setResultData(styleValue);
				} else {
					styleValue = (styledTextContext.endsWith(";") ? (styledTextContext) : (styledTextContext + ";")) + nameWithCln + value + ";";
					if (nameWithCln.indexOf("-") == -1) {
						styleValue = styleValue.replace(StyleCommonPropertyValue.REPLACE_DUBITABLE, "-" + nameWithCln);
					}
					styledText.setText(styleValue);
					styleDialog.setResultData(styleValue);
				}
			}
		}

	}

	/**
	 * 删除属性
	 * @param name
	 */
	public void removeProperty(String name) {
		String nameWithCln = name + ":";
		String styledTextContext = styledText.getText().trim();
		if (nameWithCln.indexOf("-") == -1) {
			styledTextContext = styledTextContext.replace("-" + nameWithCln, StyleCommonPropertyValue.REPLACE_DUBITABLE);
		}
		int nameWithClnIndex = styledTextContext.indexOf(nameWithCln);
		if (nameWithClnIndex != -1) {
			int lastSignIndex = styledTextContext.lastIndexOf(";");
			if (lastSignIndex > nameWithClnIndex) {
				String regex = name + StyleCommonPropertyValue.REGEX_PROPERTY_MIDDLE;
				Pattern pattern = Pattern.compile(regex);
				Matcher matcher = pattern.matcher(styledTextContext);
				if (matcher.find()) {
					String arrStr[] = pattern.split(styledTextContext);
					styleValue = "";
					for (int i = 0; i < arrStr.length; i++) {
						styleValue += arrStr[i];
					}
					if (nameWithCln.indexOf("-") == -1) {
						styleValue = styleValue.replace(StyleCommonPropertyValue.REPLACE_DUBITABLE, "-" + nameWithCln);
					}
					styledText.setText(styleValue);
					styleDialog.setResultData(styleValue);
				}
			} else {
				styleValue = styledTextContext.substring(0, lastSignIndex);
				if (nameWithCln.indexOf("-") == -1) {
					styleValue = styleValue.replace(StyleCommonPropertyValue.REPLACE_DUBITABLE, "-" + nameWithCln);
				}
				styledText.setText(styleValue);
				styleDialog.setResultData(styleValue);
			}
		}
	}

	public void initDefaultValue() {

	}
}
