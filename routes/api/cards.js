const express = require('express');
const router = express.Router();
const cardsCtrl = require('../../controllers/api/cards');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// ALL paths start with /api/cards

// GET /api/cards/search
router.get('/search/:cardName', cardsCtrl.getCardByName);

module.exports = router;