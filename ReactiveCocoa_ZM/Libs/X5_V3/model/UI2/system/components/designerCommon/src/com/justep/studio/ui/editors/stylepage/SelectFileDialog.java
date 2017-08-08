package com.justep.studio.ui.editors.stylepage;

import org.eclipse.swt.widgets.FileDialog;
import org.eclipse.swt.widgets.Shell;

import com.justep.studio.util.StudioConfig;

public class SelectFileDialog {

	private FileDialog dlg = null;
	private Shell shell;
	private String fileName = "";
	private String types;
	private int deep;

	public SelectFileDialog(Shell parent, String types, int deep) {
		this.shell = parent;
		this.types = types;
		this.deep = deep;
	}

	private void createDialog() {
		this.dlg = new FileDialog(this.shell);
		if (types != null && !types.trim().equals("")) {
			String[] exts = types.trim().split(";");
			this.dlg.setFilterExtensions(exts);
		}
		this.dlg.setFilterPath(StudioConfig.getBIZPath());
	}

	public void open() {
		if (this.dlg == null) {
			this.createDialog();
		}
		String fillPath = this.dlg.open();
		if (fillPath != null) {
			fillPath = fillPath.replaceAll("\\\\", "/");
			if (fillPath.indexOf(StudioConfig.getBIZPath()) == -1) {
				this.fileName = fillPath;
			} else {
				this.fileName = fillPath.replace(StudioConfig.getBIZPath() + "/", "");
				String deepStr = "";
				for (int i = 0; i < this.deep; i++) {
					deepStr += "./";
				}
				this.fileName = deepStr + this.fileName;
			}
		}
	}

	public String getReturnValue() {
		return fileName;
	}

}
