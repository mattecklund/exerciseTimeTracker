var app = angular.module('exerciseTimeTracker');

app.controller('authnCtrl', function($scope, $location, authnService, urls){
	var loginCallback = function(response){
    if (response === "error"){
      $scope.error = 'You have entered your username and/or password incorrectly';
    } else {
      $location.path(urls.dashboard);
    }
  };

  $scope.login = function () {
    return authnService.login($scope.details, loginCallback);
  };

  //Step 2 of Registration
  $scope.register = function () {
    return authnService.register($scope.details, loginCallback);
  };

  $scope.status = 'Register';
  $scope.showReg = function(){
    if($scope.status === 'Register'){
      $scope.status = 'Login';
    } else {
      $scope.status = 'Register';
    }
    $scope.reg = !$scope.reg;
  };



});