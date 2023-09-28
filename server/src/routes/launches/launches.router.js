//Router will create by express
const express = require("express");

//get the function
const {
  httpGetAllTheLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
} = require("./launches.controller");

//Create a Express Router
const launchController = express.Router();

//Config the Router , what type of method (get/Post),router name, what to do on that router function
launchController.get("/", httpGetAllTheLaunches);
launchController.post("/", httpAddNewLaunch);
launchController.delete("/:id", httpAbortLaunch);

module.exports = launchController;
