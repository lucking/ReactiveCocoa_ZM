package com.justep.tools.ant.task;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import org.apache.http.HttpEntity;
import org.apache.http.HttpStatus;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.apache.tools.ant.BuildException;
import org.apache.tools.ant.Task;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

public class HttpTask extends Task {

	private String url;

	protected String paserResponse(CloseableHttpResponse response) throws IOException {
		HttpEntity resEntity = response.getEntity();
		StringBuffer buffer = new StringBuffer();
		if (resEntity != null) {
			HttpEntity entity = response.getEntity();
			if (entity != null) {
				InputStream is = entity.getContent();
				BufferedReader in = new BufferedReader(new InputStreamReader(is, "UTF-8"));
				String line = "";
				while ((line = in.readLine()) != null) {
					buffer.append(line);
				}
			}
			EntityUtils.consume(resEntity);
		}

		return buffer.toString();
	}

	public void setURL(String url) {
		this.url = url;
	}

	protected String getURL() {
		return url;
	}

	protected void preparePost(HttpPost httppost) {
	}

	protected String paserErrorStatus(CloseableHttpResponse response) throws IOException {
		return paserResponse(response);
	}

	protected void processResponse(CloseableHttpResponse response) throws IOException {
		String message = paserResponse(response);
		if (!("".equals(message))) {
			JSONObject config = JSONObject.parseObject(message);
			if ("false".equals(config.getString("flag"))) {
				StringBuffer sb = new StringBuffer();
				sb.append("执行HTTP请求失败，错误信息：");
				sb.append(config.getString("message"));
				sb.append("\r\n错误原因：");
				sb.append(config.getString("reason"));
				sb.append("\r\n错误栈：\r\n");
				JSONArray messages = config.getJSONArray("messages");
				if (messages != null) {
					for (int i = 0; i < messages.size(); i++) {
						sb.append(messages.getString(i));
						sb.append("\r\n");
					}
				}
				sb.append("\r\n服务端调用栈：\r\n");
				sb.append(config.getString("stack"));
				throw new BuildException(sb.toString());
			}
		}
	}

	public void execute() throws BuildException {
		try {
			CloseableHttpClient httpclient = HttpClients.createDefault();
			try {
				HttpPost httppost = new HttpPost(getURL());
				preparePost(httppost);
				CloseableHttpResponse response = httpclient.execute(httppost);
				try {
					if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
						processResponse(response);
					} else {
						String error = paserErrorStatus(response);
						throw new BuildException("执行HTTP请求失败，错误信息：" + error);
					}
				} finally {
					response.close();
				}
			} finally {
				httpclient.close();
			}
		} catch (BuildException be) {
			throw be;
		} catch (Exception ex) {
			throw new BuildException(ex);
		}
	}

}