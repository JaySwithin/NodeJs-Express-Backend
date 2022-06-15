const express = require("express");
const app = express();
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler")
const verifyJWT = require("./middleware/verifyJWT")
const cookieParser = require("cookie-parser")
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false })); // to handle urlncoded data(form data)
app.use(express.json());
app.use(cookieParser())
// Custom middleware logger
app.use(logger);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Express server running now.");
});

// Routes
app.use("/register", require("./routes/register"))
app.use("/login", require("./routes/login"))
app.use("/refresh", require("./routes/refresh"))
app.use("/logout", require("./routes/logout"))

app.use(verifyJWT)
app.use("/employees", require("./routes/employees"))


// All remaining requests return to the home route.
app.all("*", (req, res) => {
  res.status(404).redirect(301, "/");
  
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
