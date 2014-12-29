(function(undefined) {

    //http://en.wikipedia.org/wiki/Big_Five_personality_traits

    var vectorDimensions = {
        /*
         (inventive/curious vs. consistent/cautious). Appreciation for art, emotion, adventure, unusual ideas, curiosity, and variety of experience. Openness reflects the degree of intellectual curiosity, creativity and a preference for novelty and variety a person has. It is also described as the extent to which a person is imaginative or independent, and depicts a personal preference for a variety of activities over a strict routine. Some disagreement remains about how to interpret the openness factor, which is sometimes called "intellect" rather than openness to experience.
    */
        "Openness": {
            "Reasoning": null, //Renamed from Fantasy to positive end for averages to make sense
            "Aesthetics": null,
            "Feelings": null,
            "Actions": null,
            "Ideas": null,
            "Values": null
        },
        /*
        (efficient/organized vs. easy-going/careless). A tendency to be organized and dependable, show self-discipline, act dutifully, aim for achievement, and prefer planned rather than spontaneous behavior.
    */
        "Conscientiousness": {
            "Competence": null,
            "Order": null,
            "Dutifulness": null,
            "Achievement Striving": null,
            "Self-Discipline": null,
            "Deliberation": null
        },
        /*
        (outgoing/energetic vs. solitary/reserved). Energy, positive emotions, surgency, assertiveness, sociability and the tendency to seek stimulation in the company of others, and talkativeness.
    */
        "Extraversion": {
            "Warmth": null,
            "Gregariousness": null,
            "Assertiveness": null,
            "Activity": null,
            "Excitement": null,
            "Positive Emotion": null
        },
        /*
        (friendly/compassionate vs. analytical/detached). A tendency to be compassionate and cooperative rather than suspicious and antagonistic towards others. It is also a measure of one's trusting and helpful nature, and whether a person is generally well tempered or not.
    */
        "Agreeableness": {
            "Trust": null,
            "Straightforwardness": null,
            "Altruism": null,
            "Compliance": null,
            "Modesty": null,
            "Tendermindedness": null
        },
        /*
        (sensitive/nervous vs. secure/confident). The tendency to experience unpleasant emotions easily, such as anger, anxiety, depression, and vulnerability. Neuroticism also refers to the degree of emotional stability and impulse control and is sometimes referred to by its low pole, "emotional stability".
    */
        "Neuroticism": {
            "Calm": null, //Renamed from Anxiety to positive end for averages to make sense
            "Peaceful": null, //Renamed from Hostility to positive end for averages to make sense
            "Resilience": null, //Renamed from Depression to positive end for averages to make sense
            "Self-awareness": null, //Renamed from Self-consciousness to positive end for averages to make sense
            "Thoughtful": null, //Renamed from Implsiveness to positive end for averages to make sense
            "Resistance to stress": null //Renamed from Vulnerability to stress to positive end for averages to make sense
        }
    }

    var Vector = function(name, value) {
        this.Name = name
        this.Facets = value
    }
    var Personality = function(data) {
        this.Dimensions = {}
        for (var key in vectorDimensions) {
            var vectorData = {}
            for (var key2 in vectorDimensions[key]) {
                vectorData[key2] = data[key2]
            }
            this.Dimensions[key] = new Vector(key, vectorData)
        }
    }
    Personality.prototype.dimensionAverage = function(dimensionName) {
        var dim = this.Dimensions[dimensionName]
        if (!dim) {
            return null
        }
        var ret = 0
        var count = 0
        for (var facetName in dim) {
            ret += dim[facetName] || 0.5
            ++count
        }
        return ret / count
    }
    Personality.prototype.facetAverage = function(facetNames) {
        var ret = 0
        var count = 0
        for (var i = 0; i < facetNames.length; ++i) {
            var facetName = facetNames[i]
            var found = false
            for (var dimName in this.Dimensions) {
                var dim = this.Dimensions[dimName]
                if (!dim) {
                    return null
                }
                if (!!dim[facetName]) {
                    ret += dim[facetName] || 0.5
                    ++count
                    found = true
                    break
                }
            }
            if (found) {
                break
            }
        }
        return ret / count
    }

    exports.Personality = Personality
    exports.VectorDimensions = vectorDimensions
})()
