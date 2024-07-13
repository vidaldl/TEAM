
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issueSchema = new Schema({
  vendingMachine: { type: Schema.Types.ObjectId, ref: 'VendingMachine', required: true },
  issueType: { type: String, enum: ['out_of_stock', 'maintenance'], required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['reported', 'in_progress', 'resolved'], default: 'reported' },
  reportedAt: { type: Date, default: Date.now }
});

const Issue = mongoose.model('Issue', issueSchema);
module.exports = Issue;
