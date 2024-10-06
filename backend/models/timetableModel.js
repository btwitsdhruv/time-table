const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  deptId: String,
  day: Number,
  slotNo: Number,
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  type: Number,  // 0 = theory, 1 = lab
  groupId: String,
});

module.exports = mongoose.model('Timetable', timetableSchema);
