import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = ({ onSearch=()=>{} }) => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  
  // To get user information from localStorage
  const auth = localStorage.getItem('auth');
  const user = JSON.parse(auth);

  // Update search state
  const onChange = (e) => {
    setSearch(e.target.value);
  };

  // Debounce the search functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // 500ms debounce delay

    // Cleanup the timeout on effect cleanup
    return () => clearTimeout(timer);
  }, [search]); // only run the effect when search changes

  // Trigger the search once the debounced value changes
  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]); // Call onSearch whenever debouncedSearch changes

  return (
    <nav className="navv">
      <Link className="logo" to="/" />

      <div className="navvvv">
        <NavLink className="list" to="/dashboard">
          Home
        </NavLink>
        <NavLink className="list" to="/events">
          Events
        </NavLink>
        <NavLink className="list" to="/collabs">
          Collabs
        </NavLink>
        <NavLink className="list" to="/studygroup">
          StudyGroups
        </NavLink>
        <NavLink className="list" to={user ? `/Q&A/${user.user._id}` : '/Q&A'}>
          Q&A
        </NavLink>
      </div>

      <div className="search-bar-container">
        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            onChange={onChange}
            value={search}
            aria-label="Search"
          />
          <button type="submit" className="search-button" aria-label="Search">
            <i className="fa fa-search"></i> {/* Using FontAwesome search icon */}
          </button>
        </form>
      </div>

      <div className="profile-container">
        <div className="cart-icon">
          <NavLink className={'icon'} to={user ? `/profile/${user.user._id}` : '/profile'}>
            <i className="fa-regular fa-user"></i>
          </NavLink>
          <span>Profile</span>
        </div>

        <div className="cart-icon">
          <NavLink className="icon" to="/create-events">
            <i className="fa-regular fa-calendar-plus"></i>
          </NavLink>
          <span>Create</span>
        </div>

        <div className="cart-icon">
          <NavLink className="icon" to={user ? `/my-events/${user.user.email}` : '/my-events'}>
            <i className="fa-regular fa-calendar-check"></i>
          </NavLink>
          <span>My Events</span>
        </div>
      </div>
    </nav>
  );
};

export default Header;
