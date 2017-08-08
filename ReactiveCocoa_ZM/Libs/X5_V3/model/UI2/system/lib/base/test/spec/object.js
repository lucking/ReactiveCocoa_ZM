/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	
	var Object = require("$UI/system/lib/base/object"),
		justep = require("$UI/system/lib/justep"),
		Observable = require('$UI/system/lib/base/observable');
	
	/*
	 * 通过 extend 继承创建一个新的类
	 */
	var Animal = Object.extend({
		/*
		 * 实现一个默认的构造方法, (可选) 
		 */
		constructor: function(options){
			justep.apply(this, options);
		},
		say: function(){
			//do noting
		}
	});
	
	var Cat = Animal.extend({
		constructor: function(name){
			this.name = name;
		},
		say: function(){
			return 'miao';
		}
	});
	
	var Person = Animal.extend({
		constructor: function(options){
			/*
			 * 通过 callParent 调用父代同名方法
			 */
			this.callParent(options);
		},
		/*
		 * 重写父代方法
		 */
		say: function(){
			return 'hello';
		}
	});

	describe("Object test", function() {
		var any = new Animal(); 
		var tom = new Cat();
		var jobs = new Person({name: 'steve jobs'});
		
		it("instance of", function() {
			
			expect(tom instanceof Cat).toBe(true);
			expect(tom instanceof Animal).toBe(true);
			expect(jobs instanceof Person).toBe(true);
		});
		
		it("override", function() {
			expect(any.say()).toEqual(undefined);
			expect(jobs.say()).toEqual('hello');
			expect(tom.say()).toEqual('miao');
		});
		
		it("call override method", function() {
			
		});
		
		it("construtor arguments", function() {
			expect(jobs.name).toEqual('steve jobs');
		});
		
		it("mixin", function() {
			
		});
	});
});