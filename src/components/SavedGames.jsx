import React, { useState, useEffect } from "react";
import TopBar from "./TopBar";
import BackButton from "./BackButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SavedGames = () => {
  const [savedGames, setSavedGames] = useState([]);
  const navigate = useNavigate();
  const BACKEND = import.meta.env.VITE_BACKEND_SERVER
  const fetchSavedGames = async () => {
    try {
      const response = await axios.get(`${BACKEND}/get-saved-games/`, {
        params: { username: localStorage.getItem("username") },
      });
      setSavedGames(response.data.games);
      console.log(response.data)
      console.log(savedGames)
    } catch (error) {
      console.error("Error fetching saved games:", error);
    }
  };
  useEffect(() => {
    fetchSavedGames();
  }, [1]);

  const handleLoadGame = (game) => {
    // Redirect to the game screen and pass game data
    navigate("/game", {
      state: {
        username: localStorage.getItem("username"),
        genre: game.genre,
        story: game.current_context,
        title: game.game_title,
        chatLog: game.chat_log, // Pass the entire chat log
      },
    });
  };
  
  const handleDeleteGame = (id) => {
    axios
      .delete(`${BACKEND}/delete-game/`, {
        data: { id },
      })
      .then(() => {
        const updatedGames = savedGames.filter((game) => game.id !== id);
        setSavedGames(updatedGames);
        console.log("Deleted game with ID:", id);
      })
      .catch((error) => console.error("Error deleting game:", error));
  };

  return (
    <>
    <TopBar />
    <BackButton />
    <div className="saved-games-page container mx-auto p-5 flex flex-col">
      <h1 className="text-3xl font-bold mb-5">Saved Games</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedGames.length > 0 ? (
          savedGames.map((game) => (
            <div
              key={game.id}
              className="card border border-gray-300 shadow-lg rounded-lg p-4 flex flex-col justify-between"
            >
              <div className="card-content">
                <h2 className="text-xl font-semibold">Save Title: {game.game_title}</h2>
                <p className="mt-2">Genre: {game.genre}</p>
                <p className="text-sm mt-1">
                  Last Saved at: {Date(game.saved_at).toLocaleUpperCase().slice(0,24)}
                </p>
              </div>
              <div className="card-actions mt-4 flex justify-between">
                <button
                  className="button-fill bg-teal-500 text-white px-4 py-2 rounded hover:bg-cyan-600"
                  onClick={() => handleLoadGame(game)}
                >
                  Load Game
                </button>
                <button
                  className="button-stroke-white bg-red-500 text-white px-4 py-2 rounded  hover:bg-red-600"
                  onClick={() => handleDeleteGame(game.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-center col-span-full">
            No saved games found. Start a new game to create saves!
          </p>
        )}
      </div>
    </div>
    </>
  );
};

export default SavedGames;
