import React from 'react'
import Layout from '../Layout/Layout'
import HeroSlider from '../components/user/Dashboard'
import Events from '../components/Hackathon/Events'
import AppDownload from '../components/AppDownload'
import Footer from '../Layout/Footer'
import About from '../components/About'

function Home() {
  return (
    <Layout>
      <HeroSlider/>
      <Events/>
      <About/>
      <AppDownload/>
      <Footer/>
    </Layout>
  )
}

export default Home
