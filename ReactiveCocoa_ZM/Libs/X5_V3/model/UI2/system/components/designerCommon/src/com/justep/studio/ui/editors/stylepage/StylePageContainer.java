package com.justep.studio.ui.editors.stylepage;

import org.eclipse.swt.SWT;
import org.eclipse.swt.widgets.Composite;

/**
 * 所有编辑页面的集合
 * @author linhongbao
 */
public class StylePageContainer {

	private StyleFontPage styleFontPage;
	private StyleSpacePage styleSpacePage;
	private StyleBackgroundPage styleBackgroundPage;
	private StyleBorderPage styleBorderPage;
	private StylePanelPage stylePanelPage;
	private StylePositionPage stylePositionPage;
	private StyleLayoutPage styleLayoutPage;
	private StyleListPage styleListPage;
	private StyleTablePage styleTablePage;
	

	private String styleValue;

	/*.w文件路径剧UI的深度*/
	private int deep;

	public StylePageContainer() {
		super();
	}

	public Composite getStylePage(String string, Composite composite_top_right, StyleDialog styleDialog) {
		Composite resultComposite;
		if (string == null) {
			if (styleFontPage == null) {
				styleFontPage = new StyleFontPage(composite_top_right, styleDialog, styleValue, SWT.NONE);
			}
			resultComposite = styleFontPage;
		} else if (string.startsWith("字体")) {
			if (styleFontPage == null) {
				styleFontPage = new StyleFontPage(composite_top_right, styleDialog, styleValue, SWT.NONE);
			}
			resultComposite = styleFontPage;
		} else if (string.startsWith("块")) {
			if (styleSpacePage == null) {
				styleSpacePage = new StyleSpacePage(composite_top_right, styleDialog, styleValue, SWT.NONE);
			}
			resultComposite = styleSpacePage;
		} else if (string.startsWith("背景")) {
			if (styleBackgroundPage == null) {
				styleBackgroundPage = new StyleBackgroundPage(composite_top_right, styleDialog, styleValue, SWT.NONE);
				styleBackgroundPage.setDeep(this.deep);
			}
			resultComposite = styleBackgroundPage;
		} else if (string.startsWith("边框")) {
			if (styleBorderPage == null) {
				styleBorderPage = new StyleBorderPage(composite_top_right, styleDialog, styleValue, SWT.NONE);
			}
			resultComposite = styleBorderPage;
		} else if (string.startsWith("方框")) {
			if (stylePanelPage == null) {
				stylePanelPage = new StylePanelPage(composite_top_right, styleDialog, styleValue, SWT.NONE);
			}
			resultComposite = stylePanelPage;
		} else if (string.startsWith("定位")) {
			if (stylePositionPage == null) {
				stylePositionPage = new StylePositionPage(composite_top_right, styleDialog, styleValue, SWT.NONE);
			}
			resultComposite = stylePositionPage;
		} else if (string.startsWith("布局")) {
			if (styleLayoutPage == null) {
				styleLayoutPage = new StyleLayoutPage(composite_top_right, styleDialog, styleValue, SWT.NONE);
			}
			resultComposite = styleLayoutPage;
		} else if (string.startsWith("列表")) {
			if (styleListPage == null) {
				styleListPage = new StyleListPage(composite_top_right, styleDialog, styleValue, SWT.NONE);
				styleListPage.setDeep(this.deep);
			}
			resultComposite = styleListPage;
		} else if (string.startsWith("表格")) {
			if (styleTablePage == null) {
				styleTablePage = new StyleTablePage(composite_top_right, styleDialog, styleValue, SWT.NONE);
			}
			resultComposite = styleTablePage;
		} else {
			if (styleFontPage == null) {
				styleFontPage = new StyleFontPage(composite_top_right, styleDialog, styleValue, SWT.NONE);
			}
			resultComposite = styleFontPage;
		}
		return resultComposite;
	}

	/**
	 * 创建面板
	 * @param composite_top_right
	 * @param styleDialog
	 * @param styleValue
	 */
	public void initAllPage(String string, Composite composite_top_right, StyleDialog styleDialog, String styleValue) {
		this.styleValue = styleValue;
		if (string == null) {
			styleFontPage = new StyleFontPage(composite_top_right, styleDialog, styleValue, SWT.NONE);
		} else if (string.startsWith("字体")) {
			styleFontPage = new StyleFontPage(composite_top_right, styleDialog, styleValue, SWT.NONE);
		} else if (string.startsWith("块")) {
			styleSpacePage = new StyleSpacePage(composite_top_right, styleDialog, styleValue, SWT.NONE);
		} else if (string.startsWith("背景")) {
			styleBackgroundPage = new StyleBackgroundPage(composite_top_right, styleDialog, styleValue, SWT.NONE);
			styleBackgroundPage.setDeep(this.deep);
		} else if (string.startsWith("边框")) {
			styleBorderPage = new StyleBorderPage(composite_top_right, styleDialog, styleValue, SWT.NONE);
		} else if (string.startsWith("方框")) {
			stylePanelPage = new StylePanelPage(composite_top_right, styleDialog, styleValue, SWT.NONE);
		} else if (string.startsWith("定位")) {
			stylePositionPage = new StylePositionPage(composite_top_right, styleDialog, styleValue, SWT.NONE);
		} else if (string.startsWith("布局")) {
			styleLayoutPage = new StyleLayoutPage(composite_top_right, styleDialog, styleValue, SWT.NONE);
		} else if (string.startsWith("列表")) {
			styleListPage = new StyleListPage(composite_top_right, styleDialog, styleValue, SWT.NONE);
			styleListPage.setDeep(this.deep);
		} else if (string.startsWith("表格")) {
			styleTablePage = new StyleTablePage(composite_top_right, styleDialog, styleValue, SWT.NONE);
		} else {
			styleFontPage = new StyleFontPage(composite_top_right, styleDialog, styleValue, SWT.NONE);
		}
		
		
	}

	public void setDeep(int deep) {
		this.deep = deep;
	}

}
