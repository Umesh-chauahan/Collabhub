import { useState,useEffect } from "react";
import axios from "axios";
import Layout from "../Layout/Layout";
import { NavLink, useNavigate,useParams} from "react-router-dom";

//Register
const Register = () => {
  const {id}=useParams()
  const navigate = useNavigate()
  const [FormData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    Role:"",
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/edit/${id}`);
         setFormData(response.data)
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const onchange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };

  const onsubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        // Update existing employee
        await axios.put(`http://localhost:8080/api/employees/${id}`, FormData);
        alert('Employee updated successfully!');
      } else {
        // Add new employee
        await axios.post('http://localhost:8080/api/register', FormData);
        alert("Register Successfully !!!");
        navigate("/login")
      }
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  return (
    <Layout>
        
        <form className="form" onSubmit={onsubmit}>
        <h1 className="h1">{id ? 'Update Profile' : 'Sign-Up Page'}</h1>
        <hr />
        <label htmlFor="Role" className="RoleLable">Select Your Role :</label>
        <select name="Role"  onChange={onchange}  className="Role" id="Role">
        <option value=''>{id ? `${FormData.Role}` : 'Select Role'}</option>
          <option value="Student">Student</option>
          <option value="Faculty">Faculty</option>
          <option value="Admin">Admin</option>
        </select>

         <label className="laable"><p className="u">User Name :</p><input className='username'
          type="text"
          value={FormData.name}
          name="name"
          
          onChange={onchange}
        />
        </label>
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
         
        <button className="button btn btn-primary" type="submit"><p className="b">{id ? 'Update' : 'Register'}</p></button>
        <p className="p">
          {id ? 'Back to  ' : 'Already have an acount ? '}
          <NavLink className="loginBtn" to={id ? '/':"/login"}>
            {id ? 'Home' :'Login'}
          </NavLink>
        </p>
      </form>
    </Layout>
  );
};
export default Register;
