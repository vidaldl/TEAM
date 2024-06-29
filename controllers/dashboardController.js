

// Define the dashboard route handler
const dashboard = (req, res) => {
    // Render the 'dashboard' view using the EJS template engine
    let userData = JSON.stringify(req.oidc.user);
    res.render('dashboard', {data: userData});
};

const vendingAll = (req, res) => {
    res.render('vendingAll');
}

// Export the dashboard handler so it can be imported and used in other parts of the application,
// typically where routes are defined.
module.exports = {
    dashboard,
    vendingAll
};
