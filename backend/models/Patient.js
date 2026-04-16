const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
  disease: { type: String, required: true },
  status: { type: String, enum: ['Admitted', 'Discharged'], default: 'Admitted' },
  admissionDate: { type: Date, default: Date.now },
  dischargeDate: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
