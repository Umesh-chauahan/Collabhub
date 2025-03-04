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
      <div className="dash-container">
        <div className="dash1">
          <div className="text">
          <h1 className='learn'>Learn</h1>
          <h1 className='learn'>Explore</h1>
          <h1 className='learn'>UpSkill</h1>

          <p className='pop'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam vel recusandae dicta voluptatum rem culpa, assumenda repellendus voluptate. Animi deleniti optio quo odio ullam veniam ad ipsam itaque eveniet voluptas.</p>
          </div>
        </div>
       
        <div className="dash2">2</div>
      </div>
    </Layout>
  );
};

export default Dashboard;
