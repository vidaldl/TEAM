const routes = require('express').Router();

// Controllers
const mainController = require('../controllers/vendAllController');

// Home route
routes.get('/', mainController.home);

// Contacts route
routes.use('/contacts', require('./contacts'));

// Dashboard route
routes.use('/dashboard', require('./dashboard'));

// Home route
routes.get('', vendAllController.vendAll);

// Export routes
module.exports = routes;