import mongoose from 'mongoose';

const projectSchema = mongoose.Schema(
  {
    userId: {
      type: String, // String instead of ObjectId for simplicity without strict auth
      required: true,
      default: 'mock-user-1'
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    rawIdea: {
      type: String,
      required: true,
    },
    // The complete generated PRD in markdown format
    prdMarkdown: {
      type: String,
      required: true,
    },
    // Conversational history for refining the PRD
    chatHistory: [
      {
        role: { type: String, enum: ['user', 'assistant'] },
        content: { type: String }
      }
    ],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
