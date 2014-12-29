
    //===========================================================

    /**
     * @namespace  Onto.Weapon
     */
    Onto.addNamespace(new Namespace("Weapon"));

    (function() {

        var defaultBluntAttack = function() {
            return new Onto.Damage.Blunt(Onto.Dice.roll(1, 3).value);
        };

        /**
         * Weapon Base class constructor
         * @class  Onto.Weapon.Weapon
         * @abstract
         * @classdesc Represents a base weapon in the Onto game system. *Must be overridden!*
         * @param  {number} data - The data that is bound to this instance of Weapon
         * @see Onto.Weapon.RangedWeapon
         * @see Onto.Weapon.ThrownWeapon
         */
        var Weapon = new Class({
            isAbstract: true,
            init: function(data) {
                var self = this;
                self.Attack.Bash = defaultBluntAttack;
            },
            /**
             * @member {object} Attack - The container for the types of attacks that this weapon can do
             * @instance
             * @readonly
             * @memberof Onto.Weapon.Weapon
             */
            Attack: Class({}).Enumerable(),
            /**
             * @member {number} CriticalMultiplier - The multiplier for critical damage
             * @instance
             * @memberof Onto.Weapon.Weapon
             */
            CriticalMultiplier : Class(1.5).Enumerable().Writable(),
            /**
             * @member {object} Material - The type of material that this weapon is made of
             * @instance
             * @readonly
             * @memberof Onto.Weapon.Weapon
             */
            Material : Class(null).Enumerable(),
            /**
             * @member {number} Weight - The number of pounds this weapon weighs
             * @instance
             * @readonly
             * @memberof Onto.Weapon.Weapon
             */
            Weight: Class(0).Enumerable()
        });

        Onto.Weapon.addClass("Weapon", Weapon);

        /**
         * RangedWeapon Weapon class constructor
         * @class  Onto.Weapon.RangedWeapon
         * @abstract
         * @param  {number} data - The data that is bound to this instance of Weapon
         * @extends {Onto.Weapon.Weapon}
         * @inheritdoc Onto.Weapon.Weapon
         * @return {Onto.Weapon.RangedWeapon}
         * @see Onto.Weapon.ThrownWeapon
         */

        var RangedWeapon = new Class({
            isAbstract: true,
            inherits: Onto.Weapon,
            init: function constructor(data) {
                var self = this;
                constructor.super.call(self, data);

                self.MaxRange = self.RangeIncrement * 10;
                self.Attack.Shoot = function(ammunition) {
                    if (ammunition && ammunition.Count) {
                        --ammunition.Count;
                        var bowDamage = dice.roll(1, 8, 0).value;
                        return ammunition.Damage(bowDamage);
                    } else {
                        throw new Error('That ammunition type is incorrect!');
                    }
                };
            },
            /**
             * @member {number} RangeIncrement - The number of feet in increments that affects the success of an attack
             * @instance
             * @readonly
             * @memberof Onto.Weapon.RangedWeapon
             */
            RangeIncrement: 20,
            /**
             * @member {number} MaxRange - The number of feet the weapon can be accurately fired within
             * @instance
             * @readonly
             * @memberof Onto.Weapon.RangedWeapon
             */
            MaxRange: 100
        });

        Onto.Weapon.addClass("RangedWeapon", RangedWeapon);

        /**
         * ThrownWeapon Weapon class constructor
         * @class  Onto.Weapon.ThrownWeapon
         * @abstract
         * @param  {number} data - The data that is bound to this instance of Weapon
         * @extends {Onto.Weapon.RangedWeapon}
         * @inheritdoc Onto.Weapon.RangedWeapon
         * @return {Onto.Weapon.ThrownWeapon}
         */

        var ThrownWeapon = new Class({
            isAbstract: true,
            inherits: Onto.Weapon.RangedWeapon,
            init: function constructor(data) {
                var self = this;
                constructor.super.call(self, data);

                self.MaxRange = this.RangeIncrement * 5;
                self.Attack.Throw = function() {
                    var dmg = dice.roll(1, 4, 0).value;
                    return new Damage.Blunt.Class(dmg);
                };
            }
        });

        Onto.Weapon.addClass("ThrownWeapon", ThrownWeapon);
    })();
