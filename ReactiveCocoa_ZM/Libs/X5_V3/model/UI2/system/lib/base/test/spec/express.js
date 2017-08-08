/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	var Express = require("$UI/system/lib/base/express");
	
	describe("Object test", function() {
		var items = [
		            "and anda aand aanda and", 
					"and.and and.and.and", 
					"or ora aor aora or", 
					"or.or or.or.or",
					"not nota anot anota not", 
					"not.not not.not.not", 
					"'<>' <> < > '<>'", 
					"= <>",
					"var1 var2.var3 var4.var5.var6", "true false",
					"fn1('fn2()') and fn3.fn4() or data('d1').sum('sName')", 
					"a.b.fn1(1) or (var1 and var2.var3 and var4.var5('sName'))",	
					"fn1(1) and fn2 (2) and var1 and data('d').sum('sName')",
					"(2>1)and(length('true and false') > 1)",
					"and1(1) and var1 and var2.var3 and and2(2) and _and(3) or data('id').sum('sInt')",
					"and aand andb aandb, and",
					"(1 <> 2) and (2<>3)",
					"1=2 and 1>=2 and 2<=3 and 2<>3",
					"'hello''abc''1234'",
					"'this is \"ok\" 1234' \n \t \r abc"];
		var results = ["&& $m.getValue($c, 'anda') $m.getValue($c, 'aand') $m.getValue($c, 'aanda') &&",
		               "$m.getValue($c, 'and.and') $m.getValue($c, 'and.and.and')",
		               "|| $m.getValue($c, 'ora') $m.getValue($c, 'aor') $m.getValue($c, 'aora') ||",
		               "$m.getValue($c, 'or.or') $m.getValue($c, 'or.or.or')",
		               "! $m.getValue($c, 'nota') $m.getValue($c, 'anot') $m.getValue($c, 'anota') !",
		               "$m.getValue($c, 'not.not') $m.getValue($c, 'not.not.not')",
		               "'<>' != < > '<>'",
		               "= !=",
		               "$m.getValue($c, 'var1') $m.getValue($c, 'var2.var3') $m.getValue($c, 'var4.var5.var6')",
		               "true false",
		               "$m.fn1($c,'fn2()') && $m.fn3.fn4($c) || $m.data($c,'d1').sum('sName')",
		               "$m.a.b.fn1($c,1) || ($m.getValue($c, 'var1') && $m.getValue($c, 'var2.var3') && $m.var4.var5($c,'sName'))",
		               "$m.fn1($c,1) && $m.fn2($c,2) && $m.getValue($c, 'var1') && $m.data($c,'d').sum('sName')",
		               "(2>1)&&($m.length($c,'true and false') > 1)",
		               "$m.and1($c,1) && $m.getValue($c, 'var1') && $m.getValue($c, 'var2.var3') && $m.and2($c,2) && $m._and($c,3) || $m.data($c,'id').sum('sInt')",
		               "&& $m.getValue($c, 'aand') $m.getValue($c, 'andb') $m.getValue($c, 'aandb'), &&",
		               "(1 != 2) && (2!=3)",
		               "1=2 && 1>=2 && 2<=3 && 2!=3",
		               "'hello\\\'abc\\\'1234'",
		               "'this is \"ok\" 1234' $m.getValue($c, 'abc')"];
		for (var i=0; i<items.length; i++){
			var fn = function(){
				var cur = arguments[0];
				var result = Express.parse(cur);
				expect(result).toEqual(arguments[1]);
				console.log(cur + " --> " + result);
			};
			it(items[i], fn.bind(this, items[i], results[i]));
		}
		
	});
	
	describe("执行表达式", function() {
		var items = [
		             {expr: "js:1+2", context: null, params: {}, result: 3},
		             {expr: "js:a+2", context: {a:2}, params: null, result: 4},
		             {expr: "js:$a-$b", context: null, params: {$a: 12, $b: 13}, result: -1},
		             {expr: "js:a+$b", context: {a:13}, params: {$b:23}, result: 36}
		             ];
		
		for (var i=0; i<items.length; i++){
			var fn = function(){
				var cur = arguments[0];
				var exprObj = new Express(cur.expr);
				var result = Express.eval(exprObj, cur.context, cur.params);
				console.log(cur.expr + "-->" + result);
				expect(result).toEqual(cur.result);
			};
			it(items[i].expr, fn.bind(this, items[i]));
		}
	});
});