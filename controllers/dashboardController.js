
const VendingMachine = require('../models/vendingMachine');
const Issue = require('../models/issue');
// Define the dashboard route handler
const dashboard = async (req, res) => {
    try {
        const outOfStockSummary = await Issue.aggregate([
            { $match: { issueType: 'out_of_stock' } },
            {
            $group: {
                _id: '$vendingMachine',
                itemCount: { $sum: 1 },
            },
            },
            {
            $lookup: {
                from: 'vending_machines',
                localField: '_id',
                foreignField: '_id',
                as: 'vendingMachine',
            },
            },
            { $unwind: '$vendingMachine' },
        ]);

        // Fetch and summarize maintenance issues
        const maintenanceSummary = await Issue.aggregate([
            { $match: { issueType: 'maintenance' } },
            {
            $group: {
                _id: '$vendingMachine',
                itemCount: { $sum: 1 },
            },
            },
            {
            $lookup: {
                from: 'vending_machines',
                localField: '_id',
                foreignField: '_id',
                as: 'vendingMachine',
            },
            },
            { $unwind: '$vendingMachine' },
        ]);
        // Render the 'dashboard' view using the EJS template engine
        let userData = JSON.stringify(req.oidc.user);
        res.render('dashboard', {
            outOfStockSummary,
            maintenanceSummary,
            userData,
        });
    } catch (error) {
        res.status(500).send(error.message);
      }
};  



// Export the dashboard handler so it can be imported and used in other parts of the application,
// typically where routes are defined.
module.exports = {
    dashboard
};
