import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

function Collabs() {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true); // Add loading state
    const [events, setEvents] = useState([]);
    const user = JSON.parse(localStorage.getItem('auth'));
useEffect(()=>{

    const fetchEvents = async () => {
    try {
        const response = await axios.get('http://localhost:8080/events/collabs');
        setEvents(response.data.allEvents);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }

    fetchEvents();
})

const filteredEvents = events.filter((event) =>
  event.name.toLowerCase().includes(search.toLowerCase())
);

const upcomingEvents = filteredEvents.filter((event) => new Date(event.date) >= new Date());
    
// Filter for past events (events that have already passed)
const pastEvents = filteredEvents.filter((event) => new Date(event.date) < new Date());



  return (
    <Layout onSearch={setSearch}>
    <div className="events-list">
      {/* Show loading indicator if data is still being fetched */}
      {loading ? (
        <div className="loading">Loading events...</div>
      ) : (
        <>
          {/* Display Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <>
              <h2 className="section-title">Upcoming Collabs</h2>
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
                  <NavLink to={user?`/event-register/${event._id}`:'/register-event'} className="register-button">
                    Register
                  </NavLink>
                </div>
              ))}
            </>
          )}

          {/* Display Past Events */}
          {pastEvents.length > 0 && (
            <>
              <h2 className="section-title">Past Collabs</h2>
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
);
}

export default Collabs
