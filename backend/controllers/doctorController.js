const Doctor = require('../models/Doctor');

const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('department', 'name');
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addDoctor = async (req, res) => {
  try {
    const newDoctor = await Doctor.create(req.body);
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json({ message: 'Doctor removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDoctors, addDoctor, updateDoctor, deleteDoctor };
