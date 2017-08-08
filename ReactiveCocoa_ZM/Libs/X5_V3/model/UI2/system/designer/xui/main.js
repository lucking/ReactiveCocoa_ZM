function getRequestParameter(paramName) {
	var url = decodeURI(window.location.href);
	var idx = url.indexOf("?");
	var params = url.substring(idx + 1);
	if (params) {
		params = params.split("&");
		for ( var i = 0; i < params.length; i += 1) {
			var param = params[i].split("=");
			if (param[0] == paramName) {
				var targetValue = param[1];
				var idx2 = targetValue.indexOf("#");
				if (idx2 != -1) {
					targetValue = targetValue.substring(0, idx2);
				}
				return targetValue;
			}
		}
	}
}

var href = window.location.href;
var __version = "$abc" ;
var idx1 = href.indexOf("/$v");
if(idx1>0){
	var idx2 = href.indexOf("/",idx1+2);
	__version = href.substring(idx1+1,idx2);
}
var uiPath = getRequestParameter("uiPath");
 
var contextPathName = getRequestParameter("contextPathName");
var hasMin = getRequestParameter("hasMin");
var _$UI = uiPath.substring(uiPath.lastIndexOf("/") + 1);
var _$model = uiPath.substring(0, uiPath.lastIndexOf("/"));
var _systemPath = '/' + contextPathName + '/'+__version+'/' + _$UI + '/system';
requirejs.config({
	baseUrl : '/' + contextPathName + '/'+__version+'/' + _$UI + '/system/designer/xui',
	paths : {
		'$model' : "/" + contextPathName + "/"+__version,// _$model,
		'bind' : '../../lib/bind/bind',
		// 'framework' : uiPath + '/system/lib/framework',
		// 'plugins' : uiPath + '/system/lib/framework/plugins',
		// 'transitions' : uiPath + '/system/lib/framework/transitions',
		'xuiService' : '../../components/designerCommon/js/xuiService',
		// 'bootstrap': uiPath+'/system/lib/bootstrap/js/bootstrap',
		// 'baseModel': uiPath+'/system/lib/base/modelBase',
		// 'context': uiPath+'/system/lib/base/context',
		// 'component': uiPath+'/system/lib/base/component',
		'jquery' : '../../lib/jquery/jquery-1.11.1',
		'jqueryEx' : './jqueryEx',
		'designer' : hasMin=="true"?'./designer.min':'designer'// ,
	// 'baseComponent' : './baseComponent'// ,
	// 'comConfig':'componentConfig2'
	},
	shim : {
	// 'bootstrap': {
	// deps: ['jquery'],
	// exports: 'jQuery'
	// }
	},
	map : {
		  '*' : {
		   cordova : _systemPath + '/lib/require/cordova.js',
		   res : _systemPath + '/lib/require/res.js',
		   w : _systemPath + '/lib/require/w.js',
		   css : _systemPath + '/lib/require/css.js'
		  }
	},

	waitSeconds : 600
});

var initData;
function executeMethod(params) {
	if (params) {
		var oParams = typeof params == 'string' ? eval("(" + params + ")") : params;
		var methodName = oParams.methodName;
		if (methodName == 'initData') {
			initData = oParams;
		}
		if (window.designer) {
			initData = null;
			return window.designer.executeMethod(methodName, oParams);
		}
	}
}

function executeCompMethod(params) {
	var oParams = typeof params == 'string' ? eval("(" + params + ")") : params;
	var dId = params["d_id"];
	var target = $("*[d_id='" + dId + "']:first")[0];

	if (!target) {
		return;
	}
 
	var com = window.designer.getComponent(target);
	if (!com) {
		com = window.designer.getOwnerComponent(target);
	}
	params.target = target;
	var methodName = oParams.methodName;
	if (window.designer[methodName]) {
		window.designer[methodName](params);
	}

	if (com && com[methodName]) {
		com[methodName](params);
	}

	delete params.target;
	return JSON.stringify(params);
}

function regComponents(componentMap) {
	for ( var p in componentMap) {
		var cfg = window.componentConfig[p];
		if (cfg) {
			cfg["js-class"] = componentMap[p];
		}
	}
}
var callInitFlag = false;
function __init(initData) {
	window.componentConfig = initData.componentConfig;
	callInitFlag = true;
//	console.log("--__init-----");
	initData = typeof initData == 'string' ? eval("(" + initData + ")") : initData;

//	var dependMinList = initData.dependMinList;
//	if (dependMinList) {
//		for ( var i = 0; i < dependMinList.length; i += 1) {
//			var url = dependMinList[i];
//			if (url.indexOf(".js") != -1) {
//				try {
//					$("<script type='text/javascript' src='" + url + "' charset='utf-8'></script>").appendTo(document.head);
//				} catch (e) {
//
//				}
//			} else {
//				try {
//					$('<link rel="stylesheet" href="' + url + '"></link>').appendTo(document.head);
//				} catch (e) {
//
//				}
//			}
//		}
//	}

	var requireList = initData.requireList;
	for ( var i = 0; i < requireList.length; i += 1) {
		requireList[i] = requireList[i].replace(_$model, "$model");
	}

	requireList.push("designer");

	require(requireList, function(designer) {
		for ( var i = 0; i < arguments.length - 1; i += 1) {
			regComponents(arguments[i]);
		}
		window.designer = arguments[arguments.length - 1];
		if (initData) {
			window.designer.initData(initData);
		}
		//window.designer.allowAllElementAddChild = true;
		document.onkeydown = function() {
			if (event.keyCode == 116) {
				event.keyCode = 0;
				event.cancelBubble = true;
				return false;
			}
		}
		document.oncontextmenu = function() {
			return false;
		}
	});
}

require([ "../../components/designerCommon/js/webSocketMng" ], function(websocket) {
	websocket.callJava({
		filePath : websocket.getRequestParameter("filePath"),
		methodName : 'getInitData',
		callback : "__init"
	});
	var timer1 = setInterval(function() {// 第一次打开studio时websocket初始化不成功时会重新初始化
		if (!websocket.isOpened()) {
			websocket.clean();
			websocket.callJava({
				filePath : websocket.getRequestParameter("filePath"),
				methodName : 'getInitData',
				callback : "__init"
			});
		} else {
			clearInterval(timer1);
		}
	}, 3000);
});
