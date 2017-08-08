define(function(require) {
	require("../lib/js/bootstrap");
	var justep = require("$UI/system/lib/justep");
	var url = require.normalizeName("./tab");
	require("$UI/system/resources/system.res");

	var ComponentConfig = require("./tab.config");

	var Tab = justep.BindComponent.extend({
		getConfig : function() {
			return ComponentConfig;
		},

		constructor : function(config) {
			this.callParent(config);
			this.label = "";

			this.selector = {
				header : "a"
			};
		},

		buildTemplate : function(config) {
			var pane = config.owner._buildTabPane(config);
			justep.Bind.addNode(config.paneParentNode, pane);

			this.set(config);

			config.component = url;
			return config.owner._buildTabHeader(config);
		},

		propertyChangedHandler : function(key, oldVal, value) {
			if (!this.$domNode)
				return;
			if (key === "label") {
				value = value || "";
				$(this.selector.header, this.$domNode).text(value);
			}
		},

		show : function() {
			$(this.selector.header, this.$domNode).tab("show");
		},

		addContent : function(componentsOrNodes) {
			justep.Bind.addComponentsOrNodes(this._getContent(), componentsOrNodes);
		},

		clearContent : function() {
			justep.Bind.removeNode(this._getContent());
		},

		remove : function() {
			var nextTab = this.getTabs()._getNextTab(this);
			var curActive = this.$domNode.hasClass("active");

			var content = this._getContent();
			justep.Bind.removeNode(content);
			justep.Bind.removeNode(this.domNode);

			if (curActive && nextTab) {
				nextTab.show();
			}
		},

		_getContent : function() {
			var pane = this.getTabs()._getTabPane(this);
			if (pane) {
				return pane;
			} else {
				var xid = this.$domNode.attr("xid");
				var msg = new justep.Message(justep.Message.JUSTEP230079, xid);
				throw justep.Error.create(msg);
			}
		},

		// 组件初始化
		init : function(value, bindingContext) {
			this.callParent(value, bindingContext);
		},

		getTabs : function() {
			return justep.Component.getComponent(this.$domNode.parent().parent()[0]);
		},

		// 组件初始化
		update : function(value, bindingContext) {
			this.callParent(value, bindingContext);
		}
	});

	/**
	 * event格式： { source: this, tabs: tabsObj, cancel: false }
	 */
	Tab.DESELECT_EVENT = "onDeselect";

	/**
	 * event格式： { source: this, prevTab: tabObj, tabs: tabsObj, cancel: false }
	 */
	Tab.SELECT_EVENT = "onSelect";

	justep.Component.register(url, Tab);
	return Tab;
});
