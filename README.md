# Card Status API

This project implements a simple API to manage and query the status of user cards. It leverages Node.js, Express.js, and MongoDB. The API allows users to upload CSV files containing card status information, stores the data in MongoDB, and provides an endpoint to query the current status of a user's card.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Technologies Used](#technologies-used)
- [Why These Technologies](#why-these-technologies)

## Installation

1. Clone the repository:

   git clone https://github.com/vikas7075/card-status-api.git

2. Install dependencies:

   cd card-status-api

   npm install

3. Start the server:

   npm start

   The server will run on `http://localhost:3001`.

## Usage

1. **Upload CSV File:**

   Use the `/api/upload` endpoint to upload a CSV file containing card status information.

   Example using `curl`:

   curl -X POST -H "Content-Type: multipart/form-data" -F "csvFile=@/path/to/your/file.csv" http://localhost:3001/api/upload

   Replace `/path/to/your/file.csv` with the actual path to your CSV file.

2. **Get Card Status:**

   Use the `/api/get_card_status` endpoint to query the current status of a user's card. Provide either the `phone` or `cardId` as a query parameter.

   Example:

   - Query by phone number:

     http://localhost:3001/api/get_card_status?phone=123456789

   - Query by card ID:

     http://localhost:3001/api/get_card_status?cardId=ABC123

## Endpoints

- `/api/upload` (POST): Uploads a CSV file containing card status information.
- `/api/get_card_status` (GET): Queries the current status of a user's card based on phone number or card ID.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- csv-parser

## Why These Technologies

- **Node.js and Express.js:**

  - Lightweight and efficient for building server-side applications.
  - Non-blocking I/O for handling concurrent requests.
  - Ideal for building RESTful APIs.

- **MongoDB and Mongoose:**

  - MongoDB is a NoSQL database, providing flexibility in handling dynamic data structures.
  - Mongoose is an ODM (Object Data Modeling) library for MongoDB, simplifying interaction with the database.

- **Multer:**

  - Middleware for handling file uploads.
  - Used to process and store CSV files containing card status information.

- **csv-parser:**
  - Library for parsing CSV files.
  - Used to extract data from uploaded CSV files for storage in MongoDB.
