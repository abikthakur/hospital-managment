const express = require('express');
const { getDoctors, addDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctorController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getDoctors)
  .post(protect, addDoctor);

router.route('/:id')
  .put(protect, updateDoctor)
  .delete(protect, deleteDoctor);

module.exports = router;
