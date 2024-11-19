import React, { useState } from "react";
import TopBar from "./TopBar";
import BackButton from "./BackButton";

const CreateGame = () => {
  const [formData, setFormData] = useState({
    characterName: "",
    characterClass: "",
    characterRace: "",
    genre: "",
    title: ""
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const classes = ["Warrior", "Mage", "Rogue", "Cleric", "Ranger"];
  const races = ["Human", "Elf", "Dwarf", "Orc", "Halfling"];
  const genres = ["Fantasy", "Science Fiction", "Mystery", "Adventure", "Horror", "Romance",
    "Historical Fiction", "Thriller", "Superhero", "Comedy", "Drama"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.characterName.trim()) {
      newErrors.characterName = "Character name is required.";
    }
    if (!formData.characterClass) {
      newErrors.characterClass = "Please select a character class.";
    }
    if (!formData.characterRace) {
      newErrors.characterRace = "Please select a character race.";
    }
    if (!formData.genre) {
      newErrors.genre = "Please select a genre.";
    }
    if (!formData.title) {
        newErrors.title = "Please enter a game save title.";
      }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      setSubmittedData(formData);
      setErrors({});
      console.log("Form submitted with data:", formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
    <TopBar />
    <BackButton />
    <div className="adventure-game-form mx-auto p-5 max-w-md flex flex-col menu-bg mt-2">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Create Your Adventure Game
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Game Save File Name  */}
        <div>
          <label className="block font-semibold">
            Game Save File Name
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="input-field rounded text-black"
            placeholder="Enter save file name"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

        {/* Character Name */}
        <div>
          <label className="block font-semibold">
            Character Name
          </label>
          <input
            type="text"
            name="characterName"
            value={formData.characterName}
            onChange={handleInputChange}
            className="input-field rounded text-black"
            placeholder="Enter your character's name"
          />
          {errors.characterName && (
            <p className="text-red-500 text-sm">{errors.characterName}</p>
          )}
        </div>

        {/* Character Class Dropdown */}
        <div>
          <label className="block font-semibold">
            Character Class
          </label>
          <select
            name="characterClass"
            value={formData.characterClass}
            onChange={handleInputChange}
            className="input-field rounded"
          >
            <option value="">Select a class</option>
            {classes.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
          {errors.characterClass && (
            <p className="text-red-500 text-sm">{errors.characterClass}</p>
          )}
        </div>

        {/* Character Race Dropdown */}
        <div>
          <label className="block font-semibold">
            Character Race
          </label>
          <select
            name="characterRace"
            value={formData.characterRace}
            onChange={handleInputChange}
            className="input-field rounded"
          >
            <option value="">Select a race</option>
            {races.map((race) => (
              <option key={race} value={race}>
                {race}
              </option>
            ))}
          </select>
          {errors.characterRace && (
            <p className="text-red-500 text-sm">{errors.characterRace}</p>
          )}
        </div>

        {/* Genre Dropdown */}
        <div>
          <label className="block font-semibold">Genre</label>
          <select
            name="genre"
            value={formData.genre}
            onChange={handleInputChange}
            className="input-field rounded"
          >
            <option value="">Select a genre</option>
            {genres.map((gen) => (
              <option key={gen} value={gen}>
                {gen}
              </option>
            ))}
          </select>
          {errors.genre && (
            <p className="text-red-500 text-sm">{errors.genre}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn-submit button-fill text-white font-semibold w-36 h-9"
        >
          Create Game
        </button>
      </form>

      {/* Submission Confirmation */}
      {submittedData && (
        <div className="mt-5 p-4 border rounded bg-green-100 text-green-700">
          <h2 className="font-bold">Game Created Successfully!</h2>
          <p>
            Character Name: {submittedData.characterName}
            <br />
            Class: {submittedData.characterClass}
            <br />
            Race: {submittedData.characterRace}
            <br />
            Genre: {submittedData.genre}
          </p>
        </div>
      )}
    </div>
    </>
  );
};

export default CreateGame;
