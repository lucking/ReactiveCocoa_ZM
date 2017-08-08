import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.justep.biz.client.ActionUtils;
import com.justep.useragent.Browser;
import com.justep.useragent.UserAgent;

public class Download extends com.justep.ui.impl.JProcessorImpl {

	private void downloadFile(HttpServletRequest request, HttpServletResponse response, String appPath, String appName, String type) throws IOException {
		String fileNameKey = "filename";
		UserAgent ua = com.justep.ui.util.NetUtils.getUserAgent(request);
		if (Browser.FIREFOX.equals(ua.getBrowser().getGroup())) {
			fileNameKey = "filename*";
		}

		response.setCharacterEncoding("UTF-8");
		response.setContentType(ActionUtils.BINARY_CONTENT_TYPE);
		response.setHeader("Cache-Control", "no-cache");
		response.setHeader("Content-Type", ActionUtils.BINARY_CONTENT_TYPE);
		response.setHeader("Content-disposition", "attachment;" + fileNameKey + "=\"" + URLEncoder.encode(appName, "UTF-8") + "." + type + "\"");
		response.setHeader("Cache-Control", "pre-check=0, post-check=0, max-age=0");

		FileInputStream inputStream = new FileInputStream(appPath);
		OutputStream out = response.getOutputStream();
		try {
			byte[] bt = new byte[1024];
			int i = -1;
			while ((i = inputStream.read(bt)) != -1) {
				out.write(bt, 0, i);
			}
			out.flush();
		} finally {
			out.close();
			inputStream.close();
		}
	}

	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String modelPath = com.justep.filesystem.FileSystemWrapper.instance().getRealPath("/");
		String nativeDir = modelPath + "Native";
		String appName = request.getParameter("appName");
		String platform = request.getParameter("platform");
		if ((appName == null) || "".equals(appName) || (platform == null) || "".equals(platform))
			throw new ServletException("下载参数不正确！");

		String type = "ios".equals(platform) ? "ipa" : "apk";
		String appPath = nativeDir + "/" + appName + "/dist/" + appName + "." + type;

		if ((new File(appPath)).exists()) {
			downloadFile(request, response, appPath, appName, type);
			return;
		}
	}
}
