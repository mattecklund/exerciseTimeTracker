var app = angular.module('exerciseTimeTracker');

app.controller('dashboardCtrl', function($scope, dashboardService, userAuthnData, userProfileData){
	// console.log(userAuthnData);

	// $scope.userProfile = dashboardService.getProfile(userAuthnData.uid)
	$scope.userProfile = userProfileData;
	$scope.exercises = ['running', 'weightlifting', 'cycling', 'cardio'];
	$scope.exerciseTimeSevenDays = [];

	var pad = function(n){
		return (n < 10) ? ("0" + n) : n;
	}

	// console.log($scope.userProfile);

	dashboardService.getSevenDaysWorkouts(userAuthnData.uid).then(function(sevenDaysWorkouts){
		$scope.sevenDaysWorkouts = sevenDaysWorkouts;
		addExerciseTime($scope.sevenDaysWorkouts);
	});

	var addExerciseTime = function(sevenDaysWorkouts){
		for(var a = 0; a < $scope.exercises.length; a++){	// Loop through each of the different exercise categories
			var exercise = $scope.exercises[a];
			$scope.exerciseTimeSevenDays[exercise] = {}
			$scope.exerciseTimeSevenDays[exercise].totalTime = 0;
			for(var i = 0; i < sevenDaysWorkouts.length; i++){	//  Loop through each of the exercise objects in the last seven days array
				var obj = sevenDaysWorkouts[i][exercise]
				if(obj){
					// console.log(obj);
					for(var j = 0; j < obj.length; j++){	//Loop through any potential exercise within a given workout object given the exercise category
						// console.log(obj);
						// console.log(obj[j].exerciseTime);
						$scope.exerciseTimeSevenDays[exercise].totalTime += obj[j].exerciseTime; 		// Running total looping through each instance of the given exercise
					}
				}
			}
			// console.log($scope.exerciseTimeSevenDays[exercise].totalTime);
			$scope.exerciseTimeSevenDays[exercise].totalTime = Math.floor($scope.exerciseTimeSevenDays[exercise].totalTime);
			$scope.exerciseTimeSevenDays[exercise].hours = pad(Math.floor($scope.exerciseTimeSevenDays[exercise].totalTime / 3600));
			$scope.exerciseTimeSevenDays[exercise].minutes = pad(Math.floor(($scope.exerciseTimeSevenDays[exercise].totalTime % 3600) / 60));
			$scope.exerciseTimeSevenDays[exercise].seconds = pad(Math.floor(($scope.exerciseTimeSevenDays[exercise].totalTime % 3600) % 60));
			console.log('Total ' + exercise + ' time is ' + $scope.exerciseTimeSevenDays[exercise].totalTime);
		}

	}



})