package com.justep.studio.ui.editors.stylepage;

public interface IStylePage {

	/**
	 * 初始化面板布局
	 */
	public void initLayout();

	/**
	 * 控件事件注册
	 */
	public void registerEvent();

	/**
	 * 初始化面板中控件的默认值
	 */
	public void initDefaultValue();

	/**
	 * 根据用户自定义配置初始化属性配置面板
	 */
	public void initSelfDefaultValue();

}
