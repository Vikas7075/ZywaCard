const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cardRoutes = require('./routes/cardRoutes');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files (like CSV files) from the 'data' directory
app.use('/data', express.static(path.join(__dirname, 'data')));

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Example route for CSV file upload
app.post('/upload_csv', upload.single('file'), (req, res) => {
    try {
        // Access the uploaded file through req.file
        const csvData = req.file.buffer.toString();

        // Process and update the database or perform other actions here
        // For simplicity, let's just log the CSV data
        console.log(csvData);

        res.json({ success: true, message: 'CSV file uploaded successfully.' });
    } catch (error) {
        console.error('Error uploading CSV file:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Routes
app.use('/api', cardRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
