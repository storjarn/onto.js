
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
