/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
/**
 * 表达式规范：js:1+3 使用方式： var expr = "js:a + $p1 + $p2"; var context = {a:13}; var
 * params = {$p1:23, $p2:12}; var exprObj = new Express(expr); var result =
 * Express.eval(expr, context, params);
 */
define(function(require) {
	//var String = require("./string");
	var Message = require("./message");
	var _Error = require("./error");
	var Object = require("./object");
	require("$UI/system/resources/system.res");

	var WHITE = " ";
	var FN_PREFIX = "$m.";
	var FN_POSTFIX = "($c";
	var VAR_PREFIX = "$m.getValue($c, '";
	var VAR_POSTFIX = "')";

	function isLBracket(expr, index) {
		var result = false;
		while (index < expr.length) {
			if (expr.charAt(index) == '(') {
				return true;
			} else if (isWhite(expr.charAt(index))) {
				index++;
			} else {
				return false;
			}
		}

		return result;
	}

	function isRBracket(expr, index) {
		var result = false;
		while (index < expr.length) {
			if (expr.charAt(index) == ')') {
				return true;
			} else if (isWhite(expr.charAt(index))) {
				index++;
			} else {
				return false;
			}
		}

		return result;
	}

	function isPoint(ch) {
		return ch == '.';
	}

	function isSingleQuote(ch) {
		return ch == "'";
	}

	function isUnderline(ch) {
		return ch == '_';
	}

	function isNumber(ch) {
		return (ch >= '0') && (ch <= '9');
	}

	function isLetter(ch) {
		return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
	}

	function isWhite(ch) {
		return (ch == ' ') || (ch == '\t') || (ch == '\r') || (ch == '\n');
	}

	var Express = Object.extend({
		constructor : function(expr) {
			this.callParent();
			this.expr = expr;
			this.exprFn = Express.createExprFn(expr);
		}
	});

	Express.eval = function(exprObj, context, params) {
		var msg;
		if (exprObj instanceof Express) {
			if (!exprObj.exprFn)
				exprObj.exprFn = Express.createExprFn(exprObj.expr);
			try {
				return exprObj.exprFn(context, params);
			} catch (ex) {
				msg = new Message(Message.JUSTEP230072, exprObj.expr, ex.message);
				throw _Error.create(msg);
			}
		} else {
			msg = new Message(Message.JUSTEP230071, exprObj);
			throw _Error.create(msg);
		}
	};

	Express.createExprFn = function(expr) {
		if ((expr === null) || (expr === undefined)){
			expr = "";
		}
		if ((expr !== null) && (expr !== undefined) && (expr.indexOf("js:") === 0)) {
			expr = expr.substring(3);
		}
		
		var body = "with($params||{}){with($__context__||{}){return " + expr + "}}";
		return new Function("$__context__", "$params", body);
	};

	Express.parse = function(expr) {
		if ((expr === null) || (expr === undefined) || (typeof (expr) !== 'string')) {
			return expr;
		} else {
			var result = "";
			var i = 0;
			var cur = null;
			var next = null;
			var msg = null;
			while (i < expr.length) {
				var ch = expr.charAt(i++); // i指向了下一个字符
				if (isLetter(ch) || isUnderline(ch)) {
					// 标识符: 字母或下划线开头，后面允许出现字母或数字或下划线或.
					cur = "" + ch;
					while (i < expr.length) {
						next = expr.charAt(i);
						if (isLetter(next) || isNumber(next) || isUnderline(next) || isPoint(next)) {
							cur += next;
							i++;
						} else {
							break;
						}
					}

					if (result.length > 0 && (result.charAt(result.length - 1) == '.')) {
						// 标识符前是.时, 表示标识符是某个对象的域或方法, 例如data('d1').ref('sName')
						result += cur;
					} else {
						var curLow = cur.toLowerCase();
						if (curLow === "and") {
							result += "&&";

						} else if (curLow === "or") {
							result += "||";

						} else if (curLow === "not") {
							result += "!";

						} else if ((cur === "true") || (cur === "false")) {
							result += cur;

						} else if (isLBracket(expr, i)) {
							// 函数->$m.函数名($c, ..)
							result += FN_PREFIX;
							result += cur;
							result += FN_POSTFIX;
							while (i < expr.length) {
								if ((expr.charAt(i) == '(') || isWhite(expr.charAt(i))) {
									i++;
								} else {
									break;
								}
							}
							if (!isRBracket(expr, i)) {
								result += ",";
							}

						} else {
							// 变量
							result += VAR_PREFIX;
							result += cur;
							result += VAR_POSTFIX;
						}
					}

				} else if (isNumber(ch)) {
					// 数字
					cur = "" + ch;
					while (i < expr.length) {
						next = expr.charAt(i);
						if (isNumber(next) || isPoint(next)) {
							cur += next;
							i++;
						} else {
							break;
						}
					}

					if (cur.charAt(cur.length - 1) === ".") {
						msg = new Message(Message.JUSTEP230067, expr, cur);
						throw _Error.create(msg);
					} else {
						result += cur;
					}

				} else if (isWhite(ch)) {
					// 空格
					while (i < expr.length && isWhite(expr.charAt(i))) {
						i++;
					}
					result += WHITE;

				} else if (isSingleQuote(ch)) {
					// 字符串
					cur = "" + ch;
					while (i < expr.length) {
						next = expr.charAt(i);
						if (isSingleQuote(next)) {
							if ((i + 1 < expr.length) && isSingleQuote(expr.charAt(i + 1))) {
								i++;
								cur += "\\'";
							} else {
								cur += next;
								i++;
								break;
							}
						} else {
							cur += next;
						}
						i++;
					}

					if (cur.charAt(cur.length - 1) === "'") {
						result += cur;
					} else {
						msg = new Message(Message.JUSTEP230068, expr, cur);
						throw _Error.create(msg);
					}

				} else if ((ch == '+') || (ch == '-') || (ch == '*') || (ch == '/') || (ch == '(') || (ch == ')') || (ch == '.') || (ch == ',') || (ch == '>') || (ch == '=')) {
					result += ch;
				} else if (ch == '<') {
					if (i < expr.length && (expr.charAt(i) == '>')) {
						result += "!=";
						i++;
					} else {
						result += ch;
					}
				} else {
					msg = new Message(Message.JUSTEP230069, expr, ch, i - 1);
					throw _Error.create(msg);
				}
			}
			return result;
		}
	};

	return Express;
});