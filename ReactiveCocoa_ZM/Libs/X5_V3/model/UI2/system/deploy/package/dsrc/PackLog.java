import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.justep.deploy.AppHelper;

public class PackLog extends com.justep.ui.impl.JProcessorImpl {

	private void log(OutputStream stream, String logFileName) throws IOException {
		File srcFile = new File(logFileName);
		BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(srcFile)));
		String str = null;
		while ((str = br.readLine()) != null) {
			stream.write(str.getBytes("UTF-8"));
			stream.write('\r');
			stream.write('\n');
		}
		br.close();
	}

	private void logFromServer(OutputStream stream, String serverURL) throws IOException {
		try {
			stream.write(AppHelper.getHttp(serverURL, true).getBytes("UTF-8"));
		} catch (Exception e) {
			stream.write(("获取服务端日志失败，错误原因：" + e.getMessage()).getBytes("UTF-8"));
		}
	}

	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String modelPath = com.justep.filesystem.FileSystemWrapper.instance().getRealPath("/");
		String nativeDir = modelPath + "Native";
		String appName = request.getParameter("appName");
		String serverLog = request.getParameter("serverLog");
		String appBuilderServer = request.getParameter("appBuilderServer");
		String userID = request.getParameter("userID");

		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/plain");
		response.setHeader("Cache-Control", "no-cache");
		OutputStream stream = response.getOutputStream();

		if ("false".equals(serverLog)) {
			String logFileName = nativeDir + "/" + appName + "/log/build.log";
			log(stream, logFileName);
		} else {
			String serverURL = appBuilderServer + "/app/packlog?userID=" + userID;
			logFromServer(stream, serverURL);
		}
		stream.close();

	}

}
