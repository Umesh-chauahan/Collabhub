import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { useNavigate } from "react-router-dom";

const Spinner = () => {
    const [count,setCount] = useState(3)
    const navigate = useNavigate()
   

    useEffect(()=>{
        const interval = setInterval(() => {
            setCount((preval)=> --preval)
        }, 1000);
        count === 0 && navigate('/login',{
          state: '/',
        })
        return ()=> clearInterval(interval)

    },[count,navigate])

  return (
    <Layout>
      <div class="d-flex flex-column justify-content-center align-items-center" style={{height:'70vh'}}>
        <h1 className="Text-center">First Login Please {count}</h1>
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </Layout>
  );
};

export default Spinner;
