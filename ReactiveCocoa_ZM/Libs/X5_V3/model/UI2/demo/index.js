define(function(require){
	var $ = require("jquery"),
		FastClick = require("$UI/system/components/justep/lib/fastclick"),
		Notification = require('./js/notification'),
		History = require("$UI/system/lib/history/history"),
		justep = require("$UI/system/lib/justep");
	
	require("$UI/system/lib/cordova/cordova");
	require('$UI/system/lib/jquery/transition');
	
	require("w!$UI/demo/main/main.w");
	require("w!$UI/demo/menu/left2.w");
	require("w!$UI/portal/login.w");
	
	//为了compose后postMessage到这里终止
	window.isPortalWindow = true;
	
	//主要配置
	var mainPage = {
			url: '$model/UI2/demo/main/main.w',
			process: "/portal/process/message/messageProcess", 
			activity: "mainActivity"},
		leftPage = '$UI/demo/menu/left2.w',
		loginPage = "$UI/portal/login.w",
		logoutAction = '$UI/portal/DoLogout.j',
		mainPageId = 'main';
	
	var Model = function(){
		this.init();
		this.callParent();
	};
	
	Model.prototype = {
		getBSessionID: function(){
			return this.getContext().getBSessionID();
		},
		getLanguage: function(){
			return this.getContext().getLanguage();
		},
		getSkin: function(){
			return this.getContext().getSkin();
		},
		//返回一个.w url
		getURL: function(url, args){
			
			if(!url) return;
			if(typeof url !== 'string'){
				args = url;//TODO clone;
				url = args.url;
				delete args.url;
			}
			args = args || {};
			if(url && url.indexOf("http")!==0){
				//args.language = args.language || this.getLanguage();
				//args.skin = args.skin || this.getSkin();
				//args.bsessionid = justep.URL.getBSessionID();
				var params = [];
				for(var key in args){
					if(args.hasOwnProperty(key))
						params.push(key + '=' + (args[key] || ''));
				}
				params = params.join('&');
				url = url + (url.indexOf('?') == -1?'?':'&') + params;
				url = require.toUrl(url);
            }
            return url;
		},
		init: function(){
			//初始化接受postMessage消息
			var me = this;
			$(window).on('message',function(message){
				var data = message.originalEvent.data;
				if(data.type == "portal" && data.event){
					var name = data.event.name;
					if(typeof me[name] == 'function')
							me[name].apply(me, data.event.args);
				}
			});
			this.history = new History();
		},
		logout: function(){
            var url = this.getURL(logoutAction); 
            $.ajax({
                type: "POST",
                processData: false,
                url:  url,
                cache:false,
                async: false
            });
            window.location.href = this.getURL(loginPage, {manualLogin: true});
		},
		openPage: function(path, options){
			var me = this;
			options = options || {};
			var pages = this.comp('pages'),
				url = this.getURL(path, options),
				pid = url;
			if(!pages.has(pid))
				pages.loadContent(pid, url, function(err){
					if (err){
						setTimeout(function(){
							//hcr 特殊点, 必须知道错误对话框的btn
							$("#__justepErrorDialog__").find(".x-error-close").one("click", function(){
								setTimeout(function(){
									//以下逻辑应该和closePage类似, maduo支持closePage传pid后, 直接调用即可
									var index = me.openeds.indexOf(pid);
									if (index !== -1){
										me.openeds.splice(index, 1);
									}
									if (pages.getContent(pid))
										pages.getContent(pid).dispose();
								});
							}); 
						});
					}
				});
				
			setTimeout(after, 200);
			
			function after(){
				pages.to(pid);
				me.openeds.push(pid);
				me.current = justep.Util.clone(options);
				me.current.path = path;
				me.comp('portal').show('content');	
			}
		},
		closePage: function(){
			var pages = this.comp('pages');
			if(this.openeds[this.openeds.length - 1] !== mainPageId){
				var pid = this.openeds.pop();
				var to = this.openeds[this.openeds.length - 1];
				if(to != mainPageId)
					pages.remove(pid, to);
				else
					pages.remove(pid);
			}
		},
		reload: function(options){
			var url = window.location.href;
			if(window.location.hash)
				url = url.replace(window.location.hash, '');
			if(this.current && this.current.path  != mainPageId){
				url = url + '#' + justep.URL.getSearch({current: this.current});
			}
			url = new justep.URL(url);
			url.setParam(options);
			window.location.href = url.toString();
		},
		clear: function(){
			var pages = this.comp('pages');
			pages.to(mainPageId, function(){
				pages.removeOther();
			});
		},
		toggleMenu: function(){
			this.comp('portal').toggleLeft();
		},
		setSkin: function(value){
			var cur = this.getContext().getSkin() || 'default';
			if(cur != value){
				this.myStore('skin', value);
				this.reload({$skin: value});
			}
		},
		setLang: function(value){
			var cur = this.getContext().getLang();
			if(cur != value){
				this.myStore('lang', value);
				this.reload({lang: value});
			}
		},
		setDebug: function(value){
			this.myStore('debug', value);
			if(value)
				$("#debugBar").show();
			else
				$("#debugBar").hide();
		},
		store: function(name, value){
			if(value !== undefined){
				localStorage.setItem(name, value);		
			}else{
				value = localStorage.getItem(name);
				if(value === 'true') value = true;
				if(value === 'false') value = false;
				return value;
			}
		},
		myStore: function(name, value){
			name = this.getContext().getCurrentPersonID() + '.' + name;
			return this.store(name, value);
		}
	};
		
	Model.prototype.modelLoad = function(event){
		var pages = this.comp('pages'),
			portal = this.comp('portal');

		//加载主页面
		pages.loadContent(mainPageId, this.getURL(mainPage));
		
		//加载左边栏
		portal.loadLeftContent(this.getURL(leftPage));
		
		//open stack
		this.openeds = [mainPageId];
		
		//初始当前页
		var current = getParameter('current');
		if(current && current.path){
			var path = current.path;
			delete current.path;
			this.openPage(path, current);
		}else if(current && current != "main"){
			this.openPage(current);
		}
		
		FastClick.attach(document.body);
		
		var self = this;
		document.addEventListener("deviceready", function() {
			var exitAppTicker = 0;
			var listener = function(){
				if(pages.getActiveIndex() == 0){
					if(exitAppTicker == 0){
						exitAppTicker++;
						var msg = $('<div class="alert alert-success" style="z-index:999;text-align:center;font-size:16px;-webkit-transition:all 0.4s;-webkit-transform:translate3d(0,-100%,0);font-weight:bold;position:absolute;top:0;left:0;width:100%;">再按一次退出应用</div>').appendTo('body');
						setTimeout(function(){
							msg.transform('translate3d(0,0,0)');
						},1);
						setTimeout(function(){
							exitAppTicker = 0;
							msg.transform('translate3d(0,-100%,0)').transitionEnd(function(){
								msg.remove();
							});
						},2000);
					}else if(exitAppTicker == 1){
						navigator.app.exitApp();
					}	
				}else{
					history.back();
				}
			};
			document.addEventListener('backbutton', listener, false);
			$(window).on('beforeunload', function(){
				document.removeEventListener('backbutton', listener, false);
		    });
        }, false);
        
	};
	
	Model.prototype.pagesActiveChange = function(event){
		var me = this;
		setTimeout(function(){
			var pages = me.comp("pages");
			var pageXid = pages.getActiveXid();
			var portalUrl = new justep.URL(location.href);
			portalUrl.setParam("current",pageXid);
			me.history.pushState({}, "", portalUrl.toString());
		},600);
	};

	Model.prototype.toggleLeftClick = function(event){
		this.comp('portal').toggleLeft();
	};

	Model.prototype.prevClick = function(event){
		this.comp('pages').prev();
	};

	Model.prototype.nextClick = function(event){
		this.comp('pages').next();
	};

	Model.prototype.clearClick = function(event){
		this.clear();
	};

	Model.prototype.refreshClick = function(event){
		this.reload();
		window.location.reload();
	};

	return Model;
	
	function getParameter(name){
		var search = window.location.search;
		var params = {};
		search = search ? search : "";
		var hash = window.location.hash;
		if (hash && (hash.indexOf("=")!=-1)){
			search += "&" + hash.substring(1);
		}
		
		if (search.charAt(0) == "?"){
			search = search.substring(1);
		}
		
		var items = search.split("&");
		for (var i=0; i<items.length; i++){
			var item = items[i];
			var index = item.indexOf("=");
			if (item && (index!=-1)){
				var key = item.substring(0, index),
					value = decodeURIComponent(item.substring(index+1));
				if(key.indexOf('.') == '-1')
					params[key] = value;
				else{
					key = key.split('.');
					var obj = params[key[0]] = params[key[0]] || {};
					for(var j = 1;j<key.length-1;j++){
						obj = obj[key[j]] || {}; 
					}
					obj[key.pop()] = value;
				}
			}
		}
		return params[name];
	};

});