import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for API requests
import './LoginForm.css'; 
import { Link } from 'react-router-dom';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleConfirmChange = (event) => setConfirmPassword(event.target.value);


  const BACKEND = import.meta.env.VITE_BACKEND_SERVER
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      // Send a POST request to the backend
      const response = axios.post(`${BACKEND}/signup_user/`, {
        username,
        password,
        email,
      }, { headers: {
        'Content-Type': 'application/json'
    }})
    .then((response) => { 
      console.log(response)
      if (response.status === 200) {
        setSuccess("Account created successfully!");
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setEmail('');
    }  
    else{
        setError("Error Creating User, Please check all fields")
    }
    })
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during signup.");
    }
  };

  return (
    <div className="container">
      <div className="login-form md:w-2/3 sm:w-full">
        <div className="brand">
          <h2>Isek.AI</h2>
          <img className="logo size-12" src="logo_dark.svg" alt="Isekai Logo" />
        </div>

        <p className="text-2xl">Welcome!</p>
        <p className="mb-8">Create an account to continue</p>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <input
              type="text"
              id="email"
              className="pl-10 pr-4 py-2 m-1 border rounded-md"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email Address"
            />
          </div>
          <div className="input-field">
            <input
              type="text"
              id="username"
              className="pl-10 pr-4 py-2 m-1 border rounded-md"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Username"
            />
          </div>
          <div className="input-field">
            <input
              type="password"
              id="password"
              className="pl-10 pr-4 py-2 m-1 border rounded-md"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
            />
          </div>
          <div className="input-field">
            <input
              type="password"
              id="confirmPassword"
              className="pl-10 pr-4 py-2 m-1 border rounded-md"
              value={confirmPassword}
              onChange={handleConfirmChange}
              placeholder="Confirm Password"
            />
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}

          <div className='flex items-center justify-center'>
            <a
              href={`${import.meta.env.VITE_GOOGLE_OAUTH}`}
              className="button-stroke google-button"
            >
              Google Sign in
            </a>
            <button type="submit" className="button-fill w-24 h-9">Sign up</button>
          </div>
          </form>
        </div>
  
        <div className="texture md:w-1/3 sm:w-full flex items-center justify-center flex-col p-4">
          <h2 className='text-2xl mb-5'>Experience a dynamic and compelling story in text-based game form using AI</h2>
          <Link className="button-stroke-white flex items-center justify-center w-44 h-9 mt-9"
            to={'/login'}>Return to Login</Link>      </div>
    </div>
  );
};

export default SignupForm;
