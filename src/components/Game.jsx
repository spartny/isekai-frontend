import React, {useState, useEffect, useRef} from 'react'
import TopBar from './TopBar'
import './Game.css'
import axios from 'axios';
import BackButton from './BackButton';
import { useLocation, useNavigate } from 'react-router-dom';

function Game() {
    const navigate = useNavigate();
    useEffect(() => {
      let logged_in = !!localStorage.getItem("accessToken");
      if (!logged_in) {
        navigate('/login');
      }
    }, [navigate])
      
    const [inputValue, setInputValue] = useState('');
    const location = useLocation();
    const { state } = location || {};
    // const [mess, setMess] = useState([]);
  
    const { genre, username, story, title, chatLog = []} = state || {};

    const mess = chatLog.flatMap(entry => 
      [entry.user_input, entry.generated_response]
          .filter(msg => msg !== null)
          .map(msg => ({ text: msg }))
    );
    
    const [messages, setMessages] = useState(mess);
    //console.log(genre, username, response)
    const bottomRef = useRef(null);
    
    useEffect(() => {
      if (story && messages.length === 0) {
        setMessages([{ text: story }]);
      }
    }, [story]);

    useEffect(() => {
      // Scroll to the bottom whenever messages change
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const BACKEND = import.meta.env.VITE_BACKEND_SERVER
    const handleSend = async () => {
      if (inputValue.trim() !== '') {
        setMessages((prevMessages) => [...prevMessages, { text: inputValue }]);
        setInputValue("");
        try {
          const response = await axios.post(`${BACKEND}/continue-old-game/`, {
            username: username,
            genre: genre,
            story: story,
            message: inputValue,
            title: title
          });

          setMessages((prevMessages) => [
            ...prevMessages,
            { text: response.data.story },
          ]);

        } catch (error) {
          console.error("Error continuing game:", error);
        }
      }
    }
      const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          handleSend();
        }
      }

    

    // useEffect(() => {
    //   gameStart()
    // }, [])

    // const gameStart = () => {
    //     axios.post("http://localhost:8000/start-new-game/", {username: localStorage.getItem('username'), genre: '1', title: 'title'})
    //     .then(response => console.log(response['data']))
    // }

  return (
    <div>
        <TopBar />
        <BackButton />
        <div className='flex justify-center items-center min-h-full min-w-full flex-col'>
        <div className='w-full game-bg p-5'>
            <div className="chat-container">
                {/* Messages area */}
                {console.log(messages)}
                <div className="messages">
                    {messages.map((message, index) => (
                    <p key={index} className="message w-full">
                      {message.text}
                    </p>
                    
                    
                    ))}
                    <div ref={bottomRef} />
                </div>
                

                {/* Sticky chat input bar */}
                <div className="chat-input-bar">
                    <input
                    className="chat-input forced-color-adjust-none" id='chat-text'
                    type="text"
                    placeholder="Enter your response..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    />
                    <button onClick={handleSend} className="button-fill w-28 h-12 text-xl rounded-full">Send</button>
                </div>
            </div>
        </div>
        </div>
    </div> 
  )
}

export default Game;