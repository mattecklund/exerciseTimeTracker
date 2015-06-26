var app = angular.module('exerciseTimeTracker');

app.service('dashboardService', function($firebase, $firebaseObject, $firebaseArray, urls, $q){
	// console.log('in the Dashboard Service');

	var fbProfile = null;
	var fbWorkouts;
	var fbWorkoutsThirtyDays;
	var fbThirtyWorkouts;
	var sevenDaysWorkouts = [];
	var sevenDaysAgo = null;
	var thirtyDaysWorkouts = [];
	var thirtyDaysAgo = null;
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
				fbWorkouts.$loaded(function(){
					deferred.resolve(fbWorkouts);
				});
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

	var getThirtyDays = function(){
		var thirtyDays = 2592000000;
		thirtyDaysAgo = Date.now() - thirtyDays;
	}

	this.getNumberDaysWorkouts = function(uid, numDays){
		// console.log('Getting thirty Days of Exercises');
		var numDaysWorkouts;
		var numDaysAgo;
		switch (numDays) {
			case 30:
				thirtyDaysWorkouts = [];
				numDaysWorkouts = thirtyDaysWorkouts;
				getThirtyDays();
				numDaysAgo = thirtyDaysAgo;
				break;
			case 7:
				sevenDaysWorkouts = [];
				numDaysWorkouts = sevenDaysWorkouts;
				getSevenDays();
				numDaysAgo = sevenDaysAgo;
				break;
		}
		var deferred = $q.defer();
		dashboardService.getWorkouts(uid).then(function(fbWorkoutsNumDays){
			for(i = 0; i < fbWorkoutsNumDays.length; i++){
				if(fbWorkouts[i].timestamp >= numDaysAgo){
					numDaysWorkouts.push(fbWorkouts[i]);

				}
			}

			deferred.resolve(numDaysWorkouts);
		}).catch(function(err){
			console.log(err);
			deferred.reject(err);
		})
		return deferred.promise;
	}

})



