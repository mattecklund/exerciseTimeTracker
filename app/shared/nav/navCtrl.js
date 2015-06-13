var app = angular.module('exerciseTimeTracker');

app.controller('navCtrl', function($scope, $timeout, $mdSidenav, $mdComponentRegistry, $log){
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

})