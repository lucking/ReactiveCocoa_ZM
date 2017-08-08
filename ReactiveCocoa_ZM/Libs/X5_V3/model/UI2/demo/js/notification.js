/*======================================================
************   Notifications   ************
======================================================*/

define(function(require){
	require("css!$UI/demo/css/notification").load();
	var $ = require('jquery');
	var _tempNotificationElement;
	var Notification = function (params) {
		/**
		 * 
		 * {
		 * 		media:
		 * 		title:
		 * 		subtitle:
		 * 		closeOnClick:
		 * 		hold:
		 * 		custom:	
		 * 		onClick:
		 * 		additionalClass:	
		 * 		
		 * 		
		 * }
		 * 
		 * 
		 */
	    if (!params) return;
	    
	    if (typeof params.media === 'undefined') params.media = '<i class="icon icon-x5"></i>';
	    if (typeof params.title === 'undefined') params.title = 'x5';
	    if (typeof params.closeIcon === 'undefined') params.closeIcon = true;
	    if (typeof params.subtitle === 'undefined') params.subtitle = 'x5 app';
	    if (typeof params.closeOnClick === 'undefined') params.closeOnClick = false;

	    if (!_tempNotificationElement) _tempNotificationElement = document.createElement('div');

	    var container = $('.notifications');
	    if (container.length === 0) {
	        $('body').append('<div class="notifications list-block media-list"><ul></ul></div>');
	        container = $('.notifications');
	    }
	    var list = container.children('ul');

	    var itemHTML;
	    if (params.custom) {
	        itemHTML = '<li>' + params.custom + '</li>';
	    }
	    else {
	        itemHTML = '<li class="notification-item notification-hidden"><div class="item-content">' +
	                        (params.media ?
	                        '<div class="item-media">' +
	                            params.media +
	                        '</div>' : '') +
	                        '<div class="item-inner">' +
	                            '<div class="item-title-row">' +
	                                (params.title ? '<div class="item-title">' + params.title + '</div>' : '') +
	                                (params.closeIcon ? '<div class="item-after"><a href="#" class="close-notification"><span></span></a></div>' : '') +
	                            '</div>' +
	                            (params.subtitle ? '<div class="item-subtitle">' + params.subtitle + '</div>' : '') +
	                            (params.message ? '<div class="item-text">' + params.message + '</div>' : '') +
	                        '</div>' +
	                    '</div></li>';
	    }
	    _tempNotificationElement.innerHTML = itemHTML;

	    var item = $(_tempNotificationElement).children();
	    this.item = item;
	    item.on('click', $.proxy(function (e) {
	        if ($(e.target).is('.close-notification') || $(e.target).parents('.close-notification').length > 0){
	        	this.close();
	        }else {
	        	if (params.onClick) {
		        	params.onClick(e, item[0]);
		        }
	        	if (params.closeOnClick) {
		        	this.close();
		        }
	        }
	    },this));
	    if (params.onClose) {
	        item.data('notificationOnClose', function () {
	            params.onClose(item[0]);
	        });
	    }
	    if (params.additionalClass) {
	        item.addClass(params.additionalClass);
	    }
	    if (params.hold) {
	        setTimeout(function () {
	            if (item.length > 0) this.close();
	        }, params.hold);
	    }

	    list.prepend(item[0]);
	    
	    
	    var itemHeight = item.height();
	    item.css('marginTop', -itemHeight + 'px');
	    item.transition(0);

	    var clientLeft = item[0].clientLeft;
	    item.transition('');
	    item.css('marginTop', '0px');

	    container.transform('translate3d(0, 0,0)');
	    item.removeClass('notification-hidden');
	    container.css('display','block');
	    return item[0];
	};
	Notification.prototype.close = function () {
	    if (this.item.length === 0) return;
	    if (this.item.hasClass('notification-item-removing')) return;
	    var container = $('.notifications');

	    var itemHeight = this.item.height();
	    this.item.css('height', itemHeight + 'px').transition(0);
	    var clientLeft = this.item[0].clientLeft;

	    this.item.fadeOut(400).transition('').addClass('notification-item-removing');
	    if (this.item.data('notificationOnClose')){
	    	this.item.data('notificationOnClose')();	
	    }

	    if (container.find('.notification-item:not(.notification-item-removing)').length === 0) {
	        container.transform('');
	    }
	    
	    this.item.addClass('notification-hidden').transitionEnd(function () {
	        this.item.remove();
	        if (container.find('.notification-item').length === 0) {
	            container.hide();
	        }
	    });
	};
	return Notification;
});

