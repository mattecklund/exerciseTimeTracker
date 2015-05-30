var app = angular.module('exerciseTimeTracker');

app.service('timeTrackerService', function($http, $q, $firebase, $firebaseObject, $firebaseArray, fb){
	console.log('In Her Majesty\'s timeTracker Service');

	var workout = [];
	var fbArray = $firebaseArray(new Firebase(fb.url + 'users/workouts/'));

	this.startTime = null;
	this.stopTime = null;

	this.startWorkout = function(){
		console.log('started a workout');
	}

	this.stopWorkout = function(){
		//save the workout object
		console.log(workout);
		fbArray.$add(workout);
	}

	this.startExercise = function(category){
		startTime = performance.now();
		if (! workout[category]){
			workout[category] = [];
		}
		console.log(startTime + ' is the start time');
	};

	this.stopExercise = function(category){
		stopTime = performance.now()
		var totalTime = Math.round((stopTime - startTime) / 100) / 10; //Use Math.floor once you start doing real measurements
		console.log(stopTime + ' is the stop time' );
		workout[category].push({exerciseTime: totalTime})
		startTime = null;
		stopTime = null;
		// console.log(workout);
	}


})