const express = require("express");
const app = express();

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Express server running now.");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
