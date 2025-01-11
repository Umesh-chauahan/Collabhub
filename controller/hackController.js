import Registration from "../models/Event.js"
import Hackathon from "../models/Hackathon.js";
import Question from "../models/Question.js";
//create hackathons
export const createHackathon =async(req,res)=>{
const {email, name, description, date, startTime, endTime, location, registrationDeadline, prize, rules, type,privacy} = req.body
try {
    const hackathon = new Hackathon({
      email,
      name,
      description,
      date,
      startTime,
      endTime,
      location,
      registrationDeadline,
      prize,
      rules,
      type, 
      privacy, 
    });
    
    await hackathon.save();
    res.status(201).json({ message: 'Hackathon event created successfully', hackathon });
  } catch (error) {
    res.status(500).json({ message: 'Error creating Hackathon event', error });
  }
}

//get all collabs
export const collabs = async (req, res) => {
  try {
    const currentDate = new Date();

    // Get upcoming events (date >= currentDate) sorted by date ascending
    const upcomingEvents = await Hackathon.find({ date: { $gte: currentDate },type:'collab' })
      .sort({ date: 1 }); // Upcoming events are sorted by date in ascending order

    // Get past events (date < currentDate) sorted by date descending (most recent first)
    const pastEvents = await Hackathon.find({ date: { $lt: currentDate },type:'collab' })
      .sort({ date: -1 }); // Past events are sorted by date in descending order (most recent)

    // Combine the two arrays: first upcoming events, then past events
    const allEvents = [...upcomingEvents, ...pastEvents];
    // Send response with all events
    res.status(200).json({ allEvents });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
};

export const studygroup = async (req, res) => {
  try {
    const currentDate = new Date();

    // Get upcoming events (date >= currentDate) sorted by date ascending
    const upcomingEvents = await Hackathon.find({ date: { $gte: currentDate },type:'' })
      .sort({ date: 1 }); // Upcoming events are sorted by date in ascending order

    // Get past events (date < currentDate) sorted by date descending (most recent first)
    const pastEvents = await Hackathon.find({ date: { $lt: currentDate },type:'' })
      .sort({ date: -1 }); // Past events are sorted by date in descending order (most recent)

    // Combine the two arrays: first upcoming events, then past events
    const allEvents = [...upcomingEvents, ...pastEvents];
    // Send response with all events
    res.status(200).json({ allEvents });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
};


// Get all events: upcoming first and past events later
export const events = async (req, res) => {
  try {
    const currentDate = new Date();

    // Get upcoming events (date >= currentDate) sorted by date ascending
    const upcomingEvents = await Hackathon.find({ date: { $gte: currentDate },type:'event' })
      .sort({ date: 1 }); // Upcoming events are sorted by date in ascending order

    // Get past events (date < currentDate) sorted by date descending (most recent first)
    const pastEvents = await Hackathon.find({ date: { $lt: currentDate },type:'event' })
      .sort({ date: -1 }); // Past events are sorted by date in descending order (most recent)

    // Combine the two arrays: first upcoming events, then past events
    const allEvents = [...upcomingEvents, ...pastEvents];
    // Send response with all events
    res.status(200).json({ allEvents });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
};



//USer REgister for event 
export const Register =  async (req, res) => {
  const { name, email, eventId, type, teamName, teamMembers } = req.body;

  try {
    // Check if the event exists
    const event = await Hackathon.findById(eventId);
    // Individual registration
    if (type === 'individual') {
      const newRegistration = new Registration({
        name,
        email,
        event: eventId,
        type,
        teamName
      });
      await newRegistration.save();
      event.attendees.push({
        type,
        name,
        email,
        role: 'Team Leader',
        teamName  // Add the registration type for clarity
      });
      await event.save(); 
      ;// Save the updated event
      return res.status(201).send('Registration successful');
    }

    // Team registration
    if (type === 'team') {
      const newTeamRegistration = new Registration({
        name,
        email,
        event: eventId,
        type,
        teamName,
        teamMembers,
      });
      await newTeamRegistration.save();
      const teamObject = {
        teamName,
        name,
        type,
        email,
        role: 'team leader', 
        members: [
          ...teamMembers.map((member) => ({
            name: member,
            type: 'team member',  // Specify the role as team member
          }))
        ]
      };

      // Add the team object (containing leader and members) to the attendees array
      event.attendees.push(teamObject);

      // Save the event with the updated attendees array
      await event.save();

      return res.status(201).send('Team registration successful');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};


// Assuming you're using Express.js
export const getUserRegistrations = async (req, res) => {
  const { email,Role } = req.params;
  
  if(Role==='Student'){
  try {
    // Find all registrations by the user's email
    const registrations = await Registration.find({ email }).populate('event');
    
    if (!registrations ) {
      return res.status(404).send('No registrations found for this user');
    }

    // Respond with the events the user has registered for
    const events = registrations.map(reg => ({
      eventName: reg.event.name,
      eventDate: reg.event.date,
      eventId: reg.event._id,
      type: reg.type,
    }));
    
    return res.status(200).json(events);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
if(Role==='Faculty'){
  try{
    const even=await Hackathon.find({email})
    const events = even.map(reg=>({
      eventName: reg.name,
      eventDate: reg.date,
      eventId: reg._id,
      type: reg.type
    }))
    return res.status(200).json(events)
  }
  catch(error){
    console.error(error)
    res.status(500).send('server error')
  }
}
}


// Example of a delete function in a controller
export const Delete = async (req, res) => {
    const conditions = { email: req.params.email }; // Assuming email is the field to delete by
    
    try {
        const user = await Registration.findOneAndDelete(conditions); // Find and delete the user based on conditions
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting user' });
    }
};

;

// Controller to fetch all questions
export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching questions' });
  }
};

// Controller to add a new question
export const addNewQuestion = async (req, res) => {
  const { question,user } = req.body;

  if (!question) {
    return res.status(400).json({ message: 'Question is required' });
  }

  try {
    const newQuestion = new Question({
      question: question,
      answers: [],
      user:user
    });

    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving question' });
  }
};

// Controller to add an answer to a specific question
export const addAnswerToQuestion = async (req, res) => {
  const { id } = req.params;
  const { answer,user } = req.body;

  if (!answer) {
    return res.status(400).json({ message: 'Answer is required' });
  }

  try {
    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    question.answers.push({answer,user});
    const updatedQuestion = await question.save();

    res.status(200).json(updatedQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding answer' });
  }
};
export const getRegistration = async (req, res) => {
  try {
   // Log the eventId being fetched

    const event = await Hackathon.findById(req.params.eventId, 'attendees');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
     // Log the event object
    res.status(200).json(event.attendees); // Return only the attendees array
  } catch (error) {
    console.error('Error fetching attendees:', error); // Log the error
    res.status(500).json({ message: 'Error fetching event attendees', error: error.message });
  }
};
