import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.XPath;
import org.dom4j.io.SAXReader;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.justep.biz.client.ActionUtils;

public class GetRegPlugins extends com.justep.ui.impl.JProcessorImpl {

	private static Logger log = Logger.getLogger("GetRegPlugins");

	private JSONObject getPluginInfo(File pluginXML) throws UnsupportedEncodingException, FileNotFoundException, DocumentException {
		SAXReader xReader = new SAXReader();
		InputStreamReader isr;
		isr = new InputStreamReader(new FileInputStream(pluginXML), "UTF-8");
		Document doc = xReader.read(isr);
		Element plugin = doc.getRootElement();
		JSONObject result = new JSONObject();
		result.put("id", plugin.attributeValue("id"));
		result.put("version", plugin.attributeValue("version"));
		result.put("name", plugin.element("name").getText());

		String defaultNamespace = doc.getRootElement().getNamespaceURI();
		HashMap<String, String> nsMap = new HashMap<String, String>();
		nsMap.put("default", defaultNamespace);
		XPath x = doc.createXPath("default:dependency");
		x.setNamespaceURIs(nsMap);
		@SuppressWarnings("unchecked")
		List<Element> nodes = x.selectNodes(plugin);
		String dependency = "";
		for (int i = 0; i < nodes.size(); i++) {
			dependency += i == 0 ? "" : ",";
			dependency += nodes.get(i).attributeValue("id");
		}
		result.put("dependency", dependency);
		return result;
	}

	private void appendPlugins(JSONArray plugins, String pluginsDir) {
		File dir = new File(pluginsDir);
		if (dir.exists()) {
			String files[] = dir.list();
			for (String pluginDir : files) {
				File pluginXML = new File(pluginsDir + "/" + pluginDir + "/plugin.xml");
				if (pluginXML.exists()) {
					try {
						plugins.add(getPluginInfo(pluginXML));
					} catch (Exception e) {
						// 加载失败，忽略
						log.warn("加载cordova插件信息失败：" + pluginXML.getAbsolutePath());
						e.printStackTrace();
					}
				}
			}
		}
	}

	public void execute(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String modelPath = com.justep.filesystem.FileSystemWrapper.instance().getRealPath("/");
		String nativeDir = modelPath + "Native";
		String appName = request.getParameter("appName");
		String commonPluginsDir = nativeDir + "/plugins";
		String appPluginsDir = nativeDir + "/" + appName + "/plugins";

		JSONArray plugins = new JSONArray();
		appendPlugins(plugins, commonPluginsDir);
		appendPlugins(plugins, appPluginsDir);

		response.setCharacterEncoding("UTF-8");
		response.setContentType(ActionUtils.JSON_CONTENT_TYPE);
		OutputStream output = response.getOutputStream();
		output.write(plugins.toJSONString().getBytes("UTF-8"));
		output.flush();
		output.close();
	}

}
