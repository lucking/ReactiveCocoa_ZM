/**
 *  jQuery 扩展
 *  $.animate(params,[speed],[easing],[fn]) (jquery 原生动画)
 *  jquery 因为一些原因没有采用requestAnimationFrame
 *  同时animate只能动画数字 不能动画字符串 比如 background:red
 *  参考jquery.requestAnimationFrame.js等实现
 */
define(function(require){
	var $ = require('jquery');
	
	
	/**
	 * from bootstrap  for  emulateTransitionEnd 
	 */
	$.support.transition = (function(){
	    var el = document.createElement('bootstrap');
	
	    var transEndEventNames = {
	      'WebkitTransition' : 'webkitTransitionEnd'
	    , 'MozTransition'    : 'transitionend'
	    , 'OTransition'      : 'oTransitionEnd otransitionend'
	    , 'transition'       : 'transitionend'
	    };
	
	    for (var name in transEndEventNames) {
	      if (el.style[name] !== undefined) {
	        return { end: transEndEventNames[name] }
	      }
	    }
	    return false;
	})();
    // http://blog.alexmaccaw.com/css-transitions
    $.fn.emulateTransitionEnd = function (duration) {
      var called = false, $el = this
      $(this).one($.support.transition.end, function () { called = true })
      var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
      setTimeout(callback, duration)
      return this
    };
	
	
	
	
	$.fn.transform = function (transform) {
	    for (var i = 0; i < this.length; i++) {
	        var elStyle = this[i].style;
	        elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
	    }
	    return this;
	};

	$.fn.transition = function (duration) {
	    for (var i = 0; i < this.length; i++) {
	        var elStyle = this[i].style;
	        elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration + 'ms';
	    }
	    return this;
	};

	$.fn.transitionEnd = function (callback) {
	    var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
	        i, j, dom = this;
	    function fireCallBack(e) {
	        /*jshint validthis:true */
	        callback.call(this, e);
	        for (i = 0; i < events.length; i++) {
	            dom.off(events[i], fireCallBack);
	        }
	    }
	    if (callback) {
	        for (i = 0; i < events.length; i++) {
	            dom.on(events[i], fireCallBack);
	        }
	    }
	    return this;
	};
	
	$.fn.animationEnd = function (callback) {
	    var events = ['webkitAnimationEnd', 'OAnimationEnd', 'MSAnimationEnd', 'animationend'],
	        i, j, dom = this;
	    function fireCallBack(e) {
	        callback(e);
	        for (i = 0; i < events.length; i++) {
	            dom.off(events[i], fireCallBack);
	        }
	    }
	    if (callback) {
	        for (i = 0; i < events.length; i++) {
	            dom.on(events[i], fireCallBack);
	        }
	    }
	    return this;
	};

	$.supportTouch = (function () {
	    return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
	})();

	$.parseUrlQuery = function (url) {
	    var query = {}, i, params, param;
	    params = url.split(/[?#&]/);
	    for (i = 0; i < params.length; i++) {
	        if(params[i].indexOf("=")!=-1){
	            param = params[i].split('=');
	            query[param[0]] = param[1];
	        }
	    }
	    return query;
	};


	$.touchEvents = {
	    start: $.supportTouch ? 'touchstart' : 'mousedown',
	    move: $.supportTouch ? 'touchmove' : 'mousemove',
	    end: $.supportTouch ? 'touchend' : 'mouseup'
	};

	$.animationFrame = function (callback) {
	    if (window.requestAnimationFrame) return window.requestAnimationFrame(callback);
	    else if (window.webkitRequestAnimationFrame) return window.webkitRequestAnimationFrame(callback);
	    else if (window.mozRequestAnimationFrame) return window.mozRequestAnimationFrame(callback);
	    else {
	        return window.setTimeout(callback, 1000 / 60);
	    }
	};
	return {};
});