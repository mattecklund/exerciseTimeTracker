var app = angular.module('exerciseTimeTracker');

app.controller('dashboardCtrl', function($scope, dashboardService, userAuthnData, userProfileData){
	// console.log(userAuthnData);

	// $scope.userProfile = dashboardService.getProfile(userAuthnData.uid)
	$scope.userProfile = userProfileData;

	console.log($scope.userProfile);

})