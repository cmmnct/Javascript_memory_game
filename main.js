// main.js

import './memoryCard.js';
import './gameBoard.js';

document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.createElement('game-board');
    document.getElementById('game-board').appendChild(gameBoard);

    gameBoard.initializeGame();

    document.getElementById('reset-button').addEventListener('click', () => {
        gameBoard.initializeGame();
    });
});
