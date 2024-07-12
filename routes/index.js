const routes = require('express').Router();


// Controllers
const mainController = require('../controllers/mainController');
const { requiresAuth } = require('express-openid-connect');




// Home route
routes.get('/', mainController.home);

// Dashboard route
routes.use('/dashboard', requiresAuth(), require('./dashboard'));

// Vending routes
routes.use('/vending', requiresAuth(), require('./vending'));

// Issue routes
routes.use('/issues', require('./issue'));

// Export routes
module.exports = routes;