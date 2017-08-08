import java.util.Map;

import org.dom4j.Element;
import org.dom4j.QName;

import com.justep.common.MessageUtils;
import com.justep.ui.component.ComponentTemplate;
import com.justep.ui.system.UISystemMessages;
import com.justep.ui.xml.XMLConstants;


public class MessageDialog implements ComponentTemplate {
	private Element eDef;

	public void execute(Element bound, Map<String, String> dataItems, Map<String, Object> props, Map<String, String> events,
			Map<String, Object> context) {
		eDef = bound;
		
		processElement();
	}

	/*
    		return	'<span component="' + url + '" type="'+cfg.type+'">'
		        	+	'<div class="x-modal-overlay"></div>'
		        	+	'<div class="x-modal">'
		        	+ 		'<div class="x-modal-inner">'
		        	+ 			'<div class="x-modal-title">'+cfg.title+'</div>'
		        	+ 			'<div class="x-modal-text">'+cfg.message+'</div>'
		        	+			'<input type="text" class="x-modal-prompt-input">'
		        	+ 		'</div>'
		        	+ 		'<div class="x-modal-buttons">'
		        	+ 			'<a class="x-modal-button x-modal-button-bold OK" value="ok">'+okLabel+'</a>'
		        	+ 			'<a class="x-modal-button x-modal-button-bold Yes" value="yes">'+yesLabel+'</a>'
		        	+ 			'<a class="x-modal-button x-modal-button-bold No" value="no">'+noLabel+'</a>'
		        	+ 			'<a class="x-modal-button x-modal-button-bold Cancel" value="cancel">'+cancelLabel+'</a>'
		        	+		'</div>'
		        	+	'</div>'
		        	+'</span>';
	 */
	private void processElement(){
		String type = eDef.attributeValue("type");
		if(null==type || "".equals(type)) eDef.addAttribute("type", "OK");
		QName divQName = new QName("div", XMLConstants.XHTML_NAMESPACE);
		eDef.addElement(divQName).addAttribute("class", "x-modal-overlay");
		Element eModal = eDef.addElement(divQName);
		eModal.addAttribute("class", "x-modal");
		
		Element eInner = eModal.addElement(divQName);
		eInner.addAttribute("class", "x-modal-inner");
		
		Element eTitle = eInner.addElement(divQName);
		eTitle.addAttribute("class", "x-modal-title");
		String text = eDef.attributeValue("title");
		eTitle.setText(null!=text?text:"");

		Element eText = eInner.addElement(divQName);
		eText.addAttribute("class", "x-modal-text");
		text = eDef.attributeValue("message");
		eText.setText(null!=text?text:"");

		Element eInput = eInner.addElement(new QName("input", XMLConstants.XHTML_NAMESPACE));
		eInput.addAttribute("class", "x-modal-prompt-input");
		eInput.addAttribute("type", "text");

		Element eButtons = eModal.addElement(divQName);
		eButtons.addAttribute("class", "x-modal-buttons");

		QName aQName = new QName("a", XMLConstants.XHTML_NAMESPACE);
		Element eOK = eButtons.addElement(aQName);
		eOK.addAttribute("class", "x-modal-button x-modal-button-bold OK");
		eOK.addAttribute("value", "ok");
		eOK.setText(MessageUtils.getMessage(UISystemMessages.class, UISystemMessages.MESSAGE_DIALOG_OK_LABEL));

		Element eYes = eButtons.addElement(aQName);
		eYes.addAttribute("class", "x-modal-button x-modal-button-bold Yes");
		eYes.addAttribute("value", "yes");
		eYes.setText(MessageUtils.getMessage(UISystemMessages.class, UISystemMessages.MESSAGE_DIALOG_YES_LABEL));
		
		Element eNo = eButtons.addElement(aQName);
		eNo.addAttribute("class", "x-modal-button x-modal-button-bold No");
		eNo.addAttribute("value", "no");
		eNo.setText(MessageUtils.getMessage(UISystemMessages.class, UISystemMessages.MESSAGE_DIALOG_NO_LABEL));
		
		Element eCancel = eButtons.addElement(aQName);
		eCancel.addAttribute("class", "x-modal-button x-modal-button-bold Cancel");
		eCancel.addAttribute("value", "cancel");
		eCancel.setText(MessageUtils.getMessage(UISystemMessages.class, UISystemMessages.MESSAGE_DIALOG_CANCEL_LABEL));
	}
}
