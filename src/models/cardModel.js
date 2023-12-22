const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    cardId: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    status: { type: String, required: true },
    // Add other necessary fields
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
