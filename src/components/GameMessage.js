import React from 'react';

const GameMessage = ({ message }) => {
  return message ? <p className="text-lg font-bold mt-4">{message}</p> : null;
};

export default GameMessage;
