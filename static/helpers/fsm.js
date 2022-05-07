let instance = null;

const machine = {
	debug: false,
	exercise: null,
	stage: 0,
	state: 'IDLE',	
	transitions: {
		IDLE: {
			startExercise: function(exercise) {
				if (exercise.stage !== 1) {
					return;
				}
				if (this.debug) {
					console.log("STARTED NEW EXERCISE", exercise.label);
				}				
				this.setState('STARTED');
				this.exercise = exercise.label;
				this.stage = exercise.stage;
			}
		},
		STARTED: {
			progressExercise: function(exercise) {
				if (exercise.label === this.exercise) {
					if (this.stage + 1 === exercise.stage) {
						if (this.debug) {
							console.log("PROGRSSED", exercise.label, "EXERCISE");
						}
						this.setState('PROGRESSED');
						this.stage = this.stage + 1;
					}
				} else {
					this.dispatch("startExercise", [exercise]);
				}
			},
			startExercise: function(exercise) {
				if (exercise.stage !== 1) {
					return;
				}
				if (this.debug) {
					console.log("STARTED NEW EXERCISE", exercise.label);
				}
				this.setState('STARTED');
				this.exercise = exercise.label;
				this.stage = exercise.stage;
			}		
		},
		PROGRESSED: {
			progressExercise: function(exercise) {
				if (exercise.label === this.exercise) {
					if (exercise.stage === 1) {
						if (this.debug) {
							console.log("COMPLETED", exercise.label, "EXERCISE");
						}
						this.setState('IDLE');
						this.stage = 0;
						this.exercise = null;
					}
				} else {
					this.dispatch("startExercise", [exercise]);
				}
			},
			startExercise: function(exercise) {
				if (exercise.stage !== 1) {
					return;
				}
				if (this.debug) {
					console.log("STARTED NEW EXERCISE", exercise.label);
				}
				this.setState('STARTED');
				this.exercise = exercise.label;
				this.stage = exercise.stage;
			}			
		}
	},
	dispatch(actionName, ...payload) {
    const actions = this.transitions[this.state];
    const action = this.transitions[this.state][actionName];

    if (action) {
      action.apply(machine, ...payload);
    } else {
      //action is not valid for current state
    }
  },
  setState(newState) {    
    this.state = newState;
  }
}

if (!instance) {
	const system = Object.create(machine);
	instance = system;
}

module.exports = instance;