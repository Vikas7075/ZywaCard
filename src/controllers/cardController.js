const cardService = require('../services/cardServices');

const getCardStatus = async (req, res) => {
    try {
        const { phoneNumber, cardId } = req.params;
        const cardStatus = await cardService.getCardStatus(phoneNumber, cardId);
        res.json({ status: cardStatus });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getCardStatus };
