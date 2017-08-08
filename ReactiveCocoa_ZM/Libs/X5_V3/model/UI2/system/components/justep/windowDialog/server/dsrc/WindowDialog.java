import java.util.Map;

import org.dom4j.Element;
import org.dom4j.QName;

import com.justep.ui.component.ComponentTemplate;
import com.justep.ui.xml.XMLConstants;




public class WindowDialog implements ComponentTemplate {

	private Element eDef;
	Map<String, Object> context;

	public void execute(Element bound, Map<String, String> dataItems, Map<String, Object> props, Map<String, String> events,
			Map<String, Object> context) {
		eDef = bound;
		this.context = context;
		
		processElement();
	}

	/*
	return	'<span component="' + url + '">'
        	+	'<div class="x-dialog-overlay"></div>'
        	+	'<div class="x-dialog" showTitle="true">'
        	+ 		'<div class="x-dialog-title">'
        	+			'<h4 class="x-dialog-title-text">'
        	+			(cfg.title?cfg.title:'')
        	+			'</h4>'
        	+			'<button type="button" class="close"><span>×</span></button>'
        	+		'</div>'
        	+ 		'<div class="x-dialog-body">'+(cfg.content?cfg.content:'')+'</div>'
        	+	'</div>'
        	+'</span>';
	 */
	private void processElement(){
		//src属性由引擎会处理
		QName divQName = new QName("div", XMLConstants.XHTML_NAMESPACE);
		Element eDialogOverlay = eDef.addElement(divQName);
		eDialogOverlay.addAttribute("class", "x-dialog-overlay");
		Element eDialog = eDef.addElement(divQName);
		eDialog.addAttribute("class", "x-dialog");
		if(null!=eDef.attribute("showTitle"))
			eDialog.addAttribute("showTitle", eDef.attributeValue("showTitle"));
		
		Element eTitle = eDialog.addElement(divQName);
		eTitle.addAttribute("class", "x-dialog-title");

		QName buttonQName = new QName("button", XMLConstants.XHTML_NAMESPACE);
		Element eClose = eTitle.addElement(buttonQName);
		eClose.addAttribute("class", "close");
		QName spanQName = new QName("span", XMLConstants.XHTML_NAMESPACE);
		eClose.addElement(spanQName).setText("×");
		
		Element eText = eTitle.addElement(divQName);
		eText.addAttribute("class", "x-dialog-title-text");
		String t = eDef.attributeValue("title");
		if(null!=t) eText.setText(t);

		Element eBody = eDialog.addElement(divQName);
		eBody.addAttribute("class", "x-dialog-body");
	}
}
