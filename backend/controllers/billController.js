const Bill = require('../models/Bill');
const Patient = require('../models/Patient');

const getBills = async (req, res) => {
  try {
    const bills = await Bill.find().populate('patient', 'name contact');
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const generateBill = async (req, res) => {
  try {
    const { patientId, roomCharges, doctorFees, medicineCharges, otherCharges, status } = req.body;
    
    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    const totalAmount = Number(roomCharges) + Number(doctorFees) + Number(medicineCharges) + Number(otherCharges);

    const bill = await Bill.create({
      patient: patientId,
      roomCharges,
      doctorFees,
      medicineCharges,
      otherCharges,
      totalAmount,
      status: status || 'Unpaid'
    });

    res.status(201).json(bill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateBillStatus = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) return res.status(404).json({ message: 'Bill not found' });

    bill.status = req.body.status || 'Paid';
    await bill.save();

    res.json(bill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getBills, generateBill, updateBillStatus };
