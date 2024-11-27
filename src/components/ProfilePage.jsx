import React, { useEffect, useState } from 'react'
import './profilepage.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TopBar from './TopBar';
import BackButton from './BackButton';

export default function ProfilePage() {

  // const { user, loading } = useAuthContext()
  const navigate = useNavigate()
  useEffect(() => {
    let logged_in = !!localStorage.getItem("accessToken");
    if (!logged_in) {
      navigate('/login');
    }
  }, [navigate])

  const [userData, setUserdata] = useState({})
  const [profilePic, setProfilePic] = useState('')
  const [imageBase64, setImageBase64] = useState('');
  const [gamesList, setGamesList] = useState([]);

  const BACKEND = import.meta.env.VITE_BACKEND_SERVER

  useEffect(() => {
    for (const game in userData['games_list']){
      if (!gamesList.includes(userData.games_list[game].title)){
      setGamesList((prevList) => [...prevList, userData['games_list'][game]['title']])
    }
  }
  }, [userData])
  const titles = gamesList.join("\n");

  useEffect(() => {
    const response = axios.post(`${BACKEND}/user_profile/`, {username: localStorage.getItem('username')})
    .then(response => setUserdata(response.data))

  }, [BACKEND])


  return (
    <>
    <TopBar />
    <BackButton />
    <div className="adventure-game-form mx-auto p-5 max-w-md flex flex-col menu-bg mt-2">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Game Stats
      </h1>

      <form className="space-y-4">
      {/* Games Played */}
      <div>
        <label className="block font-semibold">Total Games Played</label>
        <input
          type="text"
          name="totalGamesPlayed"
          value={userData.total_games} // Replace with dynamic data
          className="input-field rounded text-black"
          placeholder="Last played game"
          
        />
      </div>

      {/* Last Played Game */}
      <div>
        <label className="block font-semibold">Last Played Game</label>
        <input
          type="text"
          name="lastPlayedGame"
          value={userData.last_played_game} // Replace with dynamic data
          className="input-field rounded text-black"
          placeholder="Last played game"
        />
      </div>

      {/* Last Played Timestamp */}
      <div>
        <label className="block font-semibold">Last Played Timestamp</label>
        <input
          type="text"
          name="lastPlayed"
          value={new Date(userData.last_played).toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true
          })} // Replace with dynamic data
          className="input-field rounded text-black whitespace-nowrap overflow-x-auto"
          placeholder="Last played timestamp"
        />
      </div>

      {/* Genres Played */}
      <div>
        <label className="block font-semibold">Genres Played</label>
        <input
          type="text"
          name="genresPlayed"
          value={userData.genres_played} // Replace with dynamic data
          className="input-field rounded text-black"
          placeholder="Genres played"
          
        />
      </div>

      {/* Games List */}
      <div>
        <label className="block font-semibold">Games Played</label>
        <textArea
          type="text"
          name="gamesPlayed"
          
          className="input-field bg-gray-300 rounded text-black"
          placeholder="Last played game"
          rows={3}
        >
          {titles}

        </textArea>
      </div>
    </form>
  </div>
  </>
)}