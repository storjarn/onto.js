
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
