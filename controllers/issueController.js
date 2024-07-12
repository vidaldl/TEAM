
const Issue = require('../models/issue');
const VendingMachine = require('../models/vendingMachine');

const renderReportIssueForm = async (req, res) => {
  const vendingMachineId = req.params.vendingMachineId;
  res.render('reportIssue', { vendingMachineId });
};

const submitIssue = async (req, res) => {
  try {
    const { issueType, description } = req.body; // Destructure form data
    const vendingMachineId = req.params.vendingMachineId;

    if (!issueType || !description) {
      throw new Error('Issue type and description are required.');
    }

    const newIssue = new Issue({
      vendingMachine: vendingMachineId,
      issueType,
      description,
    });

    await newIssue.save();
    res.redirect('/issues/thankYou');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const renderThankYouPage = (req, res) => {
  res.render('thankYou');
};


module.exports = {
  renderReportIssueForm,
  submitIssue,
  renderThankYouPage,
};
