import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Layout from '../Layout/Layout';

function StudyGroup() {
    const [events, setEvents] = useState([]);
    const user = JSON.parse(localStorage.getItem('auth'));
    const [loading, setLoading] = useState(true);
    const [search,setSearch]=useState('') // Add loading state
    useEffect(() => {
      // Fetch all events from the backend
      const fetchEvents = async () => {
        try {
          const response = await axios.get('http://localhost:8080/events/studygroup');
          setEvents(response.data.allEvents);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      };
  
      fetchEvents();
    }, []);

    const filteredEvents = events.filter((event) =>
      event.name.toLowerCase().includes(search.toLowerCase())
    );


      // Filter for upcoming events (future events)
      const upcomingEvents = filteredEvents.filter((event) => new Date(event.date) >= new Date());
      
      // Filter for past events (events that have already passed)
      const pastEvents = filteredEvents.filter((event) => new Date(event.date) < new Date());
    
    return (
      <Layout onSearch={setSearch}> 
       
       <div className="events-list">
        {loading ? (
          <div className="loading">Loading events...</div>
        ) : (
          <>
        {/* Display Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <>
            <h2 className="section-title">Study Groups</h2>
            {upcomingEvents.map((event) => (
              <div key={event._id} className="event-item upcoming-event">
                <h3 className="event-name">{event.name}</h3>
  
                {/* Top Event Details */}
                <div className="event-top">
                  <div className="event-date">
                    <strong>Date:</strong> {new Date(event.date).toLocaleDateString('en-GB')}
                  </div>
                  <div className="event-price">
                    <strong>Prize:</strong> {event.prize || 'Free'}
                  </div>
                  <div className="event-price">
                    <strong>Start Time:</strong> {event.startTime || '00:00:AM'}
                  </div>
                </div>
  
                {/* Bottom Event Details */}
                <div className="event-bottom">
                  <div className="event-location">
                    <strong>Location:</strong> {event.location || 'Not specified'}
                  </div>
                  <div className="event-registration-deadline">
                    <strong>Registration Deadline:</strong> {new Date(event.registrationDeadline).toLocaleDateString('en-GB')}
                  </div>
                  <div className="event-price">
                    <strong>Participation:</strong> {event.attendees.length || '0000'}
                  </div>
                </div>
  
                {/* Register Button */}
                <NavLink to={user?`/event-register/${event._id}`:'/register-event'} className="register-button">Join Study Group</NavLink>
              </div>
            ))}
          </>
        )}
  
        {/* Display Past Events */}
        {pastEvents.length > 0 && (
          <>
            <h2 className="section-title">Past Events</h2>
            {pastEvents.map((event) => (
              <div key={event._id} className="event-item past-event">
                <h3 className="event-name">{event.name}</h3>
  
                {/* Top Event Details */}
                <div className="event-top">
                  <div className="event-date">
                    <strong>Date:</strong> {new Date(event.date).toLocaleDateString('en-GB')}
                  </div>
                  <div className="event-price">
                    <strong>Prize:</strong> {event.prize || 'Free'}
                  </div>
                  <div className="event-price">
                    <strong>Start Time:</strong> {event.startTime || '00:00:AM'}
                  </div>
                  
                </div>
  
                {/* Bottom Event Details */}
                <div className="event-bottom">
                  <div className="event-location">
                    <strong>Location:</strong> {event.location || 'Not specified'}
                  </div>
                  <div className="event-registration-deadline">
                    <strong>Registration Deadline:</strong> {new Date(event.registrationDeadline).toLocaleDateString('en-GB')}
                  </div>
                  
                  <div className="event-price">
                    <strong>Participation:</strong> {event.attendees.length || '0000'}
                  </div>
                </div>
  
                {/* Register Button */}
                <NavLink to={'/contact'}  className="feedback-button" >Give Feedback</NavLink>
              </div>
            ))}
          </>
        )}
        </>
        )}
      </div>

  </Layout>
    )}

export default StudyGroup
