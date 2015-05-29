var app = angular.module('exerciseTimeTracker');

app.controller('timeTrackerCtrl', function($scope, timeTrackerService){
	console.log('In the timeTrackerCtrl controller');

	$scope.startExercise = function(category){
		timeTrackerService.startExercise(category);
	};

	$scope.stopExercise = function(category){
		timeTrackerService.stopExercise(category);
	}
})