var Firebase = require('firebase');
var firebase = new Firebase(process.env.FIREBASE_ADDRESS + '/');
var bodyParser = require('body-parser');

var categoriesMethod = {};

categoriesMethod.getList = function(req, res) {
  var categoriesRef = new Firebase(process.env.FIREBASE_ADDRESS + '/categories/');

  // Attach an asynchronous callback to read the data at our posts reference
  categoriesRef.once("value", function(snapshot) {
    res.json(snapshot.val());
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
};

categoriesMethod.create = function(req, res, next) {
  var newCategory = req.body;

  // Create object of different Flat UI colors and add one to the new category randomly
  var flatColor = ['#2ecc71', '#00a1e0', '#9b59b6', '#34495e','#f39c12', '#e67e22', '#e74c3c', '#16a085', '#1F3A93'];
  var random = Math.floor((Math.random() * flatColor.length - 1) + 1);
  newCategory.color = flatColor[random];

  // Add the new category to the DB
  var categoryRef = firebase.child("categories");
  categoryRef.push(newCategory, function(error, authData) {
    if (error) {
      console.log("saving Failed!", error);
      res.status(400).send(error);
    } else {
      //console.log("category saved");
      res.send(200);
    };
  });
};

module.exports = categoriesMethod;

