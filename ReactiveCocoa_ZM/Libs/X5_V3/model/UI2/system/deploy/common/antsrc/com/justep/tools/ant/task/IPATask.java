package com.justep.tools.ant.task;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
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

import com.dd.plist.NSDictionary;
import com.dd.plist.NSString;
import com.dd.plist.PropertyListParser;

public class IPATask extends Task {

	private String appPath;
	private String appName;
	private String version;
	private String packageName;
	private String startURL;

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
		try {
			File file = new File(this.appPath + "/Info.plist");
			NSDictionary root = (NSDictionary) PropertyListParser.parse(file);
			NSString node;
			// 设置应用名
			node = (NSString) root.objectForKey("CFBundleDisplayName");
			node.setContent(appName);
			node = (NSString) root.objectForKey("CFBundleName");
			node.setContent(appName);

			// 设置版本号
			node = (NSString) root.objectForKey("CFBundleVersion");
			node.setContent(version);
			node = (NSString) root.objectForKey("CFBundleShortVersionString");
			node.setContent(version);

			// 设置默认打开的页面
			SAXReader xReader = new SAXReader();
			String configXMLPath = this.appPath + "/config.xml";
			InputStreamReader isr = new InputStreamReader(new FileInputStream(configXMLPath), "UTF-8");
			Document config = xReader.read(isr);
			Element e = (Element) config.selectSingleNode("//widget");
			e.element("content").attribute("src").setValue(startURL);

			OutputStreamWriter osw = new OutputStreamWriter(new FileOutputStream(configXMLPath), "UTF-8");
			XMLWriter writer = new XMLWriter(osw, OutputFormat.createPrettyPrint());
			writer.write(config);
			writer.close();

			// 设置名空间，唯一标识app
			if (packageName != null && packageName.equals("")) {
				packageName = "com.justep.x5" + Math.abs(UUID.randomUUID().hashCode());
			}
			node = (NSString) root.objectForKey("CFBundleIdentifier");
			node.setContent(packageName);

			PropertyListParser.saveAsBinary(root, file);
		} catch (Exception e) {
			throw new BuildException(e);
		}
	}
}