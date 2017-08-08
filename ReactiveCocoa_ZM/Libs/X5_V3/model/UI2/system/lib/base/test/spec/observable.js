/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require){
	
	var Object = require('$UI/system/lib/base/object'),
		justep = require('$UI/system/lib/justep'),
		Observable = require('$UI/system/lib/base/observable');
	
	var Person = Object.extend({
		/*
		 * mixins Observable
		 */
		mixins: Observable,  
		constructor: function(options){
			/*
			 * 调用 Observable 的初始化方法
			 */
			Observable.prototype.constructor.call(this, options);
			justep.apply(this, options);
		},
		say: function(){
			/*
			 * 通过fire 触发事件
			 */
			this.fireEvent('say');
			return 'hello';
		}
	});
	
	var count = 0,
		fn = function(){
			count++;
		};
		
	var jobs = new Person({
		name: 'steve jobs',
		/*
		 * 通过 listeners 属性来挂多个事件监听 
		 */
		listeners: {
			say: fn
		} 
	});

	describe("Observable test", function() {
		it('listeners config', function(){
			jobs.say();
			expect(count).toEqual(1);
		});
		it('listeners remove', function(){
			/*
			 * un 方法来卸载事件监听
			 */
			jobs.un('say', fn);
			jobs.say();
			expect(count).toEqual(1);
		});
		it('listeners add', function(){
			/*
			 * 通过 on 方法动态挂事件监听
			 */
			jobs.on('say', fn);
			jobs.say();
			expect(count).toEqual(2);
		});
		
		it('listeners remove all', function(){
			/*
			 * 通过 clearListeners 方法卸载所有的监听 
			 */
			jobs.clearListeners();
			jobs.say();
			expect(count).toEqual(2);
		});
	});
	
});