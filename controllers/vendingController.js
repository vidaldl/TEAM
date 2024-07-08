const vendingAll = (req, res) => {
    res.render('vendingAll');
}

const vendingEdit = (req, res) => {
    res.render('vendingEdit');
}

// Export the dashboard handler so it can be imported and used in other parts of the application,
// typically where routes are defined.
module.exports = {
    vendingAll,
    vendingEdit
};
