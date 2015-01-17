
    //===========================================================
    (function(){

        /**
         * Base Class constructor
         * @class  Onto.Base
         * @classdesc Represents the base class in the Onto game system
         * @param {object} data - The data that is going to be bound to this instance of Base
         * @return {Onto.Base}
         */
        var Base = new Class({
            isAbstract: true,
            UniqueID: '',
            init: function(data) {
                var self = this;

                var guid = function() {
                    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                        return v.toString(16);
                    });
                };
                self.UniqueID = data.UniqueID || guid();
            },
            parse: function(data) {
                if (Onto._.isObject(data)) {
                    Onto._.forEach(data, function(value, key, list) {
                        if (value.hasOwnProperty('FullyQualifiedName')) {
                            data[key] = eval("new " + value.FullyQualifiedName + "("+JSON.stringify(value)+")");
                        } else {
                            data[key] = value;
                        }
                    });
                }
                return data;
            },
            /**
             *  Overridden toJSON method.
             * @function toJSON
             * @instance
             * @memberof Onto.Base
             * @returns {object} Returns the data that can be persisted and also to initialize a class instance
             */
            toJSON: Class(function toJSON() {
                var ret = {
                    FullyQualifiedName: this.Type.getFullyQualifiedName ? this.Type.getFullyQualifiedName() : ''
                };
                ret = Onto._.extend(ret, this);
                return ret;
            })
        });

        Onto.addClass("Base", Base);

    })();

