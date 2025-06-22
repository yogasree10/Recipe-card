const ingredients = document.getElementById("ingredients");
const steps = document.getElementById("steps");
const toggleIngredientsBtn = document.getElementById("toggle-ingredients");
const toggleStepsBtn = document.getElementById("toggle-steps");
const startBtn = document.getElementById("start-cooking");
const nextBtn = document.getElementById("next-step");
const progressFill = document.getElementById("progress-fill");
const timerDisplay = document.getElementById("timer");
let currentStep = 0;
let timer;
let timeLeft = 30 * 60; // 30 minutes
toggleIngredientsBtn.addEventListener("click", () => {
  ingredients.classList.toggle("hidden");
  toggleIngredientsBtn.textContent = ingredients.classList.contains("hidden")
    ? "Show Ingredients"
    : "Hide Ingredients";
});
toggleStepsBtn.addEventListener("click", () => {
  steps.classList.toggle("hidden");
  toggleStepsBtn.textContent = steps.classList.contains("hidden")
    ? "Show Steps"
    : "Hide Steps";
});
startBtn.addEventListener("click", () => {
  currentStep = 0;
  highlightStep(currentStep);
  nextBtn.disabled = false;
  startBtn.disabled = true;
  startTimer();
});
nextBtn.addEventListener("click", () => {
  if (currentStep < steps.children.length - 1) {
    currentStep++;
    highlightStep(currentStep);
  } else {
    nextBtn.disabled = true;
    clearInterval(timer);
    timerDisplay.textContent = "Kunafa Chocolate Ready!";
  }
});
function highlightStep(index) {
  Array.from(steps.children).forEach((step, i) => {
    step.style.backgroundColor = i === index ? "#f8e0c4" : "";
  });
  const progress = ((index + 1) / steps.children.length) * 100;
  progressFill.style.width = progress + "%";
}
function startTimer() {
  updateTimer();
  timer = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(timer);
      timerDisplay.textContent = "Time's up!";
    }
  }, 1000);
}
function updateTimer() {
  let mins = Math.floor(timeLeft / 60);
  let secs = timeLeft % 60;
  timerDisplay.textContent = `Time left: ${mins}:${secs < 10 ? "0" : ""}${secs}`;
}
