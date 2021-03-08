import { useState } from 'react'
import { toast } from 'react-toastify'
import { login } from '../actions/auth.js'
import LoginForm from '../components/LoginForm.js'
import { useDispatch } from 'react-redux'

function Login({ history }) {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  async function handleSubmit (event) {
    event.preventDefault();
    console.log('send login data', user);
    try {
      const res = await login(user);
      console.log("LOGIN USER ===> ", res);
      if(res.data) {
        window.localStorage.setItem('auth', JSON.stringify(res.data));
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: res.data,
        });
        history.push('/dashboard');
      }
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
          <h1>Login</h1>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset--md-3">
              <LoginForm user={ user } handleSubmit={ handleSubmit } handleChange={ handleChange }/>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default Login;
  