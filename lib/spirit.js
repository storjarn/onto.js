
    //===========================================================

    /**
     * Soul Class constructor
     * @class  Onto.Spirit
     * @classdesc Represents a soul in the Onto game system.
     * @param {object} data - The data that is going to be bound to this instance of Soul
     * @return {Onto.Spirit}
     * @extends {Onto.Soul}
     * @inheritdoc Onto.Soul
     * @see Onto.Body
     */
    var Spirit = new Class({
        inherits: Onto.Soul,
        init: function constructor(data) {
            var self = this;
            data = data || {};

            var Attributes = {
                Charisma        : 9,
                Intelligence    : 9
            };

            /**
             * @member {object} Attributes - The container for the instance's main attributes.
             * @instance
             * @readonly
             * @memberof Onto.Soul
             * @property {number} Perception - The ability to see, hear, taste and notice unusual things. The basis of a soul's power.
             * @property {number} Luck - The serendipity potential of the soul.  Contributes to the soul's power.
             * @property {number} Intelligence - The smarts of the spirit.
             * @property {number} Charisma - The charm and beauty of the spirit.
             */
            data.Attributes = Onto._.extend(self.Attributes || Attributes, data.Attributes || Attributes);
            constructor.super.call(self, data);

            /**
             * @member {object} Chi - The amount of power the spirit has for a number of things.<br />Calculated by: _Attributes.Luck / 2 + Attributes.Perception + Attributes.Intelligence / 2_
             * @instance
             * @readonly
             * @memberof Onto.Spirit
             */
            Class.define(self, 'Chi', {
                get: function(){ return (self.Attributes.Luck / 2) + self.Attributes.Perception + (self.Attributes.Intelligence / 2); },
                enumerable: true
            });
        },

        Chi : null
    });


    Onto.addClass("Spirit", Spirit);
