import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/Screenshot 2025-04-07 214004.png';

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  let user = null;
  try {
    const stored = localStorage.getItem('auth');
    user = stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Invalid auth data:", error);
    user = null;
  }

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/login');
  };

  const userInitial = user?.user?.name?.charAt(0).toUpperCase() || 'U';
  const userName = user?.user?.name || 'User';

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-indigo-600 font-semibold underline underline-offset-4'
      : 'text-gray-700 hover:text-indigo-600';

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className=" py-1 flex items-center justify-between">
        {/* Logo */}
        <img
          src={logo}
          alt="Logo"
          className="h-20 cursor-pointer"
          onClick={() => navigate('/')}
        />

        {/* Desktop Nav */}
        <nav className="hidden mr-6  md:flex items-center gap-4 ">
          {!user ? (
            <>
              <NavLink
                to="/register"
                className="px-4 text-decoration-none py-2 rounded-md font-medium shadow"
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                className="px-4 py-2   text-decoration-none rounded-md bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 "
              >
                Login
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/dashboard"
                className="px-4 py-2  text-decoration-none rounded-full bg-gray-100 text-gray-800 font-medium shadow hover:bg-gray-200 "
              >
                Dashboard
              </NavLink>

              {/* Avatar Dropdown */}
              <div className="relative">
                <button
                  ref={buttonRef}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center justify-center w-10 h-10  rounded-full bg-indigo-600 text-white font-semibold "
                >
                  {userInitial}
                </button>

                <div
                  ref={dropdownRef}
                  className={`absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50 transform transition-all duration-200 ease-out origin-top-right ${
                    dropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                  }`}
                >
                  <NavLink
                    to="/profile"
                    className="block text-decoration-none px-4 py-2 hover:bg-gray-100 text-gray-700 border-b font-semibold"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {userName}
                  </NavLink>
                  <NavLink
                    to="/my-events"
                    className="block text-decoration-none px-4 py-2 hover:bg-gray-100 text-gray-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Events
                  </NavLink>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      handleLogout();
                    }}
                    className="w-full  text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </nav>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 py-3 space-y-2 shadow">
          {!user ? (
            <>
              <NavLink to="/register" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                Register
              </NavLink>
              <NavLink
                to="/login"
                className="block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/dashboard" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                Dashboard
              </NavLink>
              <NavLink to="/my-events" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                My Events
              </NavLink>
              <NavLink to="/update" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                Update Profile
              </NavLink>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full text-left bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
