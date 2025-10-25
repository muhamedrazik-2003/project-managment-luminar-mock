const express = require('express');
const router = express.Router();

const projectController = require('../controllers/projectController');

router.post('/add', projectController.addProject);
router.put('/update/:projectId', projectController.editProject);
router.get('/all', projectController.getAllprojects);
router.delete('/delete/:projectId', projectController.deleteProject);

module.exports = router;