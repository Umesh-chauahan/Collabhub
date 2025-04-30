import React from 'react'
import app_store from '../assets/app_store.svg'
import play_store from '../assets/play_store.svg'
import app_main_img from '../assets/app_main_img.png'

function AppDownload() {
  return (
    <section className='px-4 sm:px-10 xl:px-20 my-20'>
      <div className='bg-gradient-to-r from-violet-100 to-purple-100 rounded-2xl p-8 sm:p-12 lg:p-16 overflow-hidden'>

        <div className='flex flex-col lg:flex-row items-center justify-between gap-12'>

          {/* Text + Buttons */}
          <div className='w-full max-w-xl text-center lg:text-left'>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-snug'>
              Download our mobile app <br /> for a better experience
            </h2>

            <p className='text-gray-600 text-base sm:text-lg mb-8'>
              Stay connected, register faster, and explore events on the go!
            </p>

            <div className='flex justify-center lg:justify-start gap-4 flex-wrap '>
              <a href="#" className='hover:scale-105 transition-transform'>
                <img className='h-12' src={play_store} alt="Download on Google Play" />
              </a>
              <a href="#" className='hover:scale-105 transition-transform'>
                <img className='h-12' src={app_store} alt="Download on App Store" />
              </a>
            </div>
          </div>

          {/* App Image - Only visible on large screens */}
          <div className='hidden lg:block flex-shrink-0'>
            <img
              src={app_main_img}
              alt="Mobile app preview"
              className='w-[320px] xl:w-[400px] object-contain'
            />
          </div>

        </div>
      </div>
    </section>
  )
}

export default AppDownload
