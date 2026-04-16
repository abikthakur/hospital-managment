const express = require('express');
const { getPatients, getPatientById, addPatient, updatePatient, deletePatient } = require('../controllers/patientController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getPatients)
  .post(protect, addPatient);

router.route('/:id')
  .get(protect, getPatientById)
  .put(protect, updatePatient)
  .delete(protect, deletePatient);

module.exports = router;
