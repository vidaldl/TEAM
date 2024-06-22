const routes = require('express').Router();

// Controllers
const mainController = require('../controllers/mainController');

// Home route
routes.get('/', mainController.home);

// Contacts route
routes.use('/contacts', require('./contacts'));

// Dashboard route
routes.use('/dashboard', require('./dashboard'));

// Vending All route
routes.use('/vendingAll', require('./vendingAll'))

// Export routes
module.exports = routes;