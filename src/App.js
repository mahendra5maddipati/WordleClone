import React, { useState, useEffect } from "react";
import wordsList from "./wordsList";
import './tailwind.css';
import './index.css';

const Wordle = () => {
  const [word, setWord] = useState("HELLO");
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setWord(wordsList[Math.floor(Math.random() * wordsList.length)].toUpperCase());
  }, []);

  const handleGuess = () => {
    if (currentGuess.length !== 5 || !wordsList.includes(currentGuess.toLowerCase())) {
      setMessage("Invalid word");
      return;
    }

    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);

    if (currentGuess === word) {
      setMessage("Congratulations! You won!");
      setGameOver(true);
      return;
    }

    if (newGuesses.length >= 6) {
      setMessage(`Game Over! The word was ${word}`);
      setGameOver(true);
    }
    setCurrentGuess("");
  };

  const getColor = (letter, index) => {
    if (word[index] === letter) return "bg-green-500";
    if (word.includes(letter)) return "bg-yellow-500";
    return "bg-gray-500";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-4">Wordle Clone</h1>
      <div className="grid grid-rows-6 gap-2">
        {Array.from({ length: 6 }).map((_, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-5 gap-2">
            {Array.from({ length: 5 }).map((_, colIndex) => {
              const letter = guesses[rowIndex]?.[colIndex] || "";
              return (
                <div key={colIndex} className={`w-12 h-12 flex items-center justify-center border ${letter ? getColor(letter, colIndex) : "border-gray-500"} text-2xl font-bold uppercase`}>{letter}</div>
              );
            })}
          </div>
        ))}
      </div>
      <input
        type="text"
        maxLength={5}
        value={currentGuess}
        onChange={(e) => setCurrentGuess(e.target.value.toUpperCase())}
        disabled={gameOver}
        className="mt-4 p-2 text-black rounded-md"
      />
      <button
        onClick={handleGuess}
        disabled={gameOver}
        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
      >
        Submit
      </button>
      <button
        onClick={() => window.location.reload()}
        className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        New Game
      </button>
      {message && <p className="mt-4 text-xl">{message}</p>}
    </div>
  );
};

export default Wordle;