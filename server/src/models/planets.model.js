const { rejects } = require("assert");
const { parse } = require("csv-parse");
const fs = require("fs");
const { resolve } = require("path");
const path = require("path");
//let us use the planets mongoose to store the data in the mongo DB
const planets = require("./planets.mongos");

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

//We are using the Promise to ensure the load the data , as promise give us Resolve and Reject.
function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          //InMemory Saving the habitable planets
          // habitablePlanets.push(data);
          // Lets save the habitable planets data in the mongo Db.
          // Before we store it in the mongo DB , we need to find the objects are availble or not,
          savePlanet(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", async () => {
        //InMemory
        //console.log(`${habitablePlanets.length} habitable planets found!`);
        //MongoDb
        const habitablePlanetsLength = (await getAllThePlanets()).length;
        console.log(
          `${habitablePlanetsLength} habitable planets found in the NASA Collection`
        );
        resolve();
      });
  });
}

async function savePlanet(planet) {
  await planets.updateOne(
    {
      keplerName: planet.kepler_name,
    },
    {
      keplerName: planet.kepler_name,
    },
    {
      upsert: true,
    }
  );
}

async function getAllThePlanets() {
  //InMemory
  //return habitablePlanets;
  //From MongoDB, we are passing empty object which means we will get all the data
  return await planets.find({});
}

module.exports = {
  loadPlanetsData,
  getAllThePlanets,
};
