const express = require('express');
const { getRooms, addRoom, assignRoom, vacateRoom } = require('../controllers/roomController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getRooms)
  .post(protect, addRoom);

router.put('/:id/assign', protect, assignRoom);
router.put('/:id/vacate', protect, vacateRoom);

module.exports = router;
