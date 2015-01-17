
	/* globals Class, Namespace, EventEmitter, Collection, ReferenceObject, _ */

	/**
	 * The top-level namespace for this library
     * @namespace  Onto
     * @property {function}  Class               - The {@link https://github.com/storjarn/ee-class|ee-class} keyword, allowing to create basic classes
     * @property {Class}  EventEmitter        - The {@link https://github.com/storjarn/ee-class|ee-class} keyword, allowing to create event emitter classes
     * @property {Class}  Namespace           - The {@link https://github.com/storjarn/ee-class|ee-class} keyword, allowing to create proper namespaces
     * @property {Class}  ReferenceObject           - The {@link https://github.com/storjarn/ee-class|ee-class} keyword, allowing to create simple first-class function instances around data
     * @property {Class}  Collection           - The {@link https://github.com/storjarn/ee-class|ee-class} keyword, allowing to create collection-based classes
     * @property {object}  _        	      - An instance of the {@link http://underscorejs.org/|underscore} library
     */

    var Onto = new Namespace("Onto", null, {
        /* istanbul ignore next */
        Class: Class,
        /* istanbul ignore next */
        EventEmitter: EventEmitter,
        /* istanbul ignore next */
        Namespace: Namespace,
        /* istanbul ignore next */
        ReferenceObject: ReferenceObject,
        /* istanbul ignore next */
        Collection: Collection,
        /* istanbul ignore next */
        _: underscore || _
    });
