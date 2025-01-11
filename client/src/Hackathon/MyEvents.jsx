import React, { useState, useEffect } from 'react';
import './hackathon.css';
import Layout from '../Layout/Layout';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useAuth } from '../context/authContext';

const MyEvents = () => {
  const navigate= useNavigate()
  const {email}=useParams()
  const auth = localStorage.getItem('auth') 
  const user=JSON.parse(auth)
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const Role=user.user.Role
  
  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const response = await fetch(`http://localhost:8080/events/my-event/${email}/${Role}`);
        
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (email) {
      fetchUserEvents();
    }
  }, [email]);

  const onclick=async()=>{
    try{
      
      await axios.delete(`http://localhost:8080/events/delete/${email}`)
      alert('Event Deleting Sucessfully !!!!')
      location.reload()
    }
    catch (error){
        console.error(error)
    }
  }
  const handleDetail=(eventId)=>{
    
    navigate(`/get-registration/${eventId}`)
  }

  return (
    <Layout>
    <div className="my-events-wrapper">
      <h2 className="my-events-header">{Role==='Student'?'Your Registered Events':'Your Events & Collabs'}</h2>
      
      {error && <p className="error-alert">{error}</p>}

      {events.length === 0 ? (
        <p className="no-events-found">You haven't registered for any events yet.</p>
      ) : (
        <ul className="my-events-list">
          {events.map((event, index) => (
            <li key={index} className="event-card">
              <h3>{event.eventName}</h3>
              <div className="divs">
              <div className="div1">
              <p>Date: {event.eventDate}</p>
              <p>Type: {event.type}</p>
              </div>
              {Role==='Student'?
              <button onClick={()=>onclick()} className='div4'>Cancle Registration</button>
              :
              <div className="">
              <button onClick={()=>handleDetail(event.eventId)} className='div2'>Registration Detail</button>
              <button onClick={()=>onclick} className='div2'>Edit</button>
              <button onClick={()=>onclick} className='div2'>Delete</button>
              </div>
}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
    </Layout>
  );
};

export default MyEvents;
