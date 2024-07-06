// Import the Router class from the 'express' package to create a new router object.
// This router will manage routing for specific paths in the application.
const routes = require('express').Router();

// Import the dashboardController from the controllers directory.
// This module contains the dashboard function which handles requests to the dashboard route.
const dashboardController = require('../controllers/dashboardController');

// Define a GET route for the base URL ('/') of this router.
// The dashboard function from the dashboardController will handle requests to this route.
// It's intended to render or return the dashboard page when the route is accessed.
routes.get('', dashboardController.dashboard);
routes.get('/vendingAll', dashboardController.vendingAll);

// Export the routes object so it can be used in other parts of the application,
// typically by including it in the main server file (e.g., app.js) where all routes are consolidated.
module.exports = routes;
