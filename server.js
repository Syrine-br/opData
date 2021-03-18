require("dotenv").config({ path: "./config.env" });
const express = require("express");
const app = express();
const errorHandler = require("./middleware/error");

const mongoose = require('mongoose')
require('dotenv').config();

// Connect DB
const PORT = process.env.PORT || 5000;
const url = process.env.MONGO_URL;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true,
 })
.then(() => {console.log("Server up and running!")})


app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("Api running");
});

// Connecting Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));

// Error Handler Middleware
app.use(errorHandler);



const server = app.listen(PORT, () =>
  console.log(`Sever running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
