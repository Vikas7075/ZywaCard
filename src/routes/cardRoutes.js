const express = require('express');
const cardController = require('../controllers/cardController');

const router = express.Router();

router.get('/get_card_status/:phoneNumber/:cardId', cardController.getCardStatus);

module.exports = router;
