var app = angular.module('exerciseTimeTracker');

app.service('dashboardService', function($firebase, $firebaseObject, $firebaseArray, urls, $q){
	console.log('in the Dashboard Service');

	var fbProfile = function(uid){
		return $firebaseObject(new Firebase(urls.fb + 'users/' + uid + '/profile'))
	}

	this.getProfile = function(uid){
		return fbProfile(uid);
	}

	//  This feels like overkill
	// var fbProfile = function(uid){
	// 	var fbProfileUrl = urls.fb + 'users/' + uid + '/profile'
	// 	console.log(fbProfileUrl)
	// 	var fbProfileObj = $firebaseObject(new Firebase(fbProfileUrl));
	// 	console.log(fbProfileObj);
	// 	return fbProfileObj;
	// }


	// This also feels like overkill
	// this.getProfile = function(uid){
	// 	var deferred = $q.defer();
	// 	fbProfile(uid).then(
	// 		function(response){
	// 			deferred.resolve(response);
	// 		},
	// 		function(err){
	// 			deferred.reject(err);
	// 		}
	// 	);
	// 	return deferred;
	// }


})