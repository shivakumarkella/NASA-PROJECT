const express = require("express");
//Adding the cors to share the data between two different hosts
const cors = require("cors");
const path = require("path");
//Logging
const morgan = require("morgan");

//get the launches router
const launchesRouter = require("./routes/launches/launches.router");

//adding the planets router middleware
const planetsRouter = require("./routes/planets/planets.router");

//Create the express middleware
const app = express();

//Logging middleware
app.use(morgan("combined"));

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
//get all the data in json format , so lets set the middle ware to take/give the data in json format
app.use(express.json());
//let us serve the react optimized code through node server port by creating a middleware
app.use(express.static(path.join(__dirname, "..", "public")));

//adding the router middleware
app.use("/planets", planetsRouter);
app.use("/launches", launchesRouter);
//adding the homepage router which is a get request "/"
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

//Lets export it to use the app in the server.js
module.exports = app;
