
    //===========================================================

    /**
     * Being Class constructor
     * @class  Onto.Being
     * @abstract
     * @classdesc Represents a living being in the Onto game system. *Must be overridden!*
     * @param {object} data - The data that is going to be bound to this instance of Being
     * @extends Onto.Body
     * @inheritdoc Onto.Body
     * @see Onto.Humanoid
     */
    var Being = new Class({
        inherits: Onto.Body,
        isAbstract: true,
        init: function constructor(data) {
            var self = this;
            data = data || {};

            var defaultAttributes = {
                Strength        : 9,
                Endurance       : 9,
                Agility         : 9
            };

            /**
             * @member {object} Attributes - The container for the instance's main attributes.
             * @instance
             * @readonly
             * @memberof Onto.Being
             * @property {number} Perception - The ability to see, hear, taste and notice unusual things. The basis of a soul's power.
             * @property {number} Luck - The serendipity potential of the soul.  Contributes to the soul's power.
             * @property {number} Intelligence - The smarts of the spirit.
             * @property {number} Charisma - The charm and beauty of the spirit.
             * @property {number} Strength - The strength of the physical body.
             * @property {number} Endurance - The endurance of the physical body.
             * @property {number} Agility - The agility of the physical body.
             */
            data.Attributes = Onto._.extend(defaultAttributes, data.Attributes || {});
            data.HitLocations = Onto._.extend(this.HitLocations || {}, data.HitLocations || {});
            data.Inventory = Onto._.extend(this.Inventory || {}, data.Inventory || {});
            constructor.super.call(self, data);

            Class.define(self, 'Attributes', Class({}).Enumerable());

            var spirit = new Onto.Spirit(data);
            for(var attrName in spirit.Attributes) {
                Class.define(self.Attributes, attrName, Class(spirit.Attributes[attrName].valueOf()).Enumerable());
            }

            Class.define(self, "Chi", Class(spirit.Chi).Enumerable());
            Class.define(self, "Power", Class(spirit.Power).Enumerable());

            // Class.implement(spirit, self);


            /**
             * @member {number} Age - The age of the humanoid
             * @instance
             * @memberof Onto.Humanoid
             */
            Class.define(self, 'Age', Class(data.Age || 18).Writable().Enumerable());

            /**
             * @member {string} Gender - The gender of the humanoid
             * @instance
             * @memberof Onto.Humanoid
             */
            this.Gender = data.Gender || "Male";
            /**
             * @member {string} Name - The name of the humanoid
             * @instance
             * @memberof Onto.Humanoid
             */
            this.Name = data.Name;

            /**
             * @member {number} Size - The size of the physical body.<br />Calculated by: _(Attributes.Strength + Attributes.Endurance) / 2_
             * @instance
             * @readonly
             * @memberof Onto.Being
             */
            Class.define(self, 'Size', {
                get: function(){ return (self.Attributes.Strength + self.Attributes.Endurance) / 2; },
                enumerable: true
            });

            /**
             * @member {number} HitPoints - The number of points of the physical body before destruction or death.<br />Calculated by: _15 + Attributes.Strength + Attributes.Endurance * 2_
             * @instance
             * @readonly
             * @memberof Onto.Being
             */
            Class.define(self, 'HitPoints', {
                get: function(){ return 15 + self.Attributes.Strength + (self.Attributes.Endurance * 2); },
                enumerable: true
            });

            /**
             * @member {number} MovementSpeed - The number of points in feet per second the physical body can move.<br />Calculated by: _Math.max(1 + Attributes.Agility - CurrentDamage, 0)_
             * @instance
             * @readonly
             * @memberof Onto.Being
             */
            Class.define(self, 'MovementSpeed', {
                get: function(){ return Math.max(1 + self.Attributes.Agility - self.CurrentDamage, 0); },
                enumerable: true
            });

            /**
             * @member {number} AttackSpeed - The number of points representing the initiative rank of the physical body.<br />Calculated by: _Math.max(20 - Attributes.Agility + CurrentDamage, 1)_
             * @instance
             * @readonly
             * @memberof Onto.Being
             */
            Class.define(self, 'AttackSpeed', {
                get: function(){ return Math.max(20 - self.Attributes.Agility + self.CurrentDamage, 1); },
                enumerable: true
            });

            /**
             * @member {number} MaxCarryWeight - The number of pounds the physical body can carry before at half the {@link Onto.Being#MovementSpeed} before tiring effects take place.<br />Calculated by: _12 * Attributes.Strength_
             * @instance
             * @readonly
             * @memberof Onto.Being
             */
            Class.define(self, 'MaxCarryWeight', {
                get: function(){ return 12 * self.Attributes.Strength; },
                enumerable: true
            });

            /**
             * @member {object} HitLocations - The container for all of the body's hit locations.
             * @instance
             * @memberof Onto.Being
             */
            // Class.define(self, 'HitLocations', Class(data.HitLocations).Enumerable().Writable());

            /**
             * @member {Onto.Inventory} Inventory - The container for all of the items in the body's physical possession.
             * @instance
             * @memberof Onto.Being
             */
            Class.define(self, 'Inventory', Class(data.Inventory).Enumerable().Writable());

            /**
             *  Overridden toJSON method.
             * @function toJSON
             * @instance
             * @memberof Onto.Being
             * @returns {object} Returns the data that can be persisted and also to initialize a class instance
             */
            // Class.define(self, 'toJSON', Class(function() {
            //     return {
            //         Inventory : self.Inventory
            //     };
            // }));
        }
    });


    Onto.addClass("Being", Being);

