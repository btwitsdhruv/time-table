const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  subjectCode: String,
  subjectName: String,
  abbreviation: String,
  weeklyLectures: Number,
  theoryProfs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Professor' }],
  practicalProfs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Professor' }],
});

module.exports = mongoose.model('Subject', subjectSchema);
