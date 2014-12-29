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

	/* globals Class, Namespace, EventEmitter, ReferenceObject, _ */

	/**
	 * The top-level namespace for this library
     * @namespace  Onto
     * @property {function}  Class               - The {@link https://github.com/storjarn/ee-class|ee-class} keyword, allowing to create basic classes
     * @property {Class}  EventEmitter        - The {@link https://github.com/storjarn/ee-class|ee-class} keyword, allowing to create event emitter classes
     * @property {Class}  Namespace        	  - The {@link https://github.com/storjarn/ee-class|ee-class} keyword, allowing to create proper namespaces
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
        _: underscore || _
    });
    //===========================================================

    /**
     * @namespace  Onto.Dice
     */

    (function() {

        var randomize = function(min, max, bAsInt) {
            min = min || 0;
            max = max || 1;
            bAsInt = bAsInt !== false;
            return function() {
              if (bAsInt) {
                return (Math.floor(Math.random() * (max - min + 1))) + min;
              } else {
                return (Math.random() * (max - min)) + min;
              }
            };
        };

        var dice = {
            random : randomize
        };

        /**
         * @member {object} defaults - The defaults for each roll if no params are specified
         * @readonly
         * @memberof Onto.Dice
         * @property {number} numberOfDie - The number of dice to roll
         * @property {number} typeOfDie - The type of die to roll
         * @property {number} modifier - The modifier to add to the total
         */
        var defaults = dice.defaults = {
            numberOfDie : 1,
            typeOfDie : 6,
            modifier : 0
        };

        /**
         * Rolls a set of virtual die and returns an object with each roll result, the set data, and the total
         * @function Onto.Dice.roll
         * @param  {number} [numberOfDie] - The number of dice to roll.  Defaults to {@link Onto.Dice.defaults.numberOfDie|defaults.numberOfDie}
         * @param  {number} [typeOfDie]   - The type of die to roll.  Defaults to {@link Onto.Dice.defaults.typeOfDie|defaults.typeOfDie}
         * @param  {number} [modifier]    - The modifier to add to the total.  Defaults to {@link Onto.Dice.defaults.modifier|defaults.modifier}
         * @return {object}              - An object with each roll result, the set data, and the total.
         * example:<pre><code>{
    multiple: numberOfDie,
    typeOfDie : typeOfDie,
    modifier: modifier,
    rolls : [],
    value : 0
}</code></pre>
         * @example
var result = Onto.Dice.roll(2, 10, 3);
result == {
    multiple: 2,
    typeOfDie : 10,
    modifier: 3,
    rolls : [7, 1],
    value : 11
}
         */
        var roll = dice.roll = function(numberOfDie, typeOfDie, modifier){
            numberOfDie = numberOfDie || defaults.numberOfDie;
            typeOfDie = typeOfDie || defaults.typeOfDie;
            modifier = modifier || defaults.modifier;

            var ret = {
                multiple: numberOfDie,
                typeOfDie : typeOfDie,
                modifier: modifier,
                rolls : [],
                value : 0
            };

            for(var i = 1; i < numberOfDie + 1; ++i) {
                var result = randomize(1, typeOfDie)();
                ret.rolls.push(result);
                ret.value += result;
            }
            ret.value += modifier;
            ret.toString = function(base) {
                return ret.value.toString(base || 10);
            };
            ret.valueOf = function() {
                return ret.value;
            };

            return ret;
        };

        /**
         * Rolls a virtual die between 1 and `max` and returns an object with each roll result, the set data, and the total
         * @function Onto.Dice.d
         * @param  {number} [max]   - The type of die to roll.  Defaults to {@link Onto.Dice.defaults.typeOfDie|defaults.typeOfDie}
         * @return {object}              - An object with each roll result, the set data, and the total.
         * example:<pre><code>{
    multiple: numberOfDie,
    typeOfDie : typeOfDie,
    modifier: modifier,
    rolls : [],
    value : 0
}</code></pre>
         * @example
var result = Onto.Dice.d(23);
result == {
    multiple: 1,
    typeOfDie : 23,
    modifier: 0,
    rolls : [11],
    value : 11
}
         */
        dice.d = function(max) {
            return roll(1, max);
        };

        /**
         * Creates a generator of virtual die that can be reused
         * @function Onto.Dice.createRoll
         * @param  {number} [numberOfDie] - The number of dice to roll.  Defaults to {@link Onto.Dice.defaults.numberOfDie|defaults.numberOfDie}
         * @param  {number} [typeOfDie]   - The type of die to roll.  Defaults to {@link Onto.Dice.defaults.typeOfDie|defaults.typeOfDie}
         * @param  {number} [modifier]    - The modifier to add to the total.  Defaults to {@link Onto.Dice.defaults.modifier|defaults.modifier}
         * @return {function}              - A generator of virtual die that can be reused
         * @example
var generator = Onto.Dice.createRoll(3, 6);
var result = generator();
result == {
    multiple: 3,
    typeOfDie : 6,
    modifier: 0,
    rolls : [1, 4, 2],
    value : 7
}
         */
        var createRoll = dice.createRoll = function(numberOfDie, typeOfDie, modifier){
            numberOfDie = numberOfDie || defaults.numberOfDie;
            typeOfDie = typeOfDie || defaults.typeOfDie;
            modifier = modifier || defaults.modifier;

            return function() {
                return dice.roll(numberOfDie, typeOfDie, modifier);
            };
        };

        /**
         * Parses a spcifically formatted string and returns an object with each roll result, the set data, and the total
         * @function Onto.Dice.parseString
         * @param  {string} str - The formatted string indicating what to roll.  The modifier is preceeded by an 'm'
         * example:<pre><code>"3d6m-1"</code></pre>
         * @return {object}              - An object with each roll result, the set data, and the total.
         * example:<pre><code>{
    multiple: numberOfDie,
    typeOfDie : typeOfDie,
    modifier: modifier,
    rolls : [],
    value : 0
}</code></pre>
         * @example
var result = Onto.Dice.parseString("3d6m-1");
result == {
    multiple: 3,
    typeOfDie : 6,
    modifier: -1,
    rolls : [1, 4, 2],
    value : 6
}
         */
        var parseString = dice.parseString = function(str) {
            if (!!str && str.indexOf('d') > -1) {
                var typeOfDice = str.split('d');
                var numberOfDice = typeOfDice[0];
                typeOfDice = typeOfDice[1];
                var modifier = 0;
                if (typeOfDice.indexOf('m') > -1) {
                    modifier = typeOfDice.split('m');
                    typeOfDice = modifier[0];
                    if (modifier.length > 1) {
                        modifier = modifier[1];
                    } else {
                        modifier = 0;
                    }
                    // console.log(modifier)
                }
                numberOfDice = parseInt(numberOfDice.toString());
                typeOfDice = parseInt(typeOfDice.toString());
                modifier = parseInt(modifier.toString());

                if (isNaN(numberOfDice)) {
                    throw new Error("The number of dice is not a number!");
                } else if (isNaN(typeOfDice)) {
                    throw new Error("The type of dice is not a number!");
                } else if (isNaN(modifier)) {
                    throw new Error("The modifier is not a number!");
                } else {
                    return dice.roll(numberOfDice, typeOfDice, modifier);
                }
            } else {
                throw new Error("parseString() usage: pass the number of dice, type of dice, and modifier like so: 2d6m-8\nexample: parseString('2d6m-8') or parseString('3d6')");
            }
        };

        /**
         * Runs a test against a set of data and outputs the results
         * @function Onto.Dice.test
         * @param  {Array} diceSetup - An array of test data to run against.  Defines a set of rolls to make.  Each subarray has the numberOfDie, typeOfDie, and modifier.  None of these are optional.
         * example:<pre><code>[
    [1, 6, 0],
    [3, 6, 3]
]
</code></pre>
         * @param  {number} [iterations] - The number of times to roll against each set of test data.  The default is 100
         * @example
var result = Onto.Dice.test([
    [1, 6, 0],
    [3, 6, 3]
]);
//Output:
Iterating 100 times over 1d6+0
{"2":21,"3":15,"1":16,"4":19,"5":12,"6":17}
Iterating 100 times over 3d6+3
{"14":10,"13":13,"15":14,"12":10,"8":3,"9":4,"16":14,"17":7,"10":8,"18":6,"19":3,"11":5,"20":2,"7":1}

         */
        var test = dice.test = function(diceSetup, iterations){

            iterations = iterations || 100;

            var results = {};
            // var performance = new util.performance();

            for(var j = 0; j < diceSetup.length; ++j) {
                if (diceSetup[j].length !== 3) {
                    throw new Error("test() usage: pass an array with subarrays, each containing the number of dice, type of dice, and modifier like so: [[3, 6, 0], [1, 10, 2]]");
                } else {
                    console.time("Dice");

                    var multiple = diceSetup[j][0];
                    var die = diceSetup[j][1];
                    var modifier = diceSetup[j][2];
                    console.log("Iterating "+iterations+" times over "+ multiple + 'd' + die + '+' + modifier);
                    for (var i = 0; i < iterations; ++i) {
                        var result = dice.roll(multiple, die, modifier);
                        if (!results[result.value.toString()]) {
                            results[result.value.toString()] = 0;
                        }
                        ++(results[result.value.toString()]);
                    }
                    console.log(JSON.stringify(results));
                    results = {};
                    console.timeEnd("Dice");
                    // console.log('This test took ' + performance.end('ms') + ' ms.');
                }
            }
        };

        var Dice = new Namespace("Dice", Onto, dice);

    })();

    //===========================================================

    /**
     * Item Class constructor
     * @class  Onto.Item
     * @classdesc Represents an item in the Onto game system
     * @param {object} data - The data that is going to be bound to this instance of Item
     * @return {Onto.Item}
     * @extends {Onto.Body}
     * @inheritdoc Onto.Body
     * @see Onto.Inventory
     */
    var Item = new Class({
        inherits: Onto.Body,
        init: function(data) {
            var self = this;
            data = data || {};

        }
    });

    Onto.addClass("Item", Item);

    //===========================================================

    /**
     * Inventory Class constructor
     * @class  Onto.Inventory
     * @classdesc Represents an inventory in the Onto game system.  An inventory is a collection of {@link Onto.Item|Items}
     * @param {object} data - The data that is going to be bound to this instance of Inventory
     * @return {Onto.Inventory}
     * @extends {Onto.Item}
     * @inheritdoc Onto.Item
     * @see Onto.Body
     */
    var Inventory = new Class({
        inherits: Onto.Item,
        init: function(data) {
            var self = this;
            data = data || {};

        },

        attachItem: {
            value : function(item) {

            }
        },

        /**
         * @member {Onto.Body} ParentContainer - The container of this inventory.  Can be null
         * @instance
         * @memberof Onto.Inventory
         */
        ParentContainer: null,

        /**
         * @member {Onto.Body} ParentContainer - The container of this inventory.  Can be null
         * @instance
         * @memberof Onto.Inventory
         */
        Container: null
    });


    Onto.addClass("Inventory", Inventory);

    //===========================================================

    /**
     * Armor Class constructor
     * @class  Onto.Armor
     * @property {number} Value - The base protective value of the armor
     * @property {number} Blunt - The value adjustment of the armor against blunt damage, between 0 and 1
     * @property {number} Cut - The value adjustment of the armor against cut damage, between 0 and 1
     * @property {number} Pierce - The value adjustment of the armor against piercing damage, between 0 and 1
     * @property {number} Freeze - The value adjustment of the armor against freeze damage, between 0 and 1
     * @property {number} Poison - The value adjustment of the armor against poison damage, between 0 and 1
     * @return {Onto.Armor}
     * @example
"Leather Jerkin" : {
    Weight: 3,
    Warmth: 5,
    Slots: 7,
    Armor : {
        Value : 5,
        "Blunt" : .2,
        "Cut" : .4,
        "Burn" : .7,
        "Pierce" : .2,
        "Freeze" : .3,
        "Poison" : .9
    }
}
     */
    var Armor = new Class({
        init: function constructor(data) {

            var self = this;
            data = data || {};

            // Class.define(self, 'Skills', Class({}).Enumerable());
        },

        Value : Class(0).Enumerable().Writable(),

        Blunt : Class(0).Enumerable().Writable(),
        Cut : Class(0).Enumerable().Writable(),
        Burn : Class(0).Enumerable().Writable(),
        Pierce : Class(0).Enumerable().Writable(),
        Freeze : Class(0).Enumerable().Writable(),
        Poison : Class(0).Enumerable().Writable()
    });


    Onto.addClass("Armor", Armor);

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

    //===========================================================

    /**
     * @namespace  Onto.Skill
     */
    Onto.addNamespace(new Namespace("Skill"));


    //===========================================================

    /**
     * Specialization Class constructor
     * @class  Onto.Skill.Specialization
     * @classdesc Represents an skill specialization in the Onto game system
     * @param {object} data - The data that is going to be bound to this instance of Specialization
     * @return {Onto.Skill.Specialization}
     * @see Onto.Skill
     * @see Onto.Skill.Specializations
     */
    var Specialization = new Class({
        init: function(namePath, value, description, useCount) {
            var self = this;
            var _value = value;
            useCount = useCount || 0;
            var namePathSplitRev = namePath.split(".").reverse();
            Class.define(self, "namePath", Class(namePath).Enumerable());
            Class.define(self, "value", { get: function(){ return _value; }, enumerable: true});
            Class.define(self, "valueOf", Class(function(){ return _value; }));
            Class.define(self, "useCount", Class(useCount).Enumerable().Writable());
            Class.define(
                self,
                "description",
                Class(description || "The general skill of " + namePathSplitRev.join(' ').toLowerCase()).Enumerable()
            );

            Class.define(self, "increment", Class(function(){ ++_value; }));
        }
    });

    Onto.Skill.addClass("Specialization", Specialization);
    //===========================================================

    /**
     * @namespace  Onto.Skill.Specializations
     * @see Onto.Skill.Specialization
     */


    (function() {

        var specialization = {
            /**
             * @function loadDefaults
             * @memberOf Onto.Skill.Specializations
             * @return {Onto.Skill.Specializations.SpecializationCollection} - The default skill specializations named by their name path, ex. "Firearms.Pistol"
             * @see Onto.Humanoid#Specializations
             * @example
var specializations = Onto.Skill.Specializations.loadDefaults();
var rifleSpecVal = specializations["Firearms.Rifle"];
             */
            loadDefaults: function() {

                /**
                 * Collection of {@link Onto.Skill.Specialization|specializations}.  These are accessed by their name path, ex. `"Firearms.Pistol"`.  See the defaults below.
                 * @typedef Onto.Skill.Specializations.SpecializationCollection
                 * @type {object}
                 * @memberof Onto.Skill.Specializations
                 *
                 * @property {Onto.Skill.Specialization} Firearms - The general skill of using all firearm weapons
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Firearms.Pistol - The general skill of using all pistols
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Firearms.Pistol.Pipe - The general skill of using all makeshift pistols
                 * <br />_default value: -5_
                 *
                 * @property {Onto.Skill.Specialization} Firearms.SMG - The general skill of using all submachine guns
                 * <br />_default value: -15_
                 *
                 * @property {Onto.Skill.Specialization} Firearms.Rifle - The general skill of using all rifles
                 * <br />_default value: -5_
                 *
                 * @property {Onto.Skill.Specialization} Firearms.MG - The general skill of using all large mounted machine guns
                 * <br />_default value: -15_
                 *
                 * @property {Onto.Skill.Specialization} Archery - The general skill of using all tension-propelled weapons for archery
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Archery.Bow - The general skill of using all bow weapons for archery
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Archery.Crossbow - The general skill of using all crossbow weapons for archery
                 * <br />_default value: -5_
                 *
                 * @property {Onto.Skill.Specialization} Explosives - The general skill of using all explosives
                 * <br />_default value: -20_
                 *
                 * @property {Onto.Skill.Specialization} Melee - The general skill of using all hand-to-hand weapons, including brass knuckles, legs, fists, heads, etc.
                 * <br />_default value: 0_
                 *
                 * @property {Onto.Skill.Specialization} Melee.Shield - The general skill of using handheld shields as weapons
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Melee.Spear - The general skill of using spears in hand-to-hand combat
                 * <br />_default value: -15_
                 *
                 * @property {Onto.Skill.Specialization} Melee.Knife - The general skill of using knives in hand-to-hand combat
                 * <br />_default value: -5_
                 *
                 * @property {Onto.Skill.Specialization} Melee.Sword - The general skill of using swords in hand-to-hand combat
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Melee.Axe - The general skill of using axes in hand-to-hand combat
                 * <br />_default value: -15_
                 *
                 * @property {Onto.Skill.Specialization} Melee.Hammer - The general skill of using hammers in hand-to-hand combat
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Melee.KungFu - The general skill of successfully using techniques in the discipline of kung fu
                 * <br />_default value: -35_
                 *
                 * @property {Onto.Skill.Specialization} Throwing - The general skill of throwing things
                 * <br />_default value: 0_
                 *
                 * @property {Onto.Skill.Specialization} Throwing.Spear - The general skill of throwing spears
                 * <br />_default value: -20_
                 *
                 * @property {Onto.Skill.Specialization} Throwing.Knife - The general skill of throwing knives
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Throwing.Axe - The general skill of throwing axes
                 * <br />_default value: -20_
                 *
                 * @property {Onto.Skill.Specialization} Lockpick - The general skill of using tools to open locks without a key
                 * <br />_default value: 0_
                 *
                 * @property {Onto.Skill.Specialization} Mechanics - The general skill of using and repairing machinery or working parts of something
                 * <br />_default value: 0_
                 *
                 * @property {Onto.Skill.Specialization} Mechanics.Combustion - The general skill of using and repairing machinery and tools that use fuel combustion power
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Mechanics.Combustion.Coal - The general skill of using and repairing machinery and tools that use coal for fuel combustion power
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Mechanics.Combustion.Hydrocarbon - The general skill of using and repairing machinery and tools that use gasoline or diesel for fuel combustion power
                 * <br />_default value: -20_
                 *
                 * @property {Onto.Skill.Specialization} Mechanics.Hydraulic - The general skill of using and repairing machinery and tools that use liquid fluid power to do simple work
                 * <br />_default value: -20_
                 *
                 * @property {Onto.Skill.Specialization} Medicine - The general skill of help given to a sick or injured person
                 * <br />_default value: 0_
                 *
                 * @property {Onto.Skill.Specialization} Medicine.FirstAid - The general skill of help given to a sick or injured person until full medical treatment is available
                 * <br />_default value: -5_
                 *
                 * @property {Onto.Skill.Specialization} Science - the intellectual and practical activity encompassing the systematic study of the structure and behavior of the physical and natural world through observation and experiment
                 * <br />_default value: 0_
                 *
                 * @property {Onto.Skill.Specialization} Science.Botany - The general skill of working with plants
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Science.Mineral - The general skill of working with minerals
                 * <br />_default value: -15_
                 *
                 * @property {Onto.Skill.Specialization} Science.Electronic - The general skill of working with electronic devices
                 * <br />_default value: -20_
                 *
                 * @property {Onto.Skill.Specialization} Science.Computer - The general skill of working with computers
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Science.Computer.Programming - The general skill of working with computer software
                 * <br />_default value: -20_
                 *
                 * @property {Onto.Skill.Specialization} Science.Physics - The general skill of working with energy and matter using the scientific method
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Science.Physics.Optical - The general skill of working with light
                 * <br />_default value: -25_
                 *
                 * @property {Onto.Skill.Specialization} Science.Physics.Particle - The general skill of working with particles
                 * <br />_default value: -35_
                 *
                 * @property {Onto.Skill.Specialization} Science.Physics.Astro - The general skill of planetary bodies
                 * <br />_default value: -50_
                 *
                 * @property {Onto.Skill.Specialization} Science.Rocket - The general skill of building rockets
                 * <br />_default value: -50_
                 *
                 * @property {Onto.Skill.Specialization} Craftsmanship - The general skill of making things
                 * <br />_default value: 0_
                 *
                 * @property {Onto.Skill.Specialization} Craftsmanship.Shipbuilding - The general skill of making boats
                 * <br />_default value: -20_
                 *
                 * @property {Onto.Skill.Specialization} Craftsmanship.Leathersmithing - The general skill of making things from leather
                 * <br />_default value: 0_
                 *
                 * @property {Onto.Skill.Specialization} Craftsmanship.Gemsmithing - The general skill of making things from gems
                 * <br />_default value: -25_
                 *
                 * @property {Onto.Skill.Specialization} Craftsmanship.Metalsmithing - The general skill of making things from metals
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Craftsmanship.Metalsmithing.Blacksmithing - The general skill of making things from iron and steel
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Craftsmanship.Metalsmithing.Goldsmithing - The general skill of making things from gold
                 * <br />_default value: -20_
                 *
                 * @property {Onto.Skill.Specialization} Craftsmanship.Metalsmithing.Silversmithing - The general skill of making things from silver
                 * <br />_default value: -15_
                 *
                 * @property {Onto.Skill.Specialization} Craftsmanship.Furrier - The general skill of making clothes from animal fur
                 * <br />_default value: -5_
                 *
                 * @property {Onto.Skill.Specialization} Craftsmanship.Dyeing - The general skill of dyeing cloth different colors
                 * <br />_default value: 0_
                 *
                 * @property {Onto.Skill.Specialization} Craftsmanship.Gunsmithing - The general skill of making guns
                 * <br />_default value: -20_
                 *
                 * @property {Onto.Skill.Specialization} Craftsmanship.Locksmithing - The general skill of making locks
                 * <br />_default value: -20_
                 *
                 * @property {Onto.Skill.Specialization} Craftsmanship.Pottersmithing - The general skill of making things from clay
                 * <br />_default value: -5_
                 *
                 * @property {Onto.Skill.Specialization} Craftsmanship.Stonemasonry - The general skill of making things from stone
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Craftsmanship.Weaving - The general skill of making things from thread
                 * <br />_default value: -5_
                 *
                 * @property {Onto.Skill.Specialization} Craftsmanship.Weaving.Ropesmithing - The general skill of making rope
                 * <br />_default value: -5_
                 *
                 * @property {Onto.Skill.Specialization} Craftsmanship.Carpentry - The general skill of building things with wood
                 * <br />_default value: 0_
                 *
                 * @property {Onto.Skill.Specialization} Craftsmanship.Carpentry.Coopersmithing - The general skill of making barrels
                 * <br />_default value: -5_
                 *
                 * @property {Onto.Skill.Specialization} Stealth - The general skill of being undetected
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Stealth.Steal - The general skill of taking things undetected
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Stealth.Sneak - The general skill of sneaking around undetected
                 * <br />_default value: -5_
                 *
                 * @property {Onto.Skill.Specialization} Survival - The general skill of surviving on outdoors
                 * <br />_default value: 0_
                 *
                 * @property {Onto.Skill.Specialization} Survival.Forest - The general skill of surviving in forests
                 * <br />_default value: -5_
                 *
                 * @property {Onto.Skill.Specialization} Survival.Desert - The general skill of surviving in deserts
                 * <br />_default value: -20_
                 *
                 * @property {Onto.Skill.Specialization} Survival.Island - The general skill of surviving on islands
                 * <br />_default value: -30_
                 *
                 * @property {Onto.Skill.Specialization} Survival.Mountain - The general skill of surviving on mountains
                 * <br />_default value: -5_
                 *
                 * @property {Onto.Skill.Specialization} Gambling - The general skill of gambling
                 * <br />_default value: 0_
                 *
                 * @property {Onto.Skill.Specialization} Gambling.Cards - The general skill of gambling with cards
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Gambling.Roulette - The general skill of gambling with a roulette wheel
                 * <br />_default value: -20_
                 *
                 * @property {Onto.Skill.Specialization} Speech - The general skill of moving others with speech
                 * <br />_default value: 0_
                 *
                 * @property {Onto.Skill.Specialization} Speech.Persuasion - The general skill of persuading others
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Speech.Barter - The general skill of negotiating a better price
                 * <br />_default value: 0_
                 *
                 * @property {Onto.Skill.Specialization} Piloting - The general skill of piloting powered vehicles
                 * <br />_default value: 0_
                 *
                 * @property {Onto.Skill.Specialization} Piloting.Boat - The general skill of piloting water vessels
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Piloting.Aircraft - The general skill of flying aircraft
                 * <br />_default value: -30_
                 *
                 * @property {Onto.Skill.Specialization} Piloting.Automobile - The general skill of driving cars
                 * <br />_default value: -5_
                 *
                 * @property {Onto.Skill.Specialization} Athletics - The general skill of being physically fit
                 * <br />_default value: 0_
                 *
                 * @property {Onto.Skill.Specialization} Athletics.Jump - The general skill of jumping when it counts
                 * <br />_default value: -5_
                 *
                 * @property {Onto.Skill.Specialization} Athletics.Climb - The general skill of climbing things
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Athletics.Ride - The general skill of riding animals
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Athletics.Swim - The general skill of swimming
                 * <br />_default value: -20_
                 *
                 * @property {Onto.Skill.Specialization} History - The general skill of knowing things
                 * <br />_default value: 0_
                 *
                 */

                var specializations = {};

                var Specialization = Onto.Skill.Specialization;

                /*jshint -W069 */
                specializations['Firearms'] = new Specialization(
                    "Firearms", -10, "The general skill of using all firearm weapons"
                );
                specializations['Firearms.Pistol'] = new Specialization(
                    "Firearms.Pistol", -10, "The general skill of using all pistols"
                );
                specializations['Firearms.Pistol.Pipe'] = new Specialization(
                    "Firearms.Pistol.Pipe", -5, "The general skill of using all makeshift pistols"
                );
                specializations['Firearms.SMG'] = new Specialization(
                    "Firearms.SMG", -15, "The general skill of using all submachine guns"
                );
                specializations['Firearms.Rifle'] = new Specialization(
                    "Firearms.Rifle", -5, "The general skill of using all rifles"
                );
                specializations['Firearms.MG'] = new Specialization(
                    "Firearms.MG", -15, "The general skill of using all large mounted machine guns"
                );
                specializations['Archery'] = new Specialization(
                    "Archery", -10, "The general skill of using all tension-propelled weapons for archery"
                );
                specializations['Archery.Bow'] = new Specialization(
                    "Archery.Bow", -10, "The general skill of using all bow weapons for archery"
                );
                specializations['Archery.Crossbow'] = new Specialization(
                    "Archery.Crossbow", -5, "The general skill of using all crossbow weapons for archery"
                );
                specializations['Explosives'] = new Specialization(
                    "Explosives", -20, "The general skill of using all explosives"
                );
                specializations['Melee'] = new Specialization(
                    "Melee", 0, "The general skill of using all hand-to-hand weapons, including brass knuckles, legs, fists, heads, etc."
                );
                specializations['Melee.Shield'] = new Specialization(
                    "Melee.Shield", -10, "The general skill of using handheld shields as weapons"
                );
                specializations['Melee.Spear'] = new Specialization(
                    "Melee.Spear", -15, "The general skill of using spears in hand-to-hand combat"
                );
                specializations['Melee.Knife'] = new Specialization(
                    "Melee.Knife", -5, "The general skill of using knives in hand-to-hand combat"
                );
                specializations['Melee.Sword'] = new Specialization(
                    "Melee.Sword", -10, "The general skill of using swords in hand-to-hand combat"
                );
                specializations['Melee.Axe'] = new Specialization(
                    "Melee.Axe", -15, "The general skill of using axes in hand-to-hand combat"
                );
                specializations['Melee.Hammer'] = new Specialization(
                    "Melee.Hammer", -10, "The general skill of using hammers in hand-to-hand combat"
                );
                specializations['Melee.KungFu'] = new Specialization(
                    "Melee.KungFu", -35, "The general skill of successfully using techniques in the discipline of kung fu"
                );
                specializations['Throwing'] = new Specialization(
                    "Throwing", 0, "The general skill of throwing things"
                );
                specializations['Throwing.Spear'] = new Specialization(
                    "Throwing.Spear", -20, "The general skill of throwing spears"
                );
                specializations['Throwing.Knife'] = new Specialization(
                    "Throwing.Knife", -10, "The general skill of throwing knives"
                );
                specializations['Throwing.Axe'] = new Specialization(
                    "Throwing.Axe", -20, "The general skill of throwing axes"
                );
                specializations['Lockpick'] = new Specialization(
                    "Lockpick", 0, "The general skill of using tools to open locks without a key"
                );
                specializations['Mechanics'] = new Specialization(
                    "Mechanics", 0, "The general skill of using and repairing machinery or working parts of something"
                );
                specializations['Mechanics.Combustion'] = new Specialization(
                    "Mechanics.Combustion", -10, "The general skill of using and repairing machinery and tools that use fuel combustion power"
                );
                specializations['Mechanics.Combustion.Coal'] = new Specialization(
                    "Mechanics.Combustion.Coal", -10, "The general skill of using and repairing machinery and tools that use coal for fuel combustion power"
                );
                specializations['Mechanics.Combustion.Hydrocarbon'] = new Specialization(
                    "Mechanics.Combustion.Hydrocarbon", -20, "The general skill of using and repairing machinery and tools that use gasoline or diesel for fuel combustion power"
                );
                specializations['Mechanics.Hydraulic'] = new Specialization(
                    "Mechanics.Hydraulic", -20, "The general skill of using and repairing machinery and tools that use liquid fluid power to do simple work"
                );
                specializations['Medicine'] = new Specialization(
                    "Medicine", 0, "The general skill of help given to a sick or injured person"
                );
                specializations['Medicine.FirstAid'] = new Specialization(
                    "Medicine.FirstAid", -5, "The general skill of help given to a sick or injured person until full medical treatment is available"
                );
                specializations['Science'] = new Specialization(
                    "Science", 0, "the intellectual and practical activity encompassing the systematic study of the structure and behavior of the physical and natural world through observation and experiment"
                );
                specializations['Science.Botany'] = new Specialization(
                    "Science.Botany", -10, "The general skill of working with plants"
                );
                specializations['Science.Mineral'] = new Specialization(
                    "Science.Mineral", -15, "The general skill of working with minerals"
                );
                specializations['Science.Electronic'] = new Specialization(
                    "Science.Electronic", -20, "The general skill of working with electronic devices"
                );
                specializations['Science.Computer'] = new Specialization(
                    "Science.Computer", -10, "The general skill of working with computers"
                );
                specializations['Science.Computer.Programming'] = new Specialization(
                    "Science.Computer.Programming", -20, "The general skill of working with computer software"
                );
                specializations['Science.Physics'] = new Specialization(
                    "Science.Physics", -10, "The general skill of working with energy and matter using the scientific method"
                );
                specializations['Science.Physics.Optical'] = new Specialization(
                    "Science.Physics.Optical", -25, "The general skill of working with light"
                );
                specializations['Science.Physics.Particle'] = new Specialization(
                    "Science.Physics.Particle", -35, "The general skill of working with particles"
                );
                specializations['Science.Physics.Astro'] = new Specialization(
                    "Science.Physics.Astro", -50, "The general skill of planetary bodies"
                );
                specializations['Science.Rocket'] = new Specialization(
                    "Science.Rocket", -50, "The general skill of building rockets"
                );
                specializations['Craftsmanship'] = new Specialization(
                    "Craftsmanship", 0, "The general skill of making things"
                );
                specializations['Craftsmanship.Shipbuilding'] = new Specialization(
                    "Craftsmanship.Shipbuilding", -20, "The general skill of making boats"
                );
                specializations['Craftsmanship.Leathersmithing'] = new Specialization(
                    "Craftsmanship.Leathersmithing", 0, "The general skill of making things from leather"
                );
                specializations['Craftsmanship.Gemsmithing'] = new Specialization(
                    "Craftsmanship.Gemsmithing", -25, "The general skill of making things from gems"
                );
                specializations['Craftsmanship.Metalsmithing'] = new Specialization(
                    "Craftsmanship.Metalsmithing", -10, "The general skill of making things from metals"
                );
                specializations['Craftsmanship.Metalsmithing.Blacksmithing'] = new Specialization(
                    "Craftsmanship.Metalsmithing.Blacksmithing", -10, "The general skill of making things from iron and steel"
                );
                specializations['Craftsmanship.Metalsmithing.Goldsmithing'] = new Specialization(
                    "Craftsmanship.Metalsmithing.Goldsmithing", -20, "The general skill of making things from gold"
                );
                specializations['Craftsmanship.Metalsmithing.Silversmithing'] = new Specialization(
                    "Craftsmanship.Metalsmithing.Silversmithing", -15, "The general skill of making things from silver"
                );
                specializations['Craftsmanship.Furrier'] = new Specialization(
                    "Craftsmanship.Furrier", -5, "The general skill of making clothes from animal fur"
                );
                specializations['Craftsmanship.Dyeing'] = new Specialization(
                    "Craftsmanship.Dyeing", 0, "The general skill of dyeing cloth different colors"
                );
                specializations['Craftsmanship.Gunsmithing'] = new Specialization(
                    "Craftsmanship.Gunsmithing", -20, "The general skill of making guns"
                );
                specializations['Craftsmanship.Locksmithing'] = new Specialization(
                    "Craftsmanship.Locksmithing", -20, "The general skill of making locks"
                );
                specializations['Craftsmanship.Pottersmithing'] = new Specialization(
                    "Craftsmanship.Pottersmithing", -5, "The general skill of making things from clay"
                );
                specializations['Craftsmanship.Stonemasonry'] = new Specialization(
                    "Craftsmanship.Stonemasonry", -10, "The general skill of making things from stone"
                );
                specializations['Craftsmanship.Weaving'] = new Specialization(
                    "Craftsmanship.Weaving", -5, "The general skill of making things from thread"
                );
                specializations['Craftsmanship.Weaving.Ropesmithing'] = new Specialization(
                    "Craftsmanship.Weaving.Ropesmithing", -5, "The general skill of making rope"
                );
                specializations['Craftsmanship.Carpentry'] = new Specialization(
                    "Craftsmanship.Carpentry", 0, "The general skill of building things with wood"
                );
                specializations['Craftsmanship.Carpentry.Coopersmithing'] = new Specialization(
                    "Craftsmanship.Carpentry.Coopersmithing", -5, "The general skill of making barrels"
                );
                specializations['Stealth'] = new Specialization(
                    "Stealth", -10, "The general skill of being undetected"
                );
                specializations['Stealth.Steal'] = new Specialization(
                    "Stealth.Steal", -10, "The general skill of taking things undetected"
                );
                specializations['Stealth.Sneak'] = new Specialization(
                    "Stealth.Sneak", -5, "The general skill of sneaking around undetected"
                );
                specializations['Survival'] = new Specialization(
                    "Survival", 0, "The general skill of surviving on outdoors"
                );
                specializations['Survival.Forest'] = new Specialization(
                    "Survival.Forest", -5, "The general skill of surviving in forests"
                );
                specializations['Survival.Desert'] = new Specialization(
                    "Survival.Desert", -20, "The general skill of surviving in deserts"
                );
                specializations['Survival.Island'] = new Specialization(
                    "Survival.Island", -30, "The general skill of surviving on islands"
                );
                specializations['Survival.Mountain'] = new Specialization(
                    "Survival.Mountain", -5, "The general skill of surviving on mountains"
                );
                specializations['Gambling'] = new Specialization(
                    "Gambling", 0, "The general skill of gambling"
                );
                specializations['Gambling.Cards'] = new Specialization(
                    "Gambling.Cards", -10, "The general skill of gambling with cards"
                );
                specializations['Gambling.Roulette'] = new Specialization(
                    "Gambling.Roulette", -20, "The general skill of gambling with a roulette wheel"
                );
                specializations['Speech'] = new Specialization(
                    "Speech", 0, "The general skill of moving others with speech"
                );
                specializations['Speech.Persuasion'] = new Specialization(
                    "Speech.Persuasion", -10, "The general skill of persuading others"
                );
                specializations['Speech.Barter'] = new Specialization(
                    "Speech.Barter", 0, "The general skill of negotiating a better price"
                );
                specializations['Piloting'] = new Specialization(
                    "Piloting", 0, "The general skill of piloting powered vehicles"
                );
                specializations['Piloting.Boat'] = new Specialization(
                    "Piloting.Boat", -10, "The general skill of piloting water vessels"
                );
                specializations['Piloting.Aircraft'] = new Specialization(
                    "Piloting.Aircraft", -30, "The general skill of flying aircraft"
                );
                specializations['Piloting.Automobile'] = new Specialization(
                    "Piloting.Automobile", -5, "The general skill of driving cars"
                );
                specializations['Athletics'] = new Specialization(
                    "Athletics", 0, "The general skill of being physically fit"
                );
                specializations['Athletics.Jump'] = new Specialization(
                    "Athletics.Jump", -5, "The general skill of jumping when it counts"
                );
                specializations['Athletics.Climb'] = new Specialization(
                    "Athletics.Climb", -10, "The general skill of climbing things"
                );
                specializations['Athletics.Ride'] = new Specialization(
                    "Athletics.Ride", -10, "The general skill of riding animals"
                );
                specializations['Athletics.Swim'] = new Specialization(
                    "Athletics.Swim", -20, "The general skill of swimming"
                );
                specializations['History'] = new Specialization(
                    "History", 0, "The general skill of knowing things"
                );

                // console.log(specializations);

                return specializations;
            }
        };

        new Namespace("Specializations", Onto.Skill, specialization);

    })();

/*
var Specializations = {
    "Firearms" : {
        "General" : {value: -10, description: "The general skill of using all firearm weapons"},
        "Pistol" : {
            "General": {value: -10, description: "The general skill of using all pistols"},
            "Pipe": {value: -5, description: "The general skill of using all makeshift pistols"},
        },
        "SMG" : {value: -15, description: "The general skill of using all submachine guns"},
        "Rifle" : {value: -5, description: "The general skill of using all rifles"},
        "MG" : {value: -15, description: "The general skill of using all large mounted machine guns"},
    },
    "Archery" : {
        "General" : {value: -10, description: "The general skill of using all tension-propelled weapons for archery"},
        "Bow" : {value: -10, description: "The general skill of using all bow weapons for archery"},
        "Crossbow" : {value: -5, description: "The general skill of using all crossbow weapons for archery"},
    },
    "Explosives" : {
        "General" : {value: -20, description: "The general skill of using all explosives"},
    },
    "Melee" : {
        "General" : {value: 0, description: "The general skill of using all hand-to-hand weapons, including brass knuckles, legs, fists, heads, etc."},
        "Shield" : {value: -10, description: "The general skill of using handheld shields as weapons"},
        "Spear" : {value: -15, description: "The general skill of using spears in hand-to-hand combat"},
        "Knife" : {value: -5, description: "The general skill of using knives in hand-to-hand combat"},
        "Sword" : {value: -10, description: "The general skill of using swords in hand-to-hand combat"},
        "Axe" : {value: -15, description: "The general skill of using axes in hand-to-hand combat"},
        "Hammer" : {value: -10, description: "The general skill of using hammers in hand-to-hand combat"},
        "KungFu" : {value: -35, description: "The general skill of successfully using techniques in the discipline of kung fu"},
    },
    "Throwing" : {
        "General" : {value: 0, description: "The general skill of throwing things"},
        "Spear" : {value: -20, description: "The general skill of throwing spears"},
        "Knife" : {value: -10, description: "The general skill of throwing knives"},
        "Axe" : {value: -20, description: "The general skill of throwing axes"}
    },
    "Lockpick" : {
        "General" : {value: 0, description: "The general skill of using tools to open locks without a key"}
    },
    "Mechanics" : {
        "General" : {value: 0, description: "The general skill of using and repairing machinery or working parts of something"},
        "Combustion" : {
            "General" : {value: -10, description: "The general skill of using and repairing machinery and tools that use fuel combustion power"},
            "Coal" : {value: -10, description: "The general skill of using and repairing machinery and tools that use coal for fuel combustion power"},
            "Hydrocarbon" : {value: -20, description: "The general skill of using and repairing machinery and tools that use gasoline or diesel for fuel combustion power"},
        },
        "Hydraulic" : {value: -20, description: "The general skill of using and repairing machinery and tools that use liquid fluid power to do simple work"},
    },
    "Medicine" : {
        "General" : {value: 0, description: "The general skill of help given to a sick or injured person"},
        "FirstAid" : {value: -5, description: "The general skill of help given to a sick or injured person until full medical treatment is available"},
    },
    "Science" : {
        "General" : {value: 0, description: "the intellectual and practical activity encompassing the systematic study of the structure and behavior of the physical and natural world through observation and experiment"},
        "Botany" : {value: -10, description: "The general skill of working with plants"},
        "Mineral" : {value: -15, description: "The general skill of working with minerals"},
        "Electronic" : {value: -20, description: "The general skill of working with electronic devices"},
        "Computer" : {
            "General" : {value: -10, description: "The general skill of working with computers"},
            "Programming" : {value: -20, description: "The general skill of working with computer software"},
        },
        "Physics" : {
            "General" : {value: -10, description: "The general skill of working with energy and matter using the scientific method"},
            "Optical" : {value: -25, description: "The general skill of working with light"},
            "Particle" : {value: -35, description: "The general skill of working with particles"},
            "Astro" : {value: -50, description: "The general skill of planetary bodies"},
        },
        "Rocket" : {value: -50, description: "The general skill of building rockets"},
    },
    "Craftsmanship" : {
        "General" : {value: 0, description: "The general skill of making things"},
        "Shipbuilding" : {value: -20, description: "The general skill of making boats"},
        "Leathersmithing" : {value: 0, description: "The general skill of making things from leather"},
        "Gemsmithing" : {value: -25, description: "The general skill of making things from gems"},
        "Metalsmithing" : {
            "General" : {value: -10, description: "The general skill of making things from metals"},
            "Blacksmithing" : {value: -10, description: "The general skill of making things from iron and steel"},
            "Goldsmithing" : {value: -20, description: "The general skill of making things from gold"},
            "Silversmithing" : {value: -15, description: "The general skill of making things from silver"},
        },
        "Furrier" : {value: -5, description: "The general skill of making clothes from animal fur"},
        "Dyeing" : {value: 0, description: "The general skill of dyeing cloth different colors"},
        "Gunsmithing" : {value: -20, description: "The general skill of making guns"},
        "Locksmithing" : {value: -20, description: "The general skill of making locks"},
        "Pottersmithing" : {value: -5, description: "The general skill of making things from clay"},
        "Stonemasonry" : {value: -10, description: "The general skill of making things from stone"},
        "Weaving" : {
            "General" : {value: -5, description: "The general skill of making things from thread"},
            "Ropesmithing" : {value: -5, description: "The general skill of making rope"},
        },
        "Carpentry" : {
            "General" : {value: 0, description: "The general skill of building things with wood"},
            "Coopersmithing" : {value: -5, description: "The general skill of making barrels"}
        }
    },
    "Stealth" : {
        "General" : {value: -10, description: "The general skill of being undetected"},
        "Steal" : {value: -10, description: "The general skill of taking things undetected"},
        "Sneak" : {value: -5, description: "The general skill of sneaking around undetected"},
    },
    "Survival" : {
        "General" : {value: 0, description: "The general skill of surviving on outdoors"},
        "Forest" : {value: -5, description: "The general skill of surviving in forests"},
        "Desert" : {value: -20, description: "The general skill of surviving in deserts"},
        "Island" : {value: -30, description: "The general skill of surviving on islands"},
        "Mountain" : {value: -5, description: "The general skill of surviving on mountains"},
    },
    "Gambling" : {
        "General" : {value: 0, description: "The general skill of gambling"},
        "Cards" : {value: -10, description: "The general skill of gambling with cards"},
        "Roulette" : {value: -20, description: "The general skill of gambling with a roulette wheel"},
    },
    "Speech" : {
        "General" : {value: 0, description: "The general skill of moving others with speech"},
        "Persuasion" : {value: -10, description: "The general skill of persuading others"},
        "Barter" : {
            "General" : {value: 0, description: "The general skill of negotiating a better price"},
        }
    },
    "Piloting" : {
        "General" : {value: 0, description: "The general skill of piloting powered vehicles"},
        "Boat" : {value: -10, description: "The general skill of piloting water vessels"},
        "Aircraft" : {value: -30, description: "The general skill of flying aircraft"},
        "Automobile" : {value: -5, description: "The general skill of driving cars"},
    },
    "Athletics" : {
        "General" : {value: 0, description: "The general skill of being physically fit"},
        "Jump" : {value: -5, description: "The general skill of jumping when it counts"},
        "Climb" : {value: -10, description: "The general skill of climbing things"},
        "Ride" : {value: -10, description: "The general skill of riding animals"},
        "Swim" : {value: -20, description: "The general skill of swimming"}
    },
    "History" : {
        "General" : {value: 0, description: "The general skill of knowing things"}
    }
};
 */

    //===========================================================

    /**
     * Soul Class constructor
     * @class  Onto.Soul
     * @classdesc Represents a soul in the Onto game system.
     * @param {object} data - The data that is going to be bound to this instance of Soul
     * @return {Onto.Soul}
     * @see Onto.Spirit
     */
    var Soul = new Class({
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

    //===========================================================

    /**
     * Body Class constructor
     * @class  Onto.Body
     * @abstract
     * @classdesc Represents a physical body in the Onto game system. *Must be overridden!*
     * @param {object} data - The data that is going to be bound to this instance of Body
     * @see Onto.Item
     * @see Onto.Being
     */
    var Body = new Class({
        isAbstract: true,
        init: function constructor(data) {
            var self = this;
            data = data || {};

            /**
             * @member {number} Size - The size of the physical body.
             * @instance
             * @readonly
             * @memberof Onto.Body
             */
            Class.define(self, 'Size', {
                get: function(){ throw new Error("Size must be overridden"); },
                enumerable: true,
                configurable: true
            });

            /**
             * @member {number} HitPoints - The number of points of the physical body before destruction or death.<br />Calculated by: _15 + Attributes.Strength + Attributes.Endurance * 2_
             * @instance
             * @readonly
             * @memberof Onto.Body
             */
            Class.define(self, 'HitPoints', {
                get: function(){ throw new Error("HitPoints must be overridden"); },
                enumerable: true,
                configurable: true
            });

            /**
             * @member {number} CurrentDamage - The number of points of damage that currently exist through wounds on the physical body.
             * @instance
             * @readonly
             * @memberof Onto.Body
             */
            Class.define(self, 'CurrentDamage', {
                get: function() {
                    var dmg = 0;
                    for (var loc in self.HitLocations) {
                        for (var i = 0; i < self.HitLocations[loc].Wounds.length; ++i) {
                            dmg += self.HitLocations[loc].Wounds[i].Value;
                        }
                    }
                    return dmg;
                },
                enumerable: true
            });

            /**
             * Sets a wound to a location on this physical body, taking into account location armor.
             * @function Damage
             * @instance
             * @param {Onto.Wound} wound - The wound to set on the location.
             * @param {string} location - The location to set the wound on.
             * @memberof Onto.Body
             */
            Class.define(self, 'Damage', {
                value: function(wound, location) {
                    var armor = null;
                    var origValue = wound.Value;
                    for (var itemName in self.Inventory[location]) {
                        if (!!self.Inventory[location][itemName] && !!self.Inventory[location][itemName].Armor) {
                            armor = self.Inventory[location][itemName].Armor;
                            Wound.Value -= (armor[wound.DamageType] || 0) * (armor.Value || 0);
                        }
                    }
                    if (wound.Value < 1) {
                        wound = null;
                    } else if (origValue / 2 > wound.Value) {
                        wound.DamageType = "Blunt";
                        wound.Shard = null;
                    }
                    if (!!wound) {
                        self.HitLocations[location].Wounds.push(wound);
                    }
                },
                enumerable: true
            });

            /**
             * Sets the hit location data on the physical body at init.
             * @function LoadBodyDefinition
             * @instance
             * @param {object} configuration - The object that defines the hit locations on this body.
             * @memberof Onto.Body
             */
            /* istanbul ignore next */
            Class.define(self, 'LoadBodyDefinition', Class(function(configuration){
                var lookupIndex = 0;
                var lastIndex = 0;
                for(var key in configuration.Locations) {
                    /*jshint -W083 */
                    (function(key){
                        var location = configuration.Locations[key];
                        self.HitLocations[key] = location;
                        self.Inventory[key] = location.InventorySlots;
                        for(; lookupIndex < (lastIndex + location.Percentage); ++lookupIndex) {
                            self.LocationLookup[lookupIndex.toString()] = key;
                        }
                        lastIndex = lookupIndex;
                    })(key);
                }
                // console.log(self.HitLocations);
            }));

            /**
             * @member {object} HitLocations - The container for all of the body's hit locations.
             * @instance
             * @memberof Onto.Body
             */
            Class.define(self, 'HitLocations', Class(data.HitLocations || {}).Enumerable());

            /**
             * @member {object} LocationLookup - A quick lookup object for hit locations by percentage group.
             * @instance
             * @memberof Onto.Body
             */
            /* istanbul ignore next */
            Class.define(self, 'LocationLookup', Class({}));

            /**
             * Looks up the hit location by a percentage-based index using {@link Onto.Body#LocationLookup}.
             * @function LookupLocation
             * @instance
             * @param {number} index - The percentage-based index that identifies the hit location.
             * @memberof Onto.Body
             */
            /* istanbul ignore next */
            Class.define(self, 'LookupLocation', Class(function(index) {
                var bodyLocation = self.LocationLookup[index.toString()];
                return self.HitLocations[bodyLocation];
            }));

            // self.LoadBodyDefinition({
            //     Locations : {
            //         Body: {
            //             "Health" : function() { return self.HitPoints(); },
            //             "Percentage" : 100,
            //             "InventorySlots" : {},
            //             "Wounds" : []
            //         }
            //     }
            // });
        }
    });


    Onto.addClass("Body", Body);


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
            /* istanbul ignore next */
            Class.define(self, 'Inventory', Class(data.Inventory).Enumerable().Writable());

            /**
             * @member {object} toJSON - Overridden toJSON method.
             * @instance
             * @memberof Onto.Being
             */
            /* istanbul ignore next */
            // Class.define(self, 'toJSON', Class(function() {
            //     return {
            //         Inventory : self.Inventory
            //     };
            // }));

            // self.LoadBodyDefinition({
            //     Locations : {
            //         Being: {
            //             "Health" : function() { return self.HitPoints(); },
            //             "Percentage" : 100,
            //             "InventorySlots" : {},
            //             "Wounds" : []
            //         }
            //     }
            // });
        }
    });


    Onto.addClass("Being", Being);


	//===========================================================

	/**
     * Humanoid Class constructor
     * @class  Onto.Humanoid
     * @classdesc Represents a humanoid in the Onto game system.
     * @param {string} name - The name of the humanoid
     * @param {object} data - The data that is going to be bound to this instance of Humanoid
     * @return {Onto.Humanoid}
     * @extends Onto.Being
     * @inheritdoc Onto.Being
     */
	var Humanoid = new Class({
		inherits: Onto.Being,
	    init: function constructor(name, data) {

	    	var self = this;
            data = data || {};

            data.Attributes = Onto._.extend(self.Attributes || {}, data.Attributes || {});

	        data.Specializations = data.Specializations || {};
	        data.HitLocations = data.HitLocations || {};
	        data.Inventory = data.Inventory || {};
	        data.Name = name;

	        constructor.super.call(self, data);

	        // Skills
	        /**
	         * @member {object} Skills - The base skills container of the humanoid
	         * @see {@link Onto.Humanoid#Skill|Skill}
	         * @instance
	         * @memberof Onto.Humanoid
	         * @property {number} Firearms - The skill of using weapons like pistols and rifles
	         * <br />_(Attributes.Agility + 10)_
	         *
	         * @property {number} Archery - The skill of using weapons like bows and crossbows
	         * <br />_(2 + Attributes.Agility * 2 + Attributes.Strength / 2)_
	         *
	         * @property {number} Explosives - The skill of using explosives like dynamite and grenades
	         * <br />_(2 + Attributes.Perception * 2 + Attributes.Luck / 2)_
	         *
	         * @property {number} Melee - The skill of using hand-to-hand combat with and without weapons
	         * <br />_(30 + 2 * Attributes.Agility + 2 * Attributes.Strength)_
	         *
	         * @property {number} Throwing - The skill of throwing things like grenades and spears
	         * <br />_(3 * Attributes.Agility + Attributes.Strength / 2)_
	         *
	         * @property {number} Lockpick - The skill of unlocking locks without keys
	         * <br />_(20 + Attributes.Perception / 2 + Attributes.Agility / 2)_
	         *
	         * @property {number} Mechanics - The skill of using and repairing mechanical devices
	         * <br />_(20 + Attributes.Intelligence)_
	         *
	         * @property {number} Medicine - The skill of using first aid and surgery
	         * <br />_(Attributes.Perception + Attributes.Intelligence * 2 + Attributes.Luck / 2)_
	         *
	         * @property {number} Science - The skill of using the scientific method and testing results
	         * <br />_(Attributes.Perception + Attributes.Intelligence * 2 + Attributes.Luck / 2)_
	         *
	         * @property {number} Craftsmanship - The skill of using the scientific method and testing results
	         * <br />_(Attributes.Intelligence / 2 + Attributes.Luck / 2 + Attributes.Perception / 2 + Attributes.Agility / 2)_
	         *
	         * @property {number} Stealth - The skill of sneaking
	         * <br />_(2 + Attributes.Agility * 2 + Attributes.Luck / 2)_
	         *
	         * @property {number} Survival - The skill of surviving in the outdoors
	         * <br />_(2 + Attributes.Endurance + Attributes.Intelligence + Attributes.Luck / 2)_
	         *
	         * @property {number} Gambling - The skill of betting money on games
	         * <br />_(2 + Attributes.Perception * 2 + Attributes.Luck / 2)_
	         *
	         * @property {number} Speech - The skill of getting your way in conversation
	         * <br />_(2 + Attributes.Charisma * 2 + Attributes.Luck / 2)_
	         *
	         * @property {number} Athletics - The skill of being physically fit
	         * <br />_(2 + Attributes.Agility + Attributes.Strength + Attributes.Endurance / 2)_
	         *
	         * @property {number} Piloting - The skill of driving vehicles
	         * <br />_(2 * Attributes.Agility + Attributes.Perception)_
	         *
	         * @property {number} History - The skill of knowing the past
	         * <br />_(2 + Attributes.Intelligence * 2 + Attributes.Perception / 2)_
	         */

	        Class.define(self, 'Skills', Class({}).Enumerable());

	        var skillBase = {
	        	'Firearms': function(){
	                return self.Attributes.Agility + 10;
	            },
	            'Archery': function(){
	                return 2 + (self.Attributes.Agility * 2) + (self.Attributes.Strength / 2);
	            },
	            'Explosives' : function(){
	                return 2 + (self.Attributes.Perception * 2) + (self.Attributes.Luck / 2);
	            },
	            'Melee' : function(){
	                return 30 + (2 * self.Attributes.Agility) + (2 * self.Attributes.Strength);
	            },
	            'Throwing' : function(){
	                return 3 * self.Attributes.Agility + self.Attributes.Strength / 2;
	            },
	            'Lockpick' : function(){
	                return 20 + (self.Attributes.Perception / 2) + (self.Attributes.Agility / 2);
	            },
	            'Mechanics' : function(){
	                return 20 + self.Attributes.Intelligence;
	            },
	            'Medicine' : function(){
	                return self.Attributes.Perception + (self.Attributes.Intelligence * 2) + (self.Attributes.Luck / 2);
	            },
	            'Science' : function(){
	                return self.Attributes.Perception + (self.Attributes.Intelligence * 2) + (self.Attributes.Luck / 2);
	            },
	            'Craftsmanship' : function(){
	                return (self.Attributes.Intelligence / 2) + (self.Attributes.Luck / 2) + (self.Attributes.Perception / 2) + (self.Attributes.Agility / 2);
	            },
	            'Stealth' : function(){
	                return 2 + (self.Attributes.Agility * 2) + (self.Attributes.Luck / 2);
	            },
	            'Survival' : function(){
	                return 2 + self.Attributes.Endurance + self.Attributes.Intelligence + (self.Attributes.Luck / 2);
	            },
	            'Gambling' : function(){
	                return 2 + (self.Attributes.Perception * 2) + (self.Attributes.Luck / 2);
	            },
	            'Speech' : function(){
	                return 2 + (self.Attributes.Charisma * 2) + (self.Attributes.Luck / 2);
	            },
	            'Athletics' : function(){
	                return 2 + self.Attributes.Agility + self.Attributes.Strength + (self.Attributes.Endurance / 2);
	            },
	            'Piloting' : function(){
	                return 2 * (self.Attributes.Agility + self.Attributes.Perception);
	            },
	            'History' : function(){
	                return 2 + (self.Attributes.Intelligence * 2) + (self.Attributes.Perception / 2);
	            }
	        };

	        for(var skillName in skillBase) {
	        	Class.define(self.Skills, skillName, {
		        	get : skillBase[skillName], enumerable: true
		        });
	        }



	        /**
	         * @member {object} Specializations - The extended skills container of the humanoid.  As skills are learned and go up in experience, these numbers will change.  See {@link Onto.Skill.Specializations.SpecializationCollection} for the default values.
	         *
	         * @see {@link Onto.Humanoid#Skill|Skill}
	         * @see {@link Onto.Skill.Specializations.loadDefaults}
	         * @instance
	         * @memberof Onto.Humanoid
	         */
	        var Specializations = Onto.Skill.Specializations.loadDefaults();
		    Class.define(self, "Specializations", Class(Specializations).Enumerable());


		    // Body definition

		    /**
		     * @member {object} HitLocations - The container for all of the body's hit locations.
             * @instance
             * @memberof Onto.Humanoid
             * @property {object} Head - The head.
             * @property {object} Head.DisplayName - "Head"
             * @property {object} Head.Health - The number of hitpoints at this location.<br />Calculated as: _Math.round(HitPoints / 5)_
             * @property {object} Head.Percentage - The percentage of the whole body this location takes.<br />_5_
             * @property {object} Head.InventorySlots - The inventory slots available in this location.
             * @property {object} Head.InventorySlots.Hat - The crown and top of the head.
             * @property {object} Head.InventorySlots.EyeWear - The top half of the face.
             * @property {object} Head.InventorySlots.EarWear - The sides of the head.
             * @property {object} Head.InventorySlots.MouthWear - The bottom half of the face.
             * @property {object} Head.InventorySlots.NeckWear - The neck.
             * @property {Array} Head.Wounds - The wounds at this location.
             * @property {object} RightArm - The right arm
             * @property {object} RightArm.DisplayName - "Right Arm"
             * @property {object} RightArm.Health - The number of hitpoints at this location.<br />Calculated as: _Math.round(HitPoints / 4)_
             * @property {object} RightArm.Percentage - The percentage of the whole body this location takes.<br />_10_
             * @property {object} RightArm.InventorySlots - The inventory slots available in this location.
             * @property {object} RightArm.InventorySlots.ShoulderWear - The shoulder and joint area.
             * @property {object} RightArm.InventorySlots.UpperMidWear - The top half of the arm.
             * @property {object} RightArm.InventorySlots.ElbowWear - The elbow.
             * @property {object} RightArm.InventorySlots.LowerMidWear - The bottom half of the arm.
             * @property {object} RightArm.InventorySlots.WristWear - The wrist.
             * @property {object} RightArm.InventorySlots.Gloves - The hands.
             * @property {Array} RightArm.Wounds - The wounds at this location.
             * @property {object} Chest
             * @property {object} Chest.DisplayName - "Chest"
             * @property {object} Chest.Health - The number of hitpoints at this location.<br />Calculated as: _Math.round(HitPoints / 2)_
             * @property {object} Chest.Percentage - The percentage of the whole body this location takes.<br />_25_
             * @property {object} Chest.InventorySlots - The inventory slots available in this location.
             * @property {object} Chest.InventorySlots.CollarWear - The collar and below the neck to the top of the chest muscles.
             * @property {object} Chest.InventorySlots.LeftBreastWear - The left breast.
             * @property {object} Chest.InventorySlots.RightBreastWear - The right breast.
             * @property {object} Chest.InventorySlots.BackWear - The back of the chest.
             * @property {Array} Chest.Wounds - The wounds at this location.
             * @property {object} Abdomen
             * @property {object} Abdomen.DisplayName - "Abdomen"
             * @property {object} Abdomen.Health - The number of hitpoints at this location.<br />Calculated as: _Math.round(HitPoints / 3)_
             * @property {object} Abdomen.Percentage - The percentage of the whole body this location takes.<br />_20_
             * @property {object} Abdomen.InventorySlots - The inventory slots available in this location.
             * @property {object} Abdomen.InventorySlots.PlexusWear - The solar plexus.
             * @property {object} Abdomen.InventorySlots.BellyWear - Above the waist.
             * @property {object} Abdomen.InventorySlots.Belt - The waist.
             * @property {object} Abdomen.InventorySlots.GroinWear - The groin area.
             * @property {Array} Abdomen.Wounds - The wounds at this location.
             * @property {object} LeftArm
             * @property {object} LeftArm.DisplayName - "Left Arm"
             * @property {object} LeftArm.Health - The number of hitpoints at this location.<br />Calculated as: _Math.round(HitPoints / 4)_
             * @property {object} LeftArm.Percentage - The percentage of the whole body this location takes.<br />_10_
             * @property {object} LeftArm.InventorySlots - The inventory slots available in this location.
             * @property {object} LeftArm.InventorySlots.ShoulderWear - The shoulder and joint area.
             * @property {object} LeftArm.InventorySlots.UpperMidWear - The top half of the arm.
             * @property {object} LeftArm.InventorySlots.ElbowWear - The elbow.
             * @property {object} LeftArm.InventorySlots.LowerMidWear - The bottom half of the arm.
             * @property {object} LeftArm.InventorySlots.WristWear - The wrist.
             * @property {object} LeftArm.InventorySlots.Gloves - The hands.
             * @property {object} RightLeg
             * @property {object} RightLeg.DisplayName - "Right Leg"
             * @property {object} RightLeg.Health - The number of hitpoints at this location.<br />Calculated as: _Math.round(HitPoints / 3)_
             * @property {object} RightLeg.Percentage - The percentage of the whole body this location takes.<br />_15_
             * @property {object} RightLeg.InventorySlots - The inventory slots available in this location.
             * @property {object} RightLeg.InventorySlots.HipWear - The hip and joint area.
             * @property {object} RightLeg.InventorySlots.UpperMidWear - The top half of the leg.
             * @property {object} RightLeg.InventorySlots.KneeWear - The knee.
             * @property {object} RightLeg.InventorySlots.LowerMidWear - The bottom half of the leg.
             * @property {object} RightLeg.InventorySlots.AnkleWear - The ankle.
             * @property {object} RightLeg.InventorySlots.Feet - The feet.
             * @property {object} LeftLeg
             * @property {object} LeftLeg.DisplayName - "Left Leg"
             * @property {object} LeftLeg.Health - The number of hitpoints at this location.<br />Calculated as: _Math.round(HitPoints / 3)_
             * @property {object} LeftLeg.Percentage - The percentage of the whole body this location takes.<br />_15_
             * @property {object} LeftLeg.InventorySlots - The inventory slots available in this location.
             * @property {object} LeftLeg.InventorySlots.HipWear - The hip and joint area.
             * @property {object} LeftLeg.InventorySlots.UpperMidWear - The top half of the leg.
             * @property {object} LeftLeg.InventorySlots.KneeWear - The knee.
             * @property {object} LeftLeg.InventorySlots.LowerMidWear - The bottom half of the leg.
             * @property {object} LeftLeg.InventorySlots.AnkleWear - The ankle.
             * @property {object} LeftLeg.InventorySlots.Feet - The feet.
		     */
		    /* istanbul ignore next */
	        self.LoadBodyDefinition({
                Locations : {
                    "Head" : {
                    	"DisplayName" : "Head",
			            "Health" : null,
			            "Percentage" : 5,
			            "InventorySlots" : {
			                "Hat" : null,
			                "EyeWear" : null,
			                "EarWear" : null,
			                "MouthWear" : null,
			                "NeckWear" : null
			            },
			            "Wounds" : []
			        },
			        "RightArm" : {
			        	"DisplayName" : "Right Arm",
			            "Health" : null,
			            "Percentage" : 10,
			            "InventorySlots" : {
			                "ShoulderWear" : null,
			                "UpperMidWear" : null,
			                "ElbowWear" : null,
			                "LowerMidWear" : null,
			                "WristWear" : null,
			                "Gloves" : null
			            },
			            "Wounds" : []
			        },
			        "Chest" : {
			        	"DisplayName" : "Chest",
			            "Health" : null,
			            "Percentage" : 25,
			            "InventorySlots" : {
			                "CollarWear" : null,
			                "LeftBreastWear" : null,
			                "RightBreastWear" : null,
			                "BackWear" : null
			            },
			            "Wounds" : []
			        },
			        "LeftArm" : {
			        	"DisplayName" : "Left Arm",
			            "Health" : null,
			            "Percentage" : 10,
			            "InventorySlots" : {
			                "ShoulderWear" : null,
			                "UpperMidWear" : null,
			                "ElbowWear" : null,
			                "LowerMidWear" : null,
			                "WristWear" : null,
			                "Gloves" : null
			            },
			            "Wounds" : []
			        },
			        "Abdomen" : {
			        	"DisplayName" : "Abdomen",
			            "Health" : null,
			            "Percentage" : 20,
			            "InventorySlots" : {
			                "PlexusWear" : null,
			                "BellyWear" : null,
			                "Belt" : null,
			                "GroinWear" : null
			            },
			            "Wounds" : []
			        },
			        "RightLeg" : {
			        	"DisplayName" : "Right Leg",
			            "Health" : null,
			            "Percentage" : 15,
			            "InventorySlots" : {
			                "HipWear" : null,
			                "UpperMidWear" : null,
			                "KneeWear" : null,
			                "LowerMidWear" : null,
			                "AnkleWear" : null,
			                "Feet" : null
			            },
			            "Wounds" : []
			        },
			        "LeftLeg" : {
			        	"DisplayName" : "Left Leg",
			            "Health" : null,
			            "Percentage" : 15,
			            "InventorySlots" : {
			                "HipWear" : null,
			                "UpperMidWear" : null,
			                "KneeWear" : null,
			                "LowerMidWear" : null,
			                "AnkleWear" : null,
			                "Feet" : null
			            },
			            "Wounds" : []
			        }
                }
            });

			/* istanbul ignore next */
			Class.define(self.HitLocations.Head, "Health", {
				get: function() { return Math.round(self.HitPoints / 5); }
			});

			/* istanbul ignore next */
			Class.define(self.HitLocations.RightArm, "Health", {
				get: function() { return Math.round(self.HitPoints / 4); }
			});

			/* istanbul ignore next */
			Class.define(self.HitLocations.Chest, "Health", {
				get: function() { return Math.round(self.HitPoints / 2); }
			});

			/* istanbul ignore next */
			Class.define(self.HitLocations.LeftArm, "Health", {
				get: function() { return Math.round(self.HitPoints / 4); }
			});

			/* istanbul ignore next */
			Class.define(self.HitLocations.Abdomen, "Health", {
				get: function() { return Math.round(self.HitPoints / 3); }
			});

			/* istanbul ignore next */
			Class.define(self.HitLocations.RightLeg, "Health", {
				get: function() { return Math.round(self.HitPoints / 3); }
			});

			/* istanbul ignore next */
			Class.define(self.HitLocations.LeftLeg, "Health", {
				get: function() { return Math.round(self.HitPoints / 3); }
			});

	        // this.Inventory = Onto._.extend(this.Inventory || {}, data.Inventory);
	    },

	    Age : 0,
	    Gender : '',
	    Name : '',

	    CurrentDamage : null,
	    Damage : null,
	    Size : null,
	    HitPoints : null,

	    MovementSpeed : null,
	    AttackSpeed : null,

	    MaxCarryWeight : null,

	    /**
	     * The getter for all {@link Onto.Humanoid#Skills|Skills} that exist on the humanoid instance, which calculates the base skill with the appropriate {@link Onto.Humanoid#Specializations|Specializations}.
	     * @function Skill
	     * @see {@link Onto.Humanoid#Skills|Skills}
         * @instance
         * @memberof Onto.Humanoid
         * @example
         * var skillValue = humanInstance.Skill("Firearms.Pistol");
         */
	    Skill : function(namepath) {
	        var self = this;
	        var split = namepath.split('.');
	        var skillName = split[0];
	        var baseSkill = self.Skills[skillName];
	        var ret = 0;
	        ret += baseSkill;      //Base
	        if (split.length > 1) {
	            var currPath = [skillName];
	            for(var i = 1; i < split.length; ++i) {
	                var breakLoop = false;
	                var currSpec = self.Specializations[currPath.join(".")];
	                if (!!currSpec) {
	                	ret += currSpec.value;
	                	currPath.push(split[i]);
	                } else {
	                    breakLoop = true;
	                }
	                if (breakLoop) {
	                    break;
	                }
	            }
	        }
	        return ret;
	    },
	    Skills : {},
	    Specializations: {}
	});


	Onto.addClass("Humanoid", Humanoid);

	//===========================================================

	var Difficulty = {
	    Easy: {
	        MaxAttributePoints: 100,
	        StartingSkillPoints: 200
	    },
	    Normal: {
	        MaxAttributePoints: 90,
	        StartingSkillPoints: 150
	    },
	    Hard: {
	        MaxAttributePoints: 80,
	        StartingSkillPoints: 100
	    }
	};

	//===========================================================

	var CharacterManager = new Class({

	    init: function() {
	        var self = this;

	        this.Characters = function() {
	            var characters = Storage.getCharacters();
	            for(var i = 0; i < characters.length; ++i) {
	                var data = characters[i];
	                var character = new Character(data.Name, data);
	                // var skills = character.Skills
	                // character.bind(data)
	                // character.Skills = skills
	                for(var j = 0; j < character.SaveGames.length; ++j) {
	                    var saveData = character.SaveGames[j];
	                    var saveSession = new GameSession(character);
	                    saveSession.bind(saveData);
	                    character.SaveGames[j] = saveSession;
	                }
	                characters[i] = character;
	            }

	            return characters;
	        };

	        this.Character = Character;
	        this.GameSession = GameSession;

	        this.save = function() {
	            var characters = this.Characters();
	            for(var i = 0; i < characters.length; ++i) {
	                characters[i].save();
	            }
	        };

	        this.saveCharacters = function(characters) {
	            Storage.saveCharacters(characters);
	        };

	        this.removeCharacter = function(index) {
	        	var characters = [];
	            switch(typeof index) {
	                case 'number' : //array index
	                    characters = this.Characters();
	                    if (index < characters.length) {
	                        self.removeCharacter(characters[index].GUID);
	                    }
	                    break;
	                case 'string' : //GUID
	                    characters = this.Characters();
	                    for(var i = 0; i < characters.length; ++i) {
	                        if (characters[i].GUID == index) {
	                            var character = characters[i];
	                            if (character) {
	                                Storage.removeCharacter(character.GUID);
	                                characters.splice(i, 1);
	                                Storage.saveCharacters(characters);
	                                break;
	                            }
	                        }
	                    }
	                    break;
	                case 'object' : //Character object
	                    self.removeCharacter(index.GUID);
	                    break;
	            }
	        };

	        this.reset = function() {
	            resetAll();
	        };

	        this.getSaveGame = Storage.getSaveGame;
	    }
	});

	Onto.addClass("CharacterManager", CharacterManager);

	//===========================================================

	var GameSession = function(character) {
	    this.Character = character;
	    this.GUID = Utility.GUID();
	    this.DateCreated = new Date().getTime();
	    this.DateModified = null;
	    this.bind = Utility.bind;

	    this.update = function() {
	        this.Character.save();
	        this.DateModified = new Date().getTime();
	        Storage.saveGame(this);
	    };

	    this.saveNew = function() {
	        var newSession = new GameSession(this.Character);
	        newSession.bind(JSON.parse(JSON.stringify(this)));
	        newSession.update();
	    };
	};

	Onto.addClass("GameSession", GameSession);

	return Onto;

}));
