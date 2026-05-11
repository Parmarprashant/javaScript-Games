const grid = document.getElementById("grid");
const scoreLabel = document.getElementById("score");
const timeLabel = document.getElementById("time");
const message = document.getElementById("message");
const startButton = document.getElementById("start");
const restartButton = document.getElementById("restart");

let score = 0;
let timeLeft = 20;
let activeIndex = -1;
let moleTimer = null;
let countdownTimer = null;
let playing = false;

for (let i = 0; i < 9; i += 1) {
  const button = document.createElement("button");
  button.className = "hole";
  button.dataset.index = String(i);
  button.addEventListener("click", () => whack(i));
  grid.appendChild(button);
}

function holes() {
  return document.querySelectorAll(".hole");
}

function showMole() {
  holes().forEach((hole) => hole.classList.remove("mole"));
  activeIndex = Math.floor(Math.random() * 9);
  holes()[activeIndex].classList.add("mole");
}

function whack(index) {
  if (!playing) {
    return;
  }

  if (index === activeIndex) {
    score += 1;
    scoreLabel.textContent = score;
    message.textContent = "Nice hit!";
    activeIndex = -1;
    holes().forEach((hole) => hole.classList.remove("mole"));
  } else {
    message.textContent = "Missed it. Stay sharp.";
  }
}

function stopGame() {
  playing = false;
  clearInterval(moleTimer);
  clearInterval(countdownTimer);
  holes().forEach((hole) => hole.classList.remove("mole"));
  activeIndex = -1;
  message.textContent = `Time up! Final score: ${score}`;
}

function startGame() {
  clearInterval(moleTimer);
  clearInterval(countdownTimer);
  score = 0;
  timeLeft = 20;
  playing = true;
  scoreLabel.textContent = score;
  timeLabel.textContent = timeLeft;
  message.textContent = "Whack the mole before time runs out.";
  showMole();

  moleTimer = setInterval(showMole, 700);
  countdownTimer = setInterval(() => {
    timeLeft -= 1;
    timeLabel.textContent = timeLeft;

    if (timeLeft <= 0) {
      stopGame();
    }
  }, 1000);
}

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);
