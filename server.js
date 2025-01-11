import express from "express";
import dotenv from 'dotenv'
import DB from "./config/db.js";
import router from "./routes/authRoutes.js"
import cors from 'cors'
import hackRoute from "./routes/HackathonRoute.js";
const app = express()
dotenv.config()
DB();
app.use(cors({
    origin: 'http://localhost:5173'
  }));
  
app.use(express.json())
app.use('/api',router)
app.use('/events',hackRoute)
const PORT = process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`server running on port : ${PORT}`)
})