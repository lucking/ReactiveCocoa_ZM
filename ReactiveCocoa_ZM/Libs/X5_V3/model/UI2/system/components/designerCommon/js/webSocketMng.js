define(function(require) {
	var $ = require("jquery"), callBackCount = 0;
	var _socket;

	var mng = {};
	mng.getRequestParameter = function(paramName) {
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
					if(idx2 != -1){
						targetValue = targetValue.substring(0,idx2);
					}
					return targetValue;
				}
			}
		}
	};
	mng.setBaseParams = function(params) {
		this.baseparams = params;
	};

	mng._callJava = function(className, methodName, params, callback) {
		params = params || {};
		params.className = className;
		params.methodName = methodName;

		if (callback) {
			var callBackName = "callBack" + (callBackCount += 1);
			params.callback = callBackName;
			window[callBackName] = callback;
		}
		if (callBackCount == 100) {
			callBackCount = 0;
		}
		return mng.callJava(params);
	};
	mng.dataBuf = [];
	mng.clean = function() {
		_socket = null;
		mng.dataBuf = [];
	},

	mng.isOpened = function() {
		return mng.opened;
	},

	mng.callJava = function(data, filePath) {
		mng.filePath = data.filePath;
		data = $.extend(this.baseparams || {}, data);
		mng.dataBuf.push(data);
		if (data.async !== false) {
			if (!_socket) {
				console.log("create WebSocket" + "ws://localhost:" + this.getRequestParameter("port") + "/xuiwebsocket.do");
				_socket = new WebSocket("ws://localhost:" + this.getRequestParameter("port") + "/xuiwebsocket.do");
				_socket.onopen = function(event) {
					console.log("_socket.onopen");
					_socket.onmessage = function(event) {
						var sData = event.data;
						var isReturn = sData.length >= 7 && sData.substring(0, 7) == 'return:';
						if (isReturn) {
							sData = sData.substring(7);
						}
						var data;
						// console.log("onmessage:"+sData);
						try {
							data = eval("(" + sData + ")");
							if (data && data.callback) {
								eval("(" + data.callback + ")");
							}
							if (isReturn) {
								return;
							}
							if (data && typeof data != 'string') {
								data = JSON.stringify(data);
							}
						} catch (e) {
							console.error("出错啦：" + e.name + "number:" + e.number + "  message:" + e.message + "  " + e.stack);
						}

						_socket.send("return:" + (data || "{}"));

						// throw new
						// Error("-1","该方法的参数个数不等于2，请输入两个参数！");
					};

					// 监听Socket的关闭
					_socket.onclose = function(event) {
						_socket = null;
						mng.opened = false;
						mng.dataBuf = [];
						console.log('Client notified socket has closed', event);
						mng.callJava({
							event : "reConnection",
							filePath : mng.filePath
						});
					};

					mng.opened = true;
					for ( var i = 0; i < mng.dataBuf.length; i += 1) {
						_socket.send(JSON.stringify(mng.dataBuf[i]));
					}
				};
			}
			if (mng.opened) {
				mng.dataBuf = [];
				console.log("--------" + JSON.stringify(data));
				_socket.send(JSON.stringify(data));
			}

		} else {
			var returnData = "";
			$.ajax({
				async : false,
				data : {
					params : JSON.stringify(data)
				},

				dataType : 'json',
				type : 'POST',
				url : "http://localhost:" + this.getRequestParameter("port") + "/xuiajax.do",// "http://localhost:8080/foreigntrace/dd",//this.url,
				success : function(result) {
					if(result.$data !== ""){
						returnData = result.$data || result;
					}
				},
				error : function(xhr, status, err) {
					var erroeMsg = "ajax请求出错：" + [ status, xhr.readyState, err ];
					console.log(erroeMsg);
				}
			});
			return returnData;
		}
	};
	mng.callJava({});
	return mng;
});