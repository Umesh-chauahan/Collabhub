import { Route, Routes } from "react-router-dom"
import Login from "./components/sign-in/Login"
import Register from "./components/sign-in/Register"
import About from "./components/About"
import Contact from "./components/Contact"
import Privacy from "./components/Privacy"
import Pnf from "./components/Pnf"
import './App.css'
import Dashboard from "./components/user/Dashboard"
import Private from "./components/Routes/Private"
import ForgotPassword from "./components/sign-in/ForgotPassword"
import Profile from "./components/user/Profile"
import Events from "./components/Hackathon/Events"
import CreateEvent from "./components/Hackathon/createEvent"
import RegisterEvent from "./components/Hackathon/RegisterEvent"
import MyEvents from "./components/Hackathon/MyEvents"
import Collabs from "./components/Hackathon/Collabs"
import StudyGroup from "./components/Hackathon/StudyGroup"
import QandA from "./components/Hackathon/Q&A"
import EventAttendees from "./components/Hackathon/GetRegister"
import Home from "./pages/Home"


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
