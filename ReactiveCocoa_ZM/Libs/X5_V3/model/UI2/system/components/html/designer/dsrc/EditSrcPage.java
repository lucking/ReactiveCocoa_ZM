import java.util.HashMap;
import java.util.Map;

import org.eclipse.swt.widgets.FileDialog;
import org.eclipse.swt.widgets.Shell;

import com.justep.studio.ui.editors.xui.IPropertyDialog;
import com.justep.studio.ui.editors.xui.IPropertyValueStrategy;
import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.util.StudioConfig;


public class EditSrcPage implements IPropertyDialog{
	private FileDialog dlg = null; 
	private Shell shell;  
	private PropertyItem propertyItem;
	private String fileName;
	private String errMsg;
	public EditSrcPage(Shell parent) {
		this.shell = parent;

	}
	
	private void createDialog(){
		this.dlg = new FileDialog(this.shell);
		String param = this.propertyItem.getEditorParameter();
		if(param!=null&&!param.trim().equals("")){
			String[] exts = param.trim().split(";");
			this.dlg.setFilterExtensions(exts);
		}
		this.dlg.setFilterPath(StudioConfig.getUIPath());
	}

	public void open() {
		if(this.dlg==null){
			this.createDialog();
		}
		String fillPath = this.dlg.open();
		this.fileName = fillPath.replace("\\", "/");
		if(this.fileName.indexOf(StudioConfig.getUIPath())==-1){ 
			this.errMsg = "请选择UI目录下文件";
			return;
		}
		this.fileName="$UI"+this.fileName.replace(StudioConfig.getUIPath(), "");				
	}

	public Object getReturnValue() {
		Map<String,String> map = new HashMap<String, String>();
		map.put(this.propertyItem.getName(), this.fileName);
		return map;
	}

	public String isValid() {
		return this.errMsg;
	}

	public void setPropertyItem(PropertyItem propertyItem) {
		this.propertyItem = propertyItem;
		
		
	}

	public void setReturnValueStrategy(IPropertyValueStrategy strategy) {
		
	}

}
