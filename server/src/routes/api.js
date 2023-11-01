const express = require("express");

const api = express.Router();

//get the launches router
const launchesRouter = require("./launches/launches.router");

//adding the planets router middleware
const planetsRouter = require("./planets/planets.router");

//adding the router middleware
api.use("/planets", planetsRouter);
api.use("/launches", launchesRouter);

module.exports = api;
