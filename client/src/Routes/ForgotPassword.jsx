import {useState } from "react";
import axios from 'axios'
import {NavLink, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";

const ForgotPassword = () => {
  const [FormData,setFormData] = useState({ email: '',name:'', newPassword: '' })
    const navigate = useNavigate()
           
            const onchange =(e)=>{
                setFormData({...FormData,[e.target.name]:e.target.value})
                
            }
        
            const onsubmit =async(e)=>{
               
              
                e.preventDefault()
                const response=await axios.post('http://localhost:8080/api/forgot-password',FormData)
                console.log(response.data.messege)
                alert('Password reset Successfully !!!')
                navigate("/login")
            }
  return (
    <Layout>
      <form className='form login' onSubmit={onsubmit}>
       
        <h1 className='h1'>Reset Password</h1>
        <hr />
        <label className="laable"><p className="u">Email :</p><input className='username'
         
         value={FormData.email}
         type="email"
         name="email"
        
         onChange={onchange}
       />
       </label>
       <label className="laable"><p className="u">Username :</p><input className='username'
         
         type="text"
         name="name"
         value={FormData.name}
         
         onChange={onchange}
       />
       </label>
       <label className="laable"><p className="u">New Password :</p><input className='username'
          
          type="password"
          value={FormData.password}
          name="password"
         
          onChange={onchange}
        />
        </label>
        <button className='button btn btn-primary' type="submit">Login</button>
       
        </form>
    </Layout>
  )
}

export default ForgotPassword
