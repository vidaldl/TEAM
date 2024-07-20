// routes/client.js (create this file if it doesn't exist)
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Company = require('../models/company');

// Middleware to ensure the user is authenticated
const ensureAuthenticated = (req, res, next) => {
    if (req.oidc.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

// Route to display the client edit form
router.get('/', ensureAuthenticated, async (req, res) => {
    const user = await User.findOne({ auth0Id: req.oidc.user.sub }).populate('company');
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.render('clientEdit', { user, company: user.company });
});

// Route to handle the client edit form submission
router.post('/edit', ensureAuthenticated, async (req, res) => {
    const user = await User.findOne({ auth0Id: req.oidc.user.sub });
    if (!user) {
        return res.status(404).send('User not found');
    }

    const { name, address, phone, email } = req.body;

    const company = await Company.findById(user.company);
    company.name = name;
    company.address = address;
    company.contact_info = { phone, email };
    await company.save();

    res.redirect('/client');
});

module.exports = router;
