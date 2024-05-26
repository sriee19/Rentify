const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const auth = require('../middleware/auth');

// Get all properties
router.get('/', auth, async (req, res) => {
  try {
    const properties = await Property.find();
    res.send(properties);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get property by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    res.send(property);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Like property
router.post('/:id/like', auth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    property.likes += 1;
    await property.save();
    res.send(property);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Express interest in property
router.post('/:id/interest', auth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    const seller = await User.findById(property.sellerId);
    const buyerEmail = req.body.buyerEmail;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
      },
    });

    await transporter.sendMail({
      from: 'rentify@gmail.com',
      to: buyerEmail,
      subject: 'Property Interest',
      text: `You expressed interest in ${property.title}. Contact the seller at ${seller.email}`,
    });

    await transporter.sendMail({
      from: 'rentify@gmail.com',
      to: seller.email,
      subject: 'New Interest in Your Property',
      text: `A buyer has shown interest in your property ${property.title}. Contact them at ${buyerEmail}`,
    });

    res.send('Interest noted and emails sent');
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
