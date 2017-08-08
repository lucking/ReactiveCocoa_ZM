define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	require("$UI/system/lib/cordova/cordova");
	require("css!$UI/demo/device/common/pub").load();
	require("cordova!com.phonegap.plugins.barcodescanner");
	
	var Model = function() {
		this.callParent();
		this.STORE_ID = "com.justep.demo.advice.barcodedata";
	};

	Model.prototype.modelLoad = function(event){
		var me = this;
		document.addEventListener("deviceready", onDeviceReady, false);
		// 加载完成
		function onDeviceReady() {
			me.comp("scanBtn").set({disabled: false});

			if(localStorage.getItem(me.STORE_ID) != "")
				me.comp("fileData").loadData(JSON.parse(localStorage.getItem(me.STORE_ID)));
		}
	};		

	// 关闭功能
	Model.prototype.backBtnClick = function(event) {
		localStorage.setItem(this.STORE_ID, JSON.stringify(this.comp("fileData").toJson(false)));
		justep.Portal.closeWindow();
	};

	//扫描二维码
	Model.prototype.scanBtnClick = function(event) {
		var data = this.comp("fileData");
		this.comp('titleOutput').set({value: "扫描二维码"});
		this.comp('codeOutput').set({value: ""});
		this.comp('fileOutput').set({value: ""});
		
		var me = this;
		function onSuccess(result) {
			data.newData({index : 0});
			data.setValue("filePath", result.text);
			data.setValue("fileName", result.format);
			data.setValue('createTime', justep.Date.toString(new Date(), justep.Date.DEFAULT_FORMAT));
			me.comp('titleOutput').set({value: "扫描成功！"});
			me.comp('codeOutput').set({value: result.format});
			me.comp('fileOutput').set({value: result.text});
		}
		
		function onError(error) {
			me.comp('titleOutput').set({value: "扫描失败！" + error});
		}
		
		cordova.plugins.barcodeScanner.scan(onSuccess, onError);
		
//		cordova.plugins.barcodeScanner.encode(  
//      "TEXT_TYPE",   
//      "http://www.baidu.com",   
//      function(success) {  
//        alert("encode success: " + success);  
//      }, function(fail) { 
//        alert("encoding failed: " + fail);  
//      }  
//    );  
	};
	
	// 打开列表内容
	Model.prototype.fileListClick = function(event) {
		this.comp('titleOutput').set({value: ""});
		this.comp('codeOutput').set({value: ""});
		this.comp('fileOutput').set({value: ""});

		var data = this.comp("fileData");
		var codeText = data.getValue("filePath");
		if(codeText.indexOf("http") > -1){
			window.open(codeText, '_blank', 'toolbarposition=top,location=no,enableViewportScale=yes');
		}else{
			alert(codeText);
		}
	};

	// 清空历史记录
	Model.prototype.deleteBtnClick = function(event) {
		this.comp("fileData").clear();
		this.comp('titleOutput').set({value: "清空历史记录"});
		this.comp('codeOutput').set({value: ""});
		this.comp('fileOutput').set({value: ""});
		localStorage.setItem(this.STORE_ID, "");
	};

	return Model;
});