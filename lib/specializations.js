    //===========================================================

    /**
     * @namespace  Onto.Skill.Specializations
     * @see Onto.Skill.Specialization
     */


    (function() {

        var specialization = {
            /**
             * @function loadDefaults
             * @memberOf Onto.Skill.Specializations
             * @return {Onto.Skill.Specializations.SpecializationCollection} - The default skill specializations named by their name path, ex. "Firearms.Pistol"
             * @see Onto.Humanoid#Specializations
             * @example
var specializations = Onto.Skill.Specializations.loadDefaults();
var rifleSpecVal = specializations["Firearms.Rifle"];
             */
            loadDefaults: function() {

                /**
                 * Collection of {@link Onto.Skill.Specialization|specializations}.  These are accessed by their name path, ex. `"Firearms.Pistol"`.  See the defaults below.
                 * @typedef Onto.Skill.Specializations.SpecializationCollection
                 * @type {object}
                 * @memberof Onto.Skill.Specializations
                 *
                 * @property {Onto.Skill.Specialization} Firearms - The general skill of using all firearm weapons
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Firearms.Pistol - The general skill of using all pistols
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Firearms.Pistol.Pipe - The general skill of using all makeshift pistols
                 * <br />_default value: -5_
                 *
                 * @property {Onto.Skill.Specialization} Firearms.SMG - The general skill of using all submachine guns
                 * <br />_default value: -15_
                 *
                 * @property {Onto.Skill.Specialization} Firearms.Rifle - The general skill of using all rifles
                 * <br />_default value: -5_
                 *
                 * @property {Onto.Skill.Specialization} Firearms.MG - The general skill of using all large mounted machine guns
                 * <br />_default value: -15_
                 *
                 * @property {Onto.Skill.Specialization} Archery - The general skill of using all tension-propelled weapons for archery
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Archery.Bow - The general skill of using all bow weapons for archery
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Archery.Crossbow - The general skill of using all crossbow weapons for archery
                 * <br />_default value: -5_
                 *
                 * @property {Onto.Skill.Specialization} Explosives - The general skill of using all explosives
                 * <br />_default value: -20_
                 *
                 * @property {Onto.Skill.Specialization} Melee - The general skill of using all hand-to-hand weapons, including brass knuckles, legs, fists, heads, etc.
                 * <br />_default value: 0_
                 *
                 * @property {Onto.Skill.Specialization} Melee.Shield - The general skill of using handheld shields as weapons
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Melee.Spear - The general skill of using spears in hand-to-hand combat
                 * <br />_default value: -15_
                 *
                 * @property {Onto.Skill.Specialization} Melee.Knife - The general skill of using knives in hand-to-hand combat
                 * <br />_default value: -5_
                 *
                 * @property {Onto.Skill.Specialization} Melee.Sword - The general skill of using swords in hand-to-hand combat
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Melee.Axe - The general skill of using axes in hand-to-hand combat
                 * <br />_default value: -15_
                 *
                 * @property {Onto.Skill.Specialization} Melee.Hammer - The general skill of using hammers in hand-to-hand combat
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Melee.KungFu - The general skill of successfully using techniques in the discipline of kung fu
                 * <br />_default value: -35_
                 *
                 * @property {Onto.Skill.Specialization} Throwing - The general skill of throwing things
                 * <br />_default value: 0_
                 *
                 * @property {Onto.Skill.Specialization} Throwing.Spear - The general skill of throwing spears
                 * <br />_default value: -20_
                 *
                 * @property {Onto.Skill.Specialization} Throwing.Knife - The general skill of throwing knives
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Throwing.Axe - The general skill of throwing axes
                 * <br />_default value: -20_
                 *
                 * @property {Onto.Skill.Specialization} Lockpick - The general skill of using tools to open locks without a key
                 * <br />_default value: 0_
                 *
                 * @property {Onto.Skill.Specialization} Mechanics - The general skill of using and repairing machinery or working parts of something
                 * <br />_default value: 0_
                 *
                 * @property {Onto.Skill.Specialization} Mechanics.Combustion - The general skill of using and repairing machinery and tools that use fuel combustion power
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Mechanics.Combustion.Coal - The general skill of using and repairing machinery and tools that use coal for fuel combustion power
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Mechanics.Combustion.Hydrocarbon - The general skill of using and repairing machinery and tools that use gasoline or diesel for fuel combustion power
                 * <br />_default value: -20_
                 *
                 * @property {Onto.Skill.Specialization} Mechanics.Hydraulic - The general skill of using and repairing machinery and tools that use liquid fluid power to do simple work
                 * <br />_default value: -20_
                 *
                 * @property {Onto.Skill.Specialization} Medicine - The general skill of help given to a sick or injured person
                 * <br />_default value: 0_
                 *
                 * @property {Onto.Skill.Specialization} Medicine.FirstAid - The general skill of help given to a sick or injured person until full medical treatment is available
                 * <br />_default value: -5_
                 *
                 * @property {Onto.Skill.Specialization} Science - the intellectual and practical activity encompassing the systematic study of the structure and behavior of the physical and natural world through observation and experiment
                 * <br />_default value: 0_
                 *
                 * @property {Onto.Skill.Specialization} Science.Botany - The general skill of working with plants
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Science.Mineral - The general skill of working with minerals
                 * <br />_default value: -15_
                 *
                 * @property {Onto.Skill.Specialization} Science.Electronic - The general skill of working with electronic devices
                 * <br />_default value: -20_
                 *
                 * @property {Onto.Skill.Specialization} Science.Computer - The general skill of working with computers
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Science.Computer.Programming - The general skill of working with computer software
                 * <br />_default value: -20_
                 *
                 * @property {Onto.Skill.Specialization} Science.Physics - The general skill of working with energy and matter using the scientific method
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Science.Physics.Optical - The general skill of working with light
                 * <br />_default value: -25_
                 *
                 * @property {Onto.Skill.Specialization} Science.Physics.Particle - The general skill of working with particles
                 * <br />_default value: -35_
                 *
                 * @property {Onto.Skill.Specialization} Science.Physics.Astro - The general skill of planetary bodies
                 * <br />_default value: -50_
                 *
                 * @property {Onto.Skill.Specialization} Science.Rocket - The general skill of building rockets
                 * <br />_default value: -50_
                 *
                 * @property {Onto.Skill.Specialization} Craftsmanship - The general skill of making things
                 * <br />_default value: 0_
                 *
                 * @property {Onto.Skill.Specialization} Craftsmanship.Shipbuilding - The general skill of making boats
                 * <br />_default value: -20_
                 *
                 * @property {Onto.Skill.Specialization} Craftsmanship.Leathersmithing - The general skill of making things from leather
                 * <br />_default value: 0_
                 *
                 * @property {Onto.Skill.Specialization} Craftsmanship.Gemsmithing - The general skill of making things from gems
                 * <br />_default value: -25_
                 *
                 * @property {Onto.Skill.Specialization} Craftsmanship.Metalsmithing - The general skill of making things from metals
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Craftsmanship.Metalsmithing.Blacksmithing - The general skill of making things from iron and steel
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Craftsmanship.Metalsmithing.Goldsmithing - The general skill of making things from gold
                 * <br />_default value: -20_
                 *
                 * @property {Onto.Skill.Specialization} Craftsmanship.Metalsmithing.Silversmithing - The general skill of making things from silver
                 * <br />_default value: -15_
                 *
                 * @property {Onto.Skill.Specialization} Craftsmanship.Furrier - The general skill of making clothes from animal fur
                 * <br />_default value: -5_
                 *
                 * @property {Onto.Skill.Specialization} Craftsmanship.Dyeing - The general skill of dyeing cloth different colors
                 * <br />_default value: 0_
                 *
                 * @property {Onto.Skill.Specialization} Craftsmanship.Gunsmithing - The general skill of making guns
                 * <br />_default value: -20_
                 *
                 * @property {Onto.Skill.Specialization} Craftsmanship.Locksmithing - The general skill of making locks
                 * <br />_default value: -20_
                 *
                 * @property {Onto.Skill.Specialization} Craftsmanship.Pottersmithing - The general skill of making things from clay
                 * <br />_default value: -5_
                 *
                 * @property {Onto.Skill.Specialization} Craftsmanship.Stonemasonry - The general skill of making things from stone
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Craftsmanship.Weaving - The general skill of making things from thread
                 * <br />_default value: -5_
                 *
                 * @property {Onto.Skill.Specialization} Craftsmanship.Weaving.Ropesmithing - The general skill of making rope
                 * <br />_default value: -5_
                 *
                 * @property {Onto.Skill.Specialization} Craftsmanship.Carpentry - The general skill of building things with wood
                 * <br />_default value: 0_
                 *
                 * @property {Onto.Skill.Specialization} Craftsmanship.Carpentry.Coopersmithing - The general skill of making barrels
                 * <br />_default value: -5_
                 *
                 * @property {Onto.Skill.Specialization} Stealth - The general skill of being undetected
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Stealth.Steal - The general skill of taking things undetected
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Stealth.Sneak - The general skill of sneaking around undetected
                 * <br />_default value: -5_
                 *
                 * @property {Onto.Skill.Specialization} Survival - The general skill of surviving on outdoors
                 * <br />_default value: 0_
                 *
                 * @property {Onto.Skill.Specialization} Survival.Forest - The general skill of surviving in forests
                 * <br />_default value: -5_
                 *
                 * @property {Onto.Skill.Specialization} Survival.Desert - The general skill of surviving in deserts
                 * <br />_default value: -20_
                 *
                 * @property {Onto.Skill.Specialization} Survival.Island - The general skill of surviving on islands
                 * <br />_default value: -30_
                 *
                 * @property {Onto.Skill.Specialization} Survival.Mountain - The general skill of surviving on mountains
                 * <br />_default value: -5_
                 *
                 * @property {Onto.Skill.Specialization} Gambling - The general skill of gambling
                 * <br />_default value: 0_
                 *
                 * @property {Onto.Skill.Specialization} Gambling.Cards - The general skill of gambling with cards
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Gambling.Roulette - The general skill of gambling with a roulette wheel
                 * <br />_default value: -20_
                 *
                 * @property {Onto.Skill.Specialization} Speech - The general skill of moving others with speech
                 * <br />_default value: 0_
                 *
                 * @property {Onto.Skill.Specialization} Speech.Persuasion - The general skill of persuading others
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Speech.Barter - The general skill of negotiating a better price
                 * <br />_default value: 0_
                 *
                 * @property {Onto.Skill.Specialization} Piloting - The general skill of piloting powered vehicles
                 * <br />_default value: 0_
                 *
                 * @property {Onto.Skill.Specialization} Piloting.Boat - The general skill of piloting water vessels
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Piloting.Aircraft - The general skill of flying aircraft
                 * <br />_default value: -30_
                 *
                 * @property {Onto.Skill.Specialization} Piloting.Automobile - The general skill of driving cars
                 * <br />_default value: -5_
                 *
                 * @property {Onto.Skill.Specialization} Athletics - The general skill of being physically fit
                 * <br />_default value: 0_
                 *
                 * @property {Onto.Skill.Specialization} Athletics.Jump - The general skill of jumping when it counts
                 * <br />_default value: -5_
                 *
                 * @property {Onto.Skill.Specialization} Athletics.Climb - The general skill of climbing things
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Athletics.Ride - The general skill of riding animals
                 * <br />_default value: -10_
                 *
                 * @property {Onto.Skill.Specialization} Athletics.Swim - The general skill of swimming
                 * <br />_default value: -20_
                 *
                 * @property {Onto.Skill.Specialization} History - The general skill of knowing things
                 * <br />_default value: 0_
                 *
                 */

                var specializations = {};

                var Specialization = Onto.Skill.Specialization;

                /*jshint -W069 */
                specializations['Firearms'] = new Specialization(
                    "Firearms", -10, "The general skill of using all firearm weapons"
                );
                specializations['Firearms.Pistol'] = new Specialization(
                    "Firearms.Pistol", -10, "The general skill of using all pistols"
                );
                specializations['Firearms.Pistol.Pipe'] = new Specialization(
                    "Firearms.Pistol.Pipe", -5, "The general skill of using all makeshift pistols"
                );
                specializations['Firearms.SMG'] = new Specialization(
                    "Firearms.SMG", -15, "The general skill of using all submachine guns"
                );
                specializations['Firearms.Rifle'] = new Specialization(
                    "Firearms.Rifle", -5, "The general skill of using all rifles"
                );
                specializations['Firearms.MG'] = new Specialization(
                    "Firearms.MG", -15, "The general skill of using all large mounted machine guns"
                );
                specializations['Archery'] = new Specialization(
                    "Archery", -10, "The general skill of using all tension-propelled weapons for archery"
                );
                specializations['Archery.Bow'] = new Specialization(
                    "Archery.Bow", -10, "The general skill of using all bow weapons for archery"
                );
                specializations['Archery.Crossbow'] = new Specialization(
                    "Archery.Crossbow", -5, "The general skill of using all crossbow weapons for archery"
                );
                specializations['Explosives'] = new Specialization(
                    "Explosives", -20, "The general skill of using all explosives"
                );
                specializations['Melee'] = new Specialization(
                    "Melee", 0, "The general skill of using all hand-to-hand weapons, including brass knuckles, legs, fists, heads, etc."
                );
                specializations['Melee.Shield'] = new Specialization(
                    "Melee.Shield", -10, "The general skill of using handheld shields as weapons"
                );
                specializations['Melee.Spear'] = new Specialization(
                    "Melee.Spear", -15, "The general skill of using spears in hand-to-hand combat"
                );
                specializations['Melee.Knife'] = new Specialization(
                    "Melee.Knife", -5, "The general skill of using knives in hand-to-hand combat"
                );
                specializations['Melee.Sword'] = new Specialization(
                    "Melee.Sword", -10, "The general skill of using swords in hand-to-hand combat"
                );
                specializations['Melee.Axe'] = new Specialization(
                    "Melee.Axe", -15, "The general skill of using axes in hand-to-hand combat"
                );
                specializations['Melee.Hammer'] = new Specialization(
                    "Melee.Hammer", -10, "The general skill of using hammers in hand-to-hand combat"
                );
                specializations['Melee.KungFu'] = new Specialization(
                    "Melee.KungFu", -35, "The general skill of successfully using techniques in the discipline of kung fu"
                );
                specializations['Throwing'] = new Specialization(
                    "Throwing", 0, "The general skill of throwing things"
                );
                specializations['Throwing.Spear'] = new Specialization(
                    "Throwing.Spear", -20, "The general skill of throwing spears"
                );
                specializations['Throwing.Knife'] = new Specialization(
                    "Throwing.Knife", -10, "The general skill of throwing knives"
                );
                specializations['Throwing.Axe'] = new Specialization(
                    "Throwing.Axe", -20, "The general skill of throwing axes"
                );
                specializations['Lockpick'] = new Specialization(
                    "Lockpick", 0, "The general skill of using tools to open locks without a key"
                );
                specializations['Mechanics'] = new Specialization(
                    "Mechanics", 0, "The general skill of using and repairing machinery or working parts of something"
                );
                specializations['Mechanics.Combustion'] = new Specialization(
                    "Mechanics.Combustion", -10, "The general skill of using and repairing machinery and tools that use fuel combustion power"
                );
                specializations['Mechanics.Combustion.Coal'] = new Specialization(
                    "Mechanics.Combustion.Coal", -10, "The general skill of using and repairing machinery and tools that use coal for fuel combustion power"
                );
                specializations['Mechanics.Combustion.Hydrocarbon'] = new Specialization(
                    "Mechanics.Combustion.Hydrocarbon", -20, "The general skill of using and repairing machinery and tools that use gasoline or diesel for fuel combustion power"
                );
                specializations['Mechanics.Hydraulic'] = new Specialization(
                    "Mechanics.Hydraulic", -20, "The general skill of using and repairing machinery and tools that use liquid fluid power to do simple work"
                );
                specializations['Medicine'] = new Specialization(
                    "Medicine", 0, "The general skill of help given to a sick or injured person"
                );
                specializations['Medicine.FirstAid'] = new Specialization(
                    "Medicine.FirstAid", -5, "The general skill of help given to a sick or injured person until full medical treatment is available"
                );
                specializations['Science'] = new Specialization(
                    "Science", 0, "the intellectual and practical activity encompassing the systematic study of the structure and behavior of the physical and natural world through observation and experiment"
                );
                specializations['Science.Botany'] = new Specialization(
                    "Science.Botany", -10, "The general skill of working with plants"
                );
                specializations['Science.Mineral'] = new Specialization(
                    "Science.Mineral", -15, "The general skill of working with minerals"
                );
                specializations['Science.Electronic'] = new Specialization(
                    "Science.Electronic", -20, "The general skill of working with electronic devices"
                );
                specializations['Science.Computer'] = new Specialization(
                    "Science.Computer", -10, "The general skill of working with computers"
                );
                specializations['Science.Computer.Programming'] = new Specialization(
                    "Science.Computer.Programming", -20, "The general skill of working with computer software"
                );
                specializations['Science.Physics'] = new Specialization(
                    "Science.Physics", -10, "The general skill of working with energy and matter using the scientific method"
                );
                specializations['Science.Physics.Optical'] = new Specialization(
                    "Science.Physics.Optical", -25, "The general skill of working with light"
                );
                specializations['Science.Physics.Particle'] = new Specialization(
                    "Science.Physics.Particle", -35, "The general skill of working with particles"
                );
                specializations['Science.Physics.Astro'] = new Specialization(
                    "Science.Physics.Astro", -50, "The general skill of planetary bodies"
                );
                specializations['Science.Rocket'] = new Specialization(
                    "Science.Rocket", -50, "The general skill of building rockets"
                );
                specializations['Craftsmanship'] = new Specialization(
                    "Craftsmanship", 0, "The general skill of making things"
                );
                specializations['Craftsmanship.Shipbuilding'] = new Specialization(
                    "Craftsmanship.Shipbuilding", -20, "The general skill of making boats"
                );
                specializations['Craftsmanship.Leathersmithing'] = new Specialization(
                    "Craftsmanship.Leathersmithing", 0, "The general skill of making things from leather"
                );
                specializations['Craftsmanship.Gemsmithing'] = new Specialization(
                    "Craftsmanship.Gemsmithing", -25, "The general skill of making things from gems"
                );
                specializations['Craftsmanship.Metalsmithing'] = new Specialization(
                    "Craftsmanship.Metalsmithing", -10, "The general skill of making things from metals"
                );
                specializations['Craftsmanship.Metalsmithing.Blacksmithing'] = new Specialization(
                    "Craftsmanship.Metalsmithing.Blacksmithing", -10, "The general skill of making things from iron and steel"
                );
                specializations['Craftsmanship.Metalsmithing.Goldsmithing'] = new Specialization(
                    "Craftsmanship.Metalsmithing.Goldsmithing", -20, "The general skill of making things from gold"
                );
                specializations['Craftsmanship.Metalsmithing.Silversmithing'] = new Specialization(
                    "Craftsmanship.Metalsmithing.Silversmithing", -15, "The general skill of making things from silver"
                );
                specializations['Craftsmanship.Furrier'] = new Specialization(
                    "Craftsmanship.Furrier", -5, "The general skill of making clothes from animal fur"
                );
                specializations['Craftsmanship.Dyeing'] = new Specialization(
                    "Craftsmanship.Dyeing", 0, "The general skill of dyeing cloth different colors"
                );
                specializations['Craftsmanship.Gunsmithing'] = new Specialization(
                    "Craftsmanship.Gunsmithing", -20, "The general skill of making guns"
                );
                specializations['Craftsmanship.Locksmithing'] = new Specialization(
                    "Craftsmanship.Locksmithing", -20, "The general skill of making locks"
                );
                specializations['Craftsmanship.Pottersmithing'] = new Specialization(
                    "Craftsmanship.Pottersmithing", -5, "The general skill of making things from clay"
                );
                specializations['Craftsmanship.Stonemasonry'] = new Specialization(
                    "Craftsmanship.Stonemasonry", -10, "The general skill of making things from stone"
                );
                specializations['Craftsmanship.Weaving'] = new Specialization(
                    "Craftsmanship.Weaving", -5, "The general skill of making things from thread"
                );
                specializations['Craftsmanship.Weaving.Ropesmithing'] = new Specialization(
                    "Craftsmanship.Weaving.Ropesmithing", -5, "The general skill of making rope"
                );
                specializations['Craftsmanship.Carpentry'] = new Specialization(
                    "Craftsmanship.Carpentry", 0, "The general skill of building things with wood"
                );
                specializations['Craftsmanship.Carpentry.Coopersmithing'] = new Specialization(
                    "Craftsmanship.Carpentry.Coopersmithing", -5, "The general skill of making barrels"
                );
                specializations['Stealth'] = new Specialization(
                    "Stealth", -10, "The general skill of being undetected"
                );
                specializations['Stealth.Steal'] = new Specialization(
                    "Stealth.Steal", -10, "The general skill of taking things undetected"
                );
                specializations['Stealth.Sneak'] = new Specialization(
                    "Stealth.Sneak", -5, "The general skill of sneaking around undetected"
                );
                specializations['Survival'] = new Specialization(
                    "Survival", 0, "The general skill of surviving on outdoors"
                );
                specializations['Survival.Forest'] = new Specialization(
                    "Survival.Forest", -5, "The general skill of surviving in forests"
                );
                specializations['Survival.Desert'] = new Specialization(
                    "Survival.Desert", -20, "The general skill of surviving in deserts"
                );
                specializations['Survival.Island'] = new Specialization(
                    "Survival.Island", -30, "The general skill of surviving on islands"
                );
                specializations['Survival.Mountain'] = new Specialization(
                    "Survival.Mountain", -5, "The general skill of surviving on mountains"
                );
                specializations['Gambling'] = new Specialization(
                    "Gambling", 0, "The general skill of gambling"
                );
                specializations['Gambling.Cards'] = new Specialization(
                    "Gambling.Cards", -10, "The general skill of gambling with cards"
                );
                specializations['Gambling.Roulette'] = new Specialization(
                    "Gambling.Roulette", -20, "The general skill of gambling with a roulette wheel"
                );
                specializations['Speech'] = new Specialization(
                    "Speech", 0, "The general skill of moving others with speech"
                );
                specializations['Speech.Persuasion'] = new Specialization(
                    "Speech.Persuasion", -10, "The general skill of persuading others"
                );
                specializations['Speech.Barter'] = new Specialization(
                    "Speech.Barter", 0, "The general skill of negotiating a better price"
                );
                specializations['Piloting'] = new Specialization(
                    "Piloting", 0, "The general skill of piloting powered vehicles"
                );
                specializations['Piloting.Boat'] = new Specialization(
                    "Piloting.Boat", -10, "The general skill of piloting water vessels"
                );
                specializations['Piloting.Aircraft'] = new Specialization(
                    "Piloting.Aircraft", -30, "The general skill of flying aircraft"
                );
                specializations['Piloting.Automobile'] = new Specialization(
                    "Piloting.Automobile", -5, "The general skill of driving cars"
                );
                specializations['Athletics'] = new Specialization(
                    "Athletics", 0, "The general skill of being physically fit"
                );
                specializations['Athletics.Jump'] = new Specialization(
                    "Athletics.Jump", -5, "The general skill of jumping when it counts"
                );
                specializations['Athletics.Climb'] = new Specialization(
                    "Athletics.Climb", -10, "The general skill of climbing things"
                );
                specializations['Athletics.Ride'] = new Specialization(
                    "Athletics.Ride", -10, "The general skill of riding animals"
                );
                specializations['Athletics.Swim'] = new Specialization(
                    "Athletics.Swim", -20, "The general skill of swimming"
                );
                specializations['History'] = new Specialization(
                    "History", 0, "The general skill of knowing things"
                );

                // console.log(specializations);

                return specializations;
            }
        };

        new Namespace("Specializations", Onto.Skill, specialization);

    })();

/*
var Specializations = {
    "Firearms" : {
        "General" : {value: -10, description: "The general skill of using all firearm weapons"},
        "Pistol" : {
            "General": {value: -10, description: "The general skill of using all pistols"},
            "Pipe": {value: -5, description: "The general skill of using all makeshift pistols"},
        },
        "SMG" : {value: -15, description: "The general skill of using all submachine guns"},
        "Rifle" : {value: -5, description: "The general skill of using all rifles"},
        "MG" : {value: -15, description: "The general skill of using all large mounted machine guns"},
    },
    "Archery" : {
        "General" : {value: -10, description: "The general skill of using all tension-propelled weapons for archery"},
        "Bow" : {value: -10, description: "The general skill of using all bow weapons for archery"},
        "Crossbow" : {value: -5, description: "The general skill of using all crossbow weapons for archery"},
    },
    "Explosives" : {
        "General" : {value: -20, description: "The general skill of using all explosives"},
    },
    "Melee" : {
        "General" : {value: 0, description: "The general skill of using all hand-to-hand weapons, including brass knuckles, legs, fists, heads, etc."},
        "Shield" : {value: -10, description: "The general skill of using handheld shields as weapons"},
        "Spear" : {value: -15, description: "The general skill of using spears in hand-to-hand combat"},
        "Knife" : {value: -5, description: "The general skill of using knives in hand-to-hand combat"},
        "Sword" : {value: -10, description: "The general skill of using swords in hand-to-hand combat"},
        "Axe" : {value: -15, description: "The general skill of using axes in hand-to-hand combat"},
        "Hammer" : {value: -10, description: "The general skill of using hammers in hand-to-hand combat"},
        "KungFu" : {value: -35, description: "The general skill of successfully using techniques in the discipline of kung fu"},
    },
    "Throwing" : {
        "General" : {value: 0, description: "The general skill of throwing things"},
        "Spear" : {value: -20, description: "The general skill of throwing spears"},
        "Knife" : {value: -10, description: "The general skill of throwing knives"},
        "Axe" : {value: -20, description: "The general skill of throwing axes"}
    },
    "Lockpick" : {
        "General" : {value: 0, description: "The general skill of using tools to open locks without a key"}
    },
    "Mechanics" : {
        "General" : {value: 0, description: "The general skill of using and repairing machinery or working parts of something"},
        "Combustion" : {
            "General" : {value: -10, description: "The general skill of using and repairing machinery and tools that use fuel combustion power"},
            "Coal" : {value: -10, description: "The general skill of using and repairing machinery and tools that use coal for fuel combustion power"},
            "Hydrocarbon" : {value: -20, description: "The general skill of using and repairing machinery and tools that use gasoline or diesel for fuel combustion power"},
        },
        "Hydraulic" : {value: -20, description: "The general skill of using and repairing machinery and tools that use liquid fluid power to do simple work"},
    },
    "Medicine" : {
        "General" : {value: 0, description: "The general skill of help given to a sick or injured person"},
        "FirstAid" : {value: -5, description: "The general skill of help given to a sick or injured person until full medical treatment is available"},
    },
    "Science" : {
        "General" : {value: 0, description: "the intellectual and practical activity encompassing the systematic study of the structure and behavior of the physical and natural world through observation and experiment"},
        "Botany" : {value: -10, description: "The general skill of working with plants"},
        "Mineral" : {value: -15, description: "The general skill of working with minerals"},
        "Electronic" : {value: -20, description: "The general skill of working with electronic devices"},
        "Computer" : {
            "General" : {value: -10, description: "The general skill of working with computers"},
            "Programming" : {value: -20, description: "The general skill of working with computer software"},
        },
        "Physics" : {
            "General" : {value: -10, description: "The general skill of working with energy and matter using the scientific method"},
            "Optical" : {value: -25, description: "The general skill of working with light"},
            "Particle" : {value: -35, description: "The general skill of working with particles"},
            "Astro" : {value: -50, description: "The general skill of planetary bodies"},
        },
        "Rocket" : {value: -50, description: "The general skill of building rockets"},
    },
    "Craftsmanship" : {
        "General" : {value: 0, description: "The general skill of making things"},
        "Shipbuilding" : {value: -20, description: "The general skill of making boats"},
        "Leathersmithing" : {value: 0, description: "The general skill of making things from leather"},
        "Gemsmithing" : {value: -25, description: "The general skill of making things from gems"},
        "Metalsmithing" : {
            "General" : {value: -10, description: "The general skill of making things from metals"},
            "Blacksmithing" : {value: -10, description: "The general skill of making things from iron and steel"},
            "Goldsmithing" : {value: -20, description: "The general skill of making things from gold"},
            "Silversmithing" : {value: -15, description: "The general skill of making things from silver"},
        },
        "Furrier" : {value: -5, description: "The general skill of making clothes from animal fur"},
        "Dyeing" : {value: 0, description: "The general skill of dyeing cloth different colors"},
        "Gunsmithing" : {value: -20, description: "The general skill of making guns"},
        "Locksmithing" : {value: -20, description: "The general skill of making locks"},
        "Pottersmithing" : {value: -5, description: "The general skill of making things from clay"},
        "Stonemasonry" : {value: -10, description: "The general skill of making things from stone"},
        "Weaving" : {
            "General" : {value: -5, description: "The general skill of making things from thread"},
            "Ropesmithing" : {value: -5, description: "The general skill of making rope"},
        },
        "Carpentry" : {
            "General" : {value: 0, description: "The general skill of building things with wood"},
            "Coopersmithing" : {value: -5, description: "The general skill of making barrels"}
        }
    },
    "Stealth" : {
        "General" : {value: -10, description: "The general skill of being undetected"},
        "Steal" : {value: -10, description: "The general skill of taking things undetected"},
        "Sneak" : {value: -5, description: "The general skill of sneaking around undetected"},
    },
    "Survival" : {
        "General" : {value: 0, description: "The general skill of surviving on outdoors"},
        "Forest" : {value: -5, description: "The general skill of surviving in forests"},
        "Desert" : {value: -20, description: "The general skill of surviving in deserts"},
        "Island" : {value: -30, description: "The general skill of surviving on islands"},
        "Mountain" : {value: -5, description: "The general skill of surviving on mountains"},
    },
    "Gambling" : {
        "General" : {value: 0, description: "The general skill of gambling"},
        "Cards" : {value: -10, description: "The general skill of gambling with cards"},
        "Roulette" : {value: -20, description: "The general skill of gambling with a roulette wheel"},
    },
    "Speech" : {
        "General" : {value: 0, description: "The general skill of moving others with speech"},
        "Persuasion" : {value: -10, description: "The general skill of persuading others"},
        "Barter" : {
            "General" : {value: 0, description: "The general skill of negotiating a better price"},
        }
    },
    "Piloting" : {
        "General" : {value: 0, description: "The general skill of piloting powered vehicles"},
        "Boat" : {value: -10, description: "The general skill of piloting water vessels"},
        "Aircraft" : {value: -30, description: "The general skill of flying aircraft"},
        "Automobile" : {value: -5, description: "The general skill of driving cars"},
    },
    "Athletics" : {
        "General" : {value: 0, description: "The general skill of being physically fit"},
        "Jump" : {value: -5, description: "The general skill of jumping when it counts"},
        "Climb" : {value: -10, description: "The general skill of climbing things"},
        "Ride" : {value: -10, description: "The general skill of riding animals"},
        "Swim" : {value: -20, description: "The general skill of swimming"}
    },
    "History" : {
        "General" : {value: 0, description: "The general skill of knowing things"}
    }
};
 */
