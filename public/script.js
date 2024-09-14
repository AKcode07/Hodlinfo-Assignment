async function fetchTickers() {
  try {
    const response = await fetch("/api/tickers");
    const tickers = await response.json();
    displayTickers(tickers);
  } catch (error) {
    console.error("Error fetching tickers:", error);
  }
}

function displayTickers(tickers) {
  const container = document.getElementById("ticker-container");
  container.innerHTML = ""; // Clear any previous content

  tickers.forEach((ticker) => {
    const tickerElement = document.createElement("div");
    tickerElement.className = "ticker";

    tickerElement.innerHTML = `
            <h2>${ticker.name}</h2>
            <p>Last: ₹${ticker.last}</p>
            <p>Buy: ₹${ticker.buy}</p>
            <p>Sell: ₹${ticker.sell}</p>
            <p>Volume: ${ticker.volume}</p>
            <p>Base Unit: ${ticker.base_unit}</p>
        `;

    container.appendChild(tickerElement);
  });
}

// Fetch and display tickers when the page loads
window.onload = fetchTickers;
