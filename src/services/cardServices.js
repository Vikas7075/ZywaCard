const Card = require('../models/cardModel');
const csvParser = require('csv-parser');
const fs = require('fs');

const processCSVData = (filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
};

const updateDatabase = async () => {
    try {
        const pickupData = await processCSVData('/datadata/Pickup.csv');
        const deliveryExceptionsData = await processCSVData('/data/Delivery exceptions.csv');
        const deliveredData = await processCSVData('/data/Delivered.csv');
        const returnedData = await processCSVData('/data/Returned.csv');

        // Assuming cardId is the common identifier in all CSVs
        const allData = [...pickupData, ...deliveryExceptionsData, ...deliveredData, ...returnedData];

        // Iterate through the data and update the database
        for (const data of allData) {
            await Card.findOneAndUpdate({ cardId: data.cardId }, { $set: data }, { upsert: true });
        }

        console.log('Database updated successfully.');
    } catch (error) {
        console.error('Error updating database:', error);
    }
};

const getCardStatus = async (phoneNumber, cardId) => {
    try {
        // If phoneNumber is provided, find card by phoneNumber
        if (phoneNumber) {
            const card = await Card.findOne({ phoneNumber });
            return card ? card.status : 'Card not found';
        }

        // If cardId is provided, find card by cardId
        if (cardId) {
            const card = await Card.findOne({ cardId });
            return card ? card.status : 'Card not found';
        }

        return 'Invalid request. Provide phoneNumber or cardId.';
    } catch (error) {
        console.error('Error retrieving card status:', error);
        return 'Internal Server Error';
    }
};

module.exports = { updateDatabase, getCardStatus };
