package com.justep.tools.ant.task;

import org.apache.http.client.methods.HttpPost;

public class PackTask extends HttpTask {

	private String userID;
	private String appName;
	private String platform;
	private String appBuilderServer;
	private String session;

	protected String getURL() {
		// appName可能有空格，需要做编码
		String encodeAppName = appName.replace(" ", "%20");
		return appBuilderServer + "/app/pack?" + "userID=" + userID + "&&appName=" + encodeAppName + "&&platform=" + platform + "&&session=" + session;
	}

	protected void preparePost(HttpPost httppost) {
	}

	public void setAppName(String appName) {
		this.appName = appName;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public void setPlatform(String platform) {
		this.platform = platform;
	}

	public void setAppBuilderServer(String appBuilderServer) {
		this.appBuilderServer = appBuilderServer;
	}

	public void setSession(String session) {
		this.session = session;
	}

}