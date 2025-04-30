import React from 'react'
import logo from '../assets/Screenshot 2025-04-07 214004.png'
import facebook_icon from '../assets/facebook_icon.svg'     
import twitter_icon from '../assets/twitter_icon.svg'
import instagram_icon from '../assets/instagram_icon.svg'

function Footer() {
  return (
    <footer className='px-4 sm:px-10 xl:px-20 py-6 bg-gray-100 mt-20'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6'>

        {/* Logo Section */}
        <div className='flex items-center gap-4'>
          <img width={140} src={logo} alt="CollabHub Logo" className='object-contain' />
        </div>

        {/* Copyright */}
        <p className='text-sm text-gray-600 text-center md:text-left'>
          © {new Date().getFullYear()} <span className="font-medium text-gray-800">UmeshChauhan.dev</span> | All rights reserved
        </p>

        {/* Social Icons */}
        <div className='flex gap-4'>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img width={32} src={facebook_icon} alt="Facebook" className='hover:scale-110 transition-transform duration-200' />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img width={32} src={twitter_icon} alt="Twitter" className='hover:scale-110 transition-transform duration-200' />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img width={32} src={instagram_icon} alt="Instagram" className='hover:scale-110 transition-transform duration-200' />
          </a>
        </div>
        
      </div>
    </footer>
  )
}

export default Footer
