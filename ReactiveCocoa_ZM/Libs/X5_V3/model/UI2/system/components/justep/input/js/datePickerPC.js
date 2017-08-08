/*! 
 * X5 v3 (htttp://www.justep.com) 
 * Copyright 2014 Justep, Inc.
 * Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
 */
define(function(require) {
	var $ = require("jquery"), justep = require("$UI/system/lib/justep");

	require('$UI/system/resources/system.res');
	require('css!../css/datePickerPC').load();

	var NumberList = justep.Object.extend({
		constructor : function(parent, className, input, min, max, minlengh, size, callback) {
			var list = this;
			this.element = $("body").append("<ul/>").children().last().addClass(className).get(0);
			this.move = 0;
			this.input = input;
			if (justep.Browser.hasTouch)
				this.input.readOnly = true;
			this.min = min;
			this.max = max;
			this.minlength = minlengh || 1;
			$(input).bind("keypress", function(event) {
				list.hide();
				if (event.keyCode < 48 || event.keyCode > 57) {
					event.returnValue = false;
					return;
				}
			}).bind("paste", function(event) {
				event.returnValue = false;
			}).bind("click", function(event) {
				list.show();
				input.select();
			}).bind("change", function(event) {
				var v = parseInt($(input).val());
				if (v < list.min)
					$(input).val(list.min);
				if (v > list.max)
					$(input).val(list.max);
			});

			this.setParam(min, max, minlengh, size, callback);
		},

		setParam : function(min, max, minlengh, size, callback) {
			$(this.element).empty();
			var list = this;
			this.min = min;
			this.max = max;
			size = size || 7;
			this.canShowAll = this.max - this.min + 1 <= size;
			if (!this.canShowAll) {
				this.createChild("-", function() {
					list.isFocus = true;
					list.start(-1);
				}, function() {
					list.isFocus = false;
					list.stop();
					$(list.input).focus();
				});
			}
			this.showItem = size;
			if (this.canShowAll)
				this.showItem = this.max - this.min + 1;
			var handler1 = function(evt) {
				list.isFocus = true;
			};
			var handler2 = function(evt) {
				var value = $(evt.target).text();
				var $input = $(list.input).val(value);
				if (!list.input.readOnly)
					$input.focus();
				list.isFocus = false;
				list.hide();
				$(list.input).change();
				if (callback)
					callback(value);
			};
			for ( var i = 0; i < this.showItem; i++) {
				this.createChild(" ", handler1, handler2);
			}
			if (!this.canShowAll) {
				this.createChild("+", function() {
					list.isFocus = true;
					list.start(1);
				}, function() {
					list.isFocus = false;
					list.stop();
					$(list.input).focus();
				});
			}
			this.hide();
		},

		hideEvent : function(event) {
			var target = event.target || event.srcElement;
			var self = NumberList.activeObj;
			if (self && target.parentElement != self.element)
				self.hide();
		},

		show : function() {
			var input = this.input;
			this.current = parseInt(input.value || this.min);
			this.refresh();
			var p = $(input);
			var e = $(this.element);
			e.css({
				top : -3000,
				left : -3000
			}).show();
			var pos = p.offset();
			var lup_top = pos.top - e.outerHeight(true);
			var lup = $(document).height() < pos.top + p.outerHeight(true) + e.outerHeight(true) && lup_top > 0;
			e.css({
				top : (lup ? (pos.top - e.outerHeight(true)) : (pos.top + p.outerHeight(true))),
				left : pos.left
			});
			NumberList.activeObj = this;
			$("body").bind("mousedown touchstart", this.hideEvent);
		},

		hide : function() {
			$("body").unbind("mousedown touchstart", this.hideEvent);
			NumberList.activeObj = null;
			$(this.element).hide();
		},

		createChild : function(content, handler, handler2) {
			var child = $(this.element).append("<li/>").children().last().get(0);
			$(child).text(content);
			NumberList.initHover(child);

			if (handler2) {
				$(child).bind("mousedown", handler);
				$(child).bind("mouseup", handler2);
			} else {
				$(child).bind("click", handler);
			}
		},

		refresh : function() {
			var childs = $(this.element).children();
			var top, i, str;

			if (this.canShowAll) {
				top = this.min;
				var func1 = function(c,j) {
					this.element.scrollTop = c.outerHeight() * (j - 3);
				};				
				for (i = 0; i <= this.max - this.min; i++) {
					$(childs.get(i)).removeClass("hover");
					str = (top++) + "";
					for (; str.length < this.minlength; str = '0' + str) {
					}
					$(childs.get(i)).text(str);
					if (top == this.current && i > 3) {
						var c = $(childs.get(i));
						var j = i;
						window.setTimeout(func1.bind(this,c,j), 10);
					}
				}
			} else {
				var half = parseInt(this.showItem / 2);
				var cur = this.current;
				if (cur >= this.max - half) {
					cur = this.max - half;
				} else if (cur <= this.min + half) {
					cur = this.min + half;
				}

				top = cur - half - 1;

				for (i = 1; i < this.showItem + 1; i++) {
					$(childs.get(i)).removeClass("hover");
					str = (top + i) + "";
					for (; str.length < this.minlength; str = '0' + str) {
					}
					$(childs.get(i)).text(str);
				}
			}
		},

		start : function(value) {
			this.move = value;
			NumberList.current = this;
			this.run();
		},

		stop : function() {
			this.move = 0;
		},

		run : function() {
			if ((this.move > 0 && this.current + 3 < this.max) || (this.move < 0 && this.current - 3 > this.min)) {
				this.current += this.move;
				this.refresh();
				setTimeout(function(){NumberList.current.run();}, 60);
			}
		}
	});

	NumberList.current = null;

	NumberList.initHover = function(element) {
		$(element).hover(function(event) {
			$(event.srcElement || event.target).addClass("hover");
		}, function(event) {
			$(event.srcElement || event.target).removeClass("hover");
		});
	};

	var DatePicker = justep.Object.extend({
		constructor : function() {
			var body = document.getElementsByTagName("body")[0];

			this.element = $("table[name='_calendar_']").size() <= 0 ? $(body).append(DatePicker.HTML()).children().last().get(0) : $(
					"table[name='_calendar_']").get(0);
			this.modalCover = $("div[name='_modal_cover_']").size() <= 0 ? $(body).append("<div name='_modal_cover_' class='modalCover'/>")
					.children().last().get(0) : $("div[name='_modal_cover_']").get(0);

			$(body).bind(
					"mousedown touchstart",
					function(evt) {
						var c = DatePicker.get();
						var d = c.element;
						if (d.style.display != "none") {
							var t = evt.srcElement || evt.target;
							if (t.parentElement == c.monthList.element
									|| t.parentElement == c.yearList.element || t.parentElement == c.hourList.element
									|| t.parentElement == c.minList.element || t.parentElement == c.secList.element)
								return;
							for (; t && t != d; t = t.parentNode) {
							}
							if (!t) {
								DatePicker.get().hide();
							}
						}
					});

			var enterHandler = function() {
				var cal = DatePicker.get();

				var year = cal.inputYear.value;
				var month = cal.inputMonth.value - 1;
				var day = cal.day;
				if (year < 1900)
					year = 1900;
				if (year > 2099)
					year = 2099;
				if (month < 0)
					month = 0;
				if (month > 11)
					month = 11;

				var date = new Date();
				date.setDate(1);
				date.setYear(year);
				date.setMonth(month);
				date.setDate(day);
				if (cal.input.focus)
					cal.input.focus();

				if (cal.isTimestamp) {
					var hour = cal.inputHour.value;
					var min = cal.inputMin.value;
					var sec = cal.inputSec.value;
					if (hour > 23)
						hour = 23;
					if (min > 59)
						min = 59;
					if (sec > 59)
						sec = 59;

					date.setMinutes(min);
					date.setHours(hour);
					date.setSeconds(sec);
					if ('function'===typeof(cal.input.val))
						cal.input.val(justep.Date.toString(date, justep.Date.STANDART_FORMAT));
					else
						$(cal.input).val(justep.Date.toString(date, justep.Date.STANDART_FORMAT));
				} else {
					if ('function'===typeof(cal.input.val))
						cal.input.val(justep.Date.toString(date, justep.Date.STANDART_FORMAT_SHOT));
					else
						$(cal.input).val(justep.Date.toString(date, justep.Date.STANDART_FORMAT_SHOT));
				}

				DatePicker.hide();
			};

			$(this.element).find("button[name='_calendar_prev_year_']").bind("click", function() {
				DatePicker.get().gotoYear(-1);
			});

			$(this.element).find("button[name='_calendar_prev_month_']").bind("click", function() {
				DatePicker.get().gotoMonth(-1);
			});

			this.inputYear = $(this.element).find("input[name='_calendar_year_']").bind("keyup", function(event) {
				DatePicker.get().refresh();
				if (event.keyCode == 13) {
					enterHandler();
				}
			}).bind("change", function(event) {
				DatePicker.get().refresh();
			}).get(0);

			this.inputMonth = $(this.element).find("input[name='_calendar_month_']").bind("change", function(event) {
				DatePicker.get().refresh();
			}).bind("keyup", function(event) {
				DatePicker.get().refresh();
				if (event.keyCode == 13) {
					enterHandler();
				}
			}).get(0);

			$(this.element).find("button[name='_calendar_next_year_']").bind("click", function() {
				DatePicker.get().gotoYear(1);
			});

			$(this.element).find("button[name='_calendar_next_month_']").bind("click", function() {
				DatePicker.get().gotoMonth(1);
			});

			var handler = function(event) {
				var value = $(event.target).text();
				var cal = DatePicker.get();
				if (value !== "") {
					cal.day = value;
					// cal.refresh();
					/*
					 * lzg 暂时保留目前逻辑一致都是点击确定返回
					 */
					if (cal.type != DatePicker.ONLY_DATE)
						cal.refresh();
					else {
						var year = cal.inputYear.value;
						var month = cal.inputMonth.value - 1;
						var day = cal.day;

						var date = new Date();
						date.setDate(1);
						date.setYear(year);
						date.setMonth(month);
						date.setDate(day);
						if (cal.input.focus)
							cal.input.focus();
						if (cal.isTimestamp) {
							date.setSeconds(cal.inputSec.value);
							date.setMinutes(cal.inputMin.value);
							date.setHours(cal.inputHour.value);
							if ('function'===typeof(cal.input.val))
								cal.input.val(justep.Date.toString(date, justep.Date.STANDART_FORMAT));
							else
								$(cal.input).val(justep.Date.toString(date, justep.Date.STANDART_FORMAT));
						} else {
							if ('function'===typeof(cal.input.val))
								cal.input.val(justep.Date.toString(date, justep.Date.STANDART_FORMAT_SHOT));
							else
								$(cal.input).val(justep.Date.toString(date, justep.Date.STANDART_FORMAT_SHOT));
						}
						if (cal.input.blur)
							cal.input.blur();
						DatePicker.hide();
					}
				}
			};

			$(this.element).find(".day").each(function() {
				$(this).bind("click", handler);
			});

			this.inputHour = $(this.element).find("input[name='_calendar_hour_']").bind("keyup", function(event) {
				if (event.keyCode == 13) {
					enterHandler();
				}
			}).get(0);

			this.inputMin = $(this.element).find("input[name='_calendar_min_']").bind("keyup", function(event) {
				if (event.keyCode == 13) {
					enterHandler();
				}
			}).get(0);

			this.inputSec = $(this.element).find("input[name='_calendar_sec_']").bind("keyup", function(event) {
				if (event.keyCode == 13) {
					enterHandler();
				}
			}).get(0);

			$(this.element).find("button[name='_calendar_ok_']").bind("click", function() {
				enterHandler();
			});

			$(this.element).find("button[name='_calendar_cancel_']").bind("click", function() {
				DatePicker.hide();
			});

			$(this.element).find("button[name='_calendar_clear_']").bind("click", function() {
				var cal = DatePicker.get();
				if ('function'===typeof(cal.input.val))
					cal.input.val("");
				else
					$(cal.input).val("");
				DatePicker.hide();
			});
			var className = justep.Browser.hasTouch ? "x-desktop-datePicker-list x-touch-datePicker-list" : "x-desktop-datePicker-list";
			this.monthList = new NumberList($(this.inputYear).parent().get(0), className, this.inputMonth, 1, 12, 1, 12);
			this.yearList = new NumberList($(this.inputYear).parent().get(0), className, this.inputYear, 1900, 2099, 1,
					justep.Browser.hasTouch ? 200 : null);
			this.hourList = new NumberList($(this.inputYear).parent().get(0), className, this.inputHour, 0, 23, 2,
					justep.Browser.hasTouch ? 24 : null);
			this.minList = new NumberList($(this.inputYear).parent().get(0), className, this.inputMin, 0, 59, 2, justep.Browser.hasTouch ? 60
					: null);
			this.secList = new NumberList($(this.inputYear).parent().get(0), className, this.inputSec, 0, 59, 2, justep.Browser.hasTouch ? 60
					: null);
			this.hide();
		},
		
		today : function() {
			this.refreshControls(new Date());
		},

		refreshControls : function(date) {
			this.day = date.getDate();
			this.inputMonth.value = date.getMonth() + 1;
			this.inputYear.value = date.getYear() < 1000 ? 1900 + date.getYear() : date.getYear();

			if (this.isTimestamp) {
				this.inputHour.value = justep.String.zeros(date.getHours(), 2);
				this.inputMin.value = this.type >= DatePicker.MINUTES ? justep.String.zeros(date.getMinutes(), 2) : "00";
				this.inputSec.value = this.type >= DatePicker.SECONDS ? justep.String.zeros(date.getSeconds(), 2) : "00";
			}

			this.refresh();
		},

		hide : function() {
			this.monthList.hide();
			this.yearList.hide();
			this.hourList.hide();
			this.minList.hide();
			this.secList.hide();
			$(this.element).hide();
			$(this.modalCover).hide();
		},

		getFirstDay : function() {
			var year = this.inputYear.value;
			var month = this.inputMonth.value - 1;
			if (year < 1900)
				year = 1900;
			if (year > 2099)
				year = 2099;
			if (month < 0)
				month = 0;
			if (month > 11)
				month = 11;

			var date = new Date();
			date.setDate(1);
			date.setMonth(month);
			date.setYear(year);

			return date.getDay();
		},

		getDaysOfMonth : function() {
			var year = this.inputYear.value;
			var month = this.inputMonth.value - 1;
			if (year < 1900)
				year = 1900;
			if (year > 2099)
				year = 2099;
			if (month < 0)
				month = 0;
			if (month > 11)
				month = 11;

			if (month == 1 && ((0 === (year % 4)) && ((0 !== (year % 100)) || (0 === (year % 400))))) {
				return 29;
			}

			return DatePicker.daysOfMoth[month];
		},

		refresh : function() {
			var now = new Date();
			this.currentDay = now.getDate();
			this.currentMonth = now.getMonth();
			this.currentYear = now.getFullYear();
			var firstDay = this.getFirstDay();
			var daysOfMonth = this.getDaysOfMonth();
			var cont = 0;
			var i = 1;
			var currentMonthYear = this.inputMonth.value - 1 == this.currentMonth && this.inputYear.value == this.currentYear;
			var that = this;
			$(this.element).children("tbody").children().each(function() {
				var trLine = this;
				var b = false;
				for ( var j = 0; j < 7; j++, cont++) {
					var cell = $(trLine.childNodes[j]);
					cell.removeClass("hover");
					if (currentMonthYear && i == that.currentDay)
						cell.addClass("today");
					else
						cell.removeClass("today");
					if (j === 6 || j === 0)
						cell.addClass("weekend");
					else
						cell.removeClass("weekend");
					var d = "";
					if (cont >= firstDay && cont < firstDay + daysOfMonth) {
						b = true;
						d = i++;
						NumberList.initHover(cell.get(0));
					} else
						cell.unbind("mouseout mouseover");
					cell.text(d + "");
					if (d == that.day && !isNaN(parseInt(d)))
						cell.addClass("selected");
					else
						cell.removeClass("selected");
				}
				trLine.style.display = b ? "" : "none";
			});
		},

		gotoYear : function(offset) {
			var year = parseInt(this.inputYear.value) + offset;
			if (year < 1900)
				year = 1900;
			if (year > 2099)
				year = 2099;
			this.inputYear.value = year;
			this.refresh();
		},

		gotoMonth : function(offset) {
			var month = parseInt(this.inputMonth.value) + offset;
			if (month < 1 || month > 12) {
				var year = parseInt(this.inputYear.value) + offset;
				if (year >= 1900) {
					month = offset < 0 ? 12 : 1;
					this.inputYear.value = year;
				} else {
					month = offset < 0 ? 1 : 12;
				}
			}
			this.inputMonth.value = month;
			this.refresh();
		}
	});

	DatePicker.HTML = function() {
		return '<table name="_calendar_" class="x-desktop-datePicker '
				+ (justep.Browser.hasTouch ? 'x-datePicker-touch' : '')
				+ '" cellpadding="0" cellspacing="0">'
				+ '<thead><tr valign="middle"><td class="title" colspan="7" align="center"><button name="_calendar_prev_year_" class="prev-year"/><button name="_calendar_prev_month_" class="prev-month"/><input name="_calendar_year_" class=" x-desktop-datePicker-input x-desktop-datePicker-year" maxlength="4" /><input class=" x-desktop-datePicker-input x-desktop-datePicker-" readonly="" value="-" /><input name="_calendar_month_" class=" x-desktop-datePicker-input x-desktop-datePicker-month" maxlength="2" /><button name="_calendar_next_month_" class="next-month"/><button name="_calendar_next_year_" class="next-year"/></td></tr><tr class="names"><td class="name">'
				+ (new justep.Message(justep.Message.JUSTEP231509)).getMessage()
				+ '</td><td class="name">'
				+ (new justep.Message(justep.Message.JUSTEP231510)).getMessage()
				+ '</td><td class="name">'
				+ (new justep.Message(justep.Message.JUSTEP231511)).getMessage()
				+ '</td><td class="name">'
				+ (new justep.Message(justep.Message.JUSTEP231512)).getMessage()
				+ '</td><td class="name">'
				+ (new justep.Message(justep.Message.JUSTEP231513)).getMessage()
				+ '</td><td class="name">'
				+ (new justep.Message(justep.Message.JUSTEP231514)).getMessage()
				+ '</td><td class="name">'
				+ (new justep.Message(justep.Message.JUSTEP231515)).getMessage()
				+ '</td></tr></thead>'
				+ '<tbody><tr><td class="day weekend"></td><td class="day"></td><td class="day"></td><td class="day"></td><td class="day"></td><td class="day"></td><td class="day weekend">1</td></tr><tr><td class="day weekend">2</td><td class="day">3</td><td class="day">4</td><td class="day">5</td><td class="day">6</td><td class="day">7</td><td class="day weekend">8</td></tr><tr><td class="day weekend">9</td><td class="day">10</td><td class="day selected">11</td><td class="day">12</td><td class="day">13</td><td class="day">14</td><td class="day weekend">15</td></tr><tr><td class="day weekend">16</td><td class="day">17</td><td class="day today">18</td><td class="day">19</td><td class="day">20</td><td class="day">21</td><td class="day weekend">22</td></tr><tr><td class="day weekend">23</td><td class="day">24</td><td class="day">25</td><td class="day">26</td><td class="day">27</td><td class="day">28</td><td class="day weekend">29</td></tr><tr><td class="day weekend   ">30</td><td class="day">31</td><td class="day"></td><td class="day"></td><td class="day"></td><td class="day"></td><td class="day weekend"></td></tr></tbody>'
				+ '<tfoot><tr><td colspan="7"><input name="_calendar_hour_" maxlength="2" class=" x-desktop-datePicker-input"/>:<input name="_calendar_min_" class=" x-desktop-datePicker-input" maxlength="2"/>:<input name="_calendar_sec_" class=" x-desktop-datePicker-input" maxlength="2"/></td></tr><tr><td colspan="7"><button name="_calendar_ok_" class=" x-desktop-datePicker-button">'
				+ (new justep.Message(justep.Message.JUSTEP231500)).getMessage() + '</button><button name="_calendar_cancel_" class=" x-desktop-datePicker-button">'
				+ (new justep.Message(justep.Message.JUSTEP231501)).getMessage() + '</button><button name="_calendar_clear_" class=" x-desktop-datePicker-button">'
				+ (new justep.Message(justep.Message.JUSTEP231508)).getMessage() + '</button></td></tr></tfoot>' + '</table>';
	};

	DatePicker.get = function() {
		if (!DatePicker.instance) {
			DatePicker.instance = new DatePicker();
		}
		return DatePicker.instance;
	};

	DatePicker.daysOfMoth = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

	DatePicker.ONLY_DATE = 0;
	DatePicker.HOURS = 1;
	DatePicker.MINUTES = 2;
	DatePicker.SECONDS = 3;

	DatePicker.show = function(input, type, readonly) {
		var cal = DatePicker.get();

		if (!type) {
			type = DatePicker.ONLY_DATE;
		}

		readonly = !!readonly;
		/*
		 * cal.inputYear.readOnly = readonly; cal.inputMonth.readOnly =
		 * readonly; cal.inputHour.readOnly = readonly; cal.inputMin.readOnly =
		 * readonly; cal.inputSec.readOnly = readonly;
		 */
		cal.yearList.element.onclick = cal.monthList.element.onclick = cal.hourList.element.onclick = cal.minList.element.onclick = cal.secList.element.onclick = cal.element.onclick = function(
				e) {
			(e || event).cancelBubble = readonly;
		};

		cal.input = input;
		cal.type = type;
		cal.isTimestamp = type != DatePicker.ONLY_DATE;

		if (!cal.isTimestamp)
			$(cal.element).find("tfoot tr:first-child").hide();
		else
			$(cal.element).find("tfoot tr:first-child").show();
		
		var date;
		try {
			var v = 'function'===typeof(input.val) ? input.val() : $(input).val();
			date = cal.isTimestamp ? justep.Date.fromString(v, 'yyyy-MM-ddThh:mm:ss') : justep.Date.fromString(v, justep.Date.STANDART_FORMAT_SHOT);
		} catch (e) {
			date = new Date();
		}
		if (date) {
			cal.refreshControls(date);
		} else {
			cal.today();
		}
		var p = $(input.domNode ? input.domNode : input);
		var e = $(cal.element);
		e.css({
			top : -3000,
			left : -3000
		}).show();
		var pos = p.offset();
		var lup_top = pos.top - e.outerHeight(true);
		var lup = $(document).height() < pos.top + p.outerHeight(true) + e.outerHeight(true) && lup_top > 0;

		var t = lup ? lup_top : (pos.top + p.outerHeight(true));
		if (t < 0)
			t = 0;
		var l = p.offset().left;
		if (l < 0)
			l = 0;
		var docW = $(document).width(), calW = e.outerHeight(true);
		if (docW < l + calW)
			l = l - (l + calW - docW);
		if (l < 0)
			l = 0;
		e.css({
			top : t,
			left : l
		});
	};

	DatePicker.hide = function() {
		DatePicker.get().hide();
	};

	return DatePicker;
});