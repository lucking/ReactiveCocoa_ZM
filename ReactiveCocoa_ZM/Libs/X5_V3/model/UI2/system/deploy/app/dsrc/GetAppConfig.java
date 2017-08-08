import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSONObject;
import com.justep.biz.client.ActionUtils;

public class GetAppConfig extends com.justep.ui.impl.JProcessorImpl {

	private JSONObject createConfigByFile(String appProjectFile) throws IOException {
		File srcFile = new File(appProjectFile);
		BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(srcFile), "UTF-8"));
		StringBuffer sb = new StringBuffer();
		String str = null;
		while ((str = br.readLine()) != null) {
			sb.append(str);
		}
		br.close();
		return JSONObject.parseObject(sb.toString());
	}

	private void appendLastPackConfig(JSONObject config, String appBuildPropFile) throws IOException {
		File srcFile = new File(appBuildPropFile);
		BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(srcFile), "UTF-8"));
		HashMap<String, String> values = new HashMap<String, String>();
		String str = null;
		while ((str = br.readLine()) != null) {
			String[] value = str.split("=");
			if (value.length == 2) {
				values.put(value[0], value[1]);
			}
		}
		br.close();

		config.put("platform", values.get("platform"));
		config.put("compileUI", "true".equals(values.get("compileUI")));
		config.put("useAppBuilderServer", "true".equals(values.get("useAppBuilderServer")));
		config.put("releaseMode", values.get("releaseMode"));
		String appBuilderServer = values.get("appBuilderServer");
		if (appBuilderServer != null) {
			// 去掉属性文件中\转义的字符
			appBuilderServer = appBuilderServer.replaceAll("\\\\", "");
			config.put("appBuilderServer", appBuilderServer);
		}
	}

	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String modelPath = com.justep.filesystem.FileSystemWrapper.instance().getRealPath("/");
		String nativeDir = modelPath + "Native";
		String appName = request.getParameter("appName");
		String appProjectFile = nativeDir + "/" + appName + "/app.project";
		String appBuildPropFile = nativeDir + "/" + appName + "/build.properties";

		JSONObject config = createConfigByFile(appProjectFile);
		appendLastPackConfig(config, appBuildPropFile);

		response.setCharacterEncoding("UTF-8");
		response.setContentType(ActionUtils.JSON_CONTENT_TYPE);
		OutputStream output = response.getOutputStream();
		output.write(config.toJSONString().getBytes("UTF-8"));
		output.flush();
		output.close();
	}

}
