/* istanbul ignore next */;
(function (root, factory) {
	'use strict';

	/* istanbul ignore next */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['require'], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(null, require('../dist/Class.min'));
    } else {
        // Browser globals (root is window)
        root.EventEmitter = factory(null, root.Class);
    }
}(this, function (require, Class) {
	'use strict';

	if (require) {
		Class = require('../dist/Class.min.js');
	}

	var log 	= console.log;


	// cutom events, because they less suck
	var EventEmitter = new Class({

		___events: {
			get: function(){
				if (!Object.hasOwnProperty.call(this, '____events')) Class.define(this, '____events', Class({}).Writable());
				return this.____events;
			}
		},

		emit: function(event, err) {
			var   args = arguments, errs, i, current;


			if (this.___events[event]) {
				i = this.___events[event].length;
				while(i--) {
					current = this.___events[event][i];

					if (typeof current.listener === 'function') {
						current.listener.apply(null, Array.prototype.slice.call(args, 1));
						if (current.once) this.___events[event].splice(i, 1);
					}
					else {
						this.___events[ event ].splice( i, 1 );
						throw new Error('cannot emit event «'+event+'», listener is typeof «' + typeof current.listener + '»' );
					}
				}
			}
			else if (event === 'error') {
				errs = Array.prototype.slice.call(args, 1).filter(function(a){
					return a instanceof Error;
				});

				log.error('Cannot emit error event without listeners!');
				log.trace(errs[0]);
			}

			return this;
		},


		listener: function(event) {
			return this.___events && this.___events[event]  ? this.___events[event] : [];
		},


		// remove all event s( no args ), all listeners of a specific event ( first arg ) or a specific listener ( two args )
		off: function(event, listener) {
			var i;

			if (event) {
				if (listener && this.___events[event]) {
					i = this.___events[event].length;

					while(i--) {
						if (this.___events[event][i].listener === listener) {
							this.___events[event].splice(i, 1);
						}
					}
				}
				else if (this.___events[event]) delete this.___events[event];
			}
			else {
				this.____events = {};
			}

			this.emit('removeListener', event, listener);

			return this;
		},



		// add one ( two args ) or multiple events ( one arg -> object ). fired once.
		once: function(event, listener) {
			return this.on(event, listener, true);
		},



		// add one ( two args ) or multiple events ( one arg -> object ). fired once ( third arg )
		on: function(event, listener, once) {
			var keys, i;

			if (typeof event === 'object') {
				// multiple events
				keys 	= Object.keys(event);
				i 		= keys.length;

				while(i--) {
					this.addListener(keys[i], event[keys[i]], once);
				}
			}
			else {
				this.addListener(event, listener, once);
			}

			return this;
		},


		// adds a listenr, somehow private
		addListener: function(event, listener, once) {
			if (!this.___events[event]) this.___events[event] = [];

			this.emit('listener', event, listener, once === true);

			this.___events[event].push({
				  listener 	: listener,
				  once 		: !!once
			});
		}
	});

	return EventEmitter;

}));
