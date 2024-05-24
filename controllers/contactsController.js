/**
 * 
 * THIS IS FOR REFERENCE ONLY! 
 * The final project will not have this.
 * 
 */

// Importing MongoDB connection setup from local 'db' module
const mongodb = require('../db/connect');
// Destructuring ObjectId from 'mongodb' to validate and convert string IDs
const { ObjectId } = require('mongodb'); 

// GET handler to retrieve all contacts from the 'contacts' collection
const getContacts = async (req, res, next) => {
  const result = await mongodb.getDb().db("cse341").collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists); 
  });
};

// GET handler to retrieve a single contact by its ID
const getContactById = async (req, res, next) => {
  const contactId = req.params.id;
  // Validate the format of the ID
  if (!ObjectId.isValid(contactId)) {
    return res.status(400).json({ message: 'Invalid contact ID format' });
  }
  const db = mongodb.getDb().db("cse341");
  const collection = db.collection('contacts');
  const result = await collection.findOne({ _id: new ObjectId(contactId) });
  if (!result) {
    return res.status(404).json({ message: 'Contact not found' });
  }
  res.status(200).json(result);
};

// POST handler to create a new contact in the 'contacts' collection
const createContact = async (req, res, next) => {
  const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
  };
  const result = await mongodb.getDb().db("cse341").collection('contacts').insertOne(contact);
  if (result.acknowledged) {
      res.status(201).json(result);
  } else {
      res.status(500).json({ message: "Failed to insert contact" });
  }
};

// PUT handler to update an existing contact by its ID
const updateContact = async (req, res, next) => {
  const contactId = new ObjectId(req.params.id);
  const updatedContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
  };
  const result = await mongodb.getDb()
      .db("cse341")
      .collection('contacts')
      .updateOne({ _id: contactId }, { $set: updatedContact });
  if (result.modifiedCount > 0) {
      res.status(204).end();
  } else {
      res.status(404).json({ message: "Contact not found" });
  }
};

// DELETE handler to remove a contact by its ID
const deleteContact = async (req, res, next) => {
  const contactId = new ObjectId(req.params.id);
  const result = await mongodb.getDb()
      .db("cse341")
      .collection('contacts')
      .deleteOne({ _id: contactId });
  if (result.deletedCount > 0) {
      res.status(204).end();
  } else {
      res.status(404).json({ message: "Contact not found" });
  }
};

// Exporting the handlers to use in other parts of the application
module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};
