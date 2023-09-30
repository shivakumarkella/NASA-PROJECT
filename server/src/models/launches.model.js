const launches = require("../models/launches.mongo");
const planets = require("../models/planets.mongos");
//inMemory
//const launches = new Map();

//inMemory
//let latestFlightNumber = 100;
//inMongoDb
const DEFAULT_FLIGHT_NUMBER = 100;
async function getLatestFlightNumber() {
  const latestLaunch = await launches.findOne().sort("-flightNumber");

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
}
function existsLaunchWithId(launchId) {
  return launches.has(launchId);
}

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27,2030"),
  target: "Kepler-442 b",
  customers: ["Mahadev", "ZTM", "ISRO"],
  upcoming: true,
  success: true,
};

//launches.set(launch.flightNumber, launch);
saveLaunches(launch);

function getAllTheLaunches() {
  //inMemory
  //return Array.from(launches.values());
  console.log(
    `Get All the Launches method Called and : ${launches.find(
      {},
      { _id: 0, __v: 0 }
    )}`
  );
  return launches.find({}, { _id: 0, __v: 0 });
}

async function saveLaunches(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });
  if (!planet) {
    throw new Error("Not able to find matching planet");
  }
  await launches.findOneAndUpdate(
    { flightNumber: launch.flightNumber },
    launch,
    {
      upsert: true,
    }
  );
}

//InMemory
//Add the new Launch to launches
function addNewLaunch(launch) {
  latestFlightNumber++;
  //inMemory
  // launches.set(
  //   latestFlightNumber,
  //   Object.assign(launch, {
  //     flightNumber: latestFlightNumber,
  //     customers: ["Mahadev", "ZTM", "ISRO"],
  //     upcoming: true,
  //     success: true,
  //   })
  // );
}

async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    flightNumber: newFlightNumber,
    customers: ["Mahadev", "ZTM", "ISRO"],
    upcoming: true,
    success: true,
  });

  await saveLaunches(newLaunch);
}

function abortLaunchByID(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
}

module.exports = {
  existsLaunchWithId,
  getAllTheLaunches,
  addNewLaunch,
  abortLaunchByID,
  scheduleNewLaunch,
};
