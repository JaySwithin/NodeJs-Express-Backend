const express = require("express");
const app = express();

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Express server running now.");
});


// All remaining requests return to the home route.
app.get("/*", (req, res) => {
  res.status(404).redirect(301, "/");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
