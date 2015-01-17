
    //===========================================================
    (function(){

        /**
         * Game Class constructor
         * @class Onto.Game
         * @classdesc Represents the game class in the Onto game system
         * @param {object} data - The data that is going to be bound to this instance of Game
         * @extends Onto.Base
         * @inheritdoc Onto.Base
         * @return {Onto.Game}
         */
        var Game = new Class({
            inherits: Onto.Base,
            init: function constructor(data) {
                var self = this;
                data = data || {};

                constructor.super.call(self, data);
                data = this.parse(data);
                // console.log(data);
                Onto._.extend(self, data);

                //TODO:: populate game data on this instance
            },
            toJSON: Class(function toJSON() {
                var ret = toJSON.super.call(this);
                ret = Onto._.extend(ret, this);
                return ret;
            })
        });

        Onto.addClass("Game", Game);

    })();

