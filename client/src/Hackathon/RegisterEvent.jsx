import React, { useState } from 'react';
import axios from 'axios';
import './hackathon.css';
import Layout from '../Layout/Layout';
import { useNavigate, useParams } from 'react-router-dom';

const RegisterEvent = () => {
  const auth = localStorage.getItem('auth');
  const user = JSON.parse(auth);

  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: user.user.name,
    email: user.user.email,
    eventId: id,
    type: 'individual', // default type is individual
    teamName: '',
    teamMembers: [''], // Start with one member
  });

  const [message, setMessage] = useState('');

  // Handle input field changes
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedTeamMembers = [...formData.teamMembers];
    updatedTeamMembers[index] = value; // Update the specific member's input
    setFormData((prevData) => ({
      ...prevData,
      teamMembers: updatedTeamMembers,
    }));
  };

  // Handle adding a new team member input (maximum 3 members)
  const addTeamMember = () => {
    if (formData.teamMembers.length < 3) {
      setFormData((prevData) => ({
        ...prevData,
        teamMembers: [...prevData.teamMembers, ''], // Add a new empty string for new member
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const registrationData = {
      name: formData.name,
      email: formData.email,
      eventId: formData.eventId,
      type: formData.type,
      teamName: formData.teamName,
      teamMembers: formData.type === 'team' ? formData.teamMembers.filter(member => member.trim() !== '') : undefined, // Remove empty members
    };

    try {
      const response = await axios.post('http://localhost:8080/events/register', registrationData);

      if (response.status === 201) {
        setMessage('Registration successful!');
        navigate('/events');
      } else {
        setMessage(response.data.message || 'Error occurred!');
      }
    } catch (error) {
      setMessage('Server error occurred!');
      console.error(error);
    }
  };

  return (
    <Layout>
      <form className="register-form-container" onSubmit={handleSubmit}>
        <h1 className="register-form-title">Event Registration</h1>
        <hr className="register-form-divider" />

        <div className="register-form-group">
          <label className="register-label">
            Name:
            <input
              className="register-input"
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              disabled
            />
          </label>
        </div>

        <div className="register-form-group">
          <label className="register-label">
            Email:
            <input
              className="register-input"
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              disabled
            />
          </label>
        </div>

        <div className="register-form-group">
          <label className="register-label">
            Event ID:
            <input
              className="register-input"
              type="text"
              name="eventId"
              value={formData.eventId}
              disabled
              required
            />
          </label>
        </div>

        <div className="register-form-group">
          <label className="register-label">Registration Type:</label>
          <div className="register-radio-group">
            <label>
              <input
                type="radio"
                value="individual"
                checked={formData.type === 'individual'}
                onChange={() => setFormData({ ...formData, type: 'individual' })}
              />
              Individual
            </label>
            <label>
              <input
                type="radio"
                value="team"
                checked={formData.type === 'team'}
                onChange={() => setFormData({ ...formData, type: 'team' })}
              />
              Team
            </label>
          </div>
        </div>

        <div className="register-form-group">
          <label className="register-label">
            Team Name:
            <input
              className="register-input"
              type="text"
              name="teamName"
              value={formData.teamName}
              onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
            />
          </label>
        </div>

        {formData.type === 'team' && (
          <>
            <div className="register-form-group">
              {formData.teamMembers.map((member, index) => (
                <div key={index} className="register-form-group">
                  <label className="register-label">
                    Team Member {index + 1}:
                    <input
                      className="register-input"
                      type="text"
                      name={`teamMember${index}`}
                      value={member}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </label>
                </div>
              ))}
              <button
                type="button"
                className="register-add-member-btn"
                onClick={addTeamMember}
                disabled={formData.teamMembers.length >= 3} // Disable button if 3 members already
              >
                Add Team Member
              </button>
            </div>
          </>
        )}

        <button className="register-submit-button" type="submit">
          Register
        </button>
      </form>

      {message && <p className="register-message">{message}</p>}
    </Layout>
  );
};

export default RegisterEvent;
