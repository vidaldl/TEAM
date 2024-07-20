// Import the Router class from the 'express' package to create a new router object.
// This router will manage routing for specific paths in the application.
const routes = require('express').Router();
const { requiresAuth } = require('express-openid-connect');

// Controller
const vendingController = require('../controllers/vendingController');


routes.get('/all', requiresAuth(), vendingController.vendingAll);
routes.get('/dashboard/:id',  requiresAuth(), vendingController.vendingDashboard);
routes.get('/generateQRCode/:id', vendingController.generateQRCode);
routes.get('/printQRCode/:id', vendingController.printQRCode);
routes.get('/add', requiresAuth(), vendingController.showAddVendingForm);
routes.post('/add', requiresAuth(), vendingController.addVendingMachine);

module.exports = routes;