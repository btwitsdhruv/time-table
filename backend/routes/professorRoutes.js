// const express = require('express');
// const router = express.Router();
// const professorController = require('../controllers/professorController');

// router.post('/', professorController.createProfessor);
// router.get('/', professorController.getAllProfessors);
// router.get('/:id', professorController.getProfessorById);
// router.put('/:id', professorController.updateProfessor);
// router.delete('/:id', professorController.deleteProfessor);

// module.exports = router;


const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professorController');

// GET all professors
router.get('/', professorController.getAllProfessors);

// GET a single professor by ID
router.get('/:id', professorController.getProfessorById);

// POST create a new professor
router.post('/', professorController.createProfessor);

// PUT update a professor by ID
router.put('/:id', professorController.updateProfessor);

// DELETE remove a professor by ID
router.delete('/:id', professorController.deleteProfessor);

module.exports = router;

