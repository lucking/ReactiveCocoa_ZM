/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var String = require("./string");

	var _Date = {};
	_Date._msForSecond = 1000;
	_Date._msForMinute = 60000;
	_Date._msForHour = 3600000;
	_Date._msForDay = 86400000;// 24*60*60*1000
	_Date._msForWeek = 86400000 * 7;

	_Date.isLeapYear = function(date) {
		var y = date.getFullYear();
		return (0 === y % 4 && ((y % 100 !== 0) || (y % 400 === 0)));
	};

	var _full = function(str, ch, count, isLeft) {
		while (str.length < count)
			if (isLeft)
				str = ch + str;
			else
				str = str + ch;
		return str;
	};

	_Date.fromString = function(str, format) {
		if(str instanceof Date) return str;
		var pattern = format.replace(/(yyyy)/g, "([0-9]{4})").replace(/(yy)|(MM)|(dd)|(hh)|(mm)|(ss)/g, "([0-9]{2})").replace(/[Mdhms]/g, "([0-9]{1,2})")
				.replace(/(fff)/g, "([0-9]{1,3})");

		var getIndex = function(expr1, expr2) {
			var index = format.indexOf(expr1);
			if (index == -1)
				index = format.indexOf(expr2);
			return index;
		};

		var today = new Date();
		var returnDate;
		if (new RegExp(pattern).test(str)) {
			var yPos = getIndex("yyyy", "yy");
			var mPos = getIndex("MM", "M");
			var dPos = getIndex("dd", "d");
			var hPos = getIndex("hh", "h");
			var miPos = getIndex("mm", "m");
			var sPos = getIndex("ss", "s");
			var fPos = getIndex("fff");
			var data = {
				y : 0,
				m : 0,
				d : 0,
				h : 0,
				mi : 0,
				s : 0,
				f : 0
			};

			var pos = new Array(yPos + ",y", mPos + ",m", dPos + ",d", hPos + ",h", miPos + ",mi", sPos + ",s", fPos + ",f").sort(function(a, b) {
				a = parseInt(a.split(",")[0], 10);
				b = parseInt(b.split(",")[0], 10);
				return a == b ? 0 : (a > b ? 1 : -1);
			});

			var tmpIndex = 0;
			var newPos = [];
			for ( var i = 0; i < pos.length; i++) {
				if (parseInt(pos[i].split(",")[0], 10) != -1) {
					newPos[tmpIndex] = pos[i];
					tmpIndex++;
				}
			}

			var m = str.match(pattern);
			for (i = 1; i < m.length; i++) {
				if (i === 0)
					return;
				var flag = newPos[i - 1].split(',')[1];
				data[flag] = m[i];
			}

			data.y = data.y || today.getFullYear();
			data.d = data.d || today.getDate();
			if (data.f !== 0)
				data.f = _full(data.f, "0", 3, false);

			if (data.y.toString().length == 2)
				data.y = parseInt("20" + data.y, 10);
			data.m -= 1;
			returnDate = new Date(data.y, data.m, data.d, data.h, data.mi, data.s, data.f);
		}

		return returnDate;
	};

	_Date.DEFAULT_FORMAT_SHOT = "yyyy/MM/dd";
	_Date.DEFAULT_FORMAT = "yyyy/MM/dd hh:mm:ss";
	_Date.STANDART_FORMAT_SHOT = "yyyy-MM-dd";
	_Date.STANDART_FORMAT = "yyyy-MM-ddThh:mm:ss.fffZ";

	_Date.toString = function(dateTime, formatStr) {
		formatStr = formatStr ? formatStr : this.DEFAULT_FORMAT;
		var year = dateTime.getFullYear();
		var month = dateTime.getMonth() + 1;
		var date = dateTime.getDate();
		var houres = dateTime.getHours();
		var minutes = dateTime.getMinutes();
		var seconds = dateTime.getSeconds();
		var milliseconds = dateTime.getMilliseconds();
		milliseconds = _full(milliseconds + "", "0", 3, true);
		return formatStr.replace(/yyyy|YYYY/, year).replace(/yy|YY/, (year % 100) > 9 ? (year % 100).toString() : ('0' + (year % 100))).replace(/MM/,
				month > 9 ? month.toString() : '0' + month).replace(/M/g, month).replace(/dd|DD/, date > 9 ? date.toString() : '0' + date).replace(
				/d|D/g, date).replace(/hh|HH/, houres > 9 ? houres.toString() : '0' + houres).replace(/h|H/g, houres).replace(/mm/,
				minutes > 9 ? minutes.toString() : '0' + minutes).replace(/m/g, minutes).replace(/ss|SS/,
				seconds > 9 ? seconds.toString() : '0' + seconds).replace(/s|S/g, seconds).replace(/fff/g, milliseconds);
	};

	_Date.increase = function(datetime, num, interval) {
		datetime = (typeof datetime == 'string') ? this.fromString(datetime) : datetime;
		interval = (typeof interval == 'undefined') ? 'd' : interval;
		switch (interval) {
		case 's':
			return new Date(Date.parse(datetime) + (this._msForSecond * num));
		case 'n':
			return new Date(Date.parse(datetime) + (this._msForMinute * num));
		case 'h':
			return new Date(Date.parse(datetime) + (this._msForHour * num));
		case 'd':
			return new Date(Date.parse(datetime) + (this._msForDay * num));
		case 'w':
			return new Date(Date.parse(datetime) + (this._msForWeek * num));
		case 'm':
			return new Date(datetime.getFullYear(), (datetime.getMonth()) + num, datetime.getDate(), datetime.getHours(), datetime.getMinutes(),
					datetime.getSeconds());
		case 'q':
			return new Date(datetime.getFullYear(), (datetime.getMonth()) + num * 3, datetime.getDate(), datetime.getHours(), datetime.getMinutes(),
					datetime.getSeconds());
		case 'y':
			return new Date((datetime.getFullYear() + num), datetime.getMonth(), datetime.getDate(), datetime.getHours(), datetime.getMinutes(),
					datetime.getSeconds());
		}
	};

	_Date.decrease = function(datetime, num, interval) {
		datetime = (typeof datetime == 'string') ? this.fromString(datetime) : datetime;
		interval = (typeof interval == 'undefined') ? 'd' : interval;
		switch (interval) {
		case 's':
			return new Date(Date.parse(datetime) - (this._msForSecond * num));
		case 'n':
			return new Date(Date.parse(datetime) - (this._msForMinute * num));
		case 'h':
			return new Date(Date.parse(datetime) - (this._msForHour * num));
		case 'd':
			return new Date(Date.parse(datetime) - (this._msForDay * num));
		case 'w':
			return new Date(Date.parse(datetime) - (this._msForWeek * num));
		case 'm':
			return new Date(datetime.getFullYear(), (datetime.getMonth()) - num, datetime.getDate(), datetime.getHours(), datetime.getMinutes(),
					datetime.getSeconds());
		case 'q':
			return new Date(datetime.getFullYear(), (datetime.getMonth()) - num * 3, datetime.getDate(), datetime.getHours(), datetime.getMinutes(),
					datetime.getSeconds());
		case 'y':
			return new Date((datetime.getFullYear() - num), datetime.getMonth(), datetime.getDate(), datetime.getHours(), datetime.getMinutes(),
					datetime.getSeconds());
		}
	};

	_Date.diff = function(start, end, interval) {
		start = (typeof start == 'string') ? this.fromString(start) : start;
		end = (typeof end == 'string') ? this.fromString(end) : end;
		interval = (typeof interval == 'undefined') ? 'd' : interval;
		switch (interval) {
		case 's':
			return parseInt((end - start) / this._msForSecond, 10);
		case 'n':
			return parseInt((end - start) / this._msForMinute, 10);
		case 'h':
			return parseInt((end - start) / this._msForHour, 10);
		case 'd':
			return parseInt((end - start) / this._msForDay, 10);
		case 'w':
			return parseInt((end - start) / this._msForWeek, 10);
		case 'm':
			return (end.getMonth() + 1) + ((end.getFullYear() - start.getFullYear()) * 12) - (start.getMonth() + 1);
		case 'y':
			return end.getFullYear() - start.getFullYear();
		}
	};

	_Date.between = function(date1, date2) {
		return Math.abs(this.diff(date1, date2));
	};

	// todo: md 需要重构
	// 如果格式满足YYYY-(/)MM-(/)DD或YYYY-(/)M-(/)DD或YYYY-(/)M-(/)D或YYYY-(/)MM-(/)D就替换为''
	// 数据库中，合法日期可以是:YYYY-MM/DD(2003-3/21),数据库会自动转换为YYYY-MM-DD格式
	_Date.isValid = function(str) {
		str = String.trim(str);
		if (str === '')
			return false;
		var reg = /[\d]{ 4,4 }[\-\/]{ 1 }[\d]{ 1,2 }[\-\/]{ 1 }[\d]{ 1,2 }/g;
		if (str.replace(reg, '') === '') {
			var t = new Date(str.replace(/\-/g, '/'));
			var ar = str.split(new RegExp("[-/:]"));
			return (ar[0] != t.getYear() || ar[1] != t.getMonth() + 1 || ar[2] != t.getDate()) ? false : true;
		}
		return false;
	};

	return _Date;
});
