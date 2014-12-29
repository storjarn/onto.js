require.config({
    paths: {
        'requirejs': '../dist/require',
        'underscore': '../dist/underscore',
        'Class': '../dist/Class.min',
        'EventEmitter': '../dist/EventEmitter.min',
        'Namespace': '../dist/Namespace.min',
        'ReferenceObject': '../dist/ReferenceObject.min'
    },
    packages: [

    ],
    shim: {
        'underscore': {
            exports: '_'
        },
        'Onto': {
            exports: 'Onto',
            deps: [
                'Class', 'Namespace', 'EventEmitter', 'ReferenceObject', 'underscore'
            ]
        }
    }
});


require(
    [],
    function(){

        // Set up the HTML reporter - this is reponsible for
        // aggregating the results reported by Jasmine as the
        // tests and suites are executed.

        require(["./index.js"], function() {
            // jasmine.getEnv().addReporter(
            //     new jasmine.HtmlReporter()
            // );
            // Run all the loaded test specs.
            jasmine.getEnv().execute();
        });

    }
);
