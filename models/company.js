const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: String,
  address: String,
  contact_info: {
    phone: String,
    email: String,
  },
});

const Company = mongoose.model('Company', companySchema, 'companies');
module.exports = Company;
