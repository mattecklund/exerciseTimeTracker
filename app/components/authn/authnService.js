var app = angular.module('exerciseTimeTracker');

app.service('authnService', function($firebaseAuth, urls, $location){
  //Just a reference to the firebase endpoint
  // var firebaseUrl = 'https://practice-auth.firebaseio.com/'

  //Creates an object using the Firebase Constructor with our endpoint passed in
  var fbRef = new Firebase(urls.fb);
  var authnService = this;
  this.authnObj = $firebaseAuth(fbRef);

  //login method to be called from our controller. The callback is then passed the authenticated user
  this.login = function(user, cb){
    authnService.authnObj.$authWithPassword({
      email : user.email,
      password : user.password
    }).then(function(authnData){
      // user authenticated with Firebase
      console.log(authnData);
      console.log("Logged In! User ID: " + authnData.uid);
      cb(authnData);
    }).catch(function(err){
      switch (err.code) {
        case "INVALID_EMAIL":
          console.log("wrong email and/or password")
          // add an error service or function that handles this in a clean way 
        case "INVALID_PASSWORD":
          console.log("wrong email and/or password")
        default:
      }
    });
  };

  //Step 3 of Registration
  this.register = function(user, cb){
    authnService.authnObj.$createUser({
      email: user.email,
      password: user.password
    }).then(function(userObj){
        console.log("User created successfully");
        return authnService.authnObj.$authWithPassword({
          email : user.email,
          password : user.password
        });
    }).then(function(authnData){
      console.log(authnData);
      if (authnData){
        authnData.name = user.name;
        authnData.timestamp = new Date().toISOString();
        fbRef.child('users').child(authnData.uid.replace('simplelogin:', '')).set(authnData);
        cb(authnData);
      } else {
        console.log('Error');
      }
    }).catch(function(error){
        switch (error.code) {
          case "EMAIL_TAKEN":
            console.log("The new user account cannot be created because the email is already in use.");
            break;
          case "INVALID_EMAIL":
            console.log("The specified email is not a valid email.");
            break;
          default:
            console.log("Error creating user:", error);
        }
    });
  };

  this.logout = function(){
    // console.log(authnService.authnObj);
    authnService.authnObj.$unauth();
    $location.path(urls.authn);
  }

});



























