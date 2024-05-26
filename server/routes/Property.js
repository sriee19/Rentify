const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// Post property
router.post('/', async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.status(201).send(property);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find().populate('owner');
    res.send(properties);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get a property by ID
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('owner interestedBuyers');
    if (!property) return res.status(404).send('Property not found');
    res.send(property);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update property
router.put('/:id', async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!property) return res.status(404).send('Property not found');
    res.send(property);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete property
router.delete('/:id', async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) return res.status(404).send('Property not found');
    res.send('Property deleted');
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
