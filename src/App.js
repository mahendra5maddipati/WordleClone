import React, { useState } from 'react';
import './styles/index.css';
import WordleGrid from './components/WordleGrid';
import Keyboard from './components/Keyboard';
import GameMessage from './components/GameMessage';
import words from './words';

const App = () => {
  const [targetWord, setTargetWord] = useState(words[Math.floor(Math.random() * words.length)]);
  const [guesses, setGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');

  const handleGuess = (guess) => {
    if (guess.length !== 5 || gameOver) return;
    if (!words.includes(guess)) {
      setMessage('Invalid word!');
      return;
    }

    const feedback = guess.split('').map((letter, index) => {
      if (letter === targetWord[index]) return 'green';
      if (targetWord.includes(letter)) return 'yellow';
      return 'gray';
    });

    setGuesses([...guesses, { word: guess, feedback }]);

    if (guess === targetWord) {
      setGameOver(true);
      setMessage('You Win!');
    } else if (guesses.length >= 5) {
      setGameOver(true);
      setMessage(`Game Over! The word was ${targetWord}`);
    }
  };

  const resetGame = () => {
    setTargetWord(words[Math.floor(Math.random() * words.length)]);
    setGuesses([]);
    setGameOver(false);
    setMessage('');
  };

  return (
    <div className="bg-cover bg-center min-h-screen flex flex-col items-center justify-center text-white bg-wordle">
      <h1 className="text-4xl font-bold mb-4">Wordle Clone</h1>
      <WordleGrid guesses={guesses} />
      <Keyboard onGuess={handleGuess} />
      <GameMessage message={message} />
      {gameOver && <button className="mt-4 px-4 py-2 bg-blue-500 rounded" onClick={resetGame}>New Game</button>}
    </div>
  );
};

export default App;
