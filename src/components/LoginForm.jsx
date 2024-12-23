import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LoginForm.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (authenticated) {
      navigate('/');
    }
  }, [authenticated, navigate])

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const BACKEND = import.meta.env.VITE_BACKEND_SERVER
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
    axios.post(`${BACKEND}/login/`, {
      username: username,
      password: password
    })
    .then(response => {
      const { access, refresh } = response.data;
      localStorage.setItem('accessToken', access);  // Store tokens
      localStorage.setItem('refreshToken', refresh);
      setAuthenticated(true)   
    })
    .catch(error => {
      console.error("Login error", error);
    });
    console.log(localStorage)
    localStorage.setItem('username', username);
    console.log(`Username: ${username}, Password: ${password}`);
  };

  return (
    <div className="container">
      <div className="login-form md:w-2/3 sm:w-full">
          <div className='brand'>
              <h2>Isek.AI</h2>
              <img className="logo size-12" src='logo_dark.svg' />
          </div>

        <p className='text-2xl'>Welcome back,</p>
        <p className='mb-8'>Enter credentials to continue</p>
        <form onSubmit={handleSubmit} className='w-1/2'>
          <div className="input-field">
            <input type="text" id="username"
              className="pl-10 pr-4 py-2 m-1 border rounded-md"
              value={username}
              onChange={handleUsernameChange}
              placeholder='Username'
              />  
          </div>

          <div className="input-field">
              <input type="password" id="password"
              className="pl-10 pr-4 py-2 m-1 border rounded-md"
              value={password}
              onChange={handlePasswordChange}
              placeholder='Password'
              />
          </div>

          <div className="forgot-password m-6">
            <a href="#">Forgot Password?</a>
          </div>
          <div className='flex items-center justify-center'>
            <a
              href={`${import.meta.env.VITE_GOOGLE_OAUTH}`}
              className="button-stroke google-button"
            >
              Google Sign in
            </a>
            <button type="submit" className="button-fill w-24 h-9">Login</button>
          </div>
        </form>
      </div>
  
        <div className="texture md:w-1/3 sm:w-full flex items-center justify-center flex-col p-4">
          <h2 className='text-2xl'>Experience a dynamic and compelling story in text-based game form using AI</h2>
          <p className='text-xl mt-8 mb-2 ml-10 mr-10'>Don't have an Account yet?</p>
  
          <Link className="button-stroke-white w-24 h-9 flex items-center justify-center" to={'/signup'}>Sign Up</Link>
  
        </div>
      </div>
  
    );
  
  }

export default LoginForm;