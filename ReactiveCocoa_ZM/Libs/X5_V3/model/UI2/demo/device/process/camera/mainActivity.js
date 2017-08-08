define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	require("$UI/system/lib/cordova/cordova");
	require("css!$UI/demo/device/common/pub").load();
	require("cordova!org.apache.cordova.camera");
	require("cordova!org.apache.cordova.inappbrowser");
	
	var Model = function() {
		this.callParent();
		this.STORE_ID = "com.justep.demo.advice.cameradata";
	};

	//从内存中取出历史记录
	Model.prototype.modelLoad = function(event){
		var me = this;
		document.addEventListener("deviceready", onDeviceReady, false);
		// 加载完成
		function onDeviceReady() {
			me.comp("cameraBtn").set({disabled: false});
			me.comp("captureBtn").set({disabled: false});

			if(localStorage.getItem(me.STORE_ID) != "")
				me.comp("fileData").loadData(JSON.parse(localStorage.getItem(me.STORE_ID)));
		}
	};

	//拍照
	Model.prototype.cameraBtnClick = function(event) {
		$("#operateLabel").text("开始拍照！");
		$("#resultLabel").text("");

		var data = this.comp("fileData");
		function onSuccess(imageURI) {
	        data.newData({index : 0});
			data.setValue("filePath", imageURI);
			data.setValue("fileName", imageURI.substr(imageURI.lastIndexOf('/') + 1));
			data.setValue('createTime', justep.Date.toString(new Date(), justep.Date.DEFAULT_FORMAT ));
			$("#resultLabel").text("成功"+imageURI);
		}
		function onFail(message) {
			$("#resultLabel").text("失败："+message);
		}
		navigator.camera.getPicture(onSuccess, onFail, {quality : 50});
	};
	
	//摄像
	Model.prototype.captureBtnClick = function(event) {
		$("#operateLabel").text("开始摄像！");
		$("#resultLabel").text("");
		
		var data = this.comp("fileData");
		var captureSuccess = function(mediaFiles) {
			var i, path, len;
			for (i = 0, len = mediaFiles.length; i < len; i += 1) {
   				path = mediaFiles[i].fullPath;

/*iphone不能播放	
		    resolveLocalFileSystemURI(path, function(e) {
				debugger;
			        var fileEntry = e;
			        path = e.toURL();
			        alert(e.toURL());
			    }, function(){});*/
			        
				data.newData({index : 0});
				data.setValue("filePath", path);
				data.setValue("fileName", mediaFiles[i].name);//path.substr(path.lastIndexOf('/') + 1));
				data.setValue('createTime', justep.Date.toString(new Date(mediaFiles[i].lastModifiedDate), justep.Date.DEFAULT_FORMAT));
				$("#resultLabel").text("成功"+path);
			}
		};
		var captureError = function(error) {
			$("#resultLabel").text("失败："+error.message);
		};
		navigator.device.capture.captureVideo(captureSuccess, captureError, {limit : 1});
	};

	//显示图片和视频
	Model.prototype.fileListClick = function(event) {
		$("#operateLabel").text(" ");
		$("#resultLabel").text("");

		var data = this.comp("fileData");
		var url = data.getValue("filePath");

		if (justep.Browser.isX5App && justep.Browser.isAndroid) {
			window.open(url,"_system");
			//window.open(url,"_blank");
			//window.open(url, '_blank', 'toolbarposition=top,location=no,enableViewportScale=yes');
		} else {
			window.open(url, '_blank', 'toolbarposition=top,location=no,enableViewportScale=yes');
		}
	};

	//清空历史记录
	Model.prototype.deleteBtnClick = function(event) {
		$("#operateLabel").text("清空历史记录 ");
		$("#resultLabel").text("");

		this.comp("fileData").clear();
		localStorage.setItem(this.STORE_ID, "");

	};

	//关闭功能，将记录存入内存
	Model.prototype.backBtnClick = function(event) {
		localStorage.setItem(this.STORE_ID, JSON.stringify(this.comp("fileData").toJson(false)));
		justep.Portal.closeWindow();
	};

	return Model;
});