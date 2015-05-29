module.exports = function(grunt) {

    var corePaths = [
        'lib/onto.js',
        'lib/dice.js',
        'lib/base.js',
        'lib/body.js',
        'lib/item.js',
        'lib/containeritem.js',
        'lib/inventory.js',
        'lib/armor.js',
        'lib/damage.js',
        'lib/weapon.js',
        'lib/skill.js',
        'lib/specialization.js',
        'lib/specializations.js',
        'lib/soul.js',
        'lib/spirit.js',
        'lib/being.js',
        'lib/humanoid.js',
        'lib/difficulty.js',
        'lib/characterManager.js',
        'lib/races.js',
        'lib/races.human.js',
        'lib/game.js'
    ];

    var uiPaths = [
        'lib/ui/base.js',
        'lib/ui/textbox.js'
    ];

    var concatPaths = ['lib/intro.js'].concat(corePaths).concat(['lib/outro.js']);
    var concatUIPaths = ['lib/intro.js'].concat(corePaths).concat(uiPaths).concat(['lib/outro.js']);

    var testcorePaths = [
        'dist/onto.js'
    ];

    var testPaths = [
        'test/index.js'
    ];

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        paths: {
            vendor: [
                'dist/Class.min.js',
                'dist/Namespace.min.js',
                'dist/EventEmitter.min.js',
                'dist/ReferenceObject.min.js',
                'dist/Collection.min.js',
                'dist/underscore.js'
            ],
            core: corePaths,
            ui: uiPaths,
            concatCore: concatPaths,
            concatUI: concatUIPaths,
            testLib: testcorePaths,
            test: testPaths
        },
        taskGroups: {
            buildAndTest: ['build', 'mochaTest', 'jasmine']
        },
        concat: {
            options: {
                separator: '',
            },
            core: {
                src: '<%= paths.concatCore %>',
                dest: 'dist/onto.js',
            },
            ui: {
                src: '<%= paths.concatUI %>',
                dest: 'dist/onto.ui.js',
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                sourceMap: true
            },
            core: {
                src: 'dist/onto.js',
                dest: 'dist/onto.min.js'
            },
            ui: {
                src: 'dist/onto.ui.js',
                dest: 'dist/onto.ui.min.js'
            }
        },
        mochaTest: { //Node.js tests
            test: {
                options: {
                    reporter: 'spec',
                    captureFile: 'results.txt', // Optionally capture the reporter output to a file
                    quiet: false, // Optionally suppress output to standard out (defaults to false)
                    clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
                },
                src: ['test/index.js']
            }
        },
        connect: {
            test: {
                options: {
                    port: 8010,
                    keepAlive: true
                }
            }
        },
        jasmine: { //Browser tests
            coverage: {
                src: '<%= paths.testLib %>',
                options: {
                    specs: 'test/index.js',
                    vendor: '<%= paths.vendor %>',
                    helpers: 'test/*Helper.js',
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: 'test/coverage/coverage.json',
                        report: [{
                            type: 'html',
                            options: {
                                dir: 'test/coverage'
                            }
                        }, {
                            type: 'lcov',
                            options: {
                                dir: 'test/coverage/lcov-report'
                            }
                        }, {
                            type: 'cobertura',
                            options: {
                                dir: 'test/coverage/cobertura'
                            }
                        }, {
                            type: 'text-summary'
                        }],
                        thresholds: {
                            lines: 50,
                            statements: 50,
                            branches: 50,
                            functions: 50
                        }
                    }
                }
            },
            require: {
                src: '<%= paths.testLib %>',
                options: {
                    specs: 'test/index.js',
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfigFile: ['test/requirejs-config.js']
                    }
                }
            }

        },
        // requireBower: { //Update requirejs with bower components
        //     target: {
        //         rjsConfig: './test/requirejs-config.js'
        //     },
        //     options: {
        //         baseUrl: './test',
        //         transitive: true,
        //         'exclude-dev': true,
        //         exclude: ['ee-class']
        //     }
        // },
        bower: { //Copy bower libs to dist
            dev: {
                dest: 'dist/',
                css_dest: 'dist/css',
                options: {
                    keepExpandedHierarchy: false,
                    packageSpecific: {
                        "ee-class": {
                            files: [
                                "dist/*.js", 'dist/*.map'
                            ]
                        }
                    }
                }
            }
        },
        watch: {
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: '<%= taskGroups.buildAndTest %>'
            },
            lib: {
                files: ['./lib/**/*.js'],
                tasks: '<%= taskGroups.buildAndTest %>'
            },
            test: {
                files: '<%= paths.test %>',
                tasks: '<%= taskGroups.buildAndTest %>'
            },
        }
    });

    //Build
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-bower-requirejs');
    // grunt.renameTask('bower', 'requireBower');
    grunt.loadNpmTasks('grunt-bower');
    //Tests
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-mocha-test');
    //Utility
    grunt.loadNpmTasks('grunt-contrib-watch');

    // grunt.registerTask('jasmine', ['connect', 'jasmine']);
    grunt.registerTask('test', '', function() {
        grunt.task.run(['build', 'jasmine', 'mochaTest']);
        console.log("Test server can be found at:", "localhost:" + 8010 + "/test/");
        grunt.task.run(['connect:test:keepalive']);
    });

    grunt.registerTask('build', '', function() {
        var done = this.async();
        grunt.task.run([ /*'requireBower', */ 'bower', 'concat', 'uglify']);
        var spawn = grunt.util.spawn({
            // The command to execute. It should be in the system path.
            cmd: "npm",
            // If specified, the same grunt bin that is currently running will be
            // spawned as the child command, instead of the "cmd" option. Defaults
            // to false.
            grunt: false,
            // An array of arguments to pass to the command.
            args: ['run', 'docs'],
            // Additional options for the Node.js child_process spawn method.
            opts: {},
            // If this value is set and an error occurs, it will be used as the value
            // and null will be passed as the error value.
            fallback: null
        }, function doneFunction(error, result, code) {
            // If the exit code was non-zero and a fallback wasn't specified, an Error
            // object, otherwise null.
            if (!!error) {
                console.error(error);
                return;
            }
            // The result object is an object with the properties .stdout, .stderr, and
            // .code (exit code).
            console.log(String(result));
            // When result is coerced to a string, the value is stdout if the exit code
            // was zero, the fallback if the exit code was non-zero and a fallback was
            // specified, or stderr if the exit code was non-zero and a fallback was
            // not specified.

            // The numeric exit code.
            // code
            done();
        });
    });

    grunt.registerTask('begin', '', function() {
        grunt.task.run(['build']);
        var server = require('./server');
        setTimeout(function() {
            grunt.task.run(['watch']);
        });
    });
    grunt.registerTask('default', ['begin']);

};
