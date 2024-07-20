
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    auth0Id: { type: String, required: true, unique: true },
    name: String,
    email: String,
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
