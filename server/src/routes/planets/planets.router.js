//Routers we will use from express frame work
const express = require("express");

//import the getAllThePlanets method from the controller
const httpGetAllThePlanets = require("./planets.controller");

//Get router
const planetsRouter = express.Router();

//set up the router config i.e. what type GET/PUT/POST? And What action should be done on that
planetsRouter.get("/", httpGetAllThePlanets);

module.exports = planetsRouter;
