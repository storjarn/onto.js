(function(undefined){
	var EmotionalIntelligence = function(pleasure, arousal, dominance) {
		this.Pleasure = pleasure
		this.Arousal = arousal
		this.Dominance = dominance

		this.Anger = function() {
			return pleasure * -0.51 + arousal * 0.59 + dominance * 0.25
		}
		this.Fear = function() {
			return pleasure * -0.64 + arousal * 0.6 + dominance * -0.43
		}
		this.Boredom = function() {
			return pleasure * -0.65 + arousal * -0.62 + dominance * -0.33
		}
		this.Curiosity = function() {
			return pleasure * 0.22 + arousal * 0.62 + dominance * -0.01
		}
		this.Dignity = function() {
			return pleasure * 0.55 + arousal * 0.22 + dominance * 0.61
		}
		this.Elation = function() {
			return pleasure * 0.50 + arousal * 0.42 + dominance * 0.23
		}
		this.Hunger = function() {
			return pleasure * -0.44 + arousal * 0.14 + dominance * -0.21
		}
		this.Inhibition = function() {
			return pleasure * -0.54 + arousal * -0.04 + dominance * -0.41
		}
		this.Love = function() {
			return pleasure * 0.87 + arousal * 0.54 + dominance * -0.18
		}
		this.Puzzlement = function() {
			return pleasure * -0.41 + arousal * 0.48 + dominance * -0.33
		}
		this.Sleepiness = function() {
			return pleasure * 0.20 + arousal * -0.70 + dominance * -0.44
		}
		this.Unconcerned = function() {
			return pleasure * -0.13 + arousal * -0.41 + dominance * 0.08
		}
		this.Violence = function() {
			return pleasure * -0.50 + arousal * 0.62 + dominance * 0.38
		}
		this.Sociability = function() {
			return pleasure * 0.44 + arousal * 0.20 + dominance * 0.26
		}
		this.Neuroticism = function() {
			return pleasure * 0.26 + arousal * 0.49 + dominance * 0.25
		}
		this.Anxiety = function() {
			return pleasure * 0.43 + arousal * 0.29 + dominance * -0.37
		}
		this.BingeEating = function() {
			return pleasure * -0.25 + arousal * 0.22 + dominance * -0.20
		}

	}
})()