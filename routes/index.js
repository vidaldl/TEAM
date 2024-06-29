const routes = require('express').Router();


// Controllers
const mainController = require('../controllers/mainController');
const { requiresAuth } = require('express-openid-connect');




// Home route
routes.get('/', mainController.home);

// Contacts route
routes.use('/contacts', require('./contacts'));

// Dashboard route
routes.use('/dashboard', requiresAuth(), require('./dashboard'));

// Vending routes
routes.use('/vending', requiresAuth(), require('./vending'));

// Export routes
module.exports = routes;