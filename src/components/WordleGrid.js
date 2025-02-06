import React from 'react';

const WordleGrid = ({ guesses }) => {
  return (
    <div className="grid grid-cols-5 gap-2 mb-4">
      {Array.from({ length: 6 }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex">
          {Array.from({ length: 5 }).map((_, colIndex) => {
            const guess = guesses[rowIndex];
            return (
              <div
                key={colIndex}
                className={`w-12 h-12 flex items-center justify-center text-xl font-bold border border-gray-400 ${
                  guess ? `bg-${guess.feedback[colIndex]}` : 'bg-transparent'
                }`}
              >
                {guess ? guess.word[colIndex] : ''}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default WordleGrid;
