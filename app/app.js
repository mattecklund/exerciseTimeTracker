var app = angular.module('exerciseTimeTracker', ['firebase','ngRoute']);

app.constant('urls', {
	fb: 'https://exercisetimetracker.firebaseio.com/',
	authn: '/authn',
	timeTracker: '/timeTracker',
	dashboard: '/dashboard'
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
						var userObj = authnService.authnObj.$getAuth();
						userObj.uid = userObj.uid.replace('simplelogin:', '');
						return userObj;
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

		.when(urls.dashboard, {
			templateUrl: 'app/components/dashboard/dashboard.html',
			controller: 'dashboardCtrl',
			resolve: {
				userAuthnData: function(authnService, $location){
					if(authnService.authnObj.$getAuth()){
						var userObj = authnService.authnObj.$getAuth();
						userObj.uid = userObj.uid.replace('simplelogin:', '');
						return userObj;
					} else {
						$location.path(urls.authn);
					}
				},
				userProfileData: function(authnService, dashboardService){
					var uid = authnService.authnObj.$getAuth().uid;
					uid = uid.replace('simplelogin:', '');	// Is there a more direct way of getting this?  Maybe from the userAuthnData object w/in resolve object
					return dashboardService.getProfile(uid);
				}
			}
		})

		.otherwise({
			resolve: { 
				redirect: function(authnService, $location){
					if(authnService.authnObj.$getAuth()){
						$location.path(urls.dashboard);
					} else {
						$location.path(urls.authn);
					}
				}
			}
		})
})