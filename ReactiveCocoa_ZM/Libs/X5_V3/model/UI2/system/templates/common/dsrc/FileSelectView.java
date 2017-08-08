import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.justep.ui.impl.JProcessorImpl;

public class FileSelectView extends JProcessorImpl {
	static Map<String,String> imgMap;
	static Set<String> imgs =  null;
	static int num = 0;
	static{
		imgMap = new HashMap<String,String>();
		imgMap.put(".w", "w.gif");
		imgMap.put(".css", "css.gif");
		imgMap.put(".js", "js.gif");
		imgMap.put(".xml", "xml.gif");
		imgMap.put(".config.xml", "config.xml.gif");
		imgMap.put(".action.m", "action.gif");
		imgMap.put(".mapping.m", "mapping.gif");
		imgMap.put(".ontology.m", "ontology.gif");
		imgMap.put(".process.m", "P.gif");
		imgs = imgMap.keySet();
	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		run(request,response);
	}
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		run(request,response);
	}
	private void run(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
		num = 0;
		String postData = JProcessorImpl.getPostData(request);
		JSONObject object = JSONObject.parseObject(postData);
		//查询起始目录
		String extendConfigCatalog = object.get("extendConfigCatalog").toString();
		//选择的文件类型	
		String[] types = {};
		Object type = object.get("checkType");
		if (type != null) {
			types = getTyeps(type.toString());
		}
		Object queryValue = object.get("queryValue");
		response.setCharacterEncoding("UTF-8");
		String ExtendConfig = null;
		if (queryValue == null || "".equals(queryValue) || "".equals(queryValue.toString().trim())) {
			ExtendConfig = getExtendConfig(extendConfigCatalog, types);
		} else {
			ExtendConfig = getExtendConfig(extendConfigCatalog, types, queryValue.toString());
		}
		response.getWriter().write(ExtendConfig);
		response.flushBuffer();
	}
	private String getExtendConfig(String extendConfigCatalog, String[] types) {
		return refreshFileList(extendConfigCatalog, types).toString();
	}

	private String getExtendConfig(String extendConfigCatalog, String[] types, String queryValue) {
		JSONObject object = new JSONObject();
		JSONObject data = new JSONObject();
		object.put("data", data);
		data.put("@type", "table");
		JSONArray rows = new JSONArray();
		data.put("rows", rows);
		int rootDirLength = getRootDirLent(extendConfigCatalog)+1;
		refreshFileList(extendConfigCatalog, types, queryValue, rows,rootDirLength);
		return object.toString();
	}
	private void refreshFileList(String strPath, String[] types, String queryValue, JSONArray rows,int rootDirLength) {
		File dir = new File(strPath);
		File[] files = dir.listFiles();
		if (files == null)
			return;
		for (int i = 0; i < files.length; i++) {
			JSONObject row = new JSONObject();
			JSONObject col = new JSONObject();
			row.put("colValue", col);
			File file = files[i];
			String fileName = file.getName();
			if (!fileName.startsWith(".")) {
				if (file.isDirectory()) {
					if (types.length == 0) {
						if (fileName.contains(queryValue)) {
							num++;
							putGridItem(col, file, queryValue, "img/folder.gif",rootDirLength);
							rows.add(row);
						}
					} else {
						for (int j = 0; j < types.length; j++) {
							String type = types[j].trim();
							if ("".equals(type)) {
								if (fileName.contains(queryValue)) {
									num++;
									putGridItem(col, file, queryValue, "img/folder.gif",rootDirLength);
									rows.add(row);
								}
								break;
							}
						}
					}
					refreshFileList(files[i].getAbsolutePath(), types, queryValue, rows,rootDirLength);
				} else if (fileName.contains(queryValue)) {
					for (int j = 0; j < types.length; j++) {
						String type = types[j].trim();
						if ("".equals(type)) {
							continue;
						} else if (fileName.endsWith(type.replace("*", "")) || "*.*".equals(type)) {
							num++;
							String iconPath = getIconPathPath(fileName);
							putGridItem(col, file, queryValue, iconPath,rootDirLength);
							rows.add(row);
							break;
						}
					}
				}
			}
		}
	}

	private void putGridItem(JSONObject col, File file, String queryValue, String iconPath,int rootDirLength) {
		col.put("value",
				"<img src='"
						+ iconPath
						+ "'/>"
						+ file.getAbsolutePath().replaceAll("\\\\", "/").substring(rootDirLength)
								.replaceAll(queryValue, "<font color='green';>" + queryValue + "</font>"));
	}
	/*
	 * 得到所有后缀的集合
	 */
	private String[] getTyeps(String str) {
		str = str + " ";
		String[] strs = str.split(";");
		return strs;
	}

	private JSONArray refreshFileList(String strPath, String[] types) {
		JSONArray list = new JSONArray();
		JSONObject map = null;
		File dir = new File(strPath);
		File[] files = dir.listFiles();
		if (files == null)
			return null;
		for (int i = 0; i < files.length; i++) {
			File file = files[i];
			String fileName = file.getName();
			if (!fileName.startsWith(".")) {
				map = new JSONObject();
				if (file.isDirectory()) {
					putTreeItem(map, file, "img/folder.gif");
					JSONArray items = refreshFileList(files[i].getAbsolutePath(), types);
					if (items.size() > 0) {
						JSONArray jsonArray = new JSONArray();
						JSONObject jsonObject = new JSONObject();
						jsonObject.put("label", "Loading...");
						jsonObject.put("value", file.getAbsolutePath().replaceAll("\\\\", "/"));
						jsonArray.add(jsonObject);
						map.put("items", jsonArray);
					}
				} else {
					//没有传递类型只显示目录
					for (int j = 0; j < types.length; j++) {
						String type = types[j].trim();
						if ("".equals(type)) {
							continue;
						} else if (fileName.endsWith(type.replace("*", "")) || "*.*".equals(type)) {
							String iconPath = getIconPathPath(fileName);
							putTreeItem(map, file, iconPath);
							break;
						}
					}
				}
				if (map.size() > 0)
					list.add(map);
			}
		}
		return list;
	}
	private void putTreeItem(JSONObject map, File file, String iconPath) {
		map.put("value", file.getAbsolutePath().replaceAll("\\\\", "/"));
		map.put("label", file.getName());
		map.put("icon", iconPath);
	}
	private int getRootDirLent(String rootDir){
		return new File(rootDir).getParent().length();
	}
	private String getIconPathPath(String fileName){
		for(String img : imgs){
			if(fileName.endsWith(img)){
				return "img/"+imgMap.get(img);
			}
		}
		return "img/file.gif";
	}
}