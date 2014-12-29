
    //===========================================================

    /**
     * @namespace  Onto.Damage
     */
    Onto.addNamespace(new Namespace("Damage"));

    (function() {

        /**
         * Damage Base class constructor
         * @class  Onto.Damage.Damage
         * @abstract
         * @classdesc Represents a base damage in the Onto game system. *Must be overridden!*
         * @param  {number} value - The damage value
         * @param  {object} shard - The shard left by this damage, ex: a bullet
         * @param  {number} timestamp - The time that the damage occurred
         */
        var Damage = new Class({
            isAbstract: true,
            init: function constructor(value, shard, timestamp) {
                var self = this;

                // constructor.super.call(this);
                self.Value = value || 0;
                self.Shard = shard || null;
                self.Timestamp = timestamp || new Date().getTime();

                // Class.define(self, 'Skills', Class({}).Enumerable());
            },

            Value : Class(0).Enumerable().Writable(),
            Shard : Class(null).Enumerable().Writable(),
            Timestamp: Class(0).Enumerable().Writable(),

            DamageType: Class('').Enumerable().Writable(),
        });

        /**
         * @name  Onto.Damage.Types
         * @description  Static member holding string names of the types of damage that exist on the {@link Onto.Damage} namespace
         * @static
         * @type {Array}
         */
        Damage.Types = [
            'Blunt', 'Cut', 'Burn', 'Pierce', 'Freeze', 'Poison'
        ];

        Onto.Damage.addClass("Damage", Damage);

        /**
         * Blunt Damage class constructor
         * @class  Onto.Damage.Blunt
         * @name  Onto.Damage.Blunt
         * @param  {number} value - The damage value
         * @param  {object} shard - The shard left by this damage, ex: a wooden splinter
         * @param  {number} timestamp - The time that the damage occurred
         * @extends Onto.Damage.Damage
         * @return {Onto.Damage.Blunt}
         */

        /**
         * Cut Damage class constructor
         * @class  Onto.Damage.Cut
         * @param  {number} value - The damage value
         * @param  {object} shard - The shard left by this damage, ex: a sword fragment
         * @param  {number} timestamp - The time that the damage occurred
         * @extends Onto.Damage.Damage
         * @return {Onto.Damage.Cut}
         */

        /**
         * Burn Damage class constructor
         * @class  Onto.Damage.Burn
         * @param  {number} value - The damage value
         * @param  {object} shard - The shard left by this damage
         * @param  {number} timestamp - The time that the damage occurred
         * @extends Onto.Damage.Damage
         * @return {Onto.Damage.Burn}
         */

        /**
         * Pierce Damage class constructor
         * @class  Onto.Damage.Pierce
         * @param  {number} value - The damage value
         * @param  {object} shard - The shard left by this damage
         * @param  {number} timestamp - The time that the damage occurred
         * @extends Onto.Damage.Damage
         * @return {Onto.Damage.Pierce}
         */

        /**
         * Freeze Damage class constructor
         * @class  Onto.Damage.Freeze
         * @param  {number} value - The damage value
         * @param  {object} shard - The shard left by this damage
         * @param  {number} timestamp - The time that the damage occurred
         * @extends Onto.Damage.Damage
         * @return {Onto.Damage.Freeze}
         */

        /**
         * Poison Damage class constructor
         * @class  Onto.Damage.Poison
         * @param  {number} value - The damage value
         * @param  {object} shard - The shard left by this damage
         * @param  {number} timestamp - The time that the damage occurred
         * @extends Onto.Damage.Damage
         * @return {Onto.Damage.Poison}
         */

        for (var i = 0; i < Damage.Types.length; ++i) {
            var damageType = Damage.Types[i];
            /*jshint -W083 */
            (function(damageType){
                var damageClass = new Class({
                    inherits: Damage,
                    init: function constructor(value, shard, timestamp) {
                        constructor.super.call(this, value, shard, timestamp);
                        this.DamageType = damageType;
                    }
                });
                Onto.Damage.addClass(damageType, damageClass);
            })(damageType);
        }
    })();
