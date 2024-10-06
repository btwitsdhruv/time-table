const Timetable = require('../models/timetableModel');

// Create a new timetable entry
exports.createTimetable = async (req, res) => {
  const { deptId, day, slotNo, subject, type, groupId } = req.body;
  const timetable = new Timetable({
    deptId,
    day,
    slotNo,
    subject,
    type,
    groupId
  });
  try {
    const savedTimetable = await timetable.save();
    res.status(201).json(savedTimetable);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all timetable entries
exports.getAllTimetables = async (req, res) => {
  try {
    const timetables = await Timetable.find().populate('subject');
    res.status(200).json(timetables);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get timetable entry by ID
exports.getTimetableById = async (req, res) => {
  try {
    const timetable = await Timetable.findById(req.params.id).populate('subject');
    if (!timetable) {
      return res.status(404).json({ message: 'Timetable not found' });
    }
    res.status(200).json(timetable);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update timetable
exports.updateTimetable = async (req, res) => {
  const { deptId, day, slotNo, subject, type, groupId } = req.body;
  try {
    const updatedTimetable = await Timetable.findByIdAndUpdate(req.params.id, {
      deptId,
      day,
      slotNo,
      subject,
      type,
      groupId
    }, { new: true });
    res.status(200).json(updatedTimetable);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete timetable entry
exports.deleteTimetable = async (req, res) => {
  try {
    await Timetable.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Timetable entry deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
