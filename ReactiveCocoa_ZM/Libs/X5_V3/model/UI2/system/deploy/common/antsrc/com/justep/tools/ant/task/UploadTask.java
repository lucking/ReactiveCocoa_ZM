package com.justep.tools.ant.task;

import java.io.File;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.entity.mime.content.StringBody;

public class UploadTask extends HttpTask {

	private String userID;
	private String file;
	private String appBuilderServer;
	private String session;

	protected String getURL() {
		return appBuilderServer + "/app/upload?" + "userID=" + userID + "&&session=" + session;
	}

	protected void preparePost(HttpPost httppost) {
		FileBody bin = new FileBody(new File(file));
		StringBody comment = new StringBody("content of native app", ContentType.APPLICATION_OCTET_STREAM);
		HttpEntity reqEntity = MultipartEntityBuilder.create().addPart("bin", bin).addPart("comment", comment).build();
		httppost.setEntity(reqEntity);
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public void setFile(String file) {
		this.file = file;
	}

	public void setAppBuilderServer(String appBuilderServer) {
		this.appBuilderServer = appBuilderServer;
	}

	public void setSession(String session) {
		this.session = session;
	}
}