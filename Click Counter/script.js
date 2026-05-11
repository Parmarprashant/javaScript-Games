const counter = document.getElementById("counter");
const message = document.getElementById("message");
const increase = document.getElementById("increase");
const decrease = document.getElementById("decrease");
const reset = document.getElementById("reset");

let count = 0;

function render() {
  counter.textContent = count;

  if (count === 0) {
    message.textContent = "Start clicking to raise the counter.";
  } else if (count < 0) {
    message.textContent = "You went below zero. Bring it back up.";
  } else if (count < 10) {
    message.textContent = "Nice start. Keep going.";
  } else if (count < 25) {
    message.textContent = "Great rhythm. You are building a streak.";
  } else {
    message.textContent = "Amazing pace. You are on fire.";
  }
}

increase.addEventListener("click", () => {
  count += 1;
  render();
});

decrease.addEventListener("click", () => {
  count -= 1;
  render();
});

reset.addEventListener("click", () => {
  count = 0;
  render();
});

render();
