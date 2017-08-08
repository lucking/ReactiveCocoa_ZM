define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	//var biz = require("$UI/system/lib/biz");
	require("$UI/system/lib/cordova/cordova");
	require("css!$UI/demo/device/common/pub").load();
	require("cordova!org.apache.cordova.device-motion");

	var Model = function() {
		this.callParent();
		// 当前watchAcceleration 的引用ID
		this.watchID = null;
		this.playing = false;
	};

	Model.prototype.modelLoad = function(event){
		var me = this;
		document.addEventListener("deviceready", onDeviceReady, false);
		// 加载完成
		function onDeviceReady() {
			me.comp("shakeBtn").set({disabled: false});
			me.comp("getAccBtn").set({disabled: false});
			me.comp("listenBtn").set({disabled: false});
			me.comp("stopBtn").set({disabled: false});
		}
	};
	
	Model.prototype.modelUnLoad = function(event) {
		if (this.watchID) {
			navigator.accelerometer.clearWatch(this.watchID);
	}};

	// 关闭功能
	Model.prototype.backBtnClick = function(event) {
		if(this.watchID)
			navigator.accelerometer.clearWatch(this.watchID);
		justep.Portal.closeWindow();
	};

	//摇一摇
	Model.prototype.shakeBtnClick = function(event) {
		this.comp("contents1").to("shake");
		
		var oldValue = {
			x : null,
			y : null,
			z : null
		}
		var options = {	frequency : 800};
		var me = this;
		this.watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
		// 获取加速度信息成功后的回调函数
		function onSuccess(newValue) {
			if(me.playing)
				return;
			
			var changes = {}, bound = 6;
			if (oldValue.x !== null) {
				changes.x = Math.abs(oldValue.x - newValue.x);
				changes.y = Math.abs(oldValue.y - newValue.y);
				changes.z = Math.abs(oldValue.z - newValue.z);
				
				if (changes.x > bound || changes.y > bound || changes.z > bound) {
					me.playAnimate();
				}
			}
			oldValue = {
				x : newValue.x,
				y : newValue.y,
				z : newValue.z
			}
		};
		// 获取加速度信息失败后的回调函数
		function onError() {
			alert('失败!');
		};
	};

	//播放动画和声音
	Model.prototype.playAnimate = function() {
		var src = window.location.origin + require.toUrl("$UI/demo/device/process/accelerometer/kacha.mp3");
		this.mediaRec = new Media(src,	function(optio) {},	function(err) {});
		this.mediaRec.play();

		var slideHeight = $("#topImage").height() / 2;
		var me = this;
		me.playing = true;
		$("#topImage").animate({top:'-'+slideHeight+'px',},"slow");
		$("#bottomImage").animate({top:'+='+slideHeight+'px',},"slow", openEnd);

		function openEnd(){
			$("#topImage").animate({top:'0px',},"slow");
			$("#bottomImage").animate({top:'-='+slideHeight+'px',},"slow",playEnd);
		};

		function playEnd(){
			me.playing = false;
		};

/*		window.setTimeout(function(){
			$("#topImage").animate({top:'0px',},"slow");
			$("#bottomImage").animate({top:'-=150px',},"slow",playEnd);
		},2000);*/
	};
			
	//获取当前设备加速度
	Model.prototype.getAccBtnClick = function(event) {
		var me = this;
		me.comp("contentData").setValue("title",'获取当前设备加速度');
	    me.comp("contentData").setValue("x", 'X 轴: ');
	    me.comp("contentData").setValue("y", 'Y 轴: ');
	    me.comp("contentData").setValue("z", 'Z 轴: ');

		// 接收包含当前加速度信息的Acceleration 对象
		function onSuccess(acceleration) {
		    me.comp("contentData").setValue("x", 'X 轴: ' +acceleration.x);
		    me.comp("contentData").setValue("y", 'Y 轴: ' +acceleration.y);
		    me.comp("contentData").setValue("z", 'Z 轴: ' +acceleration.z);
		}

		// 获取加速度信息失败后的回调函数
		function onError() {
		    me.comp("contentData").setValue("x", "失败");
		}
		navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
	};

	//监听设备加速度变化
	Model.prototype.listenBtnClick = function(event) {
		var me = this;
		me.comp("contentData").setValue("title",'监听设备加速度变化');
	    me.comp("contentData").setValue("x", 'X 轴: ');
	    me.comp("contentData").setValue("y", 'Y 轴: ');
	    me.comp("contentData").setValue("z", 'Z 轴: ');
		var options = {
			frequency : 500
		};
		this.watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
		// 获取加速度信息成功后的回调函数
		function onSuccess(acceleration) {
		    me.comp("contentData").setValue("x", 'X 轴: ' +acceleration.x);
		    me.comp("contentData").setValue("y", 'Y 轴: ' +acceleration.y);
		    me.comp("contentData").setValue("z", 'Z 轴: ' +acceleration.z);
		}
		// 获取加速度信息失败后的回调函数
		function onError() {
		    me.comp("contentData").setValue("x", "失败");
		}
	};

	//停止监听设别加速度变化
	Model.prototype.stopBtnClick = function(event) {
		if (this.watchID) {
			navigator.accelerometer.clearWatch(this.watchID);
			this.comp("contentData").setValue("title",'停止监听设备加速度变化');
			this.comp("contentData").setValue("x", '');
			this.comp("contentData").setValue("y", '');
			this.comp("contentData").setValue("z", '');
			this.watchID = null;
		}
	};
	
	//从摇一摇返回
	Model.prototype.yBackBtnClick = function(event) {
		navigator.accelerometer.clearWatch(this.watchID);
		this.comp("contents1").to("main");
	};
	
	return Model;
});
