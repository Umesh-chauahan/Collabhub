import React, { useState } from 'react';
import axios from 'axios';
import './hackathon.css'
import Layout from '../Layout/Layout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const CreateEvent = () => {
  const [auth,setAuth ] = useAuth();
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: auth.user.email,
    name: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    registrationDeadline: '',
    prize: '',
    rules: '',
    type:'',
    privacy:'',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/events/create-hackathon', formData);
      alert('Hackathon created successfully!');
      navigate(formData.type==='event'? '/events' : '/collabs');
    } catch (error) {
      alert('Error creating Hackathon');
      console.error(error);
    }
  };

  return (
    <Layout>
    <form className='fform' onSubmit={handleSubmit}>
      <h1 className="form-title">Create {auth.user.Role==='Student'?' Study Group':' Events & Collab'}</h1>
      <hr className='hr'/>
      <br />
      <div className="register-form-group">
          <label className="label">
            Created By:
            <input
              className="register-input"
              type="email"
              name="email"
              value={formData.email}
              required
              disabled
            />
          </label>
        </div>

      {auth.user.Role==='Faculty' &&
      <div className="register-form-group">
          <label className="label"> Type:</label>
          <div className="register-radio-group">
            <label className='laabel'>
              <input
              className='radio'
                type="radio"
                value="event"
                checked={formData.type === 'event'}
                onChange={() => setFormData({ ...formData, type: 'event' })}
              />
             Event
            </label>
            <label className='laabel'>
              <input
              className='radio'
                type="radio"
                value="collab"
                checked={formData.type === 'collab'}
                onChange={() => setFormData({ ...formData, type: 'collab' })}
              />
              Collab
            </label>
          </div>
        </div>
}
      <div className="form-group">
        <label className="label">
          {formData.type === 'collab' ? 'Subject of Collab ' : `Title of ${auth.user.Role==='Student'?' Study Group':' Event'}`} 
          <input
            className='input'
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div className="form-group">
        <label className="label">
          Description:
          <textarea
            className='textarea'
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div className="form-group">
        <label className="label">
          Date:
          <input
            className='input'
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div className="form-group">
        <label className="label">
          Start Time:
          <input
            className='input'
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div className="form-group">
        <label className="label">
          End Time:
          <input
            className='input'
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div className="form-group">
        <label className="label">
          Location:
          <input
            className='input'
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div className="form-group">
        <label className="label">
          Registration Deadline:
          <input
            className='input'
            type="date"
            name="registrationDeadline"
            value={formData.registrationDeadline}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      {auth.user.Role==='Student'? 
          <div className="register-form-group">
          <label className="label"> Privacy:</label>
          <div className="register-radio-group">
            <label className='laabel'>
              <input
              className='radio'
                type="radio"
                value="public"
                checked={formData.privacy === 'public'}
                onChange={() => setFormData({ ...formData, privacy: 'public'})}
              />
             Public
            </label>
            <label className='laabel'>
              <input
              className='radio'
                type="radio"
                value="private"
                checked={formData.privacy === 'private'}
                onChange={() => setFormData({ ...formData, privacy: 'private' })}
              />
               Private
            </label>
          </div>
        </div>
        :
      <div className="form-group">
        <label className="label">
          Prize Details:
          <input
            className='input'
            name="prize"
            value={formData.prize}
            onChange={handleChange}
            required
          />
        </label>
      </div>
}
      <div className="form-group">
        <label className="label">
          Rules:
          <textarea
            className='textarea'
            name="rules"
            value={formData.rules}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <button className="submit-button" type="submit">Create  {formData.type==='event'? ' Event':`${auth.user.Role==='Student'?' Study Group':' Collab'}` }</button>
    </form>
    </Layout>
  );
};

export default CreateEvent;
