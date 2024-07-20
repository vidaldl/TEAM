
const User = require('../models/user');
const Company = require('../models/company');

const checkUser = async (req, res, next) => {
    if (!req.oidc || !req.oidc.user) {
        return next();
    }

    const auth0Id = req.oidc.user.sub;
    const name = req.oidc.user.name;
    const email = req.oidc.user.email;

    try {
        let user = await User.findOne({ auth0Id: auth0Id });
        if (!user) {
            // Create a new company
            const company = new Company({});
            await company.save();

            // Create a new user and link the company
            user = new User({ auth0Id, name, email, company: company._id });
            await user.save();
        }
        req.user = user;
    } catch (error) {
        console.error('Error checking/creating user:', error);
    }

    next();
};

module.exports = checkUser;
