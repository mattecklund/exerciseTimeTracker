var app = angular.module('exerciseTimeTracker', ['firebase','ngRoute']);

app.constant('fb', {
	url: 'https://exercisetimetracker.firebaseio.com/'
})

app.config(function($routeProvider){
	// $httpProvider.interceptors.push('httpRequestInterceptor');

	$routeProvider
		.when('/', {
			templateUrl: 'app/components/timeTracker/timeTracker.html',
			controller: 'timeTrackerCtrl'
		})

		.otherwise({
			redirectTo: '/'
		})
})