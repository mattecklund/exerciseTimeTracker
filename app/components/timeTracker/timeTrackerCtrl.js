var app = angular.module('exerciseTimeTracker');

app.controller('timeTrackerCtrl', function($scope, timeTrackerService){
	console.log('In the timeTrackerCtrl controller');

	$scope.startWorkoutDisabled = false;
	$scope.stopWorkoutDisabled = true;
	$scope.selectCategoryDisabled = true;
	$scope.startExerciseDisabled = true;
	$scope.stopExerciseDisabled = true;

	$scope.exercises = ['running', 'weightlifting', 'cycling', 'cardio'];
	$scope.selectedCategory = null;


	$scope.selectCategory = function(category){
		$scope.selectedCategory = category;
		$scope.startExerciseDisabled = false;
		console.log($scope.selectedCategory);
	}

	$scope.startWorkout = function(){
		timeTrackerService.startWorkout();
		$scope.startWorkoutDisabled = !$scope.startWorkoutDisabled;
		$scope.stopWorkoutDisabled = !$scope.stopWorkoutDisabled;
		$scope.selectCategoryDisabled = !$scope.selectCategoryDisabled;
		
	};

	$scope.stopWorkout = function(category){
		if(timeTrackerService.stopTime === null){
			timeTrackerService.stopExercise(category);
		}
		timeTrackerService.stopWorkout();
		$scope.startWorkoutDisabled = false;
		$scope.stopWorkoutDisabled = true;
		$scope.selectCategoryDisabled = true;
		$scope.startExerciseDisabled = true;
		$scope.stopExerciseDisabled = true;
		
	};

	$scope.startExercise = function(category){
		timeTrackerService.startExercise(category);
		$scope.selectCategoryDisabled = !$scope.selectCategoryDisabled;
		$scope.startExerciseDisabled = !$scope.startExerciseDisabled;
		$scope.stopExerciseDisabled  = !$scope.stopExerciseDisabled;
		console.log($scope.selectedCategory);
	};

	$scope.stopExercise = function(category){
		timeTrackerService.stopExercise(category);
		$scope.startExerciseDisabled = !$scope.startExerciseDisabled;
		$scope.selectCategoryDisabled = !$scope.selectCategoryDisabled;
		$scope.stopExerciseDisabled  = !$scope.stopExerciseDisabled;
	}
})