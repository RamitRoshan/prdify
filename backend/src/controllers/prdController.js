import Project from '../models/Project.js';
import { generateInitialPRD, refineExistingPRD } from '../services/ai/claudeService.js';

// @desc    Generate a new PRD
// @route   POST /api/prds/generate
// @access  Public
const generatePRD = async (req, res, next) => {
  try {
    const { rawIdea, category, audience, platform } = req.body;

    if (!rawIdea) {
      res.status(400);
      throw new Error('Please provide a raw idea to generate the PRD.');
    }

    const { prdMarkdown, title } = await generateInitialPRD({ rawIdea, category, audience, platform });

    // Save the plan to DB
    const project = new Project({
      userId: 'mock-user-1',
      title: title || 'Untitled Project',
      category: category || 'General',
      rawIdea,
      prdMarkdown,
      chatHistory: [
        { role: 'user', content: `Generate PRD for: ${rawIdea}` },
        { role: 'assistant', content: prdMarkdown }
      ]
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    next(error);
  }
};

// @desc    Converse with AI to refine PRD
// @route   POST /api/prds/:id/refine
// @access  Public
const refinePRD = async (req, res, next) => {
  try {
    const { message } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }

    if (!message) {
      res.status(400);
      throw new Error('Please provide a message to refine the PRD.');
    }

    const { updatedMarkdown, assistantReply } = await refineExistingPRD(project, message);

    project.prdMarkdown = updatedMarkdown;
    project.chatHistory.push({ role: 'user', content: message });
    project.chatHistory.push({ role: 'assistant', content: assistantReply });

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all user projects
// @route   GET /api/prds
// @access  Public
const getUserProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ userId: 'mock-user-1' }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single project by ID
// @route   GET /api/prds/:id
// @access  Public
const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }
    res.json(project);
  } catch (error) {
    next(error);
  }
};

export { generatePRD, refinePRD, getUserProjects, getProjectById };
