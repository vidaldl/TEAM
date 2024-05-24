// Require the Router class from the 'express' package to manage routes
const routes = require('express').Router();

// Import the contactController module from the controllers directory.
// This module contains functions for handling specific routes related to contacts.
const contactController = require('../controllers/contactsController');

// Define a GET route for the root URL '/' which will use the getContacts function 
// from contactController to retrieve and display all contacts.
routes.get('/', contactController.getContacts);

// Define a GET route for fetching a single contact by its ID.
// The ':id' in the URL is a placeholder for a dynamic parameter that will be the ID of the contact.
routes.get('/:id', contactController.getContactById);

// Define a POST route for the root URL '/' to create a new contact.
// This uses the createContact function from the contactController.
routes.post('/', contactController.createContact);

// Define a PUT route to update an existing contact.
// The ':id' is a parameter that will be replaced by the actual ID of the contact to be updated.
routes.put('/:id', contactController.updateContact);

// Define a DELETE route to remove a contact by its ID.
// The ':id' parameter will identify the contact that needs to be deleted.
routes.delete('/:id', contactController.deleteContact);

// Export the routes object so it can be used in other parts of the application.
// This is typically imported in the main server file (e.g., app.js) where all routes are consolidated.
module.exports = routes;
