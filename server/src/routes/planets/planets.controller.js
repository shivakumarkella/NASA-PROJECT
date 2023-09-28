//Import Planets data from the planets model.js file
const { getAllThePlanets } = require("../../models/planets.model");

function httpGetAllThePlanets(req, res) {
  return res.status(200).json(getAllThePlanets());
}

module.exports = httpGetAllThePlanets;
