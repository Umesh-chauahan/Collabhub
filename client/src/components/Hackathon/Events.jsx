import React from 'react';
import { Link } from 'react-router-dom';

const events = [
  {
    name: "Gen AI Exchange Program",
    mode: "FREE | IN_PERSON",
    deadline: "Thu Aug 28 2025",
    isClosed: false,
    image: "/images/event1.png"
  },
  {
    name: "APAC Solution Challenge ",
    mode: "FREE | IN_PERSON",
    deadline: "Wed Apr 30 2025",
    isClosed: false,
    image: "/images/event2.png", // replace with actual
  },
  {
    name: "Asha AI Hackathon 2025",
    mode: "FREE | VIRTUAL",
    deadline: "Sun Apr 20 2025",
    isClosed: false,
    image: "/images/event5.png",
  },
  {
    name: "Pragati AI For Impact 2025",
    mode: "FREE | IN_PERSON",
    deadline: "Sun Apr 06 2025",
    isClosed: true,
    image: "/images/event4.png",
  },
  
];

const EventCard = ({ name, mode, deadline, isClosed, image }) => (
  <div className="w-full max-w-xs bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition">
    {image && (
      <img src={image} alt={name} className="h-36 w-auto object-contain mb-4 rounded-md" />
    )}
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
    <p className="text-sm text-gray-500">{mode}</p>
    <p className="text-sm mt-2 text-gray-500">Registration Ends on</p>
    <p className="text-sm font-medium text-gray-700 mb-4">{deadline}</p>
    <button
      disabled={isClosed}
      className={`w-full py-2 rounded-lg text-white font-medium transition ${
        isClosed
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700'
      }`}
    >
      {isClosed ? 'Registration closed' : 'Register Now'}
    </button>
  </div>
);

const Events = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 my-5">
      <h1>Upcoming Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
        
        {events.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
        
        <Link to="/events" className="w-full max-w-xs bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition">
         Explore more
        </Link>
      </div>
    </div>
  );
};

export default Events;
