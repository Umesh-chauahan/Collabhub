// Dashboard.js
import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  // Check if the user is logged in (from localStorage)
  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (auth) {
      setUser(JSON.parse(auth)); // Set user state if found
    }
  }, []);

  return (
    <Layout title="Dashboard">
      <div className="dashboard-container">
        <div className="dashboard-content">
          <h1>Welcome to your Dashboard</h1>
          {user ? (
            <div className="welcome-message">
              <p>Hello, {user.user.name}! You are logged in.</p>
              <Link to={`/profile/${user.user._id}`} className="btn-profile">
                Go to Profile
              </Link>
            </div>
          ) : (
            <div className="auth-buttons">
              <p>Please log in to access your dashboard</p>
              <Link to="/login" className="btn-login">
                Login
              </Link>
              <Link to="/register" className="btn-register">
                Register
              </Link>
            </div>
          )}

          <div className="info-section">
            <h2>Your Activities</h2>
            <p>Here are some of the activities you can manage in the dashboard:</p>
            <ul>
              <li>Manage Events</li>
              <li>Create Collaborations</li>
              <li>Join Study Groups</li>
              <li>Participate in Q&A</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
