const board = document.getElementById("board");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let cells = [];
let currentPlayer = "X";
let gameActive = true;

function createBoard() {
  board.innerHTML = "";
  cells = [];

  for (let i = 0; i < 9; i += 1) {
    const button = document.createElement("button");
    button.className = "cell";
    button.dataset.index = String(i);
    button.addEventListener("click", () => playTurn(button, i));
    board.appendChild(button);
    cells.push(button);
  }
}

function checkWinner() {
  return winningPatterns.some(([a, b, c]) => {
    return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
  });
}

function playTurn(cell) {
  if (!gameActive || cell.textContent) {
    return;
  }

  cell.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins`;
    gameActive = false;
    return;
  }

  if (cells.every((item) => item.textContent)) {
    statusText.textContent = "It is a draw";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer} turn`;
}

function startGame() {
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Player X turn";
  createBoard();
}

restartButton.addEventListener("click", startGame);

startGame();
