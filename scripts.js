// Game variables
const board = ['', '', '', '', '', '', '', '', '']; // Represents the Tic Tac Toe board
let currentPlayer = 'X'; // Player X starts first
let gameActive = true; // Keeps track if the game is active

// All possible winning combinations (rows, columns, diagonals)
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

// Function to handle clicks on each cell
function handleCellClick(event) {
    const clickedCell = event.target; // The clicked cell (button)
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index')); // Index of clicked cell

    // If the cell is already filled or game is not active, do nothing
    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    // Update the board state and UI
    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    // Check if there's a winner or if it's a draw
    checkForWinOrDraw();

    // Switch players
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Function to check for a win or a draw
function checkForWinOrDraw() {
    // Loop through all winning combinations to check for a win
    for (const combination of winningCombinations) {
        const [a, b, c] = combination; // Get the three indexes of each combination
        // Check if all three cells are filled with the same player's mark
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false; // End the game
            showWinner(`Player ${currentPlayer} wins!`); // Show winning message
            return;
        }
    }

    // Check for a draw (if all cells are filled)
    if (!board.includes('')) {
        gameActive = false; // End the game
        showWinner("It's a draw!"); // Show draw message
    }
}

// Function to show the winner or draw message
function showWinner(message) {
    const winnerCard = document.getElementById('winnerCard'); // Winner card container
    const winnerText = document.getElementById('winnerText'); // Text element to display the winner message
    winnerText.textContent = message; // Set the message
    winnerCard.style.display = 'block'; // Show the winner card

    const winnerVideo = document.getElementById('winnerVideo'); // Video element
    winnerVideo.play(); // Play the video
}

// Function to reset the game
function resetGame() {
    // Reset the board and game state
    board.fill(''); // Clear the board array
    gameActive = true; // Set game to active
    currentPlayer = 'X'; // Set the starting player to X
    
    // Clear the UI
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = ''; // Clear each cell text
    });

    document.getElementById('winnerCard').style.display = 'none'; // Hide the winner card
}

// Add event listeners to each cell and reset button
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.getElementById('resetBtn').addEventListener('click', resetGame);

 