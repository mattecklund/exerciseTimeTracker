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

  $scope.logout = function(){
    authnService.logout();
    $scope.close();
  }

  $scope.authnCheck = function(){
    try {
            $scope.userUid = authnService.authnObj.$getAuth().uid.replace('simplelogin:', '')
            // console.log($scope.userUid);
            $scope.userProfile = dashboardService.getProfile($scope.userUid);
          } catch(e) {
            // console.log('not logged in');
            $scope.userProfile = {
              name: 'Navigation'
            }
          }

          if($scope.userProfile.name !== 'Navigation'){
            $scope.isAuthenticated = true;
          } else {
            $scope.isAuthenticated = false;
          }
  }

  $scope.authnUpdate = function(){
    setInterval(function(){
      $scope.$apply(function(){
        $scope.authnCheck();
      })
    }, 1000);
  };

  $scope.authnUpdate();

  

})