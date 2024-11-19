import React, {useEffect, useState} from 'react'
import TopBar from './TopBar'
import './Game.css'
import axios from 'axios';

function Game() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [genre, setGenre] = useState('');
    const [title, setTitle] = useState('');
    
    
    const handleSend = () => {
      if (inputValue.trim() !== '') {
        setMessages([...messages, inputValue]);
        setInputValue(''); // Clear input after sending
      }
    };

    useEffect(() => {
      gameStart()
    }, [])

    const gameStart = () => {
        axios.post("http://localhost:8000/start-new-game/", {username: localStorage.getItem('username'), genre: '1', title: 'title'})
        .then(response => console.log(response['data']))
    }

  return (
    <div className='flex justify-center items-center min-h-full min-w-full flex-col'>
        <TopBar />
        <div className='w-11/12 game-bg'>
            <div className="chat-container">
                {/* Messages area */}
                <div className="messages">
                    {messages.map((message, index) => (
                    <p key={index} className="message">{message}</p>
                    ))}
                </div>

                {/* Sticky chat input bar */}
                <div className="chat-input-bar">
                    <input
                    className="chat-input forced-color-adjust-none" id='chat-text'
                    type="text"
                    placeholder="Enter your response..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button onClick={handleSend} className="button-fill w-24 h-9">Send</button>
                </div>
            </div>
        </div>
    </div> 
  )
}

export default Game;