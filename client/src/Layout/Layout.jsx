import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from "react-helmet";
const Layout = ({children , author,keywords,description,title,onSearch}) => {
  return (
    <>
     <Helmet>
                <meta charSet="utf-8" />
                <title>{title}</title>
                <meta name="author" content={author} />
                <meta name="keywords" content={keywords} />
                <meta name="description" content={description} />
      </Helmet>
      <Header onSearch={onSearch}/>
      <main className="main-container"style={{minHeight:'100vh'}}>
        {children}
      </main>
      
    </>
  )
}



export default Layout
