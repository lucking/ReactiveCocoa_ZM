/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {

	var Util = require('./util');

	var Object = function() {
		this.constructor();
	};

	Object.prototype = {
		constructor : function() {

		},
		constructed : function() {

		},
		callParent : function() {
			var method = this.callParent.caller;

			if (!method.$owner) {
				method = method.caller;
			}

			var parentClass = method.$owner.superclass, methodName = method.$name;

			return parentClass[methodName].apply(this, arguments);
		}
	};

	var F = function() {
	}, classMethods = {
		/*
		 * 
		 */
		extend : function(members) {
			members = members || {};
			var cls = function() {
				this.constructor.apply(this, arguments);
				this.constructed.apply(this, arguments);
			};

			F.prototype = this.prototype;
			cls.prototype = new F();

			// process mixins
			if (members.mixins) {
				var mixins = Util.isArray(members.mixins) ? members.mixins : [ members.mixins ];
				for ( var i = 0; i < mixins.length; i++) {
					var mixin = mixins[i].prototype, prot = cls.prototype;

					for ( var j in mixin) {
						if (mixin.hasOwnProperty(j)) {
							if (prot[j] === undefined) {
								prot[j] = mixin[j];
							}
						}
					}
				}
				delete members.mixins;
			}
			// end process mixins
			Util.apply(cls, classMethods);
			cls.implement(members);
			cls.superclass = this.prototype;
			return cls;
		},
		/**
		 * 基于一简单的类来定义新的类
		 * 
		 * @private
		 */
		_extend : function(fn) {
			var cls = function() {
				this.constructor.apply(this, arguments);
			};

			F.prototype = this.prototype;
			cls.prototype = new F();

			Util.apply(cls, classMethods);

			cls.implement(fn.prototype);
			delete fn.prototype;
			cls.implement({
				'constructor' : fn
			});

			cls.superclass = this.prototype;

			return cls;
		},
		/**
		 * 
		 */
		implement : function(members) {
			var prototype = this.prototype, name, i, member;
			for (name in members) {
				if (members.hasOwnProperty(name)) {
					member = members[name];

					if (typeof member === 'function') {
						member.$owner = this;
						member.$name = name;
					}

					prototype[name] = member;
				}
			}
			// mad for <=ie8
			var enumerables = [ 'constructor' ];

			for (i = enumerables.length; i--;) {
				name = enumerables[i];

				if (members.hasOwnProperty(name)) {
					member = members[name];

					if (typeof member === 'function') {
						member.$owner = this;
						member.$name = name;
					}

					prototype[name] = member;
				}
			}
		},
		each : function(obj, action) {
			for ( var prop in obj) {
				if (obj.hasOwnProperty(prop)) {
					action(obj[prop], prop);
				}
			}
		},
		map : function(source, mapping) {
			if (!source)
				return source;
			var target = {};
			for ( var prop in source) {
				if (source.hasOwnProperty(prop)) {
					target[prop] = mapping(source[prop], prop, source);
				}
			}
			return target;
		}
	};

	Util.apply(Object, classMethods);

	return Object;
});