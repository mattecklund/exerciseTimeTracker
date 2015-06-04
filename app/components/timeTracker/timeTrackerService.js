var app = angular.module('exerciseTimeTracker');

app.service('timeTrackerService', function($http, $q, $firebase, $firebaseObject, $firebaseArray, urls){
	console.log('In Her Majesty\'s timeTracker Service');
	var timeService = this;

	var workout = [];
	

	timeService.startTime = null;
	timeService.stopTime = null;

	this.startWorkout = function(){
		// console.log('started a workout');
	}

	this.stopWorkout = function(uid){
		//save the workout object
		// console.log(workout);
		var fbArray = $firebaseArray(new Firebase(urls.fb + 'users/' + uid + '/workouts/'));
		fbArray.$add(workout);
		workout = [];
	}

	this.startExercise = function(category){
		timeService.startTime = performance.now();
		if (! workout[category]){
			workout[category] = [];
		}
		// console.log(timeService.startTime + ' is the start time');
	};

	this.stopExercise = function(category){
		if (timeService.startTime !== null){
			// console.log('in the stop exercise function in the service');
			timeService.stopTime = performance.now()
			var totalTime = Math.round((timeService.stopTime - timeService.startTime) / 100) / 10; //Use Math.floor once you start doing real measurements
			// console.log(timeService.startTime + ' is the start time');
			// console.log(timeService.stopTime + ' is the stop time' );
			workout[category].push({exerciseTime: totalTime})
			timeService.startTime = null;
			timeService.stopTime = null;
			// console.log("Start Time should be null: " + timeService.startTime);
			// console.log("Stop Time should be null: " + timeService.stopTime);
			// console.log(workout);
		} else {
			console.log('in the else statement');
		}
	}


})