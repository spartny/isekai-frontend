import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css';
import './App.css'
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Landing from './components/Landing';
import Game from './components/Game';
import SavedGames from './components/SavedGames';
import OAuthCallback from './components/OAuthCallback';
import CreateGame from './components/CreateGame';
import Logout from './components/Logout';

function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path='*' element={<Landing />}></Route>
            <Route path='/login' element={<LoginForm />}></Route>
            <Route path='/signup' element={<SignupForm />}></Route>
            <Route path='/saved-games' element={<SavedGames />}></Route>
            <Route path='/create-game' element={<CreateGame />}></Route>
            <Route path='/game' element={<Game />}></Route>
            <Route path="/oauth/callback/*" element={<OAuthCallback />} />
            <Route path='/logout' element={<Logout />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
