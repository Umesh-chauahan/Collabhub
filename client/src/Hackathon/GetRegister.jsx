import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function EventAttendees() {
  const { eventId } = useParams(); // Get eventId from the URL
  const [attendees, setAttendees] = useState([]);
  const [error, setError] = useState(null); // To store error messages

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const response = await fetch(`http://localhost:8080/events/${eventId}/attendees`);

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        console.log('Fetched attendees:', data); // Log the data to verify its structure

        if (Array.isArray(data)) {
          setAttendees(data); // If it's an array, set it to state
        } else if (data.attendees && Array.isArray(data.attendees)) {
          setAttendees(data.attendees); // If it has an 'attendees' key that is an array, use that
        } else {
          throw new Error('Unexpected data format: attendees is not an array.');
        }
      } catch (error) {
        console.error('Error fetching attendees:', error);
        setError(error.message); // Set the error message in state
      }
    };

    fetchAttendees();
  }, [eventId]);

  return (
    <div className="event-attendees-container">
      <h1>Event Attendees</h1>
      {error && <p className="error-message">Error: {error}</p>} {/* Display error message */}
      
      {attendees.length === 0 ? (
        <p className="no-attendees">No attendees found.</p> // Handle empty state
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th> {/* Add index as the first column */}
              <th>Team Name</th>
              <th>Team Leader</th>
              <th>Email</th>
              <th>Member 1</th> {/* Mem 1 displayed before Mem 2 */}
              <th>Member 2</th>
              <th>Member 3</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {attendees.map((attendee, index) => (
              <tr key={index}>
                <td>{index + 1}</td> {/* Index for each team */}
                <td> {attendee.teamName }</td>
                <td>{attendee.name}</td>
                <td>{attendee.email}</td>
                
                {/* Display members individually in their respective columns */}
                <td>{attendee.type === 'team' && attendee.members[0] ? attendee.members[0]?.name : 'N/A'}</td>
                <td>{attendee.type === 'team' && attendee.members[1] ? attendee.members[1]?.name : 'N/A'}</td>
                <td>{attendee.type === 'team' && attendee.members[2] ? attendee.members[2]?.name : 'N/A'}</td>
                <td ><button className='approve'><i class="fa-regular fa-circle-check"></i></button></td>
                <td><button className='reject'><i class="fa-regular fa-circle-xmark"></i></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EventAttendees;
