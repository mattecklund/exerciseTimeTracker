var app = angular.module('exerciseTimeTracker');

app.service('dashboardService', function($firebase, $firebaseObject, $firebaseArray, urls, $q){
	console.log('in the Dashboard Service');

	var fbProfile = null;
	var fbWorkouts;
	var sevenDaysWorkouts = [];
	var sevenDaysAgo = null;
	var dashboardService = this;

	this.getProfile = function(uid){
		if(!fbProfile){
			fbProfile = $firebaseObject(new Firebase(urls.fb + 'users/' + uid + '/profile'));
			return fbProfile;
		} else {
			return fbProfile;
		}
	}

	this.updateProfile = function(uid){
		// do stuff with fbProfile
	}

	this.getWorkouts = function(uid){
		var deferred = $q.defer();
		if(!fbWorkouts){
			fbWorkouts = $firebaseArray(new Firebase(urls.fb + 'users/' + uid + '/workouts/'));
			fbWorkouts.$loaded(function(){
				deferred.resolve(fbWorkouts);
			});
		} else {
			if(fbWorkouts){
				deferred.resolve(fbWorkouts);
			} else {
				deferred.reject('Sorry, there was nothing there')
			}
		}
		return deferred.promise;
	}

	var getSevenDays = function(){
		var sevenDays = 604800000;
		sevenDaysAgo = Date.now() - sevenDays;
	}

	this.getSevenDaysWorkouts = function(uid){
		// console.log('Getting Seven Days of Exercises');
		var deferred = $q.defer();
		dashboardService.getWorkouts(uid).then(function(fbWorkouts){
			getSevenDays();
			// console.log(fbWorkouts);
			// console.log(sevenDaysAgo);
			// console.log(fbWorkouts.length);
			for(i = 0; i < fbWorkouts.length; i++){
				// console.log(fbWorkouts[i]);
				if(fbWorkouts[i].timestamp >= sevenDaysAgo){
					// console.log('there is a timestamp');
					sevenDaysWorkouts.push(fbWorkouts[i]);
				}
			}
			// console.log(sevenDaysWorkouts);

			deferred.resolve(sevenDaysWorkouts);
		}).catch(function(err){
			console.log(err);
			deferred.reject(err);
		})
		return deferred.promise;
	}





})