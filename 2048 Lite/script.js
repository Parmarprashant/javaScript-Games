const grid = document.getElementById("grid");
const scoreLabel = document.getElementById("score");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart");

let board = [];
let score = 0;

function emptyBoard() {
  return Array.from({ length: 4 }, () => Array(4).fill(0));
}

function drawBoard() {
  grid.innerHTML = "";
  board.flat().forEach((value) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = value === 0 ? "" : value;
    cell.style.background = value === 0 ? "rgba(255, 255, 255, 0.35)" : "#fff8df";
    grid.appendChild(cell);
  });
  scoreLabel.textContent = score;
}

function randomEmptyCell() {
  const emptyCells = [];

  for (let row = 0; row < 4; row += 1) {
    for (let col = 0; col < 4; col += 1) {
      if (board[row][col] === 0) {
        emptyCells.push([row, col]);
      }
    }
  }

  if (!emptyCells.length) {
    return null;
  }

  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

function addTile() {
  const spot = randomEmptyCell();

  if (!spot) {
    return;
  }

  const [row, col] = spot;
  board[row][col] = Math.random() < 0.9 ? 2 : 4;
}

function compress(line) {
  const filtered = line.filter((value) => value !== 0);

  for (let i = 0; i < filtered.length - 1; i += 1) {
    if (filtered[i] === filtered[i + 1]) {
      filtered[i] *= 2;
      score += filtered[i];
      filtered[i + 1] = 0;
    }
  }

  const merged = filtered.filter((value) => value !== 0);
  while (merged.length < 4) {
    merged.push(0);
  }

  return merged;
}

function cloneBoard(data) {
  return data.map((row) => [...row]);
}

function moveLeft() {
  board = board.map((row) => compress(row));
}

function moveRight() {
  board = board.map((row) => compress([...row].reverse()).reverse());
}

function moveUp() {
  const next = emptyBoard();

  for (let col = 0; col < 4; col += 1) {
    const line = [board[0][col], board[1][col], board[2][col], board[3][col]];
    const merged = compress(line);
    for (let row = 0; row < 4; row += 1) {
      next[row][col] = merged[row];
    }
  }

  board = next;
}

function moveDown() {
  const next = emptyBoard();

  for (let col = 0; col < 4; col += 1) {
    const line = [board[3][col], board[2][col], board[1][col], board[0][col]];
    const merged = compress(line).reverse();
    for (let row = 0; row < 4; row += 1) {
      next[row][col] = merged[row];
    }
  }

  board = next;
}

function boardsEqual(first, second) {
  return JSON.stringify(first) === JSON.stringify(second);
}

function canMove() {
  for (let row = 0; row < 4; row += 1) {
    for (let col = 0; col < 4; col += 1) {
      if (board[row][col] === 0) {
        return true;
      }
      if (col < 3 && board[row][col] === board[row][col + 1]) {
        return true;
      }
      if (row < 3 && board[row][col] === board[row + 1][col]) {
        return true;
      }
    }
  }
  return false;
}

function handleMove(direction) {
  const before = cloneBoard(board);

  if (direction === "ArrowLeft") {
    moveLeft();
  } else if (direction === "ArrowRight") {
    moveRight();
  } else if (direction === "ArrowUp") {
    moveUp();
  } else if (direction === "ArrowDown") {
    moveDown();
  } else {
    return;
  }

  if (!boardsEqual(before, board)) {
    addTile();
    drawBoard();

    if (board.flat().includes(2048)) {
      message.textContent = "You reached 2048.";
    } else if (!canMove()) {
      message.textContent = "No moves left. Restart to play again.";
    } else {
      message.textContent = "Use arrow keys to move tiles.";
    }
  }
}

function startGame() {
  board = emptyBoard();
  score = 0;
  addTile();
  addTile();
  drawBoard();
  message.textContent = "Use arrow keys to move tiles.";
}

document.addEventListener("keydown", (event) => {
  handleMove(event.key);
});

restartButton.addEventListener("click", startGame);

startGame();
