import React from 'react'
import Layout from '../Layout/Layout'
import { useAuth } from '../context/authContext'

const Home = () => {
  const [auth,setAuth] = useAuth()

  return (
    <div>
      <Layout>
        <h1>hello</h1>
        <pre>{JSON.stringify(auth,null,4)}</pre>
      </Layout>
    </div>
  )
}

export default Home
