var app = angular.module('exerciseTimeTracker');

app.controller('dashboardCtrl', function($scope, dashboardService){
	$scope.test = 'dashboard controller';
})