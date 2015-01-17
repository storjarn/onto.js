
    //===========================================================
    (function(){

        /**
         * Human Race Class constructor
         * @class  Onto.Races.Human
         * @classdesc Represents the human species in the Onto game system
         * @param {object} data - The data that is going to be bound to this instance of Human
         * @return {Onto.Races.Human}
         * @extends {Onto.Humanoid}
         * @inheritdoc Onto.Humanoid
         */
        var Human = new Class({
            inherits: Onto.Humanoid,
            init: function constructor(data) {
                var self = this;
                data = data || {};
                data.Attributes = Onto._.extend(self.Attributes || {}, data.Attributes || {
                    Strength        : 9, // Onto.Dice.roll(3, 6).value,
                    Perception      : 9, // Onto.Dice.roll(3, 6).value,
                    Endurance       : 9, // Onto.Dice.roll(3, 6).value,
                    Charisma        : 9, // Onto.Dice.roll(3, 6).value,
                    Intelligence    : 9, // Onto.Dice.roll(3, 6).value,
                    Agility         : 9, // Onto.Dice.roll(3, 6).value,
                    Luck            : 9, // Onto.Dice.roll(3, 6).value
                });
                constructor.super.call(self, data);
            }
        });

        Onto.Races.addClass("Human", Human);

    })();

