import React, { useState } from 'react';

const Keyboard = ({ onGuess }) => {
  const [input, setInput] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && input.length === 5) {
      onGuess(input.toLowerCase());
      setInput('');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        value={input}
        maxLength={5}
        onChange={(e) => setInput(e.target.value.toUpperCase())}
        onKeyPress={handleKeyPress}
        className="p-2 text-lg border rounded text-black w-32 text-center"
      />
      <p className="mt-2 text-sm">Type a 5-letter word & press Enter</p>
    </div>
  );
};

export default Keyboard;
