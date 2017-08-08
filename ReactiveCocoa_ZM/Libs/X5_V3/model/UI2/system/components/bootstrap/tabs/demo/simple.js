define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var Tabs = require("$UI/system/components/bootstrap/tabs/tabs");
	var Model = function(){
		this.callParent();
	};
	Model.prototype.createTabs = function(event){
		var container = this.getElementByXid("container");
		var tabData = this.comp("tabsData");
		var config = {
				parentNode: container,
    	  		xid: '',
    	  		fade: tabData.getValue("fade")==="true",
    	  		type: tabData.getValue("type"),
    	  		justified: tabData.getValue("justified")==="true",
    	  		stacked: tabData.getValue("stacked")==="true",
    	  		activeTab: '',
    	  		tabs: [
    	  		    {
    	  				xid: '',
    	  				label: 'new tab1', 
    	  				body: 'this is tab1',
    	  				onDeselect: function(evt){
    	  					alert("deselect new tab1");
    	  				},
    	  				onSelect: function(evt){
    	  					alert("select new tab1");
    	  				}
    	  			},
    	  			{
    	  				xid: '',
    	  				label: 'new tab2', 
    	  				body: 'this is tab2',
    	  				onDeselect: function(evt){
    	  					alert("deselect new tab2");
    	  				},
    	  				onSelect: function(evt){
    	  					alert("select new tab2");
    	  				}
    	  				
    	  			}
    	  		]
    	  	};
		var tabs = new Tabs(config);
	};

	Model.prototype.li1Deselect = function(event){
		alert("tab1 deselect");
	};

	Model.prototype.li1Select = function(event){
		alert("tab1 select");
	};

	Model.prototype.li2Deselect = function(event){
		alert("tab2 deselect");
	};

	Model.prototype.li2Select = function(event){
		alert("tab2 select");
	};

	

	Model.prototype.input_button1Click = function(event){
		this.comp("bsTabs1").setActiveTab("li2");
	};

	Model.prototype.backBtn = function(event){
		justep.Portal.closeWindow();
	};

	Model.prototype.showBsTabsSource = function(event){
		this.comp("windowDialog").open({
			data : "system/service/common/getWindowContent.j?window=/UI2/system/components/bootstrap/tabs/demo/simple.w&xid=demoBsTabs"
		});
	};

	Model.prototype.showJsSource = function(event){
		this.comp("windowDialog").open({
			data : "system/components/bootstrap/tabs/demo/simple.js"
		});
	};

	return Model;
});
