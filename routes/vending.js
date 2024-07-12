// Import the Router class from the 'express' package to create a new router object.
// This router will manage routing for specific paths in the application.
const routes = require('express').Router();

// Controller
const vendingController = require('../controllers/vendingController');


routes.get('/all', vendingController.vendingAll);
routes.get('/dashboard/:id', vendingController.vendingDashboard);
routes.get('/generateQRCode/:id', vendingController.generateQRCode);
routes.get('/printQRCode/:id', vendingController.printQRCode);

module.exports = routes;