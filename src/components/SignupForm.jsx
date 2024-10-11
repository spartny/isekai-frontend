import React, { useState } from 'react';
import './LoginForm.css'; 

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
  
  
    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };

    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };

    const handleConfirmChange = (event) => {
      setConfirmPassword(event.target.value);
    };
  
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Handle login logic here
      console.log(`Username: ${username}, Password: ${password}, Email:${email}`);
    };
  
  
    return (
      <div className="container">
        <div className="login-form md:w-2/3 sm:w-full">
            <div className='brand'>
                <h2>Isek.ai</h2>
                <img className="logo size-12" src='logo_dark.svg' />
            </div>

          <p className='text-2xl'>Welcome!</p>
          <p className='mb-8'>Create an account to continue</p>
          <form onSubmit={handleSubmit}>
          <div className="input-field">
              <input type="text" id="email"
                className="pl-10 pr-4 py-2 m-1 border rounded-md"
                value={email}
                onChange={handleEmailChange}
                placeholder='Email Address'
                />  
            </div>
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

            <div className="input-field">
                <input type="password" id="password"
                className="pl-10 pr-4 py-2 m-1 border rounded-md"
                value={confirmPassword}
                onChange={handleConfirmChange}
                placeholder='Confirm Password'
                />
            </div>
  
            <div className="forgot-password m-6">
              <a href="#">Forgot Password?</a>
            </div>
  
            <button className="button-stroke w-43 h-9">Sign in with Google</button>
            <button type="submit" className="button-fill w-24 h-9">Login</button>
  
          </form>
        </div>
  
        <div className="texture md:w-1/3 sm:w-full flex items-center justify-center flex-col p-4">
          <h2 className='text-2xl mb-5'>Experience a dynamic and compelling story in text-based game form using AI</h2>
  
          <button className="button-stroke-white w-44 h-9 mt-9">Return to Login</button>
  
        </div>
      </div>
  
    );
  
  }

export default SignupForm;