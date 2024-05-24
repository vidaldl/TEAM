// Import required modules
const express = require('express'); // Express web framework
const app = express(); // Create an instance of the Express application
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const port = 3000; // Port on which the server will listen

// Define middleware and routes

// Parse JSON request bodies
app.use(bodyParser.json());

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', './views');

// Set Access-Control-Allow-Origin header to allow requests from any origin (*)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Mount routes defined in ./routes/index.js
app.use('/', require('./routes'));

// Connect to MongoDB database

// Import the MongoDB connection initializer
const mongodb = require('./db/connect');

// Call the initDb function to initialize the database connection
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    // If the database connection is successful, start the server
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});