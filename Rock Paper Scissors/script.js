const choiceButtons = document.querySelectorAll(".choice");
const playerChoice = document.getElementById("playerChoice");
const computerChoice = document.getElementById("computerChoice");
const message = document.getElementById("message");
const playerScoreLabel = document.getElementById("playerScore");
const computerScoreLabel = document.getElementById("computerScore");
const drawScoreLabel = document.getElementById("drawScore");
const resetButton = document.getElementById("reset");

const choices = ["rock", "paper", "scissors"];

let playerScore = 0;
let computerScore = 0;
let drawScore = 0;

function computerMove() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function roundResult(player, computer) {
  if (player === computer) {
    return "draw";
  }

  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "win";
  }

  return "lose";
}

function updateScores(result) {
  if (result === "win") {
    playerScore += 1;
    message.textContent = "You win this round.";
  } else if (result === "lose") {
    computerScore += 1;
    message.textContent = "Computer wins this round.";
  } else {
    drawScore += 1;
    message.textContent = "It is a draw.";
  }

  playerScoreLabel.textContent = playerScore;
  computerScoreLabel.textContent = computerScore;
  drawScoreLabel.textContent = drawScore;
}

choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const player = button.dataset.choice;
    const computer = computerMove();
    playerChoice.textContent = player;
    computerChoice.textContent = computer;
    updateScores(roundResult(player, computer));
  });
});

resetButton.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  drawScore = 0;
  playerChoice.textContent = "-";
  computerChoice.textContent = "-";
  message.textContent = "Pick a move to start.";
  playerScoreLabel.textContent = "0";
  computerScoreLabel.textContent = "0";
  drawScoreLabel.textContent = "0";
});
