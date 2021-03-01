import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { register } from '../actions/auth.js'

import RegisterForm from '../components/RegisterForm';

function Register({ history }) {
    const [user, setUser] = useState({
      name: '',
      email: '',
      password: '',
    });

    async function handleSubmit (event) {
      event.preventDefault();
      try {
        const res = await register(user);
        console.log("REGISTER USER ===> ", res);
        toast.success('Register success. Please login.');
        history.push('/login');
      } catch (error) {
        console.log(error);
        if(error.response.status === 400) toast.error(error.response.data);
      }
    };

    function handleChange(event) {
      const { name, value } = event.target;
  
      setUser((prevData) => {
        return {
          ...prevData,
          [name]: value
        };
      });
    }

    return (
      <div>
        <div className="container-fluid bg-secondary p-5 text-center">
          <h1>Register</h1>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-6 offset--md-3">
              <RegisterForm user={user} handleSubmit={handleSubmit} handleChange={handleChange}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default Register;
  