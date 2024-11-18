import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css';
import './App.css'
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Landing from './components/Landing';
import Game from './components/Game';
import OAuthCallback from './components/OAuthCallback';

function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path='*' element={<Landing />}></Route>
            <Route path='/login' element={<LoginForm />}></Route>
            <Route path='/signup' element={<SignupForm />}></Route>
            <Route path='/saved-games' element={<SignupForm />}></Route>
            {/* to test game interface */}
            <Route path='/game' element={<Game />}></Route>
            <Route path="/oauth/callback/*" element={<OAuthCallback />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
