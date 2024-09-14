document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/tickers")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      const tbody = document.querySelector("tbody");
      tbody.innerHTML = ""; // Clear existing table rows if any
      data.forEach((ticker, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${ticker.name}</td>
          <td>₹ ${Number(ticker.last).toLocaleString()}</td>
          <td>₹ ${Number(ticker.buy).toLocaleString()} / ₹ ${Number(
          ticker.sell
        ).toLocaleString()}</td>
          <td>${ticker.volume} %</td>
          <td>${ticker.volume}</td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});

const spinner = document.getElementById("spinner");
const timerLabel = document.getElementById("timer-label");
let totalTime = 60;
let timeLeft = totalTime;

function updateSpinner() {
  const percentage = (timeLeft / totalTime) * 100;
  spinner.style.setProperty("--percentage", percentage);
  timerLabel.textContent = timeLeft;

  if (timeLeft > 0) {
    timeLeft--;
  } else {
    timeLeft = totalTime;
  }
}

let timerInterval = setInterval(updateSpinner, 1000);

const themeToggle = document.getElementById("theme-toggle");
const toggleLabel = document.getElementById("toggle-label");
const body = document.body;

themeToggle.addEventListener("change", () => {
  if (themeToggle.checked) {
    // If the toggle is checked, apply dark theme
    body.classList.add("dark-theme");
    toggleLabel.classList.add("dark-theme-toggle");
  } else {
    // If the toggle is unchecked, revert to light theme
    body.classList.remove("dark-theme");
    toggleLabel.classList.remove("dark-theme-toggle");
  }
});

