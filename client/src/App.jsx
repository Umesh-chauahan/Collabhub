import { Route, Routes } from "react-router-dom"
import Login from "./sign-in/Login"
import Register from "./sign-in/Register"
import Home from "./components/Home"
import About from "./components/About"
import Contact from "./components/Contact"
import Privacy from "./components/Privacy"
import Pnf from "./components/Pnf"
import './App.css'
import Dashboard from "./user/Dashboard"
import Private from "./Routes/Private"
import ForgotPassword from "./Routes/ForgotPassword"
import Profile from "./user/Profile"
import Events from "./Hackathon/Events"
import CreateEvent from "./Hackathon/createEvent"
import RegisterEvent from "./Hackathon/RegisterEvent"
import MyEvents from "./Hackathon/MyEvents"
import Collabs from "./Hackathon/Collabs"
import StudyGroup from "./Hackathon/StudyGroup"
import QandA from "./Hackathon/Q&A"
import EventAttendees from "./Hackathon/GetRegister"


function App() {

  return (
    <Routes>
        
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/privacy" element={<Privacy/>}/>
        <Route path="/pnf" element={<Pnf/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/profile" element={<Private/>}>
            <Route path="" element={<Profile/>}/>
        </Route>
        <Route path="/register-event" element={<Private/>}>
            <Route path="" element={<RegisterEvent/>}/>
        </Route>
        <Route path="/profile/:id" element={<Profile/>}/>
        <Route path="/edit/:id" element={<Register/>}/>
        <Route path="/events" element={<Events/>}/>
        <Route path="/create-events" element={<Private/>}>
            <Route path="" element={<CreateEvent/>}/>
        </Route>
        <Route path="/studygroup" element={<StudyGroup/>}/>
        <Route path="/event-register/:id"  element={<RegisterEvent/>}/>
        <Route path="/my-events/:email" element={<MyEvents/>}/>
        <Route path="/my-events" element={<Private/>}>
            <Route path="" element={<MyEvents/>}/>
        </Route>
        <Route path="/collabs" element={<Collabs/>}/>
        <Route path="/Q&A/:id" element={<QandA/>}/>
        <Route path="/Q&A" element={<Private/>}>
            <Route path="" element={<QandA/>}/>
        </Route>
        <Route path="get-registration/:eventId" element={<EventAttendees/>}/>    
    </Routes>
  )
}

export default App
