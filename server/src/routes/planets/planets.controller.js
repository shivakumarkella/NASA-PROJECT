//Import Planets data from the planets model.js file
const { getAllThePlanets } = require("../../models/planets.model");

async function httpGetAllThePlanets(req, res) {
  return res.status(200).json(await getAllThePlanets());
}

module.exports = httpGetAllThePlanets;
