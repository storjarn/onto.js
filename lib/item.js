
    //===========================================================
    (function(){

        /**
         * Item Class constructor
         * @class  Onto.Item
         * @classdesc Represents an item in the Onto game system
         * @param {object} data - The data that is going to be bound to this instance of Item
         * @return {Onto.Item}
         * @extends {Onto.Body}
         * @inheritdoc Onto.Body
         */
        var Item = new Class({
            inherits: Onto.Body,
            isAbstract: true,
            init: function constructor(data) {
                var self = this;
                data = data || {};
                constructor.super.call(self, data);

                /**
                 * @member {number} Size - The size of the item.
                 * @instance
                 * @readonly
                 * @memberof Onto.Item
                 */
                Class.define(self, 'Size', Class(data.Size).Enumerable().Writable());

                /**
                 * @member {number} HitPoints - The number of points of the item before destruction or death.
                 * @instance
                 * @readonly
                 * @memberof Onto.Item
                 */
                Class.define(self, 'HitPoints', Class(data.HitPoints).Enumerable().Writable());
            }
        });

        Onto.addClass("Item", Item);

    })();
