package com.justep.deploy;

import java.lang.reflect.Field;

import com.alibaba.fastjson.JSONObject;

public class AppInfo {
	// 应用基本信息
	public String userID;
	public String appName;
	public String version;
	public String packageName;
	public String serverURL;
	public String indexURL;
	public String uiResDirs;
	public Boolean extBrowser;
	public Boolean autoSelectPlugins;
	public String plugins;
	public Boolean resEncryption;
	public String mqttServerURL;
	// 打包相关设置
	public String platform;
	public Boolean compileUI;
	public Boolean useAppBuilderServer;
	public String appBuilderServer;
	public String releaseMode;
	// 编辑模式数据
	public String oldAppName;

	public AppInfo(JSONObject config) throws IllegalArgumentException, IllegalAccessException {
		Class<? extends AppInfo> cls = this.getClass();
		Field[] flds = cls.getFields();
		Object v;
		if (flds != null) {
			for (int i = 0; i < flds.length; i++) {
				v = config.get(flds[i].getName());
				flds[i].set(this, v);
			}
		}
	}

}