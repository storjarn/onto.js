	//===========================================================

	var CharacterManager = new Class({

	    init: function() {
	        var self = this;

	        this.Characters = function() {
	            var characters = Storage.getCharacters();
	            for(var i = 0; i < characters.length; ++i) {
	                var data = characters[i];
	                var character = new Character(data.Name, data);
	                // var skills = character.Skills
	                // character.bind(data)
	                // character.Skills = skills
	                for(var j = 0; j < character.SaveGames.length; ++j) {
	                    var saveData = character.SaveGames[j];
	                    var saveSession = new GameSession(character);
	                    saveSession.bind(saveData);
	                    character.SaveGames[j] = saveSession;
	                }
	                characters[i] = character;
	            }

	            return characters;
	        };

	        this.Character = Character;
	        this.GameSession = GameSession;

	        this.save = function() {
	            var characters = this.Characters();
	            for(var i = 0; i < characters.length; ++i) {
	                characters[i].save();
	            }
	        };

	        this.saveCharacters = function(characters) {
	            Storage.saveCharacters(characters);
	        };

	        this.removeCharacter = function(index) {
	        	var characters = [];
	            switch(typeof index) {
	                case 'number' : //array index
	                    characters = this.Characters();
	                    if (index < characters.length) {
	                        self.removeCharacter(characters[index].GUID);
	                    }
	                    break;
	                case 'string' : //GUID
	                    characters = this.Characters();
	                    for(var i = 0; i < characters.length; ++i) {
	                        if (characters[i].GUID == index) {
	                            var character = characters[i];
	                            if (character) {
	                                Storage.removeCharacter(character.GUID);
	                                characters.splice(i, 1);
	                                Storage.saveCharacters(characters);
	                                break;
	                            }
	                        }
	                    }
	                    break;
	                case 'object' : //Character object
	                    self.removeCharacter(index.GUID);
	                    break;
	            }
	        };

	        this.reset = function() {
	            resetAll();
	        };

	        this.getSaveGame = Storage.getSaveGame;
	    }
	});

	Onto.addClass("CharacterManager", CharacterManager);

	//===========================================================

	var GameSession = function(character) {
	    this.Character = character;
	    this.GUID = Utility.GUID();
	    this.DateCreated = new Date().getTime();
	    this.DateModified = null;
	    this.bind = Utility.bind;

	    this.update = function() {
	        this.Character.save();
	        this.DateModified = new Date().getTime();
	        Storage.saveGame(this);
	    };

	    this.saveNew = function() {
	        var newSession = new GameSession(this.Character);
	        newSession.bind(JSON.parse(JSON.stringify(this)));
	        newSession.update();
	    };
	};

	Onto.addClass("GameSession", GameSession);
