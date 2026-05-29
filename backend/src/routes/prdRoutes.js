import express from 'express';
import { generatePRD, refinePRD, getUserProjects, getProjectById } from '../controllers/prdController.js';

const router = express.Router();

// Route to generate a new PRD from a raw idea
router.post('/generate', generatePRD);

// Route to converse and refine an existing PRD
router.post('/:id/refine', refinePRD);

// Route to get all projects for the mocked user
router.get('/', getUserProjects);

// Route to get a specific project by ID
router.get('/:id', getProjectById);

export default router;
