/* jshint newcap: false */
;(function (root, factory) {
    'use strict';
    var assert;

    if (typeof define === 'function' && define.amd) {
        define(['../dist/onto'], factory);
    } else if (typeof exports === 'object') {
        (function(){
            assert    = require('assert');
            factory(require('../dist/onto'), assert);
        })();
    } else {
        factory(root.Onto, assert);
    }
}(this, function (Onto, assert) {
    'use strict';

    assert = !!assert ? assert : false;

    describe('[Onto] The Onto namespace', function() {
        it('should exist', function(){
            if (assert) {
                assert.ok(typeof Onto == 'object');
            } else {
                expect(typeof Onto == 'object').toBeTruthy();
            }
        });

        it('should have certain properties', function(){
            if (assert) {
                assert.ok(Onto.Class);
                assert.ok(Onto.EventEmitter);
                assert.ok(Onto.Namespace);
                assert.ok(Onto.ReferenceObject);
                assert.ok(Onto._);
            } else {
                expect(Onto.Class).toBeTruthy();
                expect(Onto.EventEmitter).toBeTruthy();
                expect(Onto.Namespace).toBeTruthy();
                expect(Onto.ReferenceObject).toBeTruthy();
                expect(Onto._).toBeTruthy();
            }
        });
    });

    describe('[Onto.Dice] The Onto.Dice namespace', function() {

        it('should be able to run tests', function(){
            if (assert) {
                assert.ok(function(){
                    Onto.Dice.test([
                        [1, 6, 0],
                        [3, 6, 3]
                    ]);
                    return true;
                }());
            } else {
                expect(function(){
                    Onto.Dice.test([
                        [1, 6, 0],
                        [3, 6, 3]
                    ]);
                    return true;
                }()).toBeTruthy();
            }
        });

        it('should throw an error about the usage when running a test', function(){
            if (assert) {
                assert.throws(
                  function() {
                    Onto.Dice.test([
                        [1, 6],
                        [3, 6, 3, 9]
                    ]);
                  },
                  /usage: pass an array with subarrays, each containing the number of dice, type of dice, and modifier like so/
                );
            } else {
                expect(function() {
                    Onto.Dice.test([
                        [1, 6],
                        [3, 6, 3, 9]
                    ]);
                }).toThrow(new Error("test() usage: pass an array with subarrays, each containing the number of dice, type of dice, and modifier like so: [[3, 6, 0], [1, 10, 2]]"));
            }
        });

        it('should be able to generate a random float between 1 and 10 using the random() function', function(){
            function isFloat(n) {
                return n === +n && n !== (n|0);
            }

            var result = Onto.Dice.random(1, 10, false)();
            var results = [];
            results.push(result);

            if (assert) {
                assert.ok(result < 11 && result > 0);
                assert.ok(isFloat(result));
            } else {
                expect(result < 11 && result > 0).toBeTruthy();
                expect(isFloat(result)).toBeTruthy();
            }
            // console.log(results.toString());
        });

        it('should be able to generate a random number using the defaults', function(){
            var result = Onto.Dice.roll();
            var results = [];
            results.push(result);

            if (assert) {
                assert.ok(result.value < (Onto.Dice.defaults.typeOfDie + 1) && result.value > (Onto.Dice.defaults.numberOfDie - 1));
            } else {
                expect(result.value < (Onto.Dice.defaults.typeOfDie + 1) && result.value > (Onto.Dice.defaults.numberOfDie - 1)).toBeTruthy();
            }
            // console.log(results.toString());
        });

        it('should be able to get a string representation of a random number', function(){
            var result = Onto.Dice.roll(1, 10);
            var results = [];
            results.push(result);

            if (assert) {
                assert.ok((result.value + '') == result.toString());
            } else {
                expect((result.value + '') == result.toString()).toBeTruthy();
            }
            // console.log(results.toString());
        });

        it('should be able to get a valueOf representation of a random number', function(){
            var result = Onto.Dice.roll(1, 10);
            var results = [];
            results.push(result);

            if (assert) {
                assert.ok((result + 1) == (result.value + 1));
            } else {
                expect((result + 1) == (result.value + 1)).toBeTruthy();
            }
            // console.log(results.toString());
        });

        it('should be able to generate a random number between 1 and 10 100 times in a row', function(){
            var results = [];

            for(var i = 0; i < 100; ++i) {
                var result = Onto.Dice.roll(1, 10);
                results.push(result.value);

                if (assert) {
                    assert.ok(result.value < 11 && result.value > 0);
                } else {
                    expect(result.value < 11 && result.value > 0).toBeTruthy();
                }
            }
            // console.log(results.toString());
        });

        it('should be able to generate a random number between 9 and 24 100 times in a row', function(){
            var results = [];

            for(var i = 0; i < 100; ++i) {
                var result = Onto.Dice.roll(3, 6, 6);
                results.push(result.value);

                if (assert) {
                    assert.ok(result.value < 25 && result.value > 8);
                } else {
                    expect(result.value < 25 && result.value > 8).toBeTruthy();
                }
            }
            // console.log(results.toString());
        });

        it('should be able to generate a random number between 1 and 100 100 times in a row using the d property', function(){
            var results = [];

            for(var i = 0; i < 100; ++i) {
                var result = Onto.Dice.d(100);
                results.push(result.value);

                if (assert) {
                    assert.ok(result.value < 101 && result.value > 0);
                } else {
                    expect(result.value < 101 && result.value > 0).toBeTruthy();
                }
            }
            // console.log(results.toString());
        });

        it('should be able to generate a random number generator that can generate a number between 9 and 24 100 times in a row', function(){
            var results = [];
            var randomizer = Onto.Dice.createRoll(3, 6, 6);

            for(var i = 0; i < 100; ++i) {
                var result = randomizer();
                results.push(result.value);

                if (assert) {
                    assert.ok(result.value < 25 && result.value > 8);
                } else {
                    expect(result.value < 25 && result.value > 8).toBeTruthy();
                }
            }
            // console.log(results.toString());
        });

        it('should be able to generate a random number generator that can generate a number between the defaults 100 times in a row', function(){
            var results = [];
            var randomizer = Onto.Dice.createRoll();

            for(var i = 0; i < 100; ++i) {
                var result = randomizer();
                results.push(result.value);

                if (assert) {
                    assert.ok(result.value < (Onto.Dice.defaults.typeOfDie + 1) && result.value > (Onto.Dice.defaults.numberOfDie - 1));
                } else {
                    expect(result.value < (Onto.Dice.defaults.typeOfDie + 1) && result.value > (Onto.Dice.defaults.numberOfDie - 1)).toBeTruthy();
                }
            }
            // console.log(results.toString());
        });

        it('should be able to parse a die string and generate a number between 10 and 100 100 times in a row', function(){
            var dieString = "10d10";
            var results = [];

            for(var i = 0; i < 100; ++i) {
                var result = Onto.Dice.parseString(dieString);
                results.push(result.value);

                if (assert) {
                    assert.ok(result.value < 101 && result.value > 9);
                } else {
                    expect(result.value < 101 && result.value > 9).toBeTruthy();
                }
            }
            // console.log(results.toString());
        });

        it('should be able to parse a die string and generate a number between 11 and 101 100 times in a row', function(){
            var dieString = "10d10m1";
            var results = [];

            for(var i = 0; i < 100; ++i) {
                var result = Onto.Dice.parseString(dieString);
                results.push(result.value);

                if (assert) {
                    assert.ok(result.value < 102 && result.value > 10);
                } else {
                    expect(result.value < 102 && result.value > 10).toBeTruthy();
                }
            }
            // console.log(results.toString());
        });

        it('should throw an error about the usage when parsing a die string', function(){
            var dieString = "6";

            if (assert) {
                assert.throws(
                  function() {
                    var result = Onto.Dice.parseString(dieString);
                  },
                  /usage: pass the number of dice, type of dice, and modifier like so/
                );
            } else {
                expect(function() {
                    var result = Onto.Dice.parseString(dieString);
                }).toThrow(new Error("parseString() usage: pass the number of dice, type of dice, and modifier like so: 2d6m-8\nexample: parseString('2d6m-8') or parseString('3d6')"));
            }
        });

        it('should throw an error about the number of dice not being a number when parsing a die string', function(){
            var dieString = "xd10";

            if (assert) {
                assert.throws(
                  function() {
                    var result = Onto.Dice.parseString(dieString);
                  },
                  /number of dice is not a number/
                );
            } else {
                expect(function() {
                    var result = Onto.Dice.parseString(dieString);
                }).toThrow(new Error("The number of dice is not a number!"));
            }
        });

        it('should throw an error about the type of dice not being a number when parsing a die string', function(){
            var dieString = "10dx";

            if (assert) {
                assert.throws(
                  function() {
                    var result = Onto.Dice.parseString(dieString);
                  },
                  /type of dice is not a number/
                );
            } else {
                expect(function() {
                    var result = Onto.Dice.parseString(dieString);
                }).toThrow(new Error("The type of dice is not a number!"));
            }
        });

        it('should throw an error about the modifier not being a number when parsing a die string', function(){
            var dieString = "10d10mx";

            if (assert) {
                assert.throws(
                  function() {
                    var result = Onto.Dice.parseString(dieString);
                  },
                  /modifier is not a number/
                );
            } else {
                expect(function() {
                    var result = Onto.Dice.parseString(dieString);
                }).toThrow(new Error("The modifier is not a number!"));
            }
        });
    });

    describe('[Onto.Soul] A Soul', function() {
        var instance;

        beforeEach(function(){
            instance = new Onto.Soul();
        });

        afterEach(function(){
            instance = null;
        });

        it('should have two Attributes, Perception and Luck, both at the default 9', function(){
            if (assert) {
                assert.equal(instance.Attributes.Perception, 9);
                assert.equal(instance.Attributes.Luck, 9);
            } else {
                expect(instance.Attributes.Perception).toBe(9);
                expect(instance.Attributes.Luck).toBe(9);
            }
        });

        it('should have a Power of 18 with a default on all Attributes', function(){
            if (assert) {
                assert.equal(instance.Power, 18);
            } else {
                expect(instance.Power).toBe(18);
            }
        });
    });

    describe('[Onto.Spirit] A Spirit', function() {
        var instance;

        beforeEach(function(){
            instance = new Onto.Spirit({Attributes: {Intelligence: 15}});
        });

        afterEach(function(){
            instance = null;
        });

        it('should have two Attributes, Intelligence at 15, and Charisma at the default 9', function(){
            if (assert) {
                assert.equal(instance.Attributes.Charisma, 9);
                assert.equal(instance.Attributes.Intelligence, 15);
            } else {
                expect(instance.Attributes.Charisma).toBe(9);
                expect(instance.Attributes.Intelligence).toBe(15);
            }
        });

        it('should have a Chi of 21 with an Intelligence of 15 and default on other Attributes', function(){
            if (assert) {
                assert.equal(instance.Chi, 21);
            } else {
                expect(instance.Chi).toBe(21);
            }
        });
    });

    describe('[Onto.Body] A Body', function() {
        var instance;

        it('should throw an error about instantiating an abstract class when instantiating with the new keyword', function(){

            if (assert) {
                assert.throws(
                  function() {
                    instance = new Onto.Body({Attributes: {Strength: 15}});
                  },
                  /instantiate abstract class/
                );
            } else {
                expect(function() {
                    instance = new Onto.Body({Attributes: {Strength: 15}});
                }).toThrow(new Error("Can't instantiate abstract class!"));
            }
        });
    });

    // describe('[Onto.Being] A Being', function() {
    //     var instance;
    //     var skills = {"Firearms":19,"Archery":27.5,"Explosives":24.5,"Melee":78,"Throwing":34.5,"Lockpick":29,"Mechanics":29,"Medicine":31.5,"Science":31.5,"Craftsmanship":18,"Stealth":24.5,"Survival":24.5,"Gambling":24.5,"Speech":24.5,"Athletics":30.5,"Piloting":36,"History":24.5};

    //     beforeEach(function(){
    //         instance = new Onto.Being({
    //             Name: "Dude Man",
    //             Age: 10,
    //             Attributes: {
    //                 Strength: 15
    //             },
    //             HitLocations : {
    //                 Head : {
    //                     Hat: {
    //                         Armor: {
    //                             Value: 5,
    //                             Pierce: 1
    //                         }
    //                     }
    //                 }
    //             }
    //         });
    //         // instance.HitLocations.Head.InventorySlots.Hat = instance.Inventory.Head.Hat;
    //     });

    //     afterEach(function(){
    //         instance = null;
    //     });

    //     it('should be able to create a simple character', function(){
    //         if (assert) {
    //             assert.ok(instance instanceof Onto.Being);
    //             assert.ok(!(instance instanceof Date));
    //         } else {
    //             expect(instance instanceof Onto.Being).toBeTruthy();
    //             expect(instance instanceof Date).toBeFalsy();
    //         }
    //     });
    // });

    describe('[Onto.Humanoid] A Humanoid', function() {
        var instance;
        var skills = {"Firearms":19,"Archery":27.5,"Explosives":24.5,"Melee":78,"Throwing":34.5,"Lockpick":29,"Mechanics":29,"Medicine":31.5,"Science":31.5,"Craftsmanship":18,"Stealth":24.5,"Survival":24.5,"Gambling":24.5,"Speech":24.5,"Athletics":30.5,"Piloting":36,"History":24.5};

        beforeEach(function(){
            instance = new Onto.Humanoid("Dude Man", {
                Age: 10,
                Attributes: {
                    Strength: 15
                },
                HitLocations : {
                    Head : {
                        Hat: {
                            Armor: {
                                Value: 5,
                                Pierce: 1
                            }
                        }
                    }
                }
            });
            // instance.HitLocations.Head.InventorySlots.Hat = instance.Inventory.Head.Hat;
        });

        afterEach(function(){
            instance = null;
        });

        it('should be able to create a simple character', function(){
            if (assert) {
                assert.ok(instance instanceof Onto.Humanoid);
                assert.ok(!(instance instanceof Date));
            } else {
                expect(instance instanceof Onto.Humanoid).toBeTruthy();
                expect(instance instanceof Date).toBeFalsy();
            }
        });

        it('should have the age of 10', function(){
            if (assert) {
                assert.equal(instance.Age, 10);
            } else {
                expect(instance.Age).toBe(10);
            }
        });

        it('should have the name of "Dude Man"', function(){
            if (assert) {
                assert.equal(instance.Name, "Dude Man");
            } else {
                expect(instance.Name).toBe("Dude Man");
            }
        });

        it('should have the gender of "Male"', function(){
            if (assert) {
                assert.equal(instance.Gender, "Male");
            } else {
                expect(instance.Gender).toBe("Male");
            }
        });

        it('should have the Attribute Strength at 15, and Endurance and Agility at the default 9', function(){
            if (assert) {
                assert.equal(instance.Attributes.Endurance, 9);
                assert.equal(instance.Attributes.Agility, 9);
                assert.equal(instance.Attributes.Strength, 15);
            } else {
                expect(instance.Attributes.Endurance).toBe(9);
                expect(instance.Attributes.Agility).toBe(9);
                expect(instance.Attributes.Strength).toBe(15);
            }
        });

        it('should have a Size of 12 with a Strength of 15 and default on Endurance', function(){
            if (assert) {
                assert.equal(instance.Size, 12);
            } else {
                expect(instance.Size).toBe(12);
            }
        });

        it('should have head health of 1/5 of total health', function(){
            if (assert) {
                assert.equal(instance.HitLocations.Head.Health, Math.round(instance.HitPoints / 5));
            } else {
                expect(instance.HitLocations.Head.Health).toBe(Math.round(instance.HitPoints / 5));
            }
        });

        it('should have arm health of 1/4 of total health', function(){
            if (assert) {
                assert.equal(instance.HitLocations.RightArm.Health, Math.round(instance.HitPoints / 4));
                assert.equal(instance.HitLocations.LeftArm.Health, Math.round(instance.HitPoints / 4));
            } else {
                expect(instance.HitLocations.RightArm.Health).toBe(Math.round(instance.HitPoints / 4));
                expect(instance.HitLocations.LeftArm.Health).toBe(Math.round(instance.HitPoints / 4));
            }
        });

        it('should have chest health of 1/2 of total health', function(){
            if (assert) {
                assert.equal(instance.HitLocations.Chest.Health, Math.round(instance.HitPoints / 2));
            } else {
                expect(instance.HitLocations.Chest.Health).toBe(Math.round(instance.HitPoints / 2));
            }
        });

        it('should have abdomen health of 1/3 of total health', function(){
            if (assert) {
                assert.equal(instance.HitLocations.Abdomen.Health, Math.round(instance.HitPoints / 3));
            } else {
                expect(instance.HitLocations.Abdomen.Health).toBe(Math.round(instance.HitPoints / 3));
            }
        });

        it('should have leg health of 1/3 of total health', function(){
            if (assert) {
                assert.equal(instance.HitLocations.RightLeg.Health, Math.round(instance.HitPoints / 3));
                assert.equal(instance.HitLocations.LeftLeg.Health, Math.round(instance.HitPoints / 3));
            } else {
                expect(instance.HitLocations.RightLeg.Health).toBe(Math.round(instance.HitPoints / 3));
                expect(instance.HitLocations.LeftLeg.Health).toBe(Math.round(instance.HitPoints / 3));
            }
        });

        it('should have a size of 12', function(){
            if (assert) {
                assert.equal(instance.Size, 12);
            } else {
                expect(instance.Size).toBe(12);
            }
        });

        it('should have a Movement Speed of 10', function(){
            if (assert) {
                assert.equal(instance.MovementSpeed, 10);
            } else {
                expect(instance.MovementSpeed).toBe(10);
            }
        });

        it('should have a Attack Speed of 11', function(){
            if (assert) {
                assert.equal(instance.AttackSpeed, 11);
            } else {
                expect(instance.AttackSpeed).toBe(11);
            }
        });

        it('should have a Max Carry Weight of 180', function(){
            if (assert) {
                assert.equal(instance.MaxCarryWeight, 180);
            } else {
                expect(instance.MaxCarryWeight).toBe(180);
            }
        });

        it('should have a chi of 18', function(){
            if (assert) {
                assert.equal(instance.Chi, 18);
            } else {
                expect(instance.Chi).toBe(18);
            }
        });

        it('should have a current damage of 8', function(){
            instance.Damage({DamageType: "Pierce", Value: 8}, "RightArm");

            if (assert) {
                assert.equal(instance.CurrentDamage, 8);
            } else {
                expect(instance.CurrentDamage).toBe(8);
            }
        });

        // it('should have a current damage of 3', function(){
        //     instance.Damage({DamageType: "Pierce", Value: 8}, "Head");

        //     if (assert) {
        //         assert.equal(instance.CurrentDamage, 3);
        //     } else {
        //         expect(instance.CurrentDamage).toBe(3);
        //     }
        // });

        describe('should have the expected skills', function(){
            for(var skillName in skills) {
                /*jshint -W083 */
                it('should have a '+skillName+' skill of of ' + skills[skillName], function(){
                    if (assert) {
                        assert.equal(instance.Skill(skillName), skills[skillName]);
                    } else {
                        expect(instance.Skill(skillName)).toBe(skills[skillName]);
                    }
                });
            }
        });

        it('should show whatever I want', function(){
            var skills = {};
            for(var skillName in instance.Skills) {
                skills[skillName] = instance.Skill(skillName);
            }
            // console.log(JSON.stringify(skills));

            // console.log(JSON.stringify(instance));

            if (assert) {
                assert.ok(true);
            } else {
                expect(true).toBeTruthy();
            }
        });
    });

}));

