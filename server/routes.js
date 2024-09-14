const express = require("express");
const axios = require("axios");
const pool = require("./db");
const router = express.Router();

// Fetch and store top 10 results in PostgreSQL
const fetchAndStoreData = async () => {
  try {
    const response = await axios.get("https://api.wazirx.com/api/v2/tickers");

    // Correctly get the first 10 tickers
    const tickers = Object.entries(response.data).slice(0, 10);

    // Clean the table before storing new data
    await pool.query("TRUNCATE TABLE tickers RESTART IDENTITY");

    // Insert data into PostgreSQL
    for (const [tickerName, tickerData] of tickers) {
      // Correct structure here
      const { last, buy, sell, volume, base_unit } = tickerData;
      await pool.query(
        "INSERT INTO tickers (name, last, buy, sell, volume, base_unit) VALUES ($1, $2, $3, $4, $5, $6)",
        [tickerName, last, buy, sell, volume, base_unit]
      );
    }
    console.log("Data fetched and stored successfully.");
  } catch (error) {
    console.error("Error fetching or storing data:", error);
  }
};

// Route to get the stored tickers data
router.get("/tickers", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tickers ORDER BY id LIMIT 10"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching data from database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Trigger data fetch and storage on server start
fetchAndStoreData();

module.exports = router;
