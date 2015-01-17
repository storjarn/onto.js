
    //===========================================================
    (function() {

        /**
         * Inventory Class constructor
         * @class  Onto.Inventory
         * @classdesc Represents an inventory in the Onto game system.  An inventory is a collection of {@link Onto.Item|Items}
         * @param {object} data - The data that is going to be bound to this instance of Inventory
         * @return {Onto.Inventory}
         * @extends {Onto.ContainerItem}
         * @inheritdoc Onto.ContainerItem
         */
        var Inventory = new Class({
            inherits: Onto.ContainerItem,
            init: function constructor(data) {
                var self = this;
                data = data || {};
                constructor.super.call(self, data);
                data = self.parse(data);
            }
        });

        Onto.addClass("Inventory", Inventory);

    })();
