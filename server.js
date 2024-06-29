// Import required modules
const express = require('express'); // Express web framework
const app = express(); // Create an instance of the Express application
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const port = 3000; // Port on which the server will listen

// Include the dotenv library, which loads environment variables from a .env file into process.env
const dotenv = require('dotenv');
// Call the config function on dotenv to actually load the variables
dotenv.config();
const { auth } = require('express-openid-connect');

// Parse JSON request bodies
app.use(bodyParser.json());

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', './views');

// Serve static files from the public directory
app.use(express.static('public'));

// Set Access-Control-Allow-Origin header to allow requests from any origin (*)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Auth Setup
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: 'http://localhost:3000',
  clientID: 'kUTj0pThkL70hWi47hOX46PK4Z6oe6KX',
  issuerBaseURL: 'https://dev-3spjq07b2t223qop.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

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
