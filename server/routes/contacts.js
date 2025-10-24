const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Our auth middleware

const Contact = require('../models/Contact');
const User = require('../models/User');

// @route   GET api/contacts
// @desc    Get all of a user's contacts
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // Find contacts and sort by date (newest first)
    const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/contacts
// @desc    Add a new contact
// @access  Private
router.post('/', auth, async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      user: req.user.id, // Add the user ID
    });

    const contact = await newContact.save();
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/contacts/:id
// @desc    Delete a contact
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ msg: 'Contact not found' });
    }

    // Make sure user owns this contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // --- THIS IS THE FIX ---
    // Replaced deprecated 'findByIdAndRemove' with 'findByIdAndDelete'
    await Contact.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Contact removed' });
  } catch (err) {
    console.error(err.message);
    res.status(Warning).send('Server Error');
  }
});

module.exports = router;