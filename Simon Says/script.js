const pads = document.querySelectorAll(".pad");
const levelLabel = document.getElementById("level");
const message = document.getElementById("message");
const startButton = document.getElementById("start");

const colors = ["green", "red", "yellow", "blue"];

let sequence = [];
let playerSequence = [];
let level = 0;
let acceptingInput = false;

function flashPad(color) {
  const pad = document.querySelector(`[data-color="${color}"]`);
  pad.classList.add("active");
  setTimeout(() => {
    pad.classList.remove("active");
  }, 350);
}

function playSequence() {
  acceptingInput = false;
  message.textContent = "Watch the pattern.";

  sequence.forEach((color, index) => {
    setTimeout(() => {
      flashPad(color);
      if (index === sequence.length - 1) {
        setTimeout(() => {
          acceptingInput = true;
          message.textContent = "Now repeat the pattern.";
        }, 400);
      }
    }, index * 650);
  });
}

function nextRound() {
  playerSequence = [];
  level += 1;
  levelLabel.textContent = level;
  sequence.push(colors[Math.floor(Math.random() * colors.length)]);
  playSequence();
}

function endGame() {
  acceptingInput = false;
  message.textContent = `Wrong pattern. You reached level ${level}.`;
}

pads.forEach((pad) => {
  pad.addEventListener("click", () => {
    const color = pad.dataset.color;
    flashPad(color);

    if (!acceptingInput) {
      return;
    }

    playerSequence.push(color);
    const currentIndex = playerSequence.length - 1;

    if (playerSequence[currentIndex] !== sequence[currentIndex]) {
      endGame();
      return;
    }

    if (playerSequence.length === sequence.length) {
      acceptingInput = false;
      message.textContent = "Great job. Next level coming up.";
      setTimeout(nextRound, 800);
    }
  });
});

startButton.addEventListener("click", () => {
  sequence = [];
  playerSequence = [];
  level = 0;
  levelLabel.textContent = level;
  message.textContent = "Get ready.";
  setTimeout(nextRound, 500);
});
