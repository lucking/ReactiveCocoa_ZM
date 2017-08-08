/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var _UUID = require("$UI/system/lib/base/uuid");
	var _Date = require("$UI/system/lib/base/date");
	var _String = require("$UI/system/lib/base/string");
	var _Browser = require("$UI/system/lib/base/browser");
	var _Message = require("$UI/system/lib/base/message");
	var _Error = require("$UI/system/lib/base/error");
	var _URL = require("$UI/system/lib/base/url");
    var _Util = require("$UI/system/lib/base/util");
    var _Array = require("$UI/system/lib/base/array");
    var _Console = require("$UI/system/lib/base/console");
	var _Object = require("$UI/system/lib/base/object");
	var _Observable = require("$UI/system/lib/base/observable");
	var _Operational = require("$UI/system/lib/base/operational");
	var _ModelBase = require("$UI/system/lib/base/modelBase");
	var _Context = require("$UI/system/lib/base/context");
	var _bind = require("bind");
	var _Component = require("$UI/system/lib/base/component");
	var _ModelComponent = require("$UI/system/lib/base/modelComponent");
	var _ViewComponent = require("$UI/system/lib/base/viewComponent");
	var _BindComponent = require("$UI/system/lib/base/bindComponent");
        
	var _Base64 = require("$UI/system/lib/base/base64");
	var _Express = require("$UI/system/lib/base/express");
	var _Portal = require("$UI/system/lib/portal/portal");


	var Composition = require("$UI/system/lib/base/composition");
	
	
	var justep = {};
	justep.Composition = Composition;
	justep.UUID = _UUID;
	justep.Base64 = _Base64;
	justep.Date = _Date;
	justep.String = _String;
	justep.Browser = _Browser;
	justep.Message = _Message;
	justep.Error = _Error;
	justep.URL = _URL;
	justep.Util = _Util;
	justep.Array = _Array,
	justep.Console = _Console;
	justep.Portal = _Portal;
	justep.Object = _Object;
	justep.Observable = _Observable;
	justep.Operational = _Operational;
	justep.ModelBase = _ModelBase;
	justep.Context = _Context;
	justep.Bind = _bind;
	justep.Express = _Express;
	
	justep.Component = _Component;
	justep.ModelComponent = _ModelComponent;
	justep.ViewComponent = _ViewComponent;
	justep.BindComponent = _BindComponent;
	//justep.Cache = _Cache;
	
	window.justep = justep; //js表达式需要使用
	return justep;
});