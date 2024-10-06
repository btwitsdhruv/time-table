const Professor = require('../models/professorModel');

// Create new professor
exports.createProfessor = async (req, res) => {
  const { firstName, middleName, lastName, slotIndex, isActive } = req.body;
  const professor = new Professor({
    firstName,
    middleName,
    lastName,
    slotIndex,
    joinedTimestamp: new Date(),
    isActive
  });
  try {
    const savedProfessor = await professor.save();
    res.status(201).json(savedProfessor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all professors
exports.getAllProfessors = async (req, res) => {
  try {
    console.log(req)
    const professors = await Professor.find();
    res.status(200).json(professors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get professor by ID
exports.getProfessorById = async (req, res) => {
  try {
    const professor = await Professor.findById(req.params.id);
    if (!professor) {
      return res.status(404).json({ message: 'Professor not found' });
    }
    res.status(200).json(professor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update professor
exports.updateProfessor = async (req, res) => {
  const { firstName, middleName, lastName, slotIndex, isActive } = req.body;
  try {
    const updatedProfessor = await Professor.findByIdAndUpdate(req.params.id, {
      firstName,
      middleName,
      lastName,
      slotIndex,
      isActive
    }, { new: true });
    res.status(200).json(updatedProfessor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete professor
exports.deleteProfessor = async (req, res) => {
  try {
    await Professor.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Professor deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
