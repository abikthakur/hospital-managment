const Room = require('../models/Room');
const Patient = require('../models/Patient');

const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate('currentPatient', 'name');
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const assignRoom = async (req, res) => {
  try {
    const { patientId } = req.body;
    const room = await Room.findById(req.params.id);

    if (!room) return res.status(404).json({ message: 'Room not found' });
    if (!room.isAvailable) return res.status(400).json({ message: 'Room is already occupied' });

    room.isAvailable = false;
    room.currentPatient = patientId;
    await room.save();

    res.json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const vacateRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    room.isAvailable = true;
    room.currentPatient = null;
    await room.save();
    
    res.json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = { getRooms, addRoom, assignRoom, vacateRoom };
