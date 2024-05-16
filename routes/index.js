const routes = require('express').Router();

// Controllers
const nameController = require('../controllers/nameController');



routes.get('/', nameController.enmanuel); 

routes.use('/contacts', require('./contacts'));


module.exports = routes