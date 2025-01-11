import {useState } from "react";
import axios from 'axios'
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useAuth } from "../context/authContext";

const Login = ()=>{
    const [FormData,setFormData] = useState({ email: '', password: '',Role:'' })
    const [auth,setAuth] = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
           
            const onchange =(e)=>{
                setFormData({...FormData,[e.target.name]:e.target.value})
                
            }
        
            const onsubmit =async(e)=>{
               
              
                e.preventDefault()
                
                const response=await axios.post('http://localhost:8080/api/login',FormData)
                setAuth({
                    ...auth,user:response.data.user,token:response.data.token
                })
                alert('Login Successfully !!!')
                localStorage.setItem("auth",JSON.stringify(response.data))
                
                navigate(location.state || "/")
            }
    return(
        <Layout title={'Login'}>
        <form className='form login' onSubmit={onsubmit}>
        <h1 className='h1'>Login Page</h1>
        <hr />
        <label htmlFor="Role" className="RoleLable">Select Your Role :</label>
        <select name="Role" onChange={onchange} className="Role" id="Role">
        <option value="">Select Role</option>
          <option value="Student">Student</option>
          <option value="Faculty">Faculty</option>
          <option value="Admin">Admin</option>
        </select>
        <label className="laable"><p className="u">Email :</p><input className='username'
         
          value={FormData.email}
          type="email"
          name="email"
         
          onChange={onchange}
        />
        </label>
         <label className="laable"><p className="u">Password :</p><input className='username'
          
          type="password"
          value={FormData.password}
          name="password"
         
          onChange={onchange}
        />
        </label>
        <NavLink className="frgtBtn"to='/forgot-password'>Forgot Password ?</NavLink>
        <button className='button btn btn-primary' type="submit"><p className="b">Login</p></button>
        <p className='p'>Don't have an acount ? <NavLink className="loginBtn"to='/register'>Sign-Up</NavLink></p>
        </form>
        </Layout>
            )
        }
export default Login;