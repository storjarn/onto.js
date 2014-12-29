
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
