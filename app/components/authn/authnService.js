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
      authnData.uid = authnData.uid.replace('simplelogin:', '');
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
      password: user.password,
      name: user.name
    }).then(function(userObj){
        console.log("User created successfully");
        return authnService.authnObj.$authWithPassword({
          email : user.email,
          password : user.password
        });
    }).then(function(authnData){
      console.log(authnData);
      if (authnData){       //This takes the data received after login and creates a user profile.
        authnData.name = user.name;   //Take the full name entered on registration and set it to the profile name (not username)
        authnData.timestamp = new Date().toISOString();   //timestamp the user creation for potential data use.
        authnData.uid = authnData.uid.replace('simplelogin:', '');
        authnData.email = user.email;
        // authnData.email = authnData[authnData.auth.provider].email;   //use this for any potential provider if the formatting is similar
        delete authnData.expires;
        delete authnData.provider;
        delete authnData.token;
        delete authnData.password;
        // delete authnData[authnData.auth.provider];  //similar to comment above - this could potentially allow for more than one provider type

        fbRef.child('users').child(authnData.uid).child('profile').set(authnData);
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



























