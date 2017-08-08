define(function(require){
	var $=require('jquery'),
		Object = require("$UI/system/lib/base/object"),
		UUID = require("$UI/system/lib/base/uuid"),
		LinkedList = require("./linkedList"),
		Hash = require("./hash"),
		Component = require("$UI/system/lib/base/component"),
		Url = require("$UI/system/lib/base/url"),
		_history = window.history,
		histories = new LinkedList(),
		stepNum = 1,
		needAddEventListener = true,
		stepPrefix = '_step',
		/**
		 * 在事件中触发的history不在重复添加
		 */
		_inEvent = false;
	
	var History = Object.extend({
		constructor: function(){
			var hid = UUID.createUUID();
			this.historyID = hid;
			if(this.domNode){
				$(this.domNode).attr('data-history',hid);
			}
			this.bindEvent();
		}
	});
	
	History.prototype.bindEvent = function(){
		if(needAddEventListener){
			$(window).on('hashchange',$.proxy(function(event){
				var e = event.originalEvent;
				var newUrl = e.newURL;
				var oldUrl = e.oldURL;
				var historyState = null;
				var isBack = true;
				if(histories.getLast()){
					var historyItem = histories.find(function(item){
						if(item.data().url == newUrl && item.data().fromUrl == oldUrl){
							return true;
						}
					});
					if(historyItem){
						isBack = false;
						historyState = historyItem.data();
					}else{
						historyItem = histories.find(function(item){
							if(item.data().url == oldUrl && item.data().fromUrl == newUrl){
								return true;
							}
						});
						if(historyItem){
							isBack = true;
							historyState = historyItem.data();
						}
					}
				}
				/**
				 *  忽略不认识的url
				 *	同时兼容组件销毁时候会删除在histories中所有相关historyState的情况
				 */				
				if(historyState){
					var hid = historyState.id;
					var comp = Component.getComponent($('[data-history="'+hid+'"]').get(0));
					if(comp == null){
						this.back();
						return;
					}
					var event = {
						data:historyState.data,
						title:historyState.title,
						url:historyState.url,
						id:historyState.id
					};
					var ret,eventName;
					if(isBack){
						console.log('后退');
						eventName = 'historyBack';
					}else{
						console.log('前进');
						eventName = 'historyForward';
					}
					_inEvent = true;
					ret = comp.fireEvent(eventName,event);
					_inEvent = false;
					if(ret != false && this.getModel){
						ret = this.getModel().fireEvent(eventName,event);
					}
					if(ret != false){
						if(isBack){
						   this.back();
						}else{
							this.forward();
						}
					}
				}else{
					/**
					 * hashChange 时候 
					 * 如果oldUrl 的history 为 pageUrl 
					 * 说明是为了此url是为了显示正确的url而添加的历史需要再次回退 
					 */
					var hash = new Hash(oldUrl);
					var historyValue = hash.val('history');
					if(historyValue == "_pageUrl_" || historyValue == "pageUrl"){
						this.back();
					}
				}
			},this));
			$(window).on('popstate',$.proxy(function(event){
				/**
				 * hashChange 时候 
				 * 如果Url 的history 为 pageUrl 
				 * 说明是为了此url是为了显示正确的url而添加的历史需要再次回退 
				 */
				var hash = new Hash(location.hash);
				var historyValue = hash.val('history');
				if(historyValue == "pageUrl"){
					this.back();
				}
			},this));
			needAddEventListener = false;
		}
	};
    
	History.prototype.getHash = function(url){
		return url.split('#').slice(1).join();
	};
	History.prototype.go = function(index){
		return _history.go(index);
	};
	History.prototype.back = function(){
		return _history.back();
	};
	History.prototype.forward = function(){
		return _history.forward();
	};
	
	
	History.prototype.backByParent = function(){
		if(JustepApp){
			prompt("justepUtils:historyBack","");
		}else{
			console.log('TODO: no history can back in browser ');
		}
	};
	
	History.prototype._pushUrl = function(data,title,url){
		if(_inEvent){
    		return;
    	}
		var self = this;
		if(url.indexOf("#") == -1){
    		url = url + "#"
    	}
    	var fromUrl = location.href,hashValue;
    	hashValue = url.split("#")[1];
    	var urlHash = new Hash();
    	urlHash.val('history',"_pageUrl_");
    	urlHash.val('hash',hashValue);
    	var newUrl = url.split("#")[0] + urlHash; 
		console.log("url:" + newUrl);
		
		var currentUrlHash = new Hash(location.hash);
		currentUrlHash.val('history',"pageUrl");
		currentUrlHash.val('hash',location.hash);
		_history.pushState(data, title, currentUrlHash);
		_history.pushState(data, title, newUrl);
	};
	
	History.prototype._pushHash = function(data,title,hash){
		if(_inEvent){
    		return;
    	}
    	var self = this,hashValue;
    	var fromUrl = location.href;
    	hashValue = hash.slice(1);
    	hashValue = hashValue + stepPrefix + stepNum; 
    	
    	var locationHash = new Hash(location.hash);
		locationHash.val('history',hashValue);
		_history.pushState(data, title, locationHash);
    	histories.push({
    		url:window.location.href,
    		fromUrl:fromUrl,
    		id:self.historyID,
    		data:data,
    		title:title,
    		hash:hashValue
    	});
    	stepNum++;
	};
	
    History.prototype.pushState = function(data,title,url){
    	if(url.charAt(0)=="#"){
    		this._pushHash(data,title,url);
    	}else{
    		this._pushUrl(data,title,url);
    	}
    	
    	
    };
    History.prototype.replaceState = function(data,title,hash){
    	if(_inEvent){
    		return;
    	}
    	var self = this;
    	var fromUrl = location.href;
    	if(hash.charAt(0)!='#'){
    		hashValue = hash;
    		hash = '#' + hash;
    	}else{
    		hashValue = hash.slice(1);
    	}
    	hashValue = hashValue + stepPrefix + stepNum;
    	
    	histories.removeLast();
    	var locationHash = new Hash(location.hash);
		locationHash.val('history',hashValue);
		_history.replaceState(data, title, locationHash);
    	histories.push({
    		url:window.location.href,
    		fromUrl:fromUrl,
    		id:self.historyID,
    		data:data,
    		title:title,
    		hash:hashValue
    	});
    };
    return History;
});