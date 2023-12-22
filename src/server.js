const express = require('express');
const mongoose = require('mongoose');
const cardRoutes = require('./routes/cardRoutes');
const path = require('path');  // Added for static file serving
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

// Routes
app.use('/api', cardRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
