package com.justep.designer.service;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.dom4j.Element;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.resources.IWorkspaceRoot;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.jface.window.Window;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.MessageBox;
import org.eclipse.ui.PlatformUI;
import org.eclipse.ui.wizards.newresource.BasicNewResourceWizard;
import org.w3c.dom.Document;
import org.xml.sax.InputSource;

import com.alibaba.fastjson.JSONArray;
import com.justep.designer.util.JsCallJavaUtil;
import com.justep.studio.StudioPlugin2;
import com.justep.studio.data.DataRecord;
import com.justep.studio.data.DataSet;
import com.justep.studio.ui.dialog.CommonSelectorDialog;
import com.justep.studio.ui.editors.util.XuiDynJavaManager;
import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.ui.editors.xui.XuiDataModel;
import com.justep.studio.ui.editors.xui.XuiElement;
import com.justep.studio.ui.editors.xui.dialog.PropertyEditorDlg;
import com.justep.studio.ui.views.ConsoleView;
import com.justep.studio.util.FileHelper;
import com.justep.studio.util.JSONUtil;
import com.justep.studio.util.StudioConfig;
import com.justep.studio.wizard.NewWFileWizardDialog;

public class TemplateService {

	
	/**
	 * 解析listView.xml
	 * @param pE
	 * @param mapList
	 */
	@SuppressWarnings("unchecked")
	private static void parseChartListConfig(org.dom4j.Element pE, List<Map<String, Object>> mapList) {
		List<org.dom4j.Element> eList = pE.elements();
		for (org.dom4j.Element e : eList) {
			String tagName = e.getName();
			String label = e.attributeValue("label");
			String value = e.attributeValue("value");
			String type = e.attributeValue("type");
			Map<String, Object> itemMap = new HashMap<String, Object>();

			if (tagName.equals("elements")) {
				itemMap.put("expanded", true);
				List<Map<String, Object>> items = new ArrayList<Map<String, Object>>();
				itemMap.put("items", items);
				parseChartTypeConfig(e, items);
				itemMap.put("label", (label != null && !label.equals("")) ? label : "");
				itemMap.put("type", (type != null && !type.equals("")) ? type : "");
			} else {
				itemMap.put("label", (label != null && !label.equals("")) ? label : "");
				itemMap.put("value", (value != null && !value.equals("")) ? value : "");
			}
			mapList.add(itemMap);
		}
	}
	/**
	 * 获取app打包服务器地址.
	 * @return
	 */
	public static String getAppBuilderServerUrl(final Map<String, Object> context) {
		return StudioConfig.getAppBuilderServerUrl();
	}

	public static void setAppBuilderServerUrl(final Map<String, Object> context) {
		String url = getRealPath((String) context.get("url"));
		StudioConfig.setAppBuilderServerUrl(url);
	}

	public static String getNativePath(final Map<String, Object> context) {
		return StudioConfig.getNativePath();
	}
	
	public static String getChartListSource(final Map<String, Object> context) {
		String path = StudioConfig.getUIPath()+"/system/templates/report/chart/config/res/listView.xml";
		try {
			org.dom4j.Document document = FileHelper.readFileAsXML(path);
			List<Map<String, Object>> items = new ArrayList<Map<String, Object>>();
			parseChartListConfig(document.getRootElement(), items);
			return JSONUtil.serialize(items);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * 解析chartType.xml
	 * 
	 * @param pE
	 * @param mapList
	 */
	@SuppressWarnings("unchecked")
	private static void parseChartTypeConfig(org.dom4j.Element pE, List<Map<String, Object>> mapList) {
		List<org.dom4j.Element> eList = pE.elements();
		for (org.dom4j.Element e : eList) {
			String tagName = e.getName();
			String label = e.attributeValue("label");
			String value = e.attributeValue("value");
			String icon = e.attributeValue("icon");
			Map<String, Object> itemMap = new HashMap<String, Object>();

			if (tagName.equals("items")) {
				itemMap.put("expanded", true);
				List<Map<String, Object>> items = new ArrayList<Map<String, Object>>();
				itemMap.put("items", items);
				parseChartTypeConfig(e, items);
				itemMap.put("label", (label != null && !label.equals("")) ? label : "");
				itemMap.put("value", (value != null && !value.equals("")) ? value : "");
			} else {
				itemMap.put("label", (label != null && !label.equals("")) ? label : "");
				itemMap.put("value", (value != null && !value.equals("")) ? value : "");
			}
			itemMap.put("icon", icon);
			mapList.add(itemMap);
		}
	}

	
	/**
	 * @param context
	 * @return
	 */
	public static String getChartTypeSource(final Map<String, Object> context) {
		String path = StudioConfig.getUIPath()+"/system/templates/report/chart/config/res/chartType.xml";
		try {
			org.dom4j.Document document = FileHelper.readFileAsXML(path);
			List<Map<String, Object>> items = new ArrayList<Map<String, Object>>();
			parseChartTypeConfig(document.getRootElement(), items);
			return JSONUtil.serialize(items);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	// xui相关后续可以废弃
	@SuppressWarnings("rawtypes")
	private static DataSet getDataSource(XuiElement currentXuiElement, final Map<String, Object> context) {
		String sMethod = (String) context.get("method");
		int idx = sMethod.lastIndexOf(".");
		String className = sMethod.substring(0, idx);
		if (className.indexOf(".") == -1) {
			className = "com.justep.studio.ui.editors.property.datasource." + className;
		}

		sMethod = sMethod.substring(idx + 1);
		if (context.get("propertyItem") == null) {
			context.put("propertyItem", "xid");
		}

		try {
			Class cls = XuiDynJavaManager.getModelClass(StudioConfig.getUIPath() + "/system/templates/common", className);
			Object obj = cls;
			if (!Modifier.isStatic(cls.getModifiers())) {
				obj = cls.newInstance();
			}
			Method method = JsCallJavaUtil.getMethod(cls, sMethod);
			if (method != null) {
				Class[] types = method.getParameterTypes();
				if (types[0].getName().contains(".PropertyItem")) {
					String propertyName = (String) context.get("propertyItem");
					if (currentXuiElement != null) {
						PropertyItem propertyItem = currentXuiElement.getPropertyList().get(0);
						if (propertyName != null) {
							propertyItem = currentXuiElement.getPropertyItem(propertyName);
						}
						return (DataSet) cls.getMethod(sMethod, types).invoke(obj, propertyItem);

					}
				} else {
					return (DataSet) cls.getMethod(sMethod, types).invoke(obj, context);
				}
			} else {
				throw new RuntimeException("类" + className + "方法" + sMethod + "不存在！");
			}

		} catch (Exception e) {
			println("获取DataSource失败：" + e.getMessage());
			e.printStackTrace();
			throw new RuntimeException(e);
		}
		return null;

	}

	private static XuiDataModel getXuiDataModel(String templateFilePath, String targetPath, String concept, String reader, String writer, String creator, String relations) {
		XuiDataModel xuiDataModel = null;
		try {
			if (templateFilePath.startsWith("$UI")) {
				templateFilePath = StudioConfig.getUIPath() + templateFilePath.substring(3);
			}
			String defaultW = "<?xml version=\"1.0\" encoding=\"utf-8\"?>" + "<div xmlns=\"http://www.w3.org/1999/xhtml\" component=\"$UI/system/components/justep/window/window\">"
					+ "  <div component=\"$UI/system/components/justep/model/model\" xid=\"model\" style=\"top:26px;height:auto;left:378px;\">"
					+ "    <div component=\"$UI/system/components/justep/data/bizData\" xid=\"mainData\"" + "      directDelete=\"true\" autoLoad=\"true\" concept=\"" + concept + "\"" + " columns=\""
					+ relations + "\">" + "      <reader action=\"" + reader + "\"/>" + "      <writer action=\"" + writer + "\"/>" + "      <creator action=\"" + creator + "\"/>" + "    </div>"
					+ "  </div>" + " </div>";
			byte[] defaultWBytes = defaultW.getBytes();
			ByteArrayInputStream is = new ByteArrayInputStream(defaultWBytes);
			InputSource source = new InputSource(is);

			DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
			DocumentBuilder builder = factory.newDocumentBuilder();
			Document doc = builder.parse(source);
			doc.normalize();

			xuiDataModel = new XuiDataModel();
			xuiDataModel.setFilePath(targetPath);
			xuiDataModel.setXmlDocument(doc);

			return xuiDataModel;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return xuiDataModel;
	}

	private static String getRealPath(String path) {
		if (path != null && path.startsWith("$UI"))
			return StudioConfig.getUIPath() + path.substring(3);
		else
			return path;
	}

	private static void executeCallback(Map<String, Object> context, String callback, String params) {
		if (callback != null) {
			context.put("callback", "window." + callback + "(" + params + ")");
		}
	}

	private static String rebuildConfigPage(String url) {
		if (url != null && url.startsWith("$UI")) {
			return StudioConfig.getRuntimeBaseUrl() + "/" + StudioConfig.getUIDirName() + url.substring(3);
		}
		return url;
	}

	public static void println(String msg) {
		ConsoleView.println("TemplateService:" + msg);
	}

	public static void closeDialog(Map<String, Object> context) {
		NewWFileWizardDialog.closeDialog();
	}

	/**
	 * 解析模板配置文件.
	 * 
	 * @param pE
	 * @param mapList
	 */
	@SuppressWarnings("unchecked")
	private static void parseTemplateConfig(org.dom4j.Element pE, List<Map<String, Object>> mapList) {
		List<org.dom4j.Element> eList = pE.elements();
		for (org.dom4j.Element e : eList) {
			String tagName = e.getName();
			String name = e.attributeValue("name");
			String text = e.attributeValue("text");
			String icon = e.attributeValue("icon");
			Map<String, Object> itemMap = new HashMap<String, Object>();

			if (tagName.equals("catalog")) {
				itemMap.put("expanded", true);
				List<Map<String, Object>> items = new ArrayList<Map<String, Object>>();
				itemMap.put("items", items);
				parseTemplateConfig(e, items);
				itemMap.put("label", (text == null || text.equals("")) ? name : text);
				itemMap.put("value", "");
			} else {
				String configPage = e.attributeValue("configPage");
				if (configPage == null || configPage.equals("")) {
					configPage = "$UI/system/templates/index/configuration.w";
				}
				configPage = configPage + (configPage.contains("?") ? "&" : "?") + "templatePath=" + e.attributeValue("path");
				if (text == null || text.equals("")) {
					int idx = configPage.lastIndexOf("/");
					if (idx != -1) {
						itemMap.put("label", configPage.substring(idx + 1));
					}
				} else {
					itemMap.put("label", text);
				}
				configPage = configPage + "&id=id_" + configPage.hashCode();
				itemMap.put("value", rebuildConfigPage(configPage));
			}
			itemMap.put("icon", icon);
			mapList.add(itemMap);
		}
	}

	public static void openXuiPropertyEditorDlg(final Map<String, Object> context) {
		String templateFilePath = (String) context.get("templateFilePath");
		String targetPath = (String) context.get("targetPath");
		String concept = (String) context.get("concept");
		String reader = (String) context.get("reader");
		String writer = (String) context.get("writer");
		String creator = (String) context.get("creator");
		String relations = (String) context.get("relations");
		String propName = (String) context.get("propName");
		XuiDataModel xuiDataModel = getXuiDataModel(templateFilePath, targetPath, concept, reader, writer, creator, relations);
		if (xuiDataModel != null) {
			XuiElement xuiElement = xuiDataModel.findElementById("mainData");
			if (xuiElement != null) {
				PropertyItem propItem = xuiElement.getPropertyItem(propName);
				PropertyEditorDlg dlg = new PropertyEditorDlg(Display.getDefault().getActiveShell()) {
					@SuppressWarnings("unchecked")
					protected boolean doApply() {
						try {
							String errMsg = this.currentDialogPage.isValid();
							if (errMsg != null) {
								MessageBox msg = new MessageBox(this.getShell());
								msg.setText("提示信息");
								msg.setMessage(errMsg);
								msg.open();
								return false;
							}

							Map<String, String> map = (Map<String, String>) this.currentDialogPage.getReturnValue();
							if (map != null) {
								Iterator<String> it = map.keySet().iterator();
								while (it.hasNext()) {
									String propertyName = it.next();
									String value = map.get(propertyName);

									XuiDataModel dataModel = this.currentPropertyItem.getOwerElement().getXuiDataModel();
									dataModel.setPropertyValue(this.currentPropertyItem.getOwerElement(), propertyName, value);
								}
							}
							String callBack = (String) context.get("callback");// js回调
							if (callBack != null && !callBack.equals("")) {
								TemplateService.executeCallback(context, callBack, JSONUtil.serialize(map));
							}

						} catch (Exception e) {
							e.printStackTrace();
						}
						return true;
					}

				};
				dlg.setPropertyItem(propItem);
				dlg.open();
			}
		}
	}

	@SuppressWarnings("unchecked")
	public static void openSwtCommonSelectorDialog(final Map<String, Object> context) {
		Map<String, Object> datasouceConfig = (Map<String, Object>) context.get("datasource");
		if (datasouceConfig == null) {
			println("datasource参数为定义！");
			return;
		}

		String templateFilePath = (String) context.get("templateFilePath");
		String targetPath = (String) context.get("targetPath");
		String concept = (String) context.get("concept");
		String reader = (String) context.get("reader");
		String writer = (String) context.get("writer");
		String creator = (String) context.get("creator");
		String relations = (String) context.get("relations");

		XuiDataModel xuiDataModel = getXuiDataModel(templateFilePath, targetPath, concept, reader, writer, creator, relations);
		XuiElement currentXuiElement = xuiDataModel.findElementById("mainData");
		DataSet ds = getDataSource(currentXuiElement, datasouceConfig);

		String title = (String) context.get("title");
		Boolean mutiSelect = (Boolean) datasouceConfig.get("mutiSelect");
		mutiSelect = (mutiSelect == null || mutiSelect == false) ? false : true;
		String treeCol = ds.getTreeColumnName();
		boolean isTree = treeCol != null && !treeCol.equals("");
		CommonSelectorDialog dlg = new CommonSelectorDialog(Display.getDefault().getActiveShell(), mutiSelect, isTree, title);

		List<String> excludeList = (List<String>) datasouceConfig.get("excludeList");
		String excludeField = (String) datasouceConfig.get("excludeField");
		if (excludeList != null && excludeField != null) {
			ds.removeByCondition("alias", null, excludeList);
		}
		dlg.setDataSet(ds);
		dlg.setInitialSize(580, 600);
		if (isTree) {
			// dlg.getCommonSelectorComposite().getTreeViewer().getTree().setLinesVisible(false);
			// dlg.getCommonSelectorComposite().getTreeViewer().expandAll();
		}
		dlg.open();
		List<Object> resultList = new ArrayList<Object>();
		if (dlg.getReturnCode() == Window.OK) {
			List<DataRecord> list = dlg.getSelections();

			for (int i = 0; i < list.size(); i++) {
				DataRecord record = list.get(i);
				record.toMap();
				resultList.add(record.toMap());
			}

			String callBack = (String) context.get("callback");// js回调
			if (callBack != null && !callBack.equals("")) {
				TemplateService.executeCallback(context, callBack, JSONUtil.serialize(resultList));
			}
		}
	}
	@SuppressWarnings("unchecked")
	public static String getTemplateConfigCatalog(final Map<String, Object> context) {
		List<String> list = StudioConfig.getTemplateRegFileList();
		org.dom4j.Document document = null;
		try {
			String parent = list.get(0);// 父文件路径
			document = FileHelper.readFileAsXML(parent);
			Element parentElement = document.getRootElement();// 父文件根节点
			Map<String, Element> parentMap = new HashMap<String, Element>();
			for (Iterator<Element> it = parentElement.elementIterator(); it.hasNext();) {
				Element element = it.next();
				parentMap.put(element.attributeValue("name"), element);
			}
			for (String path : list) {
				if (!parent.equals(path)) {
					org.dom4j.Document doc = FileHelper.readFileAsXML(path);
					org.dom4j.Element detailEle = doc.getRootElement();
					for (Iterator<org.dom4j.Document> it = detailEle.elementIterator(); it.hasNext();) {
						org.dom4j.Element element = (org.dom4j.Element) it.next();
						if ("catalog".equals(element.getName())) {
							if (parentMap.get(element.attributeValue("name")) != null) {
								List<org.dom4j.Element> eList = element.elements();
								for (org.dom4j.Element e : eList) {
									parentMap.get(element.attributeValue("name")).add(e.detach());
								}
							} else {
								parentElement.add(element.detach());
							}
						}
					}
				}
			}
			// 对合并后的template.xml中三级节点进行倒序排列
			Map<String, List<Element>> map = new HashMap<String, List<Element>>();
			Map<String, List<Element>> noOrderMap = new HashMap<String, List<Element>>();
			for (Iterator<Element> it = parentElement.elementIterator(); it.hasNext();) {
				Element secondEle = it.next();
				List<Element> listEles = new ArrayList<Element>();
				List<Element> noOrderList = new ArrayList<Element>();
				for (Iterator<Element> iterator = secondEle.elementIterator(); iterator.hasNext();) {
					Element e = iterator.next();
					try {

						String order = e.attributeValue("order");
						if (order != null && !"".equals(order.trim())) {
							try {
								Integer.parseInt(order);
								listEles.add(e);
							} catch (Exception e2) {
								noOrderList.add(e);
							}
						} else {
							noOrderList.add(e);
						}
					} catch (Exception e2) {
						noOrderList.add(e);
					}
					secondEle.remove(e);
				}
				Collections.sort(listEles, new Comparator<Element>() {
					public int compare(Element o1, Element o2) {
						return Integer.parseInt(o2.attributeValue("order")) - Integer.parseInt(o1.attributeValue("order"));
					}
				});
				map.put(secondEle.attributeValue("name"), listEles);
				noOrderMap.put(secondEle.attributeValue("name"), noOrderList);
			}
			// //对二级目录进行排序
			List<Element> secondList = new ArrayList<Element>();
			List<Element> noOrderSecondList = new ArrayList<Element>();
			for (Iterator<Element> iterator = parentElement.elementIterator(); iterator.hasNext();) {
				Element element = iterator.next();
				try {
					String order = element.attributeValue("order");
					if (order != null && !"".equals(order.trim())) {
						try {
							Integer.parseInt(order);
							secondList.add(element);
						} catch (Exception e2) {
							noOrderSecondList.add(element);
						}
					} else {
						noOrderSecondList.add(element);
					}
				} catch (Exception e) {
					noOrderSecondList.add(element);
				}
				parentElement.remove(element);
			}
			Collections.sort(secondList, new Comparator<Element>() {
				public int compare(Element o1, Element o2) {
					return Integer.parseInt(o2.attributeValue("order")) - Integer.parseInt(o1.attributeValue("order"));
				}
			});
			for (Element element : secondList) {
				parentElement.add(element.detach());
			}
			for (Element element : noOrderSecondList) {
				parentElement.add(element.detach());
			}
			for (Entry<String, List<Element>> entry : map.entrySet()) {
				String key = (String) entry.getKey();
				Element e = parentMap.get(key);
				List<Element> lElements = map.get(key);
				for (Element element : lElements) {
					e.add(element.detach());
				}
				for (Element element : noOrderMap.get(key)) {
					e.add(element.detach());
				}
			}

		} catch (Exception e1) {
			println("template.xml配置错误11," + e1.getMessage());
		}
		StringBuffer sbf = new StringBuffer();
		// List<String> list = new ArrayList<String>();
		// list.add("D:\\trunk\\X5.3.0.3326_trunk\\model\\UI2\\system\\templates\\simple\\template.config.xml");
		// for (String path : list) {
		try {
			// org.dom4j.Document doc = FileHelper.readFileAsXML(path);
			List<Map<String, Object>> items = new ArrayList<Map<String, Object>>();
			parseTemplateConfig(document.getRootElement(), items);
			return JSONUtil.serialize(items);
		} catch (Exception e) {
			println("模版类型定义信息读取失败，错误信息：" + e.getMessage());
			e.printStackTrace();
			return sbf.toString();
		}
		// }
	}

	/**
	 * 打开w文件
	 * 
	 * @param context
	 */
	public static void openWFile(final Map<String, Object> context) {
		Display.getDefault().asyncExec(new Runnable() {
			public void run() {
				String filePath = (String) context.get("filePath1");
				if (filePath != null) {
					filePath = filePath.replace("\\", "/");
					int idx = filePath.indexOf("/" + StudioConfig.getUIDirName() + "/");
					if (idx != -1) {
						filePath = filePath.substring(idx);
					}
					StudioPlugin2.openFileInEditor(filePath, "com.justep.studio.ui.editors.XuiMutiPageEditorPart");
				}
			}
		});
	}

	public static String readFile(final Map<String, Object> context) {
		String filePath = "";
		try {
			filePath = getRealPath((String) context.get("filePath1"));
			return FileHelper.readFileAsStr(filePath, "\n", false, "UTF-8");
		} catch (Exception e) {
			println("读取文件失败，文件名：" + filePath + "  错误信息：" + e.getMessage());
			e.printStackTrace();
			return null;
		}
	}

	public static boolean writeFile(final Map<String, Object> context) {
		String filePath = "";
		try {
			filePath = getRealPath((String) context.get("filePath1"));
			return FileHelper.writeFile(filePath, (String) context.get("content"), "UTF-8");
		} catch (Exception e) {
			println("写入文件失败，文件名：" + filePath + "  错误信息：" + e.getMessage());
			e.printStackTrace();
			return false;
		}
	}

	public static boolean fileExists(final Map<String, Object> context) {
		String filePath = getRealPath((String) context.get("filePath1"));
		File file = new File(filePath);
		return file.exists();
	}

	private static void realCopyResourceFiles(final String rootTemplatePath, final String templatePath, final String targetPath, final List<String> excludeFiles) {
		String[] files = new File(templatePath).list();
		if (files != null) {
			for (int i = 0; i < files.length; i++) {
				String filePath = templatePath + "/" + files[i];
				if (excludeFiles.indexOf(filePath.substring(rootTemplatePath.length() + 1)) != -1) {
					continue;
				}

				File file = new File(filePath);
				if (files[i].matches("\\.svn|\\.nocompile")) {
					continue;
				}

				if (file.isFile()) {
					FileHelper.copyfile(file.getAbsolutePath(), targetPath);
				} else {
					String subTargetPath = targetPath + "/" + files[i];
					File dir = new File(subTargetPath);
					if (!dir.exists()) {
						dir.mkdir();
					}
					realCopyResourceFiles(rootTemplatePath, filePath, subTargetPath, excludeFiles);
				}
			}
		}
	}

	@SuppressWarnings("unchecked")
	public static void copyResourceFiles(final Map<String, Object> context) {
		String templatePath = getRealPath((String) context.get("templatePath"));
		String targetPath = getRealPath((String) context.get("targetPath"));
		List<String> excludeFiles = (List<String>) context.get("excludeFiles");

		realCopyResourceFiles(templatePath, templatePath + "/template", targetPath, excludeFiles);
	}

	/**
	 * 刷新文件或者目录.
	 * @param context
	 */
	public static void refreshFile(final Map<String, Object> context) {
		Display.getDefault().asyncExec(new Runnable() {
			public void run() {
				String path = getRealPath((String) context.get("targetPath"));
				path = path.substring(StudioConfig.getModelPath().length());
				IWorkspaceRoot root = ResourcesPlugin.getWorkspace().getRoot();
				IResource resource = root.findMember(new org.eclipse.core.runtime.Path(path));
				try {
					resource.refreshLocal(IResource.DEPTH_INFINITE, null);
				} catch (CoreException e) {
					println("刷新目录失败！刷新路径：" + path + " 错误信息：" + e.getMessage());
					e.printStackTrace();
				}
			}
		});
	}
	
	/**
	 * 选中文件或者目录.
	 * @param context
	 */
	public static void selectFile(final Map<String,Object> context){
		Display.getDefault().asyncExec(new Runnable() {
			public void run() {
				String path = getRealPath((String) context.get("targetPath"));
				try {
					path = path.substring(StudioConfig.getModelPath().length());
					IWorkspaceRoot root = ResourcesPlugin.getWorkspace().getRoot();
					IResource resource = root.findMember(new org.eclipse.core.runtime.Path(path));
					BasicNewResourceWizard.selectAndReveal(resource,  PlatformUI.getWorkbench().getActiveWorkbenchWindow());
				} catch (Exception e) {
					println("选中目录出错！path：" + path + " 错误信息：" + e.getMessage());
					e.printStackTrace();
				}
			}
		});
		
	}

	/**
	 * 获取UI下的所有应用名称.
	 * 
	 * @param context
	 * @return
	 */
	public static String getAllAppNames(Map<String, Object> context) {
		JSONArray array = new JSONArray();
		File bizDir = new File(StudioConfig.getUIPath());
		File[] files = bizDir.listFiles();
		for (File file : files) {
			String name = file.getName();
			if (file.isFile() || name.startsWith(".") || name.endsWith("_X")) {
				continue;
			}
			array.add(name);
		}
		return array.toJSONString();
	}
}
