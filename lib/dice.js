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
