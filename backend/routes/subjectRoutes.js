// const express = require('express');
// const router = express.Router();
// const subjectController = require('../controllers/subjectController');

// router.post('/', subjectController.createSubject);
// router.get('/', subjectController.getAllSubjects);
// router.get('/:id', subjectController.getSubjectById);
// router.put('/:id', subjectController.updateSubject);
// router.delete('/:id', subjectController.deleteSubject);

// module.exports = router;

//new changes


const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');

// Create a new subject
router.post('/', subjectController.createSubject);

// Get all subjects
router.get('/', subjectController.getAllSubjects);

// Get subject by ID
router.get('/:id', subjectController.getSubjectById);

// Update subject
router.put('/:id', subjectController.updateSubject);

// Delete subject
router.delete('/:id', subjectController.deleteSubject);

module.exports = router;

