const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  slotIndex: Number,
  joinedTimestamp: Date,
  isActive: Boolean,
});

module.exports = mongoose.model('Professor', professorSchema);
