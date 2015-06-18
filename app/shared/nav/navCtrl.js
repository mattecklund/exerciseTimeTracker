var app = angular.module('exerciseTimeTracker');

app.controller('navCtrl', function($scope, $timeout, $mdSidenav, $mdComponentRegistry, $log, authnService, dashboardService){
	$scope.links = ['timeTracker', 'dashboard', 'authn', 'terms', 'help', 'contact', 'about'];

	$scope.close = function() {
    	$mdSidenav('left').close()
            .then(function(){
            	// $log.debug("close LEFT is done");
			});
  	};

  	$scope.toggleLeft = function() {
    	$mdSidenav('left').toggle()
	        .then(function(){
	              // $log.debug("toggle left is done");
	        });
  };

  try {
    $scope.userUid = authnService.authnObj.$getAuth().uid.replace('simplelogin:', '')
    $scope.userProfile = dashboardService.getProfile($scope.userUid);
  } catch(e) {
    console.log('not logged in');
    $scope.userProfile = {
      name: 'Navigation'
    }
  }


})