var app = angular.module('exerciseTimeTracker');

app.controller('dashboardCtrl', function($scope, dashboardService, userAuthnData, userProfileData){
	// console.log(userAuthnData);

	// $scope.userProfile = dashboardService.getProfile(userAuthnData.uid)
	$scope.userProfile = userProfileData;
	$scope.exercises = ['running', 'weightlifting', 'cycling', 'cardio'];
	$scope.exerciseTimeSevenDays = [];
	$scope.exerciseTimeThirtyDays = [];

	var pad = function(n){
		return (n < 10) ? ("0" + n) : n;
	}

	// console.log($scope.userProfile);

	dashboardService.getNumberDaysWorkouts(userAuthnData.uid, 7).then(function(sevenDaysWorkouts){
		$scope.sevenDaysWorkouts = sevenDaysWorkouts;
		addExerciseTime($scope.sevenDaysWorkouts, $scope.exerciseTimeSevenDays);
	});

	dashboardService.getNumberDaysWorkouts(userAuthnData.uid, 30).then(function(thirtyDaysWorkouts){
		$scope.thirtyDaysWorkouts = thirtyDaysWorkouts;
		addExerciseTime($scope.thirtyDaysWorkouts, $scope.exerciseTimeThirtyDays);
	});

	var addExerciseTime = function(multipleDaysWorkouts, multipleDaysScope){
		for(var a = 0; a < $scope.exercises.length; a++){	// Loop through each of the different exercise categories
			var exercise = $scope.exercises[a];
			multipleDaysScope[exercise] = {};
			multipleDaysScope[exercise].totalTime = 0;
			for(var i = 0; i < multipleDaysWorkouts.length; i++){	//  Loop through each of the exercise objects in the last seven days array
				var obj = multipleDaysWorkouts[i][exercise]
				if(obj){
					// console.log(obj);
					for(var j = 0; j < obj.length; j++){	//Loop through any potential exercise within a given workout object given the exercise category
						// console.log(obj);
						// console.log(obj[j].exerciseTime);
						multipleDaysScope[exercise].totalTime += obj[j].exerciseTime; 		// Running total looping through each instance of the given exercise
					}
				}
			}
			// console.log($scope.exerciseTimeSevenDays[exercise].totalTime);
			multipleDaysScope[exercise].totalTime = Math.floor(multipleDaysScope[exercise].totalTime);
			multipleDaysScope[exercise].hours = pad(Math.floor(multipleDaysScope[exercise].totalTime / 3600));
			multipleDaysScope[exercise].minutes = pad(Math.floor((multipleDaysScope[exercise].totalTime % 3600) / 60));
			multipleDaysScope[exercise].seconds = pad(Math.floor((multipleDaysScope[exercise].totalTime % 3600) % 60));
			// console.log('Total ' + exercise + ' time is ' + $scope.exerciseTimeSevenDays[exercise].totalTime);
		}

	}



})