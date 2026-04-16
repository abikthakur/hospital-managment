const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Room = require('../models/Room');
const Bill = require('../models/Bill');

// @route   GET /api/dashboard/stats
const getDashboardStats = async (req, res) => {
  try {
    const totalPatients = await Patient.countDocuments();
    const totalDoctors = await Doctor.countDocuments();
    const totalRooms = await Room.countDocuments();
    const availableRooms = await Room.countDocuments({ isAvailable: true });
    const totalRevenueResult = await Bill.aggregate([
      { $match: { status: 'Paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const totalRevenue = totalRevenueResult.length > 0 ? totalRevenueResult[0].total : 0;

    const recentPatients = await Patient.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      totalPatients,
      totalDoctors,
      totalRooms,
      availableRooms,
      totalRevenue,
      recentPatients
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardStats };
