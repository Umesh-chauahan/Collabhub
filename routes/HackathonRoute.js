import express from 'express'
import { addAnswerToQuestion, addNewQuestion, collabs, createHackathon,Delete,events,getAllQuestions,getRegistration,getUserRegistrations,Register,studygroup } from '../controller/hackController.js'
const hackRoute = express.Router()

hackRoute.post('/create-hackathon',createHackathon)
hackRoute.get('/studygroup',studygroup)
hackRoute.get('/events',events)
hackRoute.get('/collabs',collabs)
hackRoute.post('/register',Register)
hackRoute.get('/my-event/:email/:Role',getUserRegistrations)
hackRoute.delete('/delete/:email',Delete)

// Route to get all questions
hackRoute.get('/questions',getAllQuestions);

// Route to add a new question
hackRoute.post('/questions',addNewQuestion);

// Route to add an answer to a specific question
hackRoute.post('/:id/answer',addAnswerToQuestion);

hackRoute.get('/:eventId/attendees',getRegistration) 

  
export default hackRoute;