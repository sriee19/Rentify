const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PropertySchema = new Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  place: String,
  area: Number,
  bedrooms: Number,
  bathrooms: Number,
  nearbyHospitals: [String],
  nearbyColleges: [String],
  interestedBuyers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Property', PropertySchema);