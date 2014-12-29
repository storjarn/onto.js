
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

