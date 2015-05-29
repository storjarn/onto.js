
	//===========================================================
	(function(){

		/**
	     * Humanoid Class constructor
	     * @class  Onto.Humanoid
	     * @classdesc Represents a humanoid in the Onto game system.
	     * @param {object} data - The data that is going to be bound to this instance of Humanoid
	     * @return {Onto.Humanoid}
	     * @extends Onto.Being
	     * @inheritdoc Onto.Being
	     */
		var Humanoid = new Class({
			inherits: Onto.Being,
			isAbstract: true,
		    init: function constructor(data) {

		    	var self = this;
	            data = data || {};

	            data.Attributes = Onto._.extend(self.Attributes || {}, data.Attributes || {});

		        data.Specializations = data.Specializations || {};
		        data.HitLocations = data.HitLocations || {};
		        data.Inventory = data.Inventory || {};

		        constructor.super.call(self, data);

		        // Skills
		        /**
		         * @member {object} Skills - The base skills container of the humanoid
		         * @see {@link Onto.Humanoid#Skill|Skill}
		         * @instance
		         * @memberof Onto.Humanoid
		         * @property {number} Firearms - The skill of using weapons like pistols and rifles
		         * <br />_(Attributes.Agility + 10)_
		         *
		         * @property {number} Archery - The skill of using weapons like bows and crossbows
		         * <br />_(2 + Attributes.Agility * 2 + Attributes.Strength / 2)_
		         *
		         * @property {number} Explosives - The skill of using explosives like dynamite and grenades
		         * <br />_(2 + Attributes.Perception * 2 + Attributes.Luck / 2)_
		         *
		         * @property {number} Melee - The skill of using hand-to-hand combat with and without weapons
		         * <br />_(30 + 2 * Attributes.Agility + 2 * Attributes.Strength)_
		         *
		         * @property {number} Throwing - The skill of throwing things like grenades and spears
		         * <br />_(3 * Attributes.Agility + Attributes.Strength / 2)_
		         *
		         * @property {number} Lockpick - The skill of unlocking locks without keys
		         * <br />_(20 + Attributes.Perception / 2 + Attributes.Agility / 2)_
		         *
		         * @property {number} Mechanics - The skill of using and repairing mechanical devices
		         * <br />_(20 + Attributes.Intelligence)_
		         *
		         * @property {number} Medicine - The skill of using first aid and surgery
		         * <br />_(Attributes.Perception + Attributes.Intelligence * 2 + Attributes.Luck / 2)_
		         *
		         * @property {number} Science - The skill of using the scientific method and testing results
		         * <br />_(Attributes.Perception + Attributes.Intelligence * 2 + Attributes.Luck / 2)_
		         *
		         * @property {number} Craftsmanship - The skill of using the scientific method and testing results
		         * <br />_(Attributes.Intelligence / 2 + Attributes.Luck / 2 + Attributes.Perception / 2 + Attributes.Agility / 2)_
		         *
		         * @property {number} Stealth - The skill of sneaking
		         * <br />_(2 + Attributes.Agility * 2 + Attributes.Luck / 2)_
		         *
		         * @property {number} Survival - The skill of surviving in the outdoors
		         * <br />_(2 + Attributes.Endurance + Attributes.Intelligence + Attributes.Luck / 2)_
		         *
		         * @property {number} Gambling - The skill of betting money on games
		         * <br />_(2 + Attributes.Perception * 2 + Attributes.Luck / 2)_
		         *
		         * @property {number} Speech - The skill of getting your way in conversation
		         * <br />_(2 + Attributes.Charisma * 2 + Attributes.Luck / 2)_
		         *
		         * @property {number} Athletics - The skill of being physically fit
		         * <br />_(2 + Attributes.Agility + Attributes.Strength + Attributes.Endurance / 2)_
		         *
		         * @property {number} Piloting - The skill of driving vehicles
		         * <br />_(2 * Attributes.Agility + Attributes.Perception)_
		         *
		         * @property {number} History - The skill of knowing the past
		         * <br />_(2 + Attributes.Intelligence * 2 + Attributes.Perception / 2)_
		         */

		        Class.define(self, 'Skills', Class({}).Enumerable());

		        var skillBase = {
		        	'Firearms': function(){
		                return self.Attributes.Agility + 10;
		            },
		            'Archery': function(){
		                return 2 + (self.Attributes.Agility * 2) + (self.Attributes.Strength / 2);
		            },
		            'Explosives' : function(){
		                return 2 + (self.Attributes.Perception * 2) + (self.Attributes.Luck / 2);
		            },
		            'Melee' : function(){
		                return 30 + (2 * self.Attributes.Agility) + (2 * self.Attributes.Strength);
		            },
		            'Throwing' : function(){
		                return 3 * self.Attributes.Agility + self.Attributes.Strength / 2;
		            },
		            'Lockpick' : function(){
		                return 20 + (self.Attributes.Perception / 2) + (self.Attributes.Agility / 2);
		            },
		            'Mechanics' : function(){
		                return 20 + self.Attributes.Intelligence;
		            },
		            'Medicine' : function(){
		                return self.Attributes.Perception + (self.Attributes.Intelligence * 2) + (self.Attributes.Luck / 2);
		            },
		            'Science' : function(){
		                return self.Attributes.Perception + (self.Attributes.Intelligence * 2) + (self.Attributes.Luck / 2);
		            },
		            'Craftsmanship' : function(){
		                return (self.Attributes.Intelligence / 2) + (self.Attributes.Luck / 2) + (self.Attributes.Perception / 2) + (self.Attributes.Agility / 2);
		            },
		            'Stealth' : function(){
		                return 2 + (self.Attributes.Agility * 2) + (self.Attributes.Luck / 2);
		            },
		            'Survival' : function(){
		                return 2 + self.Attributes.Endurance + self.Attributes.Intelligence + (self.Attributes.Luck / 2);
		            },
		            'Gambling' : function(){
		                return 2 + (self.Attributes.Perception * 2) + (self.Attributes.Luck / 2);
		            },
		            'Speech' : function(){
		                return 2 + (self.Attributes.Charisma * 2) + (self.Attributes.Luck / 2);
		            },
		            'Athletics' : function(){
		                return 2 + self.Attributes.Agility + self.Attributes.Strength + (self.Attributes.Endurance / 2);
		            },
		            'Piloting' : function(){
		                return 2 * (self.Attributes.Agility + self.Attributes.Perception);
		            },
		            'History' : function(){
		                return 2 + (self.Attributes.Intelligence * 2) + (self.Attributes.Perception / 2);
		            }
		        };

		        for(var skillName in skillBase) {
		        	Class.define(self.Skills, skillName, {
			        	get : skillBase[skillName], enumerable: true
			        });
		        }


		        /**
		         * @member {object} Specializations - The extended skills container of the humanoid.  As skills are learned and go up in experience, these numbers will change.  See {@link Onto.Skill.Specializations.SpecializationCollection} for the default values.
		         *
		         * @see {@link Onto.Humanoid#Skill|Skill}
		         * @see {@link Onto.Skill.Specializations.loadDefaults}
		         * @instance
		         * @memberof Onto.Humanoid
		         * @inheritparams Onto.Skill.Specializations.SpecializationCollection
		         */
		        var Specializations = Onto.Skill.Specializations.loadDefaults();
			    Class.define(self, "Specializations", Class(Specializations).Enumerable());


			    // Body definition

			    /**
			     * @member {object} HitLocations - The container for all of the body's hit locations.
	             * @instance
	             * @memberof Onto.Humanoid
	             * @property {object} Head - The head.
	             * @property {object} Head.DisplayName - "Head"
	             * @property {object} Head.Health - The number of hitpoints at this location.<br />Calculated as: _Math.round(HitPoints / 5)_
	             * @property {object} Head.Percentage - The percentage of the whole body this location takes.<br />_5_
	             * @property {object} Head.InventorySlots - The inventory slots available in this location.
	             * @property {object} Head.InventorySlots.Hat - The crown and top of the head.
	             * @property {object} Head.InventorySlots.EyeWear - The top half of the face.
	             * @property {object} Head.InventorySlots.EarWear - The sides of the head.
	             * @property {object} Head.InventorySlots.MouthWear - The bottom half of the face.
	             * @property {object} Head.InventorySlots.NeckWear - The neck.
	             * @property {Array} Head.Wounds - The wounds at this location.
	             * @property {object} RightArm - The right arm
	             * @property {object} RightArm.DisplayName - "Right Arm"
	             * @property {object} RightArm.Health - The number of hitpoints at this location.<br />Calculated as: _Math.round(HitPoints / 4)_
	             * @property {object} RightArm.Percentage - The percentage of the whole body this location takes.<br />_10_
	             * @property {object} RightArm.InventorySlots - The inventory slots available in this location.
	             * @property {object} RightArm.InventorySlots.ShoulderWear - The shoulder and joint area.
	             * @property {object} RightArm.InventorySlots.UpperMidWear - The top half of the arm.
	             * @property {object} RightArm.InventorySlots.ElbowWear - The elbow.
	             * @property {object} RightArm.InventorySlots.LowerMidWear - The bottom half of the arm.
	             * @property {object} RightArm.InventorySlots.WristWear - The wrist.
	             * @property {object} RightArm.InventorySlots.Gloves - The hands.
	             * @property {Array} RightArm.Wounds - The wounds at this location.
	             * @property {object} Chest
	             * @property {object} Chest.DisplayName - "Chest"
	             * @property {object} Chest.Health - The number of hitpoints at this location.<br />Calculated as: _Math.round(HitPoints / 2)_
	             * @property {object} Chest.Percentage - The percentage of the whole body this location takes.<br />_25_
	             * @property {object} Chest.InventorySlots - The inventory slots available in this location.
	             * @property {object} Chest.InventorySlots.CollarWear - The collar and below the neck to the top of the chest muscles.
	             * @property {object} Chest.InventorySlots.LeftBreastWear - The left breast.
	             * @property {object} Chest.InventorySlots.RightBreastWear - The right breast.
	             * @property {object} Chest.InventorySlots.BackWear - The back of the chest.
	             * @property {Array} Chest.Wounds - The wounds at this location.
	             * @property {object} Abdomen
	             * @property {object} Abdomen.DisplayName - "Abdomen"
	             * @property {object} Abdomen.Health - The number of hitpoints at this location.<br />Calculated as: _Math.round(HitPoints / 3)_
	             * @property {object} Abdomen.Percentage - The percentage of the whole body this location takes.<br />_20_
	             * @property {object} Abdomen.InventorySlots - The inventory slots available in this location.
	             * @property {object} Abdomen.InventorySlots.PlexusWear - The solar plexus.
	             * @property {object} Abdomen.InventorySlots.BellyWear - Above the waist.
	             * @property {object} Abdomen.InventorySlots.Belt - The waist.
	             * @property {object} Abdomen.InventorySlots.GroinWear - The groin area.
	             * @property {Array} Abdomen.Wounds - The wounds at this location.
	             * @property {object} LeftArm
	             * @property {object} LeftArm.DisplayName - "Left Arm"
	             * @property {object} LeftArm.Health - The number of hitpoints at this location.<br />Calculated as: _Math.round(HitPoints / 4)_
	             * @property {object} LeftArm.Percentage - The percentage of the whole body this location takes.<br />_10_
	             * @property {object} LeftArm.InventorySlots - The inventory slots available in this location.
	             * @property {object} LeftArm.InventorySlots.ShoulderWear - The shoulder and joint area.
	             * @property {object} LeftArm.InventorySlots.UpperMidWear - The top half of the arm.
	             * @property {object} LeftArm.InventorySlots.ElbowWear - The elbow.
	             * @property {object} LeftArm.InventorySlots.LowerMidWear - The bottom half of the arm.
	             * @property {object} LeftArm.InventorySlots.WristWear - The wrist.
	             * @property {object} LeftArm.InventorySlots.Gloves - The hands.
	             * @property {object} RightLeg
	             * @property {object} RightLeg.DisplayName - "Right Leg"
	             * @property {object} RightLeg.Health - The number of hitpoints at this location.<br />Calculated as: _Math.round(HitPoints / 3)_
	             * @property {object} RightLeg.Percentage - The percentage of the whole body this location takes.<br />_15_
	             * @property {object} RightLeg.InventorySlots - The inventory slots available in this location.
	             * @property {object} RightLeg.InventorySlots.HipWear - The hip and joint area.
	             * @property {object} RightLeg.InventorySlots.UpperMidWear - The top half of the leg.
	             * @property {object} RightLeg.InventorySlots.KneeWear - The knee.
	             * @property {object} RightLeg.InventorySlots.LowerMidWear - The bottom half of the leg.
	             * @property {object} RightLeg.InventorySlots.AnkleWear - The ankle.
	             * @property {object} RightLeg.InventorySlots.Feet - The feet.
	             * @property {object} LeftLeg
	             * @property {object} LeftLeg.DisplayName - "Left Leg"
	             * @property {object} LeftLeg.Health - The number of hitpoints at this location.<br />Calculated as: _Math.round(HitPoints / 3)_
	             * @property {object} LeftLeg.Percentage - The percentage of the whole body this location takes.<br />_15_
	             * @property {object} LeftLeg.InventorySlots - The inventory slots available in this location.
	             * @property {object} LeftLeg.InventorySlots.HipWear - The hip and joint area.
	             * @property {object} LeftLeg.InventorySlots.UpperMidWear - The top half of the leg.
	             * @property {object} LeftLeg.InventorySlots.KneeWear - The knee.
	             * @property {object} LeftLeg.InventorySlots.LowerMidWear - The bottom half of the leg.
	             * @property {object} LeftLeg.InventorySlots.AnkleWear - The ankle.
	             * @property {object} LeftLeg.InventorySlots.Feet - The feet.
			     */
		        self.LoadBodyDefinition({
	                Locations : {
	                    "Head" : {
	                    	"DisplayName" : "Head",
				            "Health" : null,
				            "Percentage" : 5,
				            "InventorySlots" : {
				                "Hat" : null,
				                "EyeWear" : null,
				                "EarWear" : null,
				                "MouthWear" : null,
				                "NeckWear" : null
				            },
				            "Wounds" : []
				        },
				        "RightArm" : {
				        	"DisplayName" : "Right Arm",
				            "Health" : null,
				            "Percentage" : 10,
				            "InventorySlots" : {
				                "ShoulderWear" : null,
				                "UpperMidWear" : null,
				                "ElbowWear" : null,
				                "LowerMidWear" : null,
				                "WristWear" : null,
				                "Gloves" : null
				            },
				            "Wounds" : []
				        },
				        "Chest" : {
				        	"DisplayName" : "Chest",
				            "Health" : null,
				            "Percentage" : 25,
				            "InventorySlots" : {
				                "CollarWear" : null,
				                "LeftBreastWear" : null,
				                "RightBreastWear" : null,
				                "BackWear" : null
				            },
				            "Wounds" : []
				        },
				        "LeftArm" : {
				        	"DisplayName" : "Left Arm",
				            "Health" : null,
				            "Percentage" : 10,
				            "InventorySlots" : {
				                "ShoulderWear" : null,
				                "UpperMidWear" : null,
				                "ElbowWear" : null,
				                "LowerMidWear" : null,
				                "WristWear" : null,
				                "Gloves" : null
				            },
				            "Wounds" : []
				        },
				        "Abdomen" : {
				        	"DisplayName" : "Abdomen",
				            "Health" : null,
				            "Percentage" : 20,
				            "InventorySlots" : {
				                "PlexusWear" : null,
				                "BellyWear" : null,
				                "Belt" : null,
				                "GroinWear" : null
				            },
				            "Wounds" : []
				        },
				        "RightLeg" : {
				        	"DisplayName" : "Right Leg",
				            "Health" : null,
				            "Percentage" : 15,
				            "InventorySlots" : {
				                "HipWear" : null,
				                "UpperMidWear" : null,
				                "KneeWear" : null,
				                "LowerMidWear" : null,
				                "AnkleWear" : null,
				                "Feet" : null
				            },
				            "Wounds" : []
				        },
				        "LeftLeg" : {
				        	"DisplayName" : "Left Leg",
				            "Health" : null,
				            "Percentage" : 15,
				            "InventorySlots" : {
				                "HipWear" : null,
				                "UpperMidWear" : null,
				                "KneeWear" : null,
				                "LowerMidWear" : null,
				                "AnkleWear" : null,
				                "Feet" : null
				            },
				            "Wounds" : []
				        }
	                }
	            });

				var detailedHitLocations = {
                    "Head" : {
                        "DisplayName" : "Head",
                        "Health" : null,
                        "Percentage" : 4,
                        "InventorySlots" : {
                            "Hat" : null,
                            "EarWear" : null
                        },
                        "Wounds" : []
                    },
                    "Face" : {
                        "DisplayName" : "Face",
                        "Health" : null,
                        "Percentage" : 3,
                        "InventorySlots" : {
                            "Forehead": null,
                            "EyeWear" : null,
                            "MouthWear" : null
                        },
                        "Wounds" : []
                    },
                    "RightEye" : {
                        "DisplayName" : "Right Eye",
                        "Health" : null,
                        "Percentage" : 1,
                        "InventorySlots" : {
                            "EyeWear" : null
                        },
                        "Wounds" : []
                    },
                    "LeftEye" : {
                        "DisplayName" : "Left Eye",
                        "Health" : null,
                        "Percentage" : 1,
                        "InventorySlots" : {
                            "EyeWear" : null
                        },
                        "Wounds" : []
                    },
                    "RightShoulder" : {
                        "DisplayName" : "Right Shoulder",
                        "Health" : null,
                        "Percentage" : 3,
                        "InventorySlots" : {
                            "ShoulderWear" : null
                        },
                        "Wounds" : []
                    },
                    "UpperRightArm" : {
                        "DisplayName" : "Upper Right Arm",
                        "Health" : null,
                        "Percentage" : 5,
                        "InventorySlots" : {
                            "UpperMidWear" : null
                        },
                        "Wounds" : []
                    },
                    "RightElbow" : {
                        "DisplayName" : "Right Elbow",
                        "Health" : null,
                        "Percentage" : 2,
                        "InventorySlots" : {
                            "ElbowWear" : null
                        },
                        "Wounds" : []
                    },
                    "RightForearm" : {
                        "DisplayName" : "Right Forearm",
                        "Health" : null,
                        "Percentage" : 4,
                        "InventorySlots" : {
                            "LowerMidWear" : null
                        },
                        "Wounds" : []
                    },
                    "RightHand" : {
                        "DisplayName" : "Right Hand",
                        "Health" : null,
                        "Percentage" : 2,
                        "InventorySlots" : {
                            "WristWear" : null,
                            "Gloves" : null
                        },
                        "Wounds" : []
                    },
                    "Chest" : {
                        "DisplayName" : "Chest",
                        "Health" : null,
                        "Percentage" : 9,
                        "InventorySlots" : {
                            "CollarWear" : null,
                            "LeftBreastWear" : null,
                            "RightBreastWear" : null,
                            "BackWear" : null
                        },
                        "Wounds" : []
                    },
                    "LeftShoulder" : {
                        "DisplayName" : "Left Shoulder",
                        "Health" : null,
                        "Percentage" : 3,
                        "InventorySlots" : {
                            "ShoulderWear" : null
                        },
                        "Wounds" : []
                    },
                    "UpperLeftArm" : {
                        "DisplayName" : "Upper Left Arm",
                        "Health" : null,
                        "Percentage" : 5,
                        "InventorySlots" : {
                            "UpperMidWear" : null
                        },
                        "Wounds" : []
                    },
                    "LeftElbow" : {
                        "DisplayName" : "Left Elbow",
                        "Health" : null,
                        "Percentage" : 2,
                        "InventorySlots" : {
                            "ElbowWear" : null
                        },
                        "Wounds" : []
                    },
                    "LeftForearm" : {
                        "DisplayName" : "Left Forearm",
                        "Health" : null,
                        "Percentage" : 4,
                        "InventorySlots" : {
                            "LowerMidWear" : null
                        },
                        "Wounds" : []
                    },
                    "LeftHand" : {
                        "DisplayName" : "Left Hand",
                        "Health" : null,
                        "Percentage" : 2,
                        "InventorySlots" : {
                            "WristWear" : null,
                            "Gloves" : null
                        },
                        "Wounds" : []
                    },
                    "Abdomen" : {
                        "DisplayName" : "Abdomen",
                        "Health" : null,
                        "Percentage" : 6,
                        "InventorySlots" : {
                            "PlexusWear" : null,
                            "BellyWear" : null,
                            "Belt" : null,
                            "GroinWear" : null
                        },
                        "Wounds" : []
                    },
                    "RightHip" : {
                        "DisplayName" : "Right Hip",
                        "Health" : null,
                        "Percentage" : 4,
                        "InventorySlots" : {
                            "Belt" : null,
                            "HipWear" : null
                        },
                        "Wounds" : []
                    },
                    "LeftHip" : {
                        "DisplayName" : "Left Hip",
                        "Health" : null,
                        "Percentage" : 4,
                        "InventorySlots" : {
                            "Belt" : null,
                            "HipWear" : null
                        },
                        "Wounds" : []
                    },
                    "Groin" : {
                        "DisplayName" : "Groin",
                        "Health" : null,
                        "Percentage" : 2,
                        "InventorySlots" : {
                            "GroinWear" : null
                        },
                        "Wounds" : []
                    },
                    "RightThigh" : {
                        "DisplayName" : "Right Thigh",
                        "Health" : null,
                        "Percentage" : 6,
                        "InventorySlots" : {
                            "UpperMidWear" : null
                        },
                        "Wounds" : []
                    },
                    "RightKnee" : {
                        "DisplayName" : "Right Knee",
                        "Health" : null,
                        "Percentage" : 3,
                        "InventorySlots" : {
                            "KneeWear" : null
                        },
                        "Wounds" : []
                    },
                    "LowerRightLeg" : {
                        "DisplayName" : "Lower Right Leg",
                        "Health" : null,
                        "Percentage" : 6,
                        "InventorySlots" : {
                            "LowerMidWear" : null
                        },
                        "Wounds" : []
                    },
                    "RightFoot" : {
                        "DisplayName" : "Right Foot",
                        "Health" : null,
                        "Percentage" : 2,
                        "InventorySlots" : {
                            "FootWear" : null
                        },
                        "Wounds" : []
                    },
                    "LeftThigh" : {
                        "DisplayName" : "Left Thigh",
                        "Health" : null,
                        "Percentage" : 6,
                        "InventorySlots" : {
                            "UpperMidWear" : null
                        },
                        "Wounds" : []
                    },
                    "LeftKnee" : {
                        "DisplayName" : "Left Knee",
                        "Health" : null,
                        "Percentage" : 3,
                        "InventorySlots" : {
                            "KneeWear" : null
                        },
                        "Wounds" : []
                    },
                    "LowerLeftLeg" : {
                        "DisplayName" : "Lower Left Leg",
                        "Health" : null,
                        "Percentage" : 6,
                        "InventorySlots" : {
                            "LowerMidWear" : null
                        },
                        "Wounds" : []
                    },
                    "LeftFoot" : {
                        "DisplayName" : "Left Foot",
                        "Health" : null,
                        "Percentage" : 2,
                        "InventorySlots" : {
                            "FootWear" : null
                        },
                        "Wounds" : []
                    }
                };

				Class.define(self.HitLocations.Head, "Health", {
					get: function() { return Math.round(self.HitPoints / 5); }
				});

				Class.define(self.HitLocations.RightArm, "Health", {
					get: function() { return Math.round(self.HitPoints / 4); }
				});

				Class.define(self.HitLocations.Chest, "Health", {
					get: function() { return Math.round(self.HitPoints / 2); }
				});

				Class.define(self.HitLocations.LeftArm, "Health", {
					get: function() { return Math.round(self.HitPoints / 4); }
				});

				Class.define(self.HitLocations.Abdomen, "Health", {
					get: function() { return Math.round(self.HitPoints / 3); }
				});

				Class.define(self.HitLocations.RightLeg, "Health", {
					get: function() { return Math.round(self.HitPoints / 3); }
				});

				Class.define(self.HitLocations.LeftLeg, "Health", {
					get: function() { return Math.round(self.HitPoints / 3); }
				});

		        // this.Inventory = Onto._.extend(this.Inventory || {}, data.Inventory);
		    },

		    Age : 0,
		    Gender : '',
		    Name : '',

		    CurrentDamage : null,
		    Damage : null,
		    Size : null,
		    HitPoints : null,

		    MovementSpeed : null,
		    AttackSpeed : null,

		    MaxCarryWeight : null,

		    /**
		     * The getter for all {@link Onto.Humanoid#Skills|Skills} that exist on the humanoid instance, which calculates the base skill with the appropriate {@link Onto.Humanoid#Specializations|Specializations}.
		     * @function Skill
		     * @see {@link Onto.Humanoid#Skills|Skills}
	         * @instance
	         * @memberof Onto.Humanoid
	         * @example
	         * var skillValue = humanInstance.Skill("Firearms.Pistol");
	         */
		    Skill : function(namepath) {
		        var self = this;
		        var split = namepath.split('.');
		        var skillName = split[0];
		        var baseSkill = self.Skills[skillName];
		        var ret = 0;
		        ret += baseSkill;      //Base
		        if (split.length > 1) {
		            var currPath = [skillName];
		            for(var i = 1; i < split.length; ++i) {
		                var breakLoop = false;
		                var currSpec = self.Specializations[currPath.join(".")];
		                if (!!currSpec) {
		                	ret += currSpec.value;
		                	currPath.push(split[i]);
		                } else {
		                    breakLoop = true;
		                }
		                if (breakLoop) {
		                    break;
		                }
		            }
		        }
		        return ret;
		    },
		    Skills : {},
		    Specializations: {}
		});

		Onto.addClass("Humanoid", Humanoid);

	})();
