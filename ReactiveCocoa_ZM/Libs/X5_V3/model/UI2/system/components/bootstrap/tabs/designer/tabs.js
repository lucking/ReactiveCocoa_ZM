/*! 
 * E5 v3 (htttp://www.justep.com) 
 * Copyright 2014 Justep, Inc.
 */
define(function(require) {
	require("$UI/system/components/justep/common/res");
	var Tabs = require("../tabs");
	var xuiService = require("$UI/system/components/designerCommon/js/xuiService");
	var xuiDoc = xuiService.getXuiDoc();
	var $ = require("jquery");
	require('css!./css/tabs').load();

	Tabs = Tabs.extend({
		init : function(value, bindingContext) {
			this.callParent(value, bindingContext);
			this._initDesignStatus();
		},

		_initDesignStatus : function() {
			$(">.nav", this.domNode).attr("d_selectable", "false");
			$(">.nav,>.tab-content", this.domNode).attr("d_canRemove", "false")
					.attr("d_resizable", "false");
			$(">.nav>li", this.domNode).attr("d_canRemove", "false").attr(
					"d_selectable", "false").attr("d_resizable", "false");
			$(">.nav>li>a", this.domNode).attr("d_y_resizable", "false");
		},

		set : function(config) {
			for ( var p in config) {
				if (p == 'label') {
					this.domNode.innerHTML = config[p];
				} else if (p == 'row-count') {
					this.buildRows(config[p]);
					this.$domNode.attr("row-count", config[p]);
				}
			}
		},

		addTab : function() {
			var self = this;
			var configs = [];
			var xid = xuiDoc.genaXId("tabContent");
			configs.push({
				componentName : "li",
				paintComponent : true,
				parentElementId : $(">.nav", this.domNode).attr("d_id"),
				autoSelect : false,
				templateContent : '"<li><a content="' + xid
						+ '">tab1</a></li>"'
			});
			configs
					.push({
						componentName : "div",
						paintComponent : true,
						parentElementId : $(">.tab-content", this.domNode)
								.attr("d_id"),
						templateContent : '<div class="tab-pane" xid="' + xid
								+ '"></div>'
					});
			xuiDoc.batchCreateComponent(configs, function() {
				// self.ownerDesigner.setSelection($(">.nav>li:last>a",self.domNode)[0]);
				self.setActiveTab($(">.nav>li:last", self.domNode));
				self._initDesignStatus();
			});
		}
	});

	var TabItem = function(config) {
		this.domNode = this.templateNode = config.templateNode;
		this.domNode.setAttribute("tabindex", '0');
	};

	TabItem.prototype = {
		onRemove : function(event) {
			if ($("li", this.domNode.parentNode.parentNode).length == 1) {
				event.cancel = true;
			} else {
				event.cancel = true;
				var $domNode = $(this.domNode);
				var content = $domNode.attr("content");
				var contentDId = $(">.tab-content>*[xid='" + content + "']",
						$domNode.parent().parent().parent()).attr("d_id");
				xuiDoc.deleteComponent([ contentDId,
						$domNode.parent().attr("d_id") ]);
			}
		},
		set : function(config) {
			for ( var p in config) {
				if (p == 'label') {
					this.domNode.innerHTML = config[p];
				} else if (p == 'content') {
					this.domNode.setAttribute("content", config[p]);
				}
			}
		}
	};

	return {
		'$UI/system/components/bootstrap/tabs/tabs' : Tabs,
		'$UI/system/components/bootstrap/tabs/tabs#tabItem' : TabItem
	};

});