var Firebase = require('firebase');
var firebase = new Firebase(process.env.FIREBASE_ADDRESS + '/');
var bodyParser = require('body-parser');


var flashCardMethod = {};

flashCardMethod.create = function(req, res, next) {
  var newFc = req.body.flashCard;

  var newFcData = {
    definition: newFc.definition,
    category: newFc.categoryName,
    picture: newFc.picture,
    isImg: newFc.img,
    term: newFc.term
  };

  var flashcardRef = firebase.child("flashcards");
  flashcardRef.push(newFcData, function(error, authData) {
    if (error) {
      console.log("saving Failed!", error);
      res.status(400).send(error);
    } else {
      //console.log("flashcard saved");
      res.sendStatus(200);
    };
  });
};

flashCardMethod.getLastest = function(req, res) {
  var flashcardRef = new Firebase(process.env.FIREBASE_ADDRESS + '/flashcards/');

  // Get the last 6 flashcards once
  flashcardRef.limitToLast(8).once("value", function(snapshot) {
    res.json(snapshot.val());
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
};

flashCardMethod.getByCategory = function(req, res) {
  var flashcardRef = new Firebase(process.env.FIREBASE_ADDRESS + '/flashcards/');
  var category = req.params.category;

  // Get all flashcard from a specific category
  flashcardRef.orderByChild("category").equalTo(category).once("value", function(snapshot) {
    res.json(snapshot.val());
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
};

flashCardMethod.update = function(req, res) {
  var cardId = req.body.id;
  var cardDefinition = req.body.definition;
  var flashcardRef = new Firebase(process.env.FIREBASE_ADDRESS + '/flashcards/' + cardId);

  var onComplete = function(error) {
    if (error) {
      console.log('Synchronization failed');
      res.status(400).send(error);
    } else {
      //console.log('Synchronization succeeded');
      res.sendStatus(200);
    }
  };
  flashcardRef.update({ definition: cardDefinition }, onComplete);
};

flashCardMethod.deleteCard = function(req, res) {
  var cardId = req.params.id;

  var flashcardRef = new Firebase(process.env.FIREBASE_ADDRESS + '/flashcards/' + cardId);

  var onComplete = function(error) {
    if (error) {
      console.log('Synchronization failed');
      res.status(400).send(error);
    } else {
      //console.log('Synchronization succeeded');
      res.sendStatus(200);
    }
  };
  flashcardRef.remove(onComplete);
};

module.exports = flashCardMethod;

