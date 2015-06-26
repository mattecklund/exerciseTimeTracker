var app = angular.module('exerciseTimeTracker');

app.service('timeTrackerService', function($http, $q, $firebase, $firebaseObject, $firebaseArray, urls){
	console.log('In Her Majesty\'s timeTracker Service');
	var timeService = this;

	var workout = {};
	var timestamp = Date.now();
	var stopwatchTime = {};
	

	timeService.startTime = null;
	timeService.stopTime = null;

	this.startWorkout = function(){
		// console.log('started a workout');
	}

	this.stopWorkout = function(uid){
		//save the workout object
		// console.log(workout);
		var fbArray = $firebaseArray(new Firebase(urls.fb + 'users/' + uid + '/workouts/'));
		workout.timestamp = timestamp;
		fbArray.$add(workout);


		workout = {};
	}

	this.startExercise = function(category){
		timeService.startTime = performance.now();
		if (! workout[category]){
			workout[category] = [];
		}
		// console.log(timeService.startTime + ' is the start time');
	};

	var pad = function(n){
		return (n < 10) ? ("0" + n) : n;
	}

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
			console.log('Already stopped the exercise');
		}
	}

	this.updateStopwatch = function() {
		if (timeService.startTime){
			elapsedTime = Math.floor((performance.now() - timeService.startTime) / 1000);
			// console.log(elapsedTime);
			console.log(performance.now() - timeService.startTime);
			stopwatchTime.hours = pad(Math.floor(elapsedTime / 3600));
			stopwatchTime.minutes = pad(Math.floor(elapsedTime / 60));
			// console.log(elapsedTime % 3600);
			stopwatchTime.seconds = pad(Math.floor(elapsedTime % 3600) % 60);
			// console.log(stopwatchTime);
			return stopwatchTime;
		} else {
			stopwatchTime.hours = pad(0);
			stopwatchTime.minutes = pad(0);
			stopwatchTime.seconds = pad(0);
			return stopwatchTime;
		}		
	}


})




