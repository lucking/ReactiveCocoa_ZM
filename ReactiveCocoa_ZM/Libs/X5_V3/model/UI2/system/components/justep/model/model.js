/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var url = require.normalizeName("./model");
	var ComponentConfig = require("./model.config");
	require("$UI/system/resources/system.res");

    var Model = justep.ViewComponent.extend({
    	buildTemplate: function(config){
    		var msg = new justep.Message(justep.Message.JUSTEP230073, url);
    		throw justep.Error.create(msg);
    	},
    	
    	getConfig: function(){
    		return ComponentConfig;
    	},
        
        init: function(value, bindingContext){
        	this.callParent(value, bindingContext);
        	
        	this.getModel().on(justep.ModelBase.MODEL_CONSTRUCT_EVENT, this._fireEvent.bind(this, justep.ModelBase.MODEL_CONSTRUCT_EVENT));
        	this.getModel().on(justep.ModelBase.MODEL_CONSTRUCT_DONE_EVENT, this._fireEvent.bind(this, justep.ModelBase.MODEL_CONSTRUCT_DONE_EVENT));
        	this.getModel().on(justep.ModelBase.LOAD_EVENT, this._fireEvent.bind(this, justep.ModelBase.LOAD_EVENT));
        	this.getModel().on(justep.ModelBase.UNLOAD_EVENT, this._fireEvent.bind(this, justep.ModelBase.UNLOAD_EVENT));
        	this.getModel().on(justep.ModelBase.ACTIVE_EVENT, this._fireEvent.bind(this, justep.ModelBase.ACTIVE_EVENT));
        	this.getModel().on(justep.ModelBase.INACTIVE_EVENT, this._fireEvent.bind(this, justep.ModelBase.INACTIVE_EVENT));
        }, 
        
        _fireEvent: function(name){
        	this.fireEvent(name, {source: this});
        }
    });
    
    justep.Component.register(url, Model);
    return Model;
});