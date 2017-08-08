/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var UUID = function() {
		this.id = UUID.createUUID();
	};

	UUID.prototype.valueOf = function() {
		return this.id;
	};

	UUID.prototype.toString = function() {
		return this.id;
	};

	UUID.createUUID = function() {
		var dg = new Date(1582, 10, 15, 0, 0, 0, 0);
		var dc = new Date();
		var t = dc.getTime() - dg.getTime();
		//var h = '-';
		var tl = UUID._getIntegerBits(t, 0, 31);
		var tm = UUID._getIntegerBits(t, 32, 47);
		var thv = UUID._getIntegerBits(t, 48, 59) + '1'; // version 1,
		// security
		// version is 2
		var csar = UUID._getIntegerBits(UUID._rand(4095), 0, 7);
		var csl = UUID._getIntegerBits(UUID._rand(4095), 0, 7);

		var n = UUID._getIntegerBits(UUID._rand(8191), 0, 7)
				+ UUID._getIntegerBits(UUID._rand(8191), 8, 15) + UUID._getIntegerBits(UUID._rand(8191), 0, 7)
				+ UUID._getIntegerBits(UUID._rand(8191), 8, 15) + UUID._getIntegerBits(UUID._rand(8191), 0, 15); // this
																													// last
		// number
		// is two octets
		// long
		// return tl + h + tm + h + thv + h + csar + csl + h + n;
		return tl + tm + thv + csar + csl + n;
	};

	UUID._getIntegerBits = function(val, start, end) {
		var base16 = UUID._returnBase(val, 16);
		var quadArray = [];
		var quadString = '';
		var i = 0;
		for (i = 0; i < base16.length; i++) {
			quadArray.push(base16.substring(i, i + 1));
		}
		for (i = Math.floor(start / 4); i <= Math.floor(end / 4); i++) {
			if (!quadArray[i] || quadArray[i] === '')
				quadString += '0';
			else
				quadString += quadArray[i];
		}
		return quadString;
	};

	UUID._returnBase = function(number, base) {
		return (number).toString(base).toUpperCase();
	};

	UUID._rand = function(max) {
		return Math.floor(Math.random() * (max + 1));
	};

	return UUID;
});
