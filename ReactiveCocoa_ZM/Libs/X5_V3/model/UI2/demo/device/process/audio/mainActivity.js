define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	require("$UI/system/lib/cordova/cordova");
	require("css!$UI/demo/device/common/pub").load();
	require("cordova!org.apache.cordova.media");

	var Model = function() {
		this.callParent();
		this.mediaTimer;
		this.mediaRec;
		this.fileName;
		this.timeLen;
		this.operateType;
		this.STORE_ID = "com.justep.demo.advice.audiodata";
		this.openByDialog = false;
	};

	Model.prototype.modelLoad = function(event) {
		var me = this;
		document.addEventListener("deviceready", onDeviceReady, false);
		// 加载完成
		function onDeviceReady() {
			me.comp("audioBtn").set({disabled: false});
			me.comp("playBtn").set({disabled: false});

			if(localStorage.getItem(me.STORE_ID) != "")
				me.comp("fileData").loadData(JSON.parse(localStorage.getItem(me.STORE_ID)));
		}
	};
	
	// 关闭功能
	Model.prototype.backBtnClick = function(event) {
		if(this.mediaRec)
			this.mediaRec.stop();
		
		localStorage.setItem(this.STORE_ID, JSON.stringify(this.comp("fileData").toJson(false)));
		
		if(this.openByDialog)
			this.comp("windowReceiver").windowCancel();
		else
			justep.Portal.closeWindow();
	};
	
	// 录音
	Model.prototype.audioBtnClick = function(event) {
		this.comp("recordCover").show();

		this.comp('titleOutput').set({value: "开始录音！"});
		this.comp('fileOutput').set({value: "aaa"});
		this.comp('recordTime').set({value: "00:00:00"});

		var me = this;
		// 根据系统时间产生文件名
		this.fileName = justep.Date.toString(new Date(), "yyyyMMddhhmmss") + ".wav";
		this.mediaRec = new Media(this.fileName,
				function() {
				},
				function(err) {
					me.comp('fileOutput').set({value: "失败:" + err});
				}
		);
		// 开始录音
		this.mediaRec.startRecord();
		this.operateType = "record";
		
		var recTime = 0;
		this.mediaTimer = setInterval(function() {
			recTime = recTime + 1;
            me.setAudioPosition(recTime);
            me.comp('recordTime').set({value: me.timeLen});
		}, 1000);
	};
	
	//设置显示的时间
    Model.prototype.setAudioPosition = function(position) {
    	var hour = parseInt(position / 3600);// 小时数
		var min = parseInt(position / 60);// 分钟数
		if (min >= 60) {
			min = min % 60
		}
		var lastsecs = position % 60;
		if(hour < 10) hour = "0" + hour;
		if(min < 10) min = "0" + min;
		if(lastsecs < 10) lastsecs = "0" + lastsecs;
		
		this.timeLen = hour + ':' + min + ':' + lastsecs;
    }
    
    //停止播放、停止录音
	Model.prototype.pauseImageClick = function(event){
		// 清空计时器
		clearInterval(this.mediaTimer);
		if (this.operateType == "record") {
			// 停止录音
			this.comp("recordCover").hide();
			this.mediaRec.stopRecord();
			
			var data = this.comp("fileData");
			data.newData({index : 0});
			data.setValue("fileName", this.fileName);
			data.setValue("createTime", justep.Date.toString(new Date(), justep.Date.DEFAULT_FORMAT))// 开始时间
			data.setValue("timeLen", this.timeLen);// 录音时长
			
			this.comp('fileOutput').set({value: "音频文件名"+this.fileName});
		}else{
			//停止播放
			this.comp("playCover").hide();
			this.mediaRec.stop();
		}
	};
	
	// 播放录音
	Model.prototype.fileListClick = function(event) {
		this.comp("playCover").show();
		this.comp('titleOutput').set({value: "播放录音！"});
		this.comp('fileOutput').set({value: ""});
		
		var me = this;
		var data = this.comp("fileData");
		var url = data.getValue("fileName");
		this.comp('playTime').set({value: "00:00:00||" + data.getValue("timeLen")});
		this.mediaRec = new Media(url,
				function() {
				},
				function(err) {
					me.comp('fileOutput').set({value: "失败:" + err});
				}
		);
		// 播放音频
		this.mediaRec.play();
		this.operateType = "play";
		
		var recTime = 0;
		this.mediaTimer = setInterval(function() {
			recTime = recTime + 1;
            me.setAudioPosition(recTime);

			if(me.timeLen == data.getValue("timeLen")){
				me.comp("playCover").hide();
				clearInterval(me.mediaTimer);

				me.comp('fileOutput').set({value: "完毕"});
			}
			me.comp('playTime').set({value: me.timeLen + "||" + data.getValue("timeLen")});
		}, 1000);
	};

	// 清空历史记录
	Model.prototype.deleteBtnClick = function(event) {
		this.comp("fileData").clear();
		this.comp('titleOutput').set({value: "清空历史记录"});
		this.comp('fileOutput').set({value: ""});
		localStorage.setItem(this.STORE_ID, "");
	};
	
	// 播放音乐
	Model.prototype.playBtnClick = function(event) {
		this.comp('titleOutput').set({value: "播放音乐！"});
		this.comp('fileOutput').set({value: ""});
		var me = this;
		
		var src = window.location.origin + require.toUrl("$UI/demo/device/process/audio/music.mp3");
		this.mediaRec = new Media(src,
				function(optio) {
					me.comp('fileOutput').set({value: "完毕"});
				},
				function(err) {
					me.comp('fileOutput').set({value: "失败:" + err});
				}
		);
		this.mediaRec.play();
	};

	Model.prototype.windowReceiverReceive = function(event){
		this.openByDialog = true;
	};

	Model.prototype.modelUnLoad = function(event){
		clearInterval(this.mediaTimer);
	};

	return Model;
});