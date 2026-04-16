const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  type: { type: String, required: true, enum: ['General', 'Semi-Private', 'Private', 'ICU'] },
  floor: { type: String },
  pricePerDay: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  currentPatient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', default: null }
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
