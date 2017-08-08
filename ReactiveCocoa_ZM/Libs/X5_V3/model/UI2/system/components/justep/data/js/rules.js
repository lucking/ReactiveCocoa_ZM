/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var justep = require('$UI/system/lib/justep');
	var Expr = require('$UI/system/lib/base/express');
	require("$UI/system/lib/bind/bind.validation");

	var bv = justep.Bind.validation;
	var rules = {
		add : function(name, param) {
			bv.rules[name] = param;
			bv.registerExtenders();
		},
		remove : function(name) {
			delete bv.rules[name];
		},
		isExist : function(name) {
			return !!bv.rules[name];
		},
		// callback 参数给出规则名和规则定义 callback(name, rule)
		each : function(callback) {
			if ('function' === typeof (callback)) {
				var rules = bv.rules;
				for ( var r in rules)
					callback(r, rules[r]);
			}
		}
	};

	function callValidator(val, params, ctx) {
		ctx.$val = val;
		if ('string' == typeof (params.expr))
			params.expr = new Expr(params.expr);
		if (params.expr instanceof Expr)
			return Expr.eval(params.expr, ctx.$row, ctx);
		else
			return true;
	}

	function getColLabel(ctx){
		return ctx.$data.label(ctx.$col);
	}
	
	//增加规则
	//通用表达式规则
	bv.rules['constraint'] = {
		// val：校验的值，params：规则给出的参数，ctx：当前的上下文，包含{$model:this.getModel(),$data:this,$row:r,$val,$rowID:rowid,$col:col}
		validator : callValidator,
		message : function(params, ctx){
			var col = getColLabel(ctx);
			return (new justep.Message(justep.Message.JUSTEP231600,col,params.expr.expr)).getMessage();
		}
	};

	bv.rules['required'] = {
		validator : function(val, required, ctx) {
			var stringTrimRegEx = /^\s+|\s+$/g, testVal;

			if (val === undefined || val === null) {
				return !required;
			}

			// 如果required使用表达式
			var b = required.expr?callValidator(val, required, ctx):required;
			if (!b){
				return !b;
			}

			testVal = val;
			if (typeof (val) === "string") {
				testVal = val.replace(stringTrimRegEx, '');
			}

			return ((testVal + '').length > 0);
		},
		message : function(params, ctx){
			var col = getColLabel(ctx);
			return (new justep.Message(justep.Message.JUSTEP231601,col)).getMessage();
		}
	};

	function match(val, regex, ctx){
		return bv.utils.isEmptyVal(val)
		|| regex.test(val.toString());
	}
	
	bv.rules['pattern'] = {
		validator : match,
		message : function(params, ctx){
			var col = getColLabel(ctx);
			return (new justep.Message(justep.Message.JUSTEP231602,col,params)).getMessage();
		}
	};

	bv.rules['email'] = {
		validator : function(val, validate, ctx) {
			if (!validate) {
				return true;
			}

			// I think an empty email address is also a valid entry
			// if one want's to enforce entry it should be done with 'required:
			// true'
			return bv.utils.isEmptyVal(val)
					|| (
					// jquery validate regex - thanks Scott Gonzalez
					validate && /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i
							.test(val));
		},
		message : function(params, ctx){
			var col = getColLabel(ctx);
			return (new justep.Message(justep.Message.JUSTEP231603,col)).getMessage();
		}
	};

	bv.rules['datetime'] = {
		validator : function(val, validate, ctx) {
			if (!validate) {
				return true;
			}
			return match(val, /^([12][0-9]{3})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9](\.[0-9]+)?(Z|[+-]([01][0-9]|2[0-3]):[0-5][0-9])?$/, ctx);
		},
		message : function(params, ctx){
			var col = getColLabel(ctx);
			return (new justep.Message(justep.Message.JUSTEP231604,col)).getMessage();
		}
	};

	bv.rules['date'] = {
			validator : function(val, validate, ctx) {
				if (!validate) {
					return true;
				}
				return match(val, /^([12][0-9]{3})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])(Z|[+-]([01][0-9]|2[0-3]):[0-5][0-9])?$/, ctx);
			},
			message : function(params, ctx){
				var col = getColLabel(ctx);
				return (new justep.Message(justep.Message.JUSTEP231605,col)).getMessage();
			}
		};

	bv.rules['time'] = {
			validator : function(val, validate, ctx) {
				if (!validate) {
					return true;
				}
				return match(val, /^([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9](\.[0-9]+)?(Z|[+-]([01][0-9]|2[0-3]):[0-5][0-9])?$/, ctx);
			},
			message : function(params, ctx){
				var col = getColLabel(ctx);
				return (new justep.Message(justep.Message.JUSTEP231606,col)).getMessage();
			}
		};

	bv.rules['number'] = {
		validator : function(val, validate, ctx) {
			if (!validate) {
				return true;
			}
			return bv.utils.isEmptyVal(val)
					|| (validate && /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/
							.test(val));
		},
		message : function(params, ctx){
			var col = getColLabel(ctx);
			return (new justep.Message(justep.Message.JUSTEP231607,col)).getMessage();
		}
	};

	bv.rules['integer'] = {
		validator : function(val, validate, ctx) {
			if (!validate) {
				return true;
			}
			return bv.utils.isEmptyVal(val)
					|| (validate && /^\d+$/.test(val));
		},
		message : function(params, ctx){
			var col = getColLabel(ctx);
			return (new justep.Message(justep.Message.JUSTEP231608,col)).getMessage();
		}
	};

	// 注册规则
	bv.registerExtenders();
	return rules;
});