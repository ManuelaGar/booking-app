import { useState } from 'react'
import axios from 'axios'
import RegisterForm from '../components/RegisterForm';

function Register() {
    const [user, setUser] = useState({
      name: '',
      email: '',
      password: '',
    });

    async function handleSubmit (event) {
      event.preventDefault();
      try {
        const res = await axios.post(`http://localhost:8000/api/register`, user);
        console.log("REGISTER USER ===> ", res);
      } catch (error) {
        console.log(error);
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
  