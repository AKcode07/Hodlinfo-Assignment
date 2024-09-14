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
          <td>${ticker.volume}</td>
          <td>${ticker.base_unit}</td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});
