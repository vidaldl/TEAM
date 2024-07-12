// scripts/generateIssues.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const VendingMachine = require('../models/vendingMachine');
const Issue = require('../models/issue');

const generateRandomIssues = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const vendingMachines = await VendingMachine.find();
    const issueTypes = ['out_of_stock', 'maintenance'];
    const maintenanceDescriptions = ['Power Issue', 'Food Stuck', 'Payment Issue', 'Display Issue', 'Door Jammed'];
    const outOfStockDescriptions = ['Soda', 'Chips', 'Candy', 'Water', 'Snack'];

    for (const machine of vendingMachines) {
      for (let i = 0; i < 5; i++) {
        const issueType = issueTypes[Math.floor(Math.random() * issueTypes.length)];
        const description = issueType === 'maintenance'
          ? maintenanceDescriptions[Math.floor(Math.random() * maintenanceDescriptions.length)]
          : outOfStockDescriptions[Math.floor(Math.random() * outOfStockDescriptions.length)];

        const newIssue = new Issue({
          vendingMachine: machine._id,
          issueType,
          description,
        });

        await newIssue.save();
      }
    }

    console.log('Random issues generated successfully!');
    process.exit();
  } catch (error) {
    console.error('Error generating random issues:', error);
    process.exit(1);
  }
};

generateRandomIssues();
