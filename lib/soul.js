
    //===========================================================
    (function() {

        /**
         * Soul Class constructor
         * @class  Onto.Soul
         * @classdesc Represents a soul in the Onto game system.
         * @param {object} data - The data that is going to be bound to this instance of Soul
         * @return {Onto.Soul}
         * @extends {Onto.Base}
         * @inheritdoc Onto.Base
         * @see Onto.Spirit
         */
        var Soul = new Class({
            inherits: Onto.Base,
            init: function(data) {
                var self = this;
                data = data || {};

                var defaultAttributes = {
                    Perception      : 9,
                    Luck            : 9
                };

                /**
                 * @member {object} Attributes - The container for the instance's main attributes.
                 * @instance
                 * @readonly
                 * @memberof Onto.Soul
                 * @property {number} Perception - The ability to see, hear, taste and notice unusual things. The basis of a soul's power.
                 * @property {number} Luck - The serendipity potential of the soul.  Contributes to the soul's power.
                 */
                var attributes = Onto._.extend(self.Attributes || defaultAttributes, data.Attributes || defaultAttributes);
                Class.define(self, 'Attributes', Class({}).Enumerable());
                for(var key in attributes) {
                    Class.define(self.Attributes, key, Class(attributes[key]).Enumerable());
                }

                /**
                 * @member {object} Power - The amount of power the soul has for a number of things.<br />Calculated by: _Attributes.Perception + Attributes.Luck_
                 * @instance
                 * @readonly
                 * @memberof Onto.Soul
                 */
                Class.define(self, 'Power', {
                    get: function(){ return (self.Attributes.Perception + self.Attributes.Luck); },
                    enumerable: true
                });
            },

            Power : null
        });


        Onto.addClass("Soul", Soul);

    })();
