var app = angular.module('exerciseTimeTracker');

app.controller('timeTrackerCtrl', function($scope, timeTrackerService, userAuthnData, authnService){

	// console.log(userAuthnData);
	// $scope.userId = userAuthnData.auth.uid.replace('simplelogin:', '');
	// console.log($scope.userId);


	console.log('In the timeTrackerCtrl controller');

	var resetTimeTracker = function(){
		$scope.startWorkoutDisabled = false;
		$scope.stopWorkoutDisabled = true;
		$scope.selectCategoryDisabled = true;
		$scope.startExerciseDisabled = true;
		$scope.stopExerciseDisabled = true;
	}

	resetTimeTracker();

	$scope.exercises = ['running', 'weightlifting', 'cycling', 'cardio'];
	$scope.selectedCategory = null;


	$scope.selectCategory = function(category){
		$scope.selectedCategory = category;
		$scope.startExerciseDisabled = false;
	}

	$scope.startWorkout = function(){
		timeTrackerService.startWorkout();
		$scope.startWorkoutDisabled = !$scope.startWorkoutDisabled;
		$scope.stopWorkoutDisabled = !$scope.stopWorkoutDisabled;
		$scope.selectCategoryDisabled = !$scope.selectCategoryDisabled;
		
	};

	$scope.stopWorkout = function(category){
		timeTrackerService.stopExercise(category);
		timeTrackerService.stopWorkout(userAuthnData.uid);
		resetTimeTracker();		
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

	$scope.logout = function(){
		authnService.logout();
	};

	$scope.updateStopwatch = function(){
		setInterval(function(){
			$scope.$apply(function(){
				$scope.stopwatchTime = timeTrackerService.updateStopwatch();
			})
		}, 1000);
	}

	$scope.updateStopwatch();
	// $scope.stopwatchTime = timeTrackerService.updateStopwatch();
	// $scope.stopwatchHours;
	// $scope.stopwatchMinutes;
	// $scope.stopwatchSeconds;

})


























