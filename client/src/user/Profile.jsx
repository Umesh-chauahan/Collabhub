import axios from 'axios';
import React, { useState, useEffect,} from 'react';
import { useAuth } from '../context/authContext'
import { NavLink, useParams,useNavigate, } from "react-router-dom";
import Layout from "../Layout/Layout";


const Profile = () => {
  const navigate = useNavigate()
  const { id } = useParams(); 
    const [employees, setEmployees] = useState([]);
  const [auth,setAuth]= useAuth()

   const handleLogout = () =>{
        setAuth({
          ...auth,user:null,token:''
        })
        localStorage.removeItem('auth')
        alert('Logout Sucessfully !!!')
        navigate("/login")
      }
      useEffect(() => {
        const fetchEmployees = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/api/edit/${id}`);
            setEmployees(response.data);
          } catch (error) {
            console.error('Error fetching employees:', error);
          }
        };
    
        fetchEmployees();
      }, []);
     
      

  return (
    <Layout>
        
      <form className="form" onSubmit={onsubmit}>
        <h1 className="h1">USER PROFILE</h1>
        <hr />
          <div>
                    <strong className='strong' >Role : </strong>{employees.Role} <br/><br />
                    <strong className='strong'>Name : </strong> {employees.name}<br/><br/>
                    <strong className='strong'>Email : </strong>{employees.email} <br/><br />
                   
                    <strong className='strong'>Answer :</strong>{employees.answer} <br/><br />
          </div>
        <NavLink to={`/edit/${id}`}  className="button btn btn-primary" type="submit">
          Edit Profile
        </NavLink>
        <button onClick={handleLogout} className="button btn btn-primary" type="submit">
          Logout
        </button>
      </form>
    </Layout>
  );
};
export default Profile;
