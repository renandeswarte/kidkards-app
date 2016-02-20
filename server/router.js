var express = require('express');
var auth = require('./db/auth');
var aws_s3 = require('./db/aws');
var flashcard = require('./db/flashcard');
var categories = require('./db/categories');


var router = express.Router();

// Authentication Routes
router.post('/auth/user-login', auth.login);
router.post('/auth/user-create', auth.create);
router.get('/auth/logout', auth.logout);

// Flashcards Routes
router.get('/flashcard/getLastest', flashcard.getLastest);
router.post('/flashcard/create', flashcard.create);
router.get('/flashcard/:category', flashcard.getByCategory);
router.put('/flashcard/update-flashcard', flashcard.update);
router.delete('/flashcard/delete-flashcard/:id', flashcard.deleteCard);

// Categories Routes
router.get('/categories/getList', categories.getList);
router.post('/categories/create', categories.create);

// AWS Routes
router.get('/api/sign_s3', aws_s3.getSignedRequest);


module.exports = router;