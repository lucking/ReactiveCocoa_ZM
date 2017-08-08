import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetAddress;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSONObject;
import com.justep.biz.client.ActionUtils;

public class GetDownloadInfo extends com.justep.ui.impl.JProcessorImpl {

	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String modelPath = com.justep.filesystem.FileSystemWrapper.instance().getRealPath("/");
		String nativeDir = modelPath + "Native";
		String appName = request.getParameter("appName");
		String androidFile = nativeDir + "/" + appName + "/dist/" + appName + ".apk";
		String iosFile = nativeDir + "/" + appName + "/dist/" + appName + ".ipa";

		StringBuffer ip = new StringBuffer();
		InetAddress addr = InetAddress.getLocalHost();
		String hostName = addr.getHostName();
		if (hostName.length() > 0) {
			InetAddress[] addrs = InetAddress.getAllByName(hostName);
			for (InetAddress ad : addrs) {
				if (ad.isSiteLocalAddress()) {
					if (ip.length() > 0) {
						ip.append(",");
					}
					ip.append(ad.getHostAddress());
				}
			}
		}
		int port = request.getLocalPort();

		JSONObject downloadInfo = new JSONObject();
		downloadInfo.put("ip", ip.toString());
		downloadInfo.put("port", port);
		downloadInfo.put("android", new File(androidFile).exists());
		downloadInfo.put("ios", new File(iosFile).exists());

		response.setCharacterEncoding("UTF-8");
		response.setContentType(ActionUtils.JSON_CONTENT_TYPE);
		OutputStream output = response.getOutputStream();
		output.write(downloadInfo.toJSONString().getBytes("UTF-8"));
		output.flush();
		output.close();
	}
}
