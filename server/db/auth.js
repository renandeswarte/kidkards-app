var Firebase = require('firebase');
var firebase = new Firebase(process.env.FIREBASE_ADDRESS + '/');
var bodyParser = require('body-parser');


var auth = {};

// User login function
var userLogin = function(data, req, res) {
  return  firebase.authWithPassword(data, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
        res.status(400).send(error);
      } else {
        console.log("Authenticated successfully");

        // Retrieve the user informations
        var userInfoRef = new Firebase(process.env.FIREBASE_ADDRESS + '/users/');

        var newUserData;
        // Get User Info and Save it into cookie
        userInfoRef.orderByChild("uid").equalTo(authData.uid).once("child_added", function(snapshot) {
          newUserData = snapshot.val();
          //newUserData.token = authData.token;
          // Save information in cookie for 1 day
          res.cookie('flashcards-app-FC', newUserData, { expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 1))});

          res.send(newUserData);
        });
      }
    });
};

// Logout Method
auth.logout = function(req, res) {
  // Destroy user session with firebase
  //firebase.unauth();
  // Destroy User cookie in the browser
  res.clearCookie('flashcards-app-FC');
  res.end();
};

// Login Method
auth.login = function(req, res) {
  var userInfo = req.body.user;

  var loginUser = {
    userEmail: userInfo.userEmail,
    userPassword: userInfo.userPwd
  };

  // Log in the user with his informations
  userLogin({
    email    : loginUser.userEmail,
    password : loginUser.userPassword
  }, req, res);
};

// New user creation method
auth.create = function(req, res) {
  var userInfo = req.body.user;

  var newUser = {
    'userName': userInfo.userName,
    'userEmail': userInfo.userEmail,
    'userPassword': userInfo.userPwd
  };

  // Create a new user into firebase
  firebase.createUser({
    email    : newUser.userEmail,
    password : newUser.userPassword
  }, function(error, userData) {
    if (error) {
      console.log("Error creating user:", error);
      res.status(400).send(error);
    } else {
      console.log("Successfully created user account");

      var uid = JSON.stringify(userData.uid);

      // Set the user object
      var user = {
        uid: userData.uid,
        username: userInfo.userName,
        email: userInfo.userEmail,
        isAdmin: false
      };

      // Add the user and his informations to the database
      var usersRef = firebase.child("users");
      usersRef.push(user);

      userLogin({
        email    : newUser.userEmail,
        password : newUser.userPassword
      }, req, res);
      
    }
  });
};

module.exports = auth;
