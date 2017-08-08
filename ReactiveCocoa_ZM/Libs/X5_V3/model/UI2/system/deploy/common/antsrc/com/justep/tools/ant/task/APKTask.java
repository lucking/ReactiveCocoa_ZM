package com.justep.tools.ant.task;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.UUID;

import org.apache.tools.ant.BuildException;
import org.apache.tools.ant.Task;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.SAXReader;
import org.dom4j.io.XMLWriter;

public class APKTask extends Task {

	private String appPath;
	private String appName;
	private String version;
	private String packageName;
	private String startURL;

	private void replaceFileText(final String filePath, String srcStr, String replaceStr) throws FileNotFoundException, IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(filePath)));
		StringBuffer sb = new StringBuffer();
		String str = null;
		while ((str = br.readLine()) != null)
			sb.append(str + "\r\n");
		FileOutputStream file = new FileOutputStream(filePath);
		file.write(sb.toString().replaceAll(srcStr, replaceStr).getBytes());
		br.close();
		file.close();
	}

	public void setAppPath(String appPath) {
		this.appPath = appPath;
	}

	public void setAppName(String appName) {
		this.appName = appName;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public void setPackageName(String packageName) {
		this.packageName = packageName;
	}

	public void setStartURL(String startURL) {
		this.startURL = startURL;
	}

	public void execute() throws BuildException {
		InputStreamReader isr;
		Element e;
		OutputStreamWriter osw;
		XMLWriter writer;
		SAXReader xReader = new SAXReader();
		try {
			// 设置应用名
			String stringXMLPath = appPath + "/res/values/strings.xml";
			isr = new InputStreamReader(new FileInputStream(stringXMLPath), "UTF-8");
			Document values = xReader.read(isr);
			e = (Element) values.selectSingleNode("//resources/string[@name='app_name']");
			e.setText(appName);

			osw = new OutputStreamWriter(new FileOutputStream(stringXMLPath), "UTF-8");
			writer = new XMLWriter(osw, OutputFormat.createPrettyPrint());
			writer.write(values);
			writer.close();

			// 设置版本号，这里仅替换了显示值，versionCode未替换
			final String apktoolymlPath = appPath + "/apktool.yml";
			replaceFileText(apktoolymlPath, "versionName: 5.3.0", "versionName: " + version);

			// 设置默认打开的页面
			String configXMLPath = appPath + "/res/xml/config.xml";
			isr = new InputStreamReader(new FileInputStream(configXMLPath), "UTF-8");
			Document config = xReader.read(isr);
			e = (Element) config.selectSingleNode("//widget");
			e.element("content").attribute("src").setValue(startURL);

			osw = new OutputStreamWriter(new FileOutputStream(configXMLPath), "UTF-8");
			writer = new XMLWriter(osw, OutputFormat.createPrettyPrint());
			writer.write(config);
			writer.close();

			// 设置名空间，唯一标识app
			final String x5smaliPath = appPath + "/smali/com/justep/x5/v3/X5.smali";

			String androidManifestXMLPath = appPath + "/AndroidManifest.xml";
			isr = new InputStreamReader(new FileInputStream(androidManifestXMLPath), "UTF-8");
			Document androidManifest = xReader.read(isr);
			e = androidManifest.getRootElement();
			if (packageName != null && packageName.equals("")) {
				packageName = "com.justep.x5" + Math.abs(UUID.randomUUID().hashCode());
			}
			e.attribute("package").setValue(packageName);

			osw = new OutputStreamWriter(new FileOutputStream(androidManifestXMLPath), "UTF-8");
			writer = new XMLWriter(osw, OutputFormat.createPrettyPrint());
			writer.write(androidManifest);
			writer.close();

			replaceFileText(x5smaliPath, "com/justep/x5/v3", packageName.replace(".", "/"));
		} catch (Exception ex) {
			throw new BuildException(ex);
		}
	}
}