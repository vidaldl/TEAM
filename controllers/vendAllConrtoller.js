// Define the dashboard route handler
const vendAll = (req, res) => {
    // Render the 'dashboard' view using the EJS template engine
    let userData = JSON.stringify(req.oidc.user);
    res.render('vendingAll', {data: userData});
};

// Export the dashboard handler so it can be imported and used in other parts of the application,
// typically where routes are defined.
module.exports = {
    vendAll
};