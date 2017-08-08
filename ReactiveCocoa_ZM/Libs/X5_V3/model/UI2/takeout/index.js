define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var baasClient = require("./baasClient");
	require("$UI/system/lib/cordova/cordova");
	require("cordova!org.apache.cordova.device");
	require("res!./img");

	var Model = function() {
		this.callParent();
	};

	Model.prototype.modelLoad = function(event) {
		this.loadFoodData();
		var self = this;
		
		$(self.getElementByXid("photoDiv")).hide();
		
		// 获取url上的code参数 - 微信授权code，用于获取微信用户信息
		var weixinCode = this.getContext().getRequestParameter("code");

		// 判断运行环境是否在X5移动客户端中，如果在移动客户端中，则当deviceready后取手机设备uuid作为用户唯一标识
		if (justep.Browser.isX5App) {
			document.addEventListener("deviceready", function() {
				self.loadUserData({
					"id" : window.device.uuid,
					"name" : "新用户（来自X5APP的用户）"
				});
			}, false);
		} else if (weixinCode !== "") {
			// 微信用户
			$.getJSON("/x5baas/weixin/userinfo?code=" + weixinCode, function(weixinUser) {
				$(self.getElementByXid("photoDiv")).show();
				$(self.getElementByXid("photoImage")).attr("src", weixinUser.headimgurl);
				self.loadUserData({
					"id" : weixinUser.openid,
					"name" : weixinUser.nickname + "（来自微信的用户）",
					"address" : weixinUser.country + weixinUser.province + weixinUser.city
				});
			});
		} else {
			this.loadUserData({
				"id" : "_temp_user_",
				"name" : "新用户"
			});
		}
	};

	Model.prototype.loadFoodData = function() {
		baasClient.loadData([ {
			"queryName" : "queryFoodAll",
			"params" : {},
			"data" : this.comp("foodData")
		} ], null, function(){});
	};

	Model.prototype.loadUserData = function(userInfo) {
		var self = this;
		var userData = this.comp("userData");
		var orderData = this.comp("orderData");
		
		// 加载成功，但是没有数据，生成新用户
		var success = function(json) {
			if (userData.getCount() === 0) {
				self.createNewUser(userInfo);
			}
		};
		// 加载失败，没有连接到数据库服务器，为了演示体验也生成新用户
		var error = function() {
			self.createNewUser(userInfo);
		};
		// 同时加载用户和用户的订单
		baasClient.loadData([ {
			"queryName" : "queryUserByID",
			"params" : {
				"id" : userInfo.id
			},
			"data" : userData
		}, {
			"queryName" : "queryOrderByUserID",
			"params" : {
				"userID" : userInfo.id
			},
			"data" : orderData
		} ], success, error);
	};

	Model.prototype.createNewUser = function(userInfo) {
		this.comp("userData").newData({
			index : 0,
			defaultValues : [ {
				"fID" : userInfo.id,
				"fName" : userInfo.name,
				"fAddress" : userInfo.address
			} ]
		});
	};

	Model.prototype.addCartBtnClick = function(event) {
		var row = event.bindingContext.$object;
		var cartData = this.comp("cartData");
		if (cartData.find(['fFoodID'], [row.val('fID')]).length === 0) {
			cartData.newData({
				index : 0,
				defaultValues : [ {
					"fFoodID" : row.val("fID"),
					"fName" : row.val("fName"),
					"fPrice" : row.val("fPrice"),
					"fCount" : 1
				} ]
			});
		}
	};

	Model.prototype.addCountBtnClick = function(event) {
		var row = event.bindingContext.$object;
		row.val("fCount", row.val("fCount") + 1);
	};

	Model.prototype.reduceCountBtnClick = function(event) {
		var row = event.bindingContext.$object;
		row.val("fCount", (row.val("fCount") > 0) ? row.val("fCount") - 1 : 0);
	};

	Model.prototype.saveOrderBtnClick = function(event) {
		var self = this;
		var orderData = this.comp("orderData");
		var cartData = this.comp("cartData");
		var userData = this.comp("userData");
		if ($.trim(userData.val("fName")) === "" || $.trim(userData.val("fPhoneNumber")) === "" || $.trim(userData.val("fAddress")) === "") {
			this.comp("messageDialog").show({
				"title" : "警告",
				"message" : "请填写完整的用户信息"
			});
			return;
		}

		var content = "";
		cartData.each(function(options) {
			var row = options.row;
			content = content + row.val("fName") + "(" + row.val("fCount") + ") ";
		});

		var orderRows = orderData.newData({
			index : 0,
			defaultValues : [ {
				"fID" : justep.UUID.createUUID(),
				"fCreateTime" : justep.Date.toString(new Date(), justep.Date.STANDART_FORMAT),
				"fContent" : content,
				"fUserID" : userData.val("fID"),
				"fUserName" : userData.val("fName"),
				"fPhoneNumber" : userData.val("fPhoneNumber"),
				"fAddress" : userData.val("fAddress"),
				"fSum" : cartData.sum("calcMoney") + ""
			} ]
		});

		// 保存成功清除购物车，并跳转到订单页
		var success = function() {
			cartData.clear();
			self.comp("contents").to("orderContent");
			self.comp("messageDialog").show({
				"title" : "提醒",
				"message" : "下单成功，谢谢您的订餐！"
			});
		};
		// 保存失败后清除失败的订单数据
		var error = function(request, textStatus, errorThrown) {
			orderData.deleteData(orderRows);
			baasClient.errorProcesser(request, textStatus, errorThrown);
		};
		baasClient.saveData([ {
			"entityName" : "Order",
			"data" : orderData
		}, {
			"entityName" : "User",
			"data" : userData
		} ], success, error);
	};

	Model.prototype.cleanCartBtnClick = function(event) {
		this.comp("cartData").clear();
	};

	Model.prototype.saveUserBtnClick = function(event) {
		var self = this;
		baasClient.saveData([ {
			"entityName" : "User",
			"data" : this.comp("userData")
		} ], function() {
			self.comp("messageDialog").show({
				"title" : "提醒",
				"message" : "用户信息修改成功！"
			});
		});
	};

	// 转换动态图片URL 
	Model.prototype.transURL = function(url) {
		return require.toUrl(url);
	};
	return Model;
});