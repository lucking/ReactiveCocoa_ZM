import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import org.eclipse.swt.SWT;
import org.eclipse.swt.events.ModifyEvent;
import org.eclipse.swt.events.ModifyListener;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.layout.FillLayout;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.layout.RowLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Combo;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Text;

import swing2swt.layout.BorderLayout;

import com.justep.studio.ui.editors.xui.IPropertyDialogPage;
import com.justep.studio.ui.editors.xui.IPropertyValueStrategy;
import com.justep.studio.ui.editors.xui.PropertyItem;
import com.justep.studio.ui.editors.xui.XuiElement;

public class BarcodeConfigPage extends Composite implements IPropertyDialogPage {

	private PropertyItem propertyItem;
	private XuiElement xblElement = null;
	private String type,config;
	private HashMap<String, String> cfgMap,returnMap;
	private HashMap<Integer, String> map;
	private LinkedHashMap<String, String> comMap;
	private Text qztext;
	
	public BarcodeConfigPage(Composite parent, int style) {
		super(parent, style);
	}
	private void createContents(Composite container){
		final GridLayout gridLayout1 = new GridLayout();
		gridLayout1.numColumns = 2;
		container.setLayout(gridLayout1);
		container.setSize(container.getSize().x, comMap.size() * 35+100);
		map = new HashMap<Integer, String>();
		returnMap = new HashMap<String, String>();
		for(String k : comMap.keySet()){
			String v = comMap.get(k);
			final Label label = new Label(container, SWT.NONE);
			label.setText(k+":");
			if("human-readable-placement(hrp)".equals(k)){
				Combo combo = new Combo(container,SWT.NONE);
				combo.add("top");
				combo.add("bottom");
				combo.add("none");
				combo.setText(v);
				combo.setLayoutData(new GridData(SWT.FILL, SWT.FILL, true, false));
				combo.addSelectionListener(new SelectionAdapter(){
					public void widgetSelected(final SelectionEvent e) {
						Combo combo = (Combo) e.widget;
						returnMap.put("hrp", combo.getText());
					}				
				});	
				map.put(combo.handle, k);
				if(!"".equals(v)){
					returnMap.put("hrp", v);
				}
			}else if("quiet-zone(qz)".equals(k)){
				Composite composite = new Composite(container, SWT.NONE);
				composite.setLayoutData(new GridData(SWT.FILL, SWT.LEFT, true, false));
				GridLayout gl = new GridLayout();
				gl.numColumns = 2;
				gl.marginWidth = 0;
				composite.setLayout(gl);
				
				qztext = new Text(composite, SWT.BORDER);
				qztext.setLayoutData(new GridData(SWT.FILL, SWT.FILL, true, false));
				qztext.addModifyListener(new ModifyListener(){
					public void modifyText(ModifyEvent e) {
						Text text = (Text) e.widget;
						returnMap.put("qz", text.getText());
					}});	

				Button chk = new Button(composite,SWT.NONE|SWT.CHECK|SWT.LEFT);
				
				chk.setText("取消空白区域");			
				if("disable".equals(v)){
					chk.setSelection(true);
					qztext.setEnabled(false);
				}else{
					qztext.setText(v);
				}
				chk.addSelectionListener(new SelectionAdapter() {
					public void widgetSelected(final SelectionEvent e) {
						Button chk = (Button) e.widget;
						qztext.setEnabled(!chk.getSelection());
						if(chk.getSelection()){
							returnMap.put("qz", "disable");
						}else{
							returnMap.put("qz", qztext.getText());
						}
					}
				});	
			}else{
				Text text = new Text(container, SWT.BORDER);
				text.setLayoutData(new GridData(SWT.FILL, SWT.CENTER, true, false));		
				text.setText(v);
				text.addModifyListener(new ModifyListener(){
					public void modifyText(ModifyEvent e) {
						Text text = (Text) e.widget;
						returnMap.put(map.get(text.handle), text.getText());
					}});	

				String subname = k.substring(k.indexOf("(")+1,k.indexOf(")"));
				map.put(text.handle, subname);
				if(!"".equals(v)){
					returnMap.put(subname, v);
				}
			}
		}
	}

	public Object getReturnValue() {
		String returnStr = "";
		for(String k :returnMap.keySet()){
			if("".equals(returnMap.get(k))) continue;
			returnStr = returnStr + k + ":" + returnMap.get(k) + ",";
		}
		returnStr = returnStr.substring(0, returnStr.length()-1);
		returnStr = "{"+returnStr+"}";
		
		HashMap<String,String> map = new HashMap<String,String>();
		map.put("config",returnStr);
		return map;
	}
	
	public String isValid() {
		return null;
	}

	public void setPropertyItem(PropertyItem propertyItem) {
		this.propertyItem = propertyItem;
		xblElement = (XuiElement) this.propertyItem.getOwerElement();
		
		type = xblElement.getProperyValue("type");
		config = xblElement.getProperyValue("config");
		
		cfgMap = new HashMap<String, String>();
		if(config != null && !"".equals(config)){
			try{
				String[] cfgAry = config.substring(1,config.length()-1).split(",");
				for(String s:cfgAry){
					String[] tmp = s.split(":");
					cfgMap.put(tmp[0], tmp[1]);
				}			
			}catch(Exception e){
			}			
		}		
		
		this.createConfig(type);
		this.createContents(this);
	}

	public void setReturnValueStrategy(IPropertyValueStrategy strategy) {

	}
	
	private void createConfig(String type){
		comMap = new LinkedHashMap<String,String>();
		
		if("code39".equalsIgnoreCase(type)){
			comMap.put("height(height)", g("height"));
			comMap.put("module-width(mw)", g("mw"));
			comMap.put("wide-factor(wf)", g("wf"));
			comMap.put("quiet-zone(qz)", g("qz"));
			comMap.put("human-readable-placement(hrp)", g("hrp"));
			comMap.put("human-readable-font-name(hrfont)", g("hrfont"));
			comMap.put("human-readable-font-size(hrsize)", g("hrsize"));			
		}else if("code93".equalsIgnoreCase(type)){
			comMap.put("height(height)", g("height"));
			comMap.put("module-width(mw)", g("mw"));
			comMap.put("wide-factor(wf)", g("wf"));
			comMap.put("quiet-zone(qz)", g("qz"));
//			comMap.put("human-readable-placement(hrp)", g("hrp"));
			comMap.put("human-readable-font-name(hrfont)", g("hrfont"));
			comMap.put("human-readable-font-size(hrsize)", g("hrsize"));			
		}else if("code128".equalsIgnoreCase(type)){
			comMap.put("height(height)", g("height"));
			comMap.put("module-width(mw)", g("mw"));
			comMap.put("codesets(codesets)", g("codesets"));
			comMap.put("quiet-zone(qz)", g("qz"));
			comMap.put("human-readable-placement(hrp)", g("hrp"));
			comMap.put("human-readable-font-name(hrfont)", g("hrfont"));
			comMap.put("human-readable-font-size(hrsize)", g("hrsize"));			
		}else if("codabar".equalsIgnoreCase(type)){
			comMap.put("height(height)", g("height"));
			comMap.put("module-width(mw)", g("mw"));
			comMap.put("wide-factor(wf)", g("wf"));
			comMap.put("quiet-zone(qz)", g("qz"));
			comMap.put("human-readable-placement(hrp)", g("hrp"));
			comMap.put("human-readable-font-name(hrfont)", g("hrfont"));
			comMap.put("human-readable-font-size(hrsize)", g("hrsize"));
			comMap.put("human-readable-display-start-stop(hrdss)", g("hrdss"));
		}else if("intl2of5".equalsIgnoreCase(type)){
			comMap.put("height(height)", g("height"));
			comMap.put("module-width(mw)", g("mw"));
			comMap.put("wide-factor(wf)", g("wf"));
			comMap.put("quiet-zone(qz)", g("qz"));
			comMap.put("human-readable-placement(hrp)", g("hrp"));
			comMap.put("human-readable-font-name(hrfont)", g("hrfont"));
			comMap.put("human-readable-font-size(hrsize)", g("hrsize"));			
		}else if("itf14".equalsIgnoreCase(type)){
			comMap.put("height(height)", g("height"));
			comMap.put("module-width(mw)", g("mw"));
			comMap.put("wide-factor(wf)", g("wf"));
			comMap.put("quiet-zone(qz)", g("qz"));
			comMap.put("bearer-bar-width(bbw)", g("bbw"));
			comMap.put("bearer-box(bb)", g("bb"));
			comMap.put("human-readable-placement(hrp)", g("hrp"));
			comMap.put("human-readable-font-name(hrfont)", g("hrfont"));
			comMap.put("human-readable-font-size(hrsize)", g("hrsize"));
		}else if("upc-a".equalsIgnoreCase(type)){
			comMap.put("height(height)", g("height"));
			comMap.put("module-width(mw)", g("mw"));
			comMap.put("quiet-zone(qz)", g("qz"));
			comMap.put("human-readable-placement(hrp)", g("hrp"));
			comMap.put("human-readable-font-name(hrfont)", g("hrfont"));
			comMap.put("human-readable-font-size(hrsize)", g("hrsize"));			
		}else if("upc-e".equalsIgnoreCase(type)){
			comMap.put("height(height)", g("height"));
			comMap.put("module-width(mw)", g("mw"));
			comMap.put("quiet-zone(qz)", g("qz"));
			comMap.put("human-readable-placement(hrp)", g("hrp"));
			comMap.put("human-readable-font-name(hrfont)", g("hrfont"));
			comMap.put("human-readable-font-size(hrsize)", g("hrsize"));						
		}else if("ean-13".equalsIgnoreCase(type)){
			comMap.put("height(height)", g("height"));
			comMap.put("module-width(mw)", g("mw"));
			comMap.put("quiet-zone(qz)", g("qz"));
			comMap.put("human-readable-placement(hrp)", g("hrp"));
			comMap.put("human-readable-font-name(hrfont)", g("hrfont"));
			comMap.put("human-readable-font-size(hrsize)", g("hrsize"));			
		}else if("ean-8".equalsIgnoreCase(type)){
			comMap.put("height(height)", g("height"));
			comMap.put("module-width(mw)", g("mw"));
			comMap.put("quiet-zone(qz)", g("qz"));
			comMap.put("human-readable-placement(hrp)", g("hrp"));
			comMap.put("human-readable-font-name(hrfont)", g("hrfont"));
			comMap.put("human-readable-font-size(hrsize)", g("hrsize"));			
		}else if("ean-128".equalsIgnoreCase(type)){
			comMap.put("height(height)", g("height"));
			comMap.put("module-width(mw)", g("mw"));
			comMap.put("check-digit-marker(cdm)", g("cdm"));
			comMap.put("group-separator(gs)", g("gs"));
			comMap.put("template(tpl)", g("tpl"));
			comMap.put("quiet-zone(qz)", g("qz"));
			comMap.put("human-readable-placement(hrp)", g("hrp"));
			comMap.put("human-readable-font-name(hrfont)", g("hrfont"));
			comMap.put("human-readable-font-size(hrsize)", g("hrsize"));			
		}else if("postnet".equalsIgnoreCase(type)){
			comMap.put("height(height)", g("height"));
			comMap.put("module-width(mw)", g("mw"));
			comMap.put("quiet-zone(qz)", g("qz"));
			comMap.put("interchar-gap-width(igw)", g("igw"));
			comMap.put("tall-bar-height(tbh)", g("tbh"));
			comMap.put("short-bar-height(sbh)", g("sbh"));
			comMap.put("baseline-alignment(ba)", g("ba"));	
			comMap.put("human-readable-placement(hrp)", g("hrp"));
			comMap.put("human-readable-font-name(hrfont)", g("hrfont"));
			comMap.put("human-readable-font-size(hrsize)", g("hrsize"));			
		}else if("royal-mail-cbc".equalsIgnoreCase(type)){
			comMap.put("module-width(mw)", g("mw"));
			comMap.put("track-height(th)", g("th"));
			comMap.put("ascender-height(ah)", g("ah"));
			comMap.put("interchar-gap-width(igw)", g("igw"));
			comMap.put("quiet-zone(qz)", g("qz"));			
		}else if("usps4cb".equalsIgnoreCase(type)){
			comMap.put("module-width(mw)", g("mw"));
			comMap.put("track-height(th)", g("th"));
			comMap.put("ascender-height(ah)", g("ah"));
			comMap.put("interchar-gap-width(igw)", g("igw"));
			comMap.put("quiet-zone(qz)", g("qz"));
			comMap.put("vertical-quiet-zone(vqz)", g("vqz"));			
			comMap.put("human-readable-placement(hrp)", g("hrp"));
			comMap.put("human-readable-font-name(hrfont)", g("hrfont"));
			comMap.put("human-readable-font-size(hrsize)", g("hrsize"));			
		}else if("pdf417".equalsIgnoreCase(type)){
			comMap.put("module-width(mw)", g("mw"));
			comMap.put("row-height(rh)", g("rh"));
			comMap.put("min-columns(mincol)", g("mincol"));
			comMap.put("max-columns(maxcol)", g("maxcol"));			
			comMap.put("ec-level(ql)", g("el"));
			comMap.put("quiet-zone(qz)", g("qz"));
			comMap.put("vertical-quiet-zone(vqz)", g("vqz"));
			comMap.put("width-to-height-ratio(wthr)", g("wthr"));
		}else if("datamatrix".equalsIgnoreCase(type)){
			comMap.put("module-width(mw)", g("mw"));
			comMap.put("quiet-zone(qz)", g("qz"));
			comMap.put("shape(shape)", g("shape"));
			comMap.put("min-symbol-size(minss)", g("minss"));
			comMap.put("max-symbol-sizintl2of5e(maxss)", g("maxss"));			
		}
		else if("qr".equalsIgnoreCase(type)){
			comMap.put("module-width(mw)", g("mw"));
			comMap.put("quiet-zone(qz)", g("qz"));
			//comMap.put("ec-level(ql)", g("el"));
		}
	}
	private String g(String s){
		String p = cfgMap.get(s);
		return (p != null && !"".equals(p))?p:"";	
	}
}
