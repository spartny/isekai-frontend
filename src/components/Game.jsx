import React, {useState, useEffect, useRef} from 'react'
import TopBar from './TopBar'
import './Game.css'

function Game() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const bottomRef = useRef(null);

    useEffect(() => {
      // Scroll to the bottom whenever messages change
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = () => {
      if (inputValue.trim() !== '') {
        setMessages([...messages, inputValue]);
        setInputValue(''); // Clear input after sending
      }
    }
      const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          handleSend();
        }
      }

    

  return (
    <div className='flex justify-center items-center min-h-full min-w-full flex-col'>
        <TopBar />
        <div className='w-full game-bg'>
            <div className="chat-container">
                {/* Messages area */}
                <div className="messages">
                    {messages.map((message, index) => (
                    <p key={index} className="message w-full">{message}</p>
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
  )
}

export default Game