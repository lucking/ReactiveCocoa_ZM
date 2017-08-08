package com.justep.studio.ui.editors.propertypage;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.eclipse.core.resources.IContainer;
import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.resources.IWorkspaceRoot;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.Path;
import org.eclipse.swt.SWT;
import org.eclipse.swt.events.ModifyEvent;
import org.eclipse.swt.events.ModifyListener;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.graphics.Color;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Combo;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Text;

import com.justep.studio.ui.editors.xui.IPropertyDialogPage;
import com.justep.studio.ui.editors.xui.IPropertyValueStrategy;
import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.ui.editors.xui.XuiElement;
import com.justep.studio.ui.views.ConsoleView;
import com.justep.studio.util.FileHelper;
import com.justep.studio.util.StudioConfig;

public class CreateExcelDialog extends Composite implements IPropertyDialogPage {

	private Text fileText;
	private Combo containerCombo;
	private Label label;

	private boolean passValidate;

	public CreateExcelDialog(Composite parent, int style) {
		super(parent, style);
		setLayout(new GridLayout());
		final Composite composite = new Composite(this, SWT.NONE);
		composite.setLayout(new GridLayout(2, false));
		composite.setLayoutData(new GridData(SWT.FILL, SWT.CENTER, true, false));

		label = new Label(composite, SWT.NONE);
		label.setText("新建EXCEL文件");
		
		GridData gridData = new GridData(SWT.FILL, SWT.CENTER, true, false);
		gridData.horizontalSpan = 2;
		label.setLayoutData(gridData);
		label.setForeground(new Color(null, 0, 0, 0));

		final Label locationLabel = new Label(composite, SWT.NONE);
		locationLabel.setText("路径:");

		containerCombo = new Combo(composite, SWT.NONE | SWT.READ_ONLY);
		final GridData data = new GridData(SWT.FILL, SWT.CENTER, true, false);
		containerCombo.setLayoutData(data);

		containerCombo.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent arg0) {
				validate();
			}
		});

		final Label projectLabel = new Label(composite, SWT.NONE);
		projectLabel.setText("名称:");

		fileText = new Text(composite, SWT.BORDER);
		fileText.setText("new_xls");
		final GridData data_1 = new GridData(SWT.FILL, SWT.CENTER, true, false);

		fileText.addModifyListener(new ModifyListener() {
			public void modifyText(ModifyEvent arg0) {
				validate();
			}
		});
		fileText.setLayoutData(data_1);
		setSize(400, 220);
	}

	private void validate() {
		fileName = fileText.getText();
		if (fileName.length() == 0) {
			passValidate = false;
			errMsg = "文件名不能为空！";
			updateStatus(passValidate, errMsg);
			return;
		}

		if (fileName.replace('\\', '/').indexOf('/', 1) > 0) {
			passValidate = false;
			errMsg = "文件名不合法！";
			updateStatus(passValidate, errMsg);
			return;
		}

		/* Validates the file extension */
		int dotLoc = fileName.lastIndexOf('.');
		if (dotLoc != -1) {
			String las = fileName.substring(dotLoc, fileName.length());
			if (!las.equals(".xml")) {
				passValidate = false;
				errMsg = "文件扩展名应为 \".xml\"";
				updateStatus(passValidate, errMsg);
				return;
			}
		}

		fileName = fileName.contains(".") ? fileName : fileName + ".xml";

		String path = containerCombo.getItem(containerCombo.getSelectionIndex());

		IWorkspaceRoot root = ResourcesPlugin.getWorkspace().getRoot();
		IResource xlsFile = root.findMember(new Path(path + "/" + fileName));
		if (xlsFile != null && xlsFile.exists()) {
			passValidate = false;
			errMsg = "文件\"" + fileName + "\"已存在！ ";
//			updateStatus(passValidate, errMsg);
			return;
		}

		passValidate = true;
		errMsg = null;
		updateStatus(passValidate, "新建Excel文件");
	}

	private void updateStatus(boolean b, String string) {
		if (b) {
			label.setForeground(new Color(null, 0, 0, 0));
		} else {
			label.setForeground(new Color(null, 255, 0, 0));
		}
		label.setText(string);
	}

	private PropertyItem propertyItem;
	private String fileName;
	private String errMsg;
	private String parentPath;

	public Object getReturnValue() {
		Map<String, String> map = new HashMap<String, String>();
		if (passValidate) {
			String path = containerCombo.getItem(containerCombo.getSelectionIndex());
			IWorkspaceRoot root = ResourcesPlugin.getWorkspace().getRoot();
			IResource resource = root.findMember(new Path(path));
			IContainer container = (IContainer) resource;
			IFile file = container.getFile(new Path(fileName));
			//创建文件
			InputStream stream = null;
			try {
				FileHelper.copyfile(StudioConfig.getStudioConfigBasePath() + "/newXLSTemplate.xlsx", file.getLocation().toFile().getParentFile()
						.getAbsolutePath(), fileName.replace(".xml", ".xlsx"));
				container.refreshLocal(1, null);
				
				FileHelper.copyfile(StudioConfig.getStudioConfigBasePath() + "/newXLSTemplate.xml", file.getLocation().toFile().getParentFile()
						.getAbsolutePath(), fileName);
				container.refreshLocal(1, null);
				//				stream = NewXLSFileWizard.openContentStream(null);
				//				file.create(stream, true, null);
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				if (stream != null) {
					try {
						stream.close();
					} catch (IOException e) {
						e.printStackTrace();
					}
				}

				path = path + "/";
				ConsoleView.println(path);
				ConsoleView.println(parentPath);
				String addPath = path.replace(parentPath, "");
				map.put(this.propertyItem.getName(), addPath+this.fileName);

				/**
				 * 刷新src列表
				 */
				////	propertyItem.
				((XuiElement) (propertyItem.getOwerElement())).getXuiDataModel().getDesigner().getEditorPart().getPropertyEditor()
						.refreshPropertyEditor(propertyItem.getName());
			}
		}
		validate();
		return map;
	}

	public String isValid() {
		return this.errMsg;
	}

	public void setPropertyItem(PropertyItem propertyItem) {
		this.propertyItem = propertyItem;
		String filePath = propertyItem.getOwerElement().getXuiDataModel().getFilePath();
		File parentFile = new File(filePath).getParentFile();

		parentPath = parentFile.getPath().replace("\\", "/").replace("\\\\", "/") + "/";

		String uiSrcPath = StudioConfig.getUIPath();
		parentPath = "/" +StudioConfig.getUIDirName()+ parentPath.replace(uiSrcPath, "");

		uiSrcPath = uiSrcPath.substring(0, uiSrcPath.lastIndexOf("/"));
		List<String> pathList = new ArrayList<String>();
		LinkedList<File> fileList = new LinkedList<File>();
		fileList.add(parentFile);
		
		while (!fileList.isEmpty()) {
			File f1 = fileList.removeLast();
			if (f1.isDirectory() && !f1.getName().startsWith(".")) {
				String tempFilePath = f1.getPath().replace("\\", "/").replace("\\\\", "/");
				tempFilePath = tempFilePath.replace(uiSrcPath, "");
				pathList.add(tempFilePath);
				File[] files = f1.listFiles();
				for (File f2 : files) {
					fileList.add(f2);
				}
			}
		}
		
		containerCombo.setItems(pathList.toArray(new String[pathList.size()]));
		containerCombo.select(0);
		fileText.setFocus();
		fileText.selectAll();
		validate();
	}

	public void setReturnValueStrategy(IPropertyValueStrategy arg0) {

	}

}
