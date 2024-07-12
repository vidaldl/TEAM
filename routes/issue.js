// routes/issue.js
const routes = require('express').Router();
const issueController = require('../controllers/issueController');

routes.get('/report/:vendingMachineId', issueController.renderReportIssueForm);
routes.post('/reportIssue/:vendingMachineId', issueController.submitIssue);
routes.get('/thankYou', issueController.renderThankYouPage);

module.exports = routes;
