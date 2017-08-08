package com.justep.studio.ui.editors.property.datasource;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

import com.justep.studio.ui.editors.xui.PropertyItem;


public class FileListDatasource {

	public List<String[]> getDatasource(PropertyItem propertyItem){
		List<String[]> list = new ArrayList<String[]>();
		String filePath = propertyItem.getOwerElement().getXuiDataModel().getFilePath();
		String fileSuffix = propertyItem.getEditorParameter();
		
		if(fileSuffix!=null && !"".equals(fileSuffix)){
			String[] fileSuffixs = fileSuffix.split(",");
			File dir = new File(filePath).getParentFile();
			findFile(list, dir, fileSuffixs,"");
		}  
		return list;
	}
	
	/**
	 * 递归子文件夹
	 * @param list 收集文件集合
	 * @param file 目录
	 * @param suffix 收集的指定后缀
	 * @param parentPath 父目录
	 */
	private static void findFile(List<String[]> list,File file,String[] suffixs,String parentPath){
		if(!"".equals(parentPath)){
			parentPath = parentPath+"/";
		}
		
		File[] fileList = file.listFiles();
		for (File fileTemp: fileList) {
			if(fileTemp.isFile()){
				inner : for(int i = 0; i < suffixs.length; i++) {
					if(fileTemp.getName().toLowerCase().endsWith(suffixs[i].toLowerCase())){
						list.add(new String[]{parentPath+fileTemp.getName(),parentPath+fileTemp.getName()});
						break inner;
					}
				}
			}
			else{
				findFile(list,fileTemp,suffixs,parentPath+fileTemp.getName());
			}
		}
		
	}
	
	
}
