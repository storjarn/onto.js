
    //===========================================================
    (function() {

        /**
         * Specialization Class constructor
         * @class  Onto.Skill.Specialization
         * @classdesc Represents an skill specialization in the Onto game system
         * @param {object} data - The data that is going to be bound to this instance of Specialization
         * @return {Onto.Skill.Specialization}
         * @extends {Onto.Base}
         * @inheritdoc Onto.Base
         * @see Onto.Skill
         * @see Onto.Skill.Specializations
         */
        var Specialization = new Class({
            inherits: Onto.Base,
            init: function(namePath, value, description, useCount) {
                var self = this;
                var _value = value;
                useCount = useCount || 0;
                var namePathSplitRev = namePath.split(".").reverse();
                Class.define(self, "namePath", Class(namePath).Enumerable());
                Class.define(self, "value", { get: function(){ return _value; }, enumerable: true});
                Class.define(self, "valueOf", Class(function(){ return _value; }));
                Class.define(self, "useCount", Class(useCount).Enumerable().Writable());
                Class.define(
                    self,
                    "description",
                    Class(description || "The general skill of " + namePathSplitRev.join(' ').toLowerCase()).Enumerable()
                );

                Class.define(self, "increment", Class(function(){ ++_value; }));
            }
        });

        Onto.Skill.addClass("Specialization", Specialization);

    })();
