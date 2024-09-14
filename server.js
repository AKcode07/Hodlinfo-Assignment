const express = require("express");
const path = require("path");
const routes = require("./server/routes");
const app = express();
const port = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
