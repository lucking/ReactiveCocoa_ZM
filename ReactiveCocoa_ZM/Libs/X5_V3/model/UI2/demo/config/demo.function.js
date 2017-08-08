define(function(require) {
	require("w!/UI2/system/components/justep/windowDialog/demo/demo.w");
	require("w!/UI2/system/components/justep/messageDialog/demo/demo.w");
	require("w!/UI2/system/components/justep/menu/demo/base.w");
	require("w!/UI2/system/components/justep/controlGroup/demo/demo.w");
	require("w!/UI2/system/components/justep/list/demo/news.w");
	require("w!/UI2/system/components/justep/labelEdit/demo/demo.w");
	require("w!/UI2/system/components/justep/select/demo/select.w");
	require("w!/UI2/system/components/justep/button/demo/checkbox.w");
	require("w!/UI2/system/components/justep/button/demo/radio.w");
	require("w!/UI2/system/components/justep/button/demo/toggle.w");
	require("w!/UI2/system/components/justep/button/demo/button.w");
	require("w!/UI2/system/components/justep/textarea/demo/textarea.w");
	require("w!/UI2/system/components/justep/output/demo/output.w");
	require("w!/UI2/system/components/justep/input/demo/range.w");
	require("w!/UI2/system/components/justep/input/demo/input.w");
	require("w!/UI2/system/components/justep/windowContainer/demo/main.w");
	require("w!/UI2/system/components/justep/wing/demo/wing.w");
	require("w!/UI2/system/components/justep/popMenu/demo/popMenu.w");
	require("w!/UI2/system/components/justep/popOver/demo/base.w");
	require("w!/UI2/system/components/justep/row/demo/base.w");
	require("w!/UI2/system/components/justep/scrollView/demo/list/demo.w");
	require("w!/UI2/system/components/bootstrap/row/demo/grid.w");
	require("w!/UI2/system/components/justep/panel/demo/panel.w");
	require("w!/UI2/system/components/justep/contents/demo/contents.w");
	require("w!/UI2/system/components/justep/model/demo/model.w");
	require("w!/UI2/system/components/justep/cordova/demo/www/index.w");
	require("w!/UI2/demo/device/process/geolocation/mainActivity.w");
	require("w!/UI2/demo/device/process/barcode/mainActivity.w");
	require("w!/UI2/demo/device/process/audio/mainActivity.w");
	require("w!/UI2/demo/device/process/accelerometer/mainActivity.w");
	require("w!/UI2/demo/device/process/camera/mainActivity.w");
	require("w!/UI2/demo/uiSample/todoMVC/index.w");
	require("w!/UI2/takeout/index.w");
	require("w!/UI2/system/components/justep/data/demo/base.w");
	require("w!/UI2/system/components/justep/barcode/demo/demoBarcodeImage.w");
	return {
		"$children" : [ {
			"$children" : [ {
				"$name" : "item",
				"$text" : "",
				"display" : "solid",
				"label" : "外卖",
				"psmCount" : "1",
				"url" : "/UI2/takeout/index.w"
			}, {
				"$name" : "item",
				"$text" : "",
				"display" : "solid",
				"label" : "TodoMVC",
				"psmCount" : "1",
				"url" : "/UI2/demo/uiSample/todoMVC/index.w"
			} ],
			"$name" : "item",
			"$text" : "",
			"display" : "solid",
			"label" : "演示案例"
		},{
			"$children" : [ {
				"$name" : "item",
				"$text" : "",
				"display" : "solid",
				"label" : "摄像头拍照/录像",
				"psmCount" : "1",
				"url" : "/UI2/demo/device/process/camera/mainActivity.w"
			}, {
				"$name" : "item",
				"$text" : "",
				"display" : "solid",
				"label" : "加速度传感器",
				"psmCount" : "1",
				"url" : "/UI2/demo/device/process/accelerometer/mainActivity.w"
			}, {
				"$name" : "item",
				"$text" : "",
				"display" : "solid",
				"label" : "音频录制/播放",
				"psmCount" : "1",
				"url" : "/UI2/demo/device/process/audio/mainActivity.w"
			}, {
				"$name" : "item",
				"$text" : "",
				"display" : "solid",
				"label" : "二维码扫描",
				"psmCount" : "1",
				"url" : "/UI2/demo/device/process/barcode/mainActivity.w"
			}, {
				"$name" : "item",
				"$text" : "",
				"display" : "solid",
				"label" : "地图/地理定位",
				"psmCount" : "1",
				"url" : "/UI2/demo/device/process/geolocation/mainActivity.w"
			} ],
			"$name" : "item",
			"$text" : "",
			"display" : "solid",
			"label" : "硬件能力"
		}, {
			"$children" : [{
				"$name" : "item",
				"$text" : "",
				"display" : "solid",
				"label" : "硬件能力(cordova)",
				"psmCount" : "1",
				"url" : "/UI2/system/components/justep/cordova/demo/www/index.w"
			}, {
				"$name" : "item",
				"$text" : "",
				"display" : "solid",
				"label" : "model",
				"psmCount" : "1",
				"url" : "/UI2/system/components/justep/model/demo/model.w"
			}, {
				"$name" : "item",
				"$text" : "",
				"display" : "solid",
				"label" : "contents",
				"psmCount" : "1",
				"url" : "/UI2/system/components/justep/contents/demo/contents.w"
			}, {
				"$name" : "item",
				"$text" : "",
				"display" : "solid",
				"label" : "panel",
				"psmCount" : "1",
				"url" : "/UI2/system/components/justep/panel/demo/panel.w"
			}, {
				"$name" : "item",
				"$text" : "",
				"display" : "solid",
				"label" : "grid 9",
				"psmCount" : "1",
				"url" : "/UI2/system/components/bootstrap/row/demo/grid.w"
			}, {
				"$name" : "item",
				"$text" : "",
				"display" : "solid",
				"label" : "row",
				"psmCount" : "1",
				"url" : "/UI2/system/components/justep/row/demo/base.w"
			}, {
				"$name" : "item",
				"$text" : "",
				"display" : "solid",
				"label" : "popOver",
				"psmCount" : "1",
				"url" : "/UI2/system/components/justep/popOver/demo/base.w"
			}, {
				"$name" : "item",
				"$text" : "",
				"display" : "solid",
				"label" : "popMenu",
				"psmCount" : "1",
				"url" : "/UI2/system/components/justep/popMenu/demo/popMenu.w"
			}, {
				"$name" : "item",
				"$text" : "",
				"display" : "solid",
				"label" : "wing",
				"psmCount" : "1",
				"url" : "/UI2/system/components/justep/wing/demo/wing.w"
			}, {
				"$name" : "item",
				"$text" : "",
				"display" : "solid",
				"label" : "windowContainer",
				"psmCount" : "1",
				"url" : "/UI2/system/components/justep/windowContainer/demo/main.w"
			}, {
				"$name" : "item",
				"$text" : "",
				"label" : "input",
				"psmCount" : "1",
				"url" : "/UI2/system/components/justep/input/demo/input.w"
			}, {
				"$name" : "item",
				"$text" : "",
				"display" : "solid",
				"label" : "range",
				"psmCount" : "1",
				"url" : "/UI2/system/components/justep/input/demo/range.w"
			}, {
				"$name" : "item",
				"$text" : "",
				"display" : "solid",
				"label" : "output",
				"psmCount" : "1",
				"url" : "/UI2/system/components/justep/output/demo/output.w"
			}, {
				"$name" : "item",
				"$text" : "",
				"display" : "solid",
				"label" : "textarea",
				"psmCount" : "1",
				"url" : "/UI2/system/components/justep/textarea/demo/textarea.w"
			}, {
				"$name" : "item",
				"$text" : "",
				"display" : "solid",
				"label" : "button",
				"psmCount" : "1",
				"url" : "/UI2/system/components/justep/button/demo/button.w"
			}, {
				"$name" : "item",
				"$text" : "",
				"display" : "solid",
				"label" : "toggle",
				"psmCount" : "1",
				"url" : "/UI2/system/components/justep/button/demo/toggle.w"
			}, {
				"$name" : "item",
				"$text" : "",
				"display" : "solid",
				"label" : "radio",
				"psmCount" : "1",
				"url" : "/UI2/system/components/justep/button/demo/radio.w"
			}, {
				"$name" : "item",
				"$text" : "",
				"display" : "solid",
				"label" : "checkbox",
				"psmCount" : "1",
				"url" : "/UI2/system/components/justep/button/demo/checkbox.w"
			}, {
				"$name" : "item",
				"$text" : "",
				"display" : "solid",
				"label" : "select",
				"psmCount" : "1",
				"url" : "/UI2/system/components/justep/select/demo/select.w"
			}, {
				"$name" : "item",
				"$text" : "",
				"display" : "solid",
				"label" : "labelEdit",
				"psmCount" : "1",
				"url" : "/UI2/system/components/justep/labelEdit/demo/demo.w"
			}, {
				"$name" : "item",
				"$text" : "",
				"label" : "list",
				"psmCount" : "1",
				"url" : "/UI2/system/components/justep/list/demo/news.w"
			},{
				"$name" : "item",
				"$text" : "",
				"display" : "solid",
				"label" : "controlGroup",
				"psmCount" : "1",
				"url" : "/UI2/system/components/justep/controlGroup/demo/demo.w"
			}, {
				"$name" : "item",
				"$text" : "",
				"label" : "menu",
				"psmCount" : "1",
				"url" : "/UI2/system/components/justep/menu/demo/base.w"
			}, {
				"$name" : "item",
				"$text" : "",
				"display" : "solid",
				"label" : "messageDialog",
				"psmCount" : "1",
				"url" : "/UI2/system/components/justep/messageDialog/demo/demo.w"
			}, {
				"$name" : "item",
				"$text" : "",
				"display" : "solid",
				"label" : "windowDialog",
				"psmCount" : "1",
				"url" : "/UI2/system/components/justep/windowDialog/demo/demo.w"
			} ,{
				"$name" : "item",
				"$text" : "",
				"label" : "data",
				"psmCount" : "1",
				"url" : "/UI2/system/components/justep/data/demo/base.w"
			},
			{
				"$name" : "item",
				"$text" : "",
				"label" : "barcodeImage",
				"psmCount" : "1",
				"url" : "/UI2/system/components/justep/barcode/demo/demoBarcodeImage.w"
			}],
			"$name" : "item",
			"$text" : "",
			"label" : "组件"
		} ],
		"$name" : "root",
		"$text" : ""
	};
});