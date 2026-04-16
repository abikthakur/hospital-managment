const express = require('express');
const { getBills, generateBill, updateBillStatus } = require('../controllers/billController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getBills)
  .post(protect, generateBill);

router.put('/:id/status', protect, updateBillStatus);

module.exports = router;
