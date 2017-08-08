package com.justep.studio.ui.editors.property.datasource;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.justep.design.model.ModelConstant;
import com.justep.studio.data.DSUtil;
import com.justep.studio.data.DataSet;
import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.ui.editors.xui.XuiElement;
import com.justep.studio.util.FileHelper;

/**
 * 
 * @author linhongbao
 *
 */
public class CSSClassDatasource extends PropertyDatasource {

	public DataSet getDatasource(PropertyItem propertyItem) {
		String oldClass = propertyItem.getValue();
		String wFilePath = ((XuiElement) propertyItem.getOwerElement()).getXuiDataModel().getFilePath();
		String cssFilePath = wFilePath.substring(0, wFilePath.lastIndexOf(".")) + ".css";
		DataSet dataSet = createHasRelationDataSet();

		List<String> addClassList = new ArrayList<String>();
		if (oldClass != null && oldClass.length() > 0) {
			String[] oldClassArr = oldClass.split(" ");
			for (String string : oldClassArr) {
				if (string.length() > 0) {
					if (!addClassList.contains(string)) {
						dataSet.addRecord(new Object[] { true, string });
						addClassList.add(string);
					}
				}
			}
		}
		String cssContext = FileHelper.readFileAsStr(cssFilePath, "\n", false);
		//TODO 获取class 有待完善
		Pattern pattern = Pattern.compile("[.]([^{^}^ ]+)[ \\n]*[{][^{^}]*[}]");
		Matcher matcher = pattern.matcher(cssContext);
		while (matcher.find()) {
			String findName = matcher.group(1);
			if (!addClassList.contains(findName)) {
				dataSet.addRecord(new Object[] { false, findName });
				addClassList.add(findName);
			}
		}
		return dataSet;
	}

	public DataSet createHasRelationDataSet() {
		DataSet ds = new DataSet();
		DSUtil.createSelectedColumn(ds);
		DSUtil.createColumn(ds, ModelConstant.NAME, "名称", "string", true, true, 300).setImage("Css.gif")
				.setDisenableFilterCondition("selected==true");
		return ds;
	}
}
