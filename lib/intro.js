/* jshint newcap: false */
;(function (root, factory) {
    'use strict';

    /* istanbul ignore next */
    if (typeof define === 'function' && define.amd) {
        define(
            [
                '../dist/Class.min', '../dist/Namespace.min',
                '../dist/EventEmitter.min', '../dist/ReferenceObject.min',
                'underscore'
            ],
            factory
        );
    } else if (typeof exports === 'object') {
        module.exports = factory(
            require('../dist/Class.min'),
            require('../dist/Namespace.min'),
            require('../dist/EventEmitter.min'),
            require('../dist/ReferenceObject.min'),
            require('../dist/underscore')
        );
    } else {
        root.Onto = factory(
            root.Class,
            root.Namespace,
            root.EventEmitter,
            root.ReferenceObject,
            root._
        );
    }
}(this, function (Class, Namespace, EventEmitter, ReferenceObject, underscore) {
    'use strict';

    if (typeof _ == 'undefined') {
        var _ = underscore;
    }
