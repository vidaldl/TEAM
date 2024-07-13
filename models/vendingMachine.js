const mongoose = require('mongoose');

const vendingMachineSchema = new mongoose.Schema({
  location: {
    address: String,
    coordinates: {
      lat: String,
      long: String,
    },
  },
  model: String,
  status: String,
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
});

const VendingMachine = mongoose.model('VendingMachine', vendingMachineSchema, 'vending_machines');
module.exports = VendingMachine;
