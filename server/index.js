const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

//Important Routes
const userRoutes = require("./routes/user");
const quizRoutes = require("./routes/quiz");

const app = express();

// Enable Cors
app.use(cors());

//Middleware bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Register Route
app.use(
  "/api/user",
  userRoutes
); /* for register post request use http://localhost:4000/api/auth/register route */
app.use("/api/quiz", quizRoutes);
app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Server is up and running",
    createdAt: new Date().toISOString(),
  });
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.log(err.stack); // Log the error stack trace to the console
  res.status(500).json({ error: "Internal server Error" }); // Send a 500 Internal Server Error response to the client
});

// Start Server and Connected to MONGODB
const Port = process.env.PORT || 3000;
app.listen(Port, () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log(`Server is running on http://localhost:${Port}`))
    .catch((error) => console.log(error));
});
