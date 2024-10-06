const Subject = require("../models/subjectModel");

// Create a new subject
exports.createSubject = async (req, res) => {
  const {
    subjectCode,
    subjectName,
    abbreviation,
    weeklyLectures,
    theoryProfs,
    practicalProfs,
  } = req.body;
  const subject = new Subject({
    subjectCode,
    subjectName,
    abbreviation,
    weeklyLectures,
    theoryProfs,
    practicalProfs,
  });
  try {
    const savedSubject = await subject.save();
    res.status(201).json(savedSubject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all subjects
// exports.getAllSubjects = async (req, res) => {
//   try {
//     const subjects = await Subject.find().populate('theoryProfs practicalProfs');
//     res.status(200).json(subjects);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find()
      .populate("theoryProfs", "firstName") // Populate theoryProfs with only the 'name' field
      .populate("practicalProfs", "firstName"); // Populate practicalProfs with only the 'name' field

    res.status(200).json(subjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get subject by ID
exports.getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id).populate(
      "theoryProfs practicalProfs"
    );
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    res.status(200).json(subject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update subject
exports.updateSubject = async (req, res) => {
  const {
    subjectCode,
    subjectName,
    abbreviation,
    weeklyLectures,
    theoryProfs,
    practicalProfs,
  } = req.body;
  try {
    const updatedSubject = await Subject.findByIdAndUpdate(
      req.params.id,
      {
        subjectCode,
        subjectName,
        abbreviation,
        weeklyLectures,
        theoryProfs,
        practicalProfs,
      },
      { new: true }
    );
    res.status(200).json(updatedSubject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete subject
exports.deleteSubject = async (req, res) => {
  try {
    await Subject.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
