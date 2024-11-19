import React, { useState } from "react";
import TopBar from "./TopBar";


const SavedGames = () => {
  const [savedGames, setSavedGames] = useState([
    {
      id: 1,
      title: "Game 1",
      description: "Level 5, 30% progress",
      date: "2024-11-15",
    },
    {
      id: 2,
      title: "Game 2",
      description: "Level 2, 10% progress",
      date: "2024-11-14",
    },
    {
      id: 3,
      title: "Game 3",
      description: "Final level, 90% progress",
      date: "2024-11-10",
    },
  ]);

  const handleLoadGame = (id) => {
    console.log("Load game with ID:", id);
    // Implement load game functionality here
  };

  const handleDeleteGame = (id) => {
    const updatedGames = savedGames.filter((game) => game.id !== id);
    setSavedGames(updatedGames);
    console.log("Deleted game with ID:", id);
  };

  return (
    <>
    <TopBar />
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
                <h2 className="text-xl font-semibold">{game.title}</h2>
                <p className="mt-2">{game.description}</p>
                <p className="text-sm mt-1">
                  Saved on: {game.date}
                </p>
              </div>
              <div className="card-actions mt-4 flex justify-between">
                <button
                  className="button-fill bg-teal-500 text-white px-4 py-2 rounded hover:bg-cyan-600"
                  onClick={() => handleLoadGame(game.id)}
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
