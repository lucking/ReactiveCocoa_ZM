/*! 
* X5 v3 (htttp://www.justep.com) 
* Copyright 2014 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
define(function(require) {
	var Util = require('./util'), _Array = require('./array'), Object = require('./object');

	var Event = Object.extend({
		constructor : function(observable, name) {
			this.name = name;
			this.observable = observable;
			this.listeners = [];
		},

		addListener : function(fn, scope, options) {
			var me = this, listener;
			scope = scope || me.observable;

			if (!me.isListening(fn, scope)) {
				listener = me.createListener(fn, scope, options);
				if (me.firing) {
					// if we are currently firing this event, don't disturb the
					// listener loop
					me.listeners = me.listeners.slice(0);
				}
				me.listeners.push(listener);
			}
		},
		/**
		 * @private
		 */
		createListener : function(fn, scope, o) {
			o = o || {};
			scope = scope || this.observable;

			var listener = {
				fn : fn,
				scope : scope,
				o : o,
				ev : this
			}, handler = fn;

			listener.fireFn = handler;
			return listener;
		},

		findListener : function(fn, scope) {
			var listeners = this.listeners, i = listeners.length, listener, s;

			while (i--) {
				listener = listeners[i];
				if (listener) {
					s = listener.scope;
					if (listener.fn == fn && (s == scope || s == this.observable)) {
						return i;
					}
				}
			}

			return -1;
		},

		isListening : function(fn, scope) {
			return this.findListener(fn, scope) !== -1;
		},
		/**
		 * 
		 */
		removeListener : function(fn, scope) {
			var me = this, index, listener, k;
			index = me.findListener(fn, scope);
			if (index != -1) {
				listener = me.listeners[index];

				if (me.firing) {
					me.listeners = me.listeners.slice(0);
				}

				// cancel and remove a buffered handler that hasn't fired yet
				if (listener.task) {
					listener.task.cancel();
					delete listener.task;
				}

				// cancel and remove all delayed handlers that haven't fired yet
				k = listener.tasks && listener.tasks.length;
				if (k) {
					while (k--) {
						listener.tasks[k].cancel();
					}
					delete listener.tasks;
				}

				// remove this listener from the listeners array
				_Array.erase(me.listeners, index, 1);
				return true;
			}

			return false;
		},

		// Iterate to stop any buffered/delayed events
		clearListeners : function() {
			var listeners = this.listeners, i = listeners.length;

			while (i--) {
				this.removeListener(listeners[i].fn, listeners[i].scope);
			}
		},

		fire : function() {
			var me = this, listeners = me.listeners, count = listeners.length, i, args, listener;

			if (count > 0) {
				me.firing = true;
				for (i = 0; i < count; i++) {
					listener = listeners[i];
					args = arguments.length ? Array.prototype.slice.call(arguments, 0) : [];
					if (listener.o) {
						args.push(listener.o);
					}
					if (listener && listener.fireFn.apply(listener.scope || me.observable, args) === false) {
						return (me.firing = false);
					}
				}
			}
			me.firing = false;
			return true;
		}
	});

	var Observable = Object.extend({
		/**
		 * 
		 */
		isObservable : true,
		/**
		 * 
		 */
		constructor : function(config) {
			Util.apply(this, config);
			this.events = this.events || {};
			if (this.listeners) {
				this.on(this.listeners);
				delete this.listeners;
			}
		},
		/**
		 * 
		 */
		on : function(ename, fn, scope, options) {
			var me = this, config, event;

			if (typeof ename !== 'string') {
				options = ename;
				for (ename in options) {
					if (options.hasOwnProperty(ename)) {
						config = options[ename];
						me.on(ename, config.fn || config, config.scope || options.scope, config.fn ? config : options);
					}
				}
			} else {
				ename = ename.toLowerCase();
				me.events[ename] = me.events[ename] || true;
				event = me.events[ename];
				if (Util.isBoolean(event)) {
					me.events[ename] = event = new Event(this, ename);
				}
				event.addListener(fn, scope, Util.isObject(options) ? options : {});
			}
		},
		/**
		 * 
		 */
		off : function() {
			this.un.apply(this, arguments);
		},
		un : function(ename, fn, scope) {
			var me = this, config, event, options;

			if (typeof ename !== 'string') {
				options = ename;
				for (ename in options) {
					if (options.hasOwnProperty(ename)) {
						config = options[ename];
						me.un(ename, config.fn || config, config.scope || options.scope);
					}
				}
			} else {
				ename = ename.toLowerCase();
				event = me.events[ename];
				if (event) {
					event.removeListener(fn, scope);
				}
			}
		},
		clearListener : function(key) {
			var event = this.events[key];
			event && event.clearListeners();
		},
		clearListeners : function() {
			var events = this.events, event, key;

			for (key in events) {
				if (events.hasOwnProperty(key)) {
					event = events[key];
					event.clearListeners();
				}
			}
		},
		/**
		 * 
		 */
		fireEvent : function() {
			var me = this, args = Util.toArray(arguments), ename = args[0].toLowerCase(), ret = true, event = me.events[ename];

			if (event && event !== true) {
				args.shift();
				ret = event.fire.apply(event, args);
			}
			return ret;
		},
		/**
		 * 
		 * @param ename
		 * @returns {String}
		 */
		hasListener : function(ename) {
			var event = this.events[ename.toLowerCase()];
			return event && event.listeners.length > 0;
		}

	});

	return Observable;
});