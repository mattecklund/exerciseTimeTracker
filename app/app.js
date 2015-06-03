var app = angular.module('exerciseTimeTracker', ['firebase','ngRoute']);

app.constant('urls', {
	fb: 'https://exercisetimetracker.firebaseio.com/',
	authn: '/authn',
	timeTracker: '/timeTracker'
})


app.config(function($routeProvider, urls){
	// $httpProvider.interceptors.push('httpRequestInterceptor');

	$routeProvider
		.when(urls.timeTracker, {
			templateUrl: 'app/components/timeTracker/timeTracker.html',
			controller: 'timeTrackerCtrl',
			resolve: {
				userAuthnData: function(authnService, $location){
					if(authnService.authnObj.$getAuth()){
						return authnService.authnObj.$getAuth();
					} else {
						$location.path(urls.authn);
					}
				}
			}
		})

		.when(urls.authn, {
			templateUrl: 'app/components/authn/authn.html',
			controller: 'authnCtrl'
		})

		.otherwise({
			resolve: { 
				redirect: function(authnService, $location){
					if(authnService.authnObj.$getAuth()){
						$location.path(urls.timeTracker);
					} else {
						$location.path(urls.authn);
					}
				}
			}
		})
})