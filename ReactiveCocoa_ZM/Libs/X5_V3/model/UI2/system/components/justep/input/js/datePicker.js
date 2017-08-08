/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
/*!
* Modified from jQuery MobiScroll v1.0.2
* http://mobiscroll.com
*
* Copyright 2010-2011, Acid Media
* Licensed under the MIT license.
*
*/
define(function(require) {
	var $ = require("jquery"), justep = require("$UI/system/lib/justep");

	require('$UI/system/resources/system.res');
	require('css!../css/datePicker').load();

	function DatePicker(elm, dw, settings) {
		var that = this;
		var yOrd;
		var mOrd;
		var dOrd;
		var show = false;

		this.settings = settings;
		this.values = null;
		this.val = null;
		// Temporary values
		this.temp = null;

		this.setDefaults = function(o) {
			$.extend(defaults, o);
		};

		this.formatDate = function(format, date, settings) {
			if (!date)
				return null;
			return justep.Date.toString(date, format);
		};

		this.parseDate = function(format, value, settings) {
			var def = new Date();
			if (!format || !value)
				return def;
			return justep.Date.fromString(value, format);
		};

		this.setValue = function(input) {
			if (input === undefined)
				input = true;
			var v = this.formatResult();
			this.val = v;
			this.values = this.temp.slice(0);
			if (input && $(elm).is('input'))
				$(elm).val(v).change();
		};

		this.getDate = function() {
			var d = this.values;
			var s = this.settings;
			var hour;
			if (s.preset == 'date')
				return new Date(d[yOrd], d[mOrd], d[dOrd]);
			if (s.preset == 'time') {
				hour = (s.ampm && d[s.seconds ? 3 : 2] == 'PM' && (d[0] - 0) < 12) ? (d[0] - 0 + 12) : d[0];
				return new Date(1970, 0, 1, hour, d[1], s.seconds ? d[2] : null);
			}
			if (s.preset == 'datetime') {
				hour = (s.ampm && d[s.seconds ? 6 : 5] == 'PM' && (d[3] - 0) < 12) ? (d[3] - 0 + 12) : d[3];
				return new Date(d[yOrd], d[mOrd], d[dOrd], hour, d[4], s.seconds ? d[5] : null);
			}
		};

		this.setDate = function(d, input) {
			var s = this.settings;
			var hour;
			if (s.preset.match(/date/i)) {
				this.temp[yOrd] = d.getFullYear();
				this.temp[mOrd] = d.getMonth();
				this.temp[dOrd] = d.getDate();
			}
			if (s.preset == 'time') {
				hour = d.getHours();
				this.temp[0] = (s.ampm) ? (hour > 12 ? (hour - 12) : (hour === 0 ? 12 : hour)) : hour;
				this.temp[1] = d.getMinutes();
				if (s.seconds)
					this.temp[2] = d.getSeconds();
				if (s.ampm)
					this.temp[s.seconds ? 3 : 2] = hour > 11 ? 'PM' : 'AM';
			}
			if (s.preset == 'datetime') {
				hour = d.getHours();
				this.temp[3] = (s.ampm) ? (hour > 12 ? (hour - 12) : (hour === 0 ? 12 : hour)) : hour;
				this.temp[4] = d.getMinutes();
				if (s.seconds)
					this.temp[2] = d.getSeconds();
				if (s.ampm)
					this.temp[s.seconds ? 6 : 5] = hour > 11 ? 'PM' : 'AM';
			}
			this.setValue(input);
		};

		this.parseValue = function(val) {
			var s = this.settings;
			if (this.preset) {
				var result = [];
				var d, hour;
				if (s.preset == 'date') {
					try {
						d = this.parseDate(s.dateFormat, val, s);
					} catch (e) {
						d = new Date();
					}
					result[yOrd] = d.getFullYear();
					result[mOrd] = d.getMonth();
					result[dOrd] = d.getDate();
				} else if (s.preset == 'time') {
					try {
						d = this.parseDate(s.timeFormat, val, s);
					} catch (e) {
						d = new Date();
					}
					hour = d.getHours();
					result[0] = (s.ampm) ? (hour > 12 ? (hour - 12) : (hour === 0 ? 12 : hour)) : hour;
					result[1] = d.getMinutes();
					if (s.seconds)
						result[2] = d.getSeconds();
					if (s.ampm)
						result[s.seconds ? 3 : 2] = hour > 11 ? 'PM' : 'AM';
				} else if (s.preset == 'datetime') {
					try {
						d = this.parseDate(justep.Date.STANDART_FORMAT, val, s);
					} catch (e) {
						d = new Date();
					}
					hour = d.getHours();
					result[yOrd] = d.getFullYear();
					result[mOrd] = d.getMonth();
					result[dOrd] = d.getDate();
					result[3] = (s.ampm) ? (hour > 12 ? (hour - 12) : (hour === 0 ? 12 : hour)) : hour;
					result[4] = d.getMinutes();
					if (s.seconds)
						result[5] = d.getSeconds();
					if (s.ampm)
						result[s.seconds ? 6 : 5] = hour > 11 ? 'PM' : 'AM';
				}
				return result;
			}
			return s.parseValue(val);
		};

		this.formatResult = function() {
			var s = this.settings;
			var d = this.temp;
			var hour;
			if (this.preset) {
				if (s.preset == 'date') {
					return this.formatDate(s.format, new Date(d[yOrd], d[mOrd], d[dOrd]), s);
				} else if (s.preset == 'datetime') {
					hour = (s.ampm) ? ((d[s.seconds ? 6 : 5] == 'PM' && (d[3] - 0) < 12) ? (d[3] - 0 + 12) : (d[s.seconds ? 6 : 5] == 'AM'
							&& (d[3] == 12) ? 0 : d[3])) : d[3];
					return this.formatDate(s.format, new Date(d[yOrd], d[mOrd], d[dOrd], hour, d[4], s.seconds ? d[5] : null), s);
				} else if (s.preset == 'time') {
					hour = (s.ampm) ? ((d[s.seconds ? 3 : 2] == 'PM' && (d[0] - 0) < 12) ? (d[0] - 0 + 12) : (d[s.seconds ? 3 : 2] == 'AM'
							&& (d[0] == 12) ? 0 : d[0])) : d[0];
					return this.formatDate(s.format, new Date(1970, 0, 1, hour, d[1], s.seconds ? d[2] : null), s);
				}
			}
			return s.formatResult(d);
		};
		this.formatDisplayResult = function() {
			var s = this.settings;
			var d = this.temp;
			var hour;
			if (this.preset) {
				if (s.preset == 'date') {
					return this.formatDate(s.dispalyFormat, new Date(d[yOrd], d[mOrd], d[dOrd]), s);
				} else if (s.preset == 'datetime') {
					hour = (s.ampm) ? ((d[s.seconds ? 6 : 5] == 'PM' && (d[3] - 0) < 12) ? (d[3] - 0 + 12) : (d[s.seconds ? 6 : 5] == 'AM'
							&& (d[3] == 12) ? 0 : d[3])) : d[3];
					return this.formatDate(s.dispalyFormat, new Date(d[yOrd], d[mOrd], d[dOrd], hour, d[4], s.seconds ? d[5] : null), s);
				} else if (s.preset == 'time') {
					hour = (s.ampm) ? ((d[s.seconds ? 3 : 2] == 'PM' && (d[0] - 0) < 12) ? (d[0] - 0 + 12) : (d[s.seconds ? 3 : 2] == 'AM'
							&& (d[0] == 12) ? 0 : d[0])) : d[0];
					return this.formatDate(s.dispalyFormat, new Date(1970, 0, 1, hour, d[1], s.seconds ? d[2] : null), s);
				}
			}
			return s.formatResult(d);
		};

		this._validate = function() {
			var s = this.settings;
			if (s.startDate || s.endDate) {
				var y1 = s.startDate ? s.startDate.getFullYear() : 0, M1 = s.startDate ? s.startDate.getMonth() : 0, d1 = s.startDate ? s.startDate
						.getDate() : 1, y2 = s.endDate ? s.endDate.getFullYear() : 0, M2 = s.endDate ? s.endDate.getMonth() : 11, d2 = s.endDate ? s.endDate
						.getDate()
						: 31;
				if (y1 == this.temp[yOrd] || y2 == this.temp[yOrd]) {
					this._caclRange(dw, mOrd, (y1 == this.temp[yOrd] ? M1 : 0), (y2 == this.temp[yOrd] ? M2 : 11), s.fx);
					if (M1 == this.temp[mOrd] || M2 == this.temp[mOrd])
						this._caclRange(dw, dOrd, (M1 == this.temp[mOrd] ? d1 : 1), (M2 == this.temp[mOrd] ? d2 : 31), s.fx, true);
					else
						this._caclRange(dw, dOrd, 1, 31, s.fx, true);
				} else {
					this._caclRange(dw, mOrd, 0, 11, s.fx);
					this._caclRange(dw, dOrd, 1, 31, s.fx, true);
				}
			}
		};

		this._caclRange = function($dw, ord, v1, v2, fx, isDay) {
			var $ele = $('ul:eq(' + ord + ')', $dw);
			$('li', $ele).show();
			$('li:lt(' + (v1 - (isDay ? 1 : 0)) + ')', $ele).hide();
			$('li:gt(' + (v2 - (isDay ? 1 : 0)) + ')', $ele).hide();
			if (this.temp[ord] < v1) {
				this.temp[ord] = v1;
				this._caclPos($ele, (this.temp[ord] - v1), fx);
			} else if (v1 >= 0 && this.temp[ord] >= v1) {
				this._caclPos($ele, (this.temp[ord] - v1), fx);
			}
			if (this.temp[ord] > v2) {
				this.temp[ord] = v2;
				this._caclPos($ele, (this.temp[ord] - v1), fx);
			} else if (this.temp[ord] <= v2) {
				this._caclPos($ele, (this.temp[ord] - v1), fx);
			}
		};

		this._caclPos = function($e, i, fx) {
			if (fx)
				$e.animate({
					'top' : (h * (m - i - 1)) + 'px'
				}, 'fast');
			else
				$e.css({
					top : (h * (m - i - 1))
				});
		};

		this.validate = function(i) {
			var s = this.settings;
			// If target is month, show/hide days
			if (this.preset && s.preset.match(/date/i) && ((i == yOrd) || (i == mOrd))) {
				var days = 32 - new Date(this.temp[yOrd], this.temp[mOrd], 32).getDate() - 1;
				var day = $('ul:eq(' + dOrd + ')', dw);
				$('li', day).show();
				$('li:gt(' + days + ')', day).hide();
				if (this.temp[dOrd] > days) {
					this._caclPos(day, days, s.fx);
					this.temp[dOrd] = $('li:visible:eq(' + days + ')', day).data('val');
				}
			} else {
				methods.validate(i);
			}
			this._validate();
		};

		this.hide = function() {
			justep.Util.enableTouchMove(document.body);
			//$(':input:not(.dwtd)').attr('disabled', false).removeClass('dwtd');
			this.settings.onClose(this.val, this);
			$(elm).blur();
			dw.hide();
			dwo.hide();
			show = false;
			if (this.preset)
				this.settings.wheels = null;
			$(window).unbind('resize.dw');
		};

		this.show = function() {
			justep.Util.disableTouchMove(document.body);

			var i;
			var s = this.settings;
			s.beforeShow(elm, this);
			// Set global wheel element height
			h = s.height;
			m = Math.round(s.rows / 2);

			inst = this;

			this.init();
			// Set values
			if (this.values !== null) {
				// Clone values array
				this.temp = this.values.slice(0);
			} else {
				var input = justep.Component.getComponent(elm);
				var v = input.val ? input.val() : '';
				var _date = justep.Date.fromString(v, justep.Date.STANDART_FORMAT_SHOT);
				if (s.startDate && s.startDate > _date)
					v = justep.Date.toString(s.startDate, justep.Date.STANDART_FORMAT_SHOT);
				if (s.endDate && s.endDate < _date)
					v = justep.Date.toString(s.endDate, justep.Date.STANDART_FORMAT_SHOT);
				this.temp = this.parseValue(v);
				this.setValue(false);
			}
			var yy = parseInt(this.temp[0], 10);
			s.startYear = !s.startDate ? (yy - 20) : (s.startDate.getFullYear());
			s.endYear = !s.endDate ? (yy + 20) : (s.endDate.getFullYear());

			if (this.preset) {
				// Create preset wheels
				s.wheels = [];
				var w = {};
				if (s.preset.match(/date/i)) {
					for ( var k = 0; k < 3; k++) {
						if (k == yOrd) {
							w[s.yearText] = {};
							for (i = s.startYear; i <= s.endYear; i++)
								w[s.yearText][i] = s.dateOrder.search(/yy/i) < 0 ? i.toString().substr(2, 2) : i.toString();
						} else if (k == mOrd) {
							w[s.monthText] = {};
							for (i = 0; i < 12; i++)
								w[s.monthText][i] = (s.dateOrder.search(/MM/) < 0 ? (s.dateOrder.search(/M/) < 0 ? (s.dateOrder.search(/mm/) < 0 ? (i + 1)
										: (i < 9) ? ('0' + (i + 1)) : (i + 1))
										: s.monthNamesShort[i])
										: s.monthNames[i]);
						} else if (k == dOrd) {
							w[s.dayText] = {};
							for (i = 1; i < 32; i++)
								w[s.dayText][i] = s.dateOrder.search(/dd/i) < 0 ? i : (i < 10) ? ('0' + i) : i;
						}
					}
					s.wheels.push(w);
				}
				if (s.preset.match(/time/i)) {
					s.stepHour = (s.stepHour < 1) ? 1 : parseInt(s.stepHour, 10);
					s.stepMinute = (s.stepMinute < 1) ? 1 : parseInt(s.stepMinute, 10);
					s.stepSecond = (s.stepSecond < 1) ? 1 : parseInt(s.stepSecond, 10);
					w = {};
					w[s.hourText] = {};
					for (i = 0; i < (s.ampm ? 13 : 24); i += s.stepHour)
						w[s.hourText][i] = (i < 10) ? ('0' + i) : i;
					w[s.minuteText] = {};
					for (i = 0; i < 60; i += s.stepMinute)
						w[s.minuteText][i] = (i < 10) ? ('0' + i) : i;
					if (s.seconds) {
						w[s.secText] = {};
						for (i = 0; i < 60; i += s.stepSecond)
							w[s.secText][i] = (i < 10) ? ('0' + i) : i;
					}
					if (s.ampm) {
						w[s.ampmText] = {};
						w[s.ampmText]['AM'] = 'AM';
						w[s.ampmText]['PM'] = 'PM';
					}
					s.wheels.push(w);
				}
			}

			// Create wheels containers
			$('.dwc', dw).remove();
			for (i = 0; i < s.wheels.length; i++) {
				var dwc = $('<div class="dwc '+(s.showLabel?'showl':'')+'"><div class="dwwc"><div class="clear" style="clear:both;"></div></div>').insertBefore($('.dwbc', dw));
				// Create wheels
				for ( var label in s.wheels[i]) {
					var to1 = $('.dwwc .clear', dwc);
					var dwwl = $(
							'<div class="dwwl">'
									+(s.showLabel?('<div class="dwl">' + label + '</div>'):'')//年月日提示
									+ '<div class="dww"><ul></ul><div class="dwwo"></div></div><div class="dwwol"></div></div>')
							.insertBefore(to1);
					// Create wheel values
					for ( var j in s.wheels[i][label]) {
						$('<li class="val_' + j + '">' + s.wheels[i][label][j] + '</li>').data('val', j).appendTo($('ul', dwwl));
					}
				}
			}

			// Set scrollers to position
			$('.dww ul', dw).each(function(i) {
				var x = $('li', this).index($('li.val_' + that.temp[i], this));
				while ((x < 0) && (--that.temp[i] >= 0)) {
					x = $('li', this).index($('li.val_' + that.temp[i], this));
				}
				var val = h * (m - (x < 0 ? 0 : x) - 1);
				$(this).css('top', val);
			});
			// Set value text
			$('.dwv', dw).html(this.formatDisplayResult());

			// Init buttons
			$('#dw_set', dw).addClass(s.btnClass + " btn-default").text(s.setText).unbind().bind('click', function(e) {
				that.setValue();
				s.onSelect(that.val, inst);
				that.hide();
				// -----------------------
				// JQueryMobile Beta1 hack
				preventFocus = true;
				setTimeout(function() {
					preventFocus = false;
				}, 300);
				// -----------------------
				return false;
			});

			$('#dw_cls', dw).addClass(s.btnClass + " btn-default").text(s.clsText).unbind().bind('click', function(e) {
				$(elm).val('').change();
				that.values = null;
				s.onSelect(that.val, inst);
				that.hide();
				// -----------------------
				// JQueryMobile Beta1 hack
				preventFocus = true;
				setTimeout(function() {
					preventFocus = false;
				}, 300);
				// -----------------------
				return false;
			});

			$('#dw_cancel', dw).addClass(s.btnClass + " btn-default").text(s.cancelText).unbind().bind('click', function(e) {
				that.hide();
				// -----------------------
				// JQueryMobile Beta1 hack
				preventFocus = true;
				setTimeout(function() {
					preventFocus = false;
				}, 300);
				// -----------------------
				return false;
			});

			// Disable inputs to prevent bleed through (Android bug)
			//$(':input:disabled').addClass('dwtd');
			//$(':input').attr('disabled', true);
			this._validate();
			// Show
			dwo.show();
			dw.attr('class', 'dw ' + s.theme).show();
			show = true;
			// Set sizes
			// $('.dww, .dwl', dw).css('min-width', s.width);
			$('.dww, .dwwl', dw).height(s.rows * h);
			$('.dww', dw).each(function() {
				$(this).width($(this).parent().width() < s.width ? s.width : $(this).parent().width());
			});
			// $('.dwbc a', dw).attr('class', s.btnClass);
			$('.dww li', dw).css({
				height : h,
				lineHeight : h + 'px'
			});
			$('.dwwc', dw).each(function() {
				var w = 0;
				$('.dwwl', this).each(function() {
					w += $(this).outerWidth(true);
				});
				$(this).width(w);
			});
			$('.dwc', dw).each(function() {
				$(this).width($('.dwwc', this).outerWidth(true));
			});
			// Set position
			this.pos();
			$(window).bind('resize.dw', function() {
				that.pos();
			});
		};

		// Set position
		this.pos = function() {
			var totalw = 0;
			var minw = 0;
			var ww = $(window).width();
			var wh = $(window).height();
			var st = $(window).scrollTop();
			var w;
			var h;
			$('.dwc', dw).each(function() {
				w = $(this).outerWidth(true);
				totalw += w;
				minw = (w > minw) ? w : minw;
			});
			w = totalw > ww ? minw : totalw;
			dw.width(w);
			w = dw.outerWidth();
			h = dw.outerHeight();
			dw.css({
				left : (ww - w) / 2,
				top : st + (wh - h) / 2
			});
			dwo.height(0);
			dwo.height($(document).height());
		};

		this.init = function() {
			var s = this.settings;
			// Set year-month-day order
			var ty = s.dateOrder.search(/y/i);
			var tm = s.dateOrder.search(/m/i);
			var td = s.dateOrder.search(/d/i);
			yOrd = (ty < tm) ? (ty < td ? 0 : 1) : (ty < td ? 1 : 2);
			mOrd = (tm < ty) ? (tm < td ? 0 : 1) : (tm < td ? 1 : 2);
			dOrd = (td < ty) ? (td < tm ? 0 : 1) : (td < tm ? 1 : 2);
			this.preset = (s.wheels === null);
		};

		this.init();

		// Set element readonly, save original state
		$(elm).is('input') ? $(elm).attr('readonly', 'readonly').data('readonly', $(elm).attr('readonly')) : false;

		// Init show datewheel
		$(elm).addClass('scroller').off('click.dw').bind('click.dw', function(e) {
			// -----------------------
			// JQueryMobile Beta1 hack
			if (preventFocus) {
				$(elm).blur();
				setTimeout(function() {
					$(elm).removeClass('ui-focus');
				}, 50);
				return false;
			}
			// -----------------------
			else if (!that.settings.disabled && that.settings.showOnFocus && !show)
				that.show();
		});
	}

	var dw;
	var dwo;
	var h;
	var m;
	var inst; // Current instance
	var scrollers = {}; // Scroller instances
	var date = new Date();
	var uuid = date.getTime();
	var move = false;
	var target = null;
	var start;
	var stop;
	var pos;
	var touch = ('ontouchstart' in window);
	var START_EVENT = touch ? 'touchstart' : 'mousedown';
	var MOVE_EVENT = touch ? 'touchmove' : 'mousemove';
	var END_EVENT = touch ? 'touchend' : 'mouseup';
	// -----------------------
	// JQueryMobile Beta1 hack
	var preventFocus = false;
	// -----------------------

	var defaults = {
		// Options
		width : 80,
		height : 40,
		rows : 3,
		fx : false,
		disabled : false,
		showOnFocus : true,
		showOnTap : true,
		wheels : null,
		theme : '',
		preset : 'date',
		dateFormat : 'yyyy-MM-dd',
		dateOrder : 'yyyymmdd',
		ampm : true,
		seconds : false,
		timeFormat : 'hh:mm:ss',
		startDate : null,
		endDate : null,
		startYear : date.getFullYear() - 10,
		endYear : date.getFullYear() + 10,
		monthNames : [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
		monthNamesShort : [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
		shortYearCutoff : '+10',
		showLabel : false,
		monthText : (new justep.Message(justep.Message.JUSTEP231502)).getMessage(),// '月',
		dayText : (new justep.Message(justep.Message.JUSTEP231503)).getMessage(),// '日',
		yearText : (new justep.Message(justep.Message.JUSTEP231504)).getMessage(),// '年',
		hourText : (new justep.Message(justep.Message.JUSTEP231505)).getMessage(),// '时',
		minuteText : (new justep.Message(justep.Message.JUSTEP231506)).getMessage(),// '分',
		secText : (new justep.Message(justep.Message.JUSTEP231507)).getMessage(),// '秒',
		ampmText : '&nbsp;',
		setText : (new justep.Message(justep.Message.JUSTEP231500)).getMessage(),// 确定
		clsText : (new justep.Message(justep.Message.JUSTEP231508)).getMessage(),// 清除
		cancelText : (new justep.Message(justep.Message.JUSTEP231501)).getMessage(),// '取消',
		btnClass : 'btn btn-sm',
		stepHour : 1,
		stepMinute : 1,
		stepSecond : 1,
		// Events
		beforeShow : function() {
		},
		onClose : function() {
		},
		onSelect : function() {
		},
		formatResult : function(d) {
			var out = '';
			for ( var i = 0; i < d.length; i++) {
				out += (i > 0 ? ' ' : '') + d[i];
			}
			return out;
		},
		parseValue : function(val) {
			return val.split(' ');
		}
	};

	var methods = {
		init : function(options) {
			var settings = $.extend({}, defaults, options);

			if ($('.dwo').length) {
				dwo = $('.dwo');
				dw = $('.dw');
			} else {
				// Create html
				dwo = $('<div class="dwo"></div>').hide().appendTo('body');
				dw = $('<div class="dw">'
						+ '<div class="dwv">&nbsp;</div>' + '<div class="dwbc" style="clear:both;">' + '<a id="dw_set" href="#"></a>'
						+ '<a id="dw_cls" href="#"></a>' + '<a id="dw_cancel" href="#"></a>' + '</div>' + '</div>');

				dw.hide().appendTo('body');

				$(document).bind(MOVE_EVENT, function(e) {
					if (move) {
						stop = touch ? e.originalEvent.changedTouches[0].pageY : e.pageY;
						target.css('top', (pos + stop - start) + 'px');
						e.preventDefault();
						e.stopPropagation();
						return false;
					}
				});

				var calc = function(t, val) {
					val = val > ((m - 1) * h) ? ((m - 1) * h) : val;
					val = val < (m * h - $('li:visible', t).length * h) ? (m * h - $('li:visible', t).length * h) : val;
					if (inst.settings.fx) {
						t.stop(true, true).animate({
							top : val + 'px'
						}, 'fast');
					} else {
						t.css('top', val);
					}
					var i = $('ul', dw).index(t);
					// Set selected scroller value
					inst.temp[i] = $('li:visible:eq(' + (m - 1 - val / h) + ')', t).data('val');
					// Validate
					inst.validate(i);
					// Set value text
					$('.dwv', dw).html(inst.formatDisplayResult());
				};

				$(document).bind(END_EVENT, function(e) {
					if (move) {
						var val = Math.round((pos + stop - start) / h) * h;
						val = val > ((m - 1) * h) ? ((m - 1) * h) : val;
						val = val < (m * h - $('li:visible', target).length * h) ? (m * h - $('li:visible', target).length * h) : val;
						calc(target, val);
						move = false;
						target = null;
						e.preventDefault();
						e.stopPropagation();
					}
				});

				/*
				 * $(document).on('DOMMouseScroll mousewheel', '.dwwl', function
				 * (e) { var delta = 0; if (e.wheelDelta) delta = e.wheelDelta /
				 * 120; if (e.detail) delta = -e.detail / 3; var t = $('ul',
				 * this); var p = t.css('top').replace(/px/i, '') - 0; var val =
				 * Math.round((p + delta * h) / h) * h; calc(t, val);
				 * e.preventDefault(); e.stopPropagation(); });
				 */

				$(document).on(START_EVENT, '.dwwl', function(e) {
					if (!move) {
						//var x1 = touch ? e.originalEvent.changedTouches[0].pageX : e.pageX;
						//var x2 = $(this).offset().left;
						move = true;
						target = $('ul', this);
						pos = target.css('top').replace(/px/i, '') - 0;
						start = touch ? e.originalEvent.changedTouches[0].pageY : e.pageY;
						stop = start;
						e.preventDefault();
						e.stopPropagation();
					}
				});
			}

			return this.each(function() {
				if (!this.id) {
					uuid += 1;
					this.id = 'scoller' + uuid;
				}
				scrollers[this.id] = new DatePicker(this, dw, settings);
			});
		},
		validate : function() {
		},
		enable : function() {
			return this.each(function() {
				if (scrollers[this.id])
					scrollers[this.id].settings.disabled = false;
			});
		},
		disable : function() {
			return this.each(function() {
				if (scrollers[this.id])
					scrollers[this.id].settings.disabled = true;
			});
		},
		isDisabled : function() {
			if (scrollers[this[0].id])
				return scrollers[this[0].id].settings.disabled;
		},
		option : function(option, value) {
			return this.each(function() {
				if (scrollers[this.id]) {
					if (typeof option === 'object')
						$.extend(scrollers[this.id].settings, option);
					else
						scrollers[this.id].settings[option] = value;
					scrollers[this.id].init();
				}
			});
		},
		setValue : function(d, input) {
			if (input === undefined)
				input = false;
			return this.each(function() {
				if (scrollers[this.id]) {
					scrollers[this.id].temp = d;
					scrollers[this.id].setValue(d, input);
				}
			});
		},
		getValue : function() {
			if (scrollers[this[0].id])
				return scrollers[this[0].id].values;
		},
		setDate : function(d, input) {
			if (input === undefined)
				input = false;
			return this.each(function() {
				if (scrollers[this.id]) {
					scrollers[this.id].setDate(d, input);
				}
			});
		},
		getDate : function() {
			if (scrollers[this[0].id])
				return scrollers[this[0].id].getDate();
		},
		show : function() {
			if (scrollers[this[0].id])
				return scrollers[this[0].id].show();
		},
		hide : function() {
			return this.each(function() {
				if (scrollers[this.id])
					scrollers[this.id].hide();
			});
		},
		destroy : function() {
			return this.each(function() {
				if (scrollers[this.id]) {
					$(this).unbind('focus.dw').removeClass('scroller');
					$(this).is('input') ? $(this).attr('readonly', $(this).data('readonly')) : false;
					delete scrollers[this.id];
				}
			});
		}
	};

	$.fn.datePicker = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Unknown method');
		}
	};

	$.datePicker = new DatePicker(null, null, defaults);

});
