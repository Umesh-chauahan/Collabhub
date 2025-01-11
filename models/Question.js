import mongoose from 'mongoose';

// Define the schema for a Question
const questionSchema = new mongoose.Schema({
  user:{
    type: String,
    required: true,
  },
  question: {
    type: String,   // The question is a string
    required: true, // It is required to have a question
    trim: true,     // Remove any leading or trailing spaces
  },
  answers: {
    type: [Object], // Answers will be an array of strings
    default: [],    // Default to an empty array if no answers are provided
  }
}, {
  timestamps: true,  // Automatically adds createdAt and updatedAt fields
});

// Create a model for the Question schema
export default mongoose.model('Question', questionSchema);

 
