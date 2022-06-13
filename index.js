const express = require("express");
const app = express();
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler")
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(express.urlencoded({ extended: false })); // to handle urlncoded data(form data)
app.use(express.json());
app.use(cors());

// Routes
app.use("/employees", require("./routes/employees"))
app.use("/register", require("./routes/register"))
app.use("/login", require("./routes/login"))

// Custom middleware logger
app.use(logger);

app.get("/", (req, res) => {
  res.send("Express server running now.");
});

// All remaining requests return to the home route.
app.all("*", (req, res) => {
  res.status(404).redirect(301, "/");
  
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
