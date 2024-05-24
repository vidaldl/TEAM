// Include the dotenv library, which loads environment variables from a .env file into process.env
const dotenv = require('dotenv');
// Call the config function on dotenv to actually load the variables
dotenv.config();

// Include the MongoClient part of the mongodb package, which allows connecting to and interacting with a MongoDB database
const MongoClient = require('mongodb').MongoClient;

// Declare a variable to hold the database connection
let _db;

// Function to initialize the database connection
const initDb = (callback) => {
  // Check if the database is already initialized
  if (_db) {
    console.log('Db is already initialized!');
    // If it is, call the callback function without error and return the database
    return callback(null, _db);
  }
  // Connect to the MongoDB using the URI stored in environment variables
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      // If connection is successful, store the client in _db
      _db = client;
      // Call the callback function, indicating success by passing null for the error and the database client
      callback(null, _db);
    })
    .catch((err) => {
      // If there is an error during connection, pass the error to the callback
      callback(err);
    });
};

// Function to get the database connection
const getDb = () => {
  // Check if _db has not been initialized
  if (!_db) {
    // If _db is not initialized, throw an error
    throw Error('Db not initialized');
  }
  // Return the database connection
  return _db;
};

// Export the initDb and getDb functions so they can be used in other parts of the application
module.exports = {
  initDb,
  getDb,
};
