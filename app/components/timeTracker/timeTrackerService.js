var app = angular.module('exerciseTimeTracker');

app.service('timeTrackerService', function($http, $q, $firebase, $firebaseObject, $firebaseArray, fb){
	console.log('In Her Majesty\'s timeTracker Service');

	var workout = [];
	var startTime;
	var stopTime;

	this.startWorkout = function(){
		console.log('started a workout');
	}

	this.stopWorkout = function(){
		//save the workout object

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
		var totalTime = Math.round((stopTime - startTime) / 100) / 10;
		console.log(stopTime + ' is the stop time' );
		workout[category].push({exerciseTime: totalTime})
		console.log(workout);
	}


})