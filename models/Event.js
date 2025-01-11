import mongoose from "mongoose";
import Hackathon from "./Hackathon.js";

const RegistrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Hackathon', required: true },
  type: { type: String, enum: ['individual', 'team'], required: true },
  teamName: { type: String, default: '' }, // Optional for team registrations
  teamMembers: [{ type: String }], // Array of team members for team registrations
});

export default mongoose.model('Registration', RegistrationSchema);
