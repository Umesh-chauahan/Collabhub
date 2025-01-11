import mongoose from "mongoose";

const hackathonSchema = new mongoose.Schema({
  email: { type: String},
  privacy: { type: String },
  type:{ type: String},
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  location: { type: String, required: true }, // For virtual events, can be a link
  registrationDeadline: { type: Date, required: true },
  prize: { type: String },
  rules: { type: String, required: true },
  attendees: [{
    teamName: { type: String, required: false },
    type: { type: String },
    name: {type:String},
    email:{type:String},
    role:{type:String}, // Only used for teams
    members: [
      {
        name: String,
        role: { type: String},
      }]}], 
 // Users who registered
});

export default mongoose.model('Hackathon', hackathonSchema);






