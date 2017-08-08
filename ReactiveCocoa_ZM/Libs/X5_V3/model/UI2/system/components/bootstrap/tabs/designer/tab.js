define(function(require) {
	var RTTab = require("../tab");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var xuiDoc = xuiService.getXuiDoc();

	var Tab = RTTab.extend({
		onRemove : function(event) {
			if (event.target === this.domNode) {
				this.remove();
			}
		},

		show : function() {
			this.callParent();
			this.getTabs().refreshClass();
		},

		remove : function() {
			var content = this._getContent();
			var ids = [ this.$domNode.attr("d_id"), $(content).attr("d_id") ];
			xuiDoc.deleteComponent(ids);

			this.callParent();
		},

		set : function(config) {
			this.callParent(config);
			if ("label" in config) {
				xuiDoc.updateText($(this.selector.header, this.$domNode));
			}
		}
	});

	return {
		"bsTab" : Tab
	};
});
